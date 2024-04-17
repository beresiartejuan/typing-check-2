import { useCallback, useEffect, useState } from "react"

export const KEYS = {
    BACKSPACE: 'Backspace',
    SPACE: 'Space',
    PERIOD: 'Period',
    COMMA: 'Comma',
    SLASH: 'Slash',
    SEMICOLON: 'Semicolon'
}

export const isKeyboardCodeAllowed = (code: string): boolean => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        Object.values(KEYS).includes(code)
    );
};

export default function useKeyboard(enable: boolean, limit: number): KeyboardInterface {

    const [cursor, setCursor] = useState<number>(0);
    const [history, setHistory] = useState<string[]>([]);

    const restore = () => {
        setCursor(0);
        setHistory([]);
    }

    const keyboard_hanlder = useCallback(
        function ({ code, key }: { code: string, key: string }) {

            if (!isKeyboardCodeAllowed(code) || !enable) return;

            if (key == KEYS.BACKSPACE) {
                setHistory((old_history) => old_history.slice(0, -1))
                setCursor((old_cursor) => old_cursor === 0 ? old_cursor : old_cursor - 1)
                return;
            }

            setHistory((old_history) => old_history.length >= limit ? old_history : old_history.concat(key))
            setCursor((old_cursor) => old_cursor >= limit ? old_cursor : old_cursor + 1)
        }
        , [limit, enable]
    );

    useEffect(() => {
        window.addEventListener("keydown", keyboard_hanlder);

        return () => {
            window.removeEventListener("keydown", keyboard_hanlder);
        }

    }, [keyboard_hanlder, enable]);

    return { cursor, history, restore };

}