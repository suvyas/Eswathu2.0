import React, { useState, useEffect, useRef } from 'react';


const CSS = `.lp-root *{box-sizing:border-box}
  .lp-root{font-family:'Segoe UI',system-ui,sans-serif;background:#EEF5FF;color:#1a1208;min-height:100vh}

  /* ── CSS VARIABLES ── */
  .lp-root{
    --kr:#2563EB;--kr2:#1D4ED8;--kr3:#60A5FA;
    --kg:#FFC72C;--kg2:#FFD95A;--kgl:#FFF4CC;
    --kw:#FFFFFF;--koff:#F8FBFF;--kbg:#EEF5FF;
    --text:#1E293B;--muted:#64748B;--light:#94A3B8;
    --border:#DCEBFF;--border2:#EAF3FF;
    --shadow:0 8px 24px rgba(47,95,215,.12);
    --r:8px;
  }

  /* ── ACCESSIBILITY BAR ── */
  .lp-acc-bar{background:#1E3A8A;color:#ffffff;padding:5px 24px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#aaa;flex-wrap:wrap;gap:4px}
  .lp-acc-bar a{color:#ccc;text-decoration:none;margin-left:8px}
  .lp-acc-bar a:hover{color:#fff}
  .lp-acc-right{display:flex;align-items:center;gap:0;flex-wrap:wrap}
  .lp-lang-btn{background:transparent;border:1px solid #555;color:#ddd;padding:2px 10px;border-radius:3px;font-size:11px;cursor:pointer;margin-left:8px;font-family:inherit}
  .lp-lang-btn:hover{background:#333;color:#fff}

  /* ── GOVT HEADER ── */
  .lp-gov-header{background:#fff;padding:12px 24px;border-bottom:4px solid var(--kr);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .lp-header-left,.lp-header-right{display:flex;align-items:center;gap:12px}
  .lp-header-center{flex:1;text-align:center;min-width:200px}
  .lp-hc-dept{font-size:11px;color:#666;font-weight:400;letter-spacing:.3px}
  .lp-hc-title{font-size:clamp(18px,4vw,24px);font-weight:800;color:var(--kr);line-height:1.1;letter-spacing:-.3px}
  .lp-hc-title-kn{font-size:clamp(12px,2.5vw,15px);font-weight:700;color:var(--kr2);line-height:1.2;margin-top:2px}
  .lp-hc-sub{font-size:10.5px;color:#555;margin-top:3px;letter-spacing:.2px}
  .lp-di-badge{display:flex;flex-direction:column;align-items:center;gap:3px}
  .lp-di-icon{width:44px;height:30px;background:linear-gradient(135deg,#ff9933 33%,#fff 33%,#fff 66%,#138808 66%);border-radius:4px;border:1px solid #ddd}
  .lp-di-text{font-size:9px;color:#333;font-weight:600;letter-spacing:.3px;text-align:center}

  /* ── NAV ── */
  .lp-nav{background:var(--kr);position:sticky;top:0;z-index:100;box-shadow:0 3px 10px rgba(37,99,235,.18)}
  .lp-nav-inner{display:flex;align-items:center;justify-content:space-between;padding:0 24px;max-width:1200px;margin:0 auto;flex-wrap:wrap}
  .lp-nav-links{display:flex;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .lp-nav-links::-webkit-scrollbar{display:none}
  .lp-nav-links a{color:rgba(255,255,255,.88);font-size:13px;padding:13px 14px;display:block;cursor:pointer;text-decoration:none;border-bottom:3px solid transparent;transition:all .15s;white-space:nowrap;font-family:inherit;background:none;border-top:none;border-left:none;border-right:none}
  .lp-nav-links a:hover,.lp-nav-links a.lp-active{color:#fff;background:#FFFFFF;border-bottom-color:#2563EB}
  .lp-nav-right{display:flex;gap:8px;align-items:center;padding:8px 0;flex-shrink:0}
  .lp-nav-btn{padding:7px 16px;border-radius:4px;font-size:12.5px;font-weight:600;cursor:pointer;transition:all .15s;border:none;white-space:nowrap;font-family:inherit}
  .lp-nav-btn.dept{background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3)}
  .lp-nav-btn.dept:hover{background:rgba(255,255,255,.25)}
  .lp-nav-btn.citizen{background:var(--kgl);color:var(--kr2)}
  .lp-nav-btn.citizen:hover{background:#ffd040;transform:translateY(-1px)}
  .lp-burger{display:none;background:transparent;border:1px solid rgba(255,255,255,.3);color:#fff;padding:7px 12px;border-radius:4px;cursor:pointer;font-size:18px}
  .lp-mob-nav{display:none;background:#2563EB;flex-direction:column}
  .lp-mob-nav.open{display:flex}
  .lp-mob-nav a{display:block;padding:13px 24px;color:rgba(255,255,255,.85);font-size:14px;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.07);cursor:pointer}
  .lp-mob-nav a:hover{background:rgba(0,0,0,.2);color:#fff}
  .lp-mob-btns{display:flex;gap:8px;padding:12px 16px}
  .lp-mob-btns .lp-nav-btn{flex:1;text-align:center}

  /* ── TICKER ── */
  .lp-ticker{background:#FFFFFF;border-top:1px solid #DCEBFF;border-bottom:1px solid #DCEBFF;padding:7px 24px;display:flex;align-items:center;gap:14px;overflow:hidden}
  .lp-tick-label{background:var(--kr);color:#fff;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:3px;white-space:nowrap;letter-spacing:.5px;flex-shrink:0}
  .lp-tick-text{font-size:12px;color:#475569;white-space:nowrap;animation:lp-scroll 30s linear infinite}
  @keyframes lp-scroll{from{transform:translateX(80vw)}to{transform:translateX(-100%)}}

  /* ── LOGIN MODAL ── */
  .lp-modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;align-items:center;justify-content:center;padding:20px}
  .lp-modal-overlay.open{display:flex}
  .lp-modal{background:#fff;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.4);overflow:hidden;width:100%;max-width:440px;border-top:4px solid var(--kg);animation:lp-modal-in .22s ease}
  @keyframes lp-modal-in{from{opacity:0;transform:translateY(-16px) scale(.97)}to{opacity:1;transform:none}}
  .lp-modal-hd{background:linear-gradient(135deg,var(--kr2),var(--kr));padding:18px 22px;display:flex;align-items:center;justify-content:space-between}
  .lp-modal-hd h3{font-size:16px;font-weight:800;color:#fff;margin:0}
  .lp-modal-hd p{font-size:11.5px;color:rgba(255,255,255,.6);margin:2px 0 0}
  .lp-modal-close{background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:17px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:inherit;transition:.15s}
  .lp-modal-close:hover{background:rgba(255,255,255,.28)}
  .lp-login-tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--border2)}
  .lp-ltab{padding:13px 10px;text-align:center;font-size:13px;font-weight:600;cursor:pointer;background:#f5f0e8;color:#8a7a5a;border-bottom:3px solid transparent;margin-bottom:-1px;transition:all .15s;font-family:inherit;border-top:none;border-left:none;border-right:none}
  .lp-ltab.lp-active{background:#fff;color:var(--kr);border-bottom-color:var(--kr);font-weight:700}
  .lp-ltab:hover:not(.lp-active){background:#ede8d8}
  .lp-login-body{padding:22px 20px}
  .lp-fg{margin-bottom:14px}
  .lp-fg label{display:block;font-size:12px;font-weight:600;color:#5a4a2a;margin-bottom:5px}
  .lp-fg input,.lp-fg select{width:100%;padding:9px 12px;border:1px solid #d4b87a;border-radius:4px;font-size:13px;color:#1a1208;background:#fff;outline:none;transition:border-color .15s;font-family:inherit}
  .lp-fg input:focus,.lp-fg select:focus{border-color:var(--kr);box-shadow:0 0 0 2px rgba(139,0,0,.08)}
  .lp-cap-row{display:flex;gap:8px;align-items:center}
  .lp-cap-box{background:#f0ead8;border:1px solid #d4b87a;border-radius:4px;padding:8px 14px;font-family:monospace;font-size:15px;font-weight:700;color:#5a0000;letter-spacing:4px;user-select:none;flex-shrink:0}
  .lp-cap-row input{flex:1}
  .lp-login-submit{width:100%;background:var(--kr);color:#fff;border:none;padding:11px;border-radius:4px;font-size:14px;font-weight:700;cursor:pointer;transition:all .15s;margin-top:4px;letter-spacing:.3px;font-family:inherit}
  .lp-login-submit:hover{background:#2563EB;transform:translateY(-1px);box-shadow:0 4px 14px rgba(37,99,235,.18)}
  .lp-forgot{text-align:center;margin-top:10px;font-size:12px;color:var(--muted)}
  .lp-forgot a{color:var(--kr);text-decoration:none;font-weight:600}
  .lp-dept-info{background:#FFFFFF;border-left:3px solid var(--kg);padding:10px 12px;border-radius:0 4px 4px 0;margin-bottom:14px;font-size:12px;color:#475569;line-height:1.5}

  /* ── HERO ── */
  .lp-hero{background:linear-gradient(135deg,#F8FBFF 0%,#EAF3FF 45%,#D6E7FF 100%);padding:48px 24px;position:relative;overflow:hidden}
  .lp-hero-pattern{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);background-size:28px 28px;pointer-events:none}
  .lp-hero-glow{position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(37,99,235,.10),transparent 70%);top:-80px;right:-60px;pointer-events:none}
  .lp-hero-inner{max-width:1200px;margin:0 auto;text-align:center;position:relative;z-index:1}
  .lp-hero-tag{display:inline-flex;align-items:center;gap:8px;background:#FFFFFF;border:1px solid #DCEBFF;padding:5px 14px;border-radius:3px;font-size:11.5px;color:rgba(255,255,255,.85);margin-bottom:16px;letter-spacing:.4px}
  .lp-hero-tag-dot{width:6px;height:6px;background:var(--kgl);border-radius:50%;animation:lp-blink 2s ease-in-out infinite;flex-shrink:0}
  @keyframes lp-blink{0%,100%{opacity:1}50%{opacity:.3}}
  .lp-hero h1{font-size:clamp(24px,5vw,38px);font-weight:800;color:#1E293B;line-height:1.15;margin-bottom:10px;letter-spacing:-.5px}
  .lp-hero h1 span{color:#2563EB}
  .lp-hero-kn{font-size:clamp(13px,2.5vw,16px);font-weight:600;color:#64748B;margin-bottom:14px;font-style:italic}
  .lp-hero-desc{font-size:13.5px;color:#475569;line-height:1.7;max-width:600px;margin:0 auto 28px}
  .lp-search-box{background:#FFFFFF;backdrop-filter:none;border:1px solid #DCEBFF;border-radius:6px;padding:6px 6px 6px 14px;display:flex;align-items:center;gap:8px;max-width:580px;margin:0 auto;flex-wrap:wrap}
  .lp-search-box input{flex:1;min-width:140px;background:transparent;border:none;outline:none;color:#1E293B;font-size:13.5px;padding:7px 0;font-family:inherit}
  .lp-search-box input::placeholder{color:#94A3B8}
  .lp-search-box select{background:#FFFFFF;border:1px solid #DCEBFF;color:#1E293B;border-radius:4px;padding:8px 10px;font-size:12px;outline:none;cursor:pointer;font-family:inherit}
  .lp-search-box select option{background:#FFFFFF;color:#fff}
  .lp-search-btn{background:var(--kgl);color:var(--kr2);border:none;padding:9px 18px;border-radius:4px;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s;font-family:inherit}
  .lp-search-btn:hover{background:#ffd040;transform:scale(1.02)}
  .lp-search-note{font-size:11px;color:#94A3B8;margin-top:10px;text-align:center}

  /* ── STATS ── */
  .lp-stats-bar{background:#2563EB;padding:20px 24px}
  .lp-stats-inner{display:grid;grid-template-columns:repeat(4,1fr);max-width:1200px;margin:0 auto}
  .lp-stat{text-align:center;padding:10px 16px;border-right:1px solid rgba(255,255,255,.12)}
  .lp-stat:last-child{border-right:none}
  .lp-snum{font-size:26px;font-weight:800;color:#2563EB}
  .lp-slabel{font-size:11px;color:rgba(255,255,255,.6);margin-top:2px}

  /* ── ABOUT ── */
  .lp-about{background:var(--koff);border-bottom:1px solid var(--border2);padding:48px 24px}
  .lp-about-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
  .lp-eyebrow{font-size:11px;font-weight:700;color:var(--kr);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:8px}
  .lp-eyebrow::before{content:'';width:22px;height:3px;background:linear-gradient(90deg,var(--kr),var(--kg));border-radius:3px}
  .lp-sec-title{font-size:clamp(18px,3vw,24px);font-weight:800;color:var(--text);margin-bottom:14px;line-height:1.25}
  .lp-about-body p{font-size:13.5px;color:#4a3a1a;line-height:1.75;margin-bottom:12px}
  .lp-feat-list{display:flex;flex-direction:column;gap:14px}
  .lp-feat{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid var(--border2);border-left:3px solid var(--kr);border-radius:6px;padding:14px 16px;transition:all .18s}
  .lp-feat:hover{border-left-color:var(--kg);box-shadow:var(--shadow);transform:translateX(4px)}
  .lp-feat-ico{font-size:22px;flex-shrink:0;margin-top:2px}
  .lp-feat-bd h4{font-size:13.5px;font-weight:700;color:var(--text);margin-bottom:3px}
  .lp-feat-bd p{font-size:12px;color:var(--muted);line-height:1.55}

  /* ── SERVICES ── */
  .lp-svc-sec{padding:48px 24px;max-width:1200px;margin:0 auto}
  .lp-sec-hdr{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:22px;flex-wrap:wrap;gap:10px}
  .lp-see-all{font-size:12.5px;color:var(--kr);font-weight:600;cursor:pointer;text-decoration:none;border-bottom:1px solid var(--kr)}
  .lp-ptabs{display:flex;gap:0;border:1px solid var(--border);border-radius:6px;overflow:hidden;width:fit-content;margin-bottom:22px;flex-wrap:wrap}
  .lp-ptab{padding:9px 20px;font-size:13px;font-weight:500;color:var(--muted);cursor:pointer;background:#fff;border-right:1px solid var(--border);transition:all .15s;font-family:inherit;border-top:none;border-bottom:none;border-left:none}
  .lp-ptab:last-child{border-right:none}
  .lp-ptab.lp-active{background:var(--kr);color:#fff;font-weight:600}
  .lp-ptab:hover:not(.lp-active){background:var(--kbg);color:var(--text)}
  .lp-pub-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .lp-pub-card{background:#fff;border:1px solid var(--border2);border-radius:var(--r);padding:22px 18px;cursor:pointer;transition:all .18s;position:relative;overflow:hidden}
  .lp-pub-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--kr),var(--kg));transform:scaleX(0);transition:transform .2s;transform-origin:left}
  .lp-pub-card:hover{border-color:var(--border);box-shadow:0 4px 20px rgba(139,0,0,.1);transform:translateY(-2px)}
  .lp-pub-card:hover::before{transform:scaleX(1)}
  .lp-pub-card.featured{border-color:#fca5a5;background:linear-gradient(135deg,#fff5f5 0%,#fff 100%)}
  .lp-pc-icon{width:44px;height:44px;background:#fff5f5;border:1px solid #fca5a5;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:20px;margin-bottom:12px}
  .lp-pc-title{font-size:14px;font-weight:700;color:var(--text);margin-bottom:4px}
  .lp-pc-desc{font-size:12px;color:var(--muted);line-height:1.55;margin-bottom:12px}
  .lp-pc-link{font-size:12px;color:var(--kr);font-weight:600;display:inline-flex;align-items:center;gap:4px}
  .lp-pc-link svg{width:12px;height:12px;transition:transform .15s}
  .lp-pub-card:hover .lp-pc-link svg{transform:translateX(3px)}

  /* ── NOTICES ── */
  .lp-notices{padding:0 24px 48px;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:20px}
  .lp-panel{background:#fff;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow)}
  .lp-ph{background:var(--kr);padding:12px 18px;display:flex;align-items:center;gap:10px}
  .lp-ph h4{font-size:13.5px;font-weight:700;color:#fff;margin:0}
  .lp-ph-badge{background:var(--kgl);color:var(--kr2);font-size:10px;padding:2px 8px;border-radius:20px;font-weight:700;margin-left:auto}
  .lp-pr{padding:11px 18px;border-bottom:1px solid var(--border2);display:flex;gap:10px;align-items:flex-start;cursor:pointer;transition:background .15s}
  .lp-pr:last-child{border-bottom:none}
  .lp-pr:hover{background:var(--koff)}
  .lp-pd{width:7px;height:7px;border-radius:50%;background:var(--kg);margin-top:5px;flex-shrink:0}
  .lp-pt{font-size:12px;color:var(--muted);line-height:1.5}
  .lp-pt strong{color:var(--text);font-weight:600;display:block;font-size:12.5px;margin-bottom:1px}

  /* ── PORTALS ── */
  .lp-portals{background:#2563EB;padding:32px 24px}
  .lp-portals-in{max-width:1200px;margin:0 auto}
  .lp-portals-lbl{font-size:11px;font-weight:700;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.9px;margin-bottom:16px}
  .lp-portals-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .lp-pc-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:16px 12px;text-align:center;cursor:pointer;transition:all .18s}
  .lp-pc-card:hover{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.26);transform:translateY(-2px)}
  .lp-pc-emoji{font-size:26px;margin-bottom:6px;display:block}
  .lp-pc-name{font-size:13px;font-weight:700;color:#fff;margin-bottom:3px}
  .lp-pc-desc{font-size:11px;color:rgba(255,255,255,.48);line-height:1.4}

  /* ── HELP ── */
  .lp-help{background:var(--koff);border-top:1px solid var(--border2);border-bottom:1px solid var(--border2);padding:22px 24px}
  .lp-help-in{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
  .lp-help-txt h4{font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px}
  .lp-help-txt p{font-size:13px;color:var(--muted)}
  .lp-help-txt strong{color:var(--kr)}
  .lp-help-btns{display:flex;gap:10px;flex-wrap:wrap}
  .lp-hbtn{padding:9px 20px;border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;font-family:inherit}
  .lp-hbtn.p{background:var(--kr);color:#fff;border:none}
  .lp-hbtn.p:hover{background:#2563EB;transform:translateY(-1px)}
  .lp-hbtn.s{background:transparent;border:1px solid var(--border);color:var(--muted)}
  .lp-hbtn.s:hover{border-color:var(--kr);color:var(--kr)}

  /* ── FOOTER ── */
  .lp-footer{background:#1E3A8A;padding:22px 24px}
  .lp-ft-top{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:14px}
  .lp-ft-logos{display:flex;align-items:center;gap:20px;flex-wrap:wrap}
  .lp-fl{display:flex;flex-direction:column;align-items:center;gap:4px}
  .lp-fl-badge{width:36px;height:36px;border-radius:6px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:14px}
  .lp-fl span{font-size:9px;color:#4a3a2a;letter-spacing:.3px}
  .lp-ft-txt{max-width:1200px;margin:0 auto;font-size:11.5px;color:#3a2a1a;line-height:1.8;text-align:center}
  .lp-ft-txt a{color:#5a4a2a;text-decoration:none}
  .lp-ft-txt a:hover{color:#8a7a5a}

  /* ── FADE ANIMATION ── */
  .lp-fade{opacity:0;transform:translateY(16px);transition:opacity .45s,transform .45s}
  .lp-fade.lp-in{opacity:1;transform:none}

  /* ── RESPONSIVE ── */
  @media(max-width:960px){
    .lp-about-inner,.lp-notices{grid-template-columns:1fr}
    .lp-portals-grid{grid-template-columns:repeat(2,1fr)}
    .lp-pub-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:700px){
    .lp-gov-header{flex-direction:column;gap:8px;text-align:center}
    .lp-header-left,.lp-header-right{justify-content:center}
    .lp-hc-sub{display:none}
    .lp-nav-links{display:none}
    .lp-nav-right{display:none}
    .lp-burger{display:block}
    .lp-stats-inner{grid-template-columns:repeat(2,1fr)}
    .lp-stat:nth-child(2){border-right:none}
    .lp-stat:nth-child(3){border-right:1px solid rgba(255,255,255,.12)}
  }
  @media(max-width:500px){
    .lp-pub-grid{grid-template-columns:1fr}
    .lp-portals-grid{grid-template-columns:repeat(2,1fr)}
    .lp-search-box{flex-direction:column;padding:12px}
    .lp-search-box input,.lp-search-box select,.lp-search-btn{width:100%}
    .lp-help-in{flex-direction:column;text-align:center}
    .lp-help-btns{justify-content:center;width:100%}
    .lp-hbtn{flex:1;text-align:center}
    .lp-ptabs{width:100%}
    .lp-ptab{flex:1;text-align:center;padding:9px 8px;font-size:12px}
  }
`;

