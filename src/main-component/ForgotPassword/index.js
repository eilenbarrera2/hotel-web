import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import passwordService from '../../api/passwordService';

import './style.scss';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState({
        email: '',
    });

    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage',
        messages: {
            email: 'Por favor ingresa un correo electrónico válido',
            required: 'Este campo es requerido'
        }
    }));

    const submitForm = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            setLoading(true);

            try {
                console.log('📧 Enviando solicitud de recuperación...');

                // Enviar solicitud al backend
                const response = await passwordService.sendResetLink(value.email);

                console.log('✅ Respuesta del servidor:', response);

                // Mostrar mensaje de éxito
                toast.success('¡Enlace de recuperación enviado! Revisa tu correo electrónico.');

                // Marcar como enviado
                setEmailSent(true);

                // Limpiar el formulario
                setValue({ email: '' });
                validator.hideMessages();

                // Opcional: redirigir después de unos segundos
                setTimeout(() => {
                    navigate('/login');
                }, 5000);

            } catch (error) {
                console.error('❌ Error al enviar enlace:', error);

                // Manejar diferentes tipos de errores
                if (error.message) {
                    toast.error(error.message);
                } else if (error.errors?.email) {
                    toast.error(error.errors.email[0]);
                } else if (error.email) {
                    // Si el backend devuelve el error directamente
                    toast.error(error.email);
                } else {
                    toast.error('Error al enviar el enlace. Verifica tu correo electrónico.');
                }
            } finally {
                setLoading(false);
            }
        } else {
            validator.showMessages();
            toast.error('Por favor ingresa un correo electrónico válido');
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Recuperar Contraseña</h2>
                <p>Restablece la contraseña de tu cuenta</p>

                {emailSent && (
                    <div style={{
                        padding: '15px',
                        marginBottom: '20px',
                        backgroundColor: '#d4edda',
                        border: '1px solid #c3e6cb',
                        borderRadius: '5px',
                        color: '#155724'
                    }}>
                        <i className="fa fa-check-circle" style={{ marginRight: '8px' }}></i>
                        <strong>¡Correo enviado!</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                            Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.
                        </p>
                    </div>
                )}

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
                                disabled={loading || emailSent}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>

                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button
                                    fullWidth
                                    className="cBtn cBtnLarge cBtnTheme"
                                    type="submit"
                                    disabled={loading || emailSent}
                                >
                                    {loading ? (
                                        <>
                                            <CircularProgress
                                                size={20}
                                                style={{ marginRight: '10px', color: '#fff' }}
                                            />
                                            Enviando...
                                        </>
                                    ) : emailSent ? (
                                        <>
                                            <i className="fa fa-check" style={{ marginRight: '8px' }}></i>
                                            Enlace Enviado
                                        </>
                                    ) : (
                                        'Enviar Enlace de Recuperación'
                                    )}
                                </Button>
                            </Grid>

                            {emailSent && (
                                <Grid className="formFooter" style={{ marginTop: '10px' }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => {
                                            setEmailSent(false);
                                            setValue({ email: '' });
                                        }}
                                    >
                                        Enviar a otro correo
                                    </Button>
                                </Grid>
                            )}

                            <p className="noteHelp" style={{ marginTop: '20px' }}>
                                ¿Ya tienes una cuenta? <Link to="/login">Volver a Iniciar Sesión</Link>
                            </p>

                            <p className="noteHelp">
                                ¿No tienes cuenta? <Link to="/register">Crear una cuenta</Link>
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

export default ForgotPassword;