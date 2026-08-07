import { Check, Home, FileText, ClipboardCheck, Send, User } from 'lucide-react';
import { cn } from '../../../lib/utils';

export default function StepTracker({ steps, currentStep }) {
  // Map icons based on step index for the eKhata aesthetic
  const getIcon = (index, isCompleted, isActive) => {
    if (isCompleted) return <Check size={18} className="text-white" />;
    if (index === 0) return <User size={18} className={isActive ? "text-white" : "text-gray-500"} />;
    if (index === 1) return <Home size={18} className={isActive ? "text-white" : "text-gray-500"} />;
    if (index === 2) return <FileText size={18} className={isActive ? "text-white" : "text-gray-500"} />;
    if (index === 3) return <ClipboardCheck size={18} className={isActive ? "text-white" : "text-gray-500"} />;
    if (index === 4) return <Send size={18} className={isActive ? "text-white" : "text-gray-500"} />;
    return index + 1;
  };

  const getBgColor = (index, isActive, isCompleted) => {
    if (isActive) return "bg-[#0052CC] shadow-md shadow-blue-200"; // Active blue
    if (isCompleted) return "bg-[#10B981]"; // Completed green
    if (index === 1) return "bg-[#E6F4EA]"; // Light green
    if (index === 2) return "bg-[#F3E8FF]"; // Light purple
    if (index === 3) return "bg-[#FFF3E0]"; // Light orange
    if (index === 4) return "bg-[#F3F4F6]"; // Light gray
    return "bg-gray-100";
  };

  const getTextColor = (index, isActive) => {
    if (isActive) return "text-[#0052CC]";
    return "text-gray-900";
  };

  return (
    <div className="flex w-full items-center justify-between mb-2">
      {steps.map((step, index) => {
        const isCompleted = currentStep > index;
        const isActive = currentStep === index;
        
        return (
          <div key={step.title} className="flex-1 flex items-center relative">
            
            <div className="flex items-center gap-3 z-10 bg-white pr-4">
              {/* Step Circle */}
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300",
                  getBgColor(index, isActive, isCompleted)
                )}
              >
                {getIcon(index, isCompleted, isActive)}
              </div>
              
              {/* Step Text */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className={cn("font-bold text-sm", getTextColor(index, isActive))}>
                    {index + 1}
                  </span>
                </div>
                <div className={cn("font-bold text-sm", getTextColor(index, isActive))}>
                  {step.title}
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {step.subtitle}
                </div>
              </div>
            </div>

            {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2">
                <div 
                  className={cn(
                    "w-full h-full rounded",
                    isCompleted ? "bg-[#0052CC]" : "bg-gray-200"
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
