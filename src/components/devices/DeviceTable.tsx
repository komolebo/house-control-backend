import React, {useEffect, useState} from 'react';
import '../../styles/Devices/DeviceTable.css';
import '../styles/Devices/DeviceState.css'
import {DeviceAction} from '../popups/SettingsPopup'
import UpdateProgressBar from './UpdateProgressBar'
import socket from '../../socketio'
import {Input} from "@mui/material";
import {POPUP_TYPE, useGlobalPopupContext} from "../popups/PopupProvider";

interface IProps {
    onpopup: () => void
}

interface IState {
    updateInProgress: boolean,
    dev_info: any,
    selectedId: number,
    devId: number,
    positionSource: any
}

interface IDevice {
    id: number,
    mac: string,
    png: string,
    name: string,
    location: string,
    state: boolean,
    battery: number,
    tamper: boolean,
    status: boolean,
    update: boolean
}

interface IDevSettings {
    device_data: any,
    onupdate: () => void,
    set_ref: (data: any) => void,
    disabled: boolean
}

interface IDevState {
    device_data: any,
    onstatechange: (data: any) => void,
    disabled: boolean
}

interface IBatteryItemProps {
    percent: number
}

interface ITamperItemProps {
    value: number
}

interface IStatusItemProps {
    value: number
}

const table_columns = [
    'Device', 'Name', 'Location', 'State', 'Battery', 'Tamper', 'Status', ''
]

const devices: IDevice[] = [
    // {id:0, mac:"123456", png: "Resources/device_smoke.png", name: 'Smoke Detector', location: 'Kitchen', state: true, battery: 4, tamper: true, status: true, update: true},
    // {id:1, mac:"123456", png: 'Resources/device_leak.png', name: 'Leak Detector', location: 'Kitchen', state: true, battery: 12, tamper: true, status: false, update: false},
    // {id:2, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 29, tamper: true, status: false, update: false},
    // {id:3, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: false, battery: 100, tamper: false, status: false, update: true},
    // {id:4, mac:"123456", png: 'Resources/device_motion.png', name: 'Motion Detector', location: 'Kitchen', state: true, battery: 38, tamper: true, status: false, update: true},
    // {id:5, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
    // {id:6, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: false},    
    // {id:7, mac:"123456", png: 'Resources/device_gas.png', name: 'Gas Detector', location: 'Kitchen', state: true, battery: 2, tamper: true, status: true, update: true},    
]

function BatteryItem({percent}: IBatteryItemProps) {
    const BATTERY_LEVEL_LOW = 8;
    const BATTERY_LEVEL_MIDDLE = 25;
    const BATTERY_LEVEL_HIGH = 100;

    if (percent <= BATTERY_LEVEL_LOW) {
        return <div className="battery-item">
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_low.png'}/>
            <div className="battery-item-text battery-item-low">{percent + '%'}</div>
        </div>
    } else if (percent <= BATTERY_LEVEL_MIDDLE) {
        return <div className="battery-item">
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_middle.png'}/>
            <div className="battery-item-text battery-item-middle">{percent + '%'}</div>
        </div>
    } else {// if (percent <= BATTERY_LEVEL_HIGH) {
        return <div className="battery-item">
            <img src={process.env.PUBLIC_URL + 'Resources/ico_battery_high.png'}/>
            <div className="battery-item-text battery-item-high">{percent + '%'}</div>
        </div>
    }
}

function TamperItem({value}: ITamperItemProps) {
    if (value) {
        return <div>Set</div>
    } else {
        return <div className="tamper-item-set">Unset</div>
    }
}

function StatusItem({value}: IStatusItemProps) {
    if (value) {
        return <div className="status-item-set">Detected</div>
    } else {
        return <div>Not detected</div>
    }
}

function SettingsItem({device_data, onupdate, set_ref, disabled}: IDevSettings) {
    return <div className={"settings-item " + (disabled ? "settings-item-disabled" : "")}
        // onClick={!disabled ? onupdate : null}
                ref={el => set_ref (el)}>
        <img
            src={process.env.PUBLIC_URL + 'Resources/ico_settings_' + (device_data.to_update ? 'active' : 'inactive') + '.png'}/>
    </div>
}

function StateItem({device_data, onstatechange, disabled}: IDevState) {
    return <div>
        <div className="state-switch-cont">
            <label className="state-switch">
                <Input type="checkbox" disabled={disabled} onChange={onstatechange} defaultChecked={device_data}/>
                <span className="slider round"/>
            </label>
        </div>
        <div className={"state-item-text state-item-text-" + (device_data ? "enabled" : "disabled")}>
            {device_data ? 'On' : 'Off'}
        </div>
    </div>
}

