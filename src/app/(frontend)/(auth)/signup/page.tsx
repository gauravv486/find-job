'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

const signupPage = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("");

    const router = useRouter();

    const obj = {
        email,
        password,
        role : 'user'
    } 

    async function handlesubmit(e: FormEvent) {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const data = await response.json();
        if(data.success){
            router.push('/login');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join us today and get started</p>
                    </div>

                    <form onSubmit={handlesubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                placeholder='Enter your email' 
                                value={email} 
                                onChange={(e) => { setemail(e.target.value) }}
                                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input 
                                type="password" 
                                placeholder='Create a password' 
                                value={password} 
                                onChange={(e) => { setpassword(e.target.value) }}
                                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                                required
                            />
                        </div>

                        {/* Role Selection */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Select Role
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="user"
                                        checked={role === 'user'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-gray-700 font-medium">User</span>
                                    <span className="ml-auto text-sm text-gray-500">Standard access</span>
                                </label>
                                
                                <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="admin"
                                        checked={role === 'admin'}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-gray-700 font-medium">Admin</span>
                                    <span className="ml-auto text-sm text-gray-500">Full access</span>
                                </label>
                            </div>
                        </div> */}

                        {/* Submit Button */}
                        <button 
                            type='submit'
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transform hover:scale-[1.02] transition duration-200 shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account? 
                            <Link href={'/login'} className="ml-1 text-blue-600 hover:text-blue-700 font-semibold hover:underline transition duration-200">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default signupPage