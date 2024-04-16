/// <reference types="vite/client" />

interface TypedWord {
    correct_word: string;
    typed_word: string;
    isCorrect: boolean;
    isHere: boolean;
    wasHere: boolean;
}

interface KeyboardInterface {
    cursor: number;
    history: string[];
    restore: Function;
}

interface history_action {
    code: string;
    key: string;
    cursor: number;
    limit: number;
}

type history_state = string[];

type cite_type = {
    cita: string;
}

type PhraseInterface = [
    string,
    string[],
    {
        isLoading: boolean,
        isError: boolean,
        reload: Function
    }
];

type TimerInterface = [
    number,
    {
        start: Function,
        stop: Function,
        reset: Function
    }
]