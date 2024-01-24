import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../../src/firebase/config";

describe('Pruebas en thunks - journal', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('startNewNote Debe de crear una nueva nota', async() => {
        
        const uid = 'TEST-UID'; 
        getState.mockReturnValue({ auth: {uid} });

        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }));

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }));

        //borrar de firebase
        const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromeses = [];
        docs.forEach( doc => deletePromeses.push( deleteDoc( doc.ref ) ));
        await Promise.all( deletePromeses );

    });

})