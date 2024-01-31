import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Appbar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { useSearchParams } from 'react-router-dom'
import { Users } from '../components/Users'

const DashBoard = () => {
    const [searchParams]=useSearchParams();
    const username=searchParams.get("name");
    const [balance,setBalance]=useState("");

    useEffect(() => {
      const fetchBalance = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          });
          setBalance(response.data.balance);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
      fetchBalance();
    }, []);
  return (
    <div className='bg-slate-300 h-screen'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
            <Appbar name={username}/>
            <Balance value={balance}/>
            <Users name={username}/>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
