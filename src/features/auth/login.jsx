import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  const [form, setForm] = useState({
    loginId: "",
    mobile: "",
    captcha1: "",
    otp: "",
    captcha2: "",
  });

  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOtp = () => {
    setShowOtpSection(true);
  };

  const handleLogin = () => {
    navigate(redirectTo);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card elevation={5}>
        <CardContent sx={{ p: 4 }}>
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight={700}>
              e-Swathu 2.0
            </Typography>

            <Typography color="text.secondary">
              BBMP Officer Login
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Login ID"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
              />
            </Grid>

            {/* Captcha */}
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Captcha"
                name="captcha1"
                value={form.captcha1}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <Box
                sx={{
                  height: 56,
                  border: "1px solid #cfd8dc",
                  borderRadius: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.5,
                  bgcolor: "#f5f7fa",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 3,
                    fontSize: 18,
                    userSelect: "none",
                  }}
                >
                  A7X9K
                </Typography>

                <IconButton size="small">
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </Grid>

            {showOtpSection && (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="OTP"
                    name="otp"
                    value={form.otp}
                    onChange={handleChange}
                  />
                </Grid>

                {/* Second Captcha */}
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Captcha"
                    name="captcha2"
                    value={form.captcha2}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Box
                    sx={{
                      height: 56,
                      border: "1px solid #cfd8dc",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      px: 1.5,
                      bgcolor: "#f5f7fa",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        letterSpacing: 3,
                        fontSize: 18,
                        userSelect: "none",
                      }}
                    >
                      P5Q2M
                    </Typography>

                    <IconButton size="small">
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default login;