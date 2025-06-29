import React, {useEffect, useState} from "react";
import { Text } from "@/components/Themed";

function unixTimeToTimeLeft(timeLeft: number): string {
    if (timeLeft <= 0) {
        return "00:00:00";
    }

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function Timer({ unixTime }: { unixTime: number }) {
    const [timeLeft, setTimeLeft] = useState<string>(unixTimeToTimeLeft(unixTime - Math.floor(Date.now() / 1000)));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(unixTimeToTimeLeft(unixTime - Math.floor(Date.now() / 1000)));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {timeLeft}
        </Text>
    );
}