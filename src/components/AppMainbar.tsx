import { Box, Button, Typography } from "@mui/material";
import AppNavbar from "./AppNavbar";
import {ReactComponent as LogoAddDev} from "../assets/dev-add.svg"
import { darkTheme } from "./mui/darkThemeStyle";
import SensorsPage from "./sensors/SensorsPage";


export function AppMainbar() {
    return <Box bgcolor="background.light" width="100%" sx={{px: 6, py: 4}}>
        <AppNavbar/>
        
        <SensorsPage/>
    </Box>
}

export default AppMainbar;