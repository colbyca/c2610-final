import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useJoinedRaffles = () => {
    const api = useApi();
    const [joinedRaffles, setJoinedRaffles] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadJoinedRaffles() {
        const { joinedRaffles } = await api.get(`/joined_raffles/`);
        setJoinedRaffles(joinedRaffles);
        setLoading(false);
    }

    useEffect(() => {
        loadJoinedRaffles();
    }, []);

    return [joinedRaffles, loading];
}