//@ts-nocheck
'use client'
import { createContext, useEffect, useState } from "react"

export const userContext = createContext();

export default function UserProvider({ children }) {

    const [user, setuser] = useState({});
    const [savejobs, setsavejobs] = useState([]);

    useEffect(() => {

        const storedjobs = localStorage.getItem('savejobs');
        if (storedjobs) {
            setsavejobs(JSON.parse(storedjobs));
        }

        async function getuser() {
            try {
                const res = await fetch('http://localhost:3000/api/curr-user');
                const data = await res.json();
                if (data.success) {
                    setuser(data.user)
                }
            } catch (error) {
                
                return error.message;
            }
        }
        getuser();

    }, [])

    useEffect(() => {
        localStorage.setItem('savejobs', JSON.stringify(savejobs));
    }, [savejobs]);

    return (
        <userContext.Provider value={{
            user,
            setuser,
            savejobs,
            setsavejobs
        }}>
            {children}
        </userContext.Provider>
    )
}       