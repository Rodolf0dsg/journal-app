import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { startLogOut } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch( startLogOut() );
    }

  return (
    <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${ drawerWidth }px)`},
            marginLeft: { sm: `${ drawerWidth }px` }
        }}
    >    
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
                sx={{ 
                    mr: 2, 
                    display: { sm: 'none' }
                }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
            >
                <Typography variant="h6" noWrap component={'div'}> JournalApp </Typography>

                <IconButton 
                    color="error"
                    onClick={ onLogOut }
                >
                    <LogoutOutlined/>
                </IconButton>
            </Grid>

        </Toolbar>  
    </AppBar>    
  )
}
