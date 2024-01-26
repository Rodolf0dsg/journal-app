import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'
import CloseIcon from '@mui/icons-material/Close'


export const SideBar = ({ drawerWidth }) => {

    const { displayName: userName } = useSelector( (state)=> state.auth);
    const { notes } = useSelector( (state)=> state.journal);

  return (
    <Box
        component={"nav"}
        sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
        }}
    >
        <Drawer
            variant='permanent' //temporary
            open //open siempre va a estar en true
            // ModalProps={{
            //     keepMounted, //para que nunca desaparezca
            // }}
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth  }
            }}
        >

            <Toolbar>
                <Typography variant="h6" component={'div'}>
                    { userName } 
                </Typography>

                < CloseIcon />
            </Toolbar>

            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem { ...note } />
                    ))
                }
            </List>

        </Drawer>

    
    </Box>
  )
}
