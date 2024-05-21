import {Typography} from "@mui/material";
import {Sensor} from "../../../../globals/constants";
import {ReactComponent as LogoWarning} from "../../../../assets/warning.svg"
import {darkTheme} from "../../../mui/darkThemeStyle";

interface IProps {
    sensorRec?: Sensor.EditableRecord
}

export function SensorFinalError({sensorRec}: IProps) {
    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center"
    }}
    >
        <div style={{padding: "20px 0 0 0"}}>
            <LogoWarning fill={darkTheme.palette.error.main}/>
        </div>

        <Typography variant="h3" color="error">Sensor couldn't be added</Typography>
    </div>
}