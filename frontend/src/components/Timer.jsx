import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [time]);

    const formatTime = (time) => {
       const days = Math.floor(time / (24 * 60 * 60));
        const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = time % 60;
    
    

        return ` Sale ends in ${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
};

export default Timer;
