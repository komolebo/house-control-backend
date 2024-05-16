import React from 'react';
import './styles/App.css';
import MainPage from './MainPage'
import {PopupProvider} from "./components/popups/PopupProvider";


function App() {
  return <PopupProvider>
    <MainPage/>
  </PopupProvider>
}

export default App;
