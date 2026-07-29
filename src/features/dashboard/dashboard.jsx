import { Box, Typography } from "@mui/material";

const dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Dashboard Page
      </Typography>
    </Box>
  );
};

export default dashboard;