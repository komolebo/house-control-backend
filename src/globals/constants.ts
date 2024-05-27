
export namespace Menu{
    export enum Items {
        Home,
        Rooms,
        Devices,
        Statistics,
        Routines,
        Settings,
    }

    export enum SensorEdition {
        Edit,
        Update,
        Remove
    }

    export const DefaultItem: number = Items.Devices; // Select Device menu
}

export namespace Sensor {
    export enum RegistrationSteps {
        Invalid = -1,
        Scanning,
        Confirm,
        Save,
        failed,
        Finished
    }

    export enum Types {
        Smoke,
        Leak,
        Motion,
        Gas,
        Plug,
        Doors
    }

    export const TypeByName : {[key: string]: Types} = {
        "gas": Types.Gas,
        "smoke": Types.Smoke,
        "leak": Types.Leak,
        "motion": Types.Motion,
        "doors": Types.Doors,
        "plug": Types.Plug,
    }

    export function NameByType(type: Types) : string {
        for (const name in TypeByName) {
            if (TypeByName[name] === type) {
                return name;
            }
        }

        throw new Error('Unknown type provided');
    }

    export type DetailedRecord = {
        id: number,
        sensorType: Sensor.Types,
        name: string,
        location: string,
        state: boolean,
        battery: number,
        tamper: boolean,
        status: string,
        uptodate: boolean,
        mac: string
    }

    export type EditableRecord = {
        id: number,
        sensorType: Sensor.Types,
        name?: string,
        location?: string    
    }

    export const Names: { [key in Types]: string } = {
        [Types.Smoke]: "Smoke detector",
        [Types.Leak]: "Leak detector",
        [Types.Motion]: "Motion detector",
        [Types.Gas]: "Gas detector",
        [Types.Plug]: "Plug detector",
        [Types.Doors]: "Doors detector"
    };
}



