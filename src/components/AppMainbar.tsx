import {Box} from "@mui/material";
import AppNavbar from "./AppNavbar";
import SensorsPage from "./sensors/SensorsPage";
import React from "react";


export function AppMainbar() {
    return <Box bgcolor="background.paper" width="100%" sx={{px: 6, py: 4}}>
        <AppNavbar/>

        <SensorsPage/>
    </Box>
}

export default AppMainbar;