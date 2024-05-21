import { Button, Typography } from "@mui/material"
import { Sensor } from "../../../globals/constants"
import { POPUP_TYPE, useGlobalPopupContext } from "../PopupProvider"
import { ModifySensor } from "../elements/ModifySensor"

interface IProps {
    sensor?: Sensor.DetailedRecord
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

export function EditSensorPopup({sensor}: IProps) {
    const {hidePopup, popupProps} = useGlobalPopupContext();

    const inputValid = () => {
        return true;
    }
    const saveChange = () => {

    }
    const close = () => {
        hidePopup();
    }

    return <div>
        <EditSensorHeader/>

        <ModifySensor sensor={{id: 2, location: "Kitchen", name: "Some name", sensorType: Sensor.Types.Leak}}/>

        <EditSensorButtons disabled={inputValid()} onclose={close} onconfirm={saveChange} />
    </div>
}