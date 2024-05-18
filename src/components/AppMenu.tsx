import {ListItemIcon, ListItemText, MenuItem, MenuList, Paper} from "@mui/material";
import {ReactComponent as LogoRooms} from "../assets/main-menu-rooms.svg";
import {ReactComponent as LogoDevices} from "../assets/main-menu-devices.svg";
import {ReactComponent as LogoSettings} from "../assets/main-menu-settings.svg";
import {ReactComponent as LogoHome} from "../assets/main-menu-home.svg";
import {ReactComponent as LogoRoutines} from "../assets/main-menu-routines.svg";
import {ReactComponent as LogoStatistics} from "../assets/main-menu-statistics.svg";
import React, {FC, useState} from "react";
import {darkTheme} from "./mui/darkThemeStyle";
import {Menu} from "../globals/constants";

type IMenuElement = {
    id: number,
    component: FC<React.SVGProps<SVGSVGElement>>,
    text: string
}

export function AppMenu() {
    const [selectedId, setSelectedId] = useState<number> (Menu.DefaultItem);

    const menu_items: IMenuElement[] = [
        {
            component: LogoHome, text: "Home", id: Menu.Items.Home
        },
        {
            component: LogoRooms, text: "Rooms", id: Menu.Items.Rooms
        },
        {
            component: LogoDevices, text: "Devices", id: Menu.Items.Devices
        },
        {
            component: LogoStatistics, text: "Statistics", id: Menu.Items.Statistics
        },
        {
            component: LogoRoutines, text: "Routines", id: Menu.Items.Routines
        },
        {
            component: LogoSettings, text: "Settings", id: Menu.Items.Settings
        },
    ]

    const activeColor = darkTheme.palette.info.main;

    return (
        <Paper sx={{maxWidth: '100%', p: 0, m: 0}}>
            <MenuList>
                {menu_items.map ((item: IMenuElement) => (
                    <MenuItem
                        key={item.id}
                        sx={{borderLeft: item.id == selectedId ? "3px solid " + activeColor : ""}}
                        onClick={() => setSelectedId (item.id)}
                    >

                        <ListItemIcon sx={{p: 2}}>
                            <item.component fill={selectedId == item.id ? activeColor : "white"}/>
                        </ListItemIcon>

                        <ListItemText sx={{pl: 1, color: selectedId == item.id ? activeColor : "white"}}>
                            {item.text}
                        </ListItemText>

                    </MenuItem>
                ))
                }
            </MenuList>
        </Paper>
    );
}

export default AppMenu;