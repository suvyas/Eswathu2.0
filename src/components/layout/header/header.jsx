import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton,
  Drawer, List, ListItem, ListItemText, Collapse, useMediaQuery, useTheme, Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import bbmplogo from '@/assets/bbmp.png';
import niclogo from '@/assets/NicLogo.jpeg';
import cmImage from '@/assets/CM.jpeg';
import govlogo from '@/assets/govlogo.jpg';
const COLORS = {
  primary: '#1E3A8A', primaryMid: '#1D4ED8', primaryBorder: '#2563EB',
  accent: '#FFC72C', accentLight: '#FFD95A', accentBg: '#FFF4CC',
  muted: '#64748B', tickerText: '#713F12',
  border: 'rgba(255,255,255,0.12)', shadow: '0 4px 24px rgba(30,58,138,0.35)',
};

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const [openNestedId, setOpenNestedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = {
    0: [
      { label: 'Check Property Status', url: 'https://rdpr.karnataka.gov.in/AA/CheckPropertyStatus_Public.aspx' },
      { label: 'Check Mojini Status', url: 'https://rdpr.karnataka.gov.in/AA/frm_CheckMojiniStatus.aspx' },
      { label: 'FAQ', url: 'https://rdpr.karnataka.gov.in/PublicFAQ.aspx' },
      { label: 'FeedBack', url: 'https://rdpr.karnataka.gov.in/frmFeedBack.aspx' },
      { label: 'E-Swathu References', url: 'https://zpuk.karnataka.gov.in/43/eswathu-circular/en' },
    ],
  };
  const menuTitles = [];

  const handleClick = (e, m) => { setAnchorEl(e.currentTarget); setSelectedMenu(m); };
  const handleClose = () => { setAnchorEl(null); setSelectedMenu(null); };
  const handleDrawerToggle = () => setMobileOpen(o => !o);
  const handleSubMenuClick = id => setOpenSubMenuId(openSubMenuId === id ? null : id);
  const handleNestedClick = id => setOpenNestedId(openNestedId === id ? null : id);
  const handleRedirect = url => { window.open(url, '_blank'); if (isMobile) setMobileOpen(false); };
  const handleRefresh = url => { window.location.href = url; if (isMobile) setMobileOpen(false); };

  const drawer = (
    <Box sx={{ width: 300, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: COLORS.primary }}>
      <Box sx={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryMid})`, p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${COLORS.border}` }}>
        <Box>
          <Typography sx={{ color: COLORS.accentLight, fontWeight: 800, fontSize: 17 }}>e-Swathu</Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, mt: 0.3 }}>ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'rgba(255,255,255,0.72)', '&:hover': { color: '#fff' } }}><CloseIcon /></IconButton>
      </Box>
      <ListItem  onClick={() => handleRefresh('https://eswathu.karnataka.gov.in/citizen_core')} sx={drawerItemSx}>
        <HomeIcon sx={{ mr: 1.5, fontSize: 18, color: COLORS.accentLight }} />
        <ListItemText primary="ಮುಖಪುಟ" primarytypographyprops={{ sx: drawerLabelSx }} />
      </ListItem>
      {menuTitles.map((title, index) => (
        <React.Fragment key={index}>
          <ListItem onClick={() => handleSubMenuClick(index)} sx={drawerItemSx}>
            <ListItemText primary={title} primarytypographyprops={{ sx: drawerLabelSx }} />
            {openSubMenuId === index ? <ExpandLess sx={{ color: COLORS.accentLight }} /> : <ExpandMore sx={{ color: 'rgba(255,255,255,0.5)' }} />}
          </ListItem>
          <Collapse in={openSubMenuId === index} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuItems[index]?.map((item, idx) => (
                <ListItem key={idx} sx={{ ...drawerItemSx, pl: 4 }} onClick={() => handleRedirect(item.url)}>
                  <ListItemText primary={item.label} primarytypographyprops={{ sx: { ...drawerLabelSx, fontSize: 13 } }} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
      <Divider sx={{ borderColor: COLORS.border, my: 1 }} />
      <Box sx={{ p: 2, borderTop: `1px solid ${COLORS.border}` }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 10.5, textAlign: 'center' }}>RDPR Karnataka · NIC · Digital India</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ACCESSIBILITY BAR */}
      <Box sx={{ bgcolor: COLORS.primary, px: 2.5, py: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 0.5 }}>
        <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ | Skip to main content</Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {['A-', 'A', 'A+', 'High Contrast', 'ಕನ್ನಡ', 'English'].map(s => (
            <Box key={s} component="button" sx={accBtnSx}>{s}</Box>
          ))}
        </Box>
      </Box>

      {/* MERGED HEADER: CM photo + India-style emblem | brand | DI + NIC + Karnataka emblem + Minister photo */}
      <Box sx={{ bgcolor: '#fff', borderBottom: `5px solid ${COLORS.primaryBorder}`, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 2.5 } }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            {!isMobile && <MinisterCard name="Hon'ble Chief Minister" role="Chief Minister" imgSrc={cmImage} />}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
              <Box component="img" src={govlogo} alt="Govt Emblem" sx={{ width: { xs: 60, md: 80 }, height: { xs: 68, md: 90 }, objectFit: 'contain' }} />
              <Typography sx={{ fontSize: 7.5, color: '#666', textAlign: 'center', lineHeight: 1.3 }}>भारत सरकार<br />Govt. of India</Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', flex: 1, minWidth: 220 }}>
            <Typography sx={{ fontSize: { xs: 9.5, sm: 10.5 }, color: COLORS.muted, mb: 0.3 }}>ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ</Typography>
            <Typography sx={{ fontSize: { xs: 26, sm: 32, md: 40 }, fontWeight: 900, color: COLORS.primaryMid, letterSpacing: -1, lineHeight: 1, fontFamily: 'Inter,Segoe UI,sans-serif' }}>e-Swathu</Typography>
            <Typography sx={{ fontSize: { xs: 12, sm: 14, md: 17 }, fontWeight: 700, color: COLORS.primary, mt: 0.4, mb: 0.3 }}>ಇ-ಸ್ವತ್ತು &nbsp;·&nbsp; ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</Typography>
            {!isSmall && <Typography sx={{ fontSize: 10.5, color: COLORS.muted }}>Rural Development &amp; Panchayat Raj Dept. · Government of Karnataka</Typography>}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.4 }}>
              <Box sx={{ width: 40, height: 26, background: 'linear-gradient(180deg,#ff9933 33%,#fff 33%,#fff 66%,#138808 66%)', borderRadius: 0.5, border: '1px solid #ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', border: '1.5px solid #000080', position: 'absolute' }} />
              </Box>
              <Typography sx={{ fontSize: 8, color: '#334155', fontWeight: 700 }}>DIGITAL INDIA</Typography>
            </Box> */}
            <Box component="img" src={niclogo} alt="NIC Logo" sx={{ width: { xs: 175, md: 300 }, height: { xs: 120, md: 90 }, objectFit: 'contain', bgcolor: '#fff', borderRadius: 0.5 }} />
          </Box>
        </Box>
      </Box>

      {/* STICKY NAV */}
      <AppBar position="sticky" elevation={scrolled ? 6 : 0} sx={{ bgcolor: COLORS.primary, boxShadow: scrolled ? COLORS.shadow : '0 2px 8px rgba(30,58,138,0.25)', transition: 'box-shadow .2s' }}>
        <Toolbar sx={{ px: { xs: 1.5, md: 3 }, minHeight: { xs: 52, md: 56 } }}>
          {isMobile ? (
            <>
              <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 1 }}><MenuIcon /></IconButton>
              <Typography sx={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 15, color: COLORS.accentLight }}>e-Swathu</Typography>
              <Button size="small" onClick={() => handleRefresh('https://eswathu.karnataka.gov.in/citizen')} startIcon={<PersonIcon sx={{ fontSize: '14px !important' }} />}
                sx={{ bgcolor: COLORS.accent, color: COLORS.primary, fontWeight: 700, fontSize: 11, borderRadius: 1.5, px: 1.5, py: 0.6, '&:hover': { bgcolor: COLORS.accentLight } }}>
                Login
              </Button>
            </>
          ) : (
            <>
              {['Home', 'Services', 'About', 'Notifications', 'Help & FAQ'].map((label, i) => (
                <NavButton key={label} label={label} icon={i === 0 ? <HomeIcon sx={{ fontSize: 16, mr: 0.5 }} /> : null}
                  active={activeNav === label.toLowerCase()}
                  onClick={() => { setActiveNav(label.toLowerCase()); if (i === 0) handleRefresh('https://e-swathutest.karnataka.gov.in:8443/eswathu_core/'); }}
                  accent={COLORS.accent} />
              ))}
              {menuTitles.map((item, index) => (
                <Box key={index}>
                  <Button onClick={e => handleClick(e, index)} endIcon={<ArrowDropDownIcon />} sx={navBtnSx(false, COLORS.accent)}>{item}</Button>
                  <Menu anchorEl={anchorEl} open={selectedMenu === index} onClose={handleClose}
                    PaperProps={{ sx: { mt: 0.5, minWidth: 240, borderRadius: 1.5, border: `1px solid ${COLORS.primaryMid}` } }}>
                    {menuItems[index]?.map((mi, idx) => <MenuItem key={idx} onClick={() => { handleClose(); handleRedirect(mi.url); }}>{mi.label}</MenuItem>)}
                  </Menu>
                </Box>
              ))}
              <Box sx={{ flex: 1 }} />
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* TICKER */}
      <Box sx={{ bgcolor: COLORS.accentBg, borderBottom: `2px solid ${COLORS.accent}`, px: 2.5, py: '7px', display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: COLORS.primary, color: '#fff', fontSize: 10, fontWeight: 700, px: 1.2, py: '3px', borderRadius: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}>📢 NOTICE</Box>
        <Box sx={{
          fontSize: 12, color: COLORS.tickerText, whiteSpace: 'nowrap', fontWeight: 500, animation: 'eswathu-ticker 30s linear infinite',
          '@keyframes eswathu-ticker': { from: { transform: 'translateX(80vw)' }, to: { transform: 'translateX(-100%)' } }
        }}>
          e-Swathu 2.0 launched — digital signatures &amp; QR codes on all property documents &nbsp;·&nbsp;
          Real-time sync with Bhoomi and Kaveri Online Services now active &nbsp;·&nbsp;
          Aadhaar OTP mandatory for all mutation and e-Khata applications from Jan 2026 &nbsp;·&nbsp;
          Form 9 &amp; Form 11B free to download — no login required
        </Box>
      </Box>

      <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 } }}>
        {drawer}
      </Drawer>
    </>
  );
};

