import React, {useState} from 'react';
import {DeviceCard} from './AddDeviceCard'
import '../../../styles/popups/add/AddDeviceCardList.css'

interface IProps {
    select_cb: (id: number) => void,
    scanned_devices: any
}
interface IState {
    selected: number,
    focus_start: number
}
interface IScanList {
    curr_focus: number,
    curr_selected: number,
    scanned_devices: any,
    onselect: (id: number) => void
}

function NoDeviceFound() {
    return <div className="scan-dev-nothing-found center-pos">
        No device found
    </div>
}

function ScannedDevice({device_data}: any) {
    return <div className="scan-dev-single center-pos">
        <DeviceCard onclick={() => {}} checked={true} checkable={false} dev_data={device_data}/>
    </div>
}

function ScannedList({curr_focus, curr_selected, scanned_devices, onselect}: IScanList) {
    return  <div id="scan-dev-list">
        {scanned_devices.map((device_data: any) => (
            // dispaly only if it's focused, 2 items to display at the same time
            (curr_focus == device_data.id || curr_focus + 1 == device_data.id ?
                <DeviceCard onclick={onselect} dev_data={device_data}
                            checked={curr_selected == device_data.id} checkable={true}/>
                : null
            )))}
    </div>
}

export function DeviceCardList({select_cb, scanned_devices}: IProps) {
    const [state, setState] = useState<IState>({focus_start: 0, selected: 0});

    const select = (id: number) => {
        select_cb(id);
        setState({
            ...state, selected: id
        })
    }
    const scrollLeft = () => {
        setState({
            ...state, focus_start: state.focus_start - 1
        })
    }
    const scrollRight = () => {
        setState({
            ...state, focus_start: state.focus_start + 1
        })
    }

    console.log(scanned_devices);

    return <div id="scan-dev-info-section">
        {state.focus_start > 0 ?
            <div className="scan-dev-paginator scan-dev-paginator-left center-pos" onClick={scrollLeft}>
                <img src={process.env.PUBLIC_URL + 'Resources/paginator_left.png'}/>
            </div>
            : null}

        {scanned_devices.length >= 2 ?
            <ScannedList
                curr_focus={state.focus_start} curr_selected={state.selected}
                onselect={select} scanned_devices={scanned_devices}
            /> : scanned_devices.length == 1 ?
                <ScannedDevice device_data={scanned_devices[0]}/> : <NoDeviceFound/>
        }

        {state.focus_start + 2 < scanned_devices.length ?
            <div className="scan-dev-paginator scan-dev-paginator-right center-pos" onClick={scrollRight}>
                <img src={process.env.PUBLIC_URL + 'Resources/paginator_right.png'}/>
            </div>
            : null}
    </div>
}
