import { useState } from "react";
import { Link } from "react-router-dom"
import { useApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";

export const JoinRaffle = () => {
  const [raffleCode, setCode] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  async function joinRaffle(e) {

    const { success, raffle } = await api.post("/find_raffle/", {
      raffleCode
    });
    if (success === "true") {
      navigate(`/raffle/${raffle.id}`);
    } else {
      // Change this so it is an error on screen
      alert("No Raffle found!")
    }
  }

  return (
    <m.div className="mdiv"
    initial={{y:"100%", opacity:0}} 
    animate={{y:"0%", opacity:1}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%", opacity:0}}
    >
      <input value={raffleCode} onChange={e => setCode(e.target.value)} />
      <div>
        Info of the raffle goes here.
      </div>
      <Link to="/" className="button" onClick={joinRaffle}>Join Raffle</Link>
    </m.div>
  )
}