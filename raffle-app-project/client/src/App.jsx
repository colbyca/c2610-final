import { Outlet } from 'react-router'
import "./styles/home.css"
import { Navigation } from "./pages/_Navigation"


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
        <div>
          <Outlet />
          
        </div>
      </div>
    </>
  )
}

export default App;
