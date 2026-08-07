import { useState } from 'react';
import { Search, Map, Hash, FileText, CheckCircle2, Circle, Trash2 } from 'lucide-react';

export default function SurveyDetailsForm() {
  const [gram, setGram] = useState('ಕರಡಹಳ್ಳಿ - 625035');
  const [surveyNo, setSurveyNo] = useState('12');
  const [surnocHissa, setSurnocHissa] = useState('* - 1');
  const [rtcMatchStatus, setRtcMatchStatus] = useState('not_available');
  
  // Manual entry fields (visible when not_available is selected)
  const [manualSurveyNo, setManualSurveyNo] = useState('12');
  const [manualSurnoc, setManualSurnoc] = useState('');
  const [manualHissa, setManualHissa] = useState('');

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">
      
      {/* -------------------- SEARCH SECTION -------------------- */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Survey Registration Details</h3>
        
        <div className="flex flex-col gap-6">
          
          {/* Row 1: Gram and Survey Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">ಗ್ರಾಮ (Village) <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select 
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-l-lg text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none"
                  value={gram}
                  onChange={(e) => setGram(e.target.value)}
                >
                  <option value="ಕರಡಹಳ್ಳಿ - 625035">ಕರಡಹಳ್ಳಿ - 625035</option>
                </select>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Survey No"
                    className="w-32 pl-9 pr-4 py-2.5 bg-white border-y border-r border-gray-300 text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
                    value={surveyNo}
                    onChange={(e) => setSurveyNo(e.target.value)}
                  />
                </div>
                <button className="px-5 py-2.5 bg-[#0052CC] text-white rounded-r-lg text-[13px] font-bold hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
                  <Search size={14} /> Search
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Surnoc and Hissa No <span className="text-red-500">*</span></label>
              <div className="relative flex">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select 
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-l-lg text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none"
                  value={surnocHissa}
                  onChange={(e) => setSurnocHissa(e.target.value)}
                >
                  <option value="* - 1">* - 1</option>
                </select>
                <button className="px-5 py-2.5 bg-[#0052CC] text-white rounded-r-lg text-[13px] font-bold hover:bg-blue-700 transition shadow-sm whitespace-nowrap">
                  Get Owner Details
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Radio Buttons */}
          <div className="flex flex-col gap-3 mt-2 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rtcStatus" 
                value="matched" 
                checked={rtcMatchStatus === 'matched'}
                onChange={(e) => setRtcMatchStatus(e.target.value)}
                className="hidden"
              />
              {rtcMatchStatus === 'matched' ? <CheckCircle2 className="text-[#0052CC] w-5 h-5" /> : <Circle className="text-gray-400 w-5 h-5 group-hover:text-blue-300" />}
              <span className={`text-[13px] ${rtcMatchStatus === 'matched' ? 'text-[#0052CC] font-bold' : 'text-gray-600 font-medium'}`}>
                RTC Owner Matched with property owner
              </span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rtcStatus" 
                value="not_matched" 
                checked={rtcMatchStatus === 'not_matched'}
                onChange={(e) => setRtcMatchStatus(e.target.value)}
                className="hidden"
              />
              {rtcMatchStatus === 'not_matched' ? <CheckCircle2 className="text-[#0052CC] w-5 h-5" /> : <Circle className="text-gray-400 w-5 h-5 group-hover:text-blue-300" />}
              <span className={`text-[13px] ${rtcMatchStatus === 'not_matched' ? 'text-[#0052CC] font-bold' : 'text-gray-600 font-medium'}`}>
                RTC Owner Not Matched with property owner
              </span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="radio" 
                name="rtcStatus" 
                value="not_available" 
                checked={rtcMatchStatus === 'not_available'}
                onChange={(e) => setRtcMatchStatus(e.target.value)}
                className="hidden"
              />
              {rtcMatchStatus === 'not_available' ? <CheckCircle2 className="text-[#0052CC] w-5 h-5" /> : <Circle className="text-gray-400 w-5 h-5 group-hover:text-blue-300" />}
              <span className={`text-[13px] ${rtcMatchStatus === 'not_available' ? 'text-[#0052CC] font-bold' : 'text-gray-600 font-medium'}`}>
                Surnoc and Hissa number not available / RTC Owner not available
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* -------------------- MANUAL ENTRY (If not available selected) -------------------- */}
      {rtcMatchStatus === 'not_available' && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-2 relative">
          <div className="absolute -top-3 left-6 bg-[#0F172A] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">
            Manual Entry Required
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Survey No <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  className="w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
                  value={manualSurveyNo}
                  onChange={(e) => setManualSurveyNo(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Surnoc <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  className="w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
                  value={manualSurnoc}
                  onChange={(e) => setManualSurnoc(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Hissa No <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  className="w-full pl-9 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
                  value={manualHissa}
                  onChange={(e) => setManualHissa(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-6 py-2 bg-[#0052CC] text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">
              Save Details
            </button>
          </div>
        </div>
      )}

      {/* -------------------- GRID TABLE -------------------- */}
      <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden max-w-sm">
        <table className="w-full text-center text-[13px] text-gray-700">
          <thead className="bg-[#F8FAFC] border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 font-bold text-gray-900 text-left">ಸರ್ವೆ ನಂಬರ್</th>
              <th className="py-3 px-4 font-bold text-gray-900 w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-medium text-left">232 / /</td>
              <td className="py-3 px-4 flex justify-center">
                <button className="text-red-500 hover:text-red-700 transition-colors p-1.5 hover:bg-red-50 rounded-full">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
