//@ts-nocheck
'use client'
import { Flex, Radio, RadioGroup, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const SearchFilter = () => {
    const [price, setprice] = useState(0);
    const [jobtype, setjobtype] = useState("");

    const searchParams = useSearchParams();
    const query = searchParams.get('query') || "";
    const router = useRouter();

    function handleFilter() {
        let url = `http://localhost:3000/search?query=${query}&minprice=${price}&jobtype=${jobtype}`;
        router.push(url);
    }

    function handlejobtype(value) {
        setjobtype(value);
    }

    return (
        <div className="bg-black fixed rounded-lg shadow-lg border border-gray-800 p-5 max-w-120 mx-auto m-8 ml-8 text-white">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-gray-700">
                Filters
            </h2>

            <div className="mb-6">
                <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-gray-300 mb-3"
                >
                    Minimum Salary:
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                        $
                    </span>
                    <input
                        id="price"
                        type="text"
                        placeholder="Enter minimum salary"
                        name="minprice"
                        value={price}
                        onChange={(e) => { setprice(Number(e.target.value)) }}
                        className="w-full pl-8 pr-2 py-2 text-white bg-[#1a1a1a] border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-200 placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="mb-4">
                <div className="text-sm font-semibold text-gray-300 mb-4">Work Location:</div>
                <RadioGroup.Root
                    value={jobtype}
                    onValueChange={handlejobtype}
                    className="space-y-3"
                >
                    <div className="flex items-center space-x-3 p-3 gap-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <RadioGroup.Item
                            value="remote"
                            className="h-5 w-5 rounded-full border-2 border-gray-600 flex items-center justify-center data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                        />
                        <span className="text-gray-200 font-medium">Remote</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 gap-3 rounded-lg hover:bg-gray-800 transition-colors">
                        <RadioGroup.Item
                            value="offline"
                            className="h-5 w-5 rounded-full border-2 border-gray-600 flex items-center justify-center data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                        />
                        <span className="text-gray-200 font-medium">Offline</span>
                    </div>
                </RadioGroup.Root>
            </div>

            <button
                onClick={handleFilter}
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
                Apply Filters
            </button>
        </div>
    )
}

export default SearchFilter
