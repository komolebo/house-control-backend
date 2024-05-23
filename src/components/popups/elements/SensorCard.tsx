import {Card, Typography} from "@mui/material";
import {ReactComponent as LogoMotion} from "../../../assets/sensor-motion.svg";
import {ReactComponent as LogoSmoke} from "../../../assets/sensor-smoke.svg";
import {ReactComponent as LogoLeak} from "../../../assets/sensor-leak.svg";
import {ReactComponent as LogoGas} from "../../../assets/sensor-gas.svg";
import {ReactComponent as LogoDoors} from "../../../assets/sensor-doors.svg";
import {ReactComponent as LogoPlug} from "../../../assets/sensor-plug.svg";
import {ReactComponent as LogoCheck} from "../../../assets/check-mark-round.svg";
import {ReactComponent as LogoCircle} from "../../../assets/filled-circle.svg";
import {darkTheme} from "../../mui/darkThemeStyle";
import {Sensor} from "../../../globals/constants";
import Types = Sensor.Types;

export enum SensorCardState {
    default,
    unselected,
    selected,
    added
}
interface IProps {
    cardState: SensorCardState,
    sensorType: Sensor.Types,
    onclick?: () => void
}
interface ILogoProps {
    sensorType: Sensor.Types,
    cardState: SensorCardState,
    styles?: any
}

function colorByCardState(cardState: SensorCardState) {
    switch (cardState) {
        case SensorCardState.added:
            return darkTheme.palette.success.main
        case SensorCardState.selected:
            return darkTheme.palette.info.main
        case SensorCardState.default:
        case SensorCardState.unselected:
        default:
            return darkTheme.palette.secondary.main;
    }
}

function SensorLogo({sensorType, cardState, styles}: ILogoProps) {
    const color = colorByCardState(cardState);

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

export function SensorCard({cardState, sensorType, onclick }: IProps) {
    const interactive: boolean = onclick !== undefined;

    const color = colorByCardState(cardState);
    const hoverColor = color //active ? color : darkTheme.palette.secondary.main;
    const borderColor = (cardState === SensorCardState.selected || cardState === SensorCardState.added) ? 
        color : darkTheme.palette.background.default;

    return <Card
        sx={{
            padding: 4,
            bgcolor: "background.paper",
            border: "1px solid " + borderColor,
            width: 200,
            display: "flex", flexDirection: "column",

            ':hover':
                interactive ? {
                    border: "1px solid " + hoverColor,
                    cursor: "pointer"
                } : {}
        }}
        onClick={onclick}
    >
        <div>
            {interactive ?
                ( cardState === SensorCardState.selected ? (
                    <LogoCheck fill={color} style={{width: 20, height: 20, float: "right"}} />
                ) : ( 
                    cardState === SensorCardState.unselected ? (
                        <LogoCircle fill={color} style={{width: 20, height: 20, float: "right"}}/>
                    ) : (
                        <></>
                    )
                )) 
                : <></>
            }

        </div>

        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{padding: "20px 40px 20px 40px"}}>
                {/*<LogoSmoke fill={color}/>*/}
                <SensorLogo sensorType={sensorType} cardState={cardState} styles={{display: "flex", justifyContent: "center"}}/>
            </div>
            <Typography variant="h5" color={color}>
                {Sensor.Names[sensorType]}
            </Typography>
        </div>

    </Card>
}