import { useEffect, useState } from "react";
import { useApi } from "./api";

export const useRaffle = (id) => {
    const api = useApi();
    const [raffle, setRaffle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [joined, setJoined] = useState(false);
    const [numTickets, setNumTickets] = useState(false);

    async function loadRaffle() {
        const { raffle, isOwner, joined, numTickets } = await api.get(`/raffle/${id}`);
        setRaffle(raffle);
        setLoading(false);
        setIsOwner(isOwner);
        setJoined(joined);
        setNumTickets(numTickets);
    }

    useEffect(() => {
        loadRaffle();
    }, []);

    return [raffle, loading, isOwner, joined, numTickets];
}