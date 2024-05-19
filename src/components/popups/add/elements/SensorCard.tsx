import {Card, Typography} from "@mui/material";
import React from "react";
import {ReactComponent as LogoMotion} from "../../../../assets/sensor-motion.svg";
import {ReactComponent as LogoSmoke} from "../../../../assets/sensor-smoke.svg";
import {ReactComponent as LogoLeak} from "../../../../assets/sensor-leak.svg";
import {ReactComponent as LogoGas} from "../../../../assets/sensor-gas.svg";
import {ReactComponent as LogoDoors} from "../../../../assets/sensor-doors.svg";
import {ReactComponent as LogoPlug} from "../../../../assets/sensor-plug.svg";
import {ReactComponent as LogoCheck} from "../../../../assets/check-mark-round.svg";
import {ReactComponent as LogoCircle} from "../../../../assets/filled-circle.svg";
import {darkTheme} from "../../../mui/darkThemeStyle";
import {Sensor} from "../../../../globals/constants";
import Types = Sensor.Types;

interface IProps {
    active: boolean,
    sensorType: Sensor.Types,
    onclick?: () => void
}

interface ILogoProps {
    sensorType: Sensor.Types,
    active: boolean,
    styles?: any
}

function SensorLogo({sensorType, active, styles}: ILogoProps) {
    const color = active ? darkTheme.palette.info.main : darkTheme.palette.secondary.main;

    switch (sensorType) {
        case Types.Doors:
            return <LogoDoors fill={color} stroke={color} style={styles}/>
        case Types.Gas:
            return <LogoGas fill={color} stroke={color} style={styles}/>;
        case Types.Motion:
            return <LogoMotion fill={color} stroke={color} style={styles}/>;
        case Types.Leak:
            return <LogoLeak fill={color} stroke={color} style={styles}/>;
        case Types.Smoke:
            return <LogoSmoke fill={color} stroke={color} style={styles}/>;
        case Types.Plug:
            return <LogoPlug fill={color} stroke={color} style={styles}/>;
        default:
            return <></>
    }
}

export function SensorCard({active, sensorType, onclick }: IProps) {
    const color = active ? darkTheme.palette.info.main : darkTheme.palette.secondary.main;
    const interactive: boolean = onclick != undefined;

    return <Card
        sx={{
            padding: 4,
            bgcolor: "background.light",
            border: "1px solid " + (active ? color : darkTheme.palette.background.default),
            // width: "fit-content",
            minWidth: 200,
            display: "flex", flexDirection: "column",

            ':hover':
                interactive ? {
                    border: "1px solid " + (active ? color : darkTheme.palette.secondary.main),
                    cursor: "pointer"
                } : {}
        }}
        onClick={onclick}
    >
        <div>
            {interactive ?
                ( active ? (
                        <LogoCheck fill={color} style={{width: 20, height: 20, float: "right"}} />
                    ) : (
                        <LogoCircle fill={color} style={{width: 20, height: 20, float: "right"}} />
                ))
                : <></>
            }

        </div>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{padding: "20px 40px 20px 40px"}}>
                {/*<LogoSmoke fill={color}/>*/}
                <SensorLogo sensorType={sensorType} active={active} styles={{display: "flex", justifyContent: "center"}}/>
            </div>
            <Typography variant="h5" color={color}>
                {Sensor.Names[sensorType]}
            </Typography>
        </div>

    </Card>
}