/* ─────────────────────────────────────────
   EMBLEM SVGs (static — extracted from HTML)
───────────────────────────────────────── */
const IndiaEmblem = () => (
  <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
    <rect x="8" y="52" width="36" height="6" rx="2" fill="#8B7355"/>
    <circle cx="26" cy="46" r="5" fill="none" stroke="#1a3a6b" strokeWidth="1.5"/>
    <line x1="26" y1="41" x2="26" y2="51" stroke="#1a3a6b" strokeWidth=".8"/>
    <line x1="21" y1="46" x2="31" y2="46" stroke="#1a3a6b" strokeWidth=".8"/>
    <line x1="22.5" y1="42.5" x2="29.5" y2="49.5" stroke="#1a3a6b" strokeWidth=".8"/>
    <line x1="29.5" y1="42.5" x2="22.5" y2="49.5" stroke="#1a3a6b" strokeWidth=".8"/>
    <rect x="16" y="30" width="20" height="16" rx="2" fill="#c8a84b"/>
    <ellipse cx="14" cy="28" rx="7" ry="6" fill="#c8a84b"/>
    <ellipse cx="38" cy="28" rx="7" ry="6" fill="#c8a84b"/>
    <circle cx="11" cy="24" r="4" fill="#a07830"/>
    <circle cx="41" cy="24" r="4" fill="#a07830"/>
    <circle cx="11" cy="23" r="2.5" fill="#c8a84b"/>
    <circle cx="41" cy="23" r="2.5" fill="#c8a84b"/>
    <circle cx="11" cy="23" r="3.5" fill="none" stroke="#a07830" strokeWidth="1"/>
    <circle cx="41" cy="23" r="3.5" fill="none" stroke="#a07830" strokeWidth="1"/>
    <rect x="10" y="38" width="32" height="6" rx="1" fill="#8B6914"/>
    <text x="26" y="59" textAnchor="middle" fontSize="5" fill="#666" fontFamily="serif">सत्यमेव जयते</text>
  </svg>
);

