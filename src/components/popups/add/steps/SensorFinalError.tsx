import {Typography} from "@mui/material";
import {SensorCard} from "../elements/SensorCard";
import {Sensor} from "../../../../globals/constants";

interface IProps {
    sensorRec?: Sensor.SensorRecord
}

export function SensorFinalError({sensorRec}: IProps) {
    return <div style={{display: "flex", flexDirection: "column"}}>
        {/*<SensorCard active={false} sensorType={sensorRec.sensorType}/>*/}

        <Typography variant="h2">Sensor successfully added</Typography>
    </div>
}