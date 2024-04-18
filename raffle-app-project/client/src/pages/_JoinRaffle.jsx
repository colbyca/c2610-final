import { useState } from "react";
import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import {motion as m} from "framer-motion";
import "../styles/newraffle.css"


export const JoinRaffle = () => {
  const [raffleCode, setCode] = useState("");




  return (
    <m.div className="mdiv"
    initial={{y:"100%"}} 
    animate={{y:"0%"}} 
    transition={{duration: 0.75, ease:"easeInOut"}} 
    exit={{y:"-50%"}}
    >
      <input value={raffleCode} onChange={e => setCode(e.target.value)}/>      
      <div>
        Info of the raffle goes here.
      </div>
      <Link to="/" className="button">Join Raffle</Link>
    </m.div>
  )
}