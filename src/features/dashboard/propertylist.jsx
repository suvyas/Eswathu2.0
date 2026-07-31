import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box, Typography, Grid,
  FormControl, Select, MenuItem,
  TextField, Button, Paper, Table, TableHead,
  TableRow, TableCell, TableBody, Stack
} from "@mui/material";
 
const districts = ["Bengaluru Urban"];
const taluks = ["Bengaluru North"];
const panchayats = ["Sample Panchayat"];
const villages = ["Sample Village"];
const searchTypes = ["Property ID", "Owner Name", "Asset Number"];
 
const initialRows = [{
  id: 1, panchayat: "Sample Panchayat", village: "Sample Village",
  propertyId: "PID001", assetNumber: "AST1001",
  owner: "Ramesh", address: "Bengaluru",
  propertyType: "Residential"
}];
 
// A single "Label :  [field]" row, matching the reference layout
function FieldRow({ label, required, children }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Grid container alignItems="center" spacing={1} wrap="nowrap">
        <Grid item sx={{ minWidth: 130 }}>
          <Typography sx={{ fontSize: 16, color: "#222" }}>
            {label} {required && <Box component="span" sx={{ color: "#d32f2f" }}>*</Box>}
          </Typography>
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}
 
export default function PropertyList() {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [filters, setFilters] = useState({
    district: "", taluk: "", panchayat: "",
    village: "", searchType: "", searchText: ""
  });
 
  const [rows] = useState(initialRows);
  const [showResults, setShowResults] = useState(false);
 
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setShowResults(true);
    }
  }, [location]);
 
  const filtered = useMemo(() => {
    if (!filters.searchText) return rows;
    return rows.filter(r =>
      JSON.stringify(r).toLowerCase()
        .includes(filters.searchText.toLowerCase())
    );
  }, [rows, filters.searchText]);
 
  const handleChange = (field) => (e) => {
    setFilters(p => ({ ...p, [field]: e.target.value }));
  };
 
  const reset = () => {
    setFilters({
      district: "", taluk: "",
      panchayat: "", village: "",
      searchType: "", searchText: ""
    });
    setShowResults(false);
  };
 
  const handleSearch = () => {
    if (
      !filters.district ||
      !filters.taluk ||
      !filters.panchayat ||
      !filters.village
    ) {
      alert("Please select all mandatory fields.");
      return;
    }
 
    if (sessionStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login", {
        state: { from: "/propertylist" }
      });
      return;
    }
 
    setShowResults(true);
  };
 
  const selectSx = {
    bgcolor: "#fff",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c9c9c9" }
  };
 
  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh" }}>
      {/* top bar, matches the thin gray strip in the reference */}
      <Box sx={{ height: 6, bgcolor: "#e9ecef" }} />
 
      <Box sx={{ px: 3, py: 3 }}>
        <Grid container spacing={2.5} rowSpacing={2.5}>
          <FieldRow label="District :" required>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={filters.district}
                onChange={handleChange("district")}
                sx={selectSx}
              >
                <MenuItem value="">--Select--</MenuItem>
                {districts.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </FieldRow>
 
          <FieldRow label="Taluk :" required>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={filters.taluk}
                onChange={handleChange("taluk")}
                sx={selectSx}
              >
                <MenuItem value="">--Select--</MenuItem>
                {taluks.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </FieldRow>
 
          <FieldRow label="Panchayath :" required>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={filters.panchayat}
                onChange={handleChange("panchayat")}
                sx={selectSx}
              >
                <MenuItem value="">--Select--</MenuItem>
                {panchayats.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </FieldRow>
 
          <FieldRow label="Village :" required>
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={filters.village}
                onChange={handleChange("village")}
                sx={selectSx}
              >
                <MenuItem value="">--Select--</MenuItem>
                {villages.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </FieldRow>
 
          <FieldRow label="search :">
            <FormControl fullWidth size="small">
              <Select
                displayEmpty
                value={filters.searchType}
                onChange={handleChange("searchType")}
                sx={selectSx}
              >
                <MenuItem value="">--Select--</MenuItem>
                {searchTypes.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
              </Select>
            </FormControl>
          </FieldRow>
 
          <FieldRow label="Enter Selected data :">
            <TextField
              fullWidth
              size="small"
              value={filters.searchText}
              onChange={handleChange("searchText")}
              sx={{ bgcolor: "#fff" }}
            />
          </FieldRow>
        </Grid>
 
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              bgcolor: "#1a56db",
              textTransform: "none",
              px: 4,
              "&:hover": { bgcolor: "#1445b0" }
            }}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={reset}
            sx={{ textTransform: "none", px: 4 }}
          >
            Reset
          </Button>
        </Stack>
 
        {showResults && (
          <Paper sx={{ mt: 4, boxShadow: "none", border: "1px solid #e0e0e0" }}>
            <Table>
              <TableHead sx={{ bgcolor: "#1E3A8A" }}>
                <TableRow>
                  {["Panchayat", "Village", "Property ID", "Asset No.", "Owner", "Address", "Type", "Actions"].map(h => (
                    <TableCell key={h} sx={{ color: "#fff" }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
 
              <TableBody>
                {filtered.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.panchayat}</TableCell>
                    <TableCell>{r.village}</TableCell>
                    <TableCell>{r.propertyId}</TableCell>
                    <TableCell>{r.assetNumber}</TableCell>
                    <TableCell>{r.owner}</TableCell>
                    <TableCell>{r.address}</TableCell>
                    <TableCell>{r.propertyType}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained">Download</Button>
                        <Button size="small" variant="outlined">View</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Box>
 
      {/* bottom strip, matches the reference footer bar */}
      <Box sx={{ height: 40, bgcolor: "#e0e3e8", mt: 4 }} />
    </Box>
  );
}