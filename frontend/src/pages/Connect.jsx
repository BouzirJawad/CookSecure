import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import cbg from "../assets/cbg.jpg"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function Connect() {

  return (
    <>
    <div style={{backgroundImage: `url(${cbg})`}} className='h-screen bg-center bg-cover'>

    <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-[#4C4F70] p-6 rounded-lg shadow-md w-[80%] md:w-[50%]">

            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>

            
        </div>
    </div>
    </div>
    </>
  )
}

export default Connect