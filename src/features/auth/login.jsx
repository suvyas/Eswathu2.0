import { Box, Typography } from "@mui/material";

const login = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Login Page
      </Typography>
    </Box>
  );
};

export default login;