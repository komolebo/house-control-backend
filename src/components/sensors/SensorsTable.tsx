import {Sensor} from "../../globals/constants";
import React, {useEffect, useState} from "react";
import {ClickAwayListener, Fade, Paper, Popper, Table, TableContainer} from "@mui/material";
import {SensorsTabHeader} from "./SensorsTabHeader";
import {SensorsTabBody} from "./SensorsTabBody";
import {SensorSettingsMenu} from "./SensorSettingsMenu";
import {darkTheme} from "../mui/darkThemeStyle";
import Types = Sensor.Types;
import {sendWsMessage, subscribeWsMessage, unsubscribeWsMessage} from "../../socketio";
import {Sensors} from "../../globals/messages";

interface IState {
    sensors: Sensor.DetailedRecord[],
    settingsPopper: ISettingsPopperProps,
    updatingSensorId: number
}

interface ISettingsPopperProps {
    anchor: HTMLButtonElement | undefined,
    sensor?: Sensor.DetailedRecord
}

let sensors: Sensor.DetailedRecord[] = [
    {
        id: 0,
        battery: 20,
        name: "Kitchen smoke deetector",
        location: "Kitchen",
        sensorType: Types.Smoke,
        state: true,
        tamper: true,
        status: "Connected",
        uptodate: true,
        mac: "0x00000000AB"
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
        uptodate: false,
        mac: "0x00000000AB"
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
        uptodate: false,
        mac: "0x00000000AB"
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
        uptodate: true,
        mac: "0x00000000AB"
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
        uptodate: true,
        mac: "0x00000000AB"
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
        uptodate: true,
        mac: "0x00000000AB"
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
        uptodate: true,
        mac: "0x00000000AB"
    },
]
const headerItems: string[] = [
    "Sensor", "Name", "Location", "State", "Battery", "Tamper", "Status"
]


export function SensorsTable() {
    const [state, setState] = useState<IState> ({
        sensors: sensors,
        settingsPopper: {anchor: undefined, sensor: undefined},
        updatingSensorId: -1
    })

    useEffect (() => {
        subscribeWsMessage (Sensors.SENSOR_READ_LIST_RESP, handleDataSync);
        sendWsMessage (Sensors.SENSOR_READ_LIST, {});

        return () => {
            unsubscribeWsMessage (Sensors.SENSOR_READ_LIST_RESP, handleDataSync);
        }
    }, [])

    const handleDataSync = (sensorsData: any) => {
        state.sensors = [];
        sensorsData.forEach ((el: any) => {
            state.sensors.push ({
                id: el.id,
                battery: el.battery,
                name: el.name,
                location: el.location,
                sensorType: Sensor.TypeByName[el.type.toLowerCase ()],
                state: el.state,
                tamper: el.tamper,
                status: el.status,
                uptodate: !el.to_update,
                mac: el.mac
            })
        })
        setState ({...state});

        console.log ("Received sensors data ", sensorsData);
    }

    const changeItem = ((sensorRec: Sensor.DetailedRecord) => {
        const {uptodate, sensorType, ...rest} = sensorRec;
        console.log ("changing ", sensorRec)
        sendWsMessage (Sensors.SENSOR_CHANGE, {
            ...rest,
            to_update: !sensorRec.uptodate,
            type: Sensor.NameByType (sensorRec.sensorType)
        })
        const newArr = state.sensors.map ((item) => item.id === sensorRec.id ? sensorRec : item);
        setState ({...state, sensors: newArr});
    })
    const showSettings = (anchor: HTMLButtonElement, sensorId: number) => {
        const sensor = state.sensors.find (el => el.id === sensorId);

        setState ({...state, settingsPopper: {anchor: anchor, sensor: sensor}});
    }
    const hideSettings = () => {
        setState ({...state, settingsPopper: {anchor: undefined, sensor: undefined}});
    }

    const isSettingsOpen = state.settingsPopper.anchor !== undefined && state.settingsPopper.sensor !== undefined;

    return <div style={{maxWidth: "100%"}}>
        {isSettingsOpen ? (
            <ClickAwayListener onClickAway={() => state.settingsPopper.anchor ? hideSettings () : {}}>
                <Popper
                    // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                    sx={{zIndex: 1301, backgroundColor: darkTheme.palette.background.default}}
                    // open={state.settingsPopper.anchor !== undefined && state.settingsPopper.sensor !== undefined}
                    open={true}
                    anchorEl={state.settingsPopper.anchor}
                    transition
                >
                    {({TransitionProps}) => {
                        console.log("props: ", TransitionProps)

                        return <Fade {...TransitionProps} timeout={350}>
                            <Paper>
                                {state.settingsPopper.sensor ? (
                                    <SensorSettingsMenu
                                        styles={{bgcolor: darkTheme.palette.background.paper}}
                                        onclose={hideSettings}
                                        sensor={state.settingsPopper.sensor}
                                        anotherSensorUpdating={state.updatingSensorId != -1}
                                        ontempupdatecallback={(sensorId) => setState ({
                                            ...state,
                                            updatingSensorId: sensorId
                                        })}
                                    />
                                ) : (<></>)
                                }
                            </Paper>
                        </Fade>
                    }
                    }
                </Popper>
            </ClickAwayListener>
        ) : <></>
        }

        <TableContainer component={Paper} sx={{p: 2, borderRadius: "20px"}}>
            <Table aria-label="collapsible table">
                <SensorsTabHeader headerItems={headerItems} styles={{p: 100}}/>

                <SensorsTabBody sensorsData={state.sensors}
                                onitemchange={changeItem}
                                onopensettings={showSettings}
                                updatingItemId={state.updatingSensorId}
                                columnsCount={headerItems.length}
                />
            </Table>
        </TableContainer>
    </div>
}