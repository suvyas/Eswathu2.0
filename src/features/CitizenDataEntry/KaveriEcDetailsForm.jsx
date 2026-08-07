import { useState } from 'react';

export default function KaveriEcDetailsForm() {
  return (
    <div className="bg-white border-t-[3px] border-b-[3px] border-blue-400 py-4 px-4 mt-6 mb-12">
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-1">
        <div className="text-[13px] font-bold text-gray-800">
          Kaveri EC (Encumbrance Certificate) Details
        </div>
        <button className="bg-[#0066FF] text-white px-5 py-1.5 rounded text-xs hover:bg-blue-600">
          Fetch EC Details
        </button>
      </div>
      
      <table className="w-full text-left text-[12px] text-gray-800 border border-gray-200 mt-2">
        <thead className="bg-[#F8F9FA] border-b border-gray-200">
          <tr>
            <th className="p-2 border-r border-gray-200">Registration Number</th>
            <th className="p-2 border-r border-gray-200">Registration Date</th>
            <th className="p-2 border-r border-gray-200">Document Name</th>
            <th className="p-2 text-center w-24">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="p-4 text-center text-gray-500 bg-gray-50 italic">
              Click "Fetch EC Details" to retrieve Encumbrance Certificate data from Kaveri.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
