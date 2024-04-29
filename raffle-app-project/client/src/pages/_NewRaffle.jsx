import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api";
import { motion as m } from "framer-motion";
import "../styles/newraffle.css";

export const NewRaffle = () => {
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleCode, setRaffleCode] = useState("");
  const [raffleWinDet, setRaffleWinDet] = useState("");
  const [raffleEndDate, setRaffleEndDate] = useState("");
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
      maxTickets,
      raffleWinDet,
      raffleEndDate
    });

    navigate(-1);
  }
  console.log(raffleEndDate)


  return (
    <m.div className="mdiv"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ y: "-50%", opacity: 0 }}
    >
      <form onSubmit={createRaffle}>

        <label htmlFor="raffle-title">
          Raffle Title
          <input value={raffleTitle} required onChange={e => setRaffleTitle(e.target.value)} />
        </label>

        <label htmlFor="raffle-code">
          Join Code
          <button className="button" onClick={(e) => {
            e.preventDefault();
            setRaffleCode((createCode(6)));
          }}>Create Code</button>
          <input required readOnly value={raffleCode} />
        </label>

        <label htmlFor="max-tickets">
          Max # of Entries
          <input value={maxTickets} required onChange={e => setMaxTickets(e.target.value)} type="number" />
        </label>

        <label htmlFor="raffle-description">
          Description
          <textarea rows="5" required maxLength="300" value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>

        <label htmlFor="winner details">
          Winner Details
          <textarea rows="3" required maxLength="300" value={raffleWinDet} onChange={e => setRaffleWinDet(e.target.value)} />
        </label>

        <button className="button submit">Create Raffle</button>
      </form>
    </m.div>
  )
}