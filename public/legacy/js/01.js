
const HERO="/legacy/assets/b935c1d0321c2adf.jpg",SKYIMG="/legacy/assets/96a08a13b994cb52.jpg",CHAIR="/legacy/assets/a7fe12928b714459.webp";
document.documentElement.style.setProperty("--skyimg","url("+SKYIMG+")");
const LOGO=`<svg viewBox="0 0 100 84" aria-hidden="true" fill="none" stroke-linecap="round"><path d="M50 14H28a14 14 0 0 0 0 28H68a14 14 0 0 1 0 28H46" stroke="currentColor" stroke-width="15"/><path d="M60 8A26 26 0 0 1 87 32" stroke="#6fa5bd" stroke-width="9"/></svg>`;
const CLOUDS=`<svg class="clouds" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><filter id="c" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 2.4 -1.05"/><feGaussianBlur stdDeviation="4"/></filter></defs><g class="drift"><rect x="-10" width="120" height="100" filter="url(#c)" opacity=".85"/></g></svg>`;
const ph=(k,label,cls="")=>`<div class="ph ${cls}" role="img" aria-label="${label}">${IMAGES[k]?`<img src="${IMAGES[k]}" alt="${label}">`:`<span>Photo slot: ${label}</span>`}</div>`;
const U={shore:"/legacy/assets/61d65cb4d77a9e37.jpg",student:"/legacy/assets/f9c8f88b21912345.jpg",nairobi_flat:"/legacy/assets/c2caaf52d643ff47.webp",milkyway:"/legacy/assets/f1d727280477e01a.jpg",neoclass:"/legacy/assets/ba4af1aa9465eb9c.jpg",notebook_mat:"/legacy/assets/4d706d34c7349dc4.jpg",studio_desk:"/legacy/assets/a7a08ca3027f82a8.jpg",abstract3d:"/legacy/assets/ebec56ad738d8c72.jpg",businessman:"/legacy/assets/a9984df842f12467.jpg",arch_model:"/legacy/assets/d1212d5cb99830d4.jpg",armchair_plant:"/legacy/assets/774830b5fa7dbb67.jpg",smoke:"/legacy/assets/a8d1f9b6851cbd6c.jpg"};
const IMAGES={case1:U.arch_model,case2:U.neoclass,case3:U.abstract3d,studio1:U.businessman,studio2:U.studio_desk,studio3:U.armchair_plant};
const pages=[["work","Work"],["approach","Approach"],["perspective","Perspective"],["create","Let’s create"],["studio","Studio"]];
const nav=(r,solid)=>`<nav class="${solid?'solid':''}"><a class="brand" href="#/" aria-label="Savai home">${LOGO}<span>Savai<i>.</i></span></a><ul>${pages.map(([h,t])=>`<li><a href="#/${h}" class="${r===h?"on":""}">${t}</a></li>`).join("")}</ul></nav>`;
const foot=()=>`<footer><div class="fbg"><img src="${U.smoke}" alt=""></div><div class="wrap"><div class="brand">${LOGO}<span>Savai<i>.</i></span></div><p class="signoff">ORIGINATE</p><p><a href="#/work">Work</a> · <a href="#/approach">Approach</a> · <a href="#/perspective">Perspective</a> · <a href="#/create">Let’s create</a> · <a href="#/studio">Studio</a> · <a href="#/studio/contact">Say hello</a></p><p style="margin-top:14px">www.savai.co.ke · Nairobi</p></div></footer>`;
const plainCta=()=>`<section class="dark b"><div class="wrap"><h2 class="narrow">The market already has a favourite.</h2><h2 class="narrow" style="margin:10px 0 32px">What will you give it to remember?</h2><a class="btn" href="#/studio/contact" style="background:#fff;color:#0a0a0a">Originate →</a></div></section>`;

/* ---- original artwork (drawn in code, not photographic, not AI-generated) ---- */
const wash=(x,y,w,h,c)=>`<div class="wash" style="left:${x};top:${y};width:${w};height:${h};background:${c}"></div>`;
/* Hand-drawn style Nairobi skyline. Pure function -> SVG string. Seeded, so it renders the same every time.
   Heights are scaled from published figures (1px ≈ 0.8m): Britam ~200m, GTC Office 184m, Times Tower 140m,
   Teleposta 120m, KICC 105m, Nyayo House 84m. Forms are stylised, not traced from photographs. */
