import { Box, Typography } from "@mui/material"
import {ReactComponent as LogoFaq} from "../assets/nav-faq.svg"
import {ReactComponent as LogoUserIco} from "../assets/debug-user-logo.svg"
import {ReactComponent as LogoNotificationInactive} from "../assets/nav-notif-inactive.svg"
import {Button, Badge} from "@mui/material"
import {IconButton} from "@mui/material"
import { POPUP_TYPE, useGlobalPopupContext } from "./popups/PopupProvider"

interface INotificationItemProps {
    count: number
}

function UserItem() {
    return <Box sx={{display: "flex", alignItems: "center"}}>
        <LogoUserIco fill="white"/>
        <Typography 
            variant="h5" 
            color="text.primary"
            sx={{px: 1}}
        > Username 
        </Typography>
    </Box>
}

function notificationsLabel(count: number) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }

function NotificationItem({count}: INotificationItemProps) {
    const {showPopup} = useGlobalPopupContext();

    const openPopup = () => {
        showPopup(POPUP_TYPE.Notification, {
            onAct: () => {},
            onClose: () => {},
            data: {}
        })
    }

    return <Box sx={{px: 2}}>
        <IconButton aria-label={notificationsLabel(count)} onClick={openPopup}>
            <Badge badgeContent={count} color="error">
                <LogoNotificationInactive />
            </Badge>
        </IconButton>        
    </Box>
}

function FaqItem() {
    return <LogoFaq fill="white"/>
}

export function AppNavbar() {
    return (
        <Box sx={{width: "100%",  display: "flex", justifyContent: "right", alignItems: "center"}}>
            <FaqItem/>
            <NotificationItem count={0}/>
            <UserItem/>
        </Box>
    )
}

export default AppNavbar;