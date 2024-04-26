import { Link } from "react-router-dom"
import "../styles/navigation.css"
import RafWiz from "../styles/Raf_Wiz.png"

export const Navigation = () => {


  return (
    <nav id="navbar">
      <div id="navbar-container">
        <img src={RafWiz} alt="Raf Wiz" id="rafwiz"></img>
        <Link to="/raffle/new" className="button">Create New Raffle</Link>
        <Link to="/" className="button">Join Raffle</Link>
      </div>
      <div id="navbar-container">
        <Link to="/userinfo" className="button">Account</Link>
      </div>
    </nav>
  )
}