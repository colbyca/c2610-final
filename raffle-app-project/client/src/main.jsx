import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from './pages/_Home.jsx'
import { NewList } from './pages/_NewList.jsx'
import { NewRaffle } from './pages/_NewRaffle.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/raffles",
        element: <h1>I am on the the list page</h1>
      }, {
        path: "/raffle/new",
        element: <NewRaffle />
      }, {
        path: "/raffle/:id",
        element: <h1>I am on the the list page</h1>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
