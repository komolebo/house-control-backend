import {createContext} from "react";

export const SENSOR_LIST_CHANGED = "sensor_list_changed";
export const DEVICE_LOST_COMM = "device_lost_comm";
export const CLEAR_DEVICE_LOST_COMM = "clear_device_lost_comm";
export const SENSOR_REMOVE_REQUEST = "sensor_remove";
export const SENSOR_ADD = "sensor_add";
export const DEV_ADD_SENSOR = "dev_add_sensor";
export const DEV_NOTIFY_STATUS_DATA = 'dev_notify_status_data';

const BACKEND_URL = "ws://192.168.50.85:8000/ws/sensors"

type SocketSubscriptions = {
    msgType: string,
    callback: (data: any) => void
}

let msgQueue: any[] = [];
let subscriptions: SocketSubscriptions[] = [];

export const socket = new WebSocket(BACKEND_URL);

export function sendWsMessage(type: string, data: any) {
    const msg = { "message": type, "payload": data };

    if (socket.readyState !== WebSocket.OPEN) {
        msgQueue.push(msg);
    } else {
        socket.send(JSON.stringify(msg));
    }
}

export function subscribeWsMessage(msgType: string, callback: (data: any) => void) {
    const newRecord = {msgType: msgType, callback: callback};
    const exist = subscriptions.find(el => el.msgType === msgType && el.callback === callback);

    if (!exist) {
        subscriptions.push(newRecord);
    }
}

export function unsubscribeWsMessage(msgType: string, callback: (data: any) => void) {
    subscriptions = subscriptions.filter(el => el.callback === callback && el.msgType === msgType);
}

socket.onopen = () => {
    console.log("Websocket successfully connected")

    // resolve msgQueue
    msgQueue.map(msg => {
        socket.send(JSON.stringify(msg))
    })
}

socket.onclose = () => {
    console.warn("Websocket disconnected")
}

socket.onerror = () => {
    console.error("Websocket error occurred")
}

socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    const type = data["message"];
    console.log("Got ", type, " subscriptions: ", subscriptions)

    subscriptions.forEach(el => {
        if (el.msgType === type && el.callback) {
            el.callback(data["payload"]);
        }
    })
}

export const SocketContext = createContext(socket);

export default socket;

