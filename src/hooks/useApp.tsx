import { useEffect, useState } from "react";
import useChecker from "./useChecker";
import useKeyboard, { KEYS } from "./useKeyboard";
import useTimer from "./useTimer";
import useTweet from "./useTweet";

export const enum AppState {
    RUNNING, STOPPED, READY, INITIAL, ERROR
}

export default function useApp() {

    const [app_state, setAppState] = useState<AppState>(AppState.INITIAL);

    const [tweet, authors, tweetConfig] = useTweet();
    const keyboard = useKeyboard(app_state === AppState.RUNNING, tweet.length);
    const [checked_text] = useChecker(tweet, keyboard.history, keyboard.cursor);
    const [counter, counterControlers] = useTimer(30);

    const start = ({ code }: { code: string }) => {
        console.log(code)
        if (code !== KEYS.SPACE) return;
        setAppState(AppState.RUNNING);
    }

    useEffect(() => {
        if (tweetConfig.isError) {
            setAppState(AppState.ERROR);
            return;
        }

        if (!tweetConfig.isLoading) {
            if (app_state !== AppState.RUNNING) setAppState(AppState.READY);
        }
    }, [tweetConfig, app_state]);

    useEffect(() => {

        if (app_state === AppState.RUNNING) {
            counterControlers.start();
        }

    }, [app_state, counterControlers]);

    return {
        app_state, checked_text, time: counter, start, authors
    }

}