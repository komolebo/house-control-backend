import React, {useContext, useState} from 'react';
import {PopupProvider} from "./components/popups/PopupProvider";
import AppBanner from "./components/AppBanner";
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "./components/mui/darkThemeStyle";
import {lightTheme} from "./components/mui/lightThemeStyle";
import {DarkModeContext} from "./globals/providers/DarkModeProvider";
import AppMenu from "./components/AppMenu";
import AppSidebar from './components/AppSidebar';
import AppMainbar from './components/AppMainbar';
import AppMainPage from './components/AppMainPage';

function App() {
    const {globalDark} = useContext (DarkModeContext);
    const [darkMode, setDarkMode] = useState<boolean> (globalDark);

    const defaultDark = true;

    return <ThemeProvider theme={darkMode || defaultDark ? darkTheme : darkTheme}>
        <PopupProvider>
            <AppMainPage/>
        </PopupProvider>
    </ThemeProvider>
}

export default App;
