import { Grid, Typography, } from "@mui/material"



export const AuthLayout = ({children, title = ''}) => {
  return (
    <Grid
        container
        spacing={ 0 }
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >

        <Grid item
            className='box-shadow'
            xs={ 3 } /* xs es pantallas peque;as, tambien esta md, xl */
            sx={{
                backgroundColor: 'white', 
                padding: 3, 
                borderRadius: 2,
                width: { md: 450 }
            }} /* sx es el extra style */
        >
            <Typography variant='h5' sx={{ marginBottom: 1 }}>{ title }</Typography>

                { children }

        </Grid>
    </Grid>
  )
}
