import SurveyDetailsForm from "../../SurveyDetailsForm";
import PropertyUseDetailsForm from "../../PropertyUseDetailsForm";
import AreaDetailsForm from "../../AreaDetailsForm";

export default function Step2SurveyDimensions() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <SurveyDetailsForm />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <PropertyUseDetailsForm />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <AreaDetailsForm />
      </div>
    </div>
  );
}
