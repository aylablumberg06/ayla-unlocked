// ──────────────────────────────────────────────────────────
// Elle-Woods-themed certificate HTML generator.
// Used by both the /course/certificate page (live render) and
// the /api/certificate/email route (emailed to student).
// ──────────────────────────────────────────────────────────

export type CertificateInput = {
 name: string
 dateString?: string // e.g. "April 23, 2026"
 certId?: string // e.g. "AU-2026-8F2K1P"
 /**
 * "full" = standalone HTML doc with <html>/<head>/<body> (for email).
 * "fragment" = just the certificate markup (for rendering inside a page).
 */
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

 const css = `
 body{font-family:'DM Sans',sans-serif;background:
 radial-gradient(circle at 10% 10%, #FFD6E3 0%, transparent 45%),
 radial-gradient(circle at 90% 90%, #FFE4ED 0%, transparent 40%),
 linear-gradient(135deg, #FDF6F0 0%, #FFEAF2 100%);
 min-height:100vh;padding:48px 20px;color:#1A1A1A;margin:0;}
 .frame{max-width:1040px;margin:0 auto;background:linear-gradient(135deg,#FFFBFD,#FFF0F5);
 border-radius:28px;padding:64px 56px 72px;position:relative;
 box-shadow:0 30px 90px rgba(232,41,92,0.22);overflow:hidden;
 border:3px double rgba(232,41,92,0.35);}
 .frame::before{content:'';position:absolute;inset:18px;
 border:1px solid rgba(232,41,92,0.25);border-radius:18px;pointer-events:none;}
 .badge-row{text-align:center;margin-bottom:18px;position:relative;z-index:2;}
 .badge-tag{display:inline-block;font-family:'Cormorant Garamond',serif;
 font-size:11px;font-weight:500;letter-spacing:6px;text-transform:uppercase;
 color:#E8295C;padding:6px 18px;border-top:1px solid #E8295C;border-bottom:1px solid #E8295C;}
 .brand{text-align:center;font-family:'Cormorant Garamond',serif;font-size:18px;
 font-weight:400;margin-bottom:36px;letter-spacing:2px;color:#1A1A1A;position:relative;z-index:2;}
 .brand em{color:#E8295C;font-style:italic;}
 .hero-wrap{text-align:center;position:relative;z-index:2;margin-bottom:30px;}
 .hero-pre{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#5C5C5C;margin-bottom:6px;}
 .hero{font-family:'Great Vibes',cursive;font-size:112px;color:#E8295C;line-height:0.95;
 margin-bottom:6px;text-shadow:0 4px 30px rgba(232,41,92,0.15);}
 .hero-sub{font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;color:#5C5C5C;letter-spacing:1px;}
 .presented{text-align:center;margin:38px 0 4px;font-size:10px;letter-spacing:4px;
 text-transform:uppercase;color:#ABABAB;position:relative;z-index:2;}
 .name{text-align:center;font-family:'Pinyon Script',cursive;font-size:90px;color:#FF2E7E;
 line-height:1;padding:4px 20px 22px;display:block;position:relative;z-index:2;}
 .name-line{max-width:520px;height:1px;background:linear-gradient(to right, transparent, rgba(232,41,92,0.4), transparent);
 margin:0 auto 30px;position:relative;z-index:2;}
 .desc{text-align:center;font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:400;
 font-style:italic;line-height:1.55;color:#1A1A1A;max-width:620px;margin:0 auto 16px;position:relative;z-index:2;}
 .desc strong{color:#E8295C;font-weight:500;font-style:normal;}
 .stats{display:flex;justify-content:center;gap:30px;margin:22px 0 40px;
 font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#5C5C5C;flex-wrap:wrap;position:relative;z-index:2;}
 .stats span strong{color:#E8295C;font-weight:600;font-size:13px;}
 .seal-wrap{text-align:center;margin:32px 0 28px;position:relative;z-index:2;}
 .seal{display:inline-block;position:relative;width:120px;height:120px;}
 .seal-ring{position:absolute;inset:0;border-radius:50%;
 background:conic-gradient(from 0deg,#E8295C,#FF6B9D,#FFB3C6,#FF6B9D,#E8295C);padding:4px;}
 .seal-ring-inner{width:100%;height:100%;border-radius:50%;
 background:linear-gradient(135deg,#FFFBFD,#FFEAF2);display:flex;align-items:center;justify-content:center;}
 .seal-monogram{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:44px;color:#E8295C;font-weight:500;}
 .footer{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;position:relative;z-index:2;margin-top:16px;}
 .foot-col{flex:1;text-align:center;}
 .foot-label{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#ABABAB;margin-top:12px;}
 .signature{font-family:'Pinyon Script',cursive;font-size:50px;color:#E8295C;line-height:1;
 padding-bottom:6px;border-bottom:1px dashed rgba(232,41,92,0.35);display:inline-block;padding-left:12px;padding-right:12px;}
 .date{font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#1A1A1A;
 padding-bottom:6px;border-bottom:1px dashed rgba(232,41,92,0.35);display:inline-block;padding-left:12px;padding-right:12px;}
 .id{font-family:'Courier New',monospace;font-size:11px;color:#ABABAB;letter-spacing:1.5px;
 padding-bottom:6px;border-bottom:1px dashed rgba(232,41,92,0.35);display:inline-block;padding-left:12px;padding-right:12px;}
 .delta{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);font-family:'Cormorant Garamond',serif;
 font-style:italic;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:#E8295C;opacity:0.6;}
 @media(max-width:700px){
 .frame{padding:40px 24px 52px;}
 .hero{font-size:62px;}
 .name{font-size:58px;padding:4px 10px 14px;}
 .desc{font-size:16px;}
 .footer{flex-direction:column;gap:24px;}
 }
 `

 const body = `
 <div class="frame">
 <div class="badge-row"><span class="badge-tag">Certificate of Completion</span></div>
 <div class="brand">ayla <em>unlocked</em></div>
 <div class="hero-wrap">
 <div class="hero-pre">you did the thing. and honestly,</div>
 <div class="hero">What? Like it's hard?</div>
 <div class="hero-sub">officially presented to</div>
 </div>
 <div class="name">${escapeHtml(displayName)}</div>
 <div class="name-line"></div>
 <div class="desc">
 for completing all <strong>29 lessons</strong> of Ayla Unlocked, the course that teaches you
 how to build with AI, no coding background required, no gatekeeping. You showed up.
 You paid attention. You probably yelled at Claude at least once. <strong>Certified legendary.</strong>
 </div>
 <div class="stats">
 <span><strong>29</strong> lessons</span>
 <span><strong>0</strong> lines of code written</span>
 <span><strong>&infin;</strong> things you can now build</span>
 </div>
 <div class="seal-wrap">
 <div class="seal">
 <div class="seal-ring"><div class="seal-ring-inner"><div class="seal-monogram">AU</div></div></div>
 </div>
 </div>
 <div class="footer">
 <div class="foot-col"><div class="date">${escapeHtml(displayDate)}</div><div class="foot-label">Conferred on</div></div>
 <div class="foot-col"><div class="signature">Ayla Blumberg</div><div class="foot-label">Founder, Ayla Unlocked</div></div>
 <div class="foot-col"><div class="id">${escapeHtml(displayId)}</div><div class="foot-label">Certificate ID</div></div>
 </div>
 <div class="delta">Delta Nu &middot; Cum Laude &middot; Certified Legendary</div>
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
 // tiny deterministic-ish base36 from string
 let h = 0
 for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
 return Math.abs(h).toString(36)
}
