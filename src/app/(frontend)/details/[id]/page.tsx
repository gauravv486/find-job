//@ts-nocheck
import React from 'react';
import { MapPin, Building2, Clock, ExternalLink, Briefcase } from 'lucide-react';
import JobApplyButton from '@/components/user/JobApplyButton';
import JobApplications from '@/components/user/JobApplications';

const DetailPage = async ({ params }) => {

  const id = params.id;
  let item;
  try {
    const res = await fetch(`http://localhost:3000/api/jobs/${id}`);
    const data = await res.json();
    console.log(data)
    item = data;
  } catch (error) {
    console.log(error.message);
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-8 text-center max-w-md w-full">
          <div className="text-red-400 mb-4">
            <Briefcase size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-gray-400 mb-4">
            The job you're looking for doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-6 px-4">
      <div className="max-w-4xl mx-auto min-h-screen flex flex-col">
        {/* Header Card */}
        <div className="bg-gray-700/20  rounded-xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gray-700/20 p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className=" rounded-lg p-3 shadow-xl flex-shrink-0">
                <img
                  src={item.employerLogo}
                  alt={`${item.employerName} logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <div className="flex-1 text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight text-white">
                  {item.jobTitle}
                </h1>
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={18} className="text-blue-400" />
                  <a
                    href={item.employerWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.employerName}
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-green-400" />
                    <span>{item.jobCountry}</span>
                  </div>

                  <div>
                    <JobApplications item={item}/>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Flex grow to fill remaining space */}
        <div className="bg-gray-700/20   rounded-xl shadow-2xl p-6 sm:p-8 flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-400" />
              Job Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {item.jobDescription}
              </p>
              <div className="mt-4 text-sm text-gray-400 leading-relaxed space-y-2">
                <p><strong>{item.employerName}</strong> is a well-established and respected organization in the industry. With a strong focus on delivering excellence and innovation, it has consistently pushed the boundaries of what's possible.</p>
                <p>Over the years, <strong>{item.employerName}</strong> has built a reputation for cultivating a culture of collaboration, continuous learning, and cutting-edge thinking.</p>
                <p>In its latest opening for the role of <strong>{item.jobTitle}</strong>, the company seeks individuals who are passionate, goal-oriented, and capable of thriving in a fast-paced work environment.</p>
                <p>The team at <strong>{item.employerName}</strong> takes pride in building impactful products and services that positively influence customers worldwide.</p>
                <p>With global operations and a focus on both remote and on-site collaboration, the company continues to adapt to modern workforce expectations.</p>
                <p>Located in <strong>{item.jobCountry}</strong>, this role is perfect for someone who values flexibility, creativity, and meaningful work.</p>
                <p>Employees at <strong>{item.employerName}</strong> enjoy structured career development plans, wellness benefits, and access to industry-leading resources.</p>
                <p>Whether you're an experienced professional or a talented newcomer, <strong>{item.employerName}</strong> encourages a work environment that supports individuality and innovation.</p>
                <p>Its mission is not just to hire, but to empower – equipping its teams with tools, mentorship, and autonomy to drive success from day one.</p>
                <p>Join <strong>{item.employerName}</strong> and become part of a forward-thinking company that is helping redefine the future of work.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="border-t border-gray-800 pt-6 mt-auto">
            <div className="flex justify-center">
              {/* <a
                href={item.jobApplyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-400 hover:bg-blue-300 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl border border-blue-500"
              >
                Apply Now
                <ExternalLink size={16} className="ml-2" />
              </a> */}
              <JobApplyButton item={item}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;