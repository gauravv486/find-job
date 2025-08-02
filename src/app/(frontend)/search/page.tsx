//@ts-nocheck
import JobCard from '@/components/JobCard';
import React from 'react'
import { Building2, MapPin, ExternalLink, Briefcase } from 'lucide-react';
import Link from 'next/link';
import SearchFilter from '@/components/SearchFilter';
import Header from '@/components/Header';


const searchPage = async ({ searchParams }) => {

  const query = searchParams.query ;
  const minprice = searchParams.minprice;
  const jobtype = searchParams.jobtype || "";

  let url = `http://localhost:3000/api/search?query=${query}&minprice=${minprice}&jobtype=${jobtype}`;
 
  const res = await fetch(url);
  const data = await res.json();
  let result = data?.data;

  return (
    <div>
      <Header />

      <div className='flex relative'>

        <div className='w-1/5'>
          <SearchFilter />
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4 mt-8 flex-1'>
          {
            result?.map((item) => {
              return (
                <div key={item.jobId} className="bg-white group rounded-lg shadow-md hover:shadow-lg transition duration-100 p-6 w-full max-w-140 border border-gray-200 hover:bg-blue-100/20 ">
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {item.employerLogo ? (
                        <img
                          src={item.employerLogo}
                          alt={`${item.employerName} logo`}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                      )}
                      <div>
                        <Link href={`/details/${item.jobId}`} key={item.jobId}>
                          <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 group-hover:underline">
                            {item.jobTitle}
                          </h2>
                        </Link>
                        {/* <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 underline">
                      {item.jobTitle}
                    </h2> */}
                        <div className="flex items-center text-gray-600">
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
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {item.jobDescription}
                    </p>
                  </div>

                  {/* Footer Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Job ID: {item.jobId}</span>
                      <span>{`MinSalary : ${item.minSalary}`}</span>
                    </div>

                    {item.employerWebsite && (
                      <a
                        href={item.employerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
                      >
                        Visit Company
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    )}
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

export default searchPage
