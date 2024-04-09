import { useEffect, useState } from "react";
import PrettyText from "./components/PrettyText";
import Title from "./components/Title"
import useChecker from "./hooks/useChecker";
import useKeyboard from "./hooks/useKeyboard";
import usePhrase from "./hooks/usePhrase"

function App() {

    const [phrase, phraseConfig] = usePhrase();
    const keyboard = useKeyboard();
    const [checked_text] = useChecker(phrase, keyboard.history, keyboard.cursor);

    useEffect(() => {

        keyboard.startRecord();

        return () => {
            keyboard.stopRecord();
        }

    }, [keyboard]);

    return (
        <div>
            <Title title="<Typing-Check-2\>"></Title>
            <PrettyText text={checked_text}></PrettyText>
        </div>
    )
}

export default App
