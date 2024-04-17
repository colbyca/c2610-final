import { useState } from "react";
import { Link } from "react-router-dom"
import { useApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";


export const JoinRaffle = () => {
  const [raffleCode, setCode] = useState("");
  const api = useApi();
  const navigate = useNavigate();

  async function joinRaffle(e) {

    const { success, raffle } = await api.post("/create_ticket/", {
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
    <>
      <input value={raffleCode} onChange={e => setCode(e.target.value)} />
      <div>
        Info of the raffle goes here.
      </div>
      <button onClick={joinRaffle}>Join Raffle</button>
    </>
  )
}