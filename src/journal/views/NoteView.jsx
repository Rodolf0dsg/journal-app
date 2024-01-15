import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from "../../hooks/useForm"
import { ImageGallery } from "../components"
import { setActiveNote, } from "../../store/journal/journalSlice";
import { startDeletingNote, startSavingNewNote, startUploadingFiles } from "../../store/journal/thunks";


export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal)
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    useEffect(()=>{

        dispatch( setActiveNote(formState) );

    }, [formState] );

    useEffect(() => {

        if (messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
      
    }, [messageSaved])
    
    const onSaveNote = () => {
        dispatch( startSavingNewNote() )
    };

    const fileInputRef = useRef()

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch( startUploadingFiles( target.files ))
    };

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid 
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction={'row'}
        justifyContent={'space-between'}
        sx={{ mb: 1 }}
        alignItems={'center'}
    >
        <Grid item>
            <Typography
                fontSize={ 39 }
                fontWeight={'light'}
            >
                { dateString }
            </Typography>
        </Grid>

        <Grid item>

            <IconButton
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadFileOutlined/>
            </IconButton>
            <input 
                type="file" 
                multiple
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
                ref={ fileInputRef }
            />

            <Button 
                color="primary" 
                sx={{ padding: 2 }} 
                onClick={ onSaveNote }
                disabled={ isSaving }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="ingrese un titulo"
                label={'titulo'}
                sx={{border: 'none' , mb: 1}}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                multiline
                fullWidth
                placeholder="Que sucedio hoy"
                minRows={5}
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent={'end'}>
            <Button
                onClick={ onDelete }
                sx={{mt: 2}}
                color='error'
            >
                < DeleteOutline />
            </Button>
        </Grid>
        
        <ImageGallery
            images={note.imagesUrls}
        />

    </Grid>
  )
};