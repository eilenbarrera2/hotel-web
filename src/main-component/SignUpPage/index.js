import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { authService } from '../../api/authService'; // Ajusta la ruta según tu estructura

import './style.scss';

const SignUpPage = (props) => {
    const push = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [value, setValue] = useState({
        email: '',
        name: '',
        password: '',
        password_confirmation: '',
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage',
        validators: {
            // Validador personalizado para nombres con espacios
            nameValidator: {
                message: 'El :attribute debe contener solo letras y espacios.',
                rule: (val) => {
                    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val);
                }
            }
        }
    }));

    const submitForm = async (e) => {
        e.preventDefault();

        // Forzar la actualización del validador
        if (validator.allValid()) {
            setIsLoading(true);

            try {
                const response = await authService.register(
                    value.name,
                    value.email,
                    value.password,
                    value.password_confirmation
                );

                // Limpiar el formulario
                setValue({
                    email: '',
                    name: '',
                    password: '',
                    password_confirmation: '',
                });

                validator.hideMessages();
                toast.success(response.message || '¡Registro completado exitosamente!');

                // Redirigir al home
                setTimeout(() => {
                    push('/home');
                }, 1500);

            } catch (error) {
                console.error('Error en registro:', error);

                if (error.errors) {
                    // Errores de validación del backend
                    Object.keys(error.errors).forEach(key => {
                        toast.error(error.errors[key][0]);
                    });
                } else if (error.message) {
                    toast.error(error.message);
                } else {
                    toast.error('Error al registrar usuario. Por favor intenta de nuevo.');
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            validator.showMessages();
            toast.error('Por favor completa todos los campos correctamente');
        }
    };

    return (
        <Grid className="loginWrapper">
            <Grid className="loginForm">
                <h2>Registrarse</h2>
                <p>Registra tu cuenta</p>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Nombre Completo"
                                value={value.name}
                                variant="outlined"
                                name="name"
                                label="Nombre"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => changeHandler(e)}
                                disabled={isLoading}
                            />
                            {validator.message('nombre', value.name, 'required')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Correo Electrónico"
                                value={value.email}
                                variant="outlined"
                                name="email"
                                label="Correo Electrónico"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => changeHandler(e)}
                                disabled={isLoading}
                            />
                            {validator.message('email', value.email, 'required|email')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Contraseña"
                                value={value.password}
                                variant="outlined"
                                name="password"
                                type="password"
                                label="Contraseña"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => changeHandler(e)}
                                disabled={isLoading}
                            />
                            {validator.message('contraseña', value.password, 'required|min:6')}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="inputOutline"
                                fullWidth
                                placeholder="Confirmar Contraseña"
                                value={value.password_confirmation}
                                variant="outlined"
                                name="password_confirmation"
                                type="password"
                                label="Confirmar Contraseña"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => changeHandler(e)}
                                disabled={isLoading}
                            />
                            {validator.message('confirmar contraseña', value.password_confirmation, 'required')}
                            {value.password && value.password_confirmation && value.password !== value.password_confirmation && (
                                <div className="errorMessage">Las contraseñas no coinciden</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter">
                                <Button
                                    fullWidth
                                    className="cBtn cBtnLarge cBtnTheme"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Registrando...' : 'Registrarse'}
                                </Button>
                            </Grid>

                            <p className="noteHelp">
                                ¿Ya tienes una cuenta? <Link to="/login">Volver a Iniciar Sesión</Link>
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

export default SignUpPage;