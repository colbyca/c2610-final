import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useRaffle = (id) => {
    const api = useApi();
    const [raffle, setRaffle] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadRaffle() {
        const { raffle } = await api.get(`/raffle/${id}`);
        setRaffle(raffle);
        setLoading(false);
    }

    useEffect(() => {
        loadRaffle();
    }, []);

    return [raffle, loading];
}