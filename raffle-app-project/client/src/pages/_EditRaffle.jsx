import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useApi } from "../../utils/api";
import { useRaffle } from "../../utils/use_raffle";

export const EditRaffle = () => {
  const { id } = useParams();
  const [raffle, loading] = useRaffle(id);
  const [raffleTitle, setRaffleTitle] = useState("");
  const [raffleDesc, setRaffleDesc] = useState("");
  console.log(raffle.name)
  const api = useApi();
  const navigate = useNavigate();

  // async bs!
  useEffect(() => {
    if (!loading) {
      setRaffleTitle(raffle.name);
      setRaffleDesc(raffle.description);
    }
  }, [loading])

  async function editRaffle(e) {
    e.preventDefault();

    await api.post(`/edit_raffle/${id}`, {
      raffleTitle,
      raffleDesc,
    });

    navigate(-1);
  }


  return (
    <>
      <form onSubmit={editRaffle}>
        <label htmlFor="raffle-title">
          Raffle Title
          <input value={loading ? "" : raffleTitle} onChange={e => setRaffleTitle(e.target.value)} />
        </label>
        <label htmlFor="raffle-description">
          Description
          <textarea value={loading ? "" : raffleDesc} onChange={e => setRaffleDesc(e.target.value)} />
        </label>
        <label htmlFor="max-tickets">
          <h3>Max tickets: {raffle.max_tickets}</h3>
        </label>
        <label htmlFor="raffle-code">
          <h3>Code: {raffle.code}</h3>
        </label>
        <button>Save Changes</button>
      </form>
    </>
  )
}