import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/features/home/home";
import Login from "@/features/auth/login";
import EswathuSearchProperty from "@/features/dashboard/EswathuSearchProperty";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route
          path="/"
          element={<Home />}
        />
        <Route path='*' element={
            <>
      <Header />
    
      
        {/* Landing Page */}
        

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
         </>
          } />
      </Routes>
       
       <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;