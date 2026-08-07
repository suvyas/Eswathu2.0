import { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function AreaDetailsForm() {
  const [areaSqMtr, setAreaSqMtr] = useState('2334');
  
  // Auto-calculate square feet (1 sq mtr = 10.7639 sq ft)
  const areaSqFt = areaSqMtr ? (parseFloat(areaSqMtr) * 10.7639).toFixed(2) : '';

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left side label */}
        <div>
          <h3 className="text-base font-bold text-gray-900">Area Details</h3>
          <p className="text-[13px] text-gray-500">Confirm the total property area.</p>
        </div>

        {/* Right side inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#334155]">Area (Sq.Mtrs)</label>
            <input 
              type="number" 
              className="w-32 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
              value={areaSqMtr}
              onChange={(e) => setAreaSqMtr(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-gray-500">Area (Sq.Ft)</label>
            <input 
              type="text" 
              readOnly
              className="w-32 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 outline-none font-bold"
              value={areaSqFt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
