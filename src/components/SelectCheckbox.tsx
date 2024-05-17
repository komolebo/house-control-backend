import React from 'react';
import '../styles/Components/SelectCheckbox.module.css'


export interface IProps {
    checked: boolean,
    onclick: () => void
}

function SelectCheckbox({onclick, checked}: IProps) {
    const STATE_NAME = checked ? "active" : "inactive";

    return <div id="scanned-dev-checkbox">
        <img src={process.env.PUBLIC_URL + `Resources/checkbox_select_${STATE_NAME}.png`} onClick={onclick}/>
    </div>
}

export default SelectCheckbox;