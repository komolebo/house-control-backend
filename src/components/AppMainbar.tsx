import { Box, Button, Typography } from "@mui/material";
import AppNavbar from "./AppNavbar";
import {ReactComponent as LogoAddDev} from "../assets/dev-add.svg"
import { darkTheme } from "./mui/darkThemeStyle";


export function AppMainbar() {
    const color = darkTheme.palette.info.main;

    return <Box bgcolor="background.light" width="100%" sx={{px: 6, py: 4}}>
        <AppNavbar/>
        
        <Typography variant="h1" color={"text.primary"}>
            Sensors
        </Typography>

        <div style={{float: "right"}}>
            <Button
                endIcon={
                    <LogoAddDev fill={color} stroke="white"/>
                }
            />
        </div>
        
    </Box>
}

export default AppMainbar;