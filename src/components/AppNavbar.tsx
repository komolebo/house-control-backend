import {Box, ClickAwayListener, Popover, Typography} from "@mui/material"
import {ReactComponent as LogoFaq} from "../assets/nav-faq.svg"
import {ReactComponent as LogoUserIco} from "../assets/debug-user-logo.svg"
import {ReactComponent as LogoNotificationInactive} from "../assets/nav-notif-inactive.svg"
import {Badge} from "@mui/material"
import {IconButton} from "@mui/material"
import React from "react";
import {NotificationPopover} from "./popups/notification/Notifications";

interface INotificationItemProps {
    count: number
}

function UserElem() {
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

function NotificationElem({count}: INotificationItemProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <Box sx={{px: 2}}>
        <IconButton aria-label={notificationsLabel(count)} onClick={handleClick}>
            <Badge badgeContent={count} color="error">
                <LogoNotificationInactive />
            </Badge>
        </IconButton>

        {open ? (
            <ClickAwayListener onClickAway={handleClose}>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    sx={{
                        ml: -4, mt: 2
                    }}
                >
                    <NotificationPopover/>
                </Popover>
            </ClickAwayListener>
            )
            : <></>
            }
    </Box>
}

function FaqElem() {
    return <LogoFaq fill="white"/>
}

export function AppNavbar() {
    return (
        <Box sx={{width: "100%",  display: "flex", justifyContent: "right", alignItems: "center"}}>
            <FaqElem/>
            <NotificationElem count={0}/>
            <UserElem/>
        </Box>
    )
}

export default AppNavbar;