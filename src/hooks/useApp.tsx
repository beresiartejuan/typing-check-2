import { useCallback, useEffect, useState } from "react";
import useChecker from "./useChecker";
import useKeyboard, { KEYS } from "./useKeyboard";
import useTimer from "./useTimer";
import useTweet from "./useTweet";

export const enum AppState {
    RUNNING, STOPPED, READY, INITIAL, ERROR, FINISHED
}

export const DEFAULT_TIME = 30

export default function useApp() {

    const [app_state, setAppState] = useState<AppState>(AppState.READY);
    const [tweet, authors, tweetConfig] = useTweet();
    const keyboard = useKeyboard(app_state === AppState.RUNNING, tweet.length);
    const [checked_text] = useChecker(tweet, keyboard.history, keyboard.cursor);
    const [counter, counterControlers] = useTimer(DEFAULT_TIME);
    const { start: startCounter, stop: stopCounter } = counterControlers;

    const startHanlder = useCallback(() => {

        if (app_state !== AppState.READY) return;

        startCounter();
        setAppState(AppState.RUNNING);

    }, [app_state, startCounter]);

    const overClockedHandler = useCallback(() => {

        if (tweet.length <= keyboard.cursor && app_state === AppState.RUNNING) {
            stopCounter();
            setAppState(AppState.FINISHED)
        }

    }, [tweet, keyboard, stopCounter]);

    useEffect(() => {

        const keyboardHanlder = (event: KeyboardEvent) => {
            if (event.code !== KEYS.SPACE) return;
            startHanlder()
        }

        window.addEventListener("keydown", keyboardHanlder);

        return () => {
            window.removeEventListener("keydown", keyboardHanlder);
        }

    }, [startHanlder]);

    useEffect(() => {
        if (counter === 0) {
            setAppState(AppState.FINISHED);
            stopCounter();
        }

        overClockedHandler();
    }, [overClockedHandler, counter, stopCounter]);

    return {
        app_state, checked_text, time: counter, authors
    }

}