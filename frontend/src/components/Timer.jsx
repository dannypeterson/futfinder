import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [countdown, setCountdown] = useState(getTimeUntilNextNineAM());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(getTimeUntilNextNineAM());
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);

    function getTimeUntilNextNineAM() {
        const now = new Date();
        const nineAM = new Date(now);
        nineAM.setHours(9, 0, 0, 0);

        if (now >= nineAM) {
            nineAM.setDate(now.getDate() + 1); // Move to the next day
        }

        const timeDiff = nineAM - now;
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    return (
        <div>
            <strong>{countdown}</strong>
            <p>Until next FutFinder</p>
        </div>
    );
};

export default Timer;
