import React, {Component} from 'react';
import './Notification.css'
import '../Common.css'


export default class NotificationPopup extends Component {
    constructor (props) {
        super(props);

        this.close_cb = props.close_cb;
    }

    
    render() {
        return (
            <div>
                <div className='popup'>
                    <div className='popup-notify-inner' > 
                        <div className='head'>
                            <div className='element'>
                                <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_popup_.png'}></img>   
                            </div>
                            <div className='popup-text label white'>Notifications</div>
                            <div className='popup-count label white'>4</div>
                        </div>
                        <div className='notification-list'>
                            <ul> 
                                <li>
                                    <div className='notity-item'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_red.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_active.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div className='notity-item'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_active.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                
                                <li>
                                    <div className='notity-item'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                            <div className='item-action'>
                                                <button className="button select-col action">Update</button>
                                            </div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_active.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li> 


                                <li>
                                    <div className='notity-item '>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_active.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='notity-item'>
                                        <div className='item-ico diaphanous'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data diaphanous'>
                                            <div className='label item-text diaphanous'>Lorem ipsum1 dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style diaphanous'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_inactive.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='notity-item diaphanous'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum1 dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_inactive.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='notity-item diaphanous'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum1 dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_inactive.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li> 
                                <li>
                                    <div className='notity-item diaphanous'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum1 dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_inactive.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className='notity-item diaphanous'>
                                        <div className='item-ico'>
                                            <img className="" src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}></img>
                                        </div>
                                        <div className='item-data'>
                                            <div className='label item-text'>Lorem ipsum1 dolor sit amet, 
                                                consectetur adipiscing elitdsadkl 
                                            </div>
                                            <div className='item-time time-style'>Today, 10:00 AM</div>
                                        </div>
                                        <div className='item-action'>
                                            <div className='item-delete'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}></img>
                                            </div>
                                            <div className='item-status-notification'>
                                                <img className=""src={process.env.PUBLIC_URL + 'Resources/ico_status_message_inactive.png'}></img>
                                            </div>
                                        </div>
                                    </div>
                                </li>                
                            </ul>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}