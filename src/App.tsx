import React from 'react';
import MainPage from './MainPage'
import {PopupProvider} from "./components/popups/PopupProvider";


function App() {
  return <PopupProvider>
    <MainPage/>
  </PopupProvider>
}

export default App;
