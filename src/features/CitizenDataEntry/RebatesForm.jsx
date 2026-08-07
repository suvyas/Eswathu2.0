import { useState } from 'react';

export default function RebatesForm() {
  const [availingRebates, setAvailingRebates] = useState('Yes');
  
  // Mock data for uploaded documents
  const uploadedDocs = availingRebates === 'Yes' ? [
    {
      id: 1,
      documentName: 'ಕಾರ್ಯನಿರ್ವಾಹಕ ಅಧಿಕಾರಿಯ ದೃಢೀಕರಣ ಪತ್ರ(Certificate of Executive Officer)'
    }
  ] : [];

  return (
    <div className="w-full bg-white mt-6 border-t-[3px] border-b-[3px] border-blue-400 py-4 px-2">
      {/* Top Question Row */}
      <div className="flex justify-between items-start text-[13px] text-gray-800 mb-4 px-2">
        <div className="w-1/2">
          Are you availing the rebates for your property under the below Categories? :
        </div>
        <div className="w-1/2 flex gap-4">
          <label className="flex items-center gap-1 cursor-pointer">
            <input 
              type="radio" 
              name="availingRebates" 
              value="Yes" 
              checked={availingRebates === 'Yes'}
              onChange={(e) => setAvailingRebates(e.target.value)}
              className="w-3.5 h-3.5"
            />
            Yes
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input 
              type="radio" 
              name="availingRebates" 
              value="No" 
              checked={availingRebates === 'No'}
              onChange={(e) => setAvailingRebates(e.target.value)}
              className="w-3.5 h-3.5"
            />
            No
          </label>
        </div>
      </div>

      {/* Rebate Details Form (Only visible if Yes) */}
      {availingRebates === 'Yes' && (
        <div className="flex flex-col gap-3 text-[13px] text-gray-800 px-2 mb-6">
          
          <div className="flex justify-between items-center">
            <div className="w-1/2">
              Under which of these categories are you availing rebates for your property?:
            </div>
            <div className="w-1/2">
              <select className="border border-gray-300 p-1 w-64 focus:outline-none text-[13px]">
                <option>--ಆಯ್ಕೆಮಾಡಿ--</option>
                <option>Category 1</option>
                <option>Category 2</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-1/2">
              Rebates Category:
            </div>
            <div className="w-1/2">
              <select className="border border-gray-300 p-1 w-64 focus:outline-none text-[13px]">
                <option>--ಆಯ್ಕೆಮಾಡಿ--</option>
                <option>Senior Citizen Rebate</option>
                <option>Disability Rebate</option>
                <option>Ex-Servicemen Rebate</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-1/2">
              Document Type
            </div>
            <div className="w-1/2">
              <select className="border border-gray-300 p-1 w-64 focus:outline-none text-[13px]">
                <option>--ಆಯ್ಕೆಮಾಡಿ--</option>
                <option>Age Proof Certificate</option>
                <option>Medical Certificate</option>
                <option>Military Service Record</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-start mt-2">
            <div className="w-1/2 mt-1">
              Upload Document :
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex items-center gap-2">
                <input type="file" className="text-sm file:mr-2 file:py-1 file:px-2 file:border file:border-gray-400 file:bg-gray-100 file:rounded" />
              </div>
              <span className="text-red-500 mt-1">Only PDF allowed with a max size of 5 MB</span>
              <div className="mt-2">
                <button className="bg-[#0066FF] text-white px-5 py-1.5 rounded hover:bg-blue-600">
                  Save
                </button>
              </div>
            </div>
          </div>
          
        </div>
      )}

      {/* Uploaded Documents Grid */}
      <div className="mt-8">
        <div className="text-lg text-gray-600 mb-2 px-8">
          Uploaded documents
        </div>
        
        {uploadedDocs.length === 0 ? (
          <div className="bg-[#F1F3F4] text-left p-3 text-[13px] text-gray-800 mx-8">
            No Documents Data Available
          </div>
        ) : (
          <div className="mx-8">
            <table className="w-full text-left text-[13px] text-gray-700 border border-gray-200">
              <thead className="bg-[#EBEBEB] border-b border-gray-200 font-semibold">
                <tr>
                  <th className="p-3 border-r border-gray-200 w-16 text-center text-black">Sl No.</th>
                  <th className="p-3 border-r border-gray-200 text-black">Document</th>
                  <th className="p-3 w-48 text-black">Upload Document</th>
                  <th className="p-3 w-16 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocs.map((doc, index) => (
                  <tr key={doc.id} className="border-b border-gray-200">
                    <td className="p-3 border-r border-gray-200 text-center">{index + 1}</td>
                    <td className="p-3 border-r border-gray-200">{doc.documentName}</td>
                    <td className="p-3 border-r border-gray-200 text-center">
                      <button className="text-teal-500 hover:text-teal-700 font-bold text-lg">⬇️</button>
                    </td>
                    <td className="p-3 text-center">
                      <button className="text-red-500 hover:text-red-700 font-bold text-xl">×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 px-2">
        <button className="bg-[#0066FF] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600">
          Proceed Next
        </button>
      </div>

    </div>
  );
}
