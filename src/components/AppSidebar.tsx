import { Box } from "@mui/material";
import AppBanner from "./AppBanner";
import AppMenu from "./AppMenu";

export function AppSidebar() {
    return <Box sx={{display: "flex", flexDirection: "column", maxWidth: 300, height: "100vh", bgcolor: "background.default"}}>
        <Box style={{padding: 20, paddingBottom: 50}}>
            <AppBanner/>
        </Box>
        <AppMenu/>
    </Box>
}

export default AppSidebar;