//@ts-nocheck
'use client'
import AddCompany from "@/components/user/AddCompany";
import JobCard from "@/components/JobCard";
import AddJobUser from "@/components/user/AddJobUser";
import JobList from "@/components/user/JobList";
import { User, Building2, Globe, Image, Plus, Briefcase } from "lucide-react";
import { use, useEffect, useState } from "react"

const ProfilePage = () => {
    const [user, setuser] = useState({});
    const [company, setCompany] = useState({});
    const [isJobOrCompany, setisJobOrCompany] = useState("");

    useEffect(() => {
        async function getuser() {
            const res = await fetch('http://localhost:3000/api/curr-user');
            const data = await res.json();
            const result = data.user;
            setuser(result);
            let userCompany = result?.company || "";
            userCompany ? setisJobOrCompany('company') : setisJobOrCompany('nocompany');
        }
        getuser();
    }, [])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-light">Profile Dashboard</h1>
                            <p className="text-white/60 mt-1">Manage your profile and company</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8 min-h-[calc(100vh-200px)]">
                    
                    {/* Left Sidebar - User Profile & Company Cards */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        
                        {/* User Profile Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium">User Profile</h2>
                                    <p className="text-white/60 text-sm">Account Information</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="bg-black/30 rounded-xl p-4">
                                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-white">{user.email || 'Loading...'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Company Section */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5" />
                                    <h2 className="text-xl font-medium">Company</h2>
                                </div>
                                {isJobOrCompany === 'company' && (
                                    <div className="bg-black/30 rounded-xl p-1">
                                        <AddJobUser companyId={user.company?.id} />
                                    </div>
                                )}
                            </div>

                            {/* Company Card */}
                            {isJobOrCompany === 'company' && user.company && (
                                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                                            {user.company.logo ? (
                                                <img
                                                    src={user.company.logo}
                                                    alt={user.company.name}
                                                    className="w-8 h-8 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <Building2 className="w-6 h-6" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">{user.company.name}</h3>
                                            <p className="text-white/60 text-sm">Active Company</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {user.company.website && (
                                            <div className="bg-black/40 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Globe className="w-3 h-3 text-white/60" />
                                                    <p className="text-white/60 text-xs uppercase tracking-wider">Website</p>
                                                </div>
                                                <a
                                                    href={user.company.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white text-sm hover:text-white/80 transition-colors underline decoration-white/30"
                                                >
                                                    {user.company.website}
                                                </a>
                                            </div>
                                        )}
                                        
                                        {user.company.logo && (
                                            <div className="bg-black/40 rounded-lg p-3">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Image className="w-3 h-3 text-white/60" />
                                                    <p className="text-white/60 text-xs uppercase tracking-wider">Logo</p>
                                                </div>
                                                <p className="text-white/80 text-sm break-all">{user.company.logo}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* No Company State */}
                            {isJobOrCompany === 'nocompany' && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-white/40" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">No Company</h3>
                                    <p className="text-white/60 text-sm mb-6">Create your company to start posting jobs</p>
                                    <div className="bg-black/30 rounded-xl p-1 inline-block">
                                        <AddCompany />
                                    </div>
                                </div>
                            )}

                            {/* Loading State */}
                            {!isJobOrCompany && (
                                <div className="text-center py-8">
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-white/60 text-sm">Loading...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Main Content - Job List */}
                    <div className="col-span-12 lg:col-span-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <Briefcase className="w-5 h-5" />
                                <h2 className="text-xl font-medium">Job Listings</h2>
                            </div>

                            {/* Job List Content */}
                            {isJobOrCompany === 'company' ? (
                                <div className="h-full ">
                                    <JobList />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <Briefcase className="w-8 h-8 text-white/40" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">No Jobs Available</h3>
                                        <p className="text-white/60 text-sm">Create a company first to start posting jobs</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage