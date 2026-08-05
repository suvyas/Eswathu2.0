import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios";
import {
  Box, Grid, FormControl, Select, MenuItem, TextField, Button, Tabs, Tab,
  Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack, Typography
} from "@mui/material";

const EP = {
  DISTRICTS: "PropertyList/GetDistricts",
  BLOCKS: "PropertyList/GetBlocks",
  GPS: "PropertyList/GetGPs",
  VILLAGES: "PropertyList/GetVillages",
  LIST: "/PropertyList/GetP2Data",
  BY_PROPERTY_ID: "/PropertyList/GetPropertyDataByPropertyId",
};

const pick = (obj, ...keys) => { for (const k of keys) if (obj?.[k] != null) return obj[k]; return ""; };

// tolerant extractor: handles stringified JSON and different DataSet table-name casings
const extractRows = (data) => {
  let d = data;
  if (typeof d === "string") {
    try { d = JSON.parse(d); } catch { return []; }
  }
  if (Array.isArray(d)) return d;
  return d?.Table || d?.table || d?.Table1 || [];
};

function Row({ label, children }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Grid container alignItems="center" spacing={1} wrap="nowrap">
        <Grid sx={{ minWidth: 130 }}>
          <Typography fontSize={16}>{label} <span style={{ color: "#d32f2f" }}>*</span></Typography>
        </Grid>
        <Grid size="grow">{children}</Grid>
      </Grid>
    </Grid>
  );
}

export default function PropertyList() {
  const navigate = useNavigate();
  const isLoggedIn = () => sessionStorage.getItem("isLoggedIn") === "true";

  const [tab, setTab] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [gps, setGps] = useState([]);
  const [villages, setVillages] = useState([]);
  const [f, setF] = useState({ district: "", block: "", gp: "", village: "" });
  const [propertyId, setPropertyId] = useState("");
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState(false);
  const [allRows, setAllRows] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    axiosInstance.get(EP.DISTRICTS)
      .then(r => setDistricts(r.data || []))
      .catch(e => console.error("districts FAILED:", e.response?.status, e.response?.data));
  }, []);

  const onDistrict = async (v) => {
    setF({ ...f, district: v, block: "", gp: "", village: "" });
    setBlocks([]); setGps([]); setVillages([]); setRows([]); setAllRows([]);
    if (v) {
      try {
        const r = await axiosInstance.get(EP.BLOCKS, { params: { districtCode: v } });
        setBlocks(r.data || []);
      } catch (e) { console.error("blocks FAILED:", e.response?.status, e.response?.data); }
    }
  };
  const onBlock = async (v) => {
    setF({ ...f, block: v, gp: "", village: "" });
    setGps([]); setVillages([]); setRows([]); setAllRows([]);
    if (v) {
      try {
        const r = await axiosInstance.get(EP.GPS, { params: { districtCode: f.district, blockCode: v } });
        setGps(r.data || []);
      } catch (e) { console.error("gps FAILED:", e.response?.status, e.response?.data); }
    }
  };
  const onGp = async (v) => {
    setF({ ...f, gp: v, village: "" });
    setVillages([]); setRows([]); setAllRows([]);
    if (v) {
      try {
        const r = await axiosInstance.get(EP.VILLAGES, { params: { districtCode: f.district, blockCode: f.block, gpCode: v } });
        setVillages(r.data || []);
      } catch (e) { console.error("villages FAILED:", e.response?.status, e.response?.data); }
    }
  };
  const onVillage = async (v) => {
    setF({ ...f, village: v });
    setErr("");
    setSearched(true);
    try {
      const r = await axiosInstance.get(EP.LIST, { params: { gpCode: f.gp, villageCode: v } });
      const data = extractRows(r.data);
      setAllRows(data);
      setRows(data);
    } catch (e) { console.error("propertyList FAILED:", e.response?.status, e.response?.data); }
  };

  const searchByPropertyId = async () => {
    setErr("");
    if (!/^\d{18}$/.test(propertyId)) return setErr("Please enter a valid 18 digit Property ID");
    setSearched(true);
    try {
      const r = await axiosInstance.get(EP.BY_PROPERTY_ID, { params: { propertyId } });
      console.log("propertyId raw response:", r.data);
      const data = extractRows(r.data);
      setAllRows(data);
      setRows(data);
    } catch (e) {
      console.error("propertyId search FAILED:", e.response?.status, e.response?.data);
      setErr("Error fetching property");
    }
  };

  const reset = () => {
    setF({ district: "", block: "", gp: "", village: "" });
    setPropertyId("");
    setBlocks([]); setGps([]); setVillages([]); setRows([]); setAllRows([]); setErr(""); setSearched(false);
  };

  const changeTab = (_, v) => { setTab(v); reset(); };

  const goLogin = (pid) =>
    navigate("/login", { state: { from: "/propertylist", propertyId: pid, districtCode: f.district } });

  const handleLoginClick = (r) => isLoggedIn()
    ? navigate("/citizen-data-entry", { state: { propertyId: r.PropertyId } })
    : goLogin(r.PropertyId);

  const handleObjectClick = (r) => isLoggedIn()
    ? navigate("/objection-application", { state: { propertyId: r.PropertyId } })
    : goLogin(r.PropertyId);

  const handlePrint = (r, action) => {
    if (action === "DRAFT") navigate("/citizen-draft-print", { state: { propertyId: r.PropertyId } });
    else if (action === "PREVIOUS") navigate("/citizen-previous-print", { state: { documentNo: r.DocumentNo } });
    else navigate("/payment", { state: { propertyId: r.PropertyId, gpCode: r.gpcode, villageCode: r.villagecode } });
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", px: 3, py: 3 }}>
      <Tabs value={tab} onChange={changeTab} sx={{ mb: 3 }}>
        <Tab label="By Property ID" />
        <Tab label="By Location" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2.5} alignItems="center">
          <Row label="Property ID :">
            <TextField
              fullWidth size="small"
              value={propertyId}
              onChange={e => setPropertyId(e.target.value.replace(/\D/g, "").slice(0, 18))}
              inputProps={{ inputMode: "numeric", maxLength: 18 }}
            />
          </Row>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Button variant="contained" onClick={searchByPropertyId}>Search</Button>
          </Grid>
        </Grid>
      )}

      {tab === 1 && (
        <>
          <Grid container spacing={2.5}>
            <Row label="District :">
              <FormControl fullWidth size="small">
                <Select displayEmpty value={f.district} onChange={e => onDistrict(e.target.value)}>
                  <MenuItem value="">--Select--</MenuItem>
                  {districts.map(d => (
                    <MenuItem key={pick(d, "DistrictCode", "districtcode")} value={pick(d, "DistrictCode", "districtcode")}>
                      {pick(d, "DistrictName_EN", "DistrictName", "districtname_EN", "districtname")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Row>
            <Row label="Taluk :">
              <FormControl fullWidth size="small">
                <Select displayEmpty value={f.block} onChange={e => onBlock(e.target.value)} disabled={!f.district}>
                  <MenuItem value="">--Select--</MenuItem>
                  {blocks.map(b => (
                    <MenuItem key={b.blockcode} value={b.blockcode}>{b.blockname_EN || b.blockname}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Row>
            <Row label="Panchayath :">
              <FormControl fullWidth size="small">
                <Select displayEmpty value={f.gp} onChange={e => onGp(e.target.value)} disabled={!f.block}>
                  <MenuItem value="">--Select--</MenuItem>
                  {gps.map(g => (
                    <MenuItem key={pick(g, "GPCode", "gpcode", "GpCode")} value={pick(g, "GPCode", "gpcode", "GpCode")}>
                      {pick(g, "PanchayatName_EN", "panchayatname_EN", "PanchayatName", "panchayatname", "GPName_EN", "gpname_EN")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Row>
            <Row label="Village :">
              <FormControl fullWidth size="small">
                <Select displayEmpty value={f.village} onChange={e => onVillage(e.target.value)} disabled={!f.gp}>
                  <MenuItem value="">--Select--</MenuItem>
                  {villages.map(v => (
                    <MenuItem key={pick(v, "VillageCode", "villagecode")} value={pick(v, "VillageCode", "villagecode")}>
                      {pick(v, "VillageName_EN", "villagename_EN", "VillageName", "villagename")}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Row>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={reset}>Reset</Button>
          </Stack>
        </>
      )}

      {err && <Typography color="error" sx={{ mt: 1 }}>{err}</Typography>}

      {searched && (
        <Paper sx={{ mt: 3, border: "1px solid #e0e0e0" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Gram Panchayat", "Village", "Property ID", "Asset Number", "Owner Name",
                  "Address", "Property Type", "Download",
                  "Submit Information for Final e-Khata / Correction", "Object not to issue Final e-Khata",
                ].map(h => (
                  <TableCell key={h} sx={{ bgcolor: "#0F4C81", color: "#fff", fontWeight: 700 }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} align="center">No Records Found</TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row.PanchayatName}</TableCell>
                    <TableCell>{row.VillageName}</TableCell>
                    <TableCell>{row.PropertyId}</TableCell>
                    <TableCell>{row.AssetNumber}</TableCell>
                    <TableCell>{row.OwnerName}</TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>{row.Address}</TableCell>
                    <TableCell>{row.PropertyType}</TableCell>
                    <TableCell>
                      <Button size="small" variant="text" onClick={() => handlePrint(row, "DRAFT")}>
                        {row.FINALDRAFTEKHATA}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="contained" onClick={() => handleLoginClick(row)}>CLICK HERE</Button>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleObjectClick(row)}>CLICK HERE</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}