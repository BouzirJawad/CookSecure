import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connect from './pages/Connect'
import Home from './pages/Home';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>

        <main className="flex-1">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/connect/*" element={<Connect />} />
          </Routes>
        </main>

      </Router>
    </div>
  )
}

export default App