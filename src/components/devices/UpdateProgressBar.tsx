import React, {useEffect, useState} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import '../../styles/Devices/UpdateProgressBar.css';
import socket from '../../socketio';

export interface IProps {
    x: number,
    y: number,
    oncomplete: () => void
}

function UpdateProgressBar({x, y, oncomplete}: IProps) {
    const [interval, setInterval] = useState ();
    const [percentage, setPercentage] = useState (0);

    const updateCounter = (percent: number) => {
        percent *= 100;
        console.log ("received: ", percent);
        if (percent > 100) {
            clearInterval (interval);
            oncomplete ();
        }

        setPercentage (percent);
    }

    socket.subscribe ("update_dev_in_progress", (data: any) => {
        updateCounter (data["value"]);
    });
    socket.subscribe ("update_dev_complete", {oncomplete});

    useEffect (() => {
        clearInterval (interval);
    }, []);

    return <div className="update-progress-bar-container">
        <CircularProgressbar
            value={percentage}
            text={(percentage | 0) + '%'}
        />
    </div>
}

export default UpdateProgressBar;