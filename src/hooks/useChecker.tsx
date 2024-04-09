export default function useChecker(original_text: string | string[], user_input: string | string[], cursor: number) {

    const original_text_parsed = typeof original_text === "string" ? original_text.split("") : original_text;
    const user_input_parsed = typeof user_input === "string" ? user_input.split("") : user_input;

    const checked_text: TypedWord[] = original_text_parsed.map(function (original_char, index) {
        return {
            correct_word: original_char,
            typed_word: user_input_parsed[index],
            isCorrect: original_char === user_input_parsed[index],
            isHere: cursor === index,
            wasHere: cursor > index
        }
    });

    return [checked_text];

}