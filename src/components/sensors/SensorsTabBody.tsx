import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@mui/material";
import {Sensor} from "../../globals/constants";
import {ReactComponent as LogoMotion} from "../../assets/sensor-motion.svg";
import {ReactComponent as LogoSmoke} from "../../assets/sensor-smoke.svg";
import {ReactComponent as LogoLeak} from "../../assets/sensor-leak.svg";
import {ReactComponent as LogoGas} from "../../assets/sensor-gas.svg";
import {ReactComponent as LogoDoors} from "../../assets/sensor-doors.svg";
import {ReactComponent as LogoPlug} from "../../assets/sensor-plug.svg";
import React from "react";
import {darkTheme} from "../mui/darkThemeStyle";

interface IProps {
    sensorsData: Sensor.DetailedRecord[],
    onitemchange: (item: Sensor.DetailedRecord) => void
}

interface ILogoProps {
    sensorType: Sensor.Types,
    styles?: any
}

function SensorLogo({sensorType, styles}: ILogoProps) {
    const color = darkTheme.palette.secondary.main;

    switch (sensorType) {
        case Sensor.Types.Doors:
            return <LogoDoors fill={color} stroke={color} style={styles}/>
        case Sensor.Types.Gas:
            return <LogoGas fill={color} stroke={color} style={styles}/>;
        case Sensor.Types.Motion:
            return <LogoMotion fill={color} stroke={color} style={styles}/>;
        case Sensor.Types.Leak:
            return <LogoLeak fill={color} stroke={color} style={styles}/>;
        case Sensor.Types.Smoke:
            return <LogoSmoke fill={color} stroke={color} style={styles}/>;
        case Sensor.Types.Plug:
            return <LogoPlug fill={color} stroke={color} style={styles}/>;
        default:
            return <></>
    }
}

export function SensorsTabBody({sensorsData, onitemchange}: IProps) {
    const changeState = (id: number) => {
        const sensorRecord = sensorsData.find (el => el.id === id);
        if (sensorRecord) {
            console.log (">>> ", id);
            onitemchange (sensorRecord);
        }
    };

    return <TableBody>
        {sensorsData.map ((item: Sensor.DetailedRecord) => (
            <TableRow key={item.id}>
                {/* type */}
                <TableCell sx={{p: 4}}>
                    <SensorLogo sensorType={item.sensorType}/>
                </TableCell>

                {/* name */}
                <TableCell>
                    <Typography variant="h3" color="secondary.main">
                        {item.name}
                    </Typography>
                </TableCell>

                {/* location */}
                <TableCell>
                    <Typography variant="h3" color="secondary.main">
                        {item.location}
                    </Typography>
                </TableCell>

                {/* state */}
                <TableCell>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value={item.state}
                                checked={item.state}
                                control={<Switch color="info"/>}
                                label={item.state ? "On" : "Off"}
                                labelPlacement="bottom"
                                onClick={() => changeState (item.id)}
                            />
                        </FormGroup>
                    </FormControl>
                </TableCell>

                {/* battery */}
                <TableCell>
                    <div>AAA</div>
                </TableCell>

                {/* tamper */}
                <TableCell>
                    {item.tamper ? (
                        <Typography variant="h3" color="secondary.main">
                            Set
                        </Typography>
                    ) : (
                        <Typography variant="h3" color="error.main">
                            Unset
                        </Typography>
                    )}
                </TableCell>

                {/* status */}
                <TableCell>
                    <TableCell>
                        {item.status === "Connected" ? (
                            <Typography variant="h3" color="secondary.main">
                                Connected
                            </Typography>
                        ) : (
                            <Typography variant="h3" color="error.main">
                                Disconnected
                            </Typography>
                        )}
                    </TableCell>
                </TableCell>

            </TableRow>
        ))}
    </TableBody>
}