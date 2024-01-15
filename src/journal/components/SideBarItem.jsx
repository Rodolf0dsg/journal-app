import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SideBarItem = ({title = '', body, id, date, imagesUrls= []}) => {

    const dispatch = useDispatch();

    const newTitle = useMemo(()=>{
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;
    }, [title]);

    const newBody = useMemo(()=>{
        return body.length > 40
            ? body.substring(0, 33) + '...'
            : body;
    }, [body]);

    const setNewActiveNote = () => {
        dispatch( setActiveNote({id, title, body, date, imagesUrls}) );
    }

    return (
        <ListItem 
            key={ id } 
            disablePadding 
            onClick={ setNewActiveNote }
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                    <Grid 
                        item
                        xs={ 12 }
                    >
                        <ListItemText primary={ newTitle }/>     
                    </Grid>
                    <Grid 
                        item
                        xs={ 12 }
                    >
                        <ListItemText secondary={ newBody }/>     
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
