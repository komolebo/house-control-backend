import React, {useEffect, useRef, useState} from 'react';
import '../../styles/popups/SettingsPopup.module.css';
import {PopupProps, useGlobalPopupContext} from "./PopupProvider";

interface IProps {
    positionSource: number,
}
interface IState {
    update: boolean,
    remove: boolean,
    width: number,
    height: number,
    pos_src: any,
    styles: {
        top: number,
        right: number
    }
}
export enum DeviceAction { Remove,Edit, Update , NoAction}

export default function SettingsPopup({onAct, data, onClose}: PopupProps) {
    const {hidePopup} = useGlobalPopupContext ();
    let [action, setAction] = useState<DeviceAction>()
    const [state, setState] = useState<IState> ({
        update: false, // TODO: ??
        remove: true,
        height: 0,
        width: 0,
        pos_src: data.postionSource,
        styles: {top: 0, right: 0}
    })
    const [windowWidth, setWindowWidth] = useState (window.innerWidth);
    const [windowHeight, setWindowHeight] = useState (window.innerHeight);
    const [xPos, setXPos] = useState (0);
    const [yPos, setYPos] = useState (0);
    const TOP_OFFSET = 30;
    const X_OFFSET = 0;
    const STICK_GAP = 100;
    const DISAPPEAR_GAP = 50;
    const intervalRef = useRef(); // useRef hook for the interval

    const remove = () => {
        onClose ();
        onAct(DeviceAction.Remove);
    }
    const update = () => {
        onClose ();
        onAct(DeviceAction.Update);
    }
    const edit = () => {
        onClose ();
        onAct(DeviceAction.Edit);
    }
    const getYPos = () => {
        let src_top = state.pos_src.getBoundingClientRect ().top - TOP_OFFSET;
        if (state) {
            let remaining_gap = state.height - src_top;
            if (remaining_gap < DISAPPEAR_GAP) {
                hidePopup ();
                return -1;
            } else if (remaining_gap < STICK_GAP) {
                src_top = state.height - STICK_GAP;
            } else { /* Do nothing with src_top */
            }
        }
        return src_top;
    }
    const getXPos = () => {
        return state.pos_src.getBoundingClientRect ().right - X_OFFSET;
    }
    const updateView = () => {
        let top = getYPos ();
        let right = getXPos ();

        if (top >= 0 && right >= 0 && state.width) {
            setState ({
                ...state,
                styles: {
                    top: top,
                    right: state.width - right
                }
            })
        }
    }
    const updateWindowDimensions = () => {
        setState ({
            ...state,
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        // intervalRef.current = setInterval(() => {
        //     updateView(); // Your updateView function logic goes here
        // }, 1000 / 3);
        updateWindowDimensions ();
        window.addEventListener ('resize', updateWindowDimensions);

        return () => {
            clearInterval (intervalRef.current);
            window.removeEventListener ('resize', updateWindowDimensions);
        }
    }, [])

    return state.styles ? (
        <div className='popup'>
            <div className='popup-settings-inner' style={state.styles} onMouseLeave={hidePopup}>
                {state.update ? (
                    <div id="popup-setting-item">
                        <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_device_update.png'}
                             onClick={() => onAct(DeviceAction.Update)} alt={"Alter update"}/>
                        <div className="red-col label">Update</div>
                    </div>
                ) : null
                }

                <div id="popup-setting-item">
                    <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_device_remove.png'}
                         onClick={() => onAct(DeviceAction.Remove)} alt={"Alter delete"}/>
                    <div className="select-col label">Delete</div>
                </div>
                <div id="popup-setting-item">
                    <img src={process.env.PUBLIC_URL + 'Resources/ico_settings_device_edit.png'}
                         onClick={() => onAct(DeviceAction.Edit)} alt={"Alter edit"}/>
                    <div className="select-col label">Edit</div>
                </div>
            </div>
        </div>
    ) : <div/>
}
