export const SENSOR_LIST_CHANGED = "sensor_list_changed";
export const DEVICE_LOST_COMM = "device_lost_comm";
export const CLEAR_DEVICE_LOST_COMM = "clear_device_lost_comm";
export const SENSOR_REMOVE_REQUEST = "sensor_remove";
export const SENSOR_ADD = "sensor_add";
export const DEV_ADD_SENSOR = "dev_add_sensor";
export const DEV_NOTIFY_STATUS_DATA = 'dev_notify_status_data';

function waitForSocketConnection(socket, callback){
    setTimeout(
        function () {
            if (socket.readyState === 1) {
                if (callback != null){
                    callback();
                }
            } else {
                console.log("wait for connection...")
                waitForSocketConnection(socket, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}

class SocketHandler {

    constructor() {
        this.subscriptions = {};
        this.connect();
    }

    connect() {
        this.socket = new WebSocket('ws://192.168.50.97:8000/ws/sensors'); 
        console.log("Websocket created");

        this.socket.onmessage = function(e) {
            var data = JSON.parse(e.data);
            var msg = data['message'];
            var payload = data['payload'];

            if (msg in this.subscriptions) {
                this.subscriptions[msg].forEach(callback => {
                    callback(payload);
                });
            }

            console.log("<<", msg, " :: ", data['payload']);
        }.bind(this);

        this.socket.onclose = function(e) {
            setTimeout(() => { 
                console.log("retry connect");
                this.connect();
            }, 500);
        }.bind(this);
    }

    subscribe(msg, callback) {
        if (msg in this.subscriptions) {
            this.subscriptions[msg].push(callback);
        }
        else {
            this.subscriptions[msg] = [callback];
        }
    }

    notifyBackend(msg, data) {
        waitForSocketConnection(this.socket, () => {
            console.log(">>", msg, " :: ", data);
            this.socket.send(JSON.stringify({ 'message': msg, 'payload': data }));
        });
    }
}

const socket = new SocketHandler();

export default socket;

