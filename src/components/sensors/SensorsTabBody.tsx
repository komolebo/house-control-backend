import {
    FormControl,
    FormControlLabel,
    FormGroup,
    Switch,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    IconButton} from "@mui/material";

import {Sensor} from "../../globals/constants";
import {ReactComponent as LogoMotion} from "../../assets/sensor-motion.svg";
import {ReactComponent as LogoSmoke} from "../../assets/sensor-smoke.svg";
import {ReactComponent as LogoLeak} from "../../assets/sensor-leak.svg";
import {ReactComponent as LogoGas} from "../../assets/sensor-gas.svg";
import {ReactComponent as LogoDoors} from "../../assets/sensor-doors.svg";
import {ReactComponent as LogoPlug} from "../../assets/sensor-plug.svg";
import {ReactComponent as LogoBatteryLevelLow} from "../../assets/battery-indicator-low.svg"
import {ReactComponent as LogoBatteryLevelMid} from "../../assets/battery-indicator-middle.svg"
import {ReactComponent as LogoBatteryLevelHigh} from "../../assets/battery-indicator-high.svg"
import {ReactComponent as LogoSettingsDots} from "../../assets/settings-dots.svg"
import {FC} from "react";
import {darkTheme} from "../mui/darkThemeStyle";
import {Badge} from "@mui/material"

interface IProps {
    sensorsData: Sensor.DetailedRecord[],
    onitemchange: (item: Sensor.DetailedRecord) => void,
    onopensettings: (
        anchor: HTMLButtonElement, 
        sensorId: number
    ) => void,
}
interface IBatteryProps {
    level: number
}

interface ILogoProps {
    sensorType: Sensor.Types,
    styles?: any
}

interface IState {
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
function BatteryIndicator({level}: IBatteryProps) {
    const BATTERY_LEVEL_LOW = 15;
    const BATTERY_LEVEL_NORMAL = 30;

    let Logo: FC<React.SVGProps<SVGSVGElement>>, color;
    if (level < BATTERY_LEVEL_LOW) {
        Logo = LogoBatteryLevelLow;
        color = darkTheme.palette.error.main;
    } else if (level < BATTERY_LEVEL_NORMAL) {
        Logo = LogoBatteryLevelMid;
        color = "yellow";
    } else {
        color = darkTheme.palette.info.main;
        Logo = LogoBatteryLevelHigh;
    }

    return <div>
        <Logo/>
        <Typography color={color}>{level.toString() + '%'}</Typography>
    </div>
}

export function SensorsTabBody({sensorsData, onitemchange, onopensettings}: IProps) {
    const changeState = (id: number) => {
        const sensorRecord = sensorsData.find (el => el.id === id);
        if (sensorRecord) {
            onitemchange ({...sensorRecord, state: !sensorRecord.state});
        }
    };
    const openSettings = (id: number) => {
        return (e: React.MouseEvent<HTMLButtonElement>): void => {
            onopensettings(e.currentTarget, id);
        }
    }

    return <TableBody>
    {sensorsData.map ((item: Sensor.DetailedRecord) => (
        <TableRow key={item.id}>
            {/* type */}
            <TableCell align="left">
                <SensorLogo sensorType={item.sensorType}/>
            </TableCell>

            {/* name */}
            <TableCell align="left">
                <Typography variant="h3" color="secondary.main">
                    {item.name}
                </Typography>
            </TableCell>

            {/* location */}
            <TableCell align="left">
                <Typography variant="h3" color="secondary.main">
                    {item.location}
                </Typography>
            </TableCell>

            {/* state */}
            <TableCell align="left">
                <FormControl
                    component="fieldset"
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            color: item.state ? darkTheme.palette.info.main : darkTheme.palette.secondary.main
                        },
                    }}
                >
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
            <TableCell align="left">
                <BatteryIndicator level={item.battery}/>
            </TableCell>

            {/* tamper */}
            <TableCell align="left">
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
            <TableCell align="left">
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

            <TableCell>
                <IconButton aria-label={"some label"} onClick={openSettings(item.id)}>
                    <Badge color="warning" badgeContent={item.uptodate ? 1 : 0}>
                        <LogoSettingsDots fill={darkTheme.palette.secondary.main} />
                    </Badge>
                </IconButton>
            </TableCell>

        </TableRow>
    ))}
    </TableBody>
}