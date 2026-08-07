import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Map, ShieldCheck, FileKey, ChevronRight, ChevronLeft,
  Clock, Download, HelpCircle, MessageSquare, Save, Lock, HeadphonesIcon, Timer
} from 'lucide-react';
import StepTracker from './Wizard/StepTracker';
import Step1PropertyBasics from './Wizard/Steps/Step1PropertyBasics';
import Step2SurveyDimensions from './Wizard/Steps/Step2SurveyDimensions';
import Step3StructureUtilities from './Wizard/Steps/Step3StructureUtilities';
import Step4OwnershipOccupancy from './Wizard/Steps/Step4OwnershipOccupancy';
import Step5Integrations from './Wizard/Steps/Step5Integrations';

// Zod Schema for validation
const schema = z.object({
  PropertyClassificationId: z.string().min(1, 'Classification is required'),
  PropertyType: z.string().min(1, 'Type is required'),
  PropertyCategory: z.string().min(1, 'Category is required'),
  IsCornerSite: z.string().optional(),
  AcquisitionType: z.string().optional(),
});

const steps = [
  { title: "Property Basics", subtitle: "Classification details" },
  { title: "Survey Data", subtitle: "Dimensions & Bhoomi" },
  { title: "Structure", subtitle: "Building & Utilities" },
  { title: "Ownership", subtitle: "eKYC & Occupancy" },
  { title: "Integrations", subtitle: "Kaveri details" },
];

export default function BasicDetailsForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      PropertyClassificationId: '',
      PropertyType: '',
      PropertyCategory: '',
      IsCornerSite: 'No',
      AcquisitionType: '1'
    }
  });

  const nextStep = async () => {
    // COMMENTED OUT VALIDATION FOR NOW
    // if (currentStep === 0) {
    //   const isValid = await methods.trigger(['PropertyClassificationId', 'PropertyType', 'PropertyCategory']);
    //   if (!isValid) return;
    // }
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = (data) => {
    console.log("Final form data:", data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F7FB] font-sans overflow-y-auto">
      
      {/* Step Tracker (Status bar and Title removed) */}
      <div className="w-full bg-white px-10 pt-6 pb-4 shadow-sm border-b border-gray-100 flex-shrink-0">
        <div className="w-full mx-auto">
          <StepTracker steps={steps} currentStep={currentStep} />
        </div>
      </div>

      {/* Form Container (Full Screen) */}
      <div className="flex-1 px-4 md:px-10 py-8 flex justify-center w-full">
        <div className="w-full flex flex-col">
          <FormProvider {...methods}>
            <form className="h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Step Header */}
                  <div className="bg-[#F8FAFC] p-6 border-b border-gray-200 flex items-center gap-4">
                    <div className="bg-white border border-gray-200 text-[#0052CC] p-3 rounded-xl shadow-sm">
                      {steps[currentStep].icon || <FileText size={24} />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{steps[currentStep].title}</h3>
                      <p className="text-sm text-gray-500">Enter the details below. These details will be used for all future communication.</p>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="p-8 pb-10 bg-white">
                    {currentStep === 0 && <Step1PropertyBasics />}
                    {currentStep === 1 && <Step2SurveyDimensions />}
                    {currentStep === 2 && <Step3StructureUtilities />}
                    {currentStep === 3 && <Step4OwnershipOccupancy />}
                    {currentStep === 4 && <Step5Integrations />}
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 bg-[#F8FAFC] border-t border-gray-200 flex justify-between items-center rounded-b-2xl">
                    <button
                      type="button"
                      onClick={prevStep}
                      className={`px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                      <ChevronLeft size={16} className="text-gray-400" /> Back
                    </button>
                    
                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2"
                      >
                        Save & Continue <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={methods.handleSubmit(onSubmit)}
                        className="px-8 py-2.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2"
                      >
                        Submit Registration <ShieldCheck size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
