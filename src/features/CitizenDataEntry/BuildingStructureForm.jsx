import { useState } from 'react';

export default function BuildingStructureForm() {
  return (
    <div className="bg-white border-t-[3px] border-b-[3px] border-blue-400 py-4 px-4 mt-6">
      <div className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
        Building Floor / Roof Details
      </div>
      
      <div className="flex gap-8 mb-4 text-[12px] text-gray-700">
        <div className="flex flex-col gap-1 w-1/3">
          <label>Floor Name:<span className="text-red-500">*</span></label>
          <select className="border border-gray-300 p-1.5 focus:outline-none bg-white">
            <option>--Select Floor--</option>
            <option>Ground Floor</option>
            <option>First Floor</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Roof Type:<span className="text-red-500">*</span></label>
          <select className="border border-gray-300 p-1.5 focus:outline-none bg-white">
            <option>--Select Roof--</option>
            <option>RCC Roof</option>
            <option>Sheet Roof</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Built-up Area (Sq.Ft):<span className="text-red-500">*</span></label>
          <input type="number" className="border border-gray-300 p-1.5 focus:outline-none" />
        </div>
      </div>
      
      <button className="bg-[#0066FF] text-white px-5 py-1.5 rounded text-xs hover:bg-blue-600 mb-4">
        Save Building Area Details
      </button>
    </div>
  );
}
