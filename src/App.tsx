import React, {useContext, useState} from 'react';
import {PopupProvider} from "./components/popups/PopupProvider";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {darkTheme} from "./components/mui/darkThemeStyle";
import {DarkModeContext} from "./globals/providers/DarkModeProvider";
import AppMainPage from './components/AppMainPage';

function AppRouter() {
    // const  {authorized} = useContext(UserGlobalContext);
    const authorized = true;

    return <BrowserRouter>
        {/*{ authorized ? <NavBar/> : <></> }*/}
        {/*<Routes>*/}
        {/*    {authorized*/}
        {/*        ? privateRoutes.map(({path, Component}, i) =>*/}
        {/*            <Route path={path} element={Component} key={i}/>)*/}
        {/*        : publicRoutes.map(({path, Component}, i) =>*/}
        {/*            <Route path={path} element={Component} key={i}/>)*/}
        {/*    }*/}

        {/*    <Route*/}
        {/*        path="*"*/}
        {/*        element={<Navigate*/}
        {/*            to={authorized ? HOME_PAGE : LOGIN_PAGE}*/}
        {/*            replace*/}
        {/*        />}*/}
        {/*    />*/}
        {/*</Routes>*/}
    </BrowserRouter>
}

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
