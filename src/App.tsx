import React, {useContext, useState} from 'react';
import {PopupProvider} from "./components/popups/PopupProvider";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "./components/mui/darkThemeStyle";
import {DarkModeContext} from "./globals/providers/DarkModeProvider";
import AppMainPage from './components/AppMainPage';


function App() {
    const {globalDark} = useContext (DarkModeContext);
    const [darkMode, setDarkMode] = useState<boolean> (globalDark);

    const defaultDark = true;

    return <ThemeProvider theme={darkMode || defaultDark ? darkTheme : darkTheme}>
        <PopupProvider>
            <CssBaseline/>
            <AppMainPage/>
        </PopupProvider>
    </ThemeProvider>
}
export default App;
