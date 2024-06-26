import { useState } from "react";
import { Link } from "react-router-dom"
import { useApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";
import "../styles/joinraffle.css"

import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      notify("No raffle found!");
      
    }
  }

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

  return (
    <m.div className="mdiv"
    initial={{y:"100%", opacity:0}} 
    animate={{y:"0%", opacity:1}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%", opacity:0}}
    >
      <div className="join">
        <h2>Join Raffle</h2>
        <input value={raffleCode} required placeholder="Join Code" onChange={e => setCode(e.target.value)} />  
        <Link to="/" className="button" onClick={joinRaffle}>Search Raffle</Link>
      </div>
    </m.div>
  )
}