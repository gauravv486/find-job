//@ts-nocheck
'use client'
import { userContext } from '@/context/User'
import getCurrentUser from '@/helper'
import React, { useContext, useEffect, useState } from 'react'
import JobCard from '../JobCard'

const JobList = () => {

    const [jobs, setJobs] = useState([]);

    const { user } = useContext(userContext);
    const company = user?.company || {};

    useEffect(() => {
        async function getCompanyJobs() {
            const res = await fetch('http://localhost:3000/api/company-jobs');
            const data = await res.json();
            const result = data?.jobs;
            setJobs(result);
        }
        getCompanyJobs();
    }, [])

    return (
        <div className='flex flex-col gap-6'>
            {
                jobs?.map((item) => {
                    return (
                        <div key={item.id}>
                            <JobCard item={item} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default JobList
