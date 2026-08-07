import { useState } from 'react';

export default function KaveriDetailsForm() {
  const [isRegisteredAfter2004, setIsRegisteredAfter2004] = useState('Yes');
  const [savedDeeds, setSavedDeeds] = useState([
    // Hardcoded data for demonstration
    {
      id: 1,
      documentType: 'ಸೇಲ್ ಡೀಡ್/ ಪಿತ್ರಾರ್ಜಿತ ಆಸ್ತಿ/ಆಸ್ತಿ ವಿಭಜನೆ/ ಗಿಫ್ಟ್ ಡೀಡ್/ ವಿಲ್/ ಹಕ್ಕು ಪತ್ರ/ ರಿಲೀಸ್ ಡೀಡ್/ ವರ್ಗಾವಣೆ/ ಸೆಟ್ಲಮೆಂಟ್/ ನ್ಯಾಯಾಲಯದ ಆದೇಶ/ ಒಟ್ಟು ಗೂಡಿಸು/ ವಿಭಾಗ ಪತ್ರ / ಅದಲು ಬದಲು/ ಇತರೆ ಪತ್ರ(ನಮೂದಿಸಿ)',
      registrationNo: '2323',
      date: '05-08-2026'
    }
  ]);

  return (
    <div className="w-full bg-white mt-6 border border-blue-400 p-1">
      {/* Header text */}
      <div className="text-sm text-gray-800 px-2 py-1">
        Property Registration Deed Data as per the Kaveri Application
      </div>
      <div className="text-sm text-gray-800 px-2 pb-2">
        If Property Registration happened after 01-04-2004, then enter Registration Number
      </div>

      {/* Warning message mock */}
      {isRegisteredAfter2004 === 'No' && savedDeeds.length > 0 && (
        <div className="text-sm text-red-500 px-2 pb-2">
          If you want to change the option Yes/No, please delete the existing records
        </div>
      )}

      {/* Radio Buttons */}
      <div className="flex flex-col gap-1 px-2 mb-4 text-sm text-gray-800">
        <label className="flex items-center gap-1 cursor-pointer">
          <input 
            type="radio" 
            name="registeredAfter2004" 
            value="Yes" 
            checked={isRegisteredAfter2004 === 'Yes'}
            onChange={(e) => setIsRegisteredAfter2004(e.target.value)}
            className="w-3.5 h-3.5"
          />
          Yes
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input 
            type="radio" 
            name="registeredAfter2004" 
            value="No" 
            checked={isRegisteredAfter2004 === 'No'}
            onChange={(e) => setIsRegisteredAfter2004(e.target.value)}
            className="w-3.5 h-3.5"
          />
          No
        </label>
      </div>

      {/* Conditional Forms */}
      {isRegisteredAfter2004 === 'Yes' ? (
        // STATE 1: Yes
        <div className="px-4 py-2 flex items-center gap-4 text-sm text-gray-800">
          <label className="whitespace-nowrap">Registration No: <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            placeholder="XXX-X-XXXXX-2004-05" 
            className="p-1 border border-gray-400 w-48 focus:outline-none"
          />
          <button className="bg-[#198754] text-white px-4 py-1.5 rounded text-sm hover:bg-green-700">
            Get Property Registration Document
          </button>
          
          <div className="ml-16 flex items-center gap-2">
            <span>View Sample</span>
            {/* Dummy image placeholder for View Sample */}
            <div className="w-16 h-10 border border-gray-300 bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
              Sample Image
            </div>
          </div>
        </div>
      ) : (
        // STATE 2: No
        <div className="border border-blue-400 m-2 p-4 text-sm text-gray-800">
          <div className="flex items-start gap-6">
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label className="w-32">Document Type <span className="text-red-500">*</span></label>
                <select className="border border-gray-300 p-1 w-64 focus:outline-none">
                  <option>-- ಆಯ್ಕೆಮಾಡಿ --</option>
                  <option>ಸೇಲ್ ಡೀಡ್ (Sale Deed)</option>
                  <option>ನ್ಯಾಯಾಲಯದ ಆದೇಶ (Court Order)</option>
                </select>
              </div>
              <div className="flex items-start gap-2">
                <label className="w-32 mt-1">Upload Document: <span className="text-red-500">*</span></label>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <input type="file" className="text-sm file:mr-2 file:py-1 file:px-2 file:border file:border-gray-400 file:bg-gray-100 file:rounded" />
                  </div>
                  <span className="text-red-500 mt-1">Only PDF allowed with a max<br/>size of 5 MB</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <label className="w-28">Document Date <span className="text-red-500">*</span></label>
                <input type="date" className="border border-gray-300 p-1 w-40 focus:outline-none" />
              </div>
              <div className="ml-[120px]">
                <button className="bg-[#0066FF] text-white px-4 py-1.5 rounded hover:bg-blue-600">
                  Save
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="w-28">Document No <span className="text-red-500">*</span></label>
              <input type="text" className="border border-gray-300 p-1 w-48 focus:outline-none" />
            </div>

          </div>
        </div>
      )}

      {/* Grid Table Section */}
      <div className="mt-4 px-2 pb-4">
        {isRegisteredAfter2004 === 'Yes' ? (
          <div className="text-sm text-gray-800 mb-2">Saved Deeds</div>
        ) : null}

        {savedDeeds.length === 0 ? (
          <div className="bg-[#F1F3F4] text-center p-3 text-sm text-gray-700 border border-gray-300 mx-2">
            No Documents Data Available
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-700 border border-gray-300 mx-2 mb-4">
            <thead className="bg-[#F8F9FA] border-b border-gray-300 font-semibold">
              <tr>
                <th className="px-4 py-2 border-r border-gray-300 w-16 text-center">Sl No.</th>
                <th className="px-4 py-2 border-r border-gray-300">Document</th>
                <th className="px-4 py-2 border-r border-gray-300">Document<br/>Registration No.</th>
                <th className="px-4 py-2 border-r border-gray-300">Document Registered<br/>Date</th>
                <th className="px-4 py-2 border-r border-gray-300 text-center">Upload<br/>Document</th>
                <th className="px-4 py-2 text-center w-12"></th>
              </tr>
            </thead>
            <tbody>
              {savedDeeds.map((deed) => (
                <tr key={deed.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 border-r border-gray-300 text-center">{deed.id}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{deed.documentType}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{deed.registrationNo}</td>
                  <td className="px-4 py-2 border-r border-gray-300">{deed.date}</td>
                  <td className="px-4 py-2 border-r border-gray-300 text-center">
                    <button className="text-teal-600 hover:text-teal-800 font-bold">⬇️</button>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-red-500 hover:text-red-700 font-bold text-lg">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-4">
          <button className="bg-[#0066FF] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600">
            Proceed Next
          </button>
        </div>
      </div>
    </div>
  );
}
