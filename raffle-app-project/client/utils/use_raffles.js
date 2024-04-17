import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useRaffles = () => {
    const api = useApi();
    const [raffles, setRaffles] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadRaffles() {
        const { raffles } = await api.get("/owned_raffles/");
        setRaffles(raffles);
        setLoading(false);
    }

    useEffect(() => {
        loadRaffles();
    }, []);

    return [raffles, loading];
}