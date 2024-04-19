import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import { motion as m } from "framer-motion";
import { useRaffles } from "../../utils/use_raffles"
import "../styles/userinfo.css"
import { useJoinedRaffles } from "../../utils/use_joined_raffles";

export const UserInfo = () => {

  const [raffles, rafflesLoading] = useRaffles();
  const [joinedRaffles, joinedRafflesLoading] = useJoinedRaffles();

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
    initial={{y:"100%", opacity:0}} 
    animate={{y:"0%", opacity:1}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%", opacity:0}}
    >
      <div className="divider">
        <div className="container">
          <h1>My Open Raffles</h1>
          <div className="raffleList">
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
        </div>
        <div className="container">
          <h1>Joined Raffles</h1>
          <div>
          {
              joinedRaffles.map(raffle => (
                <div className="placeholder" key={raffle.id}>
                  <h3><Link to={`/raffle_view/${raffle.id}`}>{raffle.name}</Link></h3>
                  <div>
                    {raffle.description}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <button onClick={logout} className="button">Logout</button>
    </m.div>
  )
}