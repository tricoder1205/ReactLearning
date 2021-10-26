import React, { useEffect, useState } from 'react';

function formatDate(date) {

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours} ${minutes} ${seconds}`;
}

function CLock() {
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        return () => {
            clearInterval(clockInterval);
        }
    }, []);

    return (
        <p style={{ fontSize: '42px' }}>{timeString}</p>
    );
}

export default CLock;