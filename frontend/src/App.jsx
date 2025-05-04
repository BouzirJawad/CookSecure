import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Connect from './pages/Connect'
import Test from './components/Test';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Test />} />
            <Route path="/connect/*" element={<Connect />} />
          </Routes>
        </main>

      </Router>
    </div>
  )
}

export default App