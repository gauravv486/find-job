//@ts-nocheck
'use client'
import { userContext } from '@/context/User'
import { ExternalLink, Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import EditJobButton from './user/EditJobButton'

const JobCard = ({ item }: any) => {

  const { savejobs, setsavejobs } = useContext(userContext);
  // const isSaved = savejobs.some(job => job.jobId === item.jobId);

  const { user } = useContext(userContext);


  // function handlesaveJobs() {
  //   if (isSaved) {
  //     const filterSavejobs = savejobs.filter((elem) => elem.id != item.id);
  //     setsavejobs(filterSavejobs);
  //   } else {
  //     const newItem = [...savejobs, item];
  //     setsavejobs(newItem);

  //   }
  // }

  async function handledelete() {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/deletejob/${item.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
      }
      else {
        alert(data.message);
      }
    } catch (err) {
      alert("something went wrong")
    }

  }
  const isOwner = item?.Company?.user?.email === user?.email;

  return (

    <div className='bg-white/5  rounded-2xl p-6 w-full h-48 hover:bg-white/10 transition-all cursor-pointer group'>
      {/* Header Section */}
      <div className='flex justify-between items-start mb-4 min-w-lg'>
        <div className='flex-1'>
          <Link href={`/details/${item.id}`} key={item.id}>
            <h1 className='text-xl font-medium text-white mb-2 leading-tight line-clamp-1 group-hover:underline transition-all'>
              {item.jobTitle}
            </h1>
          </Link>
          <div className='flex items-center gap-3 text-sm'>
            <span className='bg-black/40 text-white px-3 py-1 rounded-full text-xs'>
              {item.jobLocation}
            </span>
            <span className='text-white/60 text-xs'>
              MinSalary : $10000 - $30000
            </span>
          </div>
        </div>

        {/* Save Button */}
        {/* <button onClick={handlesaveJobs} className='p-2 hover:bg-white/10 rounded-xl transition-all'>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isSaved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button> */}


        {
          isOwner && (<button onClick={handledelete} className='p-2 hover:bg-white/10 rounded-xl transition-all'>
            <Trash height={18} />
          </button>)
        }


        {
          isOwner && <EditJobButton job={item} />
        }


      </div>

      {/* Company Info Section */}
      <div className='flex items-center gap-4'>
        <div className='flex-shrink-0'>
          <Image
            src={item.employerLogo}
            alt="logo"
            width={32}
            height={32}
            className='rounded-xl object-contain'
          />
        </div>

        <div className='flex-1'>
          <h2 className='text-lg font-medium text-white line-clamp-1 transition-all'>
            {item.employerName}
          </h2>
          <div className='flex items-center gap-1 text-xs text-white/60 mt-1'>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className='flex-shrink-0'>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className='line-clamp-1'>{item.jobCountry || 'Anywhere'}</span>
          </div>
        </div>
        <div>
          <Link href={`/company/${item.companyId}`}>
            <div className='flex'>
              <span className='text-sm text-blue-300'>Company</span>
              <span>< ExternalLink height={20} /></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default JobCard

