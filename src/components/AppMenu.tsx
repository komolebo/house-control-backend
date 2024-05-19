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
    const [hoverId, setHoverId] = useState<number>(-1);

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
    const borderColor = (id: number) => {
        if (selectedId === id && hoverId === id)
            return "white";
        else if (selectedId == id)
            return activeColor;
        else return darkTheme.palette.background.default;
    }

    return (
        <Paper sx={{maxWidth: '100%', p: 0, m: 0}}>
            <MenuList>
                {menu_items.map ((item: IMenuElement) => (
                    <MenuItem
                        selected={selectedId === item.id}
                        key={item.id}
                        sx={{borderLeft: "3px solid " + borderColor(item.id)}}
                        onClick={() => setSelectedId (item.id)}
                        onMouseEnter={(e) => setHoverId(item.id)}
                        onMouseLeave={(e) => setHoverId(-1)}
                    >

                        <ListItemIcon sx={{p: 2}}>
                            <item.component fill={(selectedId === item.id && hoverId !== item.id) ? activeColor : "white"}/>
                        </ListItemIcon>

                        <ListItemText sx={{ pl: 1 }}>
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