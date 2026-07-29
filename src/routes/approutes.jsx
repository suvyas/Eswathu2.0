import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

import Home from "@/features/home/home";
import Login from "@/features/auth/login";
import Dashboard from "@/features/dashboard/dashboard";

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default appRoutes;