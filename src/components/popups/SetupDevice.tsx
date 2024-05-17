import React from 'react';
import {DeviceCard} from './add/AddDeviceCard'
import '../../styles/popups/SetupDevice.module.css';
import {Input, Select} from "@mui/material";

interface IProps {
    onsetinfo: (data: any) => void,
    dev_data: any,
    locations: string[]
}

const locations = [
    '-- No room --', 'Kitchen', 'Hall'
]


export function DeviceSetup({dev_data, onsetinfo, locations}: IProps) {
    const selectLoc = (event: any) => {
        dev_data.location = event.target.value;
        onsetinfo (dev_data);
    }
    const oninput = (event: any) => {
        dev_data.name = event.target.value;
        onsetinfo (dev_data);
    }

    return <div id="add-dev-setup-info-section">
        <div className="left-pos">
            <DeviceCard onclick={() => {}} dev_data={dev_data} checkable={false} checked={false}/>
        </div>
        <div id="add-dev-setup-section" className="left-pos">
            <div className="text-label-simple add-dev-setup-item text-color-grey">Address</div>
            <div className="add-dev-setup-item">
                <Input type="input" className="form__field" placeholder={dev_data.mac} name="name" id='name' disabled/>
            </div>

            <div className="text-label-simple add-dev-setup-item">Device Location</div>
            <div className="add-dev-setup-item">
                <Select className="select-styled select" onChange={selectLoc} value={true}>
                    <option value="" selected disabled hidden>{dev_data.location}</option>
                    {locations.map (location => (
                        <option className="select1 select-styled select-options" value={location}>{location}</option>
                    ))}
                </Select>

            </div>

            <div className="text-label-simple add-dev-setup-item">Device name</div>
            <div className="add-dev-setup-item">
                <Input type="input" className="form__field" placeholder={dev_data.name} name="name" id='name'
                       onChange={oninput} required/>
            </div>
        </div>
    </div>
}

export default DeviceSetup;