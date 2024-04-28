import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useWinner = (id) => {
    const api = useApi();
    const [winner, setWinner] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadWinner() {
        const { winner } = await api.get(`/raffle/${id}/get_winner/`);
        setWinner(winner);
        setLoading(false);
    }

    useEffect(() => {
        loadWinner();
    }, []);

    return [winner];
}