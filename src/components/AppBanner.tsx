import {Typography} from "@mui/material";
import React from "react";

export function AppBanner() {
    return <div style={{display: "flex"}}>
        <img src={process.env.PUBLIC_URL + "Resources/smart_home_system.svg"} alt={"Alter app banner"}/>
        <Typography variant="h2" 
                    color={'text.primary'}
                    sx={{py: 1, pl: 3, minWidth: "160px"}}>
            SMART HOME <br />SYSTEM
        </Typography>
    </div>
}

export default AppBanner;