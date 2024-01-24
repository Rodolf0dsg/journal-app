import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
 
    try {
        //signInWith pop up es la funcion para logearse con popup
        //recibe la autenticacion y el proovedor para iniciar sesion
        //los provedores pueden ser facebook, google, twitter, github etc.

        const result = await signInWithPopup( FirebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;
        // console.log(result.user)

        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log(credentials);

        return {
            ok: true,
            displayName, email, photoURL, uid 
        }
        

    } catch (error) {
        console.log(error);

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`${errorCode} | ${errorMessage}`);
        
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);

        return {
            ok: false,
            errorMessage,
        }
    }
    
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {

    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user;
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName,
        }
        

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}

export const logInWithEmailAndPassword = async({email, password}) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)

        const { displayName, photoURL, errorMessage, uid } = resp.user;

        return {
            ok: true,
            displayName, email, photoURL, errorMessage, uid
        }
        
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}

export const logOutFirebase = async() => {
    return await FirebaseAuth.signOut();
}