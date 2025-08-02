'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const loginPage = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const router = useRouter();

    const obj = {
        email ,
        password
    }

    async function handlesubmit(e : FormEvent){
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/login' , {
            method : "POST" ,
            body : JSON.stringify(obj) ,
        });

        const data = await response.json();
        console.log(data)
        if(data.success){
          router.push('/');
        }
        else{
          alert("something went wrong")
        }
        
    }

  return (
    <div>
        <form onSubmit={handlesubmit}>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <button type='submit'>Login</button>
        </form>
        <p>Don't have account ! <span className='text-blue-400'><Link href={'/signup'}>signup</Link></span></p>
    </div>
  )
}

export default loginPage
