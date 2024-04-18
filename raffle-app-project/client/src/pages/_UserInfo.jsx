import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import {motion as m} from "framer-motion";
import "../styles/newraffle.css"


export const UserInfo = () => {

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
    initial={{y:"100%"}} 
    animate={{y:"0%"}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%"}}
    >
      <button onClick={logout} className="button">Logout</button>
      <div>
        UserInfo
        {/* For each raffle in raffleset, add raffle div */}
      </div>
    </m.div>
  )
}