const MinisterCard = ({ name, role, imgSrc }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.6, flexShrink: 0 }}>
    <Box sx={{ width: 86, height: 104, borderRadius: 1.5, border: '3px solid #FFC72C', overflow: 'hidden', background: 'linear-gradient(160deg,#1D4ED8,#1E3A8A)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', boxShadow: '0 4px 12px rgba(30,58,138,0.28)' }}>
      {imgSrc ? (
        <Box component="img" src={imgSrc} alt={name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <svg viewBox="0 0 72 86" width="64" height="78" fill="none">
          <ellipse cx="36" cy="34" rx="16" ry="18" fill="#c8a080" />
          <path d="M8 86 Q8 62 36 55 Q64 62 64 86Z" fill="#1a1a2a" />
          <path d="M20 86 Q8 70 4 80Z" fill="#FFC72C" opacity=".35" />
          <path d="M52 86 Q64 70 68 80Z" fill="#FFC72C" opacity=".35" />
        </svg>
      )}
    </Box>
    <Box sx={{ textAlign: 'center' }}>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#1E293B', whiteSpace: 'nowrap' }}>{name}</Typography>
      <Typography sx={{ fontSize: 10, color: '#64748B', whiteSpace: 'nowrap' }}>{role}</Typography>
    </Box>
  </Box>
);

