import { Google } from '@mui/icons-material';
import { Grid, Typography, TextField, Button, Link, Alert} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { validatePassword } from 'firebase/auth';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    displayName: [(value) => value.length >= 1, 'Nombre es obligatorio'],
    email: [(value) => value.includes('@'), 'Formato no valido'],
    password: [(value) => value.length >= 6, 'Debe tener mas de 6 caracteres'],
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setformSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

    const { 
        formState, 
        displayName, 
        email, 
        password, 
        displayNameValid, 
        emailValid, 
        passwordValid,
        isFormValid,
        onInputChange} = useForm(formData, formValidations);

    const onSubmit = (e) => {
        if (!isFormValid) return;

        setformSubmitted(true);
        e.preventDefault();
        dispatch( startCreatingUserWithEmailAndPassword( formState ));
    }


    return (
        <AuthLayout title='Registrarse'>

            <form action="" onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                    <Grid container>

                        <Grid item xs={ 12 }>
                            <TextField 
                                label="Nombre" 
                                type='text' 
                                placeholder='Tu nombre'
                                name='displayName'
                                onChange={ onInputChange }
                                value={ displayName }
                                error={!!displayNameValid && formSubmitted}
                                helperText={ displayNameValid }
                                fullWidth
                            />
                        </Grid> 

                        <Grid item xs={ 12 } sx={{ marginTop: .5 }} >
                            <TextField 
                                label="correo" 
                                type='email' 
                                placeholder='Correo@google.com'
                                name='email'
                                onChange={ onInputChange }
                                value={ email }
                                error={!!emailValid && formSubmitted}
                                helperText={ emailValid }
                                fullWidth
                            />
                        </Grid> 
  
                        <Grid item xs={ 12 } sx={{ marginTop: .5 }}>
                            <TextField 
                                    label="password" 
                                    type='password' 
                                    placeholder='Password'
                                    name='password'
                                    onChange={ onInputChange }
                                    value={ password }
                                    error={!!passwordValid && formSubmitted}
                                    helperText={ passwordValid }
                                    fullWidth
                            />
                        </Grid>  

                        <Grid container 
                            spacing={ 2 } 
                            sx={{ mb: 1, mt: 1 }}    
                        >
                            <Grid 
                                item xs={ 12 }
                                display={ !!errorMessage ? '' : 'none' }
                            >
                                <Alert severity='error'>{errorMessage}</Alert>
                            </Grid>

                            <Grid item xs={ 12 }>
                                <Button 
                                    variant='contained' 
                                    type='submit' 
                                    fullWidth
                                    disabled={ isCheckingAuthentication }    
                                >
                                    Crear cuenta
                                </Button>
                            </Grid>


                        </Grid>

                        <Grid container 
                            direction={'row'} 
                            justifyContent={'end'}
                        >
                            <Link component={ RouterLink } color={'inherit'} to="/auth/login">
                            <Typography sx={{ mr: 1}}>Ya tienes cuenta?</Typography>

                                Ingresar
                            </Link>
                        </Grid>

                    </Grid>
                </form>
                        
        </AuthLayout>
    )
}

