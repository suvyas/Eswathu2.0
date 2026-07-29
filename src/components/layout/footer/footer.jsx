import { Box, Typography, Divider } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        backgroundColor: "#1565C0",
        color: "#fff",
      }}
    >
      <Divider />

      <Box
        sx={{
          py: 2,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          e-Swathu 2.0
        </Typography>

        <Typography variant="body2">
          Rural Development & Panchayat Raj Department
        </Typography>

        <Typography variant="body2">
          Government of Karnataka
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            opacity: 0.9,
          }}
        >
          © {currentYear} Government of Karnataka. All Rights Reserved.
        </Typography>

        <Typography
          variant="caption"
          display="block"
          sx={{
            mt: 1,
            opacity: 0.8,
          }}
        >
          Designed & Developed by National Informatics Centre (NIC)
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;