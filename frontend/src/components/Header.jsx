import React from 'react'
import { Profile } from "../icons/Profile"

function Header() {
  return (
    <div>
        <div className='flex bg-[#3d3d6b] p-5 items-center'>
            <div>
                <p className='text-4xl'><span className='text-[#00FBFF]'>Cook</span>Secure</p>
            </div>
            <div className='ml-auto '>
                <button className='h-fit text-center place-content-around flex items-center gap-3 font-bold bg-[#00EEFF]'>
                    <Profile className="text-xl"/>
                    Login
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header