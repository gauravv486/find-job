//@ts-nocheck
'use client'
import React, { useEffect, useState } from 'react';
import { Plus, Briefcase, MapPin, DollarSign, Calendar, Edit, Trash2, Eye, User } from 'lucide-react';
import AddJob from '@/components/admin/AddJob';
import JobCard from '@/components/JobCard';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('add');
    const [jobs, setJobs] = useState([]);
    const [users , setUsers] = useState([]);

    async function handlejob() {
        const res = await fetch('http://localhost:3000/api/jobs');
        const data = await res.json();
        const result = data.data;
        setJobs(result);
    }

    async function handleUser(){
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        const result = data.users;
        setUsers(result);
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="bg-black shadow-sm  ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <Briefcase className="h-8 w-8 text-gray-300 mr-3" />
                            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                        </div>
                        <div className="text-sm text-gray-400">
                            Job Management System
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="border-b border-gray-800">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('add')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'add'
                                ? 'border-gray-400 text-gray-300'
                                : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            <Plus className="h-4 w-4 inline mr-2" />
                            Add Job
                        </button>
                        <button
                            onClick={() => { setActiveTab('jobs'); handlejob() }}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'jobs'
                                ? 'border-gray-400 text-gray-300'
                                : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            <Briefcase className="h-4 w-4 inline mr-2" />
                            Jobs
                        </button>
                        <button
                            onClick={() => {setActiveTab('user') ; handleUser() }}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'user'
                                ? 'border-gray-400 text-gray-300'
                                : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'
                                }`}
                        >
                            <User className="h-4 w-4 inline mr-2" />
                            Manage User
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
                                jobs?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <JobCard item={item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }

                {
                    activeTab === 'user' && (
                        <div className='flex flex-col flex-wrap gap-2'>
                            {
                                users?.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <p className="text-gray-300">{item.email}</p>
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