import {NotificationSeverity} from "../../../globals/NotificationData";
import {IconButton, Tooltip, Typography} from "@mui/material";
import {ReactComponent as LogoSeverity} from "../../../assets/notification-severity.svg";
import {ReactComponent as LogoCheckMark} from "../../../assets/check-mark.svg";
import {ReactComponent as LogoEnvelope} from "../../../assets/envelope.svg";
import {ReactComponent as LogoRemove} from "../../../assets/remove.svg";
import {darkTheme} from "../../mui/darkThemeStyle";

interface IProps {
    id : number,
    date: string,
    isRead: boolean,
    severity: NotificationSeverity,
    text: string,
    onread: (id: number) => void,
    onremove: (id: number) => void
}
interface IStatusProps {
    status: NotificationSeverity
}
interface IInfoProps {
    text: string,
    date: string
}
interface IActionProps {
    isRead: boolean,
    recentlyRead: boolean,
    onread: () => void,
    onremove: () => void
}

function NotifyStatus({status}: IStatusProps) {
    let color: string, title: string;
    if (status === NotificationSeverity.low || status === NotificationSeverity.normal) {
        color = darkTheme.palette.info.main;
        title = "";
    } else {
        color = darkTheme.palette.error.main;
        title = "Please check";
    }

    return <Tooltip title={title}>
        <IconButton>
            <LogoSeverity fill={color}/>
        </IconButton>
    </Tooltip>
}

function NotifyInfo({date, text}: IInfoProps) {
    return <div style={{display: "flex", flexDirection: "column", paddingLeft: 10}}>
        <Typography variant="h5" color="white" sx={{py: 1}}>
            {text}
        </Typography>
        <Typography variant="h6" color="secondary.main">
            {date}
        </Typography>
    </div>
}

function NotifyAction({isRead, recentlyRead, onread, onremove}: IActionProps) {
    const color = isRead && recentlyRead ? darkTheme.palette.info.main : darkTheme.palette.secondary.main;
    return <div style={{display: "flex", flexDirection: "column", marginLeft: "auto"}}>
        <IconButton onClick={onremove}>
            <LogoRemove fill={darkTheme.palette.secondary.main}/>
        </IconButton>

        <IconButton onClick={onread}>
            {isRead ?
                <LogoCheckMark stroke={color}/>
                :
                <LogoEnvelope stroke={darkTheme.palette.secondary.main}/>
            }

        </IconButton>
    </div>
}

export function NotificationItem({date, id, isRead, severity, text, onremove, onread}: IProps) {
    const remove = () => {
        onremove(id);
    }
    const read = () => {
        onread(id);
    }
    return <div style={{ width: "100%", display: "flex", padding: "20px 0px",
        borderBlock: "solid 0.5px #000000",
         opacity: isRead ? "20%" : "100%"}}
    >
        <NotifyStatus status={severity}/>
        <NotifyInfo text={text} date={date}/>
        <NotifyAction isRead={isRead} recentlyRead={id == 2 || id == 3} onread={read} onremove={remove}/>
    </div>
}

export default NotificationItem;