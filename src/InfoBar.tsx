import React from 'react';
import './styles/InfoBar.module.css';

export function InfoBar() {
    return <div id="infobar">
        <div id="infobar-items">
            <div className="infobar-item">
                <div className="infobar-username">Username</div>
                <img className="infobar-user-ico" src={process.env.PUBLIC_URL + 'Resources/ico_user.png'}
                     alt={"Alter info bar user"}/>
            </div>
        </div>
    </div>
}

export default InfoBar;