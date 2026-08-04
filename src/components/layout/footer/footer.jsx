import { Box, Typography, Divider } from "@mui/material";

const badges = [
  { icon: "🏛️", label: "Govt. of Karnataka" },
  { icon: "💻", label: "NIC" },
  { icon: "🇮🇳", label: "Digital India" },
  { icon: "🔒", label: "SSL Secured" },
];

const footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{ mt: "auto", bgcolor: "#0F172A", px: 3, py: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, pb: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Box sx={{ display: "flex", gap: 2.5, flexWrap: "wrap" }}>
          {badges.map((b) => (
            <Box key={b.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
              <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                {b.icon}
              </Box>
              <Typography sx={{ fontSize: 9, color: "#334155", letterSpacing: 0.3 }}>{b.label}</Typography>
            </Box>
          ))}
        </Box>

        <Typography sx={{ fontSize: 11, color: "#334155", textAlign: "right", lineHeight: 1.7 }}>
          Best viewed in Chrome v87+ · Firefox v83+ · Edge v87+<br />
          Screen resolution: 1280×800 to 1920×1080
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center", fontSize: 11.5, color: "#334155", lineHeight: 1.9, mt: 2 }}>
        e-Swathu · Rural Development &amp; Panchayat Raj Department, Government of Karnataka
        <br />
        Designed, Developed and Hosted by:{" "}
        <Box component="span" sx={{ color: "#475569" }}>Centre for e-Governance (CeG)</Box> &amp;{" "}
        <Box component="span" sx={{ color: "#475569" }}>National Informatics Centre (NIC)</Box>
        <br />
        © {year} Government of Karnataka · All Rights Reserved · Privacy Policy · Disclaimer · Accessibility · Site Map · Contact Us
      </Box>
    </Box>
  );
};

export default footer;