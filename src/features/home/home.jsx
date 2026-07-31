
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   SCOPED CSS  (prefixed lp- so it never leaks into MUI)
═══════════════════════════════════════════════════════ */
const CSS = `
/* ── RESET & ROOT ── */
.lp-root *{box-sizing:border-box;margin:0;padding:0}
.lp-root{
  font-family:'Segoe UI',Inter,system-ui,sans-serif;
  background:#EEF5FF;color:#1E293B;min-height:100vh;
  --blue1:#1E3A8A;
  --blue2:#1D4ED8;
  --blue3:#2563EB;
  --blue4:#3B82F6;
  --blue5:#60A5FA;
  --blueLight:#EEF5FF;
  --blueBg:#DBEAFE;
  --gold:#FFC72C;
  --goldDark:#E6A800;
  --goldLight:#FFF4CC;
  --white:#FFFFFF;
  --text:#1E293B;
  --muted:#64748B;
  --border:#BFDBFE;
  --border2:#DBEAFE;
  --shadow:0 4px 24px rgba(30,58,138,.13);
  --r:10px;
}

/* ── ACCESSIBILITY BAR ── */
.lp-acc{
  background:#1E3A8A;padding:5px 24px;
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;gap:4px;
}
.lp-acc-l{font-size:11px;color:rgba(255,255,255,.55);letter-spacing:.2px}
.lp-acc-r{display:flex;align-items:center;gap:4px;flex-wrap:wrap}
.lp-acc-btn{
  background:transparent;border:1px solid rgba(255,255,255,.25);
  color:rgba(255,255,255,.75);padding:2px 9px;border-radius:3px;
  font-size:11px;cursor:pointer;font-family:inherit;transition:.15s;
}
.lp-acc-btn:hover{background:rgba(255,255,255,.15);color:#fff}

/* ── GOVT HEADER ── */
.lp-govhdr{
  background:#fff;border-bottom:5px solid #2563EB;
  padding:10px 24px;
}
.lp-govhdr-in{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:80px 1fr 120px;
  align-items:center;gap:12px;
}
.lp-emb{display:flex;flex-direction:column;align-items:center;gap:3px}
.lp-emb-cap{font-size:8px;color:#666;text-align:center;line-height:1.3;max-width:76px}
.lp-brand{text-align:center}
.lp-brand-dept{font-size:10.5px;color:#64748B;margin-bottom:2px;letter-spacing:.2px}
.lp-brand-name{
  font-size:clamp(26px,5vw,42px);font-weight:900;
  color:#1D4ED8;letter-spacing:-1.2px;line-height:1;
}
.lp-brand-kn{
  font-size:clamp(12px,2.5vw,16px);font-weight:700;
  color:#1E3A8A;margin-top:4px;
}
.lp-brand-sub{font-size:10.5px;color:#64748B;margin-top:3px}
.lp-hdr-right{display:flex;align-items:center;gap:10px;justify-content:flex-end}
.lp-di-badge{display:flex;flex-direction:column;align-items:center;gap:3px}
.lp-di-flag{
  width:42px;height:28px;border-radius:4px;border:1px solid #e2e8f0;overflow:hidden;
  background:linear-gradient(180deg,#FF9933 33.3%,#fff 33.3%,#fff 66.6%,#138808 66.6%);
  display:flex;align-items:center;justify-content:center;position:relative;
}
.lp-di-chakra{
  width:12px;height:12px;border-radius:50%;
  border:1.5px solid #000080;position:absolute;
}
.lp-di-text{font-size:8.5px;color:#334155;font-weight:700;letter-spacing:.4px;text-align:center}

/* ── MINISTER STRIP ── */
.lp-min{
  background:linear-gradient(130deg,#1E3A8A 0%,#1D4ED8 40%,#2563EB 70%,#3B82F6 100%);
  position:relative;overflow:hidden;
}
.lp-min::before{
  content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px);
  background-size:22px 22px;pointer-events:none;
}
.lp-min-in{
  max-width:1280px;margin:0 auto;
  display:flex;align-items:stretch;flex-wrap:wrap;position:relative;z-index:1;
}
.lp-mp{
  display:flex;align-items:center;gap:14px;
  padding:14px 28px;background:rgba(0,0,0,.14);
  flex-shrink:0;min-width:210px;
}
.lp-mp.left{border-right:1px solid rgba(255,255,255,.12)}
.lp-mp.right{border-left:1px solid rgba(255,255,255,.12)}
.lp-mp-img{
  width:78px;height:93px;border-radius:8px;
  border:3px solid #FFC72C;
  box-shadow:0 6px 20px rgba(0,0,0,.3);
  overflow:hidden;flex-shrink:0;
}
.lp-mp-name{font-size:12.5px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:3px}
.lp-mp-role{font-size:10.5px;color:rgba(255,255,255,.6);line-height:1.45}
.lp-mc{
  flex:1;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:16px 24px;text-align:center;gap:9px;
}
.lp-mc-tag{
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);
  color:rgba(255,255,255,.82);font-size:10.5px;padding:4px 16px;
  border-radius:20px;letter-spacing:.5px;font-weight:600;
}
.lp-mc-title{
  font-size:clamp(16px,3vw,22px);font-weight:800;
  color:#FFC72C;line-height:1.1;
}
.lp-mc-sub{font-size:11px;color:rgba(255,255,255,.48)}
.lp-mc-stats{display:flex;gap:24px;flex-wrap:wrap;justify-content:center}
.lp-mst strong{display:block;font-size:18px;font-weight:900;color:#FFC72C;line-height:1}
.lp-mst span{font-size:10px;color:rgba(255,255,255,.45);margin-top:2px;display:block}

/* ── STICKY NAV ── */
.lp-nav{
  background:#1E3A8A;position:sticky;top:0;z-index:999;
  box-shadow:0 3px 14px rgba(30,58,138,.4);
}
.lp-nav-in{
  max-width:1280px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 24px;
}
.lp-nav-links{display:flex;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.lp-nav-links::-webkit-scrollbar{display:none}
.lp-nav-links a{
  color:rgba(255,255,255,.78);font-size:13px;padding:14px 15px;
  display:block;cursor:pointer;text-decoration:none;
  border-bottom:3px solid transparent;transition:.15s;
  white-space:nowrap;font-weight:500;
}
.lp-nav-links a:hover,.lp-nav-links a.on{
  color:#fff;background:rgba(255,255,255,.08);
  border-bottom-color:#FFC72C;
}
.lp-nav-right{display:flex;gap:8px;align-items:center;padding:8px 0;flex-shrink:0}
.lp-nbtn{
  padding:7px 16px;border-radius:6px;font-size:12.5px;
  font-weight:700;cursor:pointer;transition:.15s;
  white-space:nowrap;font-family:inherit;border:none;
}
.lp-nbtn.dept{
  background:rgba(255,255,255,.12);color:#fff;
  border:1px solid rgba(255,255,255,.28);
}
.lp-nbtn.dept:hover{background:rgba(255,255,255,.22)}
.lp-nbtn.citizen{
  background:#FFC72C;color:#1E3A8A;
  box-shadow:0 2px 10px rgba(255,199,44,.35);
}
.lp-nbtn.citizen:hover{background:#FFD95A;transform:translateY(-1px);box-shadow:0 4px 14px rgba(255,199,44,.45)}
.lp-burger{
  display:none;background:transparent;
  border:1px solid rgba(255,255,255,.28);color:#fff;
  padding:7px 12px;border-radius:5px;cursor:pointer;font-size:18px;
}
.lp-mob-nav{display:none;background:#1D4ED8;flex-direction:column}
.lp-mob-nav.open{display:flex}
.lp-mob-nav a{
  display:block;padding:13px 24px;
  color:rgba(255,255,255,.85);font-size:14px;
  text-decoration:none;border-bottom:1px solid rgba(255,255,255,.07);
  cursor:pointer;font-weight:500;
}
.lp-mob-nav a:hover{background:rgba(0,0,0,.15);color:#fff}
.lp-mob-btns{display:flex;gap:8px;padding:12px 16px}
.lp-mob-btns .lp-nbtn{flex:1;text-align:center}

/* ── TICKER ── */
.lp-ticker{
  background:#FFF4CC;border-bottom:2px solid #FFC72C;
  padding:7px 24px;display:flex;align-items:center;gap:12px;overflow:hidden;
}
.lp-tick-lbl{
  background:#1E3A8A;color:#fff;font-size:10px;font-weight:700;
  padding:3px 10px;border-radius:3px;white-space:nowrap;
  letter-spacing:.6px;flex-shrink:0;
}
.lp-tick-txt{
  font-size:12px;color:#713F12;white-space:nowrap;font-weight:500;
  animation:lp-scroll 30s linear infinite;
}
@keyframes lp-scroll{from{transform:translateX(100vw)}to{transform:translateX(-110%)}}

/* ── HERO ── */
.lp-hero{
  background:linear-gradient(150deg,#EEF5FF 0%,#DBEAFE 50%,#BFDBFE 100%);
  padding:56px 24px;position:relative;overflow:hidden;
}
.lp-hero-mesh{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);
  background-size:36px 36px;pointer-events:none;
}
.lp-hero-glow{
  position:absolute;width:480px;height:480px;border-radius:50%;
  background:radial-gradient(circle,rgba(37,99,235,.12),transparent 70%);
  top:-100px;right:-80px;pointer-events:none;
}
.lp-hero-glow2{
  position:absolute;width:320px;height:320px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,199,44,.1),transparent 70%);
  bottom:-60px;left:-40px;pointer-events:none;
}
.lp-hero-in{max-width:1280px;margin:0 auto;text-align:center;position:relative;z-index:1}
.lp-hero-badge{
  display:inline-flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,#1D4ED8,#3B82F6);
  color:#fff;padding:7px 18px;border-radius:999px;
  font-size:12.5px;font-weight:600;letter-spacing:.3px;
  margin-bottom:20px;
  box-shadow:0 6px 20px rgba(29,78,216,.28);
}
.lp-h-dot{
  width:8px;height:8px;background:#FFC72C;border-radius:50%;
  animation:lp-pulse 2.2s ease infinite;flex-shrink:0;
}
@keyframes lp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.75)}}
.lp-hero h1{
  font-size:clamp(26px,5.5vw,50px);font-weight:900;
  color:#1E293B;line-height:1.08;margin-bottom:12px;letter-spacing:-1.5px;
}
.lp-hero h1 span{color:#2563EB}
.lp-hero-kn{
  font-size:clamp(13px,2.5vw,17px);font-weight:600;
  color:#64748B;margin-bottom:14px;font-style:italic;
}
.lp-hero-desc{
  font-size:14px;color:#475569;line-height:1.78;
  max-width:600px;margin:0 auto 30px;
}
/* SEARCH */
.lp-srch{
  background:#fff;border:1.5px solid #BFDBFE;border-radius:10px;
  padding:6px 6px 6px 16px;display:flex;align-items:center;gap:8px;
  max-width:620px;margin:0 auto;
  box-shadow:0 4px 20px rgba(37,99,235,.1);
  flex-wrap:wrap;
}
.lp-srch input{
  flex:1;min-width:150px;background:transparent;border:none;outline:none;
  color:#1E293B;font-size:13.5px;padding:8px 0;font-family:inherit;
}
.lp-srch input::placeholder{color:#94A3B8}
.lp-srch select{
  background:#EEF5FF;border:1.5px solid #BFDBFE;color:#1E293B;
  border-radius:6px;padding:8px 10px;font-size:12.5px;
  outline:none;cursor:pointer;font-family:inherit;
}
.lp-srch-btn{
  background:linear-gradient(135deg,#1D4ED8,#2563EB);
  color:#fff;border:none;padding:10px 22px;border-radius:7px;
  font-size:13.5px;font-weight:800;cursor:pointer;
  white-space:nowrap;transition:.18s;font-family:inherit;
  box-shadow:0 3px 12px rgba(37,99,235,.35);
}
.lp-srch-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,.45)}
.lp-srch-note{font-size:11px;color:#94A3B8;margin-top:10px;text-align:center}

/* ── STATS ── */
.lp-stats{background:linear-gradient(135deg,#1E3A8A,#1D4ED8);padding:22px 24px}
.lp-stats-in{
  display:grid;grid-template-columns:repeat(4,1fr);
  max-width:1280px;margin:0 auto;
}
.lp-st{text-align:center;padding:10px 16px;border-right:1px solid rgba(255,255,255,.1)}
.lp-st:last-child{border-right:none}
.lp-st-n{font-size:28px;font-weight:900;color:#FFC72C;line-height:1}
.lp-st-l{font-size:11px;color:rgba(255,255,255,.5);margin-top:3px}

/* ── SECTION COMMONS ── */
.lp-eye{
  font-size:10.5px;font-weight:700;color:#1D4ED8;
  letter-spacing:1.2px;text-transform:uppercase;margin-bottom:7px;
  display:flex;align-items:center;gap:8px;
}
.lp-eye::before{
  content:'';width:24px;height:3px;
  background:linear-gradient(90deg,#1D4ED8,#FFC72C);
  border-radius:3px;flex-shrink:0;
}
.lp-sec-h{
  font-size:clamp(20px,3vw,26px);font-weight:800;
  color:#1E293B;margin-bottom:14px;line-height:1.2;letter-spacing:-.3px;
}

/* ── ABOUT ── */
.lp-about{background:#fff;border-bottom:1px solid #DBEAFE;padding:56px 24px}
.lp-about-in{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:start;
}
.lp-about-body p{font-size:14px;color:#334155;line-height:1.8;margin-bottom:13px}
.lp-feats{display:flex;flex-direction:column;gap:13px}
.lp-feat{
  display:flex;gap:14px;align-items:flex-start;
  background:#EEF5FF;border:1.5px solid #DBEAFE;
  border-left:4px solid #2563EB;border-radius:10px;
  padding:15px 16px;transition:.18s;cursor:default;
}
.lp-feat:hover{border-left-color:#FFC72C;box-shadow:0 4px 18px rgba(37,99,235,.1);transform:translateX(4px)}
.lp-feat-ico{font-size:22px;flex-shrink:0;margin-top:2px}
.lp-feat-bd h4{font-size:13.5px;font-weight:700;color:#1E293B;margin-bottom:4px}
.lp-feat-bd p{font-size:12.5px;color:#64748B;line-height:1.6}

/* ── SERVICES ── */
.lp-svc{padding:56px 24px;max-width:1280px;margin:0 auto}
.lp-sec-hdr{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:10px}
.lp-see-all{font-size:13px;color:#2563EB;font-weight:700;text-decoration:none;border-bottom:1px solid #2563EB;cursor:pointer}
/* tabs */
.lp-tabs{
  display:flex;gap:0;border:1.5px solid #BFDBFE;
  border-radius:8px;overflow:hidden;width:fit-content;
  margin-bottom:24px;flex-wrap:wrap;
}
.lp-tab{
  padding:9px 22px;font-size:13px;font-weight:500;color:#64748B;
  cursor:pointer;background:#fff;border-right:1.5px solid #BFDBFE;
  transition:.15s;font-family:inherit;border-top:none;border-bottom:none;border-left:none;
}
.lp-tab:last-child{border-right:none}
.lp-tab.on{background:#1D4ED8;color:#fff;font-weight:700}
.lp-tab:hover:not(.on){background:#EEF5FF;color:#1E293B}
/* cards */
.lp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lp-card{
  background:#fff;border:1.5px solid #DBEAFE;border-radius:12px;
  padding:22px 18px;cursor:pointer;transition:.2s;
  position:relative;overflow:hidden;
}
.lp-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#2563EB,#FFC72C);
  transform:scaleX(0);transition:.22s;transform-origin:left;
}
.lp-card:hover{border-color:#BFDBFE;box-shadow:0 8px 28px rgba(37,99,235,.12);transform:translateY(-3px)}
.lp-card:hover::before{transform:scaleX(1)}
.lp-card.hot{background:linear-gradient(160deg,#EEF5FF 0%,#fff 100%);border-color:#BFDBFE}
.lp-card-ico{
  width:48px;height:48px;border-radius:12px;
  background:#EEF5FF;border:1.5px solid #BFDBFE;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;margin-bottom:13px;
}
.lp-card.hot .lp-card-ico{background:#FFF4CC;border-color:#FFC72C}
.lp-card-title{font-size:14.5px;font-weight:700;color:#1E293B;margin-bottom:5px}
.lp-card-desc{font-size:12.5px;color:#64748B;line-height:1.65;margin-bottom:13px}
.lp-card-link{
  font-size:12.5px;color:#2563EB;font-weight:700;
  display:inline-flex;align-items:center;gap:5px;
}
.lp-card-arr{transition:transform .18s;display:inline-block}
.lp-card:hover .lp-card-arr{transform:translateX(4px)}

/* ── NOTICES ── */
.lp-notices{
  padding:0 24px 56px;max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1fr;gap:20px;
}
.lp-panel{
  background:#fff;border:1.5px solid #DBEAFE;
  border-radius:12px;overflow:hidden;box-shadow:var(--shadow);
}
.lp-ph{
  background:linear-gradient(135deg,#1E3A8A,#2563EB);
  padding:13px 20px;display:flex;align-items:center;gap:9px;
}
.lp-ph h4{font-size:13.5px;font-weight:700;color:#fff;margin:0}
.lp-ph-badge{
  background:#FFC72C;color:#1E3A8A;font-size:10px;
  padding:2px 9px;border-radius:20px;font-weight:800;margin-left:auto;
}
.lp-pr{
  padding:11px 18px;border-bottom:1.5px solid #DBEAFE;
  display:flex;gap:10px;align-items:flex-start;cursor:pointer;transition:.15s;
}
.lp-pr:last-child{border-bottom:none}
.lp-pr:hover{background:#EEF5FF}
.lp-pd{width:7px;height:7px;border-radius:50%;background:#FFC72C;margin-top:6px;flex-shrink:0}
.lp-pt{font-size:12.5px;color:#64748B;line-height:1.55}
.lp-pt strong{color:#1E293B;font-weight:600;display:block;font-size:13px;margin-bottom:1px}

/* ── PORTALS ── */
.lp-portals{background:linear-gradient(135deg,#1E3A8A,#1D4ED8);padding:32px 24px}
.lp-portals-in{max-width:1280px;margin:0 auto}
.lp-portals-lbl{
  font-size:11px;font-weight:700;color:rgba(255,255,255,.42);
  text-transform:uppercase;letter-spacing:.9px;margin-bottom:16px;
}
.lp-portals-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.lp-pc{
  background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.12);
  border-radius:12px;padding:18px 12px;text-align:center;cursor:pointer;transition:.2s;
}
.lp-pc:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.28);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.2)}
.lp-pc-e{font-size:28px;margin-bottom:8px;display:block}
.lp-pc-n{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
.lp-pc-d{font-size:11px;color:rgba(255,255,255,.45);line-height:1.4}

/* ── HELP ── */
.lp-help{
  background:#EEF5FF;border-top:2px solid #BFDBFE;
  border-bottom:1px solid #DBEAFE;padding:24px;
}
.lp-help-in{
  max-width:1280px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  gap:16px;flex-wrap:wrap;
}
.lp-help-txt h4{font-size:16px;font-weight:800;color:#1E293B;margin-bottom:5px}
.lp-help-txt p{font-size:13.5px;color:#64748B}
.lp-help-txt strong{color:#1D4ED8}
.lp-help-btns{display:flex;gap:10px;flex-wrap:wrap}
.lp-hbtn{padding:10px 22px;border-radius:7px;font-size:13.5px;font-weight:700;cursor:pointer;transition:.15s;font-family:inherit}
.lp-hbtn.p{background:#1D4ED8;color:#fff;border:none;box-shadow:0 3px 12px rgba(29,78,216,.28)}
.lp-hbtn.p:hover{background:#1E3A8A;transform:translateY(-1px)}
.lp-hbtn.s{background:transparent;border:1.5px solid #BFDBFE;color:#64748B}
.lp-hbtn.s:hover{border-color:#2563EB;color:#2563EB}

/* ── FOOTER ── */
.lp-footer{background:#0F172A;padding:24px}
.lp-ft-top{
  max-width:1280px;margin:0 auto;
  display:flex;align-items:center;justify-content:space-between;
  flex-wrap:wrap;gap:14px;
  padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:16px;
}
.lp-ft-logos{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.lp-fl{display:flex;flex-direction:column;align-items:center;gap:4px}
.lp-fl-badge{
  width:38px;height:38px;border-radius:8px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  display:flex;align-items:center;justify-content:center;font-size:16px;
}
.lp-fl span{font-size:9px;color:#334155;letter-spacing:.3px}
.lp-ft-txt{max-width:1280px;margin:0 auto;font-size:11.5px;color:#334155;line-height:1.9;text-align:center}
.lp-ft-txt a{color:#475569;text-decoration:none}
.lp-ft-txt a:hover{color:#60A5FA}

/* ── FADE IN ── */
.lp-fade{opacity:0;transform:translateY(18px);transition:opacity .5s,transform .5s}
.lp-fade.lp-in{opacity:1;transform:none}

/* ── RESPONSIVE ── */
@media(max-width:960px){
  .lp-about-in,.lp-notices{grid-template-columns:1fr}
  .lp-portals-grid{grid-template-columns:repeat(2,1fr)}
  .lp-grid{grid-template-columns:repeat(2,1fr)}
  .lp-govhdr-in{grid-template-columns:64px 1fr 96px;gap:8px}
  .lp-min-in{flex-direction:column}
  .lp-mp.left,.lp-mp.right{border:none;border-bottom:1px solid rgba(255,255,255,.1);min-width:unset;width:100%}
}
@media(max-width:700px){
  .lp-govhdr-in{grid-template-columns:54px 1fr 80px;gap:6px}
  .lp-brand-sub{display:none}
  .lp-nav-links,.lp-nav-right{display:none}
  .lp-burger{display:block}
  .lp-stats-in{grid-template-columns:repeat(2,1fr)}
  .lp-st:nth-child(2){border-right:none}
  .lp-st:nth-child(3){border-right:1px solid rgba(255,255,255,.1)}
  .lp-tabs{width:100%}
  .lp-tab{flex:1;text-align:center;padding:9px 8px;font-size:12px}
}
@media(max-width:500px){
  .lp-grid{grid-template-columns:1fr}
  .lp-portals-grid{grid-template-columns:repeat(2,1fr)}
  .lp-srch{flex-direction:column;padding:12px}
  .lp-srch input,.lp-srch select,.lp-srch-btn{width:100%}
  .lp-help-in{flex-direction:column;text-align:center}
  .lp-help-btns{width:100%;justify-content:center}
  .lp-hbtn{flex:1;text-align:center}
}
`;

