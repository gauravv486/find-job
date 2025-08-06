//@ts-nocheck
import JobCard from '@/components/JobCard';
import React from 'react'
import { Building2, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import SearchFilter from '@/components/SearchFilter';
import Header from '@/components/Header';

const searchPage = async ({ searchParams }) => {
  const query = searchParams.query;
  const minprice = searchParams.minprice;
  const jobtype = searchParams.jobtype || "";

  let url = `http://localhost:3000/api/search?query=${query}&minprice=${minprice}&jobtype=${jobtype}`;
  const res = await fetch(url);
  const data = await res.json();
  let result = data?.data;

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className='flex relative'>

        <div className='w-1/5 '>
          <SearchFilter />
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4 mt-8 flex-1'>
          {
            result?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-700/10 group rounded-lg border-gray-700/20 shadow-md hover:shadow-lg transition duration-100 p-6 w-full max-w-140 "
                >
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {item.employerLogo ? (
                        <img
                          src={item.employerLogo}
                          alt={`${item.employerName} logo`}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div>
                        <Link href={`/details/${item.id}`} key={item.jobId}>
                          <h2 className="text-xl font-semibold text-gray-300 mb-1 group-hover:text-blue-400 group-hover:underline">
                            {item.jobTitle}
                          </h2>
                        </Link>
                        <div className="flex items-center text-gray-400">
                          <Building2 className="w-4 h-4 mr-1" />
                          <span className="font-medium">{item.employerName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.jobCountry && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.jobCountry}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-4">
                    <p className="text-gray-500 leading-relaxed line-clamp-3">
                      {item.jobDescription}
                    </p>
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">Job ID: {item.jobId}</span>
                      <span>{`MinSalary : ${item.minSalary}`}</span>
                    </div>

                    <Link href={`/company/${item.id}`}>
                      <div className='flex'>
                        <span className='text-sm text-blue-300'>Company</span>
                        <span>< ExternalLink height={20} /></span>
                      </div>
                    </Link>

                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  )
}

export default searchPage;
