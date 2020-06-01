import React, {Component} from 'react';
import { DeviceCard } from './AddDeviceCard'
import './AddDeviceSetup.css';


export class DeviceSetup extends Component {
    constructor(props) {
        super(props);

        this.pass_data_to_ext = props.set_info_scb;
        this.dev_data = props.dev_data;
        this.locations = props.locations;

        this.data = {
            location : null,
            name : null
        }

        this.onselect = event => {
            this.data.location = event.target.value;
            
            if (this.pass_data_to_ext) { this.pass_data_to_ext(this.data) }
        }
        
        this.oninput = event => {
            this.data.name = event.target.value;

            if (this.pass_data_to_ext) { this.pass_data_to_ext(this.data) }
        }
    }

    render() {
        return <div id="add-dev-setup-info-section"> 
            <div className="left-pos"> {
                DeviceCard(
                    null,
                    this.dev_data, 
                    false, 
                    false
                )}
            </div>
            <div id="add-dev-setup-section" className="left-pos">
                <div className="text-label-simple add-dev-setup-item text-color-grey">Address</div>
                <div className="add-dev-setup-item">
                    <input type="input" class="form__field" placeholder={this.dev_data.mac} name="name" id='name' disabled />
                </div>

                <div className="text-label-simple add-dev-setup-item">Device Location</div>
                <div className="add-dev-setup-item">
                    <select className="select-styled select" onChange={this.onselect}>
                        {this.locations.map(location => (
                            <option className="select1 select-styled select-options" value={location}>{location}</option>
                        ))}
                    </select> 

                </div>

                <div className="text-label-simple add-dev-setup-item">Device name</div>
                <div className="add-dev-setup-item">
                    <input type="input" class="form__field" placeholder="Device name" name="name" id='name' onChange={this.oninput} required />
                </div>
            </div>
        </div>
    }
}