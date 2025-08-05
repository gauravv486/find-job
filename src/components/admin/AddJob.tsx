"use client"
import React, { useState } from 'react'

const AddJob = () => {

    const [job, setJob] = useState({
        jobId: "",
        jobTitle: "",
        employerName: "",
        employerLogo: "",
        employerWebsite: "",
        jobApplyLink: "",
        jobDescription: "",
        jobCountry: "",
        minSalary: "",
        jobLocation: "",
    })

    function handleInputChange(e: any) {
        const { name, value } = e.target;
        setJob(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        // NOTE: The user's original fetch logic is preserved.
        // In a real application, you would replace the alert with a proper notification/toast component.
        try {
            const res = await fetch('/api/jobs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(job),
            });

            const data = await res.json();

            if (data.success) {
                alert('Job posted successfully'); // Placeholder for success notification
                setJob({
                    jobId: "",
                    jobTitle: "",
                    employerName: "",
                    employerLogo: "",
                    employerWebsite: "",
                    jobApplyLink: "",
                    jobDescription: "",
                    jobCountry: "",
                    minSalary: "",
                    jobLocation: ""
                });
            } else {
                alert('Something went wrong: ' + data.message); // Placeholder for error notification
            }
        } catch (error) {
            console.error("Failed to post job:", error);
            alert('An error occurred while posting the job.'); // Placeholder for network/server error
        }
    }

    return (
        <div className="bg-black rounded-lg shadow-md">
            {/* Form Header */}
            <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold text-white">Post New Job</h2>
                <p className="text-sm text-gray-400 mt-1">Fill in the details to create a new job posting</p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit}>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                name="jobTitle"
                                value={job.jobTitle}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="e.g. Senior Frontend Developer"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company Name *
                            </label>
                            <input
                                type="text"
                                name="employerName"
                                value={job.employerName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="e.g. Tech Solutions Inc."
                                required
                            />
                        </div>

                        {/* Job Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Job Location *
                            </label>
                            <input
                                type="text"
                                name="jobLocation"
                                value={job.jobLocation}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="e.g. San Francisco, CA"
                                required
                            />
                        </div>

                        {/* Job Country */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Job Country
                            </label>
                            <input
                                type="text"
                                name="jobCountry"
                                value={job.jobCountry}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="e.g. United States"
                            />
                        </div>

                        {/* Minimum Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Minimum Salary (USD)
                            </label>
                            <input
                                type="number"
                                name="minSalary"
                                value={job.minSalary}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="e.g. 80000"
                            />
                        </div>

                        {/* Job Apply Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Job Apply Link
                            </label>
                            <input
                                type="url"
                                name="jobApplyLink"
                                value={job.jobApplyLink}
                                onChange={handleInputChange}
                               className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="https://company.com/apply"
                            />
                        </div>

                        {/* Employer Logo URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Employer Logo URL
                            </label>
                            <input
                                type="url"
                                name="employerLogo"
                                value={job.employerLogo}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="https://company.com/logo.png"
                            />
                        </div>

                        {/* Company Website */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company Website
                            </label>
                            <input
                                type="url"
                                name="employerWebsite"
                                value={job.employerWebsite}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                                placeholder="https://company.com"
                            />
                        </div>
                    </div>

                    {/* Job Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Description
                        </label>
                        <textarea
                            name="jobDescription"
                            value={job.jobDescription}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-3 py-2 bg-gray-700/20 border text-white rounded-md  placeholder-gray-500 outline-none"
                            placeholder="Provide a detailed description of the job role, responsibilities, and requirements..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type='submit'
                            className="bg-white hover:bg-gray-200 text-black font-medium px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200"
                        >
                            Post Job
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddJob;
