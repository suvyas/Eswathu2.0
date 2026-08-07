import { useState } from 'react';
import { FileText, Calendar, Hash, Upload, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function PropertyClassificationForm() {
  const [documentAvailable, setDocumentAvailable] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-6">
      
      {/* HEADER & READ-ONLY INPUT */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-bold text-[#334155]">Property Classification</label>
        <select disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-500 cursor-not-allowed appearance-none">
          <option>ನೋಂದಾಯಿತ ದಾಖಲಾತಿಗೆ ತಕ್ಕದಂತೆ ಪೋಡಿ/ಹಿಸ್ಸಾ ನಂಬರ್ ವರೆಗೆ ವೈಯಕ್ತಿಕ ಕುಟುಂಬದ ಆಸ್ತಿ(ದಕ್ಷಿಣ ಕನ್ನಡ ಮತ್ತು ಉಡುಪಿ ಜಿಲ್ಲೆ)(11A)</option>
        </select>
      </div>

      {/* DOCUMENT AVAILABLE RADIO */}
      <div className="flex items-center gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            checked={documentAvailable}
            onChange={() => setDocumentAvailable(true)}
            className="w-4 h-4 text-[#0052CC] border-gray-300 focus:ring-[#0052CC]"
          />
          <span className="text-[13px] font-bold text-[#0052CC] flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Document Available
          </span>
        </label>
      </div>

      {/* FORM INPUTS */}
      {documentAvailable && (
        <div className="flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Document Type <span className="text-red-500">*</span></label>
              <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none">
                <option>--ಆಯ್ಕೆಮಾಡಿ--</option>
                <option>ಸೇಲ್ ಡೀಡ್</option>
                <option>ವಿಲ್ / ಉಯಿಲು</option>
                <option>ದಾನ ಪತ್ರ</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Document Registered Date <span className="text-red-500">*</span></label>
              <input type="date" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Document Number <span className="text-red-500">*</span></label>
              <input type="text" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-[13px] focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all" placeholder="Enter doc number" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#334155]">Upload Document <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input type="file" accept=".pdf" className="w-full text-[13px] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#0052CC] hover:file:bg-blue-100 cursor-pointer" />
                </div>
              </div>
              <span className="text-red-500 text-[11px] font-medium">Only PDF allowed with a max size of 5 MB</span>
            </div>
          </div>

          <div>
            <button className="bg-[#0052CC] text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-sm">
              Save Document
            </button>
          </div>

        </div>
      )}

      {/* GRID TABLE */}
      <div className="mt-2 border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-[13px] text-gray-700">
          <thead className="bg-[#F8FAFC] border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 font-bold text-center w-16">Sl No.</th>
              <th className="px-4 py-3 font-bold">Document</th>
              <th className="px-4 py-3 font-bold w-40">Doc Number</th>
              <th className="px-4 py-3 font-bold w-40">Registered Date</th>
              <th className="px-4 py-3 font-bold w-32 text-center">Download</th>
              <th className="px-4 py-3 font-bold w-16 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-center font-medium">1</td>
              <td className="px-4 py-3 leading-relaxed">ಸೇಲ್ ಡೀಡ್/ ವಿತರಣಾ ಆಸ್ತಿ/ಆಸ್ತಿ ವಿಭಜನೆ/ ಗಿಫ್ಟ್ ಡೀಡ್/ ವಿಲ್/ ಹಕ್ಕು ಪತ್ರ/ ರಿಲೀಸ್ ಡೀಡ್/ ವರ್ಗಾವಣೆ/ ಸೆಟ್ಲಮೆಂಟ್/ ನ್ಯಾಯಾಲಯದ ಆದೇಶ/ ಒಟ್ಟು ಗುಂಪು/ ವಿಭಾಗ ಪತ್ರ / ಅದಲು ಬದಲು/ ಇತರೆ ಪತ್ರ/ನಮೂದಿಸಿ)</td>
              <td className="px-4 py-3">2323</td>
              <td className="px-4 py-3">05-08-2026</td>
              <td className="px-4 py-3">
                <div className="flex justify-center">
                  <button className="w-8 h-8 bg-blue-50 text-[#0052CC] rounded-full flex items-center justify-center hover:bg-[#0052CC] hover:text-white transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-center">
                  <button className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
