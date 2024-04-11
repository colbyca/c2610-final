import { Link } from "react-router-dom"
import "../../styles/home/navigation.css"
import { useState, useEffect } from "react";

export const NewRaffle = () => {
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleVis, setRaffleVis] = useState(false);



  return (
    <>
      <div className="raffle-container"></div>
    </>

  )
}