const KarnatakaEmblem = () => (
  <svg width="52" height="60" viewBox="0 0 52 60" fill="none">
    <path d="M6 8 L46 8 L46 38 Q26 54 6 38 Z" fill="#8B0000"/>
    <path d="M9 11 L43 11 L43 37 Q26 50 9 37 Z" fill="#6B0000"/>
    <ellipse cx="26" cy="26" rx="9" ry="6" fill="rgba(255,255,255,.88)"/>
    <circle cx="16" cy="20" r="5" fill="rgba(255,255,255,.88)"/>
    <circle cx="36" cy="20" r="5" fill="rgba(255,255,255,.88)"/>
    <path d="M11 19 L8 18 L10 21 Z" fill="#c8a040"/>
    <path d="M41 19 L44 18 L42 21 Z" fill="#c8a040"/>
    <path d="M11 26 Q5 21 7 13 Q11 22 16 24Z" fill="rgba(255,255,255,.6)"/>
    <path d="M41 26 Q47 21 45 13 Q41 22 36 24Z" fill="rgba(255,255,255,.6)"/>
    <path d="M22 32 Q26 40 30 32" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" fill="none"/>
    <rect x="6" y="46" width="40" height="7" rx="2" fill="#c8a040"/>
    <text x="26" y="51.5" textAnchor="middle" fontSize="3.8" fill="#5a0000" fontWeight="bold">ಸರ್ವಜನ ಸುಖಿನೋ ಭವಂತು</text>
    <text x="26" y="59" textAnchor="middle" fontSize="4.5" fill="#666">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</text>
  </svg>
);

