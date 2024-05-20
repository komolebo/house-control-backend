import {IconButton, Tooltip, Typography} from "@mui/material";
import {ReactComponent as LogoAddDev} from "../../assets/dev-add.svg";
import {darkTheme} from "../mui/darkThemeStyle";
import {POPUP_TYPE, useGlobalPopupContext} from "../popups/PopupProvider";
import {SensorsTable} from "./SensorsTable";

export function SensorsPage() {
    const {showPopup} = useGlobalPopupContext ();

    const addDevices = () => {
        showPopup (POPUP_TYPE.AddSensor, {
            onAct: (data) => {
            },
            onClose: () => {
            },
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

        <SensorsTable/>
    </div>
}

export default SensorsPage;