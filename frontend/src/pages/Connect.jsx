import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import cbg from "../assets/cbg.jpg"
function Connect() {
    const[isRegistering, setIsRegistering] = useState(false)

  return (
    <>
    <div style={{backgroundImage: `url(${cbg})`}} className='h-screen bg-center bg-cover'>

    <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-[#4C4F70] p-6 rounded-lg shadow-md w-[80%] md:w-[50%]">

            {isRegistering ? <Register /> : <Login />}

            <p className="mt-4 text-sm text-center text-white">
                {isRegistering ? "Already have an account?" : "New user?"}{" "}
                <button
                    className="underline text-[#00EEFF]"
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                <p className='text-[#00EEFF]'>{isRegistering ? "Login here" : "Register here"}</p>
                </button>
            </p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Connect