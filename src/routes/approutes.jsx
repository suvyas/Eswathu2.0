import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import Layout from "@/components/layout/Layout";
import Home from "@/features/home/home";
import Login from "@/features/auth/login";
import EswathuSearchProperty from "@/features/dashboard/eswathusearchproperty";
import PropertyList from "@/features/dashboard/PropertyList"; // adjust path to wherever you saved it
import DownloadForm9 from "@/features/dashboard/DownloadForm9";
import DownloadForm11B from "@/features/dashboard/DownloadForm11B";
import VerifyDocument from "@/features/dashboard/VerifyDocument";
import TrackMutationStatus from "@/features/dashboard/TrackMutationStatus";
import PropertyMapGIS from "@/features/dashboard/PropertyMapGIS";
import About from "@/features/about/about";
import Notifications from "@/features/notifications/notifications";
import Help from "@/features/help/help";
import Propertyregistration_new from "@/features/dashboard/Propertyregistration_new"
import BasicDetailsForm from "@/features/CitizenDataEntry/BasicDetailsForm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/EswathuSearchProperty" element={<EswathuSearchProperty />} />
          <Route path="/about" element={<About />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/help" element={<Help />} />
          <Route path="/download-form9" element={<DownloadForm9 />} />
          <Route path="/download-form11b" element={<DownloadForm11B />} />
          <Route path="/verify-document" element={<VerifyDocument />} />
          <Route path="/track-mutation" element={<TrackMutationStatus />} />
          <Route path="/property-map" element={<PropertyMapGIS />} />
          <Route path="/Propertyregistration_new" element={<Propertyregistration_new />} />
          <Route path="/propertylist" element={<PropertyList />} />
          <Route path="/citizen-entry" element={<BasicDetailsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
