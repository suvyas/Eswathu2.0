

import React, { useState} from 'react';
import {
  Button,  Box, Container, Typography,Link ,
 Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
 CircularProgress,Grid,TextField
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const EswathuSearchProperty = () => {
    const [formData, setFormData] = useState({

        Search: "",
      });
    const [propertyData, setPropertyData] = useState([]);
      const navigate = useNavigate();
   const [loading, setloading] = useState(false);
    const handleChange = async (e) => {
        const { name, value } = e.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
      }
    
    //   const handleSearch = async () => {
        
       
    //     try {
    //     if(formData.Search === "" || formData.Search.length === 0){
    //         toast.error("Please Enter the EPID")
    //         return
    //     }


    //     debugger
    //      setloading(true)
    //    let response = await axiosInstance.get(`Report/Get_Application_BY_EPID?PropertyEpid=${formData.Search}&SearchType=PROPERTYID`)
    //     setPropertyData(response.data.Table || [])
       


    //      setloading(false)
    //   }
    //      catch(ex){
    //       console.log(ex)
    //       setloading(false)
    //      }
    //   }

    const handleSearch = async () => {
  try {
    if (formData.Search === "" || formData.Search.length === 0) {
      toast.error("Please Enter the EPID")
      return
    }

    setloading(true)

    // Hardcoded record instead of API call
    const dummyData = [
      {
        PROPERTYID: formData.Search,
        OWNERNAME: "Test Owner",
        ASSESMENTNUMBER: "ASN123456",
        PROPERYCLASSIFICATION: "Residential"
      }
    ];
    setPropertyData(dummyData);

    // let response = await axiosInstance.get(`Report/Get_Application_BY_EPID?PropertyEpid=${formData.Search}&SearchType=PROPERTYID`)
    // setPropertyData(response.data.Table || [])

    setloading(false)
  }
  catch (ex) {
    console.log(ex)
    setloading(false)
  }
}
    
     const handleReset = async () => {
       try {
      setloading(true)
      
        
        setPropertyData( [])
       setFormData({
      ...formData,
    
      Search: ""
    });
         setloading(false)
         }
         catch(ex){
          console.log(ex)
          setloading(false)
         }
     }
 

    
  
    const handleBack =() => {
        window.location.href = "https://bbmpeaasthi.karnataka.gov.in/";
      }
      
function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
      </React.Fragment>
    );
  }
      if (loading) {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <GradientCircularProgress />
          </Box>
        );
      }
    return (
        <Container maxWidth="lg">
            
           
       <Box sx={{ backgroundColor: '#f0f0f0', padding: 1, borderRadius: 2, mt: 1 }}>
       <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontFamily: "sans-serif",
          
            color: '#1565c0',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
            }
          }}
        >
        
         Search Your Property
        </Typography>
         
        <Grid container spacing={5} alignItems={"center"}  justifyContent="center">
          <Grid item xs={12} sm={5} md={4}>
          <TextField
              label={("Enter Property ID ")}
              name="Search"
              value={formData.Search}
              onChange={handleChange}
              fullWidth
                
              sx={{ marginBottom: 3,backgroundColor:"#ffff"  }}
            />
          </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" gap={2} mt={0.1} width="100%">
         
            <Button variant="contained" color="success" onClick={handleSearch}>
              {("Search Status")}
            </Button>
            <Button variant="contained" color="primary" onClick={handleReset}>
              {("Reset")}
            </Button>
          
          </Box>
        <Box display="flex" justifyContent="right" gap={1} mt={0.1} width="100%">
      <Button variant="contained" color="primary" onClick={handleBack}>
      {"Previous"}
            </Button>
            </Box>
             <Box sx={{ backgroundColor: '#ffffff', padding: 1, borderRadius: 2, mt: 1 }}>
                
        
                
       
           
  {/* Table for LoginDetails */}
  

  {/* Table for propertyData */}
  <TableContainer component={Paper} sx={{ maxWidth: '100%', margin: '0 auto' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>
            PROPERTYID
          </TableCell>
           <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>
           OWNER NAME 
          </TableCell>
          <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>
            ASSESMENTNUMBER
          </TableCell>
          <TableCell style={{ backgroundColor: '#0276aa', fontWeight: 'bold', color: '#FFFFFF' }}>
            PROPERYCLASSIFICATION
          </TableCell>
        
        </TableRow>
      </TableHead>
      <TableBody>
        {propertyData.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} align="center">
              No Data Available
            </TableCell>
          </TableRow>
        ) : (
          propertyData.map((row, index) => {
           
            return (
              <TableRow key={index} style={{ height: '0.1em' }}>
                <TableCell style={{ padding: '0.5em 1em' }}>{row.PROPERTYID}</TableCell>
                <TableCell style={{ padding: '0.5em 1em' }}>{row.OWNERNAME}</TableCell>
                  <TableCell style={{ padding: '0.5em 1em' }}>{row.ASSESMENTNUMBER}</TableCell>
                          <TableCell style={{ padding: '0.5em 1em' }}>{row.PROPERYCLASSIFICATION}</TableCell>
              

                      
                      
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
            </Box>
  </Container>
   );
};
    export default EswathuSearchProperty;    