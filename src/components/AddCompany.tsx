import React, { useState } from 'react'

const AddCompany = () => {
  const [company, setCompany] = useState({
    name: "",
    ownerId: "",
    logo: "",
    website: "",
  });

  function handlechange(e: any) {
    const { name, value } = e.target;
    setCompany(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/addcompany', {
      method: "POST",
      body: JSON.stringify(company)
    })

    const result = await res.json();
    if (result.success) {
      alert("Company Created successfully");
    } else {
      alert(result.message)
    }
  }

  return (
    <div className=" bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-700/20 rounded-2xl shadow-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Add Company</h1>
            <p className="text-gray-400">Create a new company profile</p>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Company Name
              </label>
              <input 
                type="text" 
                placeholder="Enter company name" 
                name="name" 
                value={company.name} 
                onChange={(e) => { handlechange(e) }}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 hover:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Logo URL
              </label>
              <input 
                type="text" 
                placeholder="https://example.com/logo.png" 
                name="logo" 
                value={company.logo} 
                onChange={(e) => { handlechange(e) }}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 hover:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">
                Website
              </label>
              <input 
                type="text" 
                placeholder="https://company-website.com" 
                name="website" 
                value={company.website} 
                onChange={(e) => { handlechange(e) }}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200 hover:border-gray-600"
              />
            </div>

            <button 
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-black transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-gray-700"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Company</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCompany