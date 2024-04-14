import { Link } from "react-router-dom"
import "../styles/navigation.css"
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [navDrawer, setNavDrawer] = useState(false);

  function handleDrawer() {
    if (navDrawer === false) {
      setNavDrawer(true)
    }
    else {
      setNavDrawer(false)
    }
  }

  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-titleicon">
            <button className="navdrawer-toggle" onClick={handleDrawer}>
              <span className="navbar-title">My Raffles</span>
            </button>
            <Link to="/raffle/new" className="button">Create New Raffle</Link>
            <Link to="/" className="button">Join Raffle</Link>
            <Link to="/userinfo" className="button">User Info</Link>
          </div>
        </div>
      </nav>
      <nav className="drawer" data-open={navDrawer}>
        <a href=""><span>Example 1</span></a>
        <a href=""><span>Example 2</span></a>
        <a href=""><span>Example 3</span></a>
        <a href=""><span>Example 4</span></a>
      </nav >
    </>

  )
}