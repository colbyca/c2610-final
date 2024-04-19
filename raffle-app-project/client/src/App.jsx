import { Outlet } from 'react-router'
import { Navigation } from "./pages/_Navigation"
import { AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route } from "react-router-dom";
import './index.css'

import { JoinRaffle } from './pages/_JoinRaffle.jsx'
import { NewRaffle } from './pages/_NewRaffle.jsx'
import { UserInfo } from './pages/_UserInfo.jsx'
import { EditRaffle } from './pages/_EditRaffle.jsx';
import { ViewRaffle } from './pages/_ViewRaffle.jsx';



function App() {

  const location = useLocation();

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
      <Navigation />
      <div className="home-container">
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<JoinRaffle />} />
            <Route path="/raffles" element={<h1>I am on the the list page</h1>} />
            <Route path="/raffle/new" element={<NewRaffle />} />
            <Route path="/raffle/:id" element={<ViewRaffle />} />
            <Route path="/raffle_edit/:id" element={<EditRaffle />} />
            <Route path="/userinfo" element={<UserInfo />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  )
}

export default App;
