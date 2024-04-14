import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

export const NewRaffle = () => {
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  const [raffleCode, setRaffleCode] = useState("");

  function createCode(length){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function handleSubmit(event){
    event.preventDefault();
  }
    
  



  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="raffle-title">
          Raffle Title
          <input value={raffleTitle} onChange={e => setRaffleTitle(e.target.value)} />
        </label>
        <label htmlFor="raffle-description">
          Description
          <textarea value={raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>
        <label htmlFor="raffle-code">
          Code
          <input value={raffleCode}  />
          <button onClick={() => setRaffleCode((createCode(6)))}>Create Code</button>
        </label>
        <button>Create Raffle</button>
      </form>
    </>

  )
}