import { useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { MapPin, Search, Navigation, Building2, Map, Upload } from 'lucide-react';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

export default function LocationDetailsForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [mapLocation, setMapLocation] = useState('Hennagara, Bangalore');
  
  // Default coordinates from screenshot
  const [lat, setLat] = useState(12.796467536693823);
  const [lng, setLng] = useState(77.66897779397553);

  // Use the API key extracted from the legacy application
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBdb9a4LIj6aaLdxOB47HRZKD8ouOB344Q"
  });

  // Image Upload State
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Seal_of_Karnataka.svg/1200px-Seal_of_Karnataka.svg.png");

  const [formState, setFormState] = useState({
    govtOrPrivate: 'Governement Land',
    doorNo: 'Hennagara',
    buildingName: 'Bommasandra',
    propertyType: 'Corner Property / Any Two side Roads',
    landmark: '2nd',
    area: 'Hennagara',
    pincode: '560105'
  });

  const handleInputChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleMapClick = (e) => {
    if (isEditing) {
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    }
  };

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("File size exceeds 500KB!");
        return;
      }
      if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
        alert("Only JPG/JPEG allowed!");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClassName = isEditing 
    ? "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all text-gray-800" 
    : "w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-base text-gray-500 cursor-not-allowed outline-none";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col gap-8">
      
      {/* -------------------- MAP SECTION -------------------- */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Location of Property</h3>
          <p className="text-[13px] text-gray-500">
            Please mark your property on Google Maps to fetch the address and coordinates.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center gap-2 max-w-md relative">
          <input 
            type="text" 
            placeholder="Search location..."
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all"
            value={mapLocation}
            onChange={(e) => setMapLocation(e.target.value)}
          />
          <button 
            className="px-4 py-2.5 bg-[#0052CC] text-white rounded-lg text-[13px] font-bold hover:bg-blue-700 transition shadow-sm whitespace-nowrap"
            onClick={() => alert("Search functionality requires Google Places API logic.")}
          >
            Locate
          </button>
        </div>

        {/* Real Google Map */}
        <div className="w-full h-[300px] border border-gray-200 rounded-xl overflow-hidden relative shadow-inner">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat, lng }}
              zoom={15}
              onClick={handleMapClick}
              options={{
                mapTypeId: 'hybrid',
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              <Marker position={{ lat, lng }} />
            </GoogleMap>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500 text-sm font-medium">Loading Google Maps...</div>
          )}
          {isEditing && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-[12px] font-bold text-[#0052CC] flex items-center gap-2">
              <Navigation size={14} /> Click map to update coordinates
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      {/* -------------------- ADDRESS SECTION -------------------- */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-gray-900">Postal Address</h3>
          <button 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isEditing ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-blue-50 text-[#0052CC] border border-blue-200 hover:bg-blue-100'}`}
            onClick={(e) => { e.preventDefault(); setIsEditing(!isEditing); }}
          >
            {isEditing ? "Lock Editing" : "Edit Details"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Government or Private Land</label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.govtOrPrivate} 
              onChange={(e) => handleInputChange('govtOrPrivate', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Door / Plot No</label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.doorNo} 
              onChange={(e) => handleInputChange('doorNo', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Building / Land Name</label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.buildingName} 
              onChange={(e) => handleInputChange('buildingName', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Property Residing On <span className="text-red-500">*</span></label>
            {isEditing ? (
              <select 
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none"
                value={formState.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
              >
                <option>Corner Property / Any Two side Roads</option>
                <option>Normal Property / Single side Road</option>
              </select>
            ) : (
              <input type="text" className={inputClassName} value={formState.propertyType} readOnly />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Nearest Landmark <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.landmark} 
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Area / Locality <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.area} 
              onChange={(e) => handleInputChange('area', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Pincode <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className={inputClassName} 
              value={formState.pincode} 
              onChange={(e) => handleInputChange('pincode', e.target.value)}
              readOnly={!isEditing} 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-bold text-[#334155]">Coordinates (Lat, Lng) <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              className={`w-full px-4 py-2.5 rounded-lg text-[13px] border outline-none ${isEditing ? 'bg-blue-50 border-blue-200 text-[#0052CC] font-bold' : 'bg-gray-50 border-gray-200 text-gray-600'}`} 
              value={`${lat.toFixed(6)}, ${lng.toFixed(6)}`} 
              readOnly 
            />
          </div>

        </div>

        {/* Property Image Upload */}
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-6">
          <div className="flex-1">
            <h4 className="text-[13px] font-bold text-[#334155] mb-2">Property Image <span className="text-red-500">*</span></h4>
            <p className="text-[12px] text-gray-600 mb-2 leading-relaxed">
              Click a photo of the property from outside with its front elevation clearly visible.
            </p>
            <p className="text-[11px] text-red-500 font-medium">Only JPG, JPEG allowed. Max size: 500KB</p>
            
            {isEditing && (
              <button 
                className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-[#0052CC] flex items-center gap-2 hover:bg-gray-50 transition shadow-sm"
                onClick={handleImageClick}
              >
                <Upload size={16} /> Choose Image
              </button>
            )}
          </div>
          
          <div className="w-[180px]">
            <input 
              type="file" 
              accept=".jpg, .jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div 
              className={`w-full aspect-video rounded-lg overflow-hidden border-2 ${isEditing ? 'border-dashed border-[#0052CC] cursor-pointer bg-white' : 'border-gray-200 bg-gray-100'} relative group`}
              onClick={handleImageClick}
            >
              <img 
                src={imagePreview} 
                alt="Property Image" 
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-[#0052CC]/80 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload size={20} className="mb-1" />
                  <span className="text-[11px] font-bold">Replace Image</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
