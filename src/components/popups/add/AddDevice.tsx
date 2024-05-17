import React, {useEffect, useState} from 'react';
import { DeviceCardList } from './AddDeviceCardList'
import { DeviceSetup } from '../SetupDevice'
import '../../../styles/popups/add/AddDevice.css';
import '../../styles/popups/Common.css';
import '../../styles/popups/TextInputComponent.css';
import '../../styles/popups/SelectComponent.css';
import socket from '../../../socketio'
import {useGlobalPopupContext} from "../PopupProvider";
import {Button} from "@mui/material";

interface IScanInfo {
    id: number,
    type: string,
    name: string,
    png: string,
    mac: string
}

// let scan_info = [
    // {id: 0, type: "smoke", name: 'Smoke Detector', png: 'Resources/device_smoke.png', mac: 'AC0012351282'},
    // {id: 1, type: "leak", name: 'Leak Detector', png: 'Resources/device_leak.png', mac: 'F00017351282'},
    // {id: 2, type: "gas", name: 'Gas Detector', png: 'Resources/device_gas.png', mac: '7F0012331282'},
    // {id: 3, type: "gas", name: 'Gas Detector', png: 'Resources/device_gas.png', mac: '0C0012351282'},
// ]

const locations = [
    '-- No room --', 'Kitchen', 'Hall'
]

export function AddDevicePopup() {
    const {hidePopup, popupProps} = useGlobalPopupContext();
    const [selectId, setSelectId] = useState(0);
    const [scanned, setScanned] = useState(false);
    const [deviceConfirmed, setDeviceConfirmed] = useState(false);
    const [inputInfo, setInputInfo]= useState<any>({})
    let [scanInfo, setScanInfo]= useState<IScanInfo[]>([]);

    const setInfo = (dev_info: any) => {
        setInputInfo(dev_info);
    }
    const confirmDevice = () => {
        setDeviceConfirmed(true);
    }
    const addDevice = () => {
        socket.emit("dev_conn_req", inputInfo);
        // socket.emit("dev_add", this.state.input_info);
        // Send here add device request to BACK [this.state.dev_info]
        popupProps.onAct({}); // TODO ??
        popupProps.onClose();
    }
    const select = (id: number) => {
        setSelectId(id);
    }
    const completeScan = (data: any) => {
        scanInfo = data["data"].map((el: any) => JSON.parse(el));

        // add unique id for each scanned device
        var id = 0;
        scanInfo.filter(el => { el.id = id++; el.name = el.type; });

       setScanned(true);
    }

    useEffect(() => {
        socket.emit("dev_scan_req", {});
        socket.on("dev_scan_resp", completeScan);
    }, []);

    let button_disabled = false;
    if (deviceConfirmed) {
        if (!inputInfo["name"]) {
            button_disabled=true;
        }
    }
    else {
        if (scanInfo?.length == 0) {
            button_disabled=true;
        }
    }

    let button_text = (deviceConfirmed ? "Add device" : "Continue");

    let main_content = null;
    if (scanned) { /* specifiyng scanned device data */
        if (deviceConfirmed) {
            main_content =
                <DeviceSetup
                    dev_data={scanInfo ? scanInfo.find(item => item.id == selectId) : {}}
                    onsetinfo={info => setInputInfo(info)}
                    locations={locations}
                />
        }
        else { /* selecting scanned device: */
            main_content =
                <DeviceCardList
                    select_cb={select}
                    scanned_devices={scanInfo}
                />
        }
    }
    else { /* scan in progress, show wait bar */
        main_content = <div>
            <div className="widthy center-pos">
                <img src={process.env.PUBLIC_URL + 'Resources/ico_wait_big.gif'} alt={"Alter ico wait"}/>
            </div>
            <div className="widthy label select-col center-pos">Scanning for devices</div>
        </div>
    }

    return <div>
            <div className='popup darken'>
                <div className='popup-add-inner'>
                    <div id="popup-add-dev-header">
                        <div className="popup-add-text-label center-pos">Add new device</div>
                        <div className="top-right">
                            <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'} onClick={hidePopup}
                                 alt={"close pop up"}/>
                        </div>
                    </div>

                    {main_content}

                    {scanned ?
                        <div className="popup-buttons-container center-pos">
                            <Button className="button cancel" onClick={hidePopup}>Cancel</Button>
                            <Button
                                className={"button active"}
                                onClick={ deviceConfirmed ? addDevice : confirmDevice }
                                disabled={button_disabled}>
                                {button_text}
                            </Button>
                        </div>
                        : null}
                </div>
            </div>

        </div>
}
