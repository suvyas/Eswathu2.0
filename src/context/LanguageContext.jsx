import { createContext, useContext, useState } from "react";

const text = {
  en: {
    portal: "e-Aasthi",
    signIn: "Citizen login",
    user: "Mobile number or user ID",
    otp: "One-time password",
    answer: "Captcha answer",
    getOtp: "Get OTP",
    login: "Sign in securely",
    wait: "Please wait…",
    different: "Use a different mobile number",
    contactNic: "National Informatics Centre",
    corporations: "Government of Karnataka",
    address:
      "Karnataka Municipal Data Society (KMDS), #1-4, 6th Floor, IT Park, Rajajinagar Industrial Estate, Bengaluru - 560010.",
    hours: "Working Hours",
    days: "Monday - Saturday",
    time: "9:00 AM - 6:00 PM",
    lunch: "Lunch: 1:30 PM - 2:30 PM",
    closed: "Closed on Public Holidays",
    designed: "Designed and Developed by NIC",
    roleDcm: "Hon’ble Chief Minister",
    roleUdd: "Hon’ble Minister, Urban Development",
    government: "Government of Karnataka",
    home: "Home",
    pendingApplications: "Pending Applications",
    getKhata: "Get Khata",
    newKhata: "New Khata"
  },
  kn: {
    portal: "ಇ-ಆಸ್ತಿ",
    signIn: "ನಾಗರಿಕರ ಲಾಗಿನ್",
    user: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ ಬಳಕೆದಾರರ ಗುರುತು",
    otp: "ಒಂದು ಬಾರಿಯ ಗುಪ್ತಪದ",
    answer: "ಕ್ಯಾಪ್ಚಾ ಉತ್ತರ",
    getOtp: "ಒಟಿಪಿ ಪಡೆಯಿರಿ",
    login: "ಸುರಕ್ಷಿತವಾಗಿ ಲಾಗಿನ್ ಮಾಡಿ",
    wait: "ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ…",
    different: "ಬೇರೆ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬಳಸಿ",
    contactNic: "ರಾಷ್ಟ್ರೀಯ ಮಾಹಿತಿ ಕೇಂದ್ರ",
    corporations: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
    address:
      "ಕರ್ನಾಟಕ ಮುನಿಸಿಪಲ್ ಡಾಟಾ ಸೊಸೈಟಿ, #1-4, 6ನೇ ಮಹಡಿ, ಐಟಿ ಪಾರ್ಕ್, ರಾಜಾಜಿನಗರ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಎಸ್ಟೇಟ್, ಬೆಂಗಳೂರು - 560010.",
    hours: "ಕೆಲಸದ ಸಮಯ",
    days: "ಸೋಮವಾರ - ಶನಿವಾರ",
    time: "ಬೆಳಿಗ್ಗೆ 9:00 - ಸಂಜೆ 6:00",
    lunch: "ಊಟ: ಮಧ್ಯಾಹ್ನ 1:30 - 2:30",
    closed: "ಸಾರ್ವಜನಿಕ ರಜಾದಿನಗಳಲ್ಲಿ ಮುಚ್ಚಿರುತ್ತದೆ",
    designed: "ಎನ್‌ಐಸಿ ವತಿಯಿಂದ ವಿನ್ಯಾಸಗೊಳಿಸಿ ಅಭಿವೃದ್ಧಿಪಡಿಸಲಾಗಿದೆ",
    roleDcm: "ಗೌರವಾನ್ವಿತ ಮುಖ್ಯಮಂತ್ರಿ",
    roleUdd: "ಸನ್ಮಾನ್ಯ ನಗರಾಭಿವೃದ್ಧಿ ಸಚಿವರು",
    government: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
    home: "ಮುಖಪುಟ",
    pendingApplications: "ಬಾಕಿ ಉಳಿದ ಅರ್ಜಿಗಳು",
    getKhata: "ಖಾತಾ ಪಡೆಯಿರಿ",
    newKhata: "ಹೊಸ ಖಾತಾ"
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const t = text[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
