import OwnerEkycForm from "../../OwnerEkycForm";
import TenantDetailsForm from "../../TenantDetailsForm";
import RebatesForm from "../../RebatesForm";

export default function Step4OwnershipOccupancy() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <OwnerEkycForm />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <TenantDetailsForm />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <RebatesForm />
      </div>
    </div>
  );
}
