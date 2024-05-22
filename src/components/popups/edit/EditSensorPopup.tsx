import { Button, Typography, useScrollTrigger } from "@mui/material"
import { Sensor } from "../../../globals/constants"
import { POPUP_TYPE, useGlobalPopupContext } from "../PopupProvider"
import { ModifySensor } from "../elements/ModifySensor"
import { useState } from "react"

interface IProps {
    sensor: Sensor.DetailedRecord
}
interface IButtonsProps {
    disabled: boolean,
    onclose: () => void,
    onconfirm: () => void
}

export function EditSensorButtons({disabled, onclose, onconfirm}: IButtonsProps) {
    return <div style={{paddingTop: 30, display: "flex", justifyContent: "flex-end"}}>
        <Button variant="text" color="primary"
                onClick={onclose}
        > Cancel
        </Button>

        <Button variant="contained" color="info"
                sx={{ml: 2}}
                disabled={disabled}
                onClick={onconfirm}
        > Save
        </Button>
    </div>
}

function EditSensorHeader() {
    return <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <Typography variant={"h1"} sx={{pb: 3}}>
            Edit sensor
        </Typography>
    </div>
}

export function EditSensorPopup() {
    const {hidePopup, popupProps} = useGlobalPopupContext();
    const {sensor}: IProps = popupProps.data;
    const [changedSensor, setChangedSensor] = useState<Sensor.EditableRecord>({...sensor}); // deep copy

    const inputDataValid = () : boolean => {
        if (sensor.name === changedSensor.name) {// && sensor.location === changedSensor.location) {
            return false; // data is same -> consider as an invalid input
        }
        // check name validity
        return changedSensor.name !== undefined && changedSensor.name.length > 0;
    }
    const saveChange = () => {
        popupProps.onAct(changedSensor);
        // make here socket request to update data
    }
    const updateSensorValue = (newSensorValue: Sensor.EditableRecord) => {
        const newName = newSensorValue.name !== undefined ? newSensorValue.name : changedSensor.name;
        const newLocation = newSensorValue.location !== undefined ? newSensorValue.location : changedSensor.location;
        setChangedSensor({...changedSensor, name: newName, location: newLocation});
    }

    const close = () => {
        hidePopup();
    }

    return <div>
        <EditSensorHeader/>

        <ModifySensor sensor={changedSensor} onupdate={updateSensorValue}/>

        <EditSensorButtons disabled={!inputDataValid()} onclose={close} onconfirm={saveChange} />
    </div>
}