function buildSketchSkyline(){
 let seed=11;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 const J=(a=1)=>(rnd()-.5)*2*a, f=n=>n.toFixed(1), G=300;
 let cid=0;
 const P=(pts,o={})=>{const close=o.close!==false,w=o.w||1.7;let d='';
  for(let k=0;k<2;k++){const a=k?1.5:.5;
   d+=`<path d="M${pts.map(p=>f(p[0]+J(a))+' '+f(p[1]+J(a))).join(' L')}${close?' Z':''}" stroke-width="${k?f(w*.55):w}" opacity="${k?.42:.92}"/>`}
  return d};
 const L=(x1,y1,x2,y2,w=.8,op=.35)=>`<path d="M${f(x1+J(.4))} ${f(y1+J(.4))} L${f(x2+J(.4))} ${f(y2+J(.4))}" stroke-width="${w}" opacity="${op}"/>`;
 const grid=(x,y,w,h,cw,rh,op=.3)=>{let s='';for(let yy=y+rh;yy<y+h-1;yy+=rh)s+=L(x+2,yy,x+w-2,yy,.6,op);for(let xx=x+cw;xx<x+w-1;xx+=cw)s+=L(xx,y+2,xx,y+h-2,.55,op*.85);return s};
 const hatch=(x,y,w,h,gap=4.5,op=.3)=>{const id='h'+(cid++);let s=`<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})">`;
  for(let i=-h;i<w;i+=gap)s+=L(x+i,y+h,x+i+h,y,.7,op);return s+'</g>'};
 const slab=(x,w,h,o={})=>{const top=G-h,cw=o.cw||7,rh=o.rh||6;let s=P(o.pts||[[x,G],[x,top],[x+w,top],[x+w,G]]);
  s+=grid(x,top,w,h,cw,rh,o.gop||.28);if(o.shade!==false)s+=hatch(x+w*.62,top,w*.38,h,o.gap||4.5,o.hop||.3);return s};
 const mast=(x,y,len)=>L(x,y,x,y-len,1.3,.85)+L(x-4,y-len*.35,x+4,y-len*.35,.8,.6)+L(x-3,y-len*.65,x+3,y-len*.65,.8,.6);
 const acacia=(x,h)=>{const y=G-h;return `<path d="M${x} ${G} C${x+2} ${G-h*.4} ${x-3} ${G-h*.7} ${x+1} ${y}" stroke-width="1.6" opacity=".75"/>`+
  `<path d="M${x-22} ${y+3} C${x-14} ${y-9} ${x+14} ${y-9} ${x+24} ${y+2} C${x+12} ${y+7} ${x-10} ${y+7} ${x-22} ${y+3}Z" stroke-width="1.3" opacity=".7"/>`+L(x-14,y+2,x-6,y-3,.6,.4)+L(x+2,y+3,x+10,y-3,.6,.4)};
 let s='';
 /* far-left CBD filler */
 s+=slab(0,34,60,{cw:6,rh:6,gop:.2,hop:.2})+slab(38,30,88,{cw:6,rh:6,gop:.2,hop:.2});
 /* GTC – Westlands cluster: podium + office tower (tallest) + hotel tower + two residential towers */
 s+=P([[88,G],[88,G-36],[298,G-36],[298,G]],{w:1.4})+grid(88,G-36,210,36,9,6,.22);
 s+=slab(100,46,176,{pts:[[100,G],[100,G-166],[146,G-176],[146,G]],cw:6,rh:6});
 s+=slab(150,56,230,{pts:[[150,G],[150,G-214],[161,G-214],[161,G-230],[195,G-230],[195,G-214],[206,G-214],[206,G]],cw:7,rh:6});
 s+=L(172,G-230,172,G-248,1.2,.8)+L(184,G-230,184,G-248,1.2,.8)+L(172,G-248,184,G-248,1,.7);
 s+=slab(210,40,145,{cw:6,rh:7})+slab(254,38,128,{pts:[[254,G],[254,G-128],[292,G-134],[292,G]],cw:6,rh:7});
 /* Nyayo House – broad concrete slab, small plant room on top, mast */
 s+=slab(330,84,105,{cw:6,rh:5,gop:.32});
 s+=P([[352,G-105],[352,G-121],[392,G-121],[392,G-105]],{w:1.4})+mast(372,G-121,24);
 for(let x=342;x<414;x+=12)s+=L(x,G-105,x,G,.9,.28);
 /* Teleposta Towers – stepped top with tall mast */
 s+=slab(434,48,150,{pts:[[434,G],[434,G-138],[444,G-138],[444,G-150],[472,G-150],[472,G-138],[482,G-138],[482,G]],cw:6,rh:6});
 s+=mast(458,G-150,42);
 /* KICC – cylindrical shaft, saucer roof, pod, mast; conical amphitheatre beside it */
 s+=P([[528,G],[528,G-118],[570,G-118],[570,G]],{w:1.7});
 for(let x=533;x<568;x+=4.2){const c=Math.abs(x-549)/21;s+=L(x,G-116,x,G-2,.6,.14+c*.32)}
 for(let y=G-110;y<G-4;y+=7)s+=L(529,y,569,y,.55,.2);
 s+=`<path d="M508 ${G-121} C520 ${G-113} 578 ${G-113} 590 ${G-121} C578 ${G-127} 520 ${G-127} 508 ${G-121}Z" stroke-width="1.7" opacity=".9"/>`;
 s+=P([[534,G-124],[537,G-140],[561,G-140],[564,G-124]],{w:1.5})+grid(535,G-140,28,16,5,5,.3)+mast(549,G-140,26);
 s+=P([[588,G],[588,G-26],[650,G-26],[650,G]],{w:1.4})+grid(588,G-26,62,26,8,6,.25);
 s+=P([[584,G-26],[619,G-66],[654,G-26]],{close:false,w:1.6})+L(619,G-66,619,G-76,1.2,.8)+hatch(619,G-66,35,40,4,.28);
 /* Times Tower – dense grid shaft with set-back crown on a wide banking-hall podium */
 s+=P([[672,G],[672,G-38],[794,G-38],[794,G]],{w:1.5})+grid(672,G-38,122,38,10,6,.24);
 s+=slab(702,62,175,{pts:[[702,G],[702,G-160],[710,G-160],[710,G-175],[756,G-175],[756,G-160],[764,G-160],[764,G]],cw:7,rh:5,gop:.34});
 /* Britam Tower – dark prism, top corner cut away, 63 m spire */
 s+=P([[822,G],[822,G-128],[868,G-192],[904,G-160],[904,G]],{w:1.9});
 s+=L(868,G-192,858,G,1.2,.6)+hatch(858,G-192,46,192,3.2,.42)+L(822,G-128,858,G-40,.9,.45)+L(868,G-192,904,G-100,.9,.45);
 s+=L(868,G-192,868,G-250,1.5,.9)+L(868,G-192,861,G-214,.9,.6)+L(868,G-192,875,G-214,.9,.6)+L(864,G-232,872,G-232,.8,.6);
 /* UAP Old Mutual, NSSF twins, KCB Plaza */
 s+=slab(930,46,204,{pts:[[930,G],[930,G-198],[976,G-206],[976,G]],cw:6,rh:6});
 s+=slab(996,30,129,{cw:6,rh:6})+slab(1030,30,129,{cw:6,rh:6})+L(1026,G-80,1030,G-80,1.2,.7)+L(1026,G-76,1030,G-76,1.2,.7);
 s+=slab(1078,44,125,{pts:[[1078,G],[1078,G-118],[1122,G-125],[1122,G]],cw:6,rh:6});
 /* right-hand filler */
 [[1134,34,62],[1172,40,92],[1216,30,52],[1250,44,78],[1298,32,44],[1334,38,64],[1376,30,40]].forEach(b=>{s+=slab(b[0],b[1],b[2],{cw:6,rh:6,gop:.2,hop:.2})});
 /* ground, acacias for a sense of Nairobi */
 s+=`<path d="M0 ${G} L1400 ${G}" stroke-width="2.2" opacity=".9"/>`+L(0,G+4,1400,G+4,.8,.35);
 s+=acacia(311,30)+acacia(808,32)+acacia(1102,28)+acacia(1290,26);
 /* hand-lettered labels */
 const lab=(x,t)=>`<text x="${x}" y="${G+24}" text-anchor="middle">${t}</text>`+L(x,G+6,x,G+11,.9,.6);
 const labels=lab(198,'GTC')+lab(358,'Nyayo House')+lab(474,'Teleposta')+lab(549,'KICC')+lab(733,'Times Tower')+lab(863,'Britam');
 return `<svg class="sky-sketch" viewBox="0 0 1400 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hand-drawn sketch of the Nairobi skyline: GTC towers, Nyayo House, Teleposta Towers, KICC, Times Tower and Britam Tower" preserveAspectRatio="xMidYMax slice">`+
  `<g fill="none" stroke="#2b2622" stroke-linejoin="round" stroke-linecap="round">${s}</g>`+
  `<g fill="#2b2622" opacity=".78" font-family="Caveat,'Bradley Hand','Segoe Script',cursive" font-size="18">${labels}</g></svg>`;
}

