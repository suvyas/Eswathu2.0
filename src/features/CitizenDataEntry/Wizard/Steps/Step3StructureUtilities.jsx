import BuildingStructureForm from "../../BuildingStructureForm";
import SiteAmenitiesForm from "../../SiteAmenitiesForm";
import UtilitiesDetailsForm from "../../UtilitiesDetailsForm";

export default function Step3StructureUtilities() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <BuildingStructureForm />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <SiteAmenitiesForm />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <UtilitiesDetailsForm />
      </div>
    </div>
  );
}
