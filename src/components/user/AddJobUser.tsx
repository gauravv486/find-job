//@ts-nocheck
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // replace with your own Button or Radix's


const AddJobUser = ({companyId}) => {

	const [open, setOpen] = useState(false);

	// console.log(id);

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
		companyId: companyId,
	});

	function handleInputChange(e: any) {
		const { name, value } = e.target;
		setJob((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSubmit(e: any) {
		e.preventDefault();

		try {
			const res = await fetch("/api/jobs", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(job),
			});

			const data = await res.json();

			if (data.success) {
				alert("Job posted successfully");
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
					jobLocation: "",
					companyId: "",
				});
				setOpen(false); 
			} else {
				alert("Something went wrong: " + data.message);
			}
		} catch (error) {
			console.error("Failed to post job:", error);
			alert("An error occurred while posting the job.");
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button variant="default">Add Job</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 p-6 z-50 border border-gray-800 shadow-lg overflow-y-auto max-h-[90vh]">
					<div className="flex items-center justify-between mb-4">
						<Dialog.Title className="text-xl font-bold text-white">Post New Job</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-400 hover:text-white transition">
								<Cross2Icon />
							</button>
						</Dialog.Close>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Repeat the input fields like before */}
							{[
								{ label: "Job Title *", name: "jobTitle", placeholder: "e.g. Senior Developer", required: true },
								{ label: "Company Name *", name: "employerName", placeholder: "e.g. Google", required: true },
								{ label: "Job Location *", name: "jobLocation", placeholder: "e.g. Remote", required: true },
								{ label: "Job Country", name: "jobCountry", placeholder: "e.g. India" },
								{ label: "Minimum Salary", name: "minSalary", placeholder: "e.g. 50000", type: "number" },
								{ label: "Apply Link", name: "jobApplyLink", placeholder: "https://company.com/apply" },
								{ label: "Logo URL", name: "employerLogo", placeholder: "https://company.com/logo.png" },
								{ label: "Company Website", name: "employerWebsite", placeholder: "https://company.com" },
							].map(({ label, name, placeholder, required, type = "text" }) => (
								<div key={name}>
									<label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
									<input
										type={type}
										name={name}
										value={(job as any)[name]}
										onChange={handleInputChange}
										placeholder={placeholder}
										required={required}
										className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded outline-none placeholder-gray-500"
									/>
								</div>
							))}
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-1">Job Description</label>
							<textarea
								name="jobDescription"
								value={job.jobDescription}
								onChange={handleInputChange}
								rows={5}
								className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded outline-none placeholder-gray-500"
								placeholder="Write full job details..."
							/>
						</div>

						<div className="flex justify-end gap-3">
							<Dialog.Close asChild>
								<Button variant="ghost">Cancel</Button>
							</Dialog.Close>
							<Button type="submit">Post Job</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AddJobUser;
