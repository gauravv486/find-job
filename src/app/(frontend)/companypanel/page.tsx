'use client'
import React, { useEffect, useState } from 'react';
import { Plus, Briefcase, MapPin, DollarSign, Calendar, Edit, Trash2, Eye } from 'lucide-react';
import AddJob from '@/components/admin/AddJob';
import JobCard from '@/components/JobCard';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('add');
    const [jobs, setJobs] = useState([]);


    
    async function handlejob() {
        const res = await fetch('http://localhost:3000/api/jobs');
        const data = await res.json();
        const result = data.data;
        setJobs(result);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <Briefcase className="h-8 w-8 text-blue-600 mr-3" />
                            <h1 className="text-2xl font-bold text-gray-900">Company Panel</h1>
                        </div>
                        <div className="text-sm text-gray-500">
                            Add Company and Post Jobs
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('add')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'add'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Plus className="h-4 w-4 inline mr-2" />
                            Add Company
                        </button>
                        <button
                            onClick={() => { setActiveTab('jobs'); handlejob() }}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'jobs'
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Briefcase className="h-4 w-4 inline mr-2" />
                            Your Jobs
                        </button>
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'add' && (
                    <AddJob />
                )}

                {
                    activeTab === 'jobs' && (
                        <div className='flex flex-wrap gap-2'>
                            {
                                jobs?.map((item , index)=>{
                                    return(
                                        <div key={index}>
                                            <JobCard item={item}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default AdminPanel;