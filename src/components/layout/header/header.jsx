import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    "Home",
    "Citizen Services",
    "Reports",
    "Know Your Property",
    "Downloads",
    "Help",
    "Contact",
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* ================= TOP HEADER ================= */}

      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderBottom: "4px solid #1565C0",
          px: 3,
          py: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Left Logo */}

          <Box
            component="img"
            src="/logos/rdpr-logo.png"
            alt="RDPR"
            sx={{
              width: { xs: 70, md: 90 },
              height: "auto",
            }}
          />

          {/* Center Title */}

          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              px: 2,
            }}
          >
            <Typography
              sx={{
                color: "#B71C1C",
                fontWeight: 600,
                fontSize: {
                  xs: "0.8rem",
                  md: "1rem",
                },
              }}
            >
              ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ
            </Typography>

            <Typography
              sx={{
                color: "#0D47A1",
                fontWeight: "bold",
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
              }}
            >
              e-Swathu
            </Typography>

            <Typography
              sx={{
                color: "#B71C1C",
                fontWeight: 600,
                fontSize: {
                  xs: "0.9rem",
                  md: "1.2rem",
                },
              }}
            >
              ಇ-ಸ್ವತ್ತು ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ
            </Typography>

            <Typography
              sx={{
                color: "#555",
                fontSize: {
                  xs: "0.75rem",
                  md: "0.95rem",
                },
              }}
            >
              Rural Development & Panchayat Raj Department
            </Typography>

            <Typography
              sx={{
                color: "#555",
                fontSize: {
                  xs: "0.75rem",
                  md: "0.95rem",
                },
              }}
            >
              Government of Karnataka
            </Typography>
          </Box>

          {/* Right Logos */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/logos/digital-india.png"
              alt="Digital India"
              sx={{
                width: { xs: 40, md: 60 },
              }}
            />

            <Box
              component="img"
              src="/logos/nic-logo.png"
              alt="NIC"
              sx={{
                width: { xs: 40, md: 60 },
              }}
            />

            <Box
              component="img"
              src="/logos/karnataka-govt.png"
              alt="Government"
              sx={{
                width: { xs: 40, md: 60 },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ================= NAVIGATION ================= */}

      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          backgroundColor: "#1565C0",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                e-Swathu
              </Typography>
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  sx={{
                    mx: 1,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  {item}
                </Button>
              ))}

              <Box sx={{ flexGrow: 1 }} />

              <Button color="inherit">English</Button>

              <Button color="inherit">ಕನ್ನಡ</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box
          sx={{
            width: 280,
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}

            <ListItemButton>
              <ListItemText primary="English" />
            </ListItemButton>

            <ListItemButton>
              <ListItemText primary="ಕನ್ನಡ" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default header;