function Char({ info }: { info: TypedWord }) {
    let styles = "";

    if (info.isHere) styles += "with-cursor";

    if (info.wasHere) {
        if (info.correct_word === " ") styles += info.isCorrect ? "correct-space" : "worng-space";
        if (info.correct_word !== " ") styles += info.isCorrect ? "correct-word" : "worng-word";
    }

    return (<span className={styles}>{info.correct_word}</span>)
}

export default function PrettyText({ text }: { text: TypedWord[] }) {

    return (<div className={`text-gray-400 text-2xl text-center max-w-xl`}>
        {text.map(function (char_info, index) {
            return <Char key={index} info={char_info}></Char>
        })}
    </div>)

}