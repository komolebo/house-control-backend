import {Button, IconButton, Tooltip, Typography} from "@mui/material";
import {ReactComponent as LogoAddDev} from "../../assets/dev-add.svg";
import {darkTheme} from "../mui/darkThemeStyle";
import {POPUP_TYPE, useGlobalPopupContext} from "../popups/PopupProvider";
import {ReactComponent as LogoSeverity} from "../../assets/notification-severity.svg";

export function SensorsPage() {
    const {showPopup} = useGlobalPopupContext();

    const addDevices = () => {
        showPopup(POPUP_TYPE.AddSensor, {
            onAct: (data) => {},
            onClose: () => {},
            data: {}
        })
    }

    const color = darkTheme.palette.info.main;

    return <div>
        <Typography variant="h1" color={"text.primary"}>
            Sensors
        </Typography>

        <div style={{float: "right"}}>
            <Tooltip title={""}>
                <IconButton
                    onClick={addDevices}
                >
                    <LogoAddDev fill={color} stroke="none"/>
                </IconButton>
            </Tooltip>
        </div>
    </div>
}

export default SensorsPage;