import {Sensor} from "../../../../globals/constants";
import {AddSensorActionButtons} from "./SensorConfirm";
import { ModifySensor } from "../../elements/ModifySensor";


interface IProps {
    onback: () => void,
    onsave: (data: any) => void,
    onerror: (msg: string) => void,
    sensorRec: Sensor.EditableRecord
}
interface ISensorDetailsProps {
    sensorRec: Sensor.EditableRecord
}

export function SensorSave({onback, onsave, sensorRec, onerror}: IProps) {
    return <div>
        <div style={{paddingBottom: 15, paddingTop: 25}}>
            <ModifySensor sensor={sensorRec}/>
        </div>

        <AddSensorActionButtons
            disabled={false}
            onclose={onback}
            onconfirm={() => onsave(sensorRec)}
            actionText="Add sensor"
        />
    </div>
}
