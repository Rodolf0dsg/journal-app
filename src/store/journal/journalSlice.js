import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        /* {
            id: 'ABC123',
            title: '',
            body: '',
            date: 12345,
            imagesUrls: [],
        } */
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action ) => {

            state.notes.push(action.payload);
            state.isSaving = false
        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = ``;
        },
        setNotes: (state, action) => {

            state.notes = action.payload;
            
        },

        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ``;
        },

        updateNote: (state, action) => {
            state.isSaving = false;
            //reflejar en la lista lateral los cambios
            state.notes = state.notes.map( note => {
                if ( note.id === action.payload.id ){
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `${ action.payload.title } guardada`;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter((note) => note.id !== action.payload);
        },
        setPhotosToActiveNote: ( state, action ) =>{
            state.active.imagesUrls = [...state.active.imagesUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesOnLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
    }
});


export const { 
        addNewEmptyNote, 
        clearNotesOnLogout,
        deleteNoteById, 
        updateNote, 
        savingNewNote, 
        setActiveNote, 
        setNotes, 
        setPhotosToActiveNote,
        setSaving, 
    } = journalSlice.actions;