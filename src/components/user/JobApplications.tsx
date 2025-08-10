//@ts-nocheck
'use client'
import { userContext } from '@/context/User';
import React, { useContext, useState } from 'react'

const JobApplications = ({ item }) => {

  const {user} = useContext(userContext);
  const id = item.id;
  const [applications, setapplications] = useState([]);
  const [isclick, setisclick] = useState(false);

  async function handleclick() {
    setisclick(true);
    try {
      const res = await fetch('/api/jobs/jobapplications/' + id);
      const data = await res.json();
      if (data.success) {
        setapplications(data.applications);
      } else {
        alert(data.message)
      }
    } catch (err) {
      alert("error in fetching api")
    }
  }

  if(user?.email != item?.Company?.user?.email){
    return null;
  }

  return (
    <div>
      <button onClick={handleclick}>Applicants</button>
      {
        isclick && (applications?.map((item, index) => {
          return (
            <div key={index}>
              {item.user.email}
            </div>
          )
        }))
      }
    </div>
  )
}

export default JobApplications
