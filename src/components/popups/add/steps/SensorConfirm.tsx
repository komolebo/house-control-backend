import {SensorCard, SensorCardState} from "../elements/SensorCard";
import {Sensor} from "../../../../globals/constants";
import Types = Sensor.Types;
import {Box, Button} from "@mui/material";
import React, {useState} from "react";

interface IProps {
    onclose: () => void,
    onconfirm: (idx: number) => void,
    onerror: (msg: string) => void,
    sensorsData: Sensor.SimpleRecord[]
}
interface ISensorCardsProps {
    sensorData: Sensor.SimpleRecord[],
    selectedItemID: number,
    onselect: (id: number) => void
}
interface IAddSensorActionProps {
    disabled: boolean,
    onclose: () => void,
    onconfirm: () => void,
    actionText: string
}

const sensors = [
    Types.Plug,
    Types.Smoke,
    Types.Leak,
    Types.Leak,
    Types.Plug,
    Types.Smoke,
    // Types.Leak, Types.Leak, Types.Leak, Types.Plug, Types.Smoke, Types.Leak, Types.Leak, Types.Leak,
]

export function AddSensorActionButtons({disabled, onclose, onconfirm, actionText}: IAddSensorActionProps) {
    return <div style={{paddingTop: 30, display: "flex", justifyContent: "flex-end"}}>
        <Button variant="text" color="primary"
                onClick={onclose}
        > Cancel
        </Button>

        <Button variant="contained" color="info"
                sx={{ml: 2}}
                disabled={disabled}
                onClick={onconfirm}
        > {actionText}
        </Button>
    </div>
}

function SensorCards({sensorData, onselect, selectedItemID}: ISensorCardsProps) {
    return <Box sx={{display: "flex", maxWidth: "500px",
        padding: "40px 0 10px 0",
        justifyContent: sensors.length === 1 ? "center" : "space-between",
        overflow: "auto", gap: "5px"
    }}
    >
        {sensorData.map((el: Sensor.SimpleRecord) => (
            <SensorCard
                cardState={selectedItemID === el.id ? SensorCardState.selected : SensorCardState.unselected}
                sensorType={el.sensorType}
                key={el.id}
                onclick={() => onselect(el.id)}
            />
        ))}
    </Box>
}

export function SensorConfirm({onclose, onconfirm, sensorsData, onerror}: IProps) {
    const [selectedId, setSelectedId] = useState<number>(-1);

    return <div style={{display: "flex", flexDirection: "column"}}>
        <SensorCards sensorData={sensorsData} selectedItemID={selectedId}
                     onselect={(id) => setSelectedId (id)}/>
         <AddSensorActionButtons disabled={selectedId === -1}
                                 onclose={onclose}
                                 onconfirm={() => onconfirm(selectedId)}
                                 actionText="Continue"
         />
    </div>
}