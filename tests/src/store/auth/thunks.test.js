import { logInWithEmailAndPassword, logOutFirebase, signInWithGoogle } from '../../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../../src/store/auth/authSlice';
import { chekingAuthentication, startGoogleSignIn, startLogOut, startLoginWithEmailAndPassword } from '../../../../src/store/auth/thunks';
import { clearNotesOnLogout } from '../../../../src/store/journal/journalSlice';
import { demoUser } from '../../../fixtures/authFixtures';

jest.mock('../../../../src/firebase/providers');

describe('Pruebas en authThunks', () => {

    const dispatch = jest.fn();

    beforeEach(()=> jest.clearAllMocks() )

    test('Debe invocar el checking credentials', async() => {

        await chekingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );

    });

    test('startGoogleSignIn Debe de llamar checkingCredentials y login', async() => {

        const loginData = { ok: true, ...demoUser }

        await signInWithGoogle.mockResolvedValue( loginData );

        //thunk
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )

    });

    test('startGoogleSignIn Debe de llamar checkingCredentials y logout con mensaje de error', async() => {

        const loginData = { ok: false, errorMessage: 'Un error de google' }

        await signInWithGoogle.mockResolvedValue( loginData );
        // await signInWithGoogle.mockReturnValue( loginData ); es lo mismo

        //thunk
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )

    });

    test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456'};

        await logInWithEmailAndPassword.mockResolvedValue( loginData );

        await startLoginWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLogout debe de llamar logoutfirebase, clearnotes y logout', async() => {

        await startLogOut()(dispatch);

        expect( logOutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesOnLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );

    })

});