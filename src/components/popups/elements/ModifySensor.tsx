import { Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import { Sensor } from "../../../globals/constants";
import { SensorCard, SensorCardState } from "./SensorCard";
import { useState } from "react";

interface IProps {
    sensor: Sensor.EditableRecord
}
interface IState {
    sensor: Sensor.EditableRecord
}


export function ModifySensor({sensor}: IProps) {
    const [state, setState] = useState<IState>({
        sensor: sensor
    });

    const locations = ["Kitchen", "Hall", "None"];

    const changeName = () => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {

        }
    }

    return <div style={{display: "flex", width: "100%"}}>
        <SensorCard cardState={SensorCardState.default} sensorType={sensor.sensorType}/>

        <div style={{display: "flex", flexDirection: "column", paddingLeft: 25}}>
            <Typography variant="h2" color="secondary">ID</Typography>
            <Typography variant="h5" color="secondary" sx={{pt: 1}}>{sensor.id}</Typography>

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
                <TextField id="standard-basic" 
                        label="Sensor name" 
                        variant="standard" 
                        onChange={changeName}
                        value={state.sensor.name}
                />
            </div>
        </div>
    </div>
}