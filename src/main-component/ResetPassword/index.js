import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import passwordService from '../../api/passwordService';

import './style.scss';

// Íconos SVG personalizados (no requieren @mui/icons-material)
const VisibilityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
);

const VisibilityOffIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
    </svg>
);

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [value, setValue] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Extraer token y email de la URL al cargar el componente
    useEffect(() => {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token) {
            toast.error('Token de recuperación inválido');
            navigate('/forgot-password');
            return;
        }

        setValue(prev => ({
            ...prev,
            token: token,
            email: email || ''
        }));
    }, [searchParams, navigate]);

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage',
        messages: {
            required: 'Este campo es requerido',
            email: 'Por favor ingresa un correo electrónico válido',
            min: 'La contraseña debe tener al menos 8 caracteres',
            in: 'Las contraseñas no coinciden'
        },
        validators: {
            password_match: {
                message: 'Las contraseñas no coinciden',
                rule: (val, params, validator) => {
                    return val === value.password;
                }
            }
        }
    }));

    const submitForm = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            setLoading(true);

            try {
                console.log('🔐 Reseteando contraseña...');

                // Enviar solicitud al backend
                const response = await passwordService.resetPassword({
                    token: value.token,
                    email: value.email,
                    password: value.password,
                    password_confirmation: value.password_confirmation
                });

                console.log('✅ Respuesta del servidor:', response);

                // Mostrar mensaje de éxito
                toast.success('¡Contraseña actualizada exitosamente! Redirigiendo al login...');

                // Limpiar el formulario
                setValue({
                    email: '',
                    password: '',
                    password_confirmation: '',
                    token: ''
                });
                validator.hideMessages();

                // Redirigir al login después de 2 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } catch (error) {
                console.error('❌ Error al resetear contraseña:', error);

                // Manejar diferentes tipos de errores
                if (error.message) {
                    toast.error(error.message);
                } else if (error.errors) {
                    // Mostrar el primer error de validación
                    const firstError = Object.values(error.errors)[0];
                    toast.error(Array.isArray(firstError) ? firstError[0] : firstError);
                } else {
                    toast.error('Error al resetear la contraseña. Por favor intenta de nuevo.');
                }
            } finally {
                setLoading(false);
            }
        } else {
            validator.showMessages();
            toast.error('Por favor completa todos los campos correctamente');
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Restablecer Contraseña</h2>
                <p>Ingresa tu nueva contraseña</p>

                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Correo electrónico"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="Correo electrónico"
                                type="email"
                                disabled={loading}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Nueva contraseña"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                label="Nueva contraseña"
                                type={showPassword ? 'text' : 'password'}
                                disabled={loading}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('password', value.password, 'required|min:8')}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Confirmar contraseña"
                                value={value.password_confirmation}
                                variant="outlined"
                                name="password_confirmation"
                                label="Confirmar contraseña"
                                type={showConfirmPassword ? 'text' : 'password'}
                                disabled={loading}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('password_confirmation', value.password_confirmation, 'required|password_match')}
                        </Grid>

                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button
                                    fullWidth
                                    className="cBtn cBtnLarge cBtnTheme"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress
                                                size={20}
                                                style={{ marginRight: '10px', color: '#fff' }}
                                            />
                                            Actualizando...
                                        </>
                                    ) : (
                                        'Restablecer Contraseña'
                                    )}
                                </Button>
                            </Grid>

                            <p className="noteHelp" style={{ marginTop: '20px' }}>
                                ¿Recordaste tu contraseña? <Link to="/login">Volver a Iniciar Sesión</Link>
                            </p>
                        </Grid>
                    </Grid>
                </form>

                <div className="shape-img">
                    <i className="fi flaticon-honeycomb"></i>
                </div>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;