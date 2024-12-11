import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const [password,setPassword] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("https://realauto.limsa.uz/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
                password: password
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.success) {
                toast.success(data?.message)
                localStorage.setItem("tokenchik",data?.data?.tokens?.accessToken?.token)
                navigate("/dashboard")             
            }else{
                toast.error(data?.message)
            }
        }).catch((error) => {
            toast.error(error?.message)
        })
    }
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 bg-blue-200 px-7 py-10 rounded-3xl w-[25%] shadow-lg'>
        <input onChange={(e)=>setPhoneNumber(e.target.value)} className='px-4 py-2 text-xl rounded-lg outline-none' type="text" placeholder='Phone Number' minLength={2} required />
        <input onChange={(e)=>setPassword(e.target.value)} className='px-4 py-2 text-xl rounded-lg outline-none' type="password" placeholder='Password' minLength={2} required/>
        <button className='px-4 py-2 mt-5 text-white bg-blue-700 rounded-lg yutext-lg' type="submit">Submit</button>
      </form>
      <h1>900474227    superadmin</h1>
    </div>
  )
}

export default LoginPage
