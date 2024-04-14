import { useState } from "react";
import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"


export const JoinRaffle = () => {
  const [raffleCode, setCode] = useState("");




  return (
    <>
      <input value={raffleCode} onChange={e => setCode(e.target.value)}/>      
      <div>
        Info of the raffle goes here.
      </div>
      <Link to="/" className="button">Join Raffle</Link>
    </>
  )
}