import {Sensor} from "../../globals/constants";
import React, {useState} from "react";
import {Paper, Table, TableContainer} from "@mui/material";
import {SensorsTabHeader} from "./SensorsTabHeader";
import {SensorsTabBody} from "./SensorsTabBody";
import Types = Sensor.Types;

interface IState {
    sensors: SensorDetails[],
}

type SensorDetails = {
    id: number,
    sensorType: Sensor.Types,
    name: string,
    location: string,
    state: boolean,
    battery: number,
    tamper: boolean,
    status: string
}

const sensors: SensorDetails[] = [
    {
        id: 0,
        battery: 20,
        name: "Kitchen smoke deetector",
        location: "Kitchen",
        sensorType: Types.Smoke,
        state: true,
        tamper: true,
        status: "Connected"
    },
    {
        id: 1,
        battery: 100,
        name: "Default leak detector",
        tamper: false,
        state: true,
        sensorType: Types.Leak,
        location: "Hall",
        status: "Lost connection"
    },
    {
        id: 2,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected"
    },
    {
        id: 3,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected"
    },
    {
        id: 4,
        battery: 45,
        name: "Default plug detector",
        tamper: true,
        state: false,
        sensorType: Types.Plug,
        location: "Bedroom",
        status: "Connected"
    },
    {
        id: 5,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected"
    },
    {
        id: 6,
        battery: 0,
        name: "Default Gas detector",
        tamper: false,
        state: true,
        sensorType: Types.Gas,
        location: "Kitchen",
        status: "Connected"
    },
]
const headerItems: string[] = [
    "Sensor", "Name", "Location", "State", "Battery", "Tabper", "Status"
]


export function SensorsTable() {
    const [state, setState] = useState<IState> ({
        sensors: sensors
    })

    const updateItem = ((sensorRec: SensorDetails) => {
        const newArr = state.sensors.map ((item) => item.id === sensorRec.id ? sensorRec : item);
        setState ({...state, sensors: newArr});
    })

    return <div style={{maxWidth: "100%"}}>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <SensorsTabHeader headerItems={headerItems} styles={{p: 100}}/>

                <SensorsTabBody sensorsData={state.sensors} onitemchange={updateItem}/>
            </Table>
        </TableContainer>
    </div>
}