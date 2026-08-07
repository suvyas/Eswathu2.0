import { useState, useEffect } from 'react';
import { Compass, Ruler, Calculator, Edit2, CheckCircle2, Circle } from 'lucide-react';

export default function PropertyUseDetailsForm() {
  const [isScheduleEditing, setIsScheduleEditing] = useState(false);
  const [isDimensionsEditing, setIsDimensionsEditing] = useState(false);

  // Schedule State
  const [schedule, setSchedule] = useState({
    east: 'adsas',
    west: 'asd',
    north: 'asd',
    south: 'asd',
  });

  // Dimensions State
  const [hasOddDimensions, setHasOddDimensions] = useState('No');
  
  // Regular Dimensions
  const [nsMeters, setNsMeters] = useState(23);
  const [ewMeters, setEwMeters] = useState(32);
  
  // Odd Dimensions
  const [noOfSides, setNoOfSides] = useState(4);
  const [roadFacing, setRoadFacing] = useState('');
  const [side2, setSide2] = useState('');
  const [side3, setSide3] = useState('');
  const [side4, setSide4] = useState('');
  const [manualAreaSqM, setManualAreaSqM] = useState('');

  // Calculated Areas for Regular Dimensions
  const [areaSqM, setAreaSqM] = useState(0);
  const [areaSqFt, setAreaSqFt] = useState(0);

  // Calculated Area for Odd Dimensions
  const [manualAreaSqFt, setManualAreaSqFt] = useState('');

  // Effect to auto-calculate area when normal dimensions change
  useEffect(() => {
    let calculatedSqM = 0;

    if (hasOddDimensions === 'No') {
      const ns = parseFloat(nsMeters) || 0;
      const ew = parseFloat(ewMeters) || 0;
      calculatedSqM = ns * ew;
      setAreaSqM(calculatedSqM.toFixed(2));
      setAreaSqFt((calculatedSqM * 10.7639).toFixed(2));
    }
  }, [nsMeters, ewMeters, hasOddDimensions]);

  // Effect to auto-calculate square feet when manual square meters is entered for Odd Dimensions
  useEffect(() => {
    if (hasOddDimensions === 'Yes') {
      const sqM = parseFloat(manualAreaSqM) || 0;
      setManualAreaSqFt((sqM * 10.7639).toFixed(2));
    }
  }, [manualAreaSqM, hasOddDimensions]);

  const scheduleInputClass = isScheduleEditing 
    ? "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all text-gray-800" 
    : "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 cursor-not-allowed outline-none";

  const dimensionInputClass = isDimensionsEditing 
    ? "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all text-gray-800" 
    : "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 cursor-not-allowed outline-none";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-8">
      
      {/* -------------------- HEADER -------------------- */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-1">Property Use Details</h3>
        <p className="text-[13px] text-gray-500">Provide boundary details and physical dimensions of the property.</p>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      {/* -------------------- SCHEDULE OF PROPERTY -------------------- */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[14px] font-bold text-gray-800">Schedule Of The Property</h4>
          <button 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isScheduleEditing ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-50 text-[#0052CC] border border-blue-200 hover:bg-blue-100'}`}
            onClick={(e) => { e.preventDefault(); setIsScheduleEditing(!isScheduleEditing); }}
          >
            {isScheduleEditing ? "Lock" : <><Edit2 size={12}/> Edit Details</>}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:items-start">
          <div className="w-full md:w-1/4 text-[13px] font-medium text-gray-700 mt-2">
            Check bandi as per KAVERI :
          </div>
          
          <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">East <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className={scheduleInputClass} 
                value={schedule.east}
                onChange={(e) => setSchedule({...schedule, east: e.target.value})}
                readOnly={!isScheduleEditing}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">West <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className={scheduleInputClass} 
                value={schedule.west}
                onChange={(e) => setSchedule({...schedule, west: e.target.value})}
                readOnly={!isScheduleEditing}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">North <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className={scheduleInputClass} 
                value={schedule.north}
                onChange={(e) => setSchedule({...schedule, north: e.target.value})}
                readOnly={!isScheduleEditing}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">South <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                className={scheduleInputClass} 
                value={schedule.south}
                onChange={(e) => setSchedule({...schedule, south: e.target.value})}
                readOnly={!isScheduleEditing}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      {/* -------------------- PROPERTY DIMENSIONS -------------------- */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-[14px] font-bold text-gray-800">Property Dimensions</h4>
          <button 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${isDimensionsEditing ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-50 text-[#0052CC] border border-blue-200 hover:bg-blue-100'}`}
            onClick={(e) => { e.preventDefault(); setIsDimensionsEditing(!isDimensionsEditing); }}
          >
            {isDimensionsEditing ? "Lock" : <><Edit2 size={12}/> Edit Details</>}
          </button>
        </div>
        
        <div className="flex items-center gap-6 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="text-[13px] font-medium text-gray-700">Site has Odd Dimensions?</div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="hasOddDimensions" 
                value="Yes" 
                checked={hasOddDimensions === 'Yes'}
                onChange={(e) => isDimensionsEditing && setHasOddDimensions(e.target.value)}
                disabled={!isDimensionsEditing}
                className="hidden"
              />
              {hasOddDimensions === 'Yes' ? <CheckCircle2 className="text-[#0052CC] w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4 group-hover:text-blue-300" />}
              <span className={`text-[13px] ${hasOddDimensions === 'Yes' ? 'text-[#0052CC] font-bold' : 'text-gray-600'}`}>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="radio" 
                name="hasOddDimensions" 
                value="No" 
                checked={hasOddDimensions === 'No'}
                onChange={(e) => isDimensionsEditing && setHasOddDimensions(e.target.value)}
                disabled={!isDimensionsEditing}
                className="hidden"
              />
              {hasOddDimensions === 'No' ? <CheckCircle2 className="text-[#0052CC] w-4 h-4" /> : <Circle className="text-gray-400 w-4 h-4 group-hover:text-blue-300" />}
              <span className={`text-[13px] ${hasOddDimensions === 'No' ? 'text-[#0052CC] font-bold' : 'text-gray-600'}`}>No</span>
            </label>
          </div>
        </div>

        {hasOddDimensions === 'No' ? (
          /* Normal Dimensions (N-S * E-W) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">N-S (Meters) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                className={dimensionInputClass} 
                value={nsMeters}
                onChange={(e) => setNsMeters(e.target.value)}
                readOnly={!isDimensionsEditing}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-[#334155]">E-W (Meters) <span className="text-red-500">*</span></label>
              <input 
                type="number" 
                className={dimensionInputClass} 
                value={ewMeters}
                onChange={(e) => setEwMeters(e.target.value)}
                readOnly={!isDimensionsEditing}
              />
            </div>
            
            {/* Auto-calculated outputs */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500">PLOT AREA (SquareMeter)</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 outline-none font-bold" value={areaSqM} readOnly />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-bold text-gray-500">PLOT AREA (SquareFeet)</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 outline-none font-bold" value={areaSqFt} readOnly />
            </div>
          </div>
        ) : (
          /* Odd Dimensions */
          <div className="flex flex-col gap-6">
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-[13px] font-bold text-[#0052CC]">Existing Data As Per Digitization</div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-gray-600">Sq. Feet:</span>
                  <input type="text" className="w-24 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none" readOnly />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-gray-600">Sq. Meter:</span>
                  <input type="text" className="w-24 px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm focus:outline-none" readOnly />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[13px] text-gray-700 max-w-sm">
              <label className="font-bold text-[#334155] w-24">No Of Sides :</label>
              <select 
                className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none"
                value={noOfSides}
                onChange={(e) => setNoOfSides(e.target.value)}
                disabled={!isDimensionsEditing}
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
              {/* Sides Inputs */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Road facing side length (m) <span className="text-red-500">*</span></label>
                  <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 outline-none text-[13px]" value={roadFacing} onChange={(e) => setRoadFacing(e.target.value)} readOnly={!isDimensionsEditing} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Side 2 (m) <span className="text-red-500">*</span></label>
                  <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 outline-none text-[13px]" value={side2} onChange={(e) => setSide2(e.target.value)} readOnly={!isDimensionsEditing} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Side 3 (m) <span className="text-red-500">*</span></label>
                  <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 outline-none text-[13px]" value={side3} onChange={(e) => setSide3(e.target.value)} readOnly={!isDimensionsEditing} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Side 4 (m) <span className="text-red-500">*</span></label>
                  <input type="number" className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 outline-none text-[13px]" value={side4} onChange={(e) => setSide4(e.target.value)} readOnly={!isDimensionsEditing} />
                </div>
              </div>

              {/* Total Area Inputs */}
              <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 h-fit">
                <h5 className="text-[13px] font-bold text-gray-800 border-b border-gray-200 pb-2">Manual Area Entry</h5>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Total Site Area (Sq.Meter)</label>
                  <input 
                    type="number" 
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052CC]/20 outline-none text-[13px]" 
                    value={manualAreaSqM} 
                    onChange={(e) => setManualAreaSqM(e.target.value)} 
                    readOnly={!isDimensionsEditing} 
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-[12px] font-medium text-gray-700">Total Site Area (Sq.Feet)</label>
                  <input 
                    type="text" 
                    className="w-32 px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg outline-none text-[13px] text-gray-600" 
                    value={manualAreaSqFt} 
                    readOnly 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
