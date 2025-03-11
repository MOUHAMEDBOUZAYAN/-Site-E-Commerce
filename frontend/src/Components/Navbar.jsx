import React, {useState, useEffect} from 'react'
import { Store } from '../icons/Store'
import { Logout } from '../icons/Logout';
import Logo from '../assets/site_logo.png'
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [logedIn, setLogedIn ] = useState(false)
  const navigate =  useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("profile"));
    const admin = JSON.parse(sessionStorage.getItem("profile1"));
    
    setLogedIn(!!user || !!admin);
  }, []);
  
  
  const logout = () => {
    sessionStorage.removeItem("profile")
    sessionStorage.removeItem("profile1")
    setLogedIn(false)
    navigate("/")
  }
  
  return (
    <div className='w-full bg-[#D5BDAF] flex items-center'>
        <img src={Logo} alt="logo" className='h-13' />
        <p className='font-bold mx-3'>BOUTIQUE 404</p>

        <div className='ml-auto w-fit'>

        {logedIn && <>
            <button onClick={()=>navigate("/Store")} className=' m-0 p-0 outline-none'>
              <Store />
            </button>
      
            <button onClick={logout} className='m-0 p-0 outline-none'>
              <Logout />
            </button>
        </>
        }
        </div>
    </div>
  )
}

export default Navbar