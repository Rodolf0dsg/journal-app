import { TurnedInNot } from '@mui/icons-material'
import { Grid, Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemButton, SwipeableDrawer, Toolbar, Typography, ListItemText } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export const SideBar = ({ drawerWidth }) => {

    const { displayName: userName } = useSelector( (state)=> state.auth);

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
            </Toolbar>

            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
                        <ListItem key={ text } disablePadding >
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot/>
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text }/>     
                                    <ListItemText secondary={'Buca a gabriel en la escuela'}/>     
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    
    </Box>
  )
}
