import AppSidebar from "./AppSidebar";
import AppMainbar from "./AppMainbar";
import { Box } from "@mui/material";

export function AppMainPage(){
    return <Box bgcolor={"background.default"} display={"flex"}>
        {/*<MainPage/>*/}
        <AppSidebar/>
        <AppMainbar/>
    </Box>
}

export default AppMainPage;