/* ─────────────────────────────────────
   EMBEDDED SVG COMPONENTS
───────────────────────────────────── */
const IndiaEmblem = () => (
  <svg width="60" height="70" viewBox="0 0 66 76" fill="none">
    <rect x="25" y="65" width="16" height="9" rx="2" fill="#9a8040"/>
    <rect x="21" y="59" width="24" height="8" rx="1" fill="#b89a50"/>
    <rect x="13" y="43" width="40" height="17" rx="2" fill="#003087"/>
    <circle cx="33" cy="51.5" r="5.5" fill="none" stroke="#d4a017" strokeWidth="1.3"/>
    <circle cx="33" cy="51.5" r="1.6" fill="#d4a017"/>
    <line x1="33" y1="46" x2="33" y2="57" stroke="#d4a017" strokeWidth=".75"/>
    <line x1="27.5" y1="51.5" x2="38.5" y2="51.5" stroke="#d4a017" strokeWidth=".75"/>
    <line x1="29.6" y1="47.6" x2="36.4" y2="55.4" stroke="#d4a017" strokeWidth=".75"/>
    <line x1="36.4" y1="47.6" x2="29.6" y2="55.4" stroke="#d4a017" strokeWidth=".75"/>
    <ellipse cx="23" cy="37" rx="9.5" ry="8" fill="#c8a040"/>
    <ellipse cx="43" cy="37" rx="9.5" ry="8" fill="#c8a040"/>
    <circle cx="17" cy="28" r="7.5" fill="#a88030"/>
    <circle cx="49" cy="28" r="7.5" fill="#a88030"/>
    <circle cx="17" cy="28" r="9" fill="none" stroke="#7a6018" strokeWidth="1.5"/>
    <circle cx="49" cy="28" r="9" fill="none" stroke="#7a6018" strokeWidth="1.5"/>
    <circle cx="15" cy="27" r="2.5" fill="#d4b850"/>
    <circle cx="47" cy="27" r="2.5" fill="#d4b850"/>
    <ellipse cx="33" cy="19" rx="5.5" ry="3.5" fill="#c8a040"/>
    <rect x="30" y="13" width="6" height="7" fill="#c8a040"/>
    <text x="33" y="75" textAnchor="middle" fontSize="5.2" fill="#555" fontFamily="serif">सत्यमेव जयते</text>
  </svg>
);

