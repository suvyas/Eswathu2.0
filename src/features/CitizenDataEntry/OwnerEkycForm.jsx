import { useState } from 'react';

export default function OwnerEkycForm() {
  const [confirmationStatus, setConfirmationStatus] = useState('Select');
  const [addNewOwner, setAddNewOwner] = useState('No');
  
  // Mock data for top table
  const panchatantraOwner = {
    name: 'ನರಸಪ್ಪ ಬಿನ್ ತಿಪ್ಪಯ್ಯ',
    address: 'ಕರಣಕುಂಟೆ ನಗರ ದೊಡ್ಡಬಳ್ಳಾಪುರ ತಾ ಬೆಂಗಳೂರು ಗ್ರಾ ಜಿಲ್ಲೆ',
    status: 'DONE',
    ownerStatus: 'RETAINED'
  };

  // Mock data for completed eKYC table
  const completedOwners = [
    {
      id: 1,
      panchatantraName: 'ನರಸಪ್ಪ ಬಿನ್ ತಿಪ್ಪಯ್ಯ',
      ownerName: 'ಕುಮಾರ್ ಜಿ ಎನ್',
      relation: 'S/o\nC/o ನಾಗರಾಜ್ ಜಿ ಎನ್',
      address: 'ನಂ 239, ಫಾರೆಸ್ಟ್ ಲೇಔಟ್, ನಾಗದೇವನಹಳ್ಳಿ, ಆರ್ ವಿ ಇಂಜಿನಿಯರಿಂಗ್ ಕಾಲೇಜ್ ಕ್ಯಾಂಪಸ್, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, 560059\n7829207535',
      idNumber: 'ಆಧಾರ್ ಸಂಖ್ಯೆ\nXXXXXXXX1211',
      mobileStatus: 'Verified',
      nameMatch: 'NEW BOOK OWNER'
    }
  ];

  return (
    <div className="w-full bg-white mt-6 border border-blue-400 p-2">
      {/* Header section */}
      <div className="text-[13px] text-gray-800">
        <div className="font-semibold text-red-600 mb-1">
          Property Owner Details *
        </div>
        <div className="text-red-500 mb-2">
          *AADHAAR e-KYC shall be carried out for every owner mentioned in the sale/registration deed or for those who have inherited the property. If the name of any owner is missing, the same shall be added and e-KYC completed. Such cases will be referred to the jurisdictional PDO for approval.*
        </div>
        <div className="mb-2">Property Owner Details as per Panchatantra</div>
      </div>

      {/* Top Table: Panchatantra Owners */}
      <table className="w-full text-left text-[13px] text-gray-700 border border-gray-300 mb-2">
        <thead className="bg-[#F8F9FA] border-b border-gray-300 font-semibold">
          <tr>
            <th className="px-2 py-2 border-r border-gray-300 w-12 text-center">Sl. NO.</th>
            <th className="px-2 py-2 border-r border-gray-300">Property Owner Name</th>
            <th className="px-2 py-2 border-r border-gray-300 w-48">Name Confirmation/Edit</th>
            <th className="px-2 py-2 border-r border-gray-300">Relation Name</th>
            <th className="px-2 py-2 border-r border-gray-300 w-64">Address</th>
            <th className="px-2 py-2 border-r border-gray-300">E-KYC STATUS</th>
            <th className="px-2 py-2">Property Owner<br/>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="px-2 py-3 border-r border-gray-300 text-center">1</td>
            <td className="px-2 py-3 border-r border-gray-300">{panchatantraOwner.name}</td>
            <td className="px-2 py-3 border-r border-gray-300">
              <select 
                className="w-full border border-gray-300 p-1 focus:outline-none"
                value={confirmationStatus}
                onChange={(e) => {
                  const val = e.target.value;
                  setConfirmationStatus(val);
                  
                  // Show alert messages based on selection
                  if (val === 'Accept as ok') {
                    alert("You accepted the name as it is in the Panchatantra. Please complete eKYC.");
                  } else if (val === 'Name spelling mistake') {
                    alert("Your request will be sent to PDO to compare with entries in Panchatantra & correct accordingly.");
                  } else if (val === 'Multiple names clubbed') {
                    alert("Your request will be sent to PDO to compare with entries in Panchatantra. Please do eKYC using Aadhar of all multiple owners one after another.");
                  }
                }}
              >
                <option value="Select">Select</option>
                <option value="Accept as ok">Accept as ok</option>
                <option value="Name spelling mistake">Name spelling mistake</option>
                <option value="Multiple names clubbed">Multiple names clubbed</option>
              </select>
            </td>
            <td className="px-2 py-3 border-r border-gray-300"></td>
            <td className="px-2 py-3 border-r border-gray-300 text-center text-xs leading-relaxed">
              {panchatantraOwner.address}
            </td>
            <td className="px-2 py-3 border-r border-gray-300">{panchatantraOwner.status}</td>
            <td className="px-2 py-3">{panchatantraOwner.ownerStatus}</td>
          </tr>
        </tbody>
      </table>

      {/* Dynamic Action Area below top table */}
      {confirmationStatus !== 'Select' && (
        <div className="text-[13px] text-gray-800 mb-4 px-2">
          {confirmationStatus === 'Accept as ok' && (
            <div className="mb-2">
              You accepted the name as it is in the Panchatantra. Please complete eKYC for {panchatantraOwner.name}
            </div>
          )}
          {confirmationStatus === 'Name spelling mistake' && (
            <div className="mb-2">
              Your request will be sent to PDO to compare with entries in Panchatantra & correct accordingly. You can see name as in Panchatantra above You selected Spelling mistake reason for {panchatantraOwner.name}. Please complete eKYC.
            </div>
          )}
          {confirmationStatus === 'Multiple names clubbed' && (
            <div className="mb-2">
              Your request will be sent to PDO to compare with entries in Panchatantra & correct accordingly. You can see name as in Panchatantra above. You selected multiple owners clubbed reason for {panchatantraOwner.name}, please do eKYC using Aadhar of all multiple owners one after another.
            </div>
          )}
          <div className="flex gap-2 justify-center">
            <button className="bg-[#0066FF] text-white px-3 py-1 rounded text-xs hover:bg-blue-600">do eKYC</button>
            <button className="bg-[#0066FF] text-white px-3 py-1 rounded text-xs hover:bg-blue-600">Cancel/Clear</button>
          </div>
        </div>
      )}

      {/* Add New Owner Section */}
      <div className="mt-6 px-2 text-[13px] text-gray-800">
        <div className="text-red-500 mb-1">
          Note : Do you want to add new owner which is not in Panchatantra Data?.
        </div>
        <div className="text-red-500 mb-3">
          If new owners are added using the options below, the application shall be treated as a Mutation. The final e-Khata will be issued only after completion of the 7-day objection period, followed by Mutation approval and payment of the prescribed fee
        </div>
        
        <div className="mb-2">Add New Owner(s)</div>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-1 cursor-pointer">
            <input 
              type="radio" 
              name="addNewOwner" 
              value="Yes" 
              checked={addNewOwner === 'Yes'}
              onChange={(e) => setAddNewOwner(e.target.value)}
              className="w-3 h-3"
            />
            Yes
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input 
              type="radio" 
              name="addNewOwner" 
              value="No" 
              checked={addNewOwner === 'No'}
              onChange={(e) => setAddNewOwner(e.target.value)}
              className="w-3 h-3"
            />
            No
          </label>
        </div>

        {/* Dynamic New Owner Form */}
        {addNewOwner === 'Yes' && (
          <div className="flex items-center gap-2 mb-4">
            <select className="border border-gray-400 p-1 w-[400px] focus:outline-none text-[13px]">
              <option>Select reason for adding</option>
              <option>Name already in Panchatantra but not shown above</option>
              <option>As per Regd/Sale/Gift Deed given above</option>
              <option>As per inheritance/succession after death</option>
              <option>As per Unregistered Will</option>
              <option>As per SARFAESI order</option>
              <option>As per Court order</option>
            </select>
            <input type="text" className="border border-gray-300 p-1 w-32 focus:outline-none" />
            <button className="bg-[#0066FF] text-white px-3 py-1 rounded text-xs hover:bg-blue-600">
              AddOwnerToList
            </button>
          </div>
        )}
      </div>

      {/* Completed Owners Grid */}
      <div className="mt-6">
        <div className="text-[12px] text-gray-600 mb-1 px-2">
          e-KYC Completed Owners --&gt; Owners To Be Added in e-Khatha
        </div>
        <table className="w-full text-center text-[12px] text-gray-700 border border-gray-300 mb-4">
          <thead className="bg-[#F8F9FA] border-b border-gray-300 font-semibold">
            <tr>
              <th className="p-2 border-r border-gray-300">Sl. NO.</th>
              <th className="p-2 border-r border-gray-300">Name as per<br/>Panchatantra</th>
              <th className="p-2 border-r border-gray-300">Owner Name</th>
              <th className="p-2 border-r border-gray-300">Father/ Mother/ Husband/<br/>Spouse Name</th>
              <th className="p-2 border-r border-gray-300 w-64">Address</th>
              <th className="p-2 border-r border-gray-300">ID Document Number</th>
              <th className="p-2 border-r border-gray-300">Owner Photograph</th>
              <th className="p-2 border-r border-gray-300">Mobile Number<br/>Status</th>
              <th className="p-2 border-r border-gray-300">Name Match<br/>Result</th>
              <th className="p-2 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {completedOwners.map(owner => (
              <tr key={owner.id} className="border-b border-gray-200">
                <td className="p-2 border-r border-gray-300">{owner.id}</td>
                <td className="p-2 border-r border-gray-300 whitespace-pre-line">{owner.panchatantraName}</td>
                <td className="p-2 border-r border-gray-300">{owner.ownerName}</td>
                <td className="p-2 border-r border-gray-300 whitespace-pre-line">{owner.relation}</td>
                <td className="p-2 border-r border-gray-300 text-[11px] leading-relaxed whitespace-pre-line">
                  {owner.address}
                </td>
                <td className="p-2 border-r border-gray-300 whitespace-pre-line">{owner.idNumber}</td>
                <td className="p-2 border-r border-gray-300">
                  {/* Mock Photo Box */}
                  <div className="w-10 h-10 mx-auto bg-gray-300 rounded-sm"></div>
                </td>
                <td className="p-2 border-r border-gray-300">{owner.mobileStatus}</td>
                <td className="p-2 border-r border-gray-300">{owner.nameMatch}</td>
                <td className="p-2 flex gap-2 justify-center items-center h-full pt-4">
                  <button className="text-green-600 hover:text-green-800" title="Edit">✏️</button>
                  <button className="text-red-500 hover:text-red-700 font-bold" title="Delete">×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 px-2 pb-2">
        <button className="bg-[#0066FF] text-white px-4 py-1.5 rounded text-sm hover:bg-blue-600">
          Proceed Next
        </button>
      </div>

    </div>
  );
}
