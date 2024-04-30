import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'vite/modulepreload-polyfill'
import { HashRouter as Router } from "react-router-dom";

function Main() {
  return (
    <div>
      <Router >
        <App />
      </Router>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Main />
)
