import { AddOutlined, MailOutline } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque magni doloribus ex earum, exercitationem expedita aliquam minus deleniti quisquam modi reiciendis blanditiis aperiam id ratione reprehenderit excepturi, voluptatibus, explicabo iusto.
            </Typography> */}
            <NothingSelectedView/>
            {/* <NoteView/> */}

            <IconButton
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': {
                        backgroundColor: 'error.main',
                        opacity: 0.9
                    },
                    position: "fixed",
                    right: 50,
                    bottom: 50,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>
            
        </JournalLayout>
    )
}

//component recibe lo que tu quieres que se convierta, h1 por ejemplo, si no
//se le especifica por defecto es un parrafo <p></p>

//variant recibe lo que se renderizara, si es h1 se volvera un h1