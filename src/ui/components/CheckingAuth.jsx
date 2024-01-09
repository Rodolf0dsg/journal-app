import { Grid, CircularProgress } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid
        container
        spacing={ 0 }
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4}}
    >

        <Grid container
            direction={'row'}
            justifyContent={'center'}
            // xs={ 3 } /* xs es pantallas peque;as, tambien esta md, xl */
             /* sx es el extra style */
        >
            <CircularProgress color="warning" />
        </Grid>

    </Grid>
  )
}
