//@ts-nocheck
'use client'
import { Item } from '@radix-ui/themes/components/checkbox-cards';
import React from 'react'

const JobApplyButton = ({item}) => {

   async function handlesubmit() {
        try{
            const res = await fetch('/api/jobs/apply/'+ item?.id);
            const data = await res.json();
            if(data.success){
                alert("Applied Successfully");
            }
            else{
                alert(data.message)
            }
        }catch(err){
            alert("something went wrong on clinet side api fetching")
        }
   }

  return (
    <div>
        <button onClick={handlesubmit}>
            Apply
        </button> 
    </div>
  )
}

export default JobApplyButton
