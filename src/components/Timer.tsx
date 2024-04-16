import { useCallback, useMemo } from "react";

export default function Timer({ seconds }: { seconds: number }) {

    const initial_seconds = useMemo(() => seconds, []);

    const color = function () {
        if (initial_seconds === 0) return "text-gray-500";
        if (Math.floor(initial_seconds / 2) < seconds) return "text-green-500";
        if (Math.floor(initial_seconds / 2) >= seconds && Math.floor(initial_seconds / 3) <= seconds) return "text-yellow-500";
        return "text-red-500";
    }

    return (<h2 className={`${color()} font-medium text-xl`}>Tiempo: {seconds} segundos.</h2>);

}