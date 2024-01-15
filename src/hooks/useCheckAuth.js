import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { startLoadingNotes } from "../store/journal/thunks";


export const useCheckAuth = () => {

    const { status } = useSelector( (state) => state.auth );
    const dispatch = useDispatch()
  
    useEffect(()=>{
      
      onAuthStateChanged( FirebaseAuth, async( user ) => {
        if( !user ) dispatch( logout());
  
        const { uid, email, displayName, photoUrl } = user;
  
        dispatch( login({uid, email, displayName, photoUrl}) );
        dispatch( startLoadingNotes() );
      });
  
    }, []);

    return {
        status,
    }
}
