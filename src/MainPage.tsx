import React from 'react';
import './styles/MainPage.module.css';
import NavMenu from './Menu'
import InfoBar from './InfoBar'
import DeviceTableHeader from './components/devices/DeviceTableHeader'
import DeviceTable from './components/devices/DeviceTable'

interface IProps {
}

export function MainPage({}: IProps) {

    return <div id="main-page">
        <div id="nav-bar">
            <div id="menu-logo-section">
                <div id="menu-logo">
                    <img src={process.env.PUBLIC_URL + 'Resources/smart_home_system.svg'} alt={"Alter smart home"}/>
                </div>

                <div id="menu-logo-section-text">
                    <a>smart home system</a>
                </div>

                <div id="menu">
                </div>
            </div>

            <NavMenu/>
        </div>

        <div id="content-page">

            <div id="content-section-margin">
                <InfoBar />
                <DeviceTableHeader/>
                <DeviceTable/>
            </div>
        </div>
    </div>
}

export default MainPage;