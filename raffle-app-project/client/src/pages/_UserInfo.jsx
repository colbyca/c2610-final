import { Link } from "react-router-dom"
import { Navigation } from "./_Navigation"
import { useRaffles } from "../../utils/use_raffles"

export const UserInfo = () => {

  const [raffles, rafflesLoading] = useRaffles();

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
      <h1>My Open Raffles</h1>
      <div>
        {
          raffles.map(raffle => (
            <div className="placeholder" key={raffle.id}>
              <h3><Link to={`/raffle_edit/${raffle.id}`}>{raffle.name}</Link></h3>
              <div>
                {raffle.description}
              </div>
            </div>
          ))
        }
      </div>
      <h1>Joined Raffles</h1>
      <div>
        {/* Put user's joined raffles here */}
      </div>
    </>
  )
}