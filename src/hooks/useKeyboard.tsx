import { useCallback, useEffect, useReducer, useState } from "react"

export const isKeyboardCodeAllowed = (code: string): boolean => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space" ||
        code === "Period" ||
        code === "Comma" ||
        code === "Slash" ||
        code === "Semicolon"
    );
};

const restore_history_code = "J_HISTORY";

function historyReducer(state: history_state, action: history_action) {

    console.log(action)

    if (action.code === restore_history_code && action.key === restore_history_code) {
        return [];
    }

    if (state.length === action.cursor) {

        if (action.key === "Backspace" && state.length > 0) {
            return state.slice(0, -1);
        }

        if (action.code === "Space") return [...state, " "];

        return [...state, action.key];
    }

    return state;
}

export default function useKeyboard(): KeyboardInterface {

    const [enable, setEnable] = useState<boolean>(false);
    const [cursor, setCursor] = useState<number>(0);
    const [history, updateHistory] = useReducer(historyReducer, []);

    const startRecord = () => {
        setEnable(true);
    }

    const stopRecord = () => {
        setEnable(false);
    }

    const restoreHistory = () => {
        setCursor(0);
        updateHistory({
            code: restore_history_code,
            key: restore_history_code,
            cursor
        });
    }

    const keyboard_hanlder = useCallback(
        function (params: { code: string, key: string }) {

            if (!isKeyboardCodeAllowed(params.code)) return;

            console.log(params.code, params.key);

            setCursor(function (old_cursor): number {

                updateHistory({
                    key: params.key,
                    code: params.code,
                    cursor: old_cursor
                })

                return (params.key === "Backspace") ? old_cursor - 1 : old_cursor + 1;

            });
        }
        , [setCursor, updateHistory]);

    useEffect(() => {
        if (enable) {
            window.addEventListener("keydown", keyboard_hanlder);
        } else {
            window.removeEventListener("keydown", keyboard_hanlder);
        }

        return () => {
            window.removeEventListener("keydown", keyboard_hanlder);
        }

    }, [keyboard_hanlder, enable]);

    return { cursor, history, stopRecord, startRecord, isRecording: enable, restoreHistory };

}