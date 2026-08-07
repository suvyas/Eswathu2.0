import KaveriDetailsForm from "../../KaveriDetailsForm";
import KaveriEcDetailsForm from "../../KaveriEcDetailsForm";

export default function Step5Integrations() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <KaveriDetailsForm />
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <KaveriEcDetailsForm />
      </div>
    </div>
  );
}
