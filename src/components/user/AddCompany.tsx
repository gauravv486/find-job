'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // or use <button> directly

const AddCompany = ({ onSuccess }: { onSuccess?: () => void }) => {
	const [open, setOpen] = useState(false);
	const [company, setCompany] = useState({
		name: '',
		ownerId: '',
		logo: '',
		website: '',
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setCompany((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const res = await fetch('http://localhost:3000/api/addcompany', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(company),
		});

		const result = await res.json();
		if (result.success) {
			alert('Company Created Successfully');
			setOpen(false);
			onSuccess?.(); // refetch companies in parent
		} else {
			alert(result.message);
		}
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button>Add Company</Button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/60 z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-900 p-6 z-50 border border-gray-800 shadow-lg max-h-[90vh] overflow-y-auto">
					<div className="flex justify-between items-center mb-6">
						<Dialog.Title className="text-2xl font-bold text-white">Add Company</Dialog.Title>
						<Dialog.Close asChild>
							<button className="text-gray-400 hover:text-white transition">
								<Cross2Icon />
							</button>
						</Dialog.Close>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Company Name */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
							<input
								type="text"
								name="name"
								placeholder="Enter company name"
								value={company.name}
								onChange={handleChange}
								required
								className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600"
							/>
						</div>

						{/* Logo URL */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-1">Logo URL</label>
							<input
								type="text"
								name="logo"
								placeholder="https://example.com/logo.png"
								value={company.logo}
								onChange={handleChange}
								className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600"
							/>
						</div>

						{/* Website */}
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
							<input
								type="text"
								name="website"
								placeholder="https://company-website.com"
								value={company.website}
								onChange={handleChange}
								className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-600"
							/>
						</div>

						{/* Submit Button */}
						<div className="flex justify-end space-x-3">
							<Dialog.Close asChild>
								<Button variant="ghost">Cancel</Button>
							</Dialog.Close>
							<Button type="submit">Add Company</Button>
						</div>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};

export default AddCompany;
