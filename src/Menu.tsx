import React, {useState} from 'react';
import './styles/Menu.css';

interface IState {
    selectedItem: number
}

const menu_data = [
    {id: 0, png: "./Resources/main_menu_home", text: "Home"},
    {id: 1, png: "./Resources/main_menu_rooms", text: "Rooms"},
    {id: 2, png: "./Resources/main_menu_devices", text: "Devices"},
    {id: 3, png: "./Resources/main_menu_statistics", text: "Statistics"},
    {id: 4, png: "./Resources/main_menu_routines", text: "Routines"},
    {id: 5, png: "./Resources/main_menu_settings", text: "Settings"},
    // {id: 6, png: "./Resources/main_menu_settings",   text: "Settings" },
    // {id: 7, png: "./Resources/main_menu_settings",   text: "Settings" },
]

function NavMenu() {
    const [state, setState] = useState<IState> ({selectedItem: 2});

    const handleClick = (rowId: number) => {
        console.log ("HandleClick ", rowId);

        setState ({...state, selectedItem: rowId});
    }
    return <div>
        <table id="main-menu">
            {menu_data.map (menu_item => (
                <tr className="menu-row" onClick={() => handleClick (menu_item.id)} id={menu_item.id.toString()}>
                    <td className={"menu-item" + (menu_item.id == state.selectedItem ? " menu-border-selected" : " menu-border")}>
                        <img
                            src={process.env.PUBLIC_URL + menu_item.png + (menu_item.id == state.selectedItem ? '_active' : '_inactive') + '.png'}
                            alt={"Alter menu item"}>
                        </img>
                    </td>

                    <td className={"menu-item menu-text " + (menu_item.id == state.selectedItem ? "menu-text-active" : "menu-text-inactive")}>
                        {menu_item.text}
                    </td>
                </tr>
            ))}
        </table>
    </div>
}

export default NavMenu;