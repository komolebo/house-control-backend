import {IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Paper} from "@mui/material";
import React, {FC, useEffect} from "react";
import {ReactComponent as LogoEdit} from "../../assets/edit.svg";
import {ReactComponent as LogoUpdate} from "../../assets/update.svg";
import {ReactComponent as LogoRemove} from "../../assets/remove.svg";
import {ReactComponent as LogoClose} from "../../assets/close.svg";
import {Menu} from "../../globals/constants"
import {darkTheme} from "../mui/darkThemeStyle";
import { POPUP_TYPE, useGlobalPopupContext } from "../popups/PopupProvider";

interface IProps {
    updateAvailable: boolean,
    updateTemporaryForbidden: boolean,
    styles: any,
    onclose: () => void
}

type IMenuElement = {
    id: number,
    component: FC<React.SVGProps<SVGSVGElement>>,
    text: string
}

export function SensorSettingsMenu({updateAvailable, updateTemporaryForbidden, onclose, styles}: IProps) {
    const {showPopup} = useGlobalPopupContext();
    const menu_items: IMenuElement[] = 
        updateAvailable ? [
            // Only include "Edit" and "Update" if update is available
            { component: LogoEdit, text: "Edit", id: Menu.SensorEdition.Edit },
            { component: LogoUpdate, text: "Update", id: Menu.SensorEdition.Update },
            { component: LogoRemove, text: "Remove", id: Menu.SensorEdition.Remove },
          ] : [
            { component: LogoEdit, text: "Edit", id: Menu.SensorEdition.Edit },
            { component: LogoRemove, text: "Remove", id: Menu.SensorEdition.Remove },
          ];

    const handleClick = (menuId: number) => {
        switch (menuId) {
            case Menu.SensorEdition.Edit:
                showPopup(POPUP_TYPE.EditDevice, {
                    onAct: () => {}, // update devices data here
                    onClose: () => {},
                    data: {}
                })
                return;
            case Menu.SensorEdition.Update:
                return;
            case Menu.SensorEdition.Remove:
                return;
        }
    }
    const whichColor = (menuId: Menu.SensorEdition, disabled: boolean) => {
        if (menuId === Menu.SensorEdition.Remove) {
            return darkTheme.palette.error.main;
        } else if (menuId === Menu.SensorEdition.Update && disabled) {
            return darkTheme.palette.secondary.main;
        } else {
            return darkTheme.palette.text.primary;
        }
    }

    
    useEffect (() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                onclose();
            }
        }

        document.addEventListener ('keyup', handleEscapeKey)
        return () => document.removeEventListener ('keyup', handleEscapeKey)
    }, [onclose])

    return <Paper sx={{p: 0, m: 0, display: "flex", ...styles}}>
        <MenuList>
            {menu_items.map ((item: IMenuElement) => (
                <MenuItem
                    key={item.id}
                    onClick={() => handleClick (item.id)}
                >

                    <ListItemIcon sx={{p: 2}}>
                        <item.component fill={whichColor(item.id, updateTemporaryForbidden)}/>
                    </ListItemIcon>

                    <ListItemText sx={{color: whichColor(item.id, updateTemporaryForbidden)}}>
                        {item.text}
                    </ListItemText>

                </MenuItem>
            ))}
        </MenuList>

        <IconButton sx={{position: "absolute", top: 0, right: 0}}
                    onClick={onclose}
        >
            <LogoClose 
                fill={darkTheme.palette.secondary.main}
            />
        </IconButton>
    </Paper>
}
