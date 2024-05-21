import {Sensor} from "../../globals/constants";
import {useState, useEffect} from "react";
import {ClickAwayListener, Fade, Paper, Popper, Table, TableContainer} from "@mui/material";
import {SensorsTabHeader} from "./SensorsTabHeader";
import {SensorsTabBody} from "./SensorsTabBody";
import Types = Sensor.Types;
import { SensorSettingsMenu } from "./SensorSettingsMenu";
import { darkTheme } from "../mui/darkThemeStyle";

interface IState {
    sensors: Sensor.DetailedRecord[],
    settingsPopper: ISettingsPopperProps
}
interface ISettingsPopperProps {
    anchor: HTMLButtonElement | undefined,
    sensorId: number
}

const sensors: Sensor.DetailedRecord[] = [
    {
        id: 0,
        battery: 20,
        name: "Kitchen smoke deetector",
        location: "Kitchen",
        sensorType: Types.Smoke,
        state: true,
        tamper: true,
        status: "Connected",
        uptodate: false
    },
    {
        id: 1,
        battery: 100,
        name: "Default leak detector",
        tamper: false,
        state: true,
        sensorType: Types.Leak,
        location: "Hall",
        status: "Lost connection",
        uptodate: true
    },
    {
        id: 2,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected",
        uptodate: false
    },
    {
        id: 3,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected",
        uptodate: false
    },
    {
        id: 4,
        battery: 45,
        name: "Default plug detector",
        tamper: true,
        state: false,
        sensorType: Types.Plug,
        location: "Bedroom",
        status: "Connected",
        uptodate: false
    },
    {
        id: 5,
        battery: 45,
        name: "Default doors detector",
        tamper: true,
        state: false,
        sensorType: Types.Doors,
        location: "Doors",
        status: "Connected",
        uptodate: false
    },
    {
        id: 6,
        battery: 0,
        name: "Default Gas detector",
        tamper: false,
        state: true,
        sensorType: Types.Gas,
        location: "Kitchen",
        status: "Connected",
        uptodate: false
    },
]
const headerItems: string[] = [
    "Sensor", "Name", "Location", "State", "Battery", "Tamper", "Status"
]


export function SensorsTable() {
    const [state, setState] = useState<IState> ({
        sensors: sensors,
        settingsPopper: { anchor: undefined, sensorId: -1}
    })

    const updateItem = ((sensorRec: Sensor.DetailedRecord) => {
        const newArr = state.sensors.map ((item) => item.id === sensorRec.id ? sensorRec : item);
        setState ({...state, sensors: newArr});
    })
    const showSettings = (anchor: HTMLButtonElement, sensorId: number) => {
        setState({...state, settingsPopper: {anchor: anchor, sensorId: sensorId}});
    }
    const hideSettings = () => {
        setState({...state, settingsPopper: {anchor: undefined, sensorId: -1}});
    }

    return <div style={{maxWidth: "100%"}}>
        { state.settingsPopper.anchor != undefined ?
            <ClickAwayListener onClickAway={() => state.settingsPopper.anchor != undefined ? hideSettings() : {}}>
                <Popper
                    // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                    sx={{ zIndex: 1200 }}
                    open={state.settingsPopper.anchor != undefined}
                    anchorEl={state.settingsPopper.anchor}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <SensorSettingsMenu 
                                styles={{bgcolor: darkTheme.palette.background.default}}
                                onclose={hideSettings}
                                updateAvailable={!!state.sensors.find(el => el.id === state.settingsPopper.sensorId)?.uptodate} 
                                updateTemporaryForbidden={false}
                            />
                        </Paper>
                    </Fade>
                    )}
                </Popper>
            </ClickAwayListener> : <></>
        }

        <TableContainer component={Paper} sx={{p: 2}}>
            <Table aria-label="collapsible table">
                <SensorsTabHeader headerItems={headerItems} styles={{p: 100}}/>

                <SensorsTabBody sensorsData={state.sensors} 
                                onitemchange={updateItem} 
                                onopensettings={showSettings}
                />
            </Table>
        </TableContainer>
    </div>
}