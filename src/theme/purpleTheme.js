import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#262254',
        },
        secondary: {
            main: '#543884',
        },
        error:{
            main: red.A400,
        } 
    }
});

//TIENE UN TEMA POR DEFECTO, PERO NOSOTROS SOBREESCRIBIMOS LO QUE QUEREMOS,
//POR EJEMPLO LA PALETA (PALETTE)