const KarnatakaEmblem = () => (
  <svg width="60" height="70" viewBox="0 0 66 76" fill="none">
    <path d="M11 9 L55 9 L55 48 Q33 68 11 48 Z" fill="#8B0000"/>
    <path d="M14 12 L52 12 L52 47 Q33 64 14 47 Z" fill="#6B0000"/>
    <ellipse cx="33" cy="33" rx="11" ry="7.5" fill="rgba(255,255,255,.92)"/>
    <circle cx="20" cy="24" r="6.5" fill="rgba(255,255,255,.92)"/>
    <circle cx="46" cy="24" r="6.5" fill="rgba(255,255,255,.92)"/>
    <path d="M14 23 L9 21 L13 25 Z" fill="#c8a040"/>
    <path d="M52 23 L57 21 L53 25 Z" fill="#c8a040"/>
    <path d="M14 33 Q5 25 8 14 Q15 27 21 29Z" fill="rgba(255,255,255,.68)"/>
    <path d="M52 33 Q61 25 58 14 Q51 27 45 29Z" fill="rgba(255,255,255,.68)"/>
    <path d="M28 41 Q33 54 38 41" stroke="rgba(255,255,255,.65)" strokeWidth="2.2" fill="none"/>
    <ellipse cx="6" cy="28" rx="5.5" ry="7" fill="#c8a040"/>
    <circle cx="6" cy="20" r="5.5" fill="#a88030"/>
    <circle cx="6" cy="20" r="6.5" fill="none" stroke="#8a6820" strokeWidth="1.3"/>
    <ellipse cx="60" cy="28" rx="5.5" ry="7" fill="#c8a040"/>
    <circle cx="60" cy="20" r="5.5" fill="#a88030"/>
    <circle cx="60" cy="20" r="6.5" fill="none" stroke="#8a6820" strokeWidth="1.3"/>
    <rect x="11" y="58" width="44" height="9" rx="2.5" fill="#c8a040"/>
    <text x="33" y="64.5" textAnchor="middle" fontSize="4.2" fill="#5a0000" fontWeight="bold">ಸರ್ವಜನ ಸುಖಿನೋ ಭವಂತು</text>
    <text x="33" y="75" textAnchor="middle" fontSize="5" fill="#555">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</text>
  </svg>
);

