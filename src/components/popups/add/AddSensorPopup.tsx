import React, {useState} from "react";
import {Step, StepIconProps, StepLabel, Stepper, Typography} from "@mui/material";
import {ReactComponent as LogoMarkDone} from "../../../assets/check-mark-round.svg";
import {ReactComponent as LogoFilledCircle} from "../../../assets/filled-circle.svg";
import {darkTheme} from "../../mui/darkThemeStyle";
import {SensorSave} from "./steps/SensorSave";
import {SensorScan} from "./steps/SensorScan";
import {SensorConfirm} from "./steps/SensorConfirm";
import {Sensor} from "../../../globals/constants";
import {useGlobalPopupContext} from "../PopupProvider";
import SensorRecord = Sensor.SensorRecord;
import Types = Sensor.Types;
import RegistrationSteps = Sensor.RegistrationSteps;
import {SensorFinalSuccess} from "./steps/SensorFinalSuccess";
import {SensorFinalError} from "./steps/SensorFinalError";


interface IState {
    step: Sensor.RegistrationSteps,
    sensorsData: SensorRecord[],
    confirmedId: number,
    errorMsg: string
}
interface IHeaderProps {
    step: Sensor.RegistrationSteps
}


const steps = ['Step 1: scan sensors', 'Step 2: confirm sensor', 'Step 3: save sensor'];


function QontoStepIcon(props: StepIconProps) {
    const {active, completed} = props;

    return (
        completed ? (
            <LogoMarkDone fill={darkTheme.palette.success.main}/>
        ) : (
            active ? (
                <LogoFilledCircle fill={"white"}/>
            ) : (
                <LogoFilledCircle fill={darkTheme.palette.secondary.main}/>
            )
        ))
}

function AddSensorHeader({step}: IHeaderProps) {

    return <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
        <Typography variant={"h1"} sx={{pb: 5}}>Add a new sensor</Typography>

        <Stepper alternativeLabel activeStep={step}>
            {steps.map ((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    </div>
}

export function AddSensorPopup() {
    const {hidePopup} = useGlobalPopupContext();
    const [state, setState] = useState<IState> ({
        step: RegistrationSteps.Scanning,
        confirmedId: -1,
        errorMsg: "",
        sensorsData: [
            {id: 0, sensorType: Types.Leak},
            {id: 1, sensorType: Types.Doors},
            {id: 2, sensorType: Types.Motion}
        ]
    })

    const closeCb = () => {
        hidePopup();
    }
    const scanCb = (scanResult: boolean) => {
        if (scanResult) {
            setState({...state, step: RegistrationSteps.Confirm});
        }
    }
    const confirmCb = (id: number) => {
        if (id !== -1) {
            state.confirmedId = id;
            state.step = RegistrationSteps.Save;
            setState({...state})
        }
    }
    const saveCb = (data: any) => {
        setState({...state, step: RegistrationSteps.Finished});
    }

    const confirmedSensor = state.sensorsData.find(el => el.id === state.confirmedId);

    return <div style={{display: "Flex", flexDirection: "column", width: 480}}>
        <AddSensorHeader step={state.step}/>

        {state.step === Sensor.RegistrationSteps.Scanning ? (
            <SensorScan onact={scanCb}/>
        ) : (state.step === Sensor.RegistrationSteps.Confirm ? (
            <SensorConfirm
                onclose={closeCb}
                onconfirm={confirmCb}
                sensorsData={state.sensorsData}
            />
        ) : ((confirmedSensor && state.step === Sensor.RegistrationSteps.Save) ? (
            <SensorSave
                onback={() => setState({...state, step: RegistrationSteps.Confirm})}
                onsave={saveCb}
                sensorRec={confirmedSensor}
            />
        ) : (state.step === Sensor.RegistrationSteps.failed ? (
                <SensorFinalSuccess/>
            ) : (
                <SensorFinalError />
            )
        )))
        }
    </div>
}

export default AddSensorPopup;