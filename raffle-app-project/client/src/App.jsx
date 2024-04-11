import { Outlet } from 'react-router'
import { OpenRaffles } from "./_OpenRaffles"
import "../../styles/home/home.css"

function App() {
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
    <>
      <div className="home-container">
        <Navigation />
        <OpenRaffles />
        <Outlet />
        <Link to="/raffle/new">Create New Raffle</Link>
      </div>
    </>
  )
}

export default App;
