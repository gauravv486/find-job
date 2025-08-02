//@ts-nocheck
'use client'
import { verifyToken } from "@/services/jwt";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react"
import GetToken from "./Isuserlogin";
import Isuserlogin from "./Isuserlogin";
import { userContext } from "@/context/User";
import removetoken from "@/services/removetoken";

const Header =  () => {

  const router = useRouter();
  const [query, setquery] = useState("");

  const {user} = useContext(userContext);
  
  async function handlelogin(){
    if(user){
         
        router.push('/login');
    }else{
      router.push('/login');
    }
  }

  async function handlesubmit(e: FormEvent) {
   
    e.preventDefault();

     let url = `http://localhost:3000/search?query=${query}`;
     router.push(url);
  }

  return (
    <header className="sticky bg-white top-0 z-50 flex items-center justify-between px-6 h-20 border-b-1 border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Image src="/businessman.png" alt="Businessman" width={30} height={30} />
        </div>
        <h1 className="text-xl font-semibold text-blue-600">JobZone</h1>
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-2xl mx-6">
        <form onSubmit={handlesubmit} method="GET" className="flex items-center bg-white shadow-sm ">
          <div className="flex-1 flex">
            <input
              className="flex-1 px-4 py-3 border-none outline-none"
              type="text"
              placeholder="Search by : Job title"
              name="query"
              value={query}
              onChange={(e) => { setquery(e.target.value) }}
            />
          </div>
          <button type="submit" className="bg-blue-400 text-white px-6 py-3  hover:bg-blue-500 transition-colors">
            Find Job
          </button>
        </form>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mr-10">

        <button className="text-gray-600 hover:text-blue-600 transition-colors">
          Save Jobs
        </button>
        <button onClick={handlelogin} className="text-gray-600 hover:text-blue-600 transition-colors">
          {user ? "logout " : "login"}
        </button>
      </div>

    </header>
  )
}

export default Header