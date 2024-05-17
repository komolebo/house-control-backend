import {Box, Typography} from "@mui/material";

export function AppBanner() {
    return <div style={{display: "flex"}}>
        <img src={process.env.PUBLIC_URL + "Resources/smart_home_system.svg"}/>
        <Typography variant="h2" 
                    color={'text.primary'}
                    sx={{py: 1, px: 3}}>
            SMART HOME <br />SYSTEM
        </Typography>
    </div>
}

export default AppBanner;