import React, {useState} from 'react';
import DeviceSetup from './SetupDevice'
import '../../styles/popups/EditDevice.css';
import '../styles/popups/Common.css';
import socket from '../..//socketio';
import {Button} from "@mui/material";

interface IProps {
    dev_data: any,
    onclose: () => void
}

export default function EditDevicePopup({dev_data, onclose}: IProps) {
    const [inputInfo, setInputInfo] = useState<any> ();

    const clickEdit = () => {
        socket.notifyBackend ("dev_upd", inputInfo);
        onclose ();
    }
    const setInfo = (dev_info: any) => {
        setInputInfo (dev_info);
    }

    let button_disabled = false;
    if (!inputInfo || !inputInfo.hasOwnProperty ('name')) {
        button_disabled = true;
    }

    return <div>
        <div className='popup darken'>
            <div className='popup-add-inner'>
                <div id="popup-add-dev-header">
                    <div className="popup-add-text-label center-pos">Edit device</div>
                    <div className="top-right">
                        <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'}
                             onClick={onclose}/>
                    </div>
                </div>

                <DeviceSetup
                    dev_data={dev_data}
                    onsetinfo={info => setInfo(info)}
                    locations={[ '-- No room --', 'Kitchen', 'Hall' ]}
                />

                <div className="popup-buttons-container center-pos">
                    <Button className="button cancel" onClick={onclose}>Cancel</Button>
                    <Button
                        className={"button active"}
                        onClick={clickEdit}
                        disabled={button_disabled}>
                        Edit device
                    </Button>
                </div>
            </div>
        </div>
    </div>
}
