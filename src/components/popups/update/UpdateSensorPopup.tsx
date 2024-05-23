import { Button, Typography } from "@mui/material";
import { SensorCard, SensorCardState } from "../elements/SensorCard";
import { useGlobalPopupContext } from "../PopupProvider";
import { Sensor } from "../../../globals/constants";

interface IProps {
    sensor: Sensor.EditableRecord
}
interface IButtonsProps {
    onclose: () => void,
    onconfirm: () => void
}

function UpdateSensorButtons({onclose, onconfirm}: IButtonsProps) {
    return <div style={{width: "100%", paddingTop: 30, display: "flex", justifyContent: "flex-end"}}>
        <Button variant="text" color="primary"
                onClick={onclose}
        > Cancel
        </Button>

        <Button variant="contained" color="info"
                sx={{ml: 2}}
                onClick={onconfirm}
        > Update
        </Button>
    </div>
}

export function UpdateSensorPopup() {
    const {popupProps} = useGlobalPopupContext();
    const {sensor}: IProps = popupProps.data;

    const update = () => {
        // make socket request here
        popupProps.onAct(sensor);
    }

    return <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: 300}}>
        <SensorCard cardState={SensorCardState.selected} sensorType={sensor.sensorType}/>

        <Typography align="center" sx={{maxWidth: 250, pt: 3}}>Do you want to update "{sensor.name}"</Typography>

        <UpdateSensorButtons onclose={popupProps.onClose} onconfirm={update}/>
    </div>
}