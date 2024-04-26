import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useApi } from "../../utils/api";
import { motion as m } from "framer-motion";
import "../styles/viewraffle.css"
import { useRaffle } from "../../utils/use_raffle";

export const ViewRaffle = () => {

  const { id } = useParams();
  const [raffle, loading] = useRaffle(id);
  const api = useApi();
  const navigate = useNavigate();

  async function joinRaffle(e) {
    e.preventDefault();
    const { success } = await api.post(`/join_raffle/${id}/`, {});
    if (success == "true") {
    }

    navigate(`/userinfo`);
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

        <label className="view" htmlFor="raffle-description">
          Description
          <div className="description">
            {raffle.description}
          </div>
        </label>
        <button className="button" onClick={joinRaffle}>Join Raffle</button>
      </form>
    </m.div>
  )
}