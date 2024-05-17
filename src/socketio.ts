import socketio from "socket.io-client";
import {createContext} from "react";

export const SENSOR_LIST_CHANGED = "sensor_list_changed";
export const DEVICE_LOST_COMM = "device_lost_comm";
export const CLEAR_DEVICE_LOST_COMM = "clear_device_lost_comm";
export const SENSOR_REMOVE_REQUEST = "sensor_remove";
export const SENSOR_ADD = "sensor_add";
export const DEV_ADD_SENSOR = "dev_add_sensor";
export const DEV_NOTIFY_STATUS_DATA = 'dev_notify_status_data';

const BACKEND_URL = "ws://192.168.50.97:8000/ws/sensors"

export const socket = socketio(BACKEND_URL, {
    transports: ["websocket"],
})

socket.on('connect', () => {
    // connection is done, now registering to the socket server
    console.log("Websocket connected")

    // TODO: add later
    // socket.emit('authenticate', { "Authorization": `Bearer ${getAuthToken()}`})
})

export const SocketContext = createContext(socket);

export default socket;

