import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import { motion as m } from "framer-motion";
import "../styles/newraffle.css"
import { useRaffles } from "../../utils/use_raffles"

export const UserInfo = () => {

  const [raffles, rafflesLoading] = useRaffles();

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }


  return (
    <m.div className="mdiv"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      exit={{ y: "-50%" }}
    >
      <button onClick={logout} className="button">Logout</button>
      <h1>My Open Raffles</h1>
      <div>
        {
          raffles.map(raffle => (
            <div className="placeholder" key={raffle.id}>
              <h3><Link to={`/raffle_edit/${raffle.id}`}>{raffle.name}</Link></h3>
              <div>
                {raffle.description}
              </div>
            </div>
          ))
        }
      </div>
      <h1>Joined Raffles</h1>
      <div>
        {/* Put user's joined raffles here */}
      </div>
    </m.div>
  )
}