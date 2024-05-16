import React, {Component} from 'react';
import '../../styles/popups/UpdateDevice.css';
import '../styles/popups/Common.css';
import socket from '../socketio';
import {PopupProps} from "./PopupProvider";
import {DeviceAction} from "./SettingsPopup";


interface IProps {

}

export function UpdateDevicePopup({onClose, onAct, data}: PopupProps) {
    const update = () => {
        socket.notifyBackend("update_dev", {"mac": data.dev_data.mac});
        onClose();

    }

    constructor (props) {
        this.onupdate = () => {

            this.close_cb();
            this.update_cb(this.dev_data.mac);
        }
    }

        return (
            <div>
                <div className='popup darken'>
                    <div className='popup-update-inner'>
                        <div className="top-right">
                                <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={onClose}/>
                        </div>
                        <div className='center-pos update-ico'> 
                            <img src={process.env.PUBLIC_URL + "Resources/ico_device_update.png"}/>
                        </div>
                        <div className="popup-text-label center-pos">Do you want to update "{data.dev_data.name}"?</div>
                        <div className="popup-buttons-container center-pos">
                            <button className="button cancel" onClick={onClose}>Cancel</button>
                            <button className="button" onClick={() => onAct(DeviceAction.Update)}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default UpdateDevicePopup;