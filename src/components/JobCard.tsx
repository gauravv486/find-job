//@ts-nocheck
'use client'
import { userContext } from '@/context/User'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'

const JobCard = ({ item }: any) => {

  const { savejobs, setsavejobs } = useContext(userContext);
  const isSaved = savejobs.some(job => job.jobId === item.jobId);

  function handlesaveJobs() {
    if (isSaved) {
      const filterSavejobs = savejobs.filter((elem) => elem.id != item.id);
      setsavejobs(filterSavejobs);
      // localStorage.setItem('savejobs' , JSON.stringify(filterSavejobs));
    } else {
      const newItem = [...savejobs, item];
      setsavejobs(newItem);
      // localStorage.setItem('savejobs', JSON.stringify(newItem));
    }
  }

  return (
    <div className='bg-gray-700/20  rounded-xl p-6 w-100 h-48 shadow-sm hover:shadow-lg hover:bg-gray-800/20 transition-all duration-300 cursor-pointer group'>
      {/* Header Section */}

      <div className='flex justify-between items-start mb-4'>
        <div className='flex-1'>
          <Link href={`/details/${item.jobId}`} key={item.jobId}>
            <h1 className='text-xl font-semibold text-gray-300 mb-2 leading-tight line-clamp-1 group-hover:text-gray-300 transition-colors duration-200 group-hover:underline'>
              {item.jobTitle}
            </h1> 
          </Link>
          <div className='flex items-center gap-3 text-sm'>
            <span className='bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs font-medium'>
              {item.jobLocation}
            </span>
            <span className='text-gray-400 text-xs'>
              MinSalary : $10000 - $30000
            </span>
          </div>
        </div>

        {/* Save Button */}
        <button onClick={handlesaveJobs} className='p-2 hover:bg-gray-800 rounded-lg transition-all duration-200'>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-300"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Company Info Section */}
      <div className='flex items-center gap-5'>
        <div className='flex-shrink-0'>
          <Image
            src={item.employerLogo}
            alt="logo"
            width={30}
            height={30}
            className='rounded-lg object-contain '
          />
        </div>

        <div className='flex-1 gap-4 '>
          <h2 className='text-lg font-bold text-gray-100 line-clamp-1 group-hover:text-gray-300 transition-colors duration-200'>
            {item.employerName}
          </h2>
          <div className='flex items-center gap-1 text-xs text-gray-400 mt-1'>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='flex-shrink-0 text-gray-400'>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className='line-clamp-1'>{item.jobCountry || 'Anywhere'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard