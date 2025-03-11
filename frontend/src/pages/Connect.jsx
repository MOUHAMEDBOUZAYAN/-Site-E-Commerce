import React, { useState } from 'react'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

function Connect() {
    const[isRegistering, setIsRegistering] = useState(false)

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="bg-[#EDEDE9] p-6 rounded-lg shadow-md w-[80%] md:w-[50%]">

            {isRegistering ? <RegisterPage /> : <LoginPage />}

            <p className="mt-4 text-sm text-center">
                {isRegistering ? "Already have an account?" : "New user?"}{" "}
                <button
                    className={isRegistering? "text-blue-500 underline" : "text-orange-500 underline"}
                    onClick={() => setIsRegistering(!isRegistering)}
                >
                {isRegistering ? "Login here" : "Register here"}
                </button>
            </p>
        </div>
    </div>
    </>
  )
}

export default Connect