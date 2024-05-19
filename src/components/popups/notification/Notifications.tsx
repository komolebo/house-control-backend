import React, {useState} from 'react';
import '../../../styles/popups/notification/Notification.module.css'
import '../../../styles/popups/Common.module.css'
import NotificationHeader from './NotificationHeader';
import NotificationItem from "./NotificationItem";
import {Box} from "@mui/material";
import {NotificationObject, NotificationSeverity} from "../../../globals/NotificationData";

interface IProps {
    onclose: () => void
}
interface IState {
    notifications: NotificationObject[]
}

export function NotificationPopover() {
    const notifications: NotificationObject[] = [
        {
            id: 0,
            text: "There is new SW available",
            severity: NotificationSeverity.low,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 1,
            text: "There is new SW available",
            severity: NotificationSeverity.low,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 2,
            text: "There is new SW available",
            severity: NotificationSeverity.high,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 3,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 4,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 5,
            text: "There is new SW available",
            severity: NotificationSeverity.low,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 6,
            text: "There is new SW available",
            severity: NotificationSeverity.high,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 7,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 8,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 9,
            text: "There is new SW available",
            severity: NotificationSeverity.low,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 10,
            text: "There is new SW available",
            severity: NotificationSeverity.high,
            isRead: true,
            date: "Today, 10:00 AM"
        },
        {
            id: 11,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        },
        {
            id: 12,
            text: "There is new SW available",
            severity: NotificationSeverity.normal,
            isRead: false,
            date: "Today, 10:00 AM"
        }
    ]
    const [state, setState] = useState<IState>({notifications: notifications});

    const remove = (id: number) => {
        setState({...state, notifications: state.notifications.filter(
            item => item.id !== id)})
    }
    const read = (id: number) => {
        setState({...state, notifications: state.notifications.map(
            item => (item.id === id ? {...item, isRead: !item.isRead} : item))})
    }

    return (
        <div style={{width: 350, padding: "20px 20px 0 20px"}}>
            <NotificationHeader unreadMessages={state.notifications.length}/>

            <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
                {state.notifications.map (item => (
                    <NotificationItem id={item.id} key={item.id}
                                      date={item.date}
                                      text={item.text}
                                      severity={item.severity}
                                      isRead={item.isRead}
                                      onread={read}
                                      onremove={remove}
                    />
                ))}
            </Box>
        </div>
    )
}
