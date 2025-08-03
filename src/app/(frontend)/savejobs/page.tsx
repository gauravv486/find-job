//@ts-nocheck
'use client'
import JobCard from '@/components/JobCard';
import { userContext } from '@/context/User';
import React, { useContext } from 'react'

const savepage = () => {

    const  {savejobs} = useContext(userContext);

    return (
        <div>
            {
                savejobs?.map((item: any) => {
                    return (
                        <div key={item.jobId}>
                            <JobCard item={item} />
                        </div>
                    )
                })
            }
        </div>
    )
}
export default savepage
