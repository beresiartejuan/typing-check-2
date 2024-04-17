import { useState } from "react";
import { KEYS } from "../hooks/useKeyboard";

export default function Results({ show, time, text }: { show: boolean, time: number, text: TypedWord[] }) {

    const [analitycs, setAnalitycs] = useState({
        correct_words: 0,
        correct_letters: 0,
        wrong_letters: 0,
        wrong_words: 0,
    });

    // ! FIX analitycs

    if (!show) return null;

    let original_word = ""
    let typed_word = ""

    text.forEach(letter => {

        letter.correct_word ? analitycs.correct_letters++ : analitycs.wrong_letters++;

        if (letter.correct_word == KEYS.SPACE || letter.correct_word == KEYS.PERIOD) {

            if (original_word == "") return;
            console.log(original_word, typed_word)

            original_word === typed_word ? analitycs.correct_words++ : analitycs.wrong_words++;

            original_word = ""
            typed_word = ""
            return;
        }

        original_word += letter.correct_word;
        typed_word += letter.typed_word;

    });

    return (
        <div>
            <h3 className="text-2xl font-bold text-green-700">- Resultados -</h3>
            <p className="text-gray-400 text-xl text-center max-w-xl">Te sobraron {time} segundos</p>
            <p className="text-gray-400 text-xl text-center max-w-xl">Acertaste {analitycs.correct_words} palabras</p>
            <p className="text-gray-400 text-xl text-center max-w-xl">Acertaste {analitycs.correct_letters} letras</p>
            <p className="text-gray-400 text-xl text-center max-w-xl">Fallaste {analitycs.wrong_words} palabras</p>
            <p className="text-gray-400 text-xl text-center max-w-xl">Fallaste {analitycs.wrong_letters} letras</p>
        </div>
    )

}