const sketchSkyline=buildSketchSkyline();

const pulseSVG=`<svg class="pulse-line" viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path class="pulse-base" d="M0 100 L120 100 L145 40 L170 140 L195 60 L215 100 L320 100 L345 20 L365 150 L390 100 L640 100"/><path class="pulse-path" d="M0 100 L120 100 L145 40 L170 140 L195 60 L215 100 L320 100 L345 20 L365 150 L390 100 L640 100"/></svg>`;
const notebookArt=(title,lines)=>`<div class="notebook"><div class="tape" style="left:40px"></div><div class="ring">${Array.from({length:6}).map(()=>"<i></i>").join("")}</div><h3 style="font-family:'Playfair Display',serif;font-size:22px;margin-bottom:14px">${title}</h3>${lines.map(l=>`<div class="rl">${l}</div>`).join("")}</div>`;
const steps=[["Find","We study your audience, culture, category and competitors to see where the market is already decided."],["Position","We choose the space you can own and the idea that holds it."],["Express","Name, language, identity and story, built from the position, not from taste."],["Activate","Launch and campaign work that puts the position in front of the people it is for."]];
const looks={Audience:"Who is actually deciding, and what do they already believe about your category?",Culture:"What is moving in the city, the language and the moment that your brand can stand beside?",Category:"We map what every brand in your category says, so you can see what nobody does.",Competition:"Who owns the favourite position today, and how did they earn it?",Ambition:"Where you want to be in three years, and what the market must believe to get you there."};
const cases=[["Client name","Challenger fintech","A category that trusted incumbents. We found the one belief customers were ready to switch for.","case1","tall"],["Client name","Regional beverage","Crowded shelf, no clear reason to choose. We built a position and a voice around it.","case2","tall"],["Client name","Consumer service","From a good product to a clear place in the market, expressed across launch and daily use.","case3","tall"]];

