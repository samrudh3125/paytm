import React, { useState } from 'react'
import axios from 'axios'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarming'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label="Sign Up" />
          <SubHeading label={"Enter your information to create an account"}/>
          <InputBox placeholder={"Samrudh"} label={"First Name"} onChange={e=>setFirstName(e.target.value)}/>
          <InputBox placeholder={"Shetty"} label={"Last Name"} onChange={e=>setLastName(e.target.value)}/>
          <InputBox placeholder={"Samrudh3125"} label={"Username"} onChange={e=>setUsername(e.target.value)}/>
          <InputBox placeholder={"123456"} label={"Password"} onChange={e=>setPassword(e.target.value)}/>
          <div>
            <Button label={"Sign Up"} onClick={
              async ()=>{
                const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                  username,
                  firstName,
                  lastName,
                  password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard");
              }
            }/>
          </div>
          <BottomWarning label={"Already Have an account?"} buttonText={"Sign In"} to={"/signin"}/>
        </div>
      </div>
    </div>
  )
}

export default Signup
