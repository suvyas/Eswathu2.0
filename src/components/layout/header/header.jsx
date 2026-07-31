
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  useMediaQuery,
  useTheme,
  Divider,
  Chip,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
 
// ── Import your assets (keep same paths as original) ──
import bbmplogo from '@/assets/bbmp.png';
import niclogo from '@/assets/NIC_Logo1-01.png';
 
// ─────────────────────────────────────────────────────
//  THEME CONSTANTS  (change once → applies everywhere)
// ─────────────────────────────────────────────────────
const COLORS = {
  primary:      '#0f2b5b',   // deep navy
  primaryDark:  '#0a1e42',   // darker navy
  primaryLight: '#1a3a70',   // lighter navy for hover
  accent:       '#e8a020',   // gold / amber
  accentLight:  '#f5c040',   // brighter gold
  accentBg:     '#fef3c7',   // gold tint
  white:        '#ffffff',
  offWhite:     '#f0f4fb',
  textMuted:    'rgba(255,255,255,0.72)',
  textDim:      'rgba(255,255,255,0.50)',
  border:       'rgba(255,255,255,0.12)',
  shadow:       '0 4px 24px rgba(15,43,91,0.35)',
};
 
const header = () => {
  const location  = useLocation();
  const theme     = useTheme();
  const isMobile  = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall   = useMediaQuery(theme.breakpoints.down('sm'));
 
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [openSubMenuId,    setOpenSubMenuId]     = useState(null);
  const [openNestedId,     setOpenNestedId]      = useState(null);
  const [anchorEl,         setAnchorEl]          = useState(null);
  const [selectedMenu,     setSelectedMenu]      = useState(null);
  const [subMenuAnchorEl,  setSubMenuAnchorEl]   = useState(null);
  const [scrolled,         setScrolled]          = useState(false);
  const [activeNav,        setActiveNav]         = useState('home');
 
  // ── Scroll detection (adds shadow when scrolled) ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  // ── Menu data (unchanged from original) ──
  const menuItems = {
    0: [
      { label: 'Check Property Status',     url: 'https://rdpr.karnataka.gov.in/AA/CheckPropertyStatus_Public.aspx' },
      { label: 'Check Mojini Status',        url: 'https://rdpr.karnataka.gov.in/AA/frm_CheckMojiniStatus.aspx' },
      { label: 'FAQ',                        url: 'https://rdpr.karnataka.gov.in/PublicFAQ.aspx' },
      { label: 'FeedBack',                   url: 'https://rdpr.karnataka.gov.in/frmFeedBack.aspx' },
      { label: 'E-Swathu References',        url: 'https://zpuk.karnataka.gov.in/43/eswathu-circular/en' },
    ],
    1: [
      { label: 'Check Property Registration', url: 'https://rdpr.karnataka.gov.in/Propertyregistration_new.aspx' },
      { label: 'Register & Download App',     url: 'https://rdpr.karnataka.gov.in/Eswathu_App_download_reg.aspx' },
    ],
    2: [
      { label: 'DashBoard Reports',           url: 'https://rdpr.karnataka.gov.in/DashBoardReports/DashBoard_JavaScript.aspx' },
      { label: 'Approved Report',             url: 'https://rdpr.karnataka.gov.in/ED/frmStatewiseApprovedReport.aspx' },
      { label: 'Age Pendency Report',         url: 'https://rdpr.karnataka.gov.in/ED/frmStatewise45daysAgePendencyReport.aspx' },
      { label: 'Kaveri Reports',              url: 'https://rdpr.karnataka.gov.in/Kaveri_Reports/KaveriReport.aspx' },
      { label: 'Sakala Report',              url: 'https://rdpr.karnataka.gov.in/AA/SakalaTotalRegisteredDueDistrictWise.aspx' },
    ],
  };
 
  // Set menuTitles to [] to hide menu dropdowns (matches original behaviour)
  const menuTitles = [];
 
  // ── Helpers ──
  const handleClick = (event, menu) => { setAnchorEl(event.currentTarget); setSelectedMenu(menu); };
  const handleClose = () => { setAnchorEl(null); setSelectedMenu(null); setSubMenuAnchorEl(null); };
  const handleDrawerToggle = () => setMobileOpen(o => !o);
  const handleSubMenuClick = id => setOpenSubMenuId(openSubMenuId === id ? null : id);
  const handleNestedClick  = id => setOpenNestedId(openNestedId   === id ? null : id);
  const handleRedirect  = url => { window.open(url, '_blank');    if (isMobile) setMobileOpen(false); };
  const handleRefresh   = url => { window.location.href = url;   if (isMobile) setMobileOpen(false); };
 
  // ── Drawer (mobile) ──
  const drawer = (
    <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: COLORS.primaryDark }}>
      {/* Drawer header */}
      <Box sx={{
        background: `linear-gradient(135deg, ${COLORS.primaryDark}, ${COLORS.primary})`,
        p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <Box>
          <Typography sx={{ color: COLORS.accentLight, fontWeight: 800, fontSize: 17, letterSpacing: -0.5 }}>
            e-Swathu
          </Typography>
          <Typography sx={{ color: COLORS.textDim, fontSize: 11, mt: 0.3 }}>
            ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: COLORS.textMuted, '&:hover': { color: '#fff' } }}>
          <CloseIcon />
        </IconButton>
      </Box>
 
     
        {/* Home */}
        <ListItem
          button
          onClick={() => handleRefresh('https://eswathu.karnataka.gov.in/citizen_core')}
          sx={drawerItemSx}
        >
          <HomeIcon sx={{ mr: 1.5, fontSize: 18, color: COLORS.accentLight }} />
          <ListItemText primary="ಮುಖಪುಟ" primaryTypographyProps={{ sx: drawerLabelSx }} />
        </ListItem>
 
        {/* Dynamic menu items */}
        {menuTitles.map((title, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleSubMenuClick(index)} sx={drawerItemSx}>
              <ListItemText primary={title} primaryTypographyProps={{ sx: drawerLabelSx }} />
              {openSubMenuId === index
                ? <ExpandLess sx={{ color: COLORS.accentLight }} />
                : <ExpandMore  sx={{ color: COLORS.textMuted }}  />}
            </ListItem>
            <Collapse in={openSubMenuId === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItems[index]?.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item.subMenu ? (
                      <>
                        <ListItem button sx={{ ...drawerItemSx, pl: 4 }} onClick={() => handleNestedClick(`${index}-${idx}`)}>
                          <ListItemText primary={item.label} primaryTypographyProps={{ sx: { ...drawerLabelSx, fontSize: 13 } }} />
                          {openNestedId === `${index}-${idx}` ? <ExpandLess sx={{ color: COLORS.accentLight, fontSize: 18 }} /> : <ExpandMore sx={{ color: COLORS.textMuted, fontSize: 18 }} />}
                        </ListItem>
                        <Collapse in={openNestedId === `${index}-${idx}`} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.subMenu.map((sub, si) => (
                              <ListItem button key={si} sx={{ ...drawerItemSx, pl: 6 }} onClick={() => handleRedirect(sub.url)}>
                                <ListItemText primary={sub.label} primaryTypographyProps={{ sx: { ...drawerLabelSx, fontSize: 12 } }} />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <ListItem button sx={{ ...drawerItemSx, pl: 4 }} onClick={() => handleRedirect(item.url)}>
                        <ListItemText primary={item.label} primaryTypographyProps={{ sx: { ...drawerLabelSx, fontSize: 13 } }} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
 
        <Divider sx={{ borderColor: COLORS.border, my: 1 }} />
 
       
      {/* Drawer footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.border}` }}>
        <Typography sx={{ color: COLORS.textDim, fontSize: 10.5, textAlign: 'center', lineHeight: 1.6 }}>
          RDPR Karnataka · NIC · Digital India
        </Typography>
      </Box>
    </Box>
  );
 
  // ─────────────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────────────
  return (
    <>
      {/* ── ACCESSIBILITY BAR ── */}
      <Box sx={{
        bgcolor: '#060e1e', px: 2.5, py: '4px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 0.5,
      }}>
        <Typography sx={{ fontSize: 11, color: '#3a5a7a' }}>
          ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ | Skip to main content
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {['A-', 'A', 'A+'].map(s => (
            <Box
              key={s}
              component="button"
              sx={{
                bgcolor: 'transparent', border: '1px solid #1a3a5a', color: '#5a8aaa',
                px: 1, py: '2px', fontSize: 11, borderRadius: 0.5, cursor: 'pointer',
                '&:hover': { bgcolor: COLORS.primary, color: '#fff', borderColor: COLORS.primary },
                transition: 'all .15s',
              }}
            >{s}</Box>
          ))}
          <Box component="button" sx={accBtnSx}>ಕನ್ನಡ</Box>
          <Box component="button" sx={accBtnSx}>English</Box>
        </Box>
      </Box>
 
      {/* ── GOVT HEADER BAND ── */}
      <Box sx={{
        bgcolor: '#fff', borderBottom: `5px solid ${COLORS.primary}`,
        px: { xs: 1.5, md: 3 }, py: { xs: 1.5, md: 1.5 },
      }}>
        <Box sx={{
          maxWidth: 1200, mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '56px 1fr 56px', sm: '72px 1fr 72px', md: '90px 1fr 90px' },
          alignItems: 'center',
          gap: { xs: 1, md: 1.5 },
        }}>
 
          {/* LEFT — India emblem / BBMP logo */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
            <Box
              component="img"
              src={bbmplogo}
              alt="Karnataka Emblem"
              sx={{ width: { xs: 48, md: 64 }, height: { xs: 54, md: 70 }, objectFit: 'contain' }}
            />
            <Typography sx={{ fontSize: 7.5, color: '#666', textAlign: 'center', lineHeight: 1.3 }}>
              ಕರ್ನಾಟಕ ಸರ್ಕಾರ<br />Govt. of Karnataka
            </Typography>
          </Box>
 
          {/* CENTER — Portal branding */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: { xs: 9.5, sm: 10.5 }, color: '#777', mb: 0.3, letterSpacing: 0.2 }}>
              ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ
            </Typography>
            <Typography sx={{
              fontSize: { xs: 26, sm: 32, md: 40 },
              fontWeight: 900, color: COLORS.primary,
              letterSpacing: -1, lineHeight: 1, fontFamily: 'Inter,Segoe UI,sans-serif',
            }}>
              e-Swathu
            </Typography>
            <Typography sx={{
              fontSize: { xs: 12, sm: 14, md: 17 },
              fontWeight: 700, color: COLORS.primaryDark,
              mt: 0.4, mb: 0.3,
            }}>
              ಇ-ಸ್ವತ್ತು &nbsp;·&nbsp; ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ
            </Typography>
            {!isSmall && (
              <Typography sx={{ fontSize: 10.5, color: '#777' }}>
                Rural Development &amp; Panchayat Raj Dept. · Government of Karnataka
              </Typography>
            )}
          </Box>
 
          {/* RIGHT — Digital India + NIC logo */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8 }}>
            {/* Digital India tricolor badge */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{
                width: 40, height: 26,
                background: 'linear-gradient(180deg,#ff9933 33%,#fff 33%,#fff 66%,#138808 66%)',
                borderRadius: 0.5, border: '1px solid #ddd',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid #000080', position: 'absolute' }} />
              </Box>
              <Typography sx={{ fontSize: 8, color: '#333', fontWeight: 700, letterSpacing: 0.5 }}>
                DIGITAL INDIA
              </Typography>
            </Box>
            <Box
              component="img"
              src={niclogo}
              alt="NIC Logo"
              sx={{ width: { xs: 46, md: 62 }, height: { xs: 28, md: 36 }, objectFit: 'contain', bgcolor: '#fff', borderRadius: 0.5 }}
            />
          </Box>
        </Box>
      </Box>
 
      {/* ── MINISTER STRIP ── */}
      <Box sx={{
        background: `linear-gradient(120deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
        position: 'relative', overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        },
      }}>
        <Box sx={{
          maxWidth: 1200, mx: 'auto',
          display: 'flex', alignItems: 'stretch', flexWrap: 'wrap',
          position: 'relative', zIndex: 1,
        }}>
          {/* CM left */}
          <MinisterCard
            name="Shri D.K. Shivakumar"
            role={<>Hon'ble Chief Minister<br />Government of Karnataka</>}
            side="left"
            isMobile={isMobile}
          />
 
          {/* Center stats */}
          <Box sx={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            py: { xs: 1.5, md: 2 }, px: 2, textAlign: 'center', gap: 0.8,
          }}>
            <Chip
              label="📋 RDPR Karnataka · NIC · Digital India"
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.82)',
                fontSize: 10.5, fontWeight: 600, letterSpacing: 0.4,
                border: '1px solid rgba(255,255,255,0.2)', height: 24,
              }}
            />
            <Typography sx={{
              fontSize: { xs: 16, md: 20 }, fontWeight: 800, color: COLORS.accentLight, lineHeight: 1.1,
            }}>
              e-Swathu Property Portal
            </Typography>
            <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.50)' }}>
              ಗ್ರಾಮ ಪಂಚಾಯತ್ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[['2.4 Cr+','Properties'],['6,022','Gram Panchayats'],['31','Districts'],['18 L+','Documents']].map(([n,l]) => (
                <Box key={l} sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: { xs: 15, md: 18 }, fontWeight: 900, color: COLORS.accentLight, lineHeight: 1 }}>{n}</Typography>
                  <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', mt: 0.3 }}>{l}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
 
          {/* Minister right */}
          <MinisterCard
            name="Shri Priyank Kharge"
            role={<>Hon'ble Minister, RDPR<br />IT/BT &amp; e-Governance, GoK</>}
            side="right"
            isMobile={isMobile}
          />
        </Box>
      </Box>
 
      {/* ── STICKY NAV BAR ── */}
      <AppBar
        position="sticky"
        elevation={scrolled ? 6 : 0}
        sx={{
          bgcolor: COLORS.primaryDark,
          boxShadow: scrolled ? COLORS.shadow : '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'box-shadow .2s',
        }}
      >
        <Toolbar sx={{ px: { xs: 1.5, md: 3 }, minHeight: { xs: 52, md: 56 } }}>
          {isMobile ? (
            /* ── MOBILE NAV ── */
            <>
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ mr: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 15, color: COLORS.accentLight }}>
                e-Swathu
              </Typography>
              {/* Quick citizen login button on mobile */}
              <Button
                size="small"
                onClick={() => handleRefresh('https://eswathu.karnataka.gov.in/citizen')}
                startIcon={<PersonIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  bgcolor: COLORS.accent, color: COLORS.primaryDark,
                  fontWeight: 700, fontSize: 11, borderRadius: 1,
                  px: 1.5, py: 0.6,
                  '&:hover': { bgcolor: COLORS.accentLight },
                }}
              >
                Login
              </Button>
            </>
          ) : (
            /* ── DESKTOP NAV ── */
            <>
              {/* Home button */}
              <NavButton
                label="Home"
                icon={<HomeIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                active={activeNav === 'home'}
                onClick={() => { setActiveNav('home'); handleRefresh('https://eswathu.karnataka.gov.in/citizen_core'); }}
                accent={COLORS.accentLight}
              />
 
              {/* Dynamic dropdown menus */}
              {menuTitles.map((item, index) => (
                <Box key={index}>
                  <Button
                    onClick={e => handleClick(e, index)}
                    endIcon={<ArrowDropDownIcon />}
                    sx={navBtnSx(false, COLORS.accentLight)}
                  >
                    {item}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={selectedMenu === index}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 8,
                      sx: {
                        mt: 0.5, minWidth: 240, borderRadius: 1.5,
                        border: `1px solid ${COLORS.primaryLight}`,
                        '& .MuiMenuItem-root': {
                          fontSize: 13, py: 1, px: 2,
                          '&:hover': { bgcolor: '#f0f4fb', color: COLORS.primary },
                        },
                      },
                    }}
                  >
                    {menuItems[index]?.map((menuItem, idx) => (
                      <MenuItem key={idx} onClick={() => { handleClose(); menuItem.subMenu ? setSubMenuAnchorEl(null) : handleRedirect(menuItem.url); }}>
                        {menuItem.label}
                        {menuItem.subMenu && <ArrowDropDownIcon sx={{ ml: 'auto', fontSize: 18 }} />}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ))}
 
              {/* Spacer */}
              <Box sx={{ flex: 1 }} />
            </>
          )}
        </Toolbar>
      </AppBar>
 
      {/* ── TICKER / NEWS BAR ── */}
      <Box sx={{
        bgcolor: '#fef3c7',
        borderBottom: '2px solid #e8a020',
        px: 2.5, py: '7px',
        display: 'flex', alignItems: 'center', gap: 1.5,
        overflow: 'hidden',
      }}>
        <Box sx={{
          bgcolor: COLORS.primary, color: '#fff',
          fontSize: 10, fontWeight: 700, px: 1.2, py: '3px',
          borderRadius: 0.5, whiteSpace: 'nowrap', letterSpacing: 0.6,
          flexShrink: 0,
        }}>
          📢 NOTICE
        </Box>
        <Box sx={{
          fontSize: 12, color: '#78350f', whiteSpace: 'nowrap', fontWeight: 500,
          animation: 'eswathu-ticker 30s linear infinite',
          '@keyframes eswathu-ticker': {
            from: { transform: 'translateX(80vw)' },
            to:   { transform: 'translateX(-100%)' },
          },
        }}>
          e-Swathu 2.0 launched — digital signatures &amp; QR codes on all property documents &nbsp;·&nbsp;
          Real-time sync with Bhoomi and Kaveri Online Services now active &nbsp;·&nbsp;
          Aadhaar OTP mandatory for all mutation and e-Khata applications from Jan 2026 &nbsp;·&nbsp;
          Form 9 &amp; Form 11B free to download — no login required
        </Box>
      </Box>
 
      {/* ── MOBILE DRAWER ── */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
 
// ─────────────────────────────────────────────────────
//  MINISTER CARD  (sub-component)
// ─────────────────────────────────────────────────────
const MinisterCard = ({ name, role, side, isMobile }) => {
  if (isMobile) return null; // hide on mobile — minister strip stacks
 
  const borderStyle = side === 'left'
    ? { borderRight: '1px solid rgba(255,255,255,0.12)' }
    : { borderLeft:  '1px solid rgba(255,255,255,0.12)' };
 
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', gap: 1.5,
      py: 1.5, px: 2.5,
      background: 'rgba(0,0,0,0.14)',
      minWidth: 200, flexShrink: 0,
      ...borderStyle,
    }}>
      {/* Illustrated avatar placeholder */}
      <Box sx={{
        width: 72, height: 86, borderRadius: 1.5,
        border: `2.5px solid #f5c040`,
        overflow: 'hidden', flexShrink: 0,
        background: 'linear-gradient(160deg,#1a3a70,#0a1e42)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
      }}>
        {/* Simple silhouette placeholder — replace with <img> when real photo available */}
        <svg viewBox="0 0 72 86" fill="none" width="72" height="86">
          <ellipse cx="36" cy="34" rx="16" ry="18" fill="#c8a080" />
          <path d="M8 86 Q8 62 36 55 Q64 62 64 86Z" fill="#1a1a2a" />
          <path d="M20 86 Q8 70 4 80Z" fill="#e8a020" opacity=".35" />
          <path d="M52 86 Q64 70 68 80Z" fill="#e8a020" opacity=".35" />
        </svg>
      </Box>
 
      <Box>
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#fff', lineHeight: 1.3, mb: 0.3 }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 10.5, color: 'rgba(255,255,255,0.58)', lineHeight: 1.4 }}>
          {role}
        </Typography>
      </Box>
    </Box>
  );
};
 
// ─────────────────────────────────────────────────────
//  DESKTOP NAV BUTTON  (sub-component)
// ─────────────────────────────────────────────────────
const NavButton = ({ label, icon, active, onClick, accent }) => (
  <Button
    onClick={onClick}
    sx={{
      color: active ? '#fff' : 'rgba(255,255,255,0.78)',
      fontWeight: active ? 700 : 500,
      fontSize: 13,
      px: 1.8, py: 1.8,
      borderRadius: 0,
      borderBottom: `3px solid ${active ? accent : 'transparent'}`,
      display: 'flex', alignItems: 'center',
      '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', borderBottomColor: accent },
      transition: 'all .15s',
    }}
  >
    {icon}{label}
  </Button>
);
 
// ─────────────────────────────────────────────────────
//  SHARED STYLE OBJECTS
// ─────────────────────────────────────────────────────
const navBtnSx = (active, accent) => ({
  color: active ? '#fff' : 'rgba(255,255,255,0.78)',
  fontWeight: active ? 700 : 500,
  fontSize: 13,
  px: 1.8, py: 1.8,
  borderRadius: 0,
  borderBottom: `3px solid ${active ? accent : 'transparent'}`,
  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', borderBottomColor: accent },
  transition: 'all .15s',
});
 
const drawerItemSx = {
  py: 1.2, px: 2.5,
  display: 'flex', alignItems: 'center',
  cursor: 'pointer',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' },
  transition: 'background .15s',
};
 
const drawerLabelSx = {
  fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)',
  fontFamily: 'Inter,Segoe UI,sans-serif',
};
 
const accBtnSx = {
  bgcolor: 'transparent',
  border: '1px solid #1a3a5a',
  color: '#5a8aaa',
  px: 1, py: '2px',
  fontSize: 11,
  borderRadius: 0.5,
  cursor: 'pointer',
  ml: 0.5,
  '&:hover': { bgcolor: '#0f2b5b', color: '#fff', borderColor: '#0f2b5b' },
  transition: 'all .15s',
};
 
export default header;