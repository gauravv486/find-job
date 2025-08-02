//@ts-nocheck
import React from 'react';
import { MapPin, Building2, Clock, ExternalLink, Briefcase } from 'lucide-react';

const DetailPage = async ({ params }) => {

  const id = params.id;
  let item ;
  try{
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const data = await res.json();
    console.log(data)
    item = data ;
  }catch(error){
    console.log(error.message);
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
          <div className="text-red-500 mb-4">
            <Briefcase size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">
            The job you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="bg-white rounded-lg p-3 shadow-md flex-shrink-0">
                <img
                  src={item.employerLogo}
                  alt={`${item.employerName} logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                  {item.jobTitle}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} />
                  <a
                    href={item.employerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-white underline transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.employerName}
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-blue-100 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{item.jobCountry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{item.job_employment_type_text}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Briefcase size={20} />
              Job Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {item.jobDescription}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t pt-6">
            <div className="flex justify-center">
              <a
                href={item.jobApplyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Apply Now
                <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;