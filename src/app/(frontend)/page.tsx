import Header from "@/components/Header";
import JobCard from "@/components/JobCard";
import { Job } from "../../../generated/prisma";


export default async function Home() {
  const res = await fetch('http://localhost:3000/api/jobs');
  let data = await res.json();
  data = data?.data;
  return (
    <div className="bg-black min-h-screen">
      
      <Header />
      
      <div className="flex items-center justify-center min-h-[70vh]">
        {/* Centered Content */}
        <div className="text-center space-y-8 max-w-4xl px-6">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-100 leading-tight mb-6">
              Find Your <span className="text-gray-400">Dream</span>
              <br />
              <span className="text-gray-400">Job</span> Here Easy
              <br />
              And Fast
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
             Unlock career opportunities tailored to your skills and goals. Start your journey with a platform that makes job searching simple and effective.
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex flex-wrap gap-4 justify-center mt-15 pb-12">
        {
          data?.map((item: Job, index: number) => {
            return (
              <div key={index}>
                <JobCard item={item} />
              </div>
            )
          })
        }
      </main>
    </div>
  );
}