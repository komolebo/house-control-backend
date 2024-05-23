import { Button, Typography } from "@mui/material";
import { Sensor } from "../../../globals/constants";
import { SensorCard, SensorCardState } from "../elements/SensorCard";
import { useGlobalPopupContext } from "../PopupProvider";

interface IProps {
    sensor: Sensor.EditableRecord
}

interface IButtonsProps {
    onclose: () => void,
    onconfirm: () => void
}

function RemoveSensorButtons({onclose, onconfirm}: IButtonsProps) {
    return <div style={{width: "100%", paddingTop: 30, display: "flex", justifyContent: "flex-end"}}>
        <Button variant="text" color="primary"
                onClick={onclose}
        > Cancel
        </Button>

        <Button variant="contained" color="error"
                sx={{ml: 2}}
                onClick={onconfirm}
        > Remove
        </Button>
    </div>
}

export function RemoveSensorPopup() {
    const {hidePopup, popupProps} = useGlobalPopupContext();
    const {sensor}: IProps = popupProps.data;

    const remove = () => {
        // make socket request here
        popupProps.onAct(sensor);
    }

    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: 300}}>
        <SensorCard cardState={SensorCardState.default} sensorType={sensor.sensorType}/>

        <Typography align="center" sx={{maxWidth: 250, pt: 3}}>Do you want to remove "{sensor.name}"</Typography>

        <RemoveSensorButtons onclose={popupProps.onClose} onconfirm={remove}/>
    </div>
}