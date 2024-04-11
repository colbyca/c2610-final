import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export const NewRaffle = () => {
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleVis, setRaffleVis] = useState(false);



  return (
    <>
      <form>
        <label htmlFor="raffle-title">
          Raffle Title
          <input value={raffleTitle} onChange={e => setRaffleTitle(e.target.value)} />
        </label>
        <label htmlFor="raffle-description">
          Description
          <textarea value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>
      </form>
    </>

  )
}