import {SensorCard} from "../elements/SensorCard";
import {Sensor} from "../../../../globals/constants";
import React from "react";
import {AddSensorActionButtons} from "./SensorConfirm";
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";


interface IProps {
    onback: () => void,
    onsave: (data: any) => void,
    sensorRec: Sensor.SensorRecord
}
interface ISensorDetailsProps {
    sensorRec: Sensor.SensorRecord
}

function SensorDefails({sensorRec}: ISensorDetailsProps) {
    const locations = ["Kitchen", "Hall", "None"];

    return <div style={{display: "flex", paddingTop: 25, width: "100%"}}>
        <SensorCard active={false} sensorType={sensorRec.sensorType}/>

        <div style={{display: "flex", flexDirection: "column", paddingLeft: 25}}>
            <Typography variant="h2" color="secondary">ID</Typography>
            <Typography variant="h5" color="secondary" sx={{pt: 1}}>X102201s</Typography>

            <div style={{paddingTop: 20}}>
                <FormControl variant="standard" sx={{ width: "100%"}}>
                    <InputLabel id="demo-simple-select-standard-label">Sensor location</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={0}
                        onChange={() => {}}
                        label="location"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {locations.map((el, index: number) => (
                            <MenuItem value={index}>{el}</MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </div>

            <div style={{paddingTop: 20}}>
                <TextField id="standard-basic" label="Sensor name" variant="standard"/>
            </div>
        </div>
    </div>
}

export function SensorSave({onback, onsave, sensorRec}: IProps) {
    return <div>
        <div style={{paddingBottom: 15}}>
            <SensorDefails sensorRec={sensorRec}/>
        </div>

        <AddSensorActionButtons
            disabled={false}
            onclose={onback}
            onconfirm={() => onsave({})}
            actionText="Add sensor"
        />
    </div>
}
