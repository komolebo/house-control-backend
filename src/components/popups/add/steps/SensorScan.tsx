import {Typography} from "@mui/material";
import React, {useEffect} from "react";

interface IProps {
    onact: (foundSensor: boolean) => void
}

export function SensorScan({onact}: IProps) {
    useEffect(() => {
        const timeoutId = setTimeout(() => onact(true), 2000);

        return () => clearTimeout(timeoutId);
    }, [onact]);

    return <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 30
    }}>
        <img src={process.env.PUBLIC_URL + 'Resources/ico_wait_big.gif'} alt={"Alter ico wait"}/>
        <Typography variant="h3" color="primary.text">
            <br/><br/>Scanning for sensors
        </Typography>
    </div>
}