/* ─────────────────────────────────────────
   MINISTER PORTRAIT SVGs
───────────────────────────────────────── */
const CMPortrait = () => (
  <svg viewBox="0 0 80 96" fill="none" style={{width:'100%',height:'100%'}}>
    <defs>
      <linearGradient id="lp-g1" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="#2563EB"/>
  <stop offset="55%" stopColor="#1D4ED8"/>
  <stop offset="100%" stopColor="#1E3A8A"/>
</linearGradient>
    </defs>
    <rect width="80" height="96" fill="url(#lp-g1)"/>
    <path d="M0 96 L0 72 Q12 63 22 60 L40 56 L58 60 Q68 63 80 72 L80 96Z" fill="#111"/>
    <path d="M33 56 L40 63 L47 56 L44 52 L40 60 L36 52Z" fill="#eee"/>
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
    <path d="M22 60 Q8 68 4 84 L0 84 L0 74Z" fill="#60A5FA" opacity=".4"/>
    <path d="M58 60 Q72 68 76 84 L80 84 L80 74Z" fill="#60A5FA" opacity=".4"/>
  </svg>
);

const MinisterPortrait = () => (
  <svg viewBox="0 0 80 96" fill="none" style={{width:'100%',height:'100%'}}>
    <defs>
  <linearGradient id="lp-g2" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#2563EB"/>
<stop offset="55%" stopColor="#1D4ED8"/>
<stop offset="100%" stopColor="#1E3A8A"/>
</linearGradient>
    </defs>
    <rect width="80" height="96" fill="url(#lp-g2)"/>
    <path d="M0 96 L0 72 Q12 63 22 60 L40 56 L58 60 Q68 63 80 72 L80 96Z" fill="#1E293B"/>
    <path d="M33 56 L40 63 L47 56 L44 52 L40 60 L36 52Z" fill="#eee"/>
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
    <path d="M22 60 Q8 68 4 84 L0 84 L0 74Z" fill="#60A5FA" opacity=".45"/>
    <path d="M58 60 Q72 68 76 84 L80 84 L80 74Z" fill="#60A5FA" opacity=".45"/>
  </svg>
);

