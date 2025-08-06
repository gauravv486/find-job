//@ts-nocheck
import JobCard from '@/components/JobCard';
import ReviewDialog from '@/components/user/ReviewDialog';
import getCurrentUser from '@/helper';
import Image from 'next/image';
import React from 'react';

const CompanyPage = async ({ params }) => {
    const id = params.id;
    let company;
    let jobs;

    const user = await getCurrentUser();
    
    try {
        const res = await fetch(`http://localhost:3000/api/company/${id}`);
        const data = await res.json();
        console.log(data);
        company = data?.data;
        jobs = company?.job || [];
    } catch {
        console.log("something went wrong");
    }
    
    console.log(company);
    console.log(jobs);
    
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="container mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Company Card */}
                    <div className="lg:col-span-1">
                        <h1 className='text-2xl ml-45 mb-10 font-bold'>Company</h1>
                        {company && (
                            <div className="bg-gray-700/20 rounded-lg p-6 shadow-lg sticky top-6">
                                <div className="text-center">
                                    {company.logo && (
                                        <div className="mb-4 flex justify-center">
                                            <Image
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                                width={80}
                                                height={80}
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <h1 className="text-2xl font-bold mb-4 text-white">
                                        {company.name}
                                    </h1>
                                    {company.description && (
                                        <p className="text-gray-300 mb-4">
                                            {company.description}
                                        </p>
                                    )}
                                    {company.location && (
                                        <p className="text-gray-400 mb-2">
                                            📍 {company.location}
                                        </p>
                                    )}
                                    {company.website && (
                                        <a
                                            href={company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            🌐 Visit Website
                                        </a>
                                    )}
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-sm text-gray-400">
                                            {jobs.length} jobs available
                                        </p>
                                    </div>
                                </div>
                                <ReviewDialog userId={user.id} companyId={id}/>
                            </div>
                            
                        )}
                    </div>
                    
                    {/* Right Side - Jobs List */}
                        <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white">
                                Available Jobs
                            </h2>
                        </div>
                        
                        {jobs.length > 0 ? (
                            <div className="space-y-4">
                                {jobs.map((item, index) => (
                                    <div key={index} className="bg-gray-700/20 rounded-lg p-1 hover:bg-gray-750 transition-colors">
                                        <JobCard item={item} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-800 rounded-lg p-8 text-center">
                                <p className="text-gray-400 text-lg">
                                    No job openings available at the moment
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Check back later for new opportunities
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;