export function DeviceTable() {
    const {showPopup} = useGlobalPopupContext ();
    const [state, setState] = useState<IState> ({
        dev_info: devices, selectedId: -1, updateInProgress: false, devId: -1, positionSource: {}
    });
    let tablePos: any = null;
    let refArr: number[] = [];

    const setRef = (element: any, id: number) => {
        refArr[id] = element;
    }
    const showSettingsPopup = (id: number) => {
        showPopup (POPUP_TYPE.Settings, {
            onClose: () => {
            },
            onAct: (act: DeviceAction) => {
                switch (act) {
                    case DeviceAction.Edit:
                        console.log (`edit requested, use saved devId [${state.devId}]`)
                        showEditPopup (id);
                        setState ({...state, devId: state.devId});
                        break;
                    case DeviceAction.Remove:
                        console.log (`remove requested, use saved devId [${state.devId}]`);
                        showRemovePopup (id);
                        setState ({...state, devId: state.devId});
                        break;
                    case DeviceAction.Update:
                        if (state.dev_info.find ((el: any) => el.id == id).to_update) {
                            console.log (`update requested, use saved devId [${state.devId}]`);

                            showRemovePopup (id);
                            setState ({...state, devId: state.devId});
                        }
                        break;
                    default:
                        break;
                }
            },
            data: {positionSource: refArr[id]}
        })
        setState ({...state, devId: id,})
    };
    const showUpdatePopup = (id: number) => {
        showPopup (POPUP_TYPE.UpdateDevice, {
            onAct: confirmUpdate,
            data: {dev_data: state.dev_info.find ((el: any) => el.id == state.devId)},
            onClose: () => {
            }
        })

        setState ({...state, devId: id})
    };
    const showRemovePopup = (id: number) => {
        showPopup (POPUP_TYPE.RemoveDevice, {
            onClose: () => {
            },
            onAct: () => setState ({...state, devId: id}),
            data: {dev_data: state.dev_info.find ((el: any) => el.id == state.devId)}
        })
    };
    const showEditPopup = (id: number) => {
        showPopup (POPUP_TYPE.EditDevice, {
            onClose: () => {
            },
            onAct: () => {
                console.log ("Edit finished");
                setState ({...state, devId: -1});
            },
            data: {dev_data: state.dev_info.find ((el: any) => el.id == state.devId)}
        })

        setState ({...state, devId: id})
    };
    const confirmUpdate = (mac: string) => {
        console.log ("update started, use requested mac", mac);

        let dev_data = state.dev_info.find ((el: any) => el.mac == mac);

        setState ({...state, updateInProgress: true, devId: dev_data.id, positionSource: refArr[dev_data.id]})
    }
    const isItemUpdating = (id: number) => {
        return state.updateInProgress && state.devId == id
    }
    const isItemActive = (id: number) => {
        let update_in_progress = isItemUpdating (id);
        return state.dev_info.find ((el: any) => el.id == id).active && !update_in_progress;
    }
    const state_changed = (i: number) => {
        var obj = state.dev_info.find ((el: any) => el.id === i);

        socket.emit ("dev_upd", obj);

        setState (state.dev_info.map ((device_data: any) => {
            if (device_data.id === i) {
                device_data.state = !device_data.state;
            }
            return device_data;
        }));
    }

    useEffect (() => {
        socket.on ("dev_read_list_resp", (data: any) => {
            setState ({...state, dev_info: data});
        });

        socket.on ("dev_read_list_resp", (data: any) => {
            setState ({...state, dev_info: data});
        });

        socket.on ("dev_upd_ack", () => {
            socket.emit ("dev_read_list", {});
        });

        socket.on ("dev_add_ack", () => {
            socket.emit ("dev_read_list", {});
        });

        socket.on ("dev_disconn", () => {
            socket.emit ("dev_read_list", {});
        });

        socket.on ("dev_notify_data", () => {
            socket.emit ("dev_read_list", {});
        });

        socket.on ("update_dev_ack", (data: any) => {
            confirmUpdate (data["mac"]);
        });

        socket.emit ("dev_read_list", {});
    }, [])


    return <div className="tableFixHead">
        <table id="dev-table" ref={el => {
            tablePos = el;
        }}>
            <tr className="table-header">
                {table_columns.map (column_name => (
                    <th className="dev-table-header dev-table-item">{column_name}</th>
                ))}
            </tr>

            {state.dev_info.map ((device_data: any) => (
                <tr className={"dev-table-row"}>
                    {isItemUpdating (device_data.id) ? (
                        <td>
                            <UpdateProgressBar
                                x={tablePos.getBoundingClientRect ().x}
                                y={state.positionSource.getBoundingClientRect ().y}
                                oncomplete={() => {
                                    console.log ("Update finished");
                                    setState ({...state, updateInProgress: false, devId: -1});
                                }}
                            />
                        </td>
                    ) : (
                        <td className={"dev-table-item dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                            <img
                                src={process.env.PUBLIC_URL + "Resources/device_" + device_data.type + ".png"}
                                alt={"Alter device data text"}/>
                        </td>
                    )}


                    <td className={"dev-table-item dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        {device_data.name}
                    </td>

                    <td className={"dev-table-item dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        {device_data.location}
                    </td>

                    <td className={"dev-table-item " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        <StateItem
                            device_data={device_data.state}
                            onstatechange={(x) => state_changed (device_data.id)}
                            disabled={state.updateInProgress && state.devId == device_data.id}
                        />
                    </td>

                    <td className={"dev-table-item " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        <BatteryItem percent={device_data.battery}/>
                    </td>

                    <td className={"dev-table-item dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        <TamperItem value={device_data.tamper}/>
                    </td>

                    <td className={"dev-table-item dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        <StatusItem value={device_data.status}/>
                    </td>

                    <td className={"dev-tab-item-text " + (isItemActive (device_data.id) ? "" : "diaphanous")}>
                        <SettingsItem
                            disabled={state.updateInProgress}
                            set_ref={el => setRef (el, device_data.id)}
                            onupdate={() => showSettingsPopup (device_data.id)}
                            device_data={device_data}
                        />
                    </td>
                </tr>
            ))}
        </table>
    </div>
}

export default DeviceTable;