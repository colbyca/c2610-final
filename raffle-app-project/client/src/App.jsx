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
import { ToastContainer } from 'react-toastify';
import { ContactWinner } from './pages/_ContactWinner.jsx';



function App() {

  const location = useLocation();

  return (
    <>
      <Navigation />
      <div className="home-container">
        <AnimatePresence initial={false}>
          <Routes location={location} key={location.pathname} >
            <Route path="/" element={<JoinRaffle />} />
            <Route path="/raffle/new" element={<NewRaffle />} />
            <Route path="/raffle/:id" element={<ViewRaffle />} />
            <Route path="/raffle/:id/edit" element={<EditRaffle />} />
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/raffle/:id/contact_winner" element={<ContactWinner />} />
          </Routes>
        </AnimatePresence>
      </div>
      <ToastContainer />
    </>
  )
}

export default App;