const NavButton = ({ label, icon, active, onClick, accent }) => (
  <Button onClick={onClick} sx={{ color: active ? '#fff' : 'rgba(255,255,255,0.78)', fontWeight: active ? 700 : 500, fontSize: 13, px: 1.8, py: 1.8, borderRadius: 0, borderBottom: `3px solid ${active ? accent : 'transparent'}`, display: 'flex', alignItems: 'center', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', borderBottomColor: accent }, transition: 'all .15s' }}>
    {icon}{label}
  </Button>
);

const navBtnSx = (active, accent) => ({
  color: active ? '#fff' : 'rgba(255,255,255,0.78)', fontWeight: active ? 700 : 500, fontSize: 13, px: 1.8, py: 1.8, borderRadius: 0,
  borderBottom: `3px solid ${active ? accent : 'transparent'}`, '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)', borderBottomColor: accent }, transition: 'all .15s',
});

const drawerItemSx = { py: 1.2, px: 2.5, display: 'flex', alignItems: 'center', cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.07)' } };
const drawerLabelSx = { fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.85)' };
const accBtnSx = {
  bgcolor: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)',
  px: 1, py: '2px', fontSize: 11, borderRadius: 0.5, cursor: 'pointer',
  '&:hover': { bgcolor: 'rgba(255,255,255,0.15)', color: '#fff' }, transition: 'all .15s',
};

export default Header;