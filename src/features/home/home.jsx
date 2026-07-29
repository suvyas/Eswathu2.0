import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Home = () => {
 const navigate = useNavigate();
const handleNavigation = () =>  {
  navigate('/EswathuSearchProperty')
}

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          color="primary"
          gutterBottom
        >
          Welcome to e-Swathu 2.0
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Rural Development & Panchayat Raj Department
        </Typography>

        <Typography
          sx={{
            maxWidth: 700,
            mb: 4,
          }}
        >
          This portal provides online property services, mutation,
          reports, citizen services, and other e-Swathu related
          facilities.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={handleNavigation}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
};

export default Home;