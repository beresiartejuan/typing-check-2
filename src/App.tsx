import { useEffect } from "react";
import PrettyText from "./components/PrettyText";
import Timer from "./components/Timer";
import Title from "./components/Title"
import useApp, { AppState } from "./hooks/useApp";
import InitialLabel from "./components/InitialLabel";

function App() {

    const { start, app_state, authors, ...app } = useApp();

    useEffect(() => {
        window.addEventListener("keydown", start);

        return () => {
            window.removeEventListener("keydown", start);
        }
    }, [start]);

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
                {authors.map(author => {
                    return <p className="text-gray-400 text-2xl text-center max-w-xl">{author}</p>
                })}
            </div>
        </>
    )
}

export default App
