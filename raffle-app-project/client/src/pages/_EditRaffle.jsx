import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useRaffle } from "../../utils/use_raffle";
import { motion as m } from "framer-motion";
import "../styles/newraffle.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const EditRaffle = () => {
  const { id } = useParams();
  const [raffle, loading] = useRaffle(id);
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleWinDet, setRaffleWinDet] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  const notify = (message) => {
    toast.warn(message, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  }

  useEffect(() => {
    if (!loading) {
      setRaffleTitle(raffle.name);
      setRaffleDesc(raffle.description);
      setRaffleWinDet(raffle.winner_details);
    }
  }, [loading])

  async function editRaffle(e) {
    e.preventDefault();

    const { success, error } = await api.post(`/raffle/${id}/edit/`, {
      raffleTitle,
      raffleDesc,
      raffleWinDet
    });
    if (success === "true") {
      navigate(-1);
    } else {
      notify(error);
    }
  }


  return (
    <m.div className="mdiv"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ y: "-50%", opacity: 0 }}
    >
      <form onSubmit={editRaffle}>
        <label htmlFor="raffle-title">
          Raffle Title
          <input value={raffleTitle} required onChange={e => setRaffleTitle(e.target.value)} />
        </label>

        <label htmlFor="raffle-code">
          <div>Join Code: </div><div>{raffle.code}</div>
        </label>

        <label htmlFor="max-tickets">
          <div>Max # of Entries: </div><div>{raffle.max_tickets}</div>
        </label>

        <label htmlFor="raffle-description">
          Description
          <textarea rows="5" required maxlength="300" value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>

        <label htmlFor="winner details">
          Winner Details
          <textarea rows="5" required maxLength="300" value={raffleWinDet} onChange={e => setRaffleWinDet(e.target.value)} />
        </label>

        <button className="button submit">Save Changes</button>
      </form>
    </m.div>
  )
}