// ──────────────────────────────────────────────────────────
// Elle-Woods-themed certificate. Letter-landscape (11in × 8.5in),
// single-page, fully absolute-positioned for print reliability.
// Used by /course/certificate page (live render) and
// /api/certificate (emailed to student).
// ──────────────────────────────────────────────────────────

export type CertificateInput = {
 name: string
 dateString?: string
 certId?: string
 mode?: 'full' | 'fragment'
}

export function renderCertificateHtml({
 name,
 dateString,
 certId,
 mode = 'full',
}: CertificateInput): string {
 const displayName = (name || 'Certified Legend').trim().slice(0, 60)
 const displayDate = dateString || new Date().toLocaleDateString('en-US', {
 month: 'long', day: 'numeric', year: 'numeric',
 })
 const displayId = certId || `AU-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

 // Fixed pixel layout. 11in × 8.5in @ 96dpi → 1056 × 816 px.
 // Every element placed absolutely so Chrome --print-to-pdf renders
 // identically to the browser.
 const css = `
 @page{size:11in 8.5in;margin:0;}
 *{box-sizing:border-box;margin:0;padding:0;}
 html,body{margin:0;padding:0;}
 body{font-family:'DM Sans',sans-serif;color:#1A1A1A;background:#FDF6F0;}
 .frame{width:1056px;height:816px;position:relative;overflow:hidden;
 background:
 radial-gradient(ellipse 60% 50% at 8% 8%, #FFD6E3 0%, transparent 55%),
 radial-gradient(ellipse 60% 50% at 92% 92%, #FFE4ED 0%, transparent 55%),
 linear-gradient(135deg,#FFFBFD 0%,#FFEAF2 100%);}
 .border-outer{position:absolute;inset:22px;
 border:1.5px double rgba(232,41,92,0.35);border-radius:18px;pointer-events:none;}
 .border-inner{position:absolute;inset:32px;
 border:1px solid rgba(232,41,92,0.18);border-radius:12px;pointer-events:none;}

 .badge-tag{position:absolute;top:48px;left:60px;
 font-family:'Cormorant Garamond',serif;font-size:11px;font-weight:500;
 letter-spacing:5px;text-transform:uppercase;color:#E8295C;
 padding:5px 14px;border-top:1px solid #E8295C;border-bottom:1px solid #E8295C;}
 .brand{position:absolute;top:54px;right:60px;
 font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:400;
 letter-spacing:2px;color:#1A1A1A;}
 .brand em{color:#E8295C;font-style:italic;}

 .seal{position:absolute;top:50px;left:50%;transform:translateX(-50%);
 width:88px;height:88px;
 box-shadow:0 6px 18px rgba(232,41,92,0.22);border-radius:18px;}
 .seal svg{width:100%;height:100%;display:block;border-radius:18px;}

 /* Centered body block. Width 1056 → leave 80 each side. */
 .center{position:absolute;left:0;right:0;text-align:center;}

 /* Body block is shifted down so the visual center sits between the
 header (~y100) and the footer (~y720). Center of that band ≈ y410. */
 .hero{top:222px;
 font-family:'Cormorant Garamond',serif;font-size:96px;color:#1A1A1A;line-height:1;
 letter-spacing:-2px;font-weight:400;}
 .hero em{color:#E8295C;font-style:italic;font-weight:400;}
 .hero-sub{top:344px;
 font-family:'Cormorant Garamond',serif;font-size:11px;font-style:italic;
 color:#ABABAB;letter-spacing:3px;text-transform:uppercase;}
 .name{top:368px;
 font-family:'Pinyon Script',cursive;font-size:80px;color:#FF2E7E;line-height:1;}
 .name-line{position:absolute;top:470px;left:50%;transform:translateX(-50%);
 width:480px;height:1px;
 background:linear-gradient(to right,transparent,rgba(232,41,92,0.4),transparent);}
 .desc{position:absolute;top:494px;left:50%;transform:translateX(-50%);
 width:680px;
 font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:400;
 font-style:italic;line-height:1.55;color:#1A1A1A;text-align:center;}
 .desc strong{color:#E8295C;font-weight:500;font-style:normal;}
 .stats{position:absolute;top:580px;left:0;right:0;text-align:center;
 font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#5C5C5C;}
 .stats span{margin:0 14px;}
 .stats span strong{color:#E8295C;font-weight:600;font-size:12px;margin-right:5px;}

 /* Footer: 3 columns at fixed left positions. Letter landscape → 1056 wide.
 Each col centers around its anchor x. */
 .foot-col{position:absolute;bottom:74px;width:300px;text-align:center;}
 .foot-date{left:60px;}
 .foot-sig{left:50%;transform:translateX(-50%);}
 .foot-id{right:60px;}
 .foot-label{font-size:9px;letter-spacing:2.4px;text-transform:uppercase;
 color:#ABABAB;margin-top:6px;}
 .signature{font-family:'Pinyon Script',cursive;font-size:42px;color:#E8295C;
 line-height:1;padding:0 12px 4px;
 border-bottom:1px dashed rgba(232,41,92,0.34);display:inline-block;}
 .date-val{font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;
 color:#1A1A1A;padding:2px 14px 4px;
 border-bottom:1px dashed rgba(232,41,92,0.34);display:inline-block;}
 .id-val{font-family:'Courier New',monospace;font-size:11px;color:#888;letter-spacing:1.4px;
 padding:2px 12px 4px;border-bottom:1px dashed rgba(232,41,92,0.34);display:inline-block;}

 /* Browser preview (not print): center the cert in viewport. */
 @media screen{
 body{padding:24px;background:#FDF6F0;display:flex;align-items:center;justify-content:center;min-height:100vh;}
 .frame{box-shadow:0 20px 60px rgba(232,41,92,0.18);}
 }

 /* Mobile: shrink-to-fit instead of fixed pixel layout. */
 @media (max-width: 1100px){
 .frame{transform:scale(calc((100vw - 32px) / 1056));transform-origin:top left;
 margin-bottom:calc((100vw - 32px) / 1056 * 816 - 816px);}
 }
 `

 // Ayla Unlocked padlock badge — matches the brand mark used everywhere else.
 const sealSvg = `
 <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
 <rect width="256" height="256" rx="56" fill="#E8295C"/>
 <path d="M82 124 V 80 a44 44 0 0 1 88 0 V 96"
 fill="none" stroke="#FDF6F0" stroke-width="18" stroke-linecap="round"/>
 <rect x="56" y="120" width="144" height="100" rx="16" fill="#FDF6F0"/>
 <text x="128" y="195" text-anchor="middle"
 font-family="Cormorant Garamond, Cormorant, Georgia, serif"
 font-style="italic" font-size="86" font-weight="500"
 fill="#E8295C" letter-spacing="-2">AU</text>
 </svg>
 `

 const body = `
 <div class="frame">
 <div class="border-outer"></div>
 <div class="border-inner"></div>
 <span class="badge-tag">Certificate of Completion</span>
 <span class="brand">Ayla <em>Unlocked</em></span>
 <div class="seal">${sealSvg}</div>
 <div class="center hero">Ayla <em>Unlocked</em></div>
 <div class="center hero-sub">officially presented to</div>
 <div class="center name">${escapeHtml(displayName)}</div>
 <div class="name-line"></div>
 <div class="desc">
 for completing all <strong>29 lessons</strong> of Ayla Unlocked, the course that teaches you
 how to build with AI, no coding background required, no gatekeeping. You showed up.
 You paid attention. You probably yelled at Claude at least once. <strong>Certified legendary.</strong>
 </div>
 <div class="center stats">
 <span><strong>29</strong>lessons</span>
 <span><strong>0</strong>lines of code written</span>
 <span><strong>&infin;</strong>things you can now build</span>
 </div>
 <div class="foot-col foot-date"><span class="date-val">${escapeHtml(displayDate)}</span><div class="foot-label">Conferred on</div></div>
 <div class="foot-col foot-sig"><span class="signature">Ayla Blumberg</span><div class="foot-label">Founder, Ayla Unlocked</div></div>
 <div class="foot-col foot-id"><span class="id-val">${escapeHtml(displayId)}</span><div class="foot-label">Certificate ID</div></div>
 </div>
 `

 if (mode === 'fragment') {
 return `<style>${css}</style>${body}`
 }

 return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Your Ayla Unlocked Certificate</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@400;500&family=Pinyon+Script&family=Great+Vibes&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>${body}</body>
</html>`
}

function escapeHtml(s: string) {
 return s
 .replaceAll('&', '&amp;')
 .replaceAll('<', '&lt;')
 .replaceAll('>', '&gt;')
 .replaceAll('"', '&quot;')
 .replaceAll("'", '&#39;')
}

export function makeCertId(seed?: string): string {
 const rnd = (seed ? hash(seed) : Math.random().toString(36).slice(2))
 .replace(/[^A-Z0-9]/gi, '')
 .toUpperCase()
 .slice(0, 6)
 return `AU-${new Date().getFullYear()}-${rnd || 'XXXXXX'}`
}

function hash(s: string): string {
 let h = 0
 for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
 return Math.abs(h).toString(36)
}
