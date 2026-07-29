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
  useTheme
} from '@mui/material';
import {  useLocation} from 'react-router-dom';
import bbmplogo from "@/assets/bbmp.png";
import niclogo from "@/assets/NIC_Logo1-01.png";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
const header = () => {
  
  
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenuId, setOpenSubMenuId] = useState(null);
  const [openNestedMenuId, setOpenNestedMenuId] = useState(null);
  const [BBMPHeader, setBBMPHeader] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  

  const handleClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setSelectedMenu(menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedMenu(null);
    setSubMenuAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuClick = (id) => {
    setOpenSubMenuId(openSubMenuId === id ? null : id);
  };

  const handleNestedMenuClick = (id) => {
    setOpenNestedMenuId(openNestedMenuId === id ? null : id);
  };

   const menuItems = {
    0: [ // Citizen Corner items
      { label: 'Check Property Status', url: 'https://rdpr.karnataka.gov.in/AA/CheckPropertyStatus_Public.aspx' },
      { label: 'Check Mojini Status', url: 'https://rdpr.karnataka.gov.in/AA/frm_CheckMojiniStatus.aspx' },
      { label: 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು / FAQ in English', url: 'https://rdpr.karnataka.gov.in/PublicFAQ.aspx' },
      { label: 'ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ / FeedBack', url: 'https://rdpr.karnataka.gov.in/frmFeedBack.aspx' },
      { label: 'E-Swathu References', url: 'https://zpuk.karnataka.gov.in/43/eswathu-circular/en' },
    ],
    1: [ // Verify items
      { label: 'ಈ ಆಸ್ತಿ ನೋಂದಣಿ ಮಾಡಬಹುದು ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ / Check whether this property can be registered', url: 'https://rdpr.karnataka.gov.in/Propertyregistration_new.aspx' },
      { label: 'Register and Download Eswathu App', url: 'https://rdpr.karnataka.gov.in/Eswathu_App_download_reg.aspx' },
    ],
    2: [ // Reports items
      { label: 'DashBoard Reports', url: 'https://rdpr.karnataka.gov.in/DashBoardReports/DashBoard_JavaScript.aspx' },
      { label: 'Service/Application Wise DashBoard Reports', url: 'https://rdpr.karnataka.gov.in/DashBoardReports/frmServiceApplicationWiseDashBoardReport.aspx' },
      { label: 'Approved Report', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewiseApprovedReport.aspx' },
      { label: 'Approved Report count', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewiseApprovedReportCount.aspx' },
      { label: 'Age Pendency Report', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewise45daysAgePendencyReport.aspx' },
      { label: 'Report on No of Copies issued', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewisePrintedAmountReport.aspx' },
      { label: 'Report on No of Copies Filtering by Date', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewisePrintedAmountReportFillterdByDate.aspx' },
      { label: 'Applications Received under GramThana category Report', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewise45daysTashilSktchReportpub.aspx' },
      { label: 'Report on only Form-11 Approved', url: 'https://rdpr.karnataka.gov.in/ED/frmStatewiseForm11ApprovedReport.aspx' },
      { label: 'Kaveri Reports', url: 'https://rdpr.karnataka.gov.in/Kaveri_Reports/KaveriReport.aspx' },
      { label: 'Mojini Properties', url: 'https://rdpr.karnataka.gov.in/ED/MojiniDistwiseReport.aspx' },
      { label: 'Dishanka Properties', url: 'https://rdpr.karnataka.gov.in/Dishank/DishankaDistrictWiseReport.aspx' },
      { label: 'Sakala Report', url: 'https://rdpr.karnataka.gov.in/AA/SakalaTotalRegisteredDueDistrictWise.aspx' },
      { label: 'ಇತರೆ', url: 'https://rdpr.karnataka.gov.in/Reportss.aspx' },
    ]
  };
 
  const menuTitles = ['ನಾಗರಿಕರಿಗಾಗಿ', 'ಪರಿಶೀಲಿಸಿ', 'ವರದಿಗಳು'];

  const handleRedirect = (url) => {
    window.open(url, '_blank');
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleRefresh = (url) => {
    window.location.href = url;
    if (isMobile) {
      setMobileOpen(false);
    }
  };
   const getWard =  () => {
    
     setBBMPHeader("ಕರ್ನಾಟಕ ಸರ್ಕಾರ")
     
   }
 useEffect(() => {
  getWard();
    
  }, [location.pathname]);
  // Drawer content for mobile view
  const drawer = (
    <Box sx={{ width: 280, bgcolor: '#f5f5f5', height: '100%' }}>
      <List>
        <ListItem button onClick={() => handleRefresh('https://bbmpeaasthi.karnataka.gov.in')}>
          <ListItemText primary="ಮುಖಪುಟ" />
        </ListItem>

        {menuTitles.map((title, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => handleSubMenuClick(index)}>
              <ListItemText primary={title} />
              {openSubMenuId === index ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSubMenuId === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {menuItems[index]?.map((menuItem, idx) => (
                  <React.Fragment key={idx}>
                    {menuItem.subMenu ? (
                      <>
                        <ListItem 
                          button 
                          sx={{ pl: 4 }}
                          onClick={() => handleNestedMenuClick(`${index}-${idx}`)}
                        >
                          <ListItemText primary={menuItem.label} />
                          {openNestedMenuId === `${index}-${idx}` ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openNestedMenuId === `${index}-${idx}`} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {menuItem.subMenu.map((subItem, subIdx) => (
                              <ListItem 
                                button 
                                key={subIdx} 
                                sx={{ pl: 6 }}
                                onClick={() => handleRedirect(subItem.url)}
                              >
                                <ListItemText primary={subItem.label} />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <ListItem 
                        button 
                        sx={{ pl: 4 }}
                        onClick={() => handleRedirect(menuItem.url)}
                      >
                        <ListItemText primary={menuItem.label} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}

        <ListItem button onClick={() => handleRedirect('https://bbmptax.karnataka.gov.in/')}>
          <ListItemText primary="ಆಸ್ತಿ ತೆರಿಗೆ" />
        </ListItem>

        <ListItem button onClick={() => handleRefresh('https://bbmpeaasthi.karnataka.gov.in/office/frmLoginNew.aspx')}>
          <ListItemText primary="Department Login" />
        </ListItem>

        <ListItem>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="inherit" onClick={() => handleLanguageChange('en')}>
              English
            </Button>
            <Button color="inherit" onClick={() => handleLanguageChange('kn')}>
              ಕನ್ನಡ
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#006AB0' }}>
      {/* Top Toolbar with logos and title */}
      <Toolbar sx={{ flexDirection: isMobile ? 'column' : 'row', py: isMobile ? 1 : 0 }}>
        <Box sx={{ 
          display: 'flex', 
          width: '100%', 
          alignItems: 'center', 
          justifyContent: isMobile ? 'center' : 'flex-start',
          mb: isMobile ? 1 : 0
        }}>
          <Box
            component="img"
            src={bbmplogo}
            alt="BBMP Logo"
            sx={{ 
              width: isSmall ? '5rem' : isMobile ? '7rem' : '10rem',
              height: isSmall ? '5rem' : isMobile ? '7rem' : '10rem', 
              marginRight: 2 
            }}
          />
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            flexGrow: 1,
            mx: isMobile ? 1 : 2
          }}>
            <Typography 
              variant={isSmall ? "subtitle1" : isMobile ? "h6" : "h5"} 
              fontFamily="cursive" 
              sx={{ 
                fontWeight: 'bold', 
                fontSize: isSmall ? '1rem' : isMobile ? '1.5rem' : '2rem', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
                textAlign: 'center'
              }}
            >
              {/* ಬೆಂಗಳೂರು ನಗರ ಪಾಲಿಕೆಗಳು */}
              {BBMPHeader}
            </Typography>
            <Typography 
              variant={isSmall ? "subtitle1" : isMobile ? "h6" : "h5"} 
              fontFamily="cursive" 
              sx={{ 
                fontWeight: 'bold', 
                fontSize: isSmall ? '1rem' : isMobile ? '1.5rem' : '2rem', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
                textAlign: 'center'
              }}
            >
              {/* ಬೆಂಗಳೂರು ನಗರ ಪಾಲಿಕೆಗಳು */}
        ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ  
            </Typography>
            <Typography 
              variant={isSmall ? "subtitle1" : isMobile ? "h6" : "h5"} 
              fontFamily="cursive" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'yellow', 
                fontSize: isSmall ? '1rem' : isMobile ? '1.5rem' : '2rem', 
                textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
                textAlign: 'center'
              }}
            >
              ಇ-ಸ್ವತ್ತು
            </Typography>
          </Box>
          
          {!isSmall && (
            <Box
              component="img"
              src={niclogo}
              alt="NIC Logo"
              sx={{ 
                width: isMobile ? '10rem' : '15rem', 
                height: isMobile ? '3rem' : '5rem', 
                marginRight: isMobile ? 0 : 2, 
                backgroundColor: "#FFFFFF" 
              }}
            />
          )}
        </Box>

        {isSmall && (
          <Box
            component="img"
            src={niclogo}
            alt="NIC Logo"
            sx={{ 
              width: '10rem', 
              height: '3rem', 
              marginTop: 1,
              marginBottom: 1,
              backgroundColor: "#FFFFFF" 
            }}
          />
        )}
      </Toolbar>
      
      {/* Bottom Toolbar with navigation */}
      <Toolbar sx={{ bgcolor: '#005C99', display: 'flex', justifyContent: 'space-between' }}>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              ಇ-ಆಸ್ತಿ
            </Typography>
            <Box sx={{ width: 48 }} /> {/* Balancing space */}
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              sx={{ fontSize: '0.9rem' }} 
              onClick={() => handleRefresh('https://bbmpeaasthi.karnataka.gov.in')}
            >
              ಮುಖಪುಟ
            </Button>

            {menuTitles.map((item, index) => (
              <Box key={index}>
                <Button
                  aria-controls={selectedMenu === index ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={(e) => handleClick(e, index)}
                  sx={{ 
                    color: 'white', 
                    fontFamily: 'cursive', 
                    fontSize: '0.9rem', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  {item}
                  <ArrowDropDownIcon sx={{ marginLeft: 0.5 }} />
                </Button>

                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={selectedMenu === index}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {menuItems[index]?.map((menuItem, idx) => (
                    <div key={idx}>
                      <MenuItem
                        onClick={(e) => menuItem.subMenu ? setSubMenuAnchorEl(e.currentTarget) : handleRedirect(menuItem.url)}
                      >
                        {menuItem.label}
                        {menuItem.subMenu && <ArrowDropDownIcon sx={{ marginLeft: 0.5 }} />}
                      </MenuItem>

                      {/* Render Sub-Menu if `subMenu` exists */}
                      {menuItem.subMenu && (
                        <Menu
                          anchorEl={subMenuAnchorEl}
                          open={Boolean(subMenuAnchorEl)}
                          onClose={() => setSubMenuAnchorEl(null)}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          {menuItem.subMenu.map((subMenuItem, subIdx) => (
                            <MenuItem key={subIdx} onClick={() => handleRedirect(subMenuItem.url)}>
                              {subMenuItem.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      )}
                    </div>
                  ))}
                </Menu>
              </Box>
            ))}

            <Button 
              color="inherit" 
              sx={{ fontSize: '0.9rem' }} 
              onClick={() => handleRedirect('https://bbmptax.karnataka.gov.in/')}
            >
              ಆಸ್ತಿ ತೆರಿಗೆ
            </Button>

            <Box sx={{ flexGrow: 0.5 }} />

            <Button 
              color="inherit" 
              sx={{ fontSize: '0.9rem' }} 
              onClick={() => handleRefresh('https://bbmpeaasthi.karnataka.gov.in/office/frmLoginNew.aspx')}
            >
              Department Login
            </Button>
{/* 
            <Box>
              <Button color="inherit" onClick={() => handleLanguageChange('en')}>
                English
              </Button>
              <Button color="inherit" onClick={() => handleLanguageChange('kn')}>
                ಕನ್ನಡ
              </Button>
            </Box> */}
          </>
        )}
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default header;