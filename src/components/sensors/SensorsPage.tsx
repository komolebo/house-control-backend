import {Box, Button, Typography} from "@mui/material";
import {ReactComponent as LogoAddDev} from "../../assets/dev-add.svg";
import {darkTheme} from "../mui/darkThemeStyle";

export function SensorsPage() {
    const color = darkTheme.palette.info.main;

    return <div>
        <Typography variant="h1" color={"text.primary"}>
            Sensors
        </Typography>

        <div style={{float: "right"}}>
            <Button
                onClick={() => {}}
                endIcon={
                    <LogoAddDev fill={color} stroke="white"/>
                }
            />
        </div>
    </div>
}

export default SensorsPage;