//@ts-nocheck
'use client'
import AddCompany from "@/components/AddCompany";
import { buttonPropDefs } from "@radix-ui/themes/props";
import { User, Building2, Globe, Image } from "lucide-react";
import { use, useEffect, useState } from "react"

const ProfilePage = () => {
    const [user, setuser] = useState({});
    const [isJobOrCompany, setisJobOrCompany] = useState("");

    useEffect(() => {
        async function getuser() {
            const res = await fetch('http://localhost:3000/api/curr-user');
            const data = await res.json();
            const result = data.user;
            setuser(result);
            let userCompany = result?.company || [];
            userCompany.length ? setisJobOrCompany('company') : setisJobOrCompany('nocompany');
        }
        getuser();
    }, [])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="border-b border-gray-700/10 bg-black">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-gray-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Profile</h1>
                            <p className="text-gray-400 mt-1">Manage your account and company information</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* User Information Section */}
                <div className="mb-8">
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <User className="w-6 h-6 text-gray-300" />
                            <h2 className="text-xl font-semibold text-white">User Information</h2>
                        </div>
                        <div className="bg-black rounded-lg p-4 border border-gray-800">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm text-gray-400">Email Address</p>
                                    <p className="text-white font-medium">{user.email || 'Loading...'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Section */}
                {isJobOrCompany === 'company' && (
                    <div className="mb-8">
                        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <Building2 className="w-6 h-6 text-gray-300" />
                                <h2 className="text-xl font-semibold text-white">My Company</h2>
                            </div>
                            <div className="grid gap-4">
                                {user.company?.map((item) => (
                                    <div key={item.id} className="bg-black rounded-xl border border-gray-800 p-6 hover:border-gray-700 transition-all duration-200">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
                                                    {item.logo ? (
                                                        <img src={item.logo} alt={item.name} className="w-8 h-8 rounded object-cover" />
                                                    ) : (
                                                        <Building2 className="w-6 h-6 text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                                    <p className="text-gray-400 text-sm">Company Profile</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {item.logo && (
                                                <div className="flex items-center space-x-3">
                                                    <Image className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Logo URL</p>
                                                        <p className="text-gray-300 text-sm break-all">{item.logo}</p>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {item.website && (
                                                <div className="flex items-center space-x-3">
                                                    <Globe className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Website</p>
                                                        <a 
                                                            href={item.website} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer"
                                                            className="text-gray-300 text-sm hover:text-white transition-colors duration-200 underline decoration-gray-600 hover:decoration-white"
                                                        >
                                                            {item.website}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Company Section */}
                {isJobOrCompany === 'nocompany' && (
                    <div>
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gray-900 border-2 border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building2 className="w-10 h-10 text-gray-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">No Company Found</h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                You haven't created a company profile yet. Create one to get started with managing your business information.
                            </p>
                        </div>
                        <AddCompany />
                    </div>
                )}

                {/* Loading State */}
                {!isJobOrCompany && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="w-12 h-12 border-2 border-gray-700 border-t-gray-400 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading profile...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage