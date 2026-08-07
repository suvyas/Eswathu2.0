import { useFormContext } from "react-hook-form";
import PropertyClassificationForm from "../../PropertyClassificationForm";
import LocationDetailsForm from "../../LocationDetailsForm";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axios";
import endpoints from "../../../../api/endpoints";
import { Home, MapPin, Search } from "lucide-react";

export default function Step1PropertyBasics() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const [classifications, setClassifications] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const selectedClassification = watch("PropertyClassificationId");
  const selectedType = watch("PropertyType");

  useEffect(() => {
    axiosInstance.get(`${endpoints.GET_CLASSIFICATIONS}?formId=9`)
      .then(res => setClassifications(res.data || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedClassification) {
      axiosInstance.get(`${endpoints.GET_PROPERTY_TYPES}?classificationId=${selectedClassification}`)
        .then(res => setPropertyTypes(res.data || []))
        .catch(err => console.error(err));
    } else {
      setPropertyTypes([]);
    }
  }, [selectedClassification]);

  useEffect(() => {
    if (selectedType) {
      axiosInstance.get(`${endpoints.GET_PROPERTY_CATEGORIES}?propertyTypeId=${selectedType}`)
        .then(res => setCategories(res.data || []))
        .catch(err => console.error(err));
    } else {
      setCategories([]);
    }
  }, [selectedType]);

  return (
    <div className="flex flex-col gap-8">
      
      {/* Panchatantra Read Only Data */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#3B82F6]"></div>
        <h3 className="font-bold text-[#0F172A] mb-5 flex items-center gap-2 text-base">
          Data as per Panchatantra Registers
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-gray-700">
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Gram Panchayat</span><span className="font-semibold text-[#1E293B]">ಬಿದರಗುಪ್ಪೆ</span></div>
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Village</span><span className="font-semibold text-[#1E293B]">ಬಿದರಗುಪ್ಪೆ</span></div>
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">PropertyID</span><span className="font-semibold text-[#1E293B]">150200100200100001</span></div>
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Asset Number</span><span className="font-semibold text-[#1E293B]">4/1</span></div>
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Property Type</span><span className="font-semibold text-[#1E293B]">Building</span></div>
          <div><span className="block text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Property Category</span><span className="font-semibold text-[#1E293B]">Residential</span></div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="col-span-1 md:col-span-3 flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#334155]">Property Classification <span className="text-red-500">*</span></label>
          <select 
            {...register("PropertyClassificationId", { required: "This field is required" })}
            className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none ${errors.PropertyClassificationId ? 'border-red-400' : 'border-gray-300'}`}
          >
            <option value="">-- Select --</option>
            {classifications.map(c => (
              <option key={c.PropertyClassificationId} value={c.PropertyClassificationId}>
                {c.PropertyClassification_EN || c.PropertyClassification}
              </option>
            ))}
          </select>
          {errors.PropertyClassificationId && <span className="text-[11px] font-semibold text-red-500">{errors.PropertyClassificationId.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#334155]">Property Type <span className="text-red-500">*</span></label>
          <select 
            {...register("PropertyType", { required: "This field is required" })}
            disabled={!propertyTypes.length}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none disabled:bg-gray-100 disabled:opacity-70"
          >
            <option value="">-- Select --</option>
            {propertyTypes.map(t => (
              <option key={t.PropertyType} value={t.PropertyType}>{t.PropertyTypeDescription}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#334155]">Property Category <span className="text-red-500">*</span></label>
          <select 
            {...register("PropertyCategory", { required: "This field is required" })}
            disabled={!categories.length}
            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none disabled:bg-gray-100 disabled:opacity-70"
          >
            <option value="">-- Select --</option>
            {categories.map(c => (
              <option key={c.PropertyCategory} value={c.PropertyCategory}>{c.PropertyCategoryDescription}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#334155]">Corner Site <span className="text-red-500">*</span></label>
          <select {...register("IsCornerSite")} className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[13px] font-bold text-[#334155]">Acquisition Type <span className="text-red-500">*</span></label>
          <select {...register("AcquisitionType")} className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-base focus:ring-2 focus:ring-[#0052CC]/20 focus:border-[#0052CC] outline-none transition-all appearance-none">
            <option value="1">ನ್ಯಾಯಾಲಯದ ಆದೇಶ (Court Order)</option>
            <option value="2">Allotment</option>
            <option value="3">Inheritance</option>
          </select>
        </div>

      </div>

      <div className="w-full h-px bg-gray-200 my-4"></div>

      <PropertyClassificationForm />
      
      <div className="w-full h-px bg-gray-200 my-4"></div>

      <LocationDetailsForm />

    </div>
  );
}
