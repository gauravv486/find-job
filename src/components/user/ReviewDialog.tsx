//@ts-nocheck
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function ReviewDialog({ userId, companyId }: { userId: string, companyId: string }) {

  const [open, setOpen] = useState(false);
  const [review, setReview] = useState({
    user_id: userId,
    company_id: companyId,
    comment: "",
    rating: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3000/api/addreview', {
      method: "POST",
      body: JSON.stringify(review)
    })
    const data = await res.json();
    console.log(data);

    if (data.success) {
      alert("Review submitted successfully!");
      setReview({
        user_id: userId,
        company_id: companyId,
        comment: '',
        rating: ''
      });
      setOpen(false);

    } else {
      alert("Error: Something went wrong.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Leave a Review
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/80 fixed inset-0 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-w-md w-full translate-x-[-50%] translate-y-[-50%] bg-[#121212] text-white p-6 rounded-xl shadow-2xl border border-gray-700">
          <Dialog.Title className="text-xl font-semibold mb-4 text-white">
            Leave a Review
          </Dialog.Title>

          <div className="flex flex-col gap-4">
            <label className="text-sm">
              Comment:
              <textarea
                name="comment"
                value={review.comment}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded bg-[#1e1e1e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Write your thoughts..."
              />
            </label>

            <label className="text-sm">
              Rating (1-5):
              <input
                type="text"
                name="rating"
                value={review.rating}
                onChange={handleChange}
                className="mt-1 p-2 w-full rounded bg-[#1e1e1e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Give a rating from 1 to 5"
              />
            </label>
          </div>

          <div className="flex justify-end mt-5 gap-3">
            <Dialog.Close asChild>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
            >
              Submit
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
