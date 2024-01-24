import { authSlice, checkingCredentials, login, logout } from "../../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../../fixtures/authFixtures";

describe('Pruebas en authSlice.', () => {

    test('Debe de regresar el estado inicial y llamarse auth', () => {

        const state = authSlice.reducer( initialState, {} );
        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );

    });

    test('Debe de realizar la autenticacion', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: demoUser.errorMessage,
        });

    });

    test('Debe de realizar el logout', () => {

        const state = authSlice.reducer( authenticatedState, logout() );

        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Debe de realizar el logout y mostrar mensaje de error', () => {

        const error = 'Invalid Password'

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage: error }) );

        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: error
        });
    });

    test('Debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');

    });

})