import React from 'react';
import '../../../styles/popups/notification/Notification.module.css'
import '../../../styles/popups/Common.module.css'
import { PopupProps } from '../PopupProvider';
import NotificationHeader from './NotificationHeader';

interface IProps {
    onclose: () => void
}

enum NotificationSeverity { high, normal, low };
type NotificationItem = {
    date: string,
    text: string,
    severity: NotificationSeverity,

}


export function NotificationPopup({}: PopupProps) {
    return (
        <div style={{width: 400}}>
            <NotificationHeader unreadMessages={5}/>
        </div>
    )

}

export function NotificationPopup2({onclose}: IProps) {
    return (
        <div>
            <div className='popup'>
                <div className='popup-notify-inner'>
                    <div className='head'>
                        <div className='element'>
                            <img className=""
                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_popup_.png'}
                                 alt={"Alter ico notif tab"}/>
                        </div>
                        <div className='popup-text label white'>Notifications</div>
                        <div className='popup-count label white'>4</div>
                    </div>
                    <div className='notification-list'>
                        <ul>
                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_red.png'}
                                             alt={"Alter ico notif red"}/>
                                    </div>
                                    <div className='item-data'>
                                        <div className='label item-text'>Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elitdsadkl
                                        </div>
                                        <div className='item-time time-style'>Today, 10:00 AM</div>
                                    </div>
                                    <div className='item-action'>
                                        <div className='item-delete'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}
                                                 alt={"Alter ico notif delete"}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_close_blue.png'}
                                                 alt={"Alter ico message blue"}/>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}
                                             alt={"Alter ico notif blue"}/>
                                    </div>
                                    <div className='item-data'>
                                        <div className='label item-text'>Lorem ipsum dolor sit amet,
                                            consectetur adipiscing elitdsadkl
                                        </div>
                                        <div className='item-time time-style'>Today, 10:00 AM</div>
                                    </div>
                                    <div className='item-action'>
                                        <div className='item-delete'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}
                                                 alt={"Alter ico notif delete"}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_close.png'}
                                                 alt={"Alter ico message close"}/>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}
                                             alt={"Alter ico notif blue"}/>
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
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}
                                                 alt={"Alter ico notif delete"}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_close.png'}
                                                 alt={"Alter ico message close"}/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico diaphanous'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}/>
                                    </div>
                                    <div className='item-data diaphanous'>
                                        <div className='label item-text'>Lorem ipsum1 dolor sit amet,
                                            consectetur adipiscing elitdsadkl
                                        </div>
                                        <div className='item-time time-style'>Today, 10:00 AM</div>
                                    </div>
                                    <div className='item-action'>
                                        <div className='item-delete'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}
                                                 alt={"Alter notif delete"}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_open.png'}/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico diaphanous'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}/>
                                    </div>
                                    <div className='item-data diaphanous'>
                                        <div className='label item-text'>Lorem ipsum1 dolor sit amet,
                                            consectetur adipiscing elitdsadkl
                                        </div>
                                        <div className='item-time time-style'>Today, 10:00 AM</div>
                                    </div>
                                    <div className='item-action'>
                                        <div className='item-delete'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_open.png'}/>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className='notity-item'>
                                    <div className='item-ico diaphanous'>
                                        <img className=""
                                             src={process.env.PUBLIC_URL + 'Resources/ico_notification_blue.png'}/>
                                    </div>
                                    <div className='item-data diaphanous'>
                                        <div className='label item-text'>Lorem ipsum1 dolor sit amet,
                                            consectetur adipiscing elitdsadkl
                                        </div>
                                        <div className='item-time time-style'>Today, 10:00 AM</div>
                                    </div>
                                    <div className='item-action'>
                                        <div className='item-delete'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_notification_delete.png'}/>
                                        </div>
                                        <div className='item-status-notification'>
                                            <img className=""
                                                 src={process.env.PUBLIC_URL + 'Resources/ico_massege_open.png'}/>
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