const CMPortrait = () => (
  <svg viewBox="0 0 80 96" fill="none" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="lp-cm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1D4ED8"/>
        <stop offset="100%" stopColor="#1E3A8A"/>
      </linearGradient>
    </defs>
    <rect width="80" height="96" fill="url(#lp-cm)"/>
    <path d="M0 96 L0 72 Q12 63 22 60 L40 56 L58 60 Q68 63 80 72 L80 96Z" fill="#0F172A"/>
    <path d="M33 56 L40 63 L47 56 L44 52 L40 60 L36 52Z" fill="#e8e8e8"/>
    <ellipse cx="40" cy="54" rx="9" ry="6.5" fill="#c8a080"/>
    <ellipse cx="40" cy="36" rx="17" ry="19" fill="#c8a080"/>
    <path d="M23 30 Q24 14 40 14 Q56 14 57 30 Q52 22 40 22 Q28 22 23 30Z" fill="#2a1a08"/>
    <path d="M23 32 Q22 36 23 42 Q24 38 25 35Z" fill="#aaa"/>
    <path d="M57 32 Q58 36 57 42 Q56 38 55 35Z" fill="#aaa"/>
    <ellipse cx="23" cy="38" rx="3.5" ry="4.5" fill="#b89070"/>
    <ellipse cx="57" cy="38" rx="3.5" ry="4.5" fill="#b89070"/>
    <ellipse cx="33" cy="37" rx="3.8" ry="3" fill="#1a0800"/>
    <ellipse cx="47" cy="37" rx="3.8" ry="3" fill="#1a0800"/>
    <circle cx="32.5" cy="36.5" r="1.2" fill="#fff"/>
    <circle cx="46.5" cy="36.5" r="1.2" fill="#fff"/>
    <path d="M28 32 Q33 30 37 32" stroke="#1a0800" strokeWidth="1.6" fill="none"/>
    <path d="M43 32 Q47 30 52 32" stroke="#1a0800" strokeWidth="1.6" fill="none"/>
    <path d="M37 42 Q40 47 43 42" stroke="#a07858" strokeWidth="1.1" fill="none"/>
    <path d="M35 46 Q40 48 45 46" stroke="#3a2010" strokeWidth="1.3" fill="none"/>
    <path d="M34 50 Q40 55 46 50" stroke="#8a5830" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M22 60 Q8 68 4 84 L0 84 L0 74Z" fill="#FFC72C" opacity=".4"/>
    <path d="M58 60 Q72 68 76 84 L80 84 L80 74Z" fill="#FFC72C" opacity=".4"/>
  </svg>
);

