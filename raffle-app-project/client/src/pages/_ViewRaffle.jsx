import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api";
import { motion as m } from "framer-motion";
import "../styles/viewraffle.css"
import { useRaffle } from "../../utils/use_raffle";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewRaffle = () => {

  const { id } = useParams();
  const [raffle, loading, isOwner, joined, numTickets] = useRaffle(id);
  const api = useApi();
  const navigate = useNavigate();

  async function joinRaffle(e) {
    e.preventDefault();
    const { success, error } = await api.post(`/join_raffle/${id}/`, {});
    if (success === "true") {
      navigate(`/userinfo`)
    } else {
      notify(error);
    }
  }

  async function chooseWinner(e) {
    e.preventDefault();
    const { success, error } = await api.post(`/raffle/${id}/choose_winner/`, {});
    if (success === "true") {
      navigate(`/raffle/${raffle.id}/contact_winner`)
    } else {
      notify(error)
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
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ y: "-50%" }}
    >
      <form>
        <h3>{raffle.name}</h3>

        <label className="view" htmlFor="raffle description">
          Description
          <div className="description">
            {raffle.description}
          </div>
        </label>
        <label htmlFor="number of tickets">
          Number of tickets: {numTickets} / {raffle.max_tickets}
        </label>

        {
          isOwner && !raffle.finished ?
            (
              <>
                <label htmlFor="raffle code">
                  <div>Join Code: </div><div>{raffle.code}</div>
                </label>
                <button className="button" onClick={(e) => { e.preventDefault(); navigate(`/raffle/${raffle.id}/edit/`) }}>Edit Raffle</button>
                <button className="button winner" onClick={chooseWinner}>Choose the winner!</button>
              </>
            ) :
            (<></>)
        }
        {
          !isOwner && !joined && !raffle.finished ?
            (<>
              <button className="button" onClick={joinRaffle}>Join Raffle</button>
            </>
            ) :
            (<></>)
        }
        {
          raffle.finished ?
            (
              <div>This raffle has finished!</div>
            ) :
            (<></>)
        }
        {
          raffle.finished && isOwner ?
            (
              <Link className="button" to={`/raffle/${raffle.id}/contact_winner`}>View the winner</Link>
            ) :
            (<></>)
        }

      </form>
    </m.div>
  )
}