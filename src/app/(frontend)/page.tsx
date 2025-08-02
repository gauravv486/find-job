//@ts-nocheck
import Header from "@/components/Header";
import JobCard from "@/components/JobCard";


export default async function Home() {

  const res = await fetch('http://localhost:3000/api/jobs');
  let data = await res.json();
  data = data?.data;
  // console.log(data)

  return (
    <div className="">
      <Header/>
      <main className="flex flex-wrap gap-4 justify-center mt-15">
        {
          data?.map((item) => {
            return (
              <div key={item.jobId}>
                <JobCard item={item} />
              </div>
            )
          })
        }
      </main>

    </div>
  );
}

