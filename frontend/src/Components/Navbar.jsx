import React from 'react'
import { Profile } from '../icons/Profile'
import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className='w-full bg-[#D5BDAF] flex items-center'>
        <img src={Logo} alt="logo" className='h-13' />
        <p className='font-bold mx-3'>BOUTIQUE 404</p>
        <button className='ml-auto m-0 p-0 outline-none'>
            <Profile />
        </button>
    </div>
  )
}

export default Navbar