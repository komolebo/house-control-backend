import React, {useState} from "react";
import {Step, StepIconProps, StepLabel, Stepper, Typography} from "@mui/material";
import {ReactComponent as LogoMarkDone} from "../../../assets/check-mark-round.svg";
import {ReactComponent as LogoFilledCircle} from "../../../assets/filled-circle.svg";
import {ReactComponent as LogoWarning} from "../../../assets/warning-round.svg";
import {darkTheme} from "../../mui/darkThemeStyle";
import {SensorSave} from "./steps/SensorSave";
import {SensorScan} from "./steps/SensorScan";
import {SensorConfirm} from "./steps/SensorConfirm";
import {Sensor} from "../../../globals/constants";
import {useGlobalPopupContext} from "../PopupProvider";
import Types = Sensor.Types;
import RegistrationSteps = Sensor.RegistrationSteps;
import {SensorFinalSuccess} from "./steps/SensorFinalSuccess";
import {SensorFinalError} from "./steps/SensorFinalError";

interface IState {
    step: Sensor.RegistrationSteps, // displayed stepper value
    phase: Sensor.RegistrationSteps,
    sensorsData: Sensor.EditableRecord[],
    confirmedId: number,
    addedId: number,
    errorMsg: string,
    errorStep: Sensor.RegistrationSteps;
}
interface IHeaderProps {
    step: Sensor.RegistrationSteps,
    errorStep: Sensor.RegistrationSteps;
}
type StepDisplayInfo = {
    text: string,
    step: Sensor.RegistrationSteps
}

const stepDisplayInfo: StepDisplayInfo[] = [
    {
        step: RegistrationSteps.Scanning,
        text: "Step 1: scan sensors"
    },
    {
        step: RegistrationSteps.Confirm,
        text: "Step 2: confirm sensor"
    },
    {
        step: RegistrationSteps.Save,
        text: "Step 3: save sensor"
    },
];


function QontoStepIcon(props: StepIconProps) {
    const {active, completed, error} = props;

    return (
        error ? (
            <LogoWarning fill={darkTheme.palette.error.main}/>
        ) : (
            completed ? (
                <LogoMarkDone fill={darkTheme.palette.success.main}/>
            ) : (
                active ? (
                    <LogoFilledCircle fill={"white"} width={20} height={20}/>
                ) : (
                    <LogoFilledCircle fill={darkTheme.palette.secondary.main} width={20} height={20}/>
                )
            )
        )
    )
}

function AddSensorHeader({step, errorStep}: IHeaderProps) {
    return <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <Typography variant={"h1"} sx={{pb: 5}}>Add a new sensor</Typography>

        <Stepper alternativeLabel activeStep={step}>
            {stepDisplayInfo.map ((item) => (
                <Step key={item.step}>
                    <StepLabel StepIconComponent={QontoStepIcon} error={item.step === errorStep}>{item.text}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
}

export function AddSensorPopup() {
    const {hidePopup} = useGlobalPopupContext();
    const [state, setState] = useState<IState> ({
        phase: RegistrationSteps.Scanning,
        step: RegistrationSteps.Scanning,
        confirmedId: -1,
        addedId: -1,
        errorMsg: "",
        errorStep: RegistrationSteps.Invalid,
        sensorsData: [
            {id: 0, sensorType: Types.Leak},
            {id: 1, sensorType: Types.Doors},
            {id: 2, sensorType: Types.Motion},
            {id: 3, sensorType: Types.Motion},
        ]
    })

    const closeCb = () => {
        hidePopup();
    }
    const scanCb = (scanResult: boolean) => {
        if (scanResult) {
            setState({...state, step: RegistrationSteps.Confirm, phase: RegistrationSteps.Confirm});
        }
    }
    const confirmCb = (id: number) => {
        if (id !== -1) {
            setState({...state, confirmedId: id, step: RegistrationSteps.Save, phase: RegistrationSteps.Save});
        }
    }
    const confirmErrCb = (msg?: string) => {
        setState({...state, phase: RegistrationSteps.failed, errorStep: RegistrationSteps.Confirm, errorMsg: msg ? msg : state.errorMsg});
    }
    const saveCb = (data: Sensor.EditableRecord) => {
        setState({...state, 
            addedId: data.id, 
            step: RegistrationSteps.Finished,
            phase: RegistrationSteps.Finished,
        });
    }
    const saveErrCb = (msg?: string) => {
        setState({...state, phase: RegistrationSteps.failed, errorStep: RegistrationSteps.Save, errorMsg: msg ? msg : state.errorMsg});
    }

    const confirmedSensor = state.sensorsData.find(el => el.id === state.confirmedId);
    const addedSensor = state.sensorsData.find(el => el.id === state.addedId);

    return <div style={{display: "Flex", flexDirection: "column", width: 480}}>
        <AddSensorHeader step={state.step} errorStep={state.errorStep}/>

        {state.phase === Sensor.RegistrationSteps.Scanning ? (
            <SensorScan onact={scanCb}/>
        ) : (state.phase === Sensor.RegistrationSteps.Confirm ? (
            <SensorConfirm
                onclose={closeCb}
                onconfirm={confirmCb}
                onerror={confirmErrCb}
                sensorsData={state.sensorsData}
            />
        ) : ((confirmedSensor && state.phase === Sensor.RegistrationSteps.Save) ? (
            <SensorSave
                onback={() => setState({...state, phase: RegistrationSteps.Confirm})}
                onsave={saveCb}
                onerror={saveErrCb}
                sensorRec={confirmedSensor}
            />
        ) : (addedSensor && state.phase === Sensor.RegistrationSteps.Finished ? (
            <SensorFinalSuccess sensorInfo={addedSensor}/>
        ) : (
            <SensorFinalError/>
        )
        )))
        }
    </div>
}

export default AddSensorPopup;