import React, {useState} from 'react';
import './styles/InfoBar.module.css';
import {POPUP_TYPE, useGlobalPopupContext} from "./components/popups/PopupProvider";

interface IState {
    devId: number
}

export function InfoBar() {
    const {showPopup} = useGlobalPopupContext ();
    const [state, setState] = useState<IState> ({devId: -1});

    const showNotificationPopup = () => {
        showPopup (POPUP_TYPE.Notification, {
                data: {},
                onAct: () => {},
                onClose: () => {}
        })

        setState ({devId: -1});
    }

    return <div id="infobar">
        <div id="infobar-items">
            <div className="infobar-item">
                <div className="infobar-username">Username</div>
                <img className="infobar-user-ico" src={process.env.PUBLIC_URL + 'Resources/ico_user.png'}
                     alt={"Alter info bar user"}/>
            </div>
            <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_notification_active.png'}
                 onClick={showNotificationPopup} alt={"Alter notification active"}/>
            <img className="infobar-item" src={process.env.PUBLIC_URL + 'Resources/ico_faq.png'} alt={"Alter ico faq"}/>
        </div>
    </div>
}

export default InfoBar;