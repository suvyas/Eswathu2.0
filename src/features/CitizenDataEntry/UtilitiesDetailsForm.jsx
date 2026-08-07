import { useState } from 'react';

export default function UtilitiesDetailsForm() {
  const [bescomNumber, setBescomNumber] = useState('');
  const [bwssbNumber, setBwssbNumber] = useState('');

  return (
    <div className="bg-white border-t-[3px] border-b-[3px] border-blue-400 py-4 px-4 mt-6">
      <div className="text-[13px] font-bold text-gray-800 mb-4 border-b border-gray-200 pb-1">
        Utilities & Connections
      </div>
      
      <div className="flex flex-col gap-6 text-[12px] text-gray-700">
        
        {/* BESCOM */}
        <div className="flex items-center gap-4">
          <span className="w-48 font-medium">BESCOM RR No / Account ID:</span>
          <input 
            type="text" 
            className="border border-gray-300 p-1.5 w-64 focus:outline-none"
            value={bescomNumber}
            onChange={(e) => setBescomNumber(e.target.value)}
            placeholder="Enter 10 digit Account ID"
          />
          <button className="bg-[#28A745] text-white px-4 py-1.5 rounded text-xs hover:bg-green-600">
            Verify and Add BESCOM
          </button>
        </div>

        {/* BWSSB */}
        <div className="flex items-center gap-4">
          <span className="w-48 font-medium">BWSSB Connection ID:</span>
          <input 
            type="text" 
            className="border border-gray-300 p-1.5 w-64 focus:outline-none"
            value={bwssbNumber}
            onChange={(e) => setBwssbNumber(e.target.value)}
          />
          <button className="bg-[#28A745] text-white px-4 py-1.5 rounded text-xs hover:bg-green-600">
            Verify and Add BWSSB
          </button>
        </div>

      </div>
    </div>
  );
}
