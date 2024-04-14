import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"


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
    <>
      <button onClick={logout} className="button">Logout</button>
      <div>
        UserInfo
        {/* For each raffle in raffleset, add raffle div */}
      </div>
    </>
  )
}