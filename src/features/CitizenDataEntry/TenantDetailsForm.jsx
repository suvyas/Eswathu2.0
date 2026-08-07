import { useState } from 'react';

export default function TenantDetailsForm() {
  const [tenantName, setTenantName] = useState('');
  const [tenantMobile, setTenantMobile] = useState('');
  
  return (
    <div className="bg-white border-t-[3px] border-b-[3px] border-blue-400 py-4 px-4 mt-6">
      <div className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
        Tenant / Lease Details (If Applicable)
      </div>
      
      <div className="flex gap-8 mb-4 text-[12px] text-gray-700">
        <div className="flex flex-col gap-1 w-1/3">
          <label>Tenant Name:<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            className="border border-gray-300 p-1.5 focus:outline-none" 
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Tenant Father Name:<span className="text-red-500">*</span></label>
          <input type="text" className="border border-gray-300 p-1.5 focus:outline-none" />
        </div>
        <div className="flex flex-col gap-1 w-1/3">
          <label>Tenant Mobile Number:<span className="text-red-500">*</span></label>
          <input 
            type="text" 
            className="border border-gray-300 p-1.5 focus:outline-none"
            value={tenantMobile}
            onChange={(e) => setTenantMobile(e.target.value)}
          />
        </div>
      </div>
      
      <button className="bg-[#0066FF] text-white px-5 py-1.5 rounded text-xs hover:bg-blue-600 mb-4">
        Save Tenant Details
      </button>

      <table className="w-full text-left text-[12px] text-gray-800 border border-gray-200">
        <thead className="bg-[#F8F9FA] border-b border-gray-200">
          <tr>
            <th className="p-2 border-r border-gray-200 w-12 text-center">Sl No.</th>
            <th className="p-2 border-r border-gray-200">Tenant Name</th>
            <th className="p-2 border-r border-gray-200">Mobile Number</th>
            <th className="p-2 text-center w-20">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4" className="p-3 text-center text-gray-500 bg-gray-50 italic">
              No Tenant data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
