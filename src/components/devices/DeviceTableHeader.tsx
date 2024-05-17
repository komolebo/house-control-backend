import React from 'react';
import '../../styles/Devices/DeviceTableHeader.module.css';
import {POPUP_TYPE, useGlobalPopupContext} from "../popups/PopupProvider";

function DeviceTableHeader() {
    const {showPopup} = useGlobalPopupContext();

    return <div id="device-table-header">
        <div id="add-device-btn">
            <img src={process.env.PUBLIC_URL + 'Resources/button_add_device.png'}
                 onClick={() => showPopup(POPUP_TYPE.AddDevice, {
                     onClose: () => {},
                     onAct: () => {},
                     data: {}
                 })}/>
        </div>

        <div id="device-table-label">
            Devices
        </div>
    </div>
}
export default DeviceTableHeader;