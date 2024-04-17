import PrettyText from "./components/PrettyText";
import Timer from "./components/Timer";
import Title from "./components/Title"
import useApp, { AppState, DEFAULT_TIME } from "./hooks/useApp";
import InitialLabel from "./components/InitialLabel";
import Results from "./components/Results";

function App() {

    const { app_state, authors, ...app } = useApp();

    return (
        <>
            <Title title="<Typing-Check-2\>"></Title>
            <Timer seconds={app.time}></Timer>
            <PrettyText text={app.checked_text}></PrettyText>
            {
                (app_state === AppState.READY) && <InitialLabel />
            }
            <div>
                <h3 className="text-2xl font-bold text-green-700">- Autores -</h3>
                {authors.map((author, index) => {
                    return <p key={index} className="text-gray-400 text-2xl text-center max-w-xl">{author}</p>
                })}
            </div>
            <Results text={app.checked_text} time={DEFAULT_TIME - app.time} show={app_state == AppState.FINISHED}></Results>
        </>
    )
}

export default App
