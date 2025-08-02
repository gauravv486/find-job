//@ts-nocheck
'use client'
import { createContext, useEffect, useState } from "react"

export const userContext = createContext();

export default function UserProvider({ children }) {

    const [user, setuser] = useState({});

    useEffect(() => {
        async function getuser() {
            try {
                const res = await fetch('http://localhost:3000/api/curr-user');
                const data = await res.json();
                if (data.success) {
                    setuser(data.user)
                }
            } catch (error) {
                console.log(error);
            }
        }
        getuser();
    }, [])

    return (
        <userContext.Provider value={{
            user,
            setuser
        }}>
           {children}
        </userContext.Provider>
    )
}       