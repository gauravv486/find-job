'use client'
import Link from 'next/link';
import React, { FormEvent, useState } from 'react'

const signupPage = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const obj = {
        email,
        password
    }

    async function handlesubmit(e: FormEvent) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/signup', {
            method: "POST",
            body: JSON.stringify(obj),
        });

        const data = response.json();
    }

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <input type="email" placeholder='Email' value={email} onChange={(e) => { setemail(e.target.value) }} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                <button type='submit'>Signup</button>
            </form>
            <p>Already have account ! <span className='text-blue-400'><Link href={'/login'}>Login</Link></span></p>

        </div>
    )
}

export default signupPage
