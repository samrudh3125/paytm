import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarming'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label="Sign In" />
                <SubHeading label={"Enter your credentials to sign in"}/>
                <InputBox placeholder={"Samrudh3125"} label={"Username"} onChange={e=>setUsername(e.target.value)}/>
                <InputBox placeholder={"123456"} label={"Password"} onChange={e=>setPassword(e.target.value)}/>
                <div>
                    <Button label={"Sign In"} onClick={
                        async ()=>{
                            const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                            })
                            localStorage.setItem("token",response.data.token)
                            navigate("/dashboard?name="+username);
                        }
                    }/>
                </div>
                <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            </div>
        </div>
    </div>
  )
}

export default Signin
