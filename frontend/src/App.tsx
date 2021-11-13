import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

import './App.css'

import { Home } from './pages/Home/Home'
import { Version } from './pages/Version/Version'

function App() {
  return (
    <div className="App container m-auto">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/version" element={<Version/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
