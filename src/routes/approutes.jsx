import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/features/home/home";
import Login from "@/features/auth/login";
import EswathuSearchProperty from "@/features/dashboard/eswathusearchproperty";
import DownloadForm9 from "@/features/dashboard/DownloadForm9";
import DownloadForm11B from "@/features/dashboard/DownloadForm11B";
import VerifyDocument from "@/features/dashboard/VerifyDocument";
import TrackMutationStatus from "@/features/dashboard/TrackMutationStatus";
import PropertyMapGIS from "@/features/dashboard/PropertyMapGIS";

import About from "@/features/about/about";
import Notifications from "@/features/notifications/notifications";
import Help from "@/features/help/help";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />

        {/* Search Property */}
        <Route
          path="/EswathuSearchProperty"
          element={
            <>
              <Header />
              <EswathuSearchProperty />
              <Footer />
            </>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <>
              <Header />
              <Notifications />
              <Footer />
            </>
          }
        />

        {/* Help */}
        <Route
          path="/help"
          element={
            <>
              <Header />
              <Help />
              <Footer />
            </>
          }
        />
          {/* Search Property */}
          <Route
            path="/EswathuSearchProperty"
            element={
              <>
                <Header />
                <EswathuSearchProperty />
                <Footer />
              </>
            }
          />

          {/* Download Form 9 */}
          <Route
            path="/download-form9"
            element={
              <>
                <Header />
                <DownloadForm9 />
                <Footer />
              </>
            }
          />

          {/* Download Form 11B */}
          <Route
            path="/download-form11b"
            element={
              <>
                <Header />
                <DownloadForm11B />
                <Footer />
              </>
            }
          />

          {/* Verify Document */}
          <Route
            path="/verify-document"
            element={
              <>
                <Header />
                <VerifyDocument />
                <Footer />
              </>
            }
          />

          {/* Track Mutation */}
          <Route
            path="/track-mutation"
            element={
              <>
                <Header />
                <TrackMutationStatus />
                <Footer />
              </>
            }
          />

          {/* Property Map */}
          <Route
            path="/property-map"
            element={
              <>
                <Header />
                <PropertyMapGIS />
                <Footer />
              </>
            }
          />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;