/* ─────────────────────────────────────────
   ARROW ICON (reusable)
───────────────────────────────────────── */
const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
const home = () => {
  // ── State ──
  const [activeTab, setActiveTab]         = useState('citizen'); // login tab
  const [modalOpen, setModalOpen]         = useState(false);
  const [defaultTab, setDefaultTab]       = useState('citizen');
  const [mobNavOpen, setMobNavOpen]       = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState('All');
  const [searchQuery, setSearchQuery]     = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');

  // Login form state
  const [citizenForm, setCitizenForm]     = useState({ mobile: '', password: '', captcha: '' });
  const [deptForm, setDeptForm]           = useState({ userId: '', password: '', role: '', captcha: '' });

  // Intersection observer for fade-in sections
  const fadeRefs = useRef([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('lp-in'); }),
      { threshold: 0.08 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addFadeRef = el => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  // ── Modal helpers ──
  const openLogin = (tab = 'citizen') => {
    setDefaultTab(tab);
    setActiveTab(tab);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLogin = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  // ── Service tabs ──
  const serviceTabs  = ['All', 'Documents', 'Search', 'Verification'];
  const serviceCards = [
    { icon: '🔍', title: 'Search Property',       desc: 'Search by District, Taluk, GP, Village, and Property ID or owner name. Free and instant — no login needed.', link: 'Go to search',         cat: 'Search',       featured: true  },
    { icon: '📄', title: 'Download Form 9',        desc: 'Download digitally signed Form 9 (Property Register Extract). PDF password is your Property ID.',              link: 'Download now',        cat: 'Documents',    featured: true  },
    { icon: '📋', title: 'Download Form 11B',      desc: 'Get the Demand & Collection Register extract showing tax history and mutation records for your property.',       link: 'Download now',        cat: 'Documents',    featured: false },
    { icon: '✅', title: 'Verify Document',         desc: 'Verify authenticity of any e-Swathu document by entering certificate number or scanning QR code.',             link: 'Verify certificate',  cat: 'Verification', featured: false },
    { icon: '🔄', title: 'Track Mutation Status',  desc: 'Enter your application number to check status of property transfer / mutation requests at your Gram Panchayat.',link: 'Track status',        cat: 'Verification', featured: false },
    { icon: '🗺️', title: 'Property Map (GIS)',     desc: 'View property boundaries on GIS maps. Confirm plot location, survey number, and adjacent land records.',        link: 'View on map',         cat: 'Search',       featured: false },
  ];
  const visibleCards = activeServiceTab === 'All'
    ? serviceCards
    : serviceCards.filter(c => c.cat === activeServiceTab);

  const notifications = [
    { text: 'e-Swathu 2.0 — Now Live',        sub: 'Digital signatures and QR codes enabled on all new property documents across the state.', color: '#c8960c' },
    { text: 'Bhoomi Integration Active',        sub: 'Real-time sync with Revenue Department land records. RTC and e-Swathu data now linked.',   color: '#c8960c' },
    { text: 'Mangalore Mobile App',             sub: 'Locate your property using the mobile app for Mangalore GP before applying for e-Khata.',  color: '#1a6b3c' },
    { text: 'Aadhaar OTP Mandatory',            sub: 'All mutation and e-Khata applications now require Aadhaar-based OTP from January 2026.',   color: '#92400e' },
    { text: 'Kaveri Sync Enabled',              sub: 'Property registration data from Kaveri Online Services now reflected automatically.',       color: '#c8960c' },
  ];
  const relatedPortals = [
    { text: 'Bhoomi — Land Records (bhoomi.karnataka.gov.in)',     sub: 'RTC / Pahani, survey records, mutation status for agricultural land under Revenue Dept.',         color: '#1a3a6b' },
    { text: 'Kaveri Online Services',                               sub: 'Property registration, encumbrance certificate, stamp duty payment for all Karnataka properties.', color: '#5b21b6' },
    { text: 'e-Aasthi — Urban Property (eaasthi.karnataka.gov.in)',sub: 'Khata, property tax, and ownership records for urban local bodies (BBMP, CMC, TMC).',             color: '#0f766e' },
    { text: 'SAKALA — Service Guarantee Portal',                    sub: 'Track delivery timelines for all government services including property documents.',               color: '#c8960c' },
    { text: 'Panchatantra — GP Management',                         sub: 'Gram Panchayat administration portal for GP-level officers and elected members.',                  color: '#dc2626' },
  ];
  const portals = [
    { emoji: '🌾', name: 'Bhoomi',        desc: 'Agricultural land & RTC records' },
    { emoji: '📜', name: 'Kaveri Online', desc: 'Property registration'           },
    { emoji: '🏙️', name: 'e-Aasthi',     desc: 'Urban Khata services'            },
    { emoji: '📊', name: 'Panchatantra',  desc: 'GP administration portal'        },
  ];

  /* ─── RENDER ─── */
  return (
    <div className="lp-root">
      {/* Inject scoped CSS */}
      <style>{CSS}</style>

      {/* ── ACCESSIBILITY BAR ── */}
      <div className="lp-acc-bar">
        <span>Skip to main content | Screen reader access</span>
        <div className="lp-acc-right">
          <a href="#main">A-</a>
          <a href="#main">A</a>
          <a href="#main">A+</a>
          <a href="#main">High contrast</a>
          <button className="lp-lang-btn">ಕನ್ನಡ</button>
          <button className="lp-lang-btn">English</button>
        </div>
      </div>

      {/* ── GOVT HEADER ── */}
      <div className="lp-gov-header">
        <div className="lp-header-left">
          <IndiaEmblem />
        </div>
        <div className="lp-header-center">
          <div className="lp-hc-dept">ಗ್ರಾಮೀಣಾಭಿವೃದ್ಧಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರ್ಕಾರ</div>
          <div className="lp-hc-title">e-Swathu</div>
          <div className="lp-hc-title-kn">ಇ-ಸ್ವತ್ತು · ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</div>
          <div className="lp-hc-sub">Rural Development &amp; Panchayat Raj Dept. · Government of Karnataka</div>
        </div>
        <div className="lp-header-right">
          <div className="lp-di-badge">
            <div className="lp-di-icon" />
            <div className="lp-di-text">DIGITAL INDIA</div>
          </div>
          <KarnatakaEmblem />
        </div>
      </div>

      {/* ── MINISTER STRIP ── */}
      <div style={{background:'linear-gradient(135deg,#1E40AF 0%,#2563EB 50%,#60A5FA 100%)',position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'stretch',flexWrap:'wrap'}}>
          {/* CM Left */}
          <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 28px',background:'rgba(0,0,0,.15)',flexShrink:0,minWidth:220,borderRight:'1px solid rgba(255,255,255,.12)'}}>
            <div style={{width:78,height:92,borderRadius:8,border:'3px solid #FFFFFF',boxShadow:'0 10px 25px rgba(37,99,235,.25)',overflow:'hidden',flexShrink:0}}>
              <CMPortrait />
            </div>
            <div>
              <div style={{fontSize:12.5,fontWeight:700,color:'#fff',lineHeight:1.3,marginBottom:3}}>Shri D.K. Shivakumar</div>
              <div style={{fontSize:10.5,color:'rgba(255,255,255,.6)',lineHeight:1.4}}>Hon'ble Chief Minister<br/>Government of Karnataka</div>
            </div>
          </div>
          {/* Center */}
          <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'16px 20px',textAlign:'center',gap:8}}>
            <div style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)',color:'rgba(255,255,255,.82)',fontSize:10.5,padding:'4px 14px',borderRadius:20,letterSpacing:.5,fontWeight:600}}>📋 RDPR Karnataka · NIC · Digital India</div>
            <div style={{fontSize:'clamp(16px,3vw,22px)',fontWeight:800,color:'#f5c842',lineHeight:1.1}}>e-Swathu Property Portal</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,.5)'}}>ಗ್ರಾಮ ಪಂಚಾಯತ್ ಆಸ್ತಿ ದಾಖಲಾತಿ ವ್ಯವಸ್ಥೆ</div>
            <div style={{display:'flex',gap:22,flexWrap:'wrap',justifyContent:'center'}}>
              {[['2.4 Cr+','Properties'],['6,022','Gram Panchayats'],['31','Districts'],['18 L+','Documents']].map(([n,l])=>(
                <div key={l} style={{textAlign:'center'}}>
                  <div style={{fontSize:18,fontWeight:800,color:'#f5c842'}}>{n}</div>
                  <div style={{fontSize:10,color:'rgba(255,255,255,.45)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Minister Right */}
          <div style={{display:'flex',alignItems:'center',gap:14,padding:'14px 28px',background:'rgba(0,0,0,.15)',flexShrink:0,minWidth:220,borderLeft:'1px solid rgba(255,255,255,.12)'}}>
            <div style={{width:78,height:92,borderRadius:8,border:'3px solid #FFFFFF',boxShadow:'0 10px 25px rgba(37,99,235,.25)',overflow:'hidden',flexShrink:0}}>
              <MinisterPortrait />
            </div>
            <div>
              <div style={{fontSize:12.5,fontWeight:700,color:'#fff',lineHeight:1.3,marginBottom:3}}>Shri Priyank Kharge</div>
              <div style={{fontSize:10.5,color:'rgba(255,255,255,.6)',lineHeight:1.4}}>Hon'ble Minister, RDPR<br/>IT/BT &amp; e-Governance, GoK</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-inner">
          <div className="lp-nav-links">
            <a className="lp-active" href="#main">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#notices">Notifications</a>
            <a href="#help">Help &amp; FAQ</a>
          </div>
          <div className="lp-nav-right">
            <button className="lp-nav-btn dept" onClick={() => openLogin('dept')}>🏛 Department Login</button>
            <button className="lp-nav-btn citizen" onClick={() => openLogin('citizen')}>👤 Citizen Login</button>
          </div>
          <button className="lp-burger" onClick={() => setMobNavOpen(o => !o)}>☰</button>
        </div>
        <div className={`lp-mob-nav ${mobNavOpen ? 'open' : ''}`}>
          <a href="#main"     onClick={() => setMobNavOpen(false)}>🏠 Home</a>
          <a href="#services" onClick={() => setMobNavOpen(false)}>⚙️ Services</a>
          <a href="#about"    onClick={() => setMobNavOpen(false)}>ℹ️ About</a>
          <a href="#notices"  onClick={() => setMobNavOpen(false)}>📢 Notifications</a>
          <a href="#help"     onClick={() => setMobNavOpen(false)}>❓ Help &amp; FAQ</a>
          <div className="lp-mob-btns">
            <button className="lp-nav-btn dept"    onClick={() => { setMobNavOpen(false); openLogin('dept');    }}>🏛 Dept. Login</button>
            <button className="lp-nav-btn citizen" onClick={() => { setMobNavOpen(false); openLogin('citizen'); }}>👤 Citizen Login</button>
          </div>
        </div>
      </nav>

      {/* ── TICKER ── */}
      <div className="lp-ticker">
        <span className="lp-tick-label">📢 NOTICE</span>
        <span className="lp-tick-text">
          e-Swathu 2.0 launched — digital signatures &amp; QR codes on all documents &nbsp;·&nbsp;
          Real-time sync with Bhoomi and Kaveri Online Services &nbsp;·&nbsp;
          Aadhaar OTP mandatory from January 2026 &nbsp;·&nbsp;
          Form 9 &amp; Form 11B free to download — no login required
        </span>
      </div>

      {/* ── LOGIN MODAL ── */}
      {modalOpen && (
        <div
          className="lp-modal-overlay open"
          onClick={e => { if (e.target === e.currentTarget) closeLogin(); }}
        >
          <div className="lp-modal">
            <div className="lp-modal-hd">
              <div>
                <h3>🔐 Portal Login</h3>
                <p>Select your role and sign in to continue</p>
              </div>
              <button className="lp-modal-close" onClick={closeLogin}>✕</button>
            </div>
            <div className="lp-login-tabs">
              <button className={`lp-ltab ${activeTab === 'citizen' ? 'lp-active' : ''}`} onClick={() => setActiveTab('citizen')}>👤 Citizen Login</button>
              <button className={`lp-ltab ${activeTab === 'dept'    ? 'lp-active' : ''}`} onClick={() => setActiveTab('dept')   }>🏛 Department Login</button>
            </div>

            {/* Citizen Form */}
            {activeTab === 'citizen' && (
              <div className="lp-login-body">
                <div className="lp-fg">
                  <label>Mobile / Aadhaar Number</label>
                  <input type="text" placeholder="Enter mobile or Aadhaar number"
                    value={citizenForm.mobile}
                    onChange={e => setCitizenForm(f => ({...f, mobile: e.target.value}))} />
                </div>
                <div className="lp-fg">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password"
                    value={citizenForm.password}
                    onChange={e => setCitizenForm(f => ({...f, password: e.target.value}))} />
                </div>
                <div className="lp-fg">
                  <label>Captcha</label>
                  <div className="lp-cap-row">
                    <div className="lp-cap-box">X8K4P</div>
                    <input type="text" placeholder="Enter captcha"
                      value={citizenForm.captcha}
                      onChange={e => setCitizenForm(f => ({...f, captcha: e.target.value}))} />
                  </div>
                </div>
                <button className="lp-login-submit" onClick={() => alert('Citizen login submitted')}>Sign In</button>
                <div className="lp-forgot">
                  <a href="#">Forgot password?</a> &nbsp;·&nbsp; <a href="#">New registration</a>
                </div>
              </div>
            )}

            {/* Department Form */}
            {activeTab === 'dept' && (
              <div className="lp-login-body">
                <div className="lp-dept-info">🔒 Restricted to GP officials, Taluk officers, and RDPR staff only.</div>
                <div className="lp-fg">
                  <label>Department User ID</label>
                  <input type="text" placeholder="Enter your department user ID"
                    value={deptForm.userId}
                    onChange={e => setDeptForm(f => ({...f, userId: e.target.value}))} />
                </div>
                <div className="lp-fg">
                  <label>Password</label>
                  <input type="password" placeholder="Enter password"
                    value={deptForm.password}
                    onChange={e => setDeptForm(f => ({...f, password: e.target.value}))} />
                </div>
                <div className="lp-fg">
                  <label>Department / Role</label>
                  <select value={deptForm.role} onChange={e => setDeptForm(f => ({...f, role: e.target.value}))}>
                    <option value="">Select department</option>
                    <option>Gram Panchayat — PDO</option>
                    <option>Taluk Panchayat — EO</option>
                    <option>Zilla Panchayat</option>
                    <option>RDPR — Head Office</option>
                    <option>Revenue Department</option>
                  </select>
                </div>
                <div className="lp-fg">
                  <label>Captcha</label>
                  <div className="lp-cap-row">
                    <div className="lp-cap-box">R2N7M</div>
                    <input type="text" placeholder="Enter captcha"
                      value={deptForm.captcha}
                      onChange={e => setDeptForm(f => ({...f, captcha: e.target.value}))} />
                  </div>
                </div>
                <button className="lp-login-submit" onClick={() => alert('Department login submitted')}>Department Sign In</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="lp-hero" id="main">
        <div className="lp-hero-pattern" />
        <div className="lp-hero-glow" />
        <div className="lp-hero-inner">
          <div className="lp-hero-tag">
            <span className="lp-hero-tag-dot" />
            RDPR Karnataka · NIC · Digital India Initiative
          </div>
          <h1>Rural Property Records, <span>Now Fully Digital</span></h1>
          <div className="lp-hero-kn">ಗ್ರಾಮೀಣ ಆಸ್ತಿ ದಾಖಲಾತಿ ಈಗ ಡಿಜಿಟಲ್ ಆಗಿದೆ</div>
          <p className="lp-hero-desc">
            e-Swathu is Karnataka's official digital portal for all non-agricultural properties under
            Gram Panchayat jurisdiction. Download Form 9, Form 11B, e-Khata and track mutations —
            instantly, securely, free of cost.
          </p>
          <div className="lp-search-box">
            <input
              type="text"
              placeholder="Property ID, owner name, or survey number…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select value={searchDistrict} onChange={e => setSearchDistrict(e.target.value)}>
              <option value="">All Districts</option>
              {['Bengaluru Rural','Mysuru','Tumakuru','Hassan','Mandya','Shivamogga','Dharwad','Belagavi','Kalaburagi']
                .map(d => <option key={d}>{d}</option>)}
            </select>
            <button className="lp-search-btn" onClick={() => alert(`Search: ${searchQuery} in ${searchDistrict || 'All Districts'}`)}>
              Search →
            </button>
          </div>
          <div className="lp-search-note">No login needed to search · Free to access · Available 24×7</div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="lp-stats-bar">
        <div className="lp-stats-inner">
          {[['2.4 Cr+','Properties Digitised'],['6,022','Gram Panchayats'],['31','Districts Covered'],['18 L+','Documents Issued (2026)']]
            .map(([n,l]) => (
              <div className="lp-stat" key={l}>
                <div className="lp-snum">{n}</div>
                <div className="lp-slabel">{l}</div>
              </div>
            ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-about" id="about">
        <div className="lp-about-inner lp-fade" ref={addFadeRef}>
          <div className="lp-about-body">
            <div className="lp-eyebrow">About e-Swathu</div>
            <div className="lp-sec-title">Karnataka's Digital Rural Property Record System</div>
            <p>e-Swathu (ಇ-ಸ್ವತ್ತು) is an online property management system introduced by the Government of Karnataka's Rural Development and Panchayat Raj (RDPR) Department. It was created to digitise and standardise non-agricultural property records for all properties falling under the jurisdiction of Gram Panchayats across the state.</p>
            <p>The system maintains digital records of property ownership, tax assessment, classification, and mutation history — covering over 6,000 Gram Panchayats and more than 2.4 crore properties statewide. All documents are digitally signed by the PDO and carry a QR code for instant verification.</p>
            <p>e-Swathu 2.0, launched in 2025, brings real-time integration with Bhoomi and Kaveri Online Services, Aadhaar-based citizen verification, and mobile-first access — making it the most advanced rural property records system in India.</p>
          </div>
          <div className="lp-feat-list">
            {[
              ['📄','Form 9 — Property Register Extract',  'Issued by Gram Panchayat for non-agricultural properties. Required for property sale, registration, loan applications, and building permits. Digitally signed by PDO.'],
              ['📋','Form 11B — Demand & Collection Register','Shows tax assessment, payment history, and mutation trail. Essential to verify legal status before purchase.'],
              ['🏡','e-Khata — Digital Ownership Certificate','The digital version of the Khata, linking property ownership to official records. Required by banks and courts.'],
              ['🔄','Mutation — Ownership Transfer',       'Apply online for property transfer after sale, inheritance, or gift. Track status from submission to approval.'],
            ].map(([ico, title, desc]) => (
              <div className="lp-feat" key={title}>
                <div className="lp-feat-ico">{ico}</div>
                <div className="lp-feat-bd">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIZEN SERVICES ── */}
      <section className="lp-svc-sec lp-fade" id="services" ref={addFadeRef}>
        <div className="lp-sec-hdr">
          <div>
            <div className="lp-eyebrow">Citizen Services</div>
            <div className="lp-sec-title">Services available without login</div>
          </div>
          <a className="lp-see-all" href="#services">View all services →</a>
        </div>
        <div className="lp-ptabs">
          {serviceTabs.map(tab => (
            <button
              key={tab}
              className={`lp-ptab ${activeServiceTab === tab ? 'lp-active' : ''}`}
              onClick={() => setActiveServiceTab(tab)}
            >{tab}</button>
          ))}
        </div>
        <div className="lp-pub-grid">
          {visibleCards.map(c => (
            <div key={c.title} className={`lp-pub-card ${c.featured ? 'featured' : ''}`}>
              <div className="lp-pc-icon">{c.icon}</div>
              <div className="lp-pc-title">{c.title}</div>
              <div className="lp-pc-desc">{c.desc}</div>
              <div className="lp-pc-link">{c.link} <Arrow /></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOTICES + RELATED PORTALS ── */}
      <section className="lp-notices lp-fade" id="notices" ref={addFadeRef}>
        {/* Notifications Panel */}
        <div className="lp-panel">
          <div className="lp-ph">
            <span>📢</span>
            <h4>Latest Notifications</h4>
            <span className="lp-ph-badge">NEW</span>
          </div>
          {notifications.map(n => (
            <div className="lp-pr" key={n.text}>
              <div className="lp-pd" style={{background: n.color}} />
              <div className="lp-pt">
                <strong>{n.text}</strong>
                {n.sub}
              </div>
            </div>
          ))}
        </div>
        {/* Related Portals Panel */}
        <div className="lp-panel">
          <div className="lp-ph">
            <span>🔗</span>
            <h4>Related Government Portals</h4>
          </div>
          {relatedPortals.map(p => (
            <div className="lp-pr" key={p.text}>
              <div className="lp-pd" style={{background: p.color}} />
              <div className="lp-pt">
                <strong>{p.text}</strong>
                {p.sub}
              </div>
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
              <div className="lp-pc-card" key={p.name}>
                <span className="lp-pc-emoji">{p.emoji}</span>
                <div className="lp-pc-name">{p.name}</div>
                <div className="lp-pc-desc">{p.desc}</div>
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
          <div style={{fontSize:11,color:'#3a2a1a',textAlign:'right',lineHeight:1.7}}>
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

export default home;