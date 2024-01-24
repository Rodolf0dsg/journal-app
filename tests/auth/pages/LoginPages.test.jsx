import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: ()=> mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({email, password})=> {
        return () => mockStartLoginWithEmailPassword({email, password})
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }, 
    preloadedState: {
        auth: notAuthenticatedState,
    },
})

describe('Pruebas en <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks() )
    
    test('Debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug();

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

    });

    test('boton de google debe llamar la funcion de startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );      
        
        const googleBtn = screen.getByLabelText('google-btn');

        fireEvent.click( googleBtn );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();


    });

    test('Submit debe lamar startLoginWithEmailAndPassword', () => {

        const email    = 'rodolfo@gmail.com';
        const password = '123456'

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );  

        const emailField = screen.getByRole('textbox', { name: 'correo' /* es por el label */});
        const passwordField = screen.getByTestId('password');
        const form = screen.getByLabelText('submit-form');

        fireEvent.change( emailField, { target: { name: 'email', value: email }});
        fireEvent.change( passwordField, { target: { name: 'password', value: password }});

        fireEvent.submit( form );

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith( {
            email: email,
            password: password
        })
        // console.log( emailField );

    })


})