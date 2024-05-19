import { Typography } from "@mui/material";
import { SensorCard, SensorCardState } from "../elements/SensorCard";
import { Sensor } from "../../../../globals/constants";

interface IProps {
    sensorInfo: Sensor.SensorRecord
}

export function SensorFinalSuccess({sensorInfo}: IProps) {
    return <div style={{
        display: "flex", 
        flexDirection: "column", 
        width: "100%", 
        alignItems: "center"}}
    >
        <div style={{padding: "40px 0"}}>
            <SensorCard cardState={SensorCardState.added} sensorType={sensorInfo.sensorType} />
        </div>

        <Typography variant="h3" color="primary">Sensor successfully added</Typography>
    </div>
}