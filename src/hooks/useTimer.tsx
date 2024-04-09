import { useCallback, useEffect, useRef, useState } from "react";

export default function useTimer(time: number): TimerInterface {

    const [counter, setCounter] = useState<number>(time);
    const timer = useRef<number | null>(null);
    const isTimerEnded = counter <= 0;

    const start = useCallback(function () {
        if (timer.current !== null || isTimerEnded) return;

        const interval_handler = () => {
            setCounter((prevCounter) => prevCounter - 1);
        }

        timer.current = setInterval(interval_handler, 1000);
    }, [timer, isTimerEnded, setCounter]);

    const stop = useCallback(function () {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
    }, [timer]);

    const reset = useCallback(function () {
        stop();
        setCounter(time);
    }, [stop, time, setCounter]);

    useEffect(() => {

        if (isTimerEnded) stop();

        return () => {
            stop();
        }

    }, [isTimerEnded, stop]);

    useEffect(() => {
        return () => {
            stop();
        }
    }, [stop]);

    return [counter, { start, stop, reset }];

}