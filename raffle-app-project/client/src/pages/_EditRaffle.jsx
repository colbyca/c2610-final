import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useRaffle } from "../../utils/use_raffle";
import {motion as m} from "framer-motion";
import "../styles/newraffle.css"

export const EditRaffle = () => {
  const { id } = useParams();
  const [raffle, loading] = useRaffle(id);
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  console.log(raffle.name)
  const api = useApi();
  const navigate = useNavigate();

  // async bs!
  useEffect(() => {
    if (!loading) {
      setRaffleTitle(raffle.name);
      setRaffleDesc(raffle.description);
    }
  }, [loading])

  async function editRaffle(e) {
    e.preventDefault();

    await api.post(`/edit_raffle/${id}/`, {
      raffleTitle,
      raffleDesc,
    });

    navigate(-1);
  }


  return (
    <m.div className="mdiv"
    initial={{y:"100%", opacity:0}} 
    animate={{y:"0%", opacity:1}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%", opacity:0}}
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
        
        <button className="button submit">Save Changes</button>
      </form>
    </m.div>
  )
}