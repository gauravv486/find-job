//@ts-nocheck
'use client'
import { verifyToken } from "@/services/jwt";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react"
import GetToken from "./Isuserlogin";
import Isuserlogin from "./Isuserlogin";
import { userContext } from "@/context/User";
import removetoken from "@/services/removetoken";
import { link } from "fs";
import ModeToggle from "./theme/ToggleButton";

const Header = () => {
  const router = useRouter();
  const [query, setquery] = useState("");
  const [suggestions, setSuggestion] = useState([]);



  // function clearSuggestions() {
  //   setSuggestion([]);
  // }

  const { user } = useContext(userContext);

  async function handlelogin() {
    if (user) {
      await fetch('http://localhost:3000/api/logout');
      alert('user hai', user);
      window.location.href = '/login';
    } else {
      window.location.href = '/login';
    }
  }

  async function handlesubmit(e: FormEvent) {
    e.preventDefault();
    let url = `http://localhost:3000/search?query=${query}`;
    router.push(url);
  }

  useEffect(() => {
    async function getsuggestion() {
      const res = await fetch(`http://localhost:3000/api/suggestions?query=${query}`);
      const data = await res.json();
      let result = data.user;
      let title = result?.map((item) => item.jobTitle);
      setSuggestion(title);
    }

    let x;
    if (query) {
      x = setTimeout(() => {
        getsuggestion();
      }, 1000)
    } else {
      setSuggestion([]);
    }

    return () => {
      if (x)
        clearTimeout(x);
    }
  }, [query])

  return (
    <header className="bg-black sticky top-0 z-50 flex items-center justify-between px-6 h-20  shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        
        <Link href={'/'}><h1 className="text-2xl font-bold text-white tracking-tight">JobZone</h1></Link>
      </div>

      {/* Search Section */}
      <div className="flex-1 max-w-3xl mx-8 relative">
        <form onSubmit={handlesubmit} method="GET" className="flex items-center bg-gray-700/20 rounded-lg shadow-sm overflow-hidden  transition-all">
          <div className="flex-1 flex">
            <input
              className="flex-1 px-6 py-4 border-none outline-none text-gray-200 placeholder-gray-400 bg-transparent"
              type="text"
              placeholder="Search by job title"
              name="query"
              value={query}
              onChange={(e) => { setquery(e.target.value) }}
            // onBlur={clearSuggestions}
            />
          </div>
          <button type="submit" className="bg-gray-700 text-white px-8 py-4 font-medium hover:bg-gray-600 focus:bg-gray-600 transition-colors duration-200 whitespace-nowrap">
            Find Jobs
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-gray-900 shadow-xl border border-gray-700 rounded-lg mt-2 max-h-64 overflow-y-auto z-50">
            {suggestions?.map((item, index) => (
              <Link key={index} href={`/search?query=${item}`}>
                <div className="px-6 py-3 hover:bg-gray-800 cursor-pointer text-gray-200 border-b border-gray-700 last:border-b-0 transition-colors duration-150">
                  <p className="text-sm font-medium">{item}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">

        {
          user?.role === "admin" && <Link href={'/adminpanel'}>
            <button className="text-gray-300 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">
              AdminPanel
            </button>
          </Link>
        }

        {
          user?.role === "user" && <Link href={'/profile'}>
            <button className="text-gray-300 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">
              Profile
            </button>
          </Link>
        }

        {/* <Link href={'/savejobs'}>
          <button className="text-gray-300 hover:text-white font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800">
            Saved Jobs
          </button>
        </Link> */}
        <button
          onClick={handlelogin}
          className="text-gray-300 hover:text-white font-medium transition-colors duration-200 px-4 py-2 rounded-md hover:bg-gray-800 border border-gray-600 hover:border-gray-500"
        >
          {user ? "Logout" : "Login"}
        </button>
        <ModeToggle />
      </div>
    </header>
  )
}

export default Header