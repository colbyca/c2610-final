import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api";
import { motion as m } from "framer-motion";
import "../styles/viewraffle.css"
import { useRaffle } from "../../utils/use_raffle";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWinner } from "../../utils/use_winner";

export const ContactWinner = () => {

  const { id } = useParams();
  const [raffle, loading, isOwner, joined, finished] = useRaffle(id);
  const [winner] = useWinner(id)
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

  console.log(winner)

  return (
    <m.div className="mdiv"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ y: "-50%" }}
    >
      {
        !isOwner ?
          (
            <form>You do not own this raffle!</form>
          ) :
          (
            <>
              {
                !finished ?
                  (
                    <form>
                      You have not chosen the winner yet!
                    </form>
                  ) :
                  (
                    <form>
                      <h3>The winner of your raffle is {winner.first_name} {raffle.last_name}</h3>
                      <div>Send them an email with your instructions to claim their prize:</div>
                      <div className="winnerdeets">
                        <h4>
                          Email: 
                        </h4>
                        <a href={`mailto:${winner.email}`}>{winner.email}</a>
                      </div>
                      <div className="winnerdeets">
                        <h4>Raffle Winner Details: </h4>
                        <div>{raffle.winner_details}</div>
                      </div>
                    </form>
                  )
              }
            </>
          )
      }
    </m.div>
  )
}