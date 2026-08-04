import React, { useState } from 'react';
import {
  Button, Box, Container, Typography, Link,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  CircularProgress, Grid, TextField, Alert
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axios';

const Propertyregistration_new = () => {
  const [formData, setFormData] = useState({ Search: "" });
  const [propertyData, setPropertyData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async () => {
    try {
      setErrorMessage("");
      setPropertyData(null);
      
      if (formData.Search === "" || formData.Search.length === 0) {
        setErrorMessage("Please enter the PID No");
        return;
      }
      
      setloading(true);

      const response = await axiosInstance.get(`PropertyRegistration/GetPropertyDetails?propertyId=${formData.Search}`);
      
      if (response.data.Error) {
        setErrorMessage(response.data.Error);
      } else {
        setPropertyData(response.data);
      }

      setloading(false);
    } catch (ex) {
      console.log(ex);
      setErrorMessage(ex.response?.data?.Error || ex.message || "Failed to fetch data.");
      setloading(false);
    }
  };

  const handleReset = async () => {
    try {
      setloading(true);
      setPropertyData(null);
      setErrorMessage("");
      setFormData({ ...formData, Search: "" });
      setloading(false);
    } catch (ex) {
      console.log(ex);
      setloading(false);
    }
  };

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

  const renderField = (label, value, colSpan = 1) => (
    <React.Fragment>
      <TableCell sx={{ border: '1px solid black', fontWeight: 'bold', backgroundColor: '#f5f5f5', width: '25%' }}>{label}</TableCell>
      <TableCell sx={{ border: '1px solid black', width: colSpan > 1 ? '75%' : '25%' }} colSpan={colSpan}>{value || ''}</TableCell>
    </React.Fragment>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, mt: 1 }}>
        
        <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Enter PropertyId:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="Search"
              value={formData.Search}
              onChange={handleChange}
              fullWidth
              size="small"
              inputProps={{ maxLength: 18 }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading} sx={{ minWidth: 100 }}>
              Submit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleReset} disabled={loading}>
              Reset
            </Button>
          </Grid>
        </Grid>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <GradientCircularProgress />
          </Box>
        )}

        {errorMessage && (
          <Box sx={{ mt: 3 }}>
            <Alert severity="error">{errorMessage}</Alert>
          </Box>
        )}

        {propertyData && propertyData.propertymain && propertyData.propertymain.length > 0 && !loading && (() => {
          const main = propertyData.propertymain[0];
          const owners = propertyData.owner || propertyData.owners || [];
          const rights = propertyData.right || propertyData.rights || [];
          const liabilities = propertyData.liability || propertyData.liabilities || [];
          const roofs = propertyData.Roof || propertyData.RoofDetails || [];
          const floors = propertyData.Floor || propertyData.FloorDetails || [];
          const docs = propertyData.PropertyDocuments || [];
          const amls = propertyData.AMLProperties || [];
          const apartments = propertyData.apartment || [];

          return (
            <Box sx={{ mt: 4, border: '1px solid #ccc', p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', p: 1 }}>
                Property Details
              </Typography>
              
              <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0, mb: 3 }}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      {renderField("District", main.district)}
                      {renderField("District Code", main.districtcode)}
                    </TableRow>
                    <TableRow>
                      {renderField("Block", main.block)}
                      {renderField("Block Code", main.blockcode)}
                    </TableRow>
                    <TableRow>
                      {renderField("Grama Panchayat", main.grampanchayat)}
                      {renderField("Grama Panchayat Code", main.grampanchayatcode)}
                    </TableRow>
                    <TableRow>
                      {renderField("Village", main.village)}
                      {renderField("Village Code", main.villagecode)}
                    </TableRow>
                    <TableRow>
                      {renderField("Property Id", main.propertyid)}
                      {renderField("Property Form", main.propertyform)}
                    </TableRow>
                    <TableRow>
                      {renderField("Asset Number", main.assetnumber)}
                      {renderField("Property Classification", main.propertyclassification)}
                    </TableRow>
                    <TableRow>
                      {renderField("Property Category", main.propertycategory)}
                      {renderField("Property Type", main.propertytype)}
                    </TableRow>
                    <TableRow>
                      {renderField("Site Area", main.sitearea)}
                      {renderField("Built up Area", main.builtuparea)}
                    </TableRow>
                    <TableRow>
                      {renderField("Mutation Register Number", main.mutationregisternumber)}
                      {renderField("East to west", main.easttowest || (propertyData.Dimension?.[0]?.easttowest))}
                    </TableRow>
                    <TableRow>
                      {renderField("North to South", main.northtosouth || (propertyData.Dimension?.[0]?.northtosouth))}
                      {renderField("Asset Nature", main.assetnature)}
                    </TableRow>
                    <TableRow>
                      {renderField("Checkbandi-North :", main.checkbandi_north)}
                      {renderField("Checkbandi-South :", main.checkbandi_south)}
                    </TableRow>
                    <TableRow>
                      {renderField("Checkbandi-West :", main.checkbandi_west)}
                      {renderField("Checkbandi-East :", main.checkbandi_east)}
                    </TableRow>
                    <TableRow>
                      {renderField("Acquisition Type :", main.acquisitiontype)}
                      {renderField("Government Property Type :", main.GovtPropertyTypeDescription)}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Owner Details */}
              {owners.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Owner Details</Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0 }}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Sl.No</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Owner Name</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Address</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Identifier type</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Identifier Name</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Occupant</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Owner Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {owners.map((owner, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ border: '1px solid black' }}>{idx + 1}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.ownername}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.address}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.identifiertype}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.identifiername}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.occupant}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{owner.OwnerType}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Rights and Liabilities */}
              {rights.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0 }}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                          <TableRow><TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Rights</TableCell></TableRow>
                        </TableHead>
                        <TableBody>
                          {rights.map((r, i) => (
                            <TableRow key={i}><TableCell sx={{ border: '1px solid black' }}>{r.rightdescription || r.Right}</TableCell></TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
              )}
              
              {liabilities.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0 }}>
                      <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                          <TableRow><TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Liabilities</TableCell></TableRow>
                        </TableHead>
                        <TableBody>
                          {liabilities.map((l, i) => (
                            <TableRow key={i}><TableCell sx={{ border: '1px solid black' }}>{l.liabilitydescription || l.Liability}</TableCell></TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
              )}

              {/* Roof and Floor */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0 }}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Roof Type</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Area</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>StoreyNo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {roofs.length === 0 ? <TableRow><TableCell colSpan={3} sx={{ border: '1px solid black', textAlign:'center' }}>No Data</TableCell></TableRow> : roofs.map((r, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ border: '1px solid black' }}>{r.RoofDetail}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{r.Area}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{r.StoreyNO}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '2px double black', borderRadius: 0 }}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Floor Type</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Area</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>StoreyNo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {floors.length === 0 ? <TableRow><TableCell colSpan={3} sx={{ border: '1px solid black', textAlign:'center' }}>No Data</TableCell></TableRow> : floors.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ border: '1px solid black' }}>{f.FloorDetail}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{f.Area}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>{f.StoreyNO}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>

              {/* Property Documents */}
              {docs.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="error">Property Document Details</Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid black', borderRadius: 0 }}>
                    <Table size="small">
                      <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Document Type</TableCell>
                          <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }}>Order Number</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {docs.map((d, i) => (
                          <TableRow key={i}>
                            <TableCell sx={{ border: '1px solid black' }}>{d.DocumentType}</TableCell>
                            <TableCell sx={{ border: '1px solid black' }}>
                              <Link href="#" underline="hover">{d.OrderNumber}</Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              
              {/* AML Properties */}
              {amls.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Amalgamated Property Details</Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '2px ridge black', borderRadius: 0 }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            {Object.keys(amls[0]).map(k => <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }} key={k}>{k}</TableCell>)}
                        </TableRow>
                        </TableHead>
                      <TableBody>
                         {amls.map((row, i) => (
                             <TableRow key={i}>
                                {Object.values(row).map((v, idx) => <TableCell sx={{ border: '1px solid black' }} key={idx}>{v}</TableCell>)}
                             </TableRow>
                         ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Apartment Details */}
              {apartments.length > 0 && apartments[0].apartmentunit?.toLowerCase() === 'yes' && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="bold">Apartment Details</Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '2px ridge black', borderRadius: 0 }}>
                    <Table size="small">
                        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            {Object.keys(apartments[0]).map(k => <TableCell sx={{ border: '1px solid black', fontWeight: 'bold' }} key={k}>{k}</TableCell>)}
                        </TableRow>
                        </TableHead>
                      <TableBody>
                         {apartments.map((row, i) => (
                             <TableRow key={i}>
                                {Object.values(row).map((v, idx) => <TableCell sx={{ border: '1px solid black' }} key={idx}>{v}</TableCell>)}
                             </TableRow>
                         ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

            </Box>
          );
        })()}

      </Box>
    </Container>
  );
};

export default Propertyregistration_new;