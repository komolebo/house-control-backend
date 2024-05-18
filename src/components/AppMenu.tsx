import {Divider, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, Typography} from "@mui/material";
import {ReactComponent as LogoRooms} from "../assets/main-menu-rooms.svg";
import {ReactComponent as LogoDevices} from "../assets/main-menu-devices.svg";
import {ReactComponent as LogoSettings} from "../assets/main-menu-settings.svg";
import {ReactComponent as LogoHome} from "../assets/main-menu-home.svg";
import {ReactComponent as LogoRoutines} from "../assets/main-menu-routines.svg";
import {ReactComponent as LogoStatistics} from "../assets/main-menu-statistics.svg";
import React, {FC, useState} from "react";
import { darkTheme } from "./mui/darkThemeStyle";

type IMenuElement = {
    component: FC<React.SVGProps<SVGSVGElement>>,
    text: string
}

export function AppMenu() {
    const [selectedIdx, setSelectedIdx] = useState<number>(0);

    const menu_items: IMenuElement[] = [
        {
            component: LogoHome, text: "Home"
        },
        {
            component: LogoRooms, text: "Rooms"
        },
        {
            component: LogoDevices, text: "Devices"
        },
        {
            component: LogoStatistics, text: "Statistics"
        },
        {
            component: LogoRoutines, text: "Routines"
        },
        {
            component: LogoSettings, text: "Settings"
        },
    ]

    const activeColor = darkTheme.palette.info.main;

    return (
        <Paper sx={{ maxWidth: '100%', p: 0, m: 0 }}>
            <MenuList>
            { menu_items.map((item: IMenuElement, index: number) => (
                <MenuItem
                    key={index}
                    sx={{borderLeft: index == selectedIdx ? "3px solid " + activeColor : ""}} 
                    onClick={() => setSelectedIdx(index)}
                    >

                    <ListItemIcon sx={{p: 2}}>
                        <item.component fill={selectedIdx == index ? activeColor : "white"}/>
                    </ListItemIcon>
                    
                    <ListItemText sx={{pl: 1, color: selectedIdx == index ? activeColor : "white"}}>
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