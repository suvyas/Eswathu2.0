import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

import Home from "@/features/home/home";
import Login from "@/features/auth/login";
import EswathuSearchProperty from "@/features/dashboard/EswathuSearchProperty";

const appRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
    
      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
          
            
              <Home />
            
          
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/EswathuSearchProperty"
          element={
           
              
              <EswathuSearchProperty />
          
        
          }
        />
 
      </Routes>
       
       <Footer />
    </BrowserRouter>
  );
};

export default appRoutes;