import React, {useEffect} from 'react';
import '../../styles/popups/RemoveDevice.css';
import '../styles/popups/Common.css';
import socket from '../../socketio'

interface IProps {
    onclose: () => void,
    dev_data: any
}

export function RemoveDevicePopup({onclose, dev_data}: IProps) {
    const remove = () => {
        socket.notifyBackend ("dev_rem", {"mac": dev_data.mac});
        onclose ();
    }

    useEffect (() => {
        socket.subscribe ("dev_rem_ack", () => {
            socket.notifyBackend ("dev_read_list", {});
        });

        return () => {

        }
    }, []);

    return <div>
        <div className='popup darken'>
            <div className='popup-remove-inner'>
                <div className="top-right">
                    <img src={process.env.PUBLIC_URL + 'Resources/button_popup_close.png'}
                         onClick={onclose} alt={"Alter popup close"}/>
                </div>
                <div className="pop-remove-top">
                    <div className='center-pos remove-ico'>
                        <img src={process.env.PUBLIC_URL + "Resources/device_" + dev_data.type + ".png"}/>
                    </div>
                    <div className="dev-name-under-ico">
                        {dev_data.name}
                    </div>
                </div>

                <div className="label white center-pos">Do you want to delete {dev_data.name} ?</div>
                <div className="popup-buttons-container center-pos">
                    <button className="button cancel" onClick={onclose}>Cancel</button>
                    <button className="button active" onClick={remove}>Remove</button>
                </div>
            </div>
        </div>
    </div>

}

export default RemoveDevicePopup;