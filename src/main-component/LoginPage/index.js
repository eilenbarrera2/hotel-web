import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { authService } from './../../api/authService';
import { loadUserCart } from './../../store/actions/action';

import './style.scss';

const LoginPage = (props) => {
    const push = useNavigate();

    const [value, setValue] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const rememberHandler = () => {
        setValue({ ...value, remember: !value.remember });
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            setLoading(true);

            try {
                console.log('🔐 Intentando iniciar sesión...');

                // 1. Hacer login
                const response = await authService.login(value.email, value.password);

                // 2. Login exitoso
                toast.success(response.message || '¡Has iniciado sesión correctamente!');

                // ========================================================
                // 🔥 CARGAR EL CARRITO DEL USUARIO DESDE EL BACKEND
                // ========================================================
                const user = authService.getCurrentUser();
                console.log('👤 Usuario autenticado:', user);

                // Obtener identificador único del usuario
                const userId = user.id || user.email || user.username;
                console.log('🛒 Cargando carrito para userId:', userId);

                // 3. Cargar el carrito del usuario en Redux (ESPERAR la respuesta)
                await props.loadUserCart(userId);
                console.log('✅ Carrito cargado correctamente');
                // ========================================================

                // 4. Limpiar el formulario
                setValue({
                    email: '',
                    password: '',
                    remember: false
                });
                validator.hideMessages();

                // 5. Redirigir según el rol del usuario
                if (user.role === 'admin') {
                    push('/admin-dashboard');
                } else {
                    push('/home');
                }

            } catch (error) {
                console.error('❌ Error en login:', error);

                // Maneja diferentes tipos de errores
                if (error.message) {
                    toast.error(error.message);
                } else if (error.errors) {
                    Object.keys(error.errors).forEach(key => {
                        toast.error(error.errors[key][0]);
                    });
                } else {
                    toast.error('Error al iniciar sesión. Verifica tus credenciales.');
                }
            } finally {
                setLoading(false);
            }

        } else {
            validator.showMessages();
            toast.error('No se permiten campos vacíos!');
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>¡Inicia sesión en Dios Padre!</h2>
                <p>Inicia sesión con tu email</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="E-mail"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="E-mail"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                                disabled={loading}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Password"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                type="password"
                                label="Contraseña"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)}
                                disabled={loading}
                            />
                            {validator.message('password', value.password, 'required')}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formAction">
                                <FormControlLabel
                                    control={<Checkbox checked={value.remember} onChange={rememberHandler} />}
                                    label="Recuerdame"
                                />
                                <Link to="/forgot-password">Olvidaste tu contraseña?</Link>
                            </Grid>
                            <Grid className="formFooter">
                                <Button
                                    fullWidth
                                    className="cBtnTheme"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <i className="fi flaticon-loading" style={{ marginRight: '8px' }}></i>
                                            Iniciando...
                                        </>
                                    ) : (
                                        'Iniciar'
                                    )}
                                </Button>
                            </Grid>

                            <p className="noteHelp">
                                No tienes una cuenta? <Link to="/register">Crea una cuenta</Link>
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

// ========================================================
// 🔥 Conectar con Redux
// ========================================================
export default connect(null, { loadUserCart })(LoginPage);