/* ---- pricing data, from the Savai Creative service tiers doc ---- */
const TIERS=[
 {name:"Bearings",tag:"TIER 01",best:"Brands that need direction",line:"Find out where you stand and which way to go.",format:"Half-day working session",timeline:"Session within 2 weeks of booking; brief within 5 working days after",payment:"In full, to book",deliver:["A brand audit report","A positioning statement","A recommended direction","A written creative brief"],detail:{what:"A half-day session with your founding team. We diagnose where the brand stands today and name the gaps.",expect:"A working session, not a pitch. You leave with a clear read on your brand and a brief you can act on, with us or without us.",next:"The brief carries straight into Originate. If you sign Originate within 30 days of receiving the brief, your Bearings fee is credited in full against it.",timelineTable:[["Session held","Within 2 weeks of booking and payment"],["Brand materials sent to Savai","3 working days before the session"],["Written brief delivered","Within 5 working days after the session"]]}},
 {name:"Originate",tag:"TIER 02",best:"Brands ready to build — where most clients land",line:"Your brand, built from scratch.",format:"Project, strategy to handover",timeline:"10 weeks quoted, 8 targeted",payment:"50% to start / 30% on identity approval / 20% at handover",deliver:["Brand strategy","Logo and visual system (colour, type)","Brand guidelines book","Voice and messaging framework, incl. messaging pillars","Social and stationery templates"],mid:true,detail:{what:"We work through strategy first, then the visual identity and voice, and hand it all over as a complete system.",expect:"Strategy comes before design, so you see the thinking before you see the logo. You finish with everything you need to run the brand consistently without us in the room.",phases:[["Strategy","Weeks 1–3","Discovery, audit and positioning, closing with one approval"],["Identity","Weeks 3–7","2–3 logo routes, then the chosen route refined; voice and messaging developed alongside"],["System","Weeks 7–10","Guidelines book, social and stationery templates, final files and handover"]],revisions:[["Strategy","1 round"],["Logo, on the chosen route","2 refinement rounds"],["Guidelines and templates","1 round"]]}},
 {name:"Brand Heartbeat",tag:"TIER 03",best:"Brands that need ongoing guidance",line:"We stay in the room, as your fractional brand director.",format:"Monthly retainer",timeline:"Ongoing; 3-month minimum",payment:"Monthly, in advance",deliver:["Monthly creative reviews","Quarterly strategy sessions","Campaign approval and guidance","Ongoing brand consulting"],detail:{what:"An ongoing monthly retainer. We review your creative, approve campaigns, and run strategy sessions to keep the brand consistent and moving.",expect:"A standing relationship with a set rhythm, not on-demand design work. Three-month minimum commitment.",notIncluded:"Producing the campaign creative itself. The retainer covers review, approval and direction. Design and production work is scoped and quoted separately.",rhythm:[["Onboarding","First 2 weeks: review of existing assets, monthly and quarterly calendar set"],["Creative review","Monthly"],["Strategy session","Quarterly"],["Campaign approvals","Returned within 2 working days"],["Questions between reviews","Answered within 3 working days"]]}}
];
const tierCard=t=>`<div class="tier${t.mid?" mid":""}"><div class="tn">${t.tag}</div><h3>${t.name}</h3><p class="best">${t.best}</p><p style="margin-top:10px;font-size:15px">${t.line}</p><ul>${t.deliver.map(d=>`<li>${d}</li>`).join("")}</ul><div class="meta"><div><span>Format</span><span>${t.format}</span></div><div><span>Timeline</span><span style="text-align:right;max-width:60%">${t.timeline}</span></div><div><span>Payment</span><span style="text-align:right;max-width:60%">${t.payment}</span></div></div></div>`;
const tierAcc=t=>{const d=t.detail;let extra="";
 if(d.timelineTable)extra=`<table>${d.timelineTable.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>`;
 if(d.phases)extra=`<table><tr><th>Phase</th><th>Weeks</th><th>Outcome</th></tr>${d.phases.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table><p style="margin-top:14px"><b>Revision rounds</b></p><table>${d.revisions.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>`;
 if(d.rhythm)extra=`<table>${d.rhythm.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>`;
 return `<div class="acc-item"><button class="acc-h" data-t="${t.name}"><span>${t.name} — full detail</span><span>+</span></button><div class="acc-b"><div><p>${d.what}</p><p style="margin-top:12px">${d.expect}</p>${extra}${d.next?`<p style="margin-top:12px"><b>What comes next:</b> ${d.next}</p>`:""}${d.notIncluded?`<p style="margin-top:12px"><b>Not included:</b> ${d.notIncluded}</p>`:""}</div></div></div>`};

