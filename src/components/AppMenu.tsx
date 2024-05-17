import {Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import {ReactComponent as LogoRooms} from "../assets/main-menu-rooms.svg";
import {FC, useState} from "react";

interface IMenuElement {
    component: FC,
    text: string
}

export function AppMenu() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);
    const menu_items: IMenuElement[] = [
        {
            component: LogoRooms, text: "Home"
        },
        {
            component: LogoRooms, text: "Rooms"
        },
        {
            component: LogoRooms, text: "Devices"
        },
        {
            component: LogoRooms, text: "Statistics"
        },
        {
            component: LogoRooms, text: "Settings"
        },
    ]

    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
            { menu_items.map((menu_item, index: number) => (
                <MenuItem sx={{bl: "solid 1 blue"}}>
                    <ListItemIcon sx={{p: 2}} >
                        <LogoRooms fill={index == selectedIdx ? "blue" : "white"}/>
                    </ListItemIcon>

                    <ListItemText sx={{pl: 2, color: ""}} color=>
                        ELEMENT ${index}
                    </ListItemText>
                </MenuItem>
                ))
            }
            </MenuList>
        </Paper>
    );
}

export default AppMenu;