export enum NotificationSeverity { high, normal, low }

export type NotificationObject = {
    id: number,
    date: string,
    text: string,
    severity: NotificationSeverity,
    read: boolean
}
