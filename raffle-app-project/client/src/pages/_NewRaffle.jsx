import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api";

export const NewRaffle = () => {
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleCode, setRaffleCode] = useState("");
  const [maxTickets, setMaxTickets] = useState(100);
  const api = useApi();
  const navigate = useNavigate();

  function createCode(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async function createRaffle(e) {
    e.preventDefault();

    await api.post("/create_raffle/", {
      raffleTitle,
      raffleDesc,
      raffleCode,
      maxTickets
    });

    navigate(-1);
  }


  return (
    <>
      <form onSubmit={createRaffle}>
        <label htmlFor="raffle-title">
          Raffle Title
          <input value={raffleTitle} onChange={e => setRaffleTitle(e.target.value)} />
        </label>
        <label htmlFor="raffle-description">
          Description
          <textarea value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>
        <label htmlFor="max-tickets">
          Maximum tickets allowed
          <input value={maxTickets} onChange={e => setMaxTickets(e.target.value)} type="number" />
        </label>
        <label htmlFor="raffle-code">
          Code
          <input value={raffleCode} />
          <button onClick={(e) => {
            e.preventDefault();
            setRaffleCode((createCode(6)));
          }}>Create Code</button>
        </label>
        <button>Create Raffle</button>
      </form>
    </>
  )
}