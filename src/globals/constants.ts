
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

    export type DetailedRecord = {
        id: number,
        sensorType: Sensor.Types,
        name: string,
        location: string,
        state: boolean,
        battery: number,
        tamper: boolean,
        status: string,
        uptodate: boolean
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



