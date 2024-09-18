import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10); 
        } else {
            clearInterval(intervalIdRef.current);
        }

        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        clearInterval(intervalIdRef.current); 
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }

    return (
        <Paper elevation={3} sx={{ padding: "20px", maxWidth: "300px", margin: "auto" }}>
            <Typography variant="h4" align="center">
                Stopwatch
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Typography variant="h5">{formatTime()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={start} variant="contained" color="primary">
                    Start
                </Button>
                <Button onClick={stop} variant="contained" color="secondary">
                    Stop
                </Button>
                <Button onClick={reset} variant="outlined" color="default">
                    Reset
                </Button>
            </Box>
        </Paper>
    );
}

export default Stopwatch;