const V={
"":()=>`<header class="hero2">${CLOUDS}<div class="wrap txt"><div class="tagline-wrap" id="tagline-wrap"><h1 class="tagline-orange" id="tagline-orange">we know your story....</h1><h1 class="tagline-split" id="tagline-split">we know your story....</h1></div><a class="btn cta" href="#/studio">Take a seat →</a></div><div class="photo"><img src="${HERO}" alt="Nairobi skyline rising above a canopy of trees under a clear morning sky"></div></header>
<section class="cloudy trans b"><div class="wrap"><h2 class="narrow">Good products don't guarantee good positions.</h2><p class="narrow" style="margin-top:20px;font-size:19px">The business exists. The city can see it. But nobody has a clear view of why it should be chosen.</p></div></section>
<section class="alt b"><div class="wrap"><h2 class="narrow">We don't start with how you should look.</h2><p style="font-size:24px;margin:16px 0 40px" class="brand">We start with what you should mean.</p><div class="grid">${steps.map(s=>`<div class="card"><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div><p style="margin-top:36px"><a class="btn" href="#/approach">Explore the approach →</a></p></div></section>
<section class="b"><div class="wrap"><h2>Selected work</h2><p class="narrow" style="margin-top:16px;color:var(--mut)">Case studies are on the way — for now, here’s where they’ll live.</p><p style="margin-top:20px"><a class="btn ghost" href="#/work">Visit the work page →</a></p></div></section>
<section class="b alt"><div class="wrap"><h2 class="narrow">Three ways to work with us.</h2><p class="narrow" style="margin:16px 0 30px">Each has a defined scope, a clear list of what you get, and a fixed price. Start where your brand is today.</p><a class="btn" href="#/create">See pricing →</a></div></section>${plainCta()}`,

work:()=>`<header class="nbhead" style="min-height:78svh"><img src="${U.milkyway}" alt="A lone tree under the Milky Way" style="width:100%;height:100%;left:0;top:0;object-position:center 38%"><div class="wrap txt" style="padding-bottom:34px"><h1 style="font-size:clamp(32px,5vw,56px);text-shadow:0 2px 18px rgba(0,0,0,.6)">Work</h1><p style="text-shadow:0 2px 12px rgba(0,0,0,.7)">Proof that a clear position changes the outcome.</p></div></header>
<section class="b"><div class="wrap" style="text-align:center;padding:60px 0"><h2>Coming soon.</h2><p class="narrow" style="margin:16px auto 0">We’re only just getting started — case studies will land here as soon as the work does.</p></div></section>${plainCta()}`,

approach:()=>`<header class="nbhead"><img src="${U.shore}" alt="Sunlit water meeting a rocky shore"><div class="wrap txt" style="color:#fff"><h1>Approach</h1><p>Find, position, express, activate.</p></div></header>
<section class="alt b"><div class="wrap"><div class="grid">${steps.map((s,i)=>`<div class="card"><h3>${i+1}. ${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div></div></section>
<section class="b" style="position:relative;overflow:hidden"><div class="wash" style="left:-6%;top:10%;width:280px;height:280px;background:#6fa5bd"></div><div class="wash" style="right:-6%;bottom:0;width:220px;height:220px;background:#c0563a"></div><div class="wrap" style="position:relative"><h2 class="narrow">The brand is never the whole story.</h2><div class="row" id="chips">${Object.keys(looks).map((k,i)=>`<button class="chip" aria-pressed="${i==0}" data-k="${k}">${k}</button>`).join("")}</div><p class="panel" id="panel">${looks.Audience}</p><div class="markers">${Object.keys(looks).map(k=>`<div class="mk"><span>${k.toUpperCase()}</span></div>`).join("")}</div></div></section>${plainCta()}`,

perspective:()=>`<header class="head plain" style="position:relative;overflow:hidden;min-height:88svh;padding-top:110px;background:linear-gradient(180deg,#f4f2ee,#efece4 70%,#f4f2ee)">${sketchSkyline}<div class="wrap persp-top" style="position:relative"><h1>Your brand is a heartbeat, and currently it's flatlining.</h1><div class="pulse-wrap">${pulseSVG}</div></div></header>
<section class="b"><div class="wrap"><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
<div><div class="ph tall" style="min-height:380px"><img src="${U.notebook_mat}" alt="An open notebook and pencil, ready for field notes"></div><div style="margin-top:16px" class="note">Nicheness over noise. Good products don't guarantee good positions. Start with what you should mean, not how you should look.</div></div>
<div><h3>Notes from the studio</h3><p style="margin-top:10px;color:var(--mut)">Short, working thoughts on positioning, category and voice — the kind we'd scribble in the notebook before they become a brief.</p><p class="note" style="margin-top:18px">Article titles above are sample text.</p><a class="btn ghost" href="#/studio/contact" style="margin-top:20px">Talk to us about yours →</a></div>
</div></div></section>
<section class="b alt"><div class="wrap"><h2 class="narrow">Check out BUNI.</h2><p class="narrow" style="margin-top:14px;color:var(--mut)">Newsletters and articles from Savai — on positioning, category and voice.</p>
<div class="grid" style="margin-top:36px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
<div class="card"><h3 style="font-size:17px">The BUNI newsletter</h3><p>Short, regular notes on brand and category, sent when we have something worth saying.</p><a class="btn ghost" href="#/studio/contact" style="margin-top:14px;display:inline-block">Get the next issue →</a></div>
<div class="card"><h3 style="font-size:17px">Articles</h3><p>Longer pieces on positioning, voice and the work of building a challenger brand.</p><p class="note" style="margin-top:10px">Coming soon.</p></div>
</div></div></section>${plainCta()}`,

create:()=>`<header class="nbhead" style="min-height:48svh"><img src="${U.student}" alt="A client, thrilled to get their brand moving"><div class="wrap txt"><h1 style="font-size:clamp(32px,5vw,56px)">Let’s create.</h1><p class="narrow">Three ways to work with us. Each has a defined scope, a clear list of what you get, and a fixed price. Start where your brand is today. Most brands move through all three, in whatever order they need.</p></div></header>
<section class="b"><div class="wrap"><div class="tiers">${TIERS.map(tierCard).join("")}</div>
<h3 style="margin-top:56px">Full detail, tier by tier</h3><div class="acc">${TIERS.map(tierAcc).join("")}</div>
<h3 style="margin-top:56px">Terms of engagement</h3><p class="note" style="margin-top:6px">These apply across all three tiers unless stated otherwise.</p>
<div class="grid" style="margin-top:20px"><div class="card"><h3 style="font-size:17px">Feedback and timelines</h3><p>Feedback is due within 3 working days of each delivery. Delays on the client side pause the project clock. One consolidated set of feedback per round keeps revisions clean and on time.</p></div>
<div class="card"><h3 style="font-size:17px">Ownership and rights</h3><p>You own the final approved deliverables and source files once the final payment has cleared. Savai keeps unused concepts and the right to show finished work in its portfolio. Typeface licences and other third-party costs are paid by the client.</p></div>
<div class="card"><h3 style="font-size:17px">Scope</h3><p>Anything outside the deliverables listed for a tier is scoped and quoted separately before work begins.</p></div></div>
<p style="margin-top:40px"><a class="btn" href="#/studio/contact">Start with Bearings →</a></p>
</div></section>`,

studio:()=>`<header class="nbhead"><img src="${U.studio_desk}" alt="An open notebook and portfolio on a studio desk"><div class="wrap txt"><h1 style="font-size:clamp(32px,5vw,56px)">We keep the notebook open.</h1><p>Real people, real desks, real Nairobi.</p></div></header>
<section class="studio-sec" aria-label="We're in studio"><div class="chairbg" aria-hidden="true"><img src="${U.armchair_plant}" alt=""></div>
<div class="ttl"><h2 class="t1">WE'RE IN STUDIO.</h2><h2 class="t2">Take a seat.</h2><p class="t3">(There's plenty of paint to go around.)</p></div>
</section>
<section class="dark b" id="contact" style="position:relative;overflow:hidden;background:url('${U.smoke}') center/cover"><div class="wrap" style="position:relative"><h2 style="text-shadow:0 2px 16px rgba(0,0,0,.7)">Say hello.</h2><div class="formcard"><p class="lead">Tell us about your brand and we'll reply within 3 working days.</p><label for="n">Name</label><input id="n" autocomplete="name"><label for="e">Email</label><input id="e" type="email" autocomplete="email"><label for="m">What's going on?</label><textarea id="m" rows="4" placeholder="Dreaming is legal here."></textarea><button class="btn" id="send">Start the conversation →</button><p class="ok" id="ok" role="status"></p></div></div></section>`
};

const splats=()=>{const C=["#c0563a","#e3a26a","#6fa5bd","#e8c05a","#8a5a45","#d97fa0"];let t="",seed=17;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};let s="";for(let i=0;i<26;i++){const x=rnd()*100,y=rnd()*100,sz=14+rnd()*70,c=C[i%C.length],op=.14+rnd()*.22;s+=`<div class="splat" style="left:${x}%;top:${y}%;width:${sz}px;height:${sz*(.6+rnd()*.5)}px;background:${c};opacity:${op.toFixed(2)};transform:translate(-50%,-50%) rotate(${(rnd()*60-30).toFixed(0)}deg)"></div>`}
for(let i=0;i<10;i++){const x=rnd()*100,y=rnd()*100,c=C[i%C.length];s+=`<div class="splat" style="left:${x}%;top:${y}%;width:4px;height:${18+rnd()*24}px;background:${c};opacity:.28;border-radius:50% 50% 50% 0;transform:translate(-50%,-50%) rotate(${(rnd()*360).toFixed(0)}deg)"></div>`}
return s};

function stopChair(){const c=window.__chair;if(c){cancelAnimationFrame(c.raf);c.ro&&c.ro.disconnect();c.off&&c.off();if(c.r){c.r.dispose()}window.__chair=null}}
function initChair(el){
 const fallback=()=>{el.innerHTML='<img src="'+CHAIR+'" alt="" style="height:100%;width:auto;display:block;margin:0 auto">'};
 if(!window.THREE)return fallback();
 try{
 const T=THREE,W=()=>el.clientWidth||400,H=()=>el.clientHeight||400;
 const r=new T.WebGLRenderer({antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));r.setSize(W(),H());r.outputEncoding=T.sRGBEncoding;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.05;el.appendChild(r.domElement);
 const sc=new T.Scene(),cam=new T.PerspectiveCamera(26,W()/H(),.1,50);cam.position.set(.3,1.35,7.2);cam.lookAt(0,1,0);
 sc.add(new T.AmbientLight(0xfff3e6,.55));const key=new T.DirectionalLight(0xfff1dd,1.15);key.position.set(3.2,5.5,4);sc.add(key);
 const fill=new T.PointLight(0xffd9b0,.55,22);fill.position.set(-4,2,3);sc.add(fill);const rim=new T.PointLight(0xbfe0ff,.7,22);rim.position.set(2.5,2.4,-4.5);sc.add(rim);
 const belowLight=new T.PointLight(0xffffff,.22,10);belowLight.position.set(0,.2,3);sc.add(belowLight);
 // ground contact shadow via simple gradient disc
 const groundTex=new T.CanvasTexture((()=>{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');const g=x.createRadialGradient(128,128,10,128,128,128);g.addColorStop(0,'rgba(0,0,0,.4)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,256,256);return c})());
 const groundDisc=new T.Mesh(new T.CircleGeometry(1.15,48),new T.MeshBasicMaterial({map:groundTex,transparent:true}));groundDisc.rotation.x=-Math.PI/2;groundDisc.position.y=-.185;sc.add(groundDisc);
 // heart-stitched seat band texture, higher fidelity
 const cv=document.createElement('canvas');cv.width=1024;cv.height=256;const x=cv.getContext('2d');
 const grad=x.createLinearGradient(0,0,0,256);grad.addColorStop(0,'#f6a4ae');grad.addColorStop(.5,'#ef8b98');grad.addColorStop(1,'#e57685');x.fillStyle=grad;x.fillRect(0,0,1024,256);
 x.strokeStyle='rgba(255,255,255,.55)';x.setLineDash([6,5]);x.lineWidth=2;x.strokeRect(14,14,1024-28,256-28);x.setLineDash([]);
 x.strokeStyle='#ffd7de';x.lineWidth=5;
 for(let i=0;i<8;i++){const cx=64+i*128,cy=128,s=28;x.beginPath();x.moveTo(cx,cy+s*.9);x.bezierCurveTo(cx-s*1.6,cy-s*.15,cx-s*.9,cy-s*1.35,cx,cy-s*.4);x.bezierCurveTo(cx+s*.9,cy-s*1.35,cx+s*1.6,cy-s*.15,cx,cy+s*.9);x.stroke()}
 const tex=new T.CanvasTexture(cv);tex.encoding=T.sRGBEncoding;tex.anisotropy=8;
 const cushTex=new T.CanvasTexture((()=>{const c=document.createElement('canvas');c.width=c.height=512;const x2=c.getContext('2d');const g=x2.createRadialGradient(256,256,60,256,256,340);g.addColorStop(0,'#f7a9b2');g.addColorStop(1,'#e2717f');x2.fillStyle=g;x2.fillRect(0,0,512,512);x2.strokeStyle='rgba(255,255,255,.4)';x2.lineWidth=2;for(const[dx,dy]of[[0,0],[.28,0],[-.28,0],[0,.28],[0,-.28]]){x2.beginPath();x2.arc(256+dx*512,256+dy*512,70,0,7);x2.stroke()}return c})());
 cushTex.encoding=T.sRGBEncoding;
 const pink=new T.MeshPhysicalMaterial({color:0xf19aa6,roughness:.22,clearcoat:.9,clearcoatRoughness:.15,sheen:1,sheenColor:new T.Color(0xffd8de)});
 const band=new T.MeshPhysicalMaterial({map:tex,roughness:.24,clearcoat:.9,clearcoatRoughness:.15});
 const cushMat=new T.MeshPhysicalMaterial({map:cushTex,roughness:.22,clearcoat:.9,clearcoatRoughness:.15});
 const black=new T.MeshPhysicalMaterial({color:0x141414,roughness:.32,metalness:.45,clearcoat:.4});
 const gold=new T.MeshPhysicalMaterial({color:0xdaa63f,roughness:.22,metalness:.85,clearcoat:.3});
 const g=new T.Group(),seat=new T.Group();seat.position.y=1.14;g.add(seat);
 const Vv=(a,b)=>new T.Vector2(a,b);
 // smoother, more elegant seat-shell profile
 const shellPts=[Vv(.015,-.05),Vv(.30,-.045),Vv(.46,-.02),Vv(.565,.03),Vv(.62,.09),Vv(.645,.155),Vv(.635,.215),Vv(.60,.255)];
 const shell=new T.Mesh(new T.LatheGeometry(shellPts,96),band);seat.add(shell);
 // taller, gently curved backrest with thickness (two lathe shells)
 const backPts=[Vv(.60,.22),Vv(.655,.30),Vv(.685,.40),Vv(.695,.50),Vv(.675,.60),Vv(.62,.685),Vv(.55,.735)];
 const backOut=new T.Mesh(new T.LatheGeometry(backPts,96,1.0,Math.PI*2-2.0),pink);backOut.material.side=T.DoubleSide;seat.add(backOut);
 const backPtsIn=backPts.map(p=>new T.Vector2(p.x-.035,p.y));
 const backIn=new T.Mesh(new T.LatheGeometry(backPtsIn,96,1.0,Math.PI*2-2.0),pink);backIn.material.side=T.BackSide;seat.add(backIn);
 // tufted cushion top
 const cush=new T.Mesh(new T.SphereGeometry(.555,64,32),cushMat);cush.scale.y=.22;cush.position.y=.255;seat.add(cush);
 const dimM=new T.MeshPhysicalMaterial({color:0xd8697f,roughness:.5,clearcoat:.5});
 [[0,0],[.26,0],[-.26,0],[0,.26],[0,-.26],[.19,.19],[-.19,.19],[.19,-.19],[-.19,-.19]].forEach(p=>{const b=new T.Mesh(new T.TorusGeometry(.02,.006,8,16),dimM);b.position.set(p[0],.375,p[1]);b.rotation.x=Math.PI/2;seat.add(b)});
 const plate=new T.Mesh(new T.CylinderGeometry(.40,.42,.05,64),black);plate.position.y=-.075;seat.add(plate);
 const swivel=new T.Mesh(new T.CylinderGeometry(.09,.11,.16,32),gold);swivel.position.y=-.16;seat.add(swivel);
 const up=new T.Vector3(0,1,0),tops=[],bots=[];
 for(let i=0;i<4;i++){const a=Math.PI/4+i*Math.PI/2;tops.push(new T.Vector3(Math.cos(a)*.30,1.02,Math.sin(a)*.30));bots.push(new T.Vector3(Math.cos(a)*.82,0,Math.sin(a)*.82))}
 const rod=(p,q,r1,r2,m,seg)=>{const dv=q.clone().sub(p),L=dv.length(),c=new T.Mesh(new T.CylinderGeometry(r2,r1,L,seg||24),m);c.position.copy(p.clone().add(q).multiplyScalar(.5));c.quaternion.setFromUnitVectors(up,dv.normalize());g.add(c);return c};
 for(let i=0;i<4;i++){
  rod(bots[i],tops[i],.038,.05,black,28);
  const cap=bots[i].clone().lerp(tops[i],.15);
  rod(bots[i],cap,.041,.045,gold,28);
  const foot=new T.Mesh(new T.CylinderGeometry(.041,.036,.03,20),black);foot.position.copy(bots[i]);g.add(foot);
  const glide=new T.Mesh(new T.SphereGeometry(.02,10,8),black);glide.position.copy(bots[i]).y=.005;g.add(glide);
 }
 const fp=bots.map((b,i)=>b.clone().lerp(tops[i],.36));
 for(let i=0;i<4;i++){rod(fp[i],fp[(i+1)%4],.022,.022,gold,20);const sph=new T.Mesh(new T.SphereGeometry(.024,14,12),gold);sph.position.copy(fp[i]);g.add(sph)}
 g.rotation.z=Math.PI*.006;g.position.y=-.2;sc.add(g);
 const wrap=el.parentElement,lab=wrap.querySelector('.lab'),ring=wrap.querySelector('.ring2'),cv2=r.domElement;
 const rm=matchMedia('(prefers-reduced-motion:reduce)').matches,MIN=.28;let ang=34,vel=rm?0:.5,drag=false,lx=0,moved=0;
 const burst=(x,y)=>{for(let i=0;i<12;i++){const s=document.createElement('span');s.textContent=['✦','♥','✶'][i%3];s.style.cssText='position:fixed;z-index:99;pointer-events:auto;font-size:18px;color:#FF5CA1;left:'+(x+(Math.random()-.5)*180)+'px;top:'+(y+(Math.random()-.5)*180)+'px';document.body.appendChild(s);s.animate([{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(-40px) scale(.5)'}],{duration:900}).onfinish=()=>s.remove()}};
 wrap.addEventListener('pointerenter',()=>wrap.classList.add('hov'));wrap.addEventListener('pointerleave',()=>wrap.classList.remove('hov'));
 cv2.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;moved=0;cv2.setPointerCapture(e.pointerId)});
 cv2.addEventListener('pointermove',e=>{if(drag){const dx=e.clientX-lx;moved+=Math.abs(dx);vel+=dx*.55;lx=e.clientX}});
 const rel=e=>{if(!drag)return;drag=false;if(moved<8){vel+=28;burst(e.clientX,e.clientY)}};cv2.addEventListener('pointerup',rel);cv2.addEventListener('pointercancel',()=>drag=false);
 const near=e=>{if(rm||drag)return;const b=wrap.getBoundingClientRect(),dd=Math.hypot(e.clientX-(b.left+b.width/2),e.clientY-(b.top+b.height/2));if(dd<320)vel+=(320-dd)/320*1.2*(vel>=0?1:-1)};
 addEventListener('pointermove',near,{passive:true});
 const ro=new ResizeObserver(()=>{r.setSize(W(),H());cam.aspect=W()/H();cam.updateProjectionMatrix()});ro.observe(el);
 const st={r,ro,raf:0,off:()=>removeEventListener('pointermove',near)};window.__chair=st;
 (function loop(){st.raf=requestAnimationFrame(loop);
  if(!drag){vel*=.985;if(!rm&&Math.abs(vel)<MIN)vel=vel>=0?MIN:-MIN;else if(rm&&Math.abs(vel)<.01)vel=0}
  vel=Math.max(-45,Math.min(45,vel));ang+=vel;g.rotation.y=ang*Math.PI/180;
  lab.textContent='GRAB TO SPIN • '+(Math.round(Math.abs(vel)*10)/10)+'°/f';ring.style.transform='rotate('+(ang*-.3)+'deg) scale('+(wrap.classList.contains('hov')?1:.9)+')';
  r.render(sc,cam)})();
 }catch(e){fallback()}
}

function render(){
 stopChair();
 const full=(location.hash||"#/").replace("#/","");const r=full.split("/")[0];const v=V[r]||V[""];
 const solid=r!=="";
 document.getElementById("app").innerHTML=nav(r,solid)+v()+foot();
 document.title="Savai. "+(r?r[0].toUpperCase()+r.slice(1):"we know your story....");
 if(full==="studio/contact"){const c=document.getElementById("contact");c&&c.scrollIntoView()}else window.scrollTo(0,0);
 document.querySelectorAll("#chips .chip").forEach(b=>b.onclick=()=>{document.querySelectorAll("#chips .chip").forEach(x=>x.setAttribute("aria-pressed",x===b));document.getElementById("panel").textContent=looks[b.dataset.k]});
 document.querySelectorAll(".acc-h").forEach(b=>b.onclick=()=>{const body=b.nextElementSibling;const open=body.style.maxHeight&&body.style.maxHeight!=="0px";document.querySelectorAll(".acc-b").forEach(x=>x.style.maxHeight="0px");body.style.maxHeight=open?"0px":body.scrollHeight+40+"px"});
 const s=document.getElementById("send");if(s)s.onclick=()=>{document.getElementById("ok").textContent="Thanks. This demo form doesn't send yet, so nothing was delivered."};
}
addEventListener("hashchange",render);
render();

