import {Typography} from "@mui/material";
import React from "react";
import {ReactComponent as LogoSmartHome} from "../assets/smart_home_system.svg"

export function AppBanner() {
    return <div style={{display: "flex"}}>
        <LogoSmartHome/>
        <Typography variant="h2" 
                    color={'text.primary'}
                    sx={{py: 1, pl: 3, minWidth: "160px"}}>
            SMART HOME <br />SYSTEM
        </Typography>
    </div>
}

export default AppBanner;