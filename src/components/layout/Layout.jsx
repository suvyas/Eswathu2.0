import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;