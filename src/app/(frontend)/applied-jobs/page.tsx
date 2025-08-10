//@ts-nocheck
'use client'
import getCurrentUser from "@/helper"
import prismaclient from "@/services/prisma";
import { useEffect, useState } from "react";

const AppliedPage = () => {

    const [applications , setApplications] = useState();
    
    useEffect(() => {
        async function getappliedjobs() {
            try {
                const res = await fetch('http://localhost:3000/api/applied-jobs');
                const data = await res.json();
                setApplications(data?.data);
            } catch (err) {
                alert(err)
            }
        }
        getappliedjobs();

    }, [])

    return (
        <div>
            {
                applications?.map((item: any, index: number) => {
                    return (
                        <div key={index}>
                            {
                                <p>{item.job.jobTitle}</p>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AppliedPage
