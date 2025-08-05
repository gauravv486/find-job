import React from 'react';
import { Search, Code, Stethoscope, Megaphone, ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function JobifyLanding() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href={'/'}>
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black text-lg font-bold">J</span>
            </div>
          </Link>
          <Link href={'/'}>
            <span className="ml-2 text-xl font-bold text-white">obify</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href={'/'} className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href={'/'} className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href={'/'} className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href={'/'} className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href={'/'} className="text-gray-400 hover:text-gray-300 transition-colors">
            Home
          </Link>

         
        </nav>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition-colors">Post A Job</button>
          <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-center min-h-[70vh]">
          {/* Centered Content */}
          <div className="text-center space-y-8 max-w-4xl">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-300 leading-tight mb-6">
                Find Your <span className="text-green-300">Dream</span>
                <br />
                <span className="text-green-300">Job</span> Here Easy
                <br />
                And Fast
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum has been the industry's standard dummy
              </p>
            </div>

            {/* Search Form - Centered */}
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-xl shadow-lg max-w-3xl mx-auto">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search for Job Position"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none text-black placeholder-gray-500"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Select Location"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:outline-none text-black placeholder-gray-500"
                />
              </div>
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Popular Jobs Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Browse Popular Jobs</h2>
            <div className="flex space-x-2">
              <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Software Engineer */}
            <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-400/20">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-green-300 mb-2">Software Engineer</h3>
              <p className="text-gray-200 text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting...
              </p>
            </div>

            {/* Physician */}
            <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-400/20">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-green-300 mb-2">Software Engineer</h3>
              <p className="text-gray-200 text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting...
              </p>
            </div>

            {/* Marketing */}
            <div className="bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-400/30">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-green-300 mb-2">Software Engineer</h3>
              <p className="text-gray-200 text-sm">
                Lorem ipsum is simply dummy text of the printing and typesetting...
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}