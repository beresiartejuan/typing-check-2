import { useEffect, useState } from "react";
import getRandomElement from "../helpers/getRandomElement";

type cite_type = {
    cita: string;
}

export default function usePhrase(): [string, { isLoading: boolean, isError: boolean }] {

    const [phrase, setPhrase] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getPhrases = async (): Promise<cite_type[]> => {

        setIsLoading(true);

        const response = await fetch("/phrases.json");
        const phrases: cite_type[] = await response.json();

        return phrases;

    };

    const parsePhrases = (phrases: cite_type[]): string => {

        const { cita } = getRandomElement<cite_type>(phrases);

        return cita.length <= 100 ? `${cita} ${parsePhrases(phrases)}` : cita;

    }

    useEffect(() => {

        getPhrases()
            .then(cites => setPhrase(parsePhrases(cites)))
            .catch(err => {
                console.log(err);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    return [phrase, { isLoading, isError }];

}