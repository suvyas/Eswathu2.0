import { useState } from 'react';

export default function SiteAmenitiesForm() {
  return (
    <div className="bg-white border-t-[3px] border-b-[3px] border-blue-400 py-4 px-4 mt-6">
      <div className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
        Site Sketch & Special Amenities
      </div>
      
      <div className="flex justify-between gap-8 text-[12px] text-gray-700">
        
        <div className="w-1/2 flex flex-col gap-2">
          <span className="font-medium">Upload Site Sketch Document:</span>
          <input type="file" className="border border-gray-300 p-1 w-full" />
          <button className="bg-[#0066FF] text-white px-4 py-1.5 rounded text-xs hover:bg-blue-600 w-fit mt-1">
            Save Site Sketch
          </button>
        </div>

        <div className="w-1/2 flex flex-col gap-2 border-l border-gray-200 pl-8">
          <span className="font-medium">Special Amenities Details:</span>
          <select className="border border-gray-300 p-1.5 focus:outline-none bg-white w-full">
            <option>--Select Amenity--</option>
            <option>Park / Garden</option>
            <option>Club House</option>
            <option>Swimming Pool</option>
          </select>
          <button className="bg-[#28A745] text-white px-4 py-1.5 rounded text-xs hover:bg-green-600 w-fit mt-1">
            Save Special Amenities Details
          </button>
        </div>

      </div>
    </div>
  );
}
