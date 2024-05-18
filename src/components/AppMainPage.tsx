import AppSidebar from "./AppSidebar";
import AppMainbar from "./AppMainbar";
import {Box} from "@mui/material";
import React from "react";

export function AppMainPage() {
    return <Box bgcolor={"background.default"} display={"flex"}>
        <AppSidebar/>
        <AppMainbar/>
    </Box>
}

export default AppMainPage;