const MinisterPortrait = () => (
  <svg viewBox="0 0 80 96" fill="none" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="lp-mn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1D4ED8"/>
        <stop offset="100%" stopColor="#1E3A8A"/>
      </linearGradient>
    </defs>
    <rect width="80" height="96" fill="url(#lp-mn)"/>
    <path d="M0 96 L0 72 Q12 63 22 60 L40 56 L58 60 Q68 63 80 72 L80 96Z" fill="#0F172A"/>
    <path d="M33 56 L40 63 L47 56 L44 52 L40 60 L36 52Z" fill="#e8e8e8"/>
    <path d="M38 61 L40 76 L42 61Z" fill="#2563EB"/>
    <ellipse cx="40" cy="54" rx="9" ry="6.5" fill="#b88860"/>
    <ellipse cx="40" cy="36" rx="16" ry="18" fill="#b88860"/>
    <path d="M24 29 Q25 14 40 14 Q55 14 56 29 Q51 22 40 22 Q29 22 24 29Z" fill="#080402"/>
    <ellipse cx="24" cy="38" rx="3" ry="4.5" fill="#a07850"/>
    <ellipse cx="56" cy="38" rx="3" ry="4.5" fill="#a07850"/>
    <ellipse cx="33" cy="37" rx="3.8" ry="3" fill="#080402"/>
    <ellipse cx="47" cy="37" rx="3.8" ry="3" fill="#080402"/>
    <circle cx="32.5" cy="36.5" r="1.2" fill="#fff"/>
    <circle cx="46.5" cy="36.5" r="1.2" fill="#fff"/>
    <path d="M28 32 Q33 29.5 37 32" stroke="#080402" strokeWidth="1.8" fill="none"/>
    <path d="M43 32 Q47 29.5 52 32" stroke="#080402" strokeWidth="1.8" fill="none"/>
    <path d="M37 42 Q40 47 43 42" stroke="#906040" strokeWidth="1.1" fill="none"/>
    <path d="M34 50 Q40 55 46 50" stroke="#7a4828" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M22 60 Q8 68 4 84 L0 84 L0 74Z" fill="#FFC72C" opacity=".45"/>
    <path d="M58 60 Q72 68 76 84 L80 84 L80 74Z" fill="#FFC72C" opacity=".45"/>
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{width:12,height:12}}>
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();

  const [mobNavOpen, setMobNavOpen] = useState(false);
  const [activeTab, setActiveTab]   = useState('All');
  const [searchQ, setSearchQ]       = useState('');
  const [searchD, setSearchD]       = useState('');
  const [activeNav, setActiveNav]   = useState('home');

  /* scroll-fade observer */
  const fadeRefs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('lp-in'); }),
      { threshold: 0.07 }
    );
    fadeRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const addRef = el => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  /* ── DATA ── */
  const serviceTabs = ['All','Documents','Search','Verification','Citizen Services'];

  const serviceCards = [
    { icon:'🔍', title:'Search Property',        desc:'Search by District, Taluk, GP, Village, and Property ID or owner name. Free and instant — no login needed.',  link:'Go to search',       route:'/EswathuSearchProperty',     cat:'Search',          featured:true  },
    { icon:'📄', title:'Download Form 9',         desc:'Download digitally signed Form 9 (Property Register Extract). PDF password is your Property ID.',              link:'Download now',       route:'/download-form9',             cat:'Documents',       featured:true  },
    { icon:'📋', title:'Download Form 11B',       desc:'Get the Demand & Collection Register extract showing tax history and mutation records for your property.',       link:'Download now',       route:'/download-form11b',           cat:'Documents',       featured:false },
    { icon:'✅', title:'Verify Document',          desc:'Verify authenticity of any e-Swathu document by entering certificate number or scanning QR code.',             link:'Verify certificate', route:'/verify-document',            cat:'Verification',    featured:false },
    { icon:'🔄', title:'Track Mutation Status',   desc:'Enter your application number to check status of property transfer / mutation requests at your Gram Panchayat.',link:'Track status',       route:'/track-mutation',             cat:'Verification',    featured:false },
    { icon:'🗺️', title:'Property Map (GIS)',      desc:'View property boundaries on GIS maps. Confirm plot location, survey number, and adjacent land records.',        link:'View on map',        route:'/property-map',               cat:'Search',          featured:false },
    { icon:'🆕', title:'New e-Khata',             desc:'Apply for a new e-Khata for your property.',                                                                    link:'Apply now',          route:'/new-ekhata',                 cat:'Citizen Services',featured:true  },
   { icon: '📄',  title: 'Get e-Khata',  desc: 'Download your issued e-Khata certificate instantly.',link: 'Download', route: '/propertylist',  cat: 'Citizen Services',featured: false,},
   { icon:'⏳', title:'Pending Applications',     desc:'View applications awaiting approval from the concerned officer.',                                               link:'View applications',  route:'/pending-applications',       cat:'Citizen Services',featured:false },
    { icon:'✅', title:'Submitted Applications',   desc:'View all your submitted application history and current status.',                                               link:'View history',       route:'/submitted-applications',     cat:'Citizen Services',featured:false },
    { icon:'↩️', title:'Returned Applications',   desc:'Review applications returned with remarks and take corrective action.',                                         link:'View details',       route:'/returned-applications',      cat:'Citizen Services',featured:false },
    { icon:'🔍', title:'Track Application',        desc:'Track the latest status of any of your property applications.',                                                 link:'Track status',       route:'/track-application',          cat:'Citizen Services',featured:false },
    { icon:'📑', title:'Property Details',         desc:'Search and view detailed property information by ID or owner name.',                                            link:'Search property',    route:'/property-details',           cat:'Citizen Services',featured:false },
    { icon:'🗺️', title:'Property Map',            desc:'View your property location on the GIS map with boundary details.',                                            link:'Open map',           route:'/property-map',               cat:'Citizen Services',featured:false },
    { icon:'📥', title:'Download Certificates',   desc:'Download all approved certificates linked to your property or applications.',                                   link:'Download',           route:'/download-certificates',      cat:'Citizen Services',featured:false },
    { icon:'💳', title:'Payment History',          desc:'View payment receipts and complete payment transaction history.',                                               link:'View payments',      route:'/payment-history',            cat:'Citizen Services',featured:false },
    { icon:'📂', title:'Property Documents',       desc:'View and manage all uploaded property-related documents.',                                                      link:'View documents',     route:'/property-documents',         cat:'Citizen Services',featured:false },
    { icon:'📢', title:'Raise Grievance',          desc:'Submit a grievance, feedback, or complaint regarding any property service.',                                   link:'Submit grievance',   route:'/grievance',                  cat:'Citizen Services',featured:false },
  ];

  const PROTECTED = new Set([
    '/verify-document','/new-ekhata','/pending-applications',
    '/submitted-applications','/returned-applications','/track-application',
    '/property-details','/property-documents','/download-certificates',
    '/payment-history','/grievance',
  ]);

  const handleCard = route => {
    if (!route) return;
    PROTECTED.has(route) ? navigate('/login', { state:{ from:route } }) : navigate(route);
  };

  const visible = activeTab === 'All' ? serviceCards : serviceCards.filter(c => c.cat === activeTab);

  const notifications = [
    { text:'e-Swathu 2.0 — Now Live',      sub:'Digital signatures and QR codes enabled on all new property documents across the state.',        dot:'#FFC72C' },
    { text:'Bhoomi Integration Active',     sub:'Real-time sync with Revenue Department land records. RTC and e-Swathu data now linked.',         dot:'#FFC72C' },
    { text:'Mangalore Mobile App',          sub:'Locate your property using the mobile app for Mangalore GP before applying for e-Khata.',        dot:'#16a34a' },
    { text:'Aadhaar OTP Mandatory',         sub:'All mutation and e-Khata applications now require Aadhaar-based OTP from January 2026.',         dot:'#ea580c' },
    { text:'Kaveri Sync Enabled',           sub:'Property registration data from Kaveri Online Services now reflected in e-Swathu automatically.',dot:'#FFC72C' },
  ];

  const relatedPortals = [
    { text:'Bhoomi — Land Records',                    sub:'RTC / Pahani, survey records for agricultural land under Revenue Dept.',             dot:'#1d4ed8' },
    { text:'Kaveri Online Services',                   sub:'Property registration, encumbrance certificate and stamp duty for all Karnataka.',   dot:'#7c3aed' },
    { text:'e-Aasthi — Urban Property',                sub:'Khata, property tax records for urban local bodies (BBMP, CMC, TMC).',              dot:'#0d9488' },
    { text:'SAKALA — Service Guarantee Portal',        sub:'Track delivery timelines for all government services under Sakala Act.',             dot:'#d97706' },
    { text:'Panchatantra — GP Management',             sub:'Gram Panchayat administration portal for GP-level officers and elected members.',    dot:'#dc2626' },
  ];

  const portals = [
    { e:'🌾', n:'Bhoomi',        d:'Agricultural land & RTC records' },
    { e:'📜', n:'Kaveri Online', d:'Property registration'           },
    { e:'🏙️', n:'e-Aasthi',     d:'Urban Khata services'            },
    { e:'📊', n:'Panchatantra',  d:'GP administration portal'        },
  ];

  /* ── RENDER ── */
  return (
    <div className="lp-root">
      <style>{CSS}</style>

      {/* ── ACCESSIBILITY BAR ── */}
      <div className="lp-acc">
        <span className="lp-acc-l">ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ | Skip to main content</span>
        <div className="lp-acc-r">
          {['A-','A','A+','High Contrast'].map(s => (
            <button key={s} className="lp-acc-btn">{s}</button>
          ))}
          <button className="lp-acc-btn">ಕನ್ನಡ</button>
          <button className="lp-acc-btn">English</button>
        </div>
      </div>

      {/* ── GOVT HEADER ── */}
      <div className="lp-govhdr">
        <div className="lp-govhdr-in">
          <div className="lp-emb">
            <IndiaEmblem />
            <div className="lp-emb-cap">भारत सरकार<br/>Govt. of India</div>
          </div>
          <div className="lp-brand">
            <div className="lp-brand-dept">ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ</div>
            <div className="lp-brand-name">e-Swathu</div>
            <div className="lp-brand-kn">ಇ-ಸ್ವತ್ತು &nbsp;·&nbsp; ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</div>
            <div className="lp-brand-sub">Rural Development &amp; Panchayat Raj Dept. · Government of Karnataka</div>
          </div>
          <div className="lp-hdr-right">
            <div className="lp-di-badge">
              <div className="lp-di-flag"><div className="lp-di-chakra"/></div>
              <div className="lp-di-text">DIGITAL INDIA</div>
            </div>
            <div className="lp-emb" style={{alignItems:'center'}}>
              <KarnatakaEmblem />
              <div className="lp-emb-cap">ಕರ್ನಾಟಕ ಸರ್ಕಾರ<br/>Govt. of Karnataka</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MINISTER STRIP ── */}
      <div className="lp-min">
        <div className="lp-min-in">
          {/* CM Left */}
          <div className="lp-mp left">
            <div className="lp-mp-img"><CMPortrait /></div>
            <div>
              <div className="lp-mp-name">Shri D.K. Shivakumar</div>
              <div className="lp-mp-role">Hon'ble Chief Minister<br/>Government of Karnataka</div>
            </div>
          </div>
          {/* Center */}
          <div className="lp-mc">
            <div className="lp-mc-tag">📋 RDPR Karnataka · NIC · Digital India</div>
            <div className="lp-mc-title">e-Swathu Property Portal</div>
            <div className="lp-mc-sub">ಗ್ರಾಮ ಪಂಚಾಯತ್ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</div>
            <div className="lp-mc-stats">
              {[['2.4 Cr+','Properties'],['6,022','Gram Panchayats'],['31','Districts'],['18 L+','Documents']].map(([n,l]) => (
                <div className="lp-mst" key={l}>
                  <strong>{n}</strong><span>{l}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Minister Right */}
          <div className="lp-mp right">
            <div className="lp-mp-img"><MinisterPortrait /></div>
            <div>
              <div className="lp-mp-name">Shri Priyank Kharge</div>
              <div className="lp-mp-role">Hon'ble Minister, RDPR<br/>IT/BT &amp; e-Governance, GoK</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-in">
          <div className="lp-nav-links">
            {[['home','/','Home'],['services','#services','Services'],['about','#about','About'],['notices','#notices','Notifications'],['help','#help','Help & FAQ']].map(([id,href,label]) => (
              <a
                key={id}
                href={href}
                className={activeNav === id ? 'on' : ''}
                onClick={() => { setActiveNav(id); setMobNavOpen(false); }}
              >{label}</a>
            ))}
          </div>
         
          <button className="lp-burger" onClick={() => setMobNavOpen(o => !o)}>☰</button>
        </div>
        <div className={`lp-mob-nav ${mobNavOpen ? 'open' : ''}`}>
          {[['/',  '🏠 Home'],['#services','⚙️ Services'],['#about','ℹ️ About'],['#notices','📢 Notifications'],['#help','❓ Help & FAQ']].map(([href,label]) => (
            <a key={label} href={href} onClick={() => setMobNavOpen(false)}>{label}</a>
          ))}
          <div className="lp-mob-btns">
            <button className="lp-nbtn dept"    onClick={() => { setMobNavOpen(false); navigate('/login',{state:{role:'dept'}}); }}>🏛️ Dept. Login</button>
            <button className="lp-nbtn citizen" onClick={() => { setMobNavOpen(false); navigate('/login',{state:{role:'citizen'}}); }}>👤 Citizen Login</button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="lp-ticker">
        <span className="lp-tick-lbl">📢 NOTICE</span>
        <span className="lp-tick-txt">
          e-Swathu 2.0 launched — digital signatures &amp; QR codes on all documents &nbsp;·&nbsp;
          Real-time sync with Bhoomi and Kaveri Online Services &nbsp;·&nbsp;
          Aadhaar OTP mandatory from January 2026 &nbsp;·&nbsp;
          Form 9 &amp; Form 11B free to download — no login required
        </span>
      </div>

      {/* ── HERO ── */}
      <section className="lp-hero" id="main">
        <div className="lp-hero-mesh"/>
        <div className="lp-hero-glow"/>
        <div className="lp-hero-glow2"/>
        <div className="lp-hero-in">
          <div className="lp-hero-badge">
            <span className="lp-h-dot"/>
            RDPR Karnataka · NIC · Digital India Initiative
          </div>
          <h1>Rural Property Records, <span>Now Fully Digital</span></h1>
          <div className="lp-hero-kn">ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ಈಗ ಡಿಜಿಟಲ್ ಆಗಿದೆ</div>
          <p className="lp-hero-desc">
            e-Swathu is Karnataka's official digital portal for all non-agricultural properties under
            Gram Panchayat jurisdiction. Download Form 9, Form 11B, e-Khata and track mutations —
            instantly, securely, free of cost.
          </p>
          <div className="lp-srch">
            <input
              type="text"
              placeholder="Property ID, owner name, or survey number…"
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
            <select value={searchD} onChange={e => setSearchD(e.target.value)}>
              <option value="">All Districts</option>
              {['Bengaluru Rural','Mysuru','Tumakuru','Hassan','Mandya','Shivamogga','Dharwad','Belagavi','Kalaburagi']
                .map(d => <option key={d}>{d}</option>)}
            </select>
            <button className="lp-srch-btn" onClick={() => navigate(`/search?q=${searchQ}&district=${searchD}`)}>
              Search →
            </button>
          </div>
          <div className="lp-srch-note">No login needed · Free to access · Available 24 × 7</div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="lp-stats">
        <div className="lp-stats-in">
          {[['2.4 Cr+','Properties Digitised'],['6,022','Gram Panchayats'],['31','Districts Covered'],['18 L+','Documents Issued (2026)']].map(([n,l]) => (
            <div className="lp-st" key={l}>
              <div className="lp-st-n">{n}</div>
              <div className="lp-st-l">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-about" id="about">
        <div className="lp-about-in lp-fade" ref={addRef}>
          <div className="lp-about-body">
            <div className="lp-eye">About e-Swathu</div>
            <div className="lp-sec-h">Karnataka's Digital Rural Property Record System</div>
            <p>e-Swathu (ಇ-ಸ್ವತ್ತು) is an online property management system introduced by the Government of Karnataka's Rural Development and Panchayat Raj (RDPR) Department. It was created to digitise and standardise non-agricultural property records for all properties falling under the jurisdiction of Gram Panchayats across the state.</p>
            <p>The system maintains digital records of property ownership, tax assessment, classification, and mutation history — covering over 6,000 Gram Panchayats and more than 2.4 crore properties statewide. All documents are digitally signed by the PDO and carry a QR code for instant verification.</p>
            <p>e-Swathu 2.0, launched in 2025, brings real-time integration with Bhoomi and Kaveri Online Services, Aadhaar-based citizen verification, and mobile-first access — making it the most advanced rural property records system in India.</p>
          </div>
          <div className="lp-feats">
            {[
              ['📄','Form 9 — Property Register Extract','Issued by Gram Panchayat for non-agricultural properties. Required for property sale, registration, loan applications, and building permits. Digitally signed by PDO.'],
              ['📋','Form 11B — Demand & Collection Register','Shows tax assessment, payment history, and mutation trail. Essential to verify legal status before purchase.'],
              ['🏡','e-Khata — Digital Ownership Certificate','The digital version of the Khata, linking property ownership to official records. Required by banks and courts.'],
              ['🔄','Mutation — Ownership Transfer','Apply online for property transfer after sale, inheritance, or gift. Track status from submission to approval in real time.'],
            ].map(([ico,title,desc]) => (
              <div className="lp-feat" key={title}>
                <div className="lp-feat-ico">{ico}</div>
                <div className="lp-feat-bd"><h4>{title}</h4><p>{desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="lp-svc lp-fade" id="services" ref={addRef}>
        <div className="lp-sec-hdr">
          <div>
            <div className="lp-eye">Citizen Services</div>
            <div className="lp-sec-h">Services available without login</div>
          </div>
          <a className="lp-see-all" href="#services">View all services →</a>
        </div>
        <div className="lp-tabs">
          {serviceTabs.map(t => (
            <button key={t} className={`lp-tab ${activeTab === t ? 'on' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <div className="lp-grid">
          {visible.map(c => (
            <div
              key={c.title}
              className={`lp-card ${c.featured ? 'hot' : ''}`}
              onClick={() => handleCard(c.route)}
              style={{cursor: c.route ? 'pointer' : 'default'}}
            >
              <div className="lp-card-ico">{c.icon}</div>
              <div className="lp-card-title">{c.title}</div>
              <div className="lp-card-desc">{c.desc}</div>
              <div className="lp-card-link">{c.link} <span className="lp-card-arr"><Arrow /></span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTICES + RELATED PORTALS ── */}
      <section className="lp-notices lp-fade" id="notices" ref={addRef}>
        <div className="lp-panel">
          <div className="lp-ph"><span>📢</span><h4>Latest Notifications</h4><span className="lp-ph-badge">NEW</span></div>
          {notifications.map(n => (
            <div className="lp-pr" key={n.text}>
              <div className="lp-pd" style={{background:n.dot}}/>
              <div className="lp-pt"><strong>{n.text}</strong>{n.sub}</div>
            </div>
          ))}
        </div>
        <div className="lp-panel">
          <div className="lp-ph"><span>🔗</span><h4>Related Government Portals</h4></div>
          {relatedPortals.map(p => (
            <div className="lp-pr" key={p.text}>
              <div className="lp-pd" style={{background:p.dot}}/>
              <div className="lp-pt"><strong>{p.text}</strong>{p.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTALS ECOSYSTEM ── */}
      <div className="lp-portals">
        <div className="lp-portals-in">
          <div className="lp-portals-lbl">Karnataka Digital Land &amp; Property Ecosystem</div>
          <div className="lp-portals-grid">
            {portals.map(p => (
              <div className="lp-pc" key={p.n}>
                <span className="lp-pc-e">{p.e}</span>
                <div className="lp-pc-n">{p.n}</div>
                <div className="lp-pc-d">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HELP ── */}
      <section className="lp-help" id="help">
        <div className="lp-help-in">
          <div className="lp-help-txt">
            <h4>Need help with your property record?</h4>
            <p>Contact helpdesk or visit your nearest Taluk office · Toll-free: <strong>1800-425-1510</strong> · Mon–Sat 9 AM – 6 PM</p>
          </div>
          <div className="lp-help-btns">
            <button className="lp-hbtn p">📥 User Guide (PDF)</button>
            <button className="lp-hbtn s">📝 Submit Grievance</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-ft-top">
          <div className="lp-ft-logos">
            {[['🏛️','Govt. of Karnataka'],['💻','NIC'],['🇮🇳','Digital India'],['🔒','SSL Secured']].map(([ico,lbl]) => (
              <div className="lp-fl" key={lbl}>
                <div className="lp-fl-badge">{ico}</div>
                <span>{lbl}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:11,color:'#334155',textAlign:'right',lineHeight:1.7}}>
            Best viewed in Chrome v87+ · Firefox v83+ · Edge v87+<br/>
            Screen resolution: 1280×800 to 1920×1080
          </div>
        </div>
        <div className="lp-ft-txt">
          e-Swathu · Rural Development &amp; Panchayat Raj Department, Government of Karnataka<br/>
          Designed, Developed and Hosted by: <a href="#">Centre for e-Governance (CeG)</a> &amp; <a href="#">National Informatics Centre (NIC)</a><br/>
          © 2026 Government of Karnataka · All Rights Reserved ·{' '}
          <a href="#">Privacy Policy</a> · <a href="#">Disclaimer</a> · <a href="#">Accessibility</a> · <a href="#">Site Map</a> · <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
