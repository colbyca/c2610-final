import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider, BrowserRouter as Router} from "react-router-dom";
import { JoinRaffle } from './pages/_JoinRaffle.jsx'
import { NewList } from './pages/_NewList.jsx'
import { NewRaffle } from './pages/_NewRaffle.jsx'
import { UserInfo } from './pages/_UserInfo.jsx'
import { EditRaffle } from './pages/_EditRaffle.jsx'

/*const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <JoinRaffle />
      }, {
        path: "/raffles",
        element: <h1>I am on the the list page</h1>
      }, {
        path: "/raffle/new",
        element: <NewRaffle />
      }, {
        path: "/raffle_edit/:id",
        element: <EditRaffle />
      }, {
        path: "/userinfo",
        element: <UserInfo />
      }
    ]
  }
])*/

function Main(){
  return(
    <div>
      <Router>
        <App/>
      </Router>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  /*<RouterProvider router={router} />*/
  <Main/>
)
