import { signInWithGoogle, registerUserWithEmailPassword, logInWithEmailAndPassword, logOutFirebase } from "../../firebase/providers"
import { login, logout, checkingCredentials } from "./authSlice"
import { clearNotesOnLogout } from "../journal/journalSlice"


export const chekingAuthentication = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() )
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        
        if (!result.ok) return dispatch( logout( result.errorMessage ) );            

        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmailAndPassword = ({email, password, displayName}) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({displayName, email, password});

        // console.log({ ok, uid, photoURL, errorMessage });
        

        if (!ok) return dispatch( logout({ errorMessage }) );

        dispatch( login({uid, displayName, email, photoURL}) );
    } 
}

export const startLoginWithEmailAndPassword = ({email, password}) => {

    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await logInWithEmailAndPassword({ email, password });
        // console.log({ ok, uid, photoURL, errorMessage });

        if ( !result.ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login( result ) )
    };

};

export const startLogOut = () => {
    return async (dispatch) => {
        await logOutFirebase();

        dispatch( logout() );
        dispatch( clearNotesOnLogout() );
    }
}