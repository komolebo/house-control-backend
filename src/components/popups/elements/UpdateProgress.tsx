import {Box, CircularProgress, CircularProgressProps, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

interface IProps {
    percent: number
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size="54px" color="info" variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    color="info.main"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function CircularWithValueLabel({percent}: IProps) {
    const [progress, setProgress] = useState<number>(percent);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress: number) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 200);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return <CircularProgressWithLabel value={progress} sx={{float: "left"}}/>;
}
