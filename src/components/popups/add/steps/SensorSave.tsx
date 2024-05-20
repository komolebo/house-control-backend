import {SensorCard, SensorCardState} from "../elements/SensorCard";
import {Sensor} from "../../../../globals/constants";
import React from "react";
import {AddSensorActionButtons} from "./SensorConfirm";
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";


interface IProps {
    onback: () => void,
    onsave: (data: any) => void,
    onerror: (msg: string) => void,
    sensorRec: Sensor.SimpleRecord
}
interface ISensorDetailsProps {
    sensorRec: Sensor.SimpleRecord
}

function SensorDetails({sensorRec}: ISensorDetailsProps) {
    const locations = ["Kitchen", "Hall", "None"];

    return <div style={{display: "flex", paddingTop: 25, width: "100%"}}>
        <SensorCard cardState={SensorCardState.default} sensorType={sensorRec.sensorType}/>

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
                            <MenuItem 
                                value={index} key={index}
                            >{el}</MenuItem>
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

export function SensorSave({onback, onsave, sensorRec, onerror}: IProps) {
    return <div>
        <div style={{paddingBottom: 15}}>
            <SensorDetails sensorRec={sensorRec}/>
        </div>

        <AddSensorActionButtons
            disabled={false}
            onclose={onback}
            onconfirm={() => onsave(sensorRec)}
            actionText="Add sensor"
        />
    </div>
}
