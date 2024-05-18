import { Typography } from "@mui/material";

interface IProps {
    unreadMessages: number
}

export function NotificationHeader({unreadMessages}: IProps) {
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding: 5, paddingBottom: 20}}>
            <Typography variant="h4">Notifications</Typography>
            <Typography variant="h4" sx={{textAlign: "right`"}}>{unreadMessages}</Typography>
        </div>
    )
} 

export default NotificationHeader;