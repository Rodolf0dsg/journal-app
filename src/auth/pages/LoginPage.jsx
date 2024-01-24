import { Google } from '@mui/icons-material';
import { Grid, Typography, TextField, Button, Link, Alert} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
    email: '',
    password: ''
};

export const LoginPage = () => {

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector( state => state.auth );

    const { email, password, onInputChange} = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) =>{
        e.preventDefault();
    
        dispatch( startLoginWithEmailAndPassword({email, password}) );
    }
    
    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() );
    }

    return (
        <AuthLayout title='Login'>
            <form 
                onSubmit={ onSubmit } 
                className="animate__animated animate__fadeIn animate__faster"
                aria-label='submit-form'
            >
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <TextField 
                                label="correo" 
                                type='email' 
                                placeholder='Correo@google.com'
                                fullWidth
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
                            />
                        </Grid> 
  
                        <Grid item xs={ 12 } sx={{ marginTop: .5 }}>
                            <TextField 
                                    label="password" 
                                    type='password' 
                                    placeholder='Password'
                                    fullWidth
                                    name='password'
                                    inputProps={
                                        {'data-testid': 'password',}
                                    }
                                    value={ password }
                                    onChange={ onInputChange }
                            />
                        </Grid>  

                        <Grid container 
                            spacing={ 2 } 
                            sx={{ mb: 1, mt: 1 }}                            
                        >
                            <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                                <Alert severity='error'> 
                                    { errorMessage }
                                </Alert>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                    disabled = { isAuthenticating }
                                    type="submit"
                                    variant='outlined' 
                                    fullWidth>
                                    Login
                                </Button>
                            </Grid>

                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button 
                                    disabled = { isAuthenticating }
                                    variant='contained' 
                                    fullWidth 
                                    aria-label='google-btn'
                                    onClick={ onGoogleSignIn }>
                                    <Google/>
                                    <Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>

                        </Grid>

                        <Grid container 
                            direction={'row'} 
                            justifyContent={'end'}
                        >
                            <Link component={ RouterLink } color={'inherit'} to="/auth/register">
                                Crear una cuenta
                            </Link>
                        </Grid>

                    </Grid>
                </form>
                        
        </AuthLayout>
    )
}
