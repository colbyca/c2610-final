import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import { OpenRaffles } from "./_OpenRaffles"
import "../../styles/home/home.css"




export const Home = () => {


  return (
    <div className="home-container">
      <Navigation />
      <OpenRaffles />
      <Link to="/raffle/new">Create New Raffle</Link>
    </div>
  )
}