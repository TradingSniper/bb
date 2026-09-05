(function(){
"use strict";
var SECTORS={A:"Health Care", AAPL:"Information Technology", ABBV:"Health Care", ABT:"Health Care", ACN:"Information Technology", ADBE:"Information Technology", ADI:"Information Technology", ADM:"Consumer Staples", ADSK:"Information Technology", AEE:"Utilities", AEP:"Utilities", AES:"Utilities", AKAM:"Information Technology", ALGN:"Health Care", AMAT:"Information Technology", AMD:"Information Technology", AMGN:"Health Care", AMT:"Real Estate", ANET:"Information Technology", APH:"Information Technology", APP:"Communication Services", ARE:"Real Estate", ATO:"Utilities", AVGO:"Information Technology", AWK:"Utilities", BAX:"Health Care", BDX:"Health Care", BG:"Consumer Staples", BIIB:"Health Care", BMY:"Health Care", BSX:"Health Care", BXP:"Real Estate", CAH:"Health Care", CASY:"Consumer Staples", CBRE:"Real Estate", CCI:"Real Estate", CDNS:"Information Technology", CDW:"Information Technology", CEG:"Utilities", CHD:"Consumer Staples", CHTR:"Communication Services", CI:"Health Care", CIEN:"Information Technology", CL:"Consumer Staples", CLX:"Consumer Staples", CMCSA:"Communication Services", CMS:"Utilities", CNC:"Health Care", CNP:"Utilities", COHR:"Information Technology", COO:"Health Care", COR:"Health Care", COST:"Consumer Staples", CPT:"Real Estate", CRL:"Health Care", CRM:"Information Technology", CRWD:"Information Technology", CSCO:"Information Technology", CSGP:"Real Estate", CTSH:"Information Technology", CVS:"Health Care", DDOG:"Information Technology", DELL:"Information Technology", DG:"Consumer Staples", DGX:"Health Care", DHR:"Health Care", DIS:"Communication Services", DLTR:"Consumer Staples", DOC:"Real Estate", DUK:"Utilities", ED:"Utilities", EL:"Consumer Staples", EQIX:"Real Estate", FE:"Utilities", FFIV:"Information Technology", FLEX:"Information Technology", FRT:"Real Estate", GDDY:"Information Technology", GEHC:"Health Care", GEN:"Information Technology", GILD:"Health Care", GIS:"Consumer Staples", GLW:"Information Technology", HCA:"Health Care", HPE:"Information Technology", HPQ:"Information Technology", HRL:"Consumer Staples", HSIC:"Health Care", HST:"Real Estate", HSY:"Consumer Staples", HUM:"Health Care", IBM:"Information Technology", IDXX:"Health Care", INCY:"Health Care", INTC:"Information Technology", INTU:"Information Technology", INVH:"Real Estate", IQV:"Health Care", IRM:"Real Estate", ISRG:"Health Care", IT:"Information Technology", JBL:"Information Technology", JNJ:"Health Care", KDP:"Consumer Staples", KEYS:"Information Technology", KHC:"Consumer Staples", KIM:"Real Estate", KLAC:"Information Technology", KMB:"Consumer Staples", KO:"Consumer Staples", KR:"Consumer Staples", LH:"Health Care", LITE:"Information Technology", LLY:"Health Care", LNT:"Utilities", LRCX:"Information Technology", LYV:"Communication Services", MAA:"Real Estate", MCHP:"Information Technology", MCK:"Health Care", MDLZ:"Consumer Staples", MDT:"Health Care", META:"Communication Services", MKC:"Consumer Staples", MNST:"Consumer Staples", MO:"Consumer Staples", MPWR:"Information Technology", MRK:"Health Care", MRNA:"Health Care", MRVL:"Information Technology", MSFT:"Information Technology", MSI:"Information Technology", MTD:"Health Care", MU:"Information Technology", NEE:"Utilities", NFLX:"Communication Services", NI:"Utilities", NOW:"Information Technology", NRG:"Utilities", NTAP:"Information Technology", NVDA:"Information Technology", NXPI:"Information Technology", O:"Real Estate", OMC:"Communication Services", ON:"Information Technology", ORCL:"Information Technology", PANW:"Information Technology", PCG:"Utilities", PEG:"Utilities", PEP:"Consumer Staples", PFE:"Health Care", PG:"Consumer Staples", PLD:"Real Estate", PLTR:"Information Technology", PM:"Consumer Staples", PNW:"Utilities", PPL:"Utilities", PSA:"Real Estate", PSKY:"Communication Services", PTC:"Information Technology", QCOM:"Information Technology", RDDT:"Communication Services", REG:"Real Estate", REGN:"Health Care", ROP:"Information Technology", RVTY:"Health Care", SBAC:"Real Estate", SJM:"Consumer Staples", SMCI:"Information Technology", SNDK:"Information Technology", SNPS:"Information Technology", SO:"Utilities", SOLV:"Health Care", SPG:"Real Estate", SRE:"Utilities", STE:"Health Care", STX:"Information Technology", STZ:"Consumer Staples", SWKS:"Information Technology", SYK:"Health Care", SYY:"Consumer Staples", T:"Communication Services", TAP:"Consumer Staples", TDY:"Information Technology", TECH:"Health Care", TEL:"Information Technology", TER:"Information Technology", TGT:"Consumer Staples", TKO:"Communication Services", TMO:"Health Care", TMUS:"Communication Services", TRMB:"Information Technology", TSN:"Consumer Staples", TTD:"Communication Services", TTWO:"Communication Services", TXN:"Information Technology", TYL:"Information Technology", UDR:"Real Estate", UHS:"Health Care", UNH:"Health Care", VEEV:"Health Care", VICI:"Real Estate", VMRK:"Real Estate", VRSN:"Information Technology", VRTX:"Health Care", VTR:"Real Estate", VTRS:"Health Care", VZ:"Communication Services", WAT:"Health Care", WBD:"Communication Services", WDAY:"Information Technology", WDC:"Information Technology", WEC:"Utilities", WELL:"Real Estate", WMT:"Consumer Staples", WST:"Health Care", WY:"Real Estate", XEL:"Utilities", ZBH:"Health Care", ZBRA:"Information Technology", ZTS:"Health Care"};
var NAMES={A:"Agilent Technologies, Inc.", AAPL:"Apple Inc.", ABBV:"AbbVie Inc.", ABT:"Abbott Laboratories", ACN:"Accenture plc", ADBE:"Adobe Inc.", ADI:"Analog Devices, Inc.", ADM:"Archer-Daniels-Midland Company", ADSK:"Autodesk, Inc.", AEE:"Ameren Corporation", AEP:"American Electric Power Company, Inc.", AES:"The AES Corporation", AKAM:"Akamai Technologies, Inc.", ALGN:"Align Technology, Inc.", AMAT:"Applied Materials, Inc.", AMD:"Advanced Micro Devices, Inc.", AMGN:"Amgen Inc.", AMT:"American Tower Corporation", ANET:"Arista Networks, Inc.", APH:"Amphenol Corporation", APP:"AppLovin Corporation", ARE:"Alexandria Real Estate Equities, Inc.", ATO:"Atmos Energy Corporation", AVGO:"Broadcom Inc.", AWK:"American Water Works Company, Inc.", BAX:"Baxter International Inc.", BDX:"Becton, Dickinson and Company", BG:"Bunge Global SA", BIIB:"Biogen Inc.", BMY:"Bristol-Myers Squibb Company", BSX:"Boston Scientific Corporation", BXP:"BXP, Inc.", CAH:"Cardinal Health, Inc.", CASY:"Casey's General Stores, Inc.", CBRE:"CBRE Group, Inc.", CCI:"Crown Castle Inc.", CDNS:"Cadence Design Systems, Inc.", CDW:"CDW Corporation", CEG:"Constellation Energy Corporation", CHD:"Church & Dwight Co., Inc.", CHTR:"Charter Communications, Inc.", CI:"The Cigna Group", CIEN:"Ciena Corporation", CL:"Colgate-Palmolive Company", CLX:"The Clorox Company", CMCSA:"Comcast Corporation", CMS:"CMS Energy Corporation", CNC:"Centene Corporation", CNP:"CenterPoint Energy, Inc.", COHR:"Coherent Corp.", COO:"The Cooper Companies, Inc.", COR:"Cencora, Inc.", COST:"Costco Wholesale Corporation", CPT:"Camden Property Trust", CRL:"Charles River Laboratories International, Inc.", CRM:"Salesforce, Inc.", CRWD:"CrowdStrike Holdings, Inc.", CSCO:"Cisco Systems, Inc.", CSGP:"CoStar Group, Inc.", CTSH:"Cognizant Technology Solutions Corporation", CVS:"CVS Health Corporation", DDOG:"Datadog, Inc.", DELL:"Dell Technologies Inc.", DG:"Dollar General Corporation", DGX:"Quest Diagnostics Incorporated", DHR:"Danaher Corporation", DIS:"The Walt Disney Company", DLTR:"Dollar Tree, Inc.", DOC:"Healthpeak Properties, Inc.", DUK:"Duke Energy Corporation", ED:"Consolidated Edison, Inc.", EL:"The Est\u00e9e Lauder Companies Inc.", EQIX:"Equinix, Inc.", FE:"FirstEnergy Corp.", FFIV:"F5, Inc.", FLEX:"Flex Ltd.", FRT:"Federal Realty Investment Trust", GDDY:"GoDaddy Inc.", GEHC:"GE HealthCare Technologies Inc.", GEN:"Gen Digital Inc.", GILD:"Gilead Sciences, Inc.", GIS:"General Mills, Inc.", GLW:"Corning Incorporated", HCA:"HCA Healthcare, Inc.", HPE:"Hewlett Packard Enterprise Company", HPQ:"HP Inc.", HRL:"Hormel Foods Corporation", HSIC:"Henry Schein, Inc.", HST:"Host Hotels & Resorts, Inc.", HSY:"The Hershey Company", HUM:"Humana Inc.", IBM:"International Business Machines Corporation", IDXX:"IDEXX Laboratories, Inc.", INCY:"Incyte Corporation", INTC:"Intel Corporation", INTU:"Intuit Inc.", INVH:"Invitation Homes Inc.", IQV:"IQVIA Holdings Inc.", IRM:"Iron Mountain Incorporated", ISRG:"Intuitive Surgical, Inc.", IT:"Gartner, Inc.", JBL:"Jabil Inc.", JNJ:"Johnson & Johnson", KDP:"Keurig Dr Pepper Inc.", KEYS:"Keysight Technologies, Inc.", KHC:"The Kraft Heinz Company", KIM:"Kimco Realty Corporation", KLAC:"KLA Corporation", KMB:"Kimberly-Clark Corporation", KO:"The Coca-Cola Company", KR:"The Kroger Co.", LH:"Labcorp Holdings Inc.", LITE:"Lumentum Holdings Inc.", LLY:"Eli Lilly and Company", LNT:"Alliant Energy Corporation", LRCX:"Lam Research Corporation", LYV:"Live Nation Entertainment, Inc.", MAA:"Mid-America Apartment Communities, Inc.", MCHP:"Microchip Technology Incorporated", MCK:"McKesson Corporation", MDLZ:"Mondelez International, Inc.", MDT:"Medtronic plc", META:"Meta Platforms, Inc.", MKC:"McCormick & Company, Incorporated", MNST:"Monster Beverage Corporation", MO:"Altria Group, Inc.", MPWR:"Monolithic Power Systems, Inc.", MRK:"Merck & Co., Inc.", MRNA:"Moderna, Inc.", MRVL:"Marvell Technology, Inc.", MSFT:"Microsoft Corporation", MSI:"Motorola Solutions, Inc.", MTD:"Mettler-Toledo International Inc.", MU:"Micron Technology, Inc.", NEE:"NextEra Energy, Inc.", NFLX:"Netflix, Inc.", NI:"NiSource Inc.", NOW:"ServiceNow, Inc.", NRG:"NRG Energy, Inc.", NTAP:"NetApp, Inc.", NVDA:"NVIDIA Corporation", NXPI:"NXP Semiconductors N.V.", O:"Realty Income Corporation", OMC:"Omnicom Group Inc.", ON:"ON Semiconductor Corporation", ORCL:"Oracle Corporation", PANW:"Palo Alto Networks, Inc.", PCG:"PG&E Corporation", PEG:"Public Service Enterprise Group Incorporated", PEP:"PepsiCo, Inc.", PFE:"Pfizer Inc.", PG:"The Procter & Gamble Company", PLD:"Prologis, Inc.", PLTR:"Palantir Technologies Inc.", PM:"Philip Morris International Inc.", PNW:"Pinnacle West Capital Corporation", PPL:"PPL Corporation", PSA:"Public Storage", PSKY:"Paramount Skydance Corporation", PTC:"PTC Inc.", QCOM:"QUALCOMM Incorporated", RDDT:"Reddit, Inc.", REG:"Regency Centers Corporation", REGN:"Regeneron Pharmaceuticals, Inc.", ROP:"Roper Technologies, Inc.", RVTY:"Revvity, Inc.", SBAC:"SBA Communications Corporation", SJM:"The J. M. Smucker Company", SMCI:"Super Micro Computer, Inc.", SNDK:"Sandisk Corporation", SNPS:"Synopsys, Inc.", SO:"The Southern Company", SOLV:"Solventum Corporation", SPG:"Simon Property Group, Inc.", SRE:"Sempra", STE:"STERIS plc", STX:"Seagate Technology Holdings plc", STZ:"Constellation Brands, Inc.", SWKS:"Skyworks Solutions, Inc.", SYK:"Stryker Corporation", SYY:"Sysco Corporation", T:"AT&T Inc.", TAP:"Molson Coors Beverage Company", TDY:"Teledyne Technologies Incorporated", TECH:"Bio-Techne Corporation", TEL:"TE Connectivity plc", TER:"Teradyne, Inc.", TGT:"Target Corporation", TKO:"TKO Group Holdings, Inc.", TMO:"Thermo Fisher Scientific Inc.", TMUS:"T-Mobile US, Inc.", TRMB:"Trimble Inc.", TSN:"Tyson Foods, Inc.", TTD:"The Trade Desk, Inc.", TTWO:"Take-Two Interactive Software, Inc.", TXN:"Texas Instruments Incorporated", TYL:"Tyler Technologies, Inc.", UDR:"UDR, Inc.", UHS:"Universal Health Services, Inc.", UNH:"UnitedHealth Group Incorporated", VEEV:"Veeva Systems Inc.", VICI:"VICI Properties Inc.", VMRK:"Vivmark Residential", VRSN:"VeriSign, Inc.", VRTX:"Vertex Pharmaceuticals Incorporated", VTR:"Ventas, Inc.", VTRS:"Viatris Inc.", VZ:"Verizon Communications Inc.", WAT:"Waters Corporation", WBD:"Warner Bros. Discovery, Inc.", WDAY:"Workday, Inc.", WDC:"Western Digital Corporation", WEC:"WEC Energy Group, Inc.", WELL:"Welltower Inc.", WMT:"Walmart Inc.", WST:"West Pharmaceutical Services, Inc.", WY:"Weyerhaeuser Company", XEL:"Xcel Energy Inc.", ZBH:"Zimmer Biomet Holdings, Inc.", ZBRA:"Zebra Technologies Corporation", ZTS:"Zoetis Inc."};
var DEFAULTS={bbLen:20,bbMult:2,sqLook:126,sqPct:0.20,volMult:1.5,atrLen:14,mode:'mr',target:1.0,stop:3.0,horizon:30,cooldown:5,dir:1,reqSqueeze:false,reqVol:false,reqTrend:false,exclNews:true,fill:'close',slippageBps:10,regime:true};
var DATA={}, SETTINGS=loadSettings(), JOURNAL=[], FILTER={sym:null,res:null,dir:null};
var DATA2=null, JOURNAL2=null, DASH2_LOADING=false;

function loadSettings(){ try{ var s=JSON.parse(localStorage.getItem('bbv_settings_v4')); if(s) return Object.assign({},DEFAULTS,s);}catch(e){} return Object.assign({},DEFAULTS); }
function saveSettings(){ localStorage.setItem('bbv_settings_v4', JSON.stringify(SETTINGS)); }
function parseCSV(text, sym){
  var lines=text.trim().split(/\r?\n/); if(lines.length<2) return null;
  var head=lines[0].toLowerCase();
  var rows=[];
  if(head.indexOf('date')===0){
    var cols=head.split(',').map(s=>s.trim());
    var ix={d:cols.indexOf('date'),o:cols.indexOf('open'),h:cols.indexOf('high'),l:cols.indexOf('low'),c:cols.indexOf('close'),v:cols.indexOf('volume')};
    for(var i=1;i<lines.length;i++){ var p=lines[i].split(','); if(p.length<6) continue;
      var row={d:p[ix.d],o:+p[ix.o],h:+p[ix.h],l:+p[ix.l],c:+p[ix.c],v:+p[ix.v]||0};
      if(row.d && isFinite(row.c)) rows.push(row); }
  } else {
    for(var i=0;i<lines.length;i++){ var p=lines[i].split(','); if(p.length<6) continue;
      rows.push({d:p[0],o:+p[1],h:+p[2],l:+p[3],c:+p[4],v:+p[5]||0}); }
  }
  return rows.length? rows : null;
}
function loadStored(){
  try{ var d=JSON.parse(localStorage.getItem('bbv_data')); if(d) for(var k in d) DATA[k]=d[k]; }catch(e){}
  if(window.BUNDLED) for(var s in window.BUNDLED){ if(!DATA[s]){ var rows=parseCSV(window.BUNDLED[s], s); if(rows) DATA[s]=rows; } }
}
function persistImported(){
  var custom={}; for(var k in DATA){ if(!(window.BUNDLED && window.BUNDLED[k])) custom[k]=DATA[k]; }
  localStorage.setItem('bbv_data', JSON.stringify(custom));
}
function runAll(){
  JOURNAL=[]; JOURNAL2=null;
  var syms=Object.keys(DATA).sort();
  for(var s=0;s<syms.length;s++){ var sym=syms[s];
    var sigs=bbAnalyze(DATA[sym], SETTINGS);
    for(var i=0;i<sigs.length;i++){ var g=sigs[i]; g.sym=sym; JOURNAL.push(g); }
  }
  JOURNAL.sort((a,b)=> a.date<b.date?-1:1);
  render();
  var d2=document.getElementById('tab-dashboard2');
  if(d2 && d2.classList.contains('active')) runDash2();
}
function filtered(){ return JOURNAL.filter(g=>(!FILTER.sym||g.sym===FILTER.sym)&&(!FILTER.res||g.res===FILTER.res)&&(!FILTER.dir||g.dir===FILTER.dir)); }
function pct(h,n){ return n? (100*h/n).toFixed(1)+'%' : '–'; }
function render(){
  var f=filtered();
  var hits=f.filter(g=>g.res==='hit').length, misses=f.length-hits;
  var up=f.filter(g=>g.dir===1), dn=f.filter(g=>g.dir===-1);
  var upH=up.filter(g=>g.res==='hit').length, dnH=dn.filter(g=>g.res==='hit').length;
  document.getElementById('k-ba').textContent=pct(hits,f.length);
  var ci=typeof wilson==='function'?wilson(hits,f.length):null;
  document.getElementById('k-ba-sub').textContent=hits+' hits / '+f.length+' signals'+(ci?' · 95% CI '+ci.lo+'–'+ci.hi+'%':'');
  document.getElementById('k-sig').textContent=f.length;
  document.getElementById('k-hit').textContent=hits;
  document.getElementById('k-miss').textContent=misses;
  document.getElementById('k-up').textContent=up.length;
  document.getElementById('k-up-sub').textContent='win '+pct(upH,up.length);
  document.getElementById('k-dn').textContent=dn.length;
  document.getElementById('k-dn-sub').textContent='win '+pct(dnH,dn.length);
  var avgR=f.length? f.reduce(function(a,g){return a+(g.r||0);},0)/f.length : 0;
  var kR=document.getElementById('k-avgr'); if(kR){ kR.textContent=(f.length?(avgR>=0?'+':'')+avgR.toFixed(3)+' R':'–'); kR.className='kpi-val '+(avgR>=0?'hit':'miss');
    document.getElementById('k-avgr-sub').textContent='avg per trade, ATR units'; }
  var syms=Object.keys(DATA).sort();
  var totalBars=syms.reduce((a,s)=>a+DATA[s].length,0);
  document.getElementById('status-line').textContent = syms.length+' symbols · '+totalBars.toLocaleString()+' daily bars · '+(syms.length&&DATA[syms[0]].length? DATA[syms[0]][0].d+' → '+DATA[syms[0]][DATA[syms[0]].length-1].d : 'no data')+(f.length===0?' · no signals with current settings':'');
  renderChart(f); renderSectors(); renderSymbols(); renderJournal(f); renderDataSummary(); renderExplainer(); renderSweep(); renderFolds();
}
function renderChart(f){
  var cv=document.getElementById('chart'); var ctx=cv.getContext('2d');
  var W=cv.width=cv.clientWidth*2, H=cv.height=360; ctx.scale(1,1);
  ctx.clearRect(0,0,W,H);
  if(!f.length){ ctx.fillStyle='#8b949e'; ctx.font='24px sans-serif'; ctx.fillText('No signals with current settings',20,60); return; }
  var cum=[], h=0;
  for(var i=0;i<f.length;i++){ if(f[i].res==='hit')h++; cum.push(h/(i+1)); }
  function y(v){ return H-10-(v)*(H-20); }
  // graduation band 60-80%
  ctx.fillStyle='rgba(63,185,80,0.10)'; ctx.fillRect(0,y(0.8),W,y(0.6)-y(0.8));
  ctx.strokeStyle='#30363d'; ctx.beginPath(); ctx.moveTo(0,y(0.5)); ctx.lineTo(W,y(0.5)); ctx.stroke();
  ctx.fillStyle='#3fb950'; ctx.font='20px sans-serif'; ctx.fillText('60–80% graduation zone', 12, y(0.8)+22);
  ctx.strokeStyle='#58a6ff'; ctx.lineWidth=2; ctx.beginPath();
  for(var i=0;i<cum.length;i++){ var x=i/(cum.length-1||1)*(W-10)+5; i?ctx.lineTo(x,y(cum[i])):ctx.moveTo(x,y(cum[i])); }
  ctx.stroke();
  var last=(100*cum[cum.length-1]).toFixed(1)+'%';
  ctx.fillStyle='#e6edf3'; ctx.font='bold 24px sans-serif'; ctx.fillText(last, W-90, y(cum[cum.length-1])-8);
}
function renderSectors(){
  var map={};
  JOURNAL.forEach(g=>{ var sec=SECTORS[g.sym]||'Custom imports'; if(!map[sec])map[sec]={n:0,h:0,days:0}; map[sec].n++; if(g.res==='hit')map[sec].h++; });
  Object.keys(DATA).forEach(s=>{ var sec=SECTORS[s]||'Custom imports'; if(map[sec]) map[sec].days+=DATA[s].length; });
  var tb=document.querySelector('#sector-table tbody'); tb.innerHTML='';
  Object.keys(map).sort((a,b)=> (map[b].h/map[b].n)-(map[a].h/map[a].n)).forEach(sec=>{
    var m=map[sec]; if(!m.n) return;
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+sec+'</td><td>'+m.n+'</td><td>'+(100*m.n/(m.days||1)).toFixed(1)+'</td><td class="'+((m.h/m.n)>=0.5?'pos':'neg')+'">'+pct(m.h,m.n)+'</td>';
    tb.appendChild(tr);
  });
}
var SYM_SORT={key:'sym',dir:1};
function renderSymbols(){
  var map={};
  JOURNAL.forEach(g=>{ if(!map[g.sym])map[g.sym]={n:0,h:0,score:0}; map[g.sym].n++; if(g.res==='hit')map[g.sym].h++; map[g.sym].score+=g.score; });
  var rows=Object.keys(map).map(function(sym){ var m=map[sym]; var d=DATA[sym]; var last=d&&d.length?d[d.length-1]:null; return {sym:sym, name:NAMES[sym]||'', price:last?last.c:null, pdate:last?last.d:'', n:m.n, h:m.h, miss:m.n-m.h, win:m.h/m.n, avg:m.score/m.n}; });
  var k=SYM_SORT.key, d=SYM_SORT.dir;
  rows.sort(function(a,b){ var x=a[k], y=b[k]; if(typeof x==='string') return d*x.localeCompare(y); return d*(x-y); });
  var tb=document.querySelector('#symbol-table tbody'); tb.innerHTML='';
  rows.forEach(function(r){
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+r.sym+'</td><td>'+r.name+'</td><td>'+(r.price!=null?'$'+r.price.toFixed(2):'-')+'</td><td>'+r.n+'</td><td>'+r.h+'</td><td>'+r.miss+'</td><td class="'+(r.win>=0.5?'pos':'neg')+'">'+pct(r.h,r.n)+'</td><td>'+r.avg.toFixed(0)+'</td>';
    tr.onclick=function(){ FILTER.sym=FILTER.sym===r.sym?null:r.sym; render(); switchTab('journal'); };
    tb.appendChild(tr);
  });
  var pdate=rows.length?rows[0].pdate:''; rows.forEach(function(r){ if(r.pdate>pdate) pdate=r.pdate; });
  var keys=['sym','name','price','n','h','miss','win','avg'], labels=['Symbol','Company','Close'+(pdate?' ('+pdate+')':''),'Signals','Hits','Misses','Win %','Avg score'];
  document.querySelectorAll('#symbol-table thead th').forEach(function(th,i){
    th.style.cursor='pointer';
    th.textContent = labels[i] + (k===keys[i] ? (d===1?' \u25b2':' \u25bc') : '');
    th.onclick=function(){ if(SYM_SORT.key===keys[i]) SYM_SORT.dir*=-1; else { SYM_SORT.key=keys[i]; SYM_SORT.dir=(keys[i]==='sym'||keys[i]==='name'?1:-1); } renderSymbols(); };
  });
}
function renderJournal(f){
  var bar=document.getElementById('journal-filter'); bar.innerHTML='';
  [['all','All'],['hit','Hits'],['miss','Misses'],['up','Breakouts'],['down','Breakdowns']].forEach(function(p){
    var b=document.createElement('button'); b.textContent=p[1];
    var active=(p[0]==='all'&&!FILTER.res&&!FILTER.dir)||(FILTER.res===p[0])||(p[0]==='up'&&FILTER.dir===1)||(p[0]==='down'&&FILTER.dir===-1);
    if(active)b.className='active';
    b.onclick=function(){ FILTER.res=null;FILTER.dir=null; if(p[0]==='hit'||p[0]==='miss')FILTER.res=p[0]; if(p[0]==='up')FILTER.dir=1; if(p[0]==='down')FILTER.dir=-1; render(); };
    bar.appendChild(b);
  });
  if(FILTER.sym){ var b=document.createElement('button'); b.textContent=FILTER.sym+' ✕'; b.className='active';
    b.onclick=function(){FILTER.sym=null;render();}; bar.appendChild(b); }
  var tb=document.querySelector('#journal-table tbody'); tb.innerHTML='';
  var show=f.slice(-500).reverse();
  show.forEach(function(g){
    var tr=document.createElement('tr');
    var reasons=[g.squeeze?'squeeze':null,g.vol?'volume':null,g.trend?'trend':null].filter(Boolean).join(' · ')||'band break only';
    tr.innerHTML='<td>'+g.date+'</td><td>'+g.sym+'</td><td class="'+(g.dir===1?'pos':'neg')+'">'+(g.dir===1?'▲ up':'▼ down')+'</td><td>'+g.score+'</td><td>'+reasons+'</td><td class="'+(g.res==='hit'?'pos':'neg')+'">'+g.res.toUpperCase()+'</td><td>'+g.bars+'</td>';
    tr.onclick=function(){ showAudit(g); };
    tb.appendChild(tr);
  });
}
function showAudit(g){
  var rows=DATA[g.sym]; var el=document.getElementById('audit');
  var start=Math.max(0,g.i-2), end=Math.min(rows.length-1,g.i+g.bars+1);
  var html='<b>Audit: '+g.sym+' '+g.date+' '+(g.dir===1?'breakout ▲':'breakdown ▼')+' @ '+g.entry+'</b> — '+(SETTINGS.mode==='mr'?'target = 20-day mean':'target '+SETTINGS.target+'× ATR('+g.atr+') = '+(SETTINGS.target*g.atr).toFixed(2))+', stop '+SETTINGS.stop+'× ATR = '+(SETTINGS.stop*g.atr).toFixed(2)+', result <b class="'+(g.res==='hit'?'pos':'neg')+'">'+g.res.toUpperCase()+'</b> in '+g.bars+' bar(s), R '+(g.r!=null?g.r:'–')+'. MFE '+g.mfe+' / MAE '+g.mae+'.<table><thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th></th></tr></thead><tbody>';
  for(var i=start;i<=end;i++){ var r=rows[i];
    html+='<tr'+(i===g.i?' style="outline:1px solid #58a6ff"':'')+'><td>'+r.d+'</td><td>'+r.o+'</td><td>'+r.h+'</td><td>'+r.l+'</td><td>'+r.c+'</td><td>'+(r.v||0).toLocaleString()+'</td><td>'+(i===g.i?'entry':'')+'</td></tr>'; }
  html+='</tbody></table>';
  el.innerHTML=html; el.classList.remove('hidden');
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function renderDataSummary(){
  var el=document.getElementById('data-summary');
  var html='<table><thead><tr><th>Symbol</th><th>Bars</th><th>From</th><th>To</th><th>Source</th></tr></thead><tbody>';
  Object.keys(DATA).sort().forEach(function(s){ var r=DATA[s];
    html+='<tr><td>'+s+'</td><td>'+r.length+'</td><td>'+r[0].d+'</td><td>'+r[r.length-1].d+'</td><td>'+((window.BUNDLED&&window.BUNDLED[s])?'bundled':'imported')+'</td></tr>'; });
  el.innerHTML=html+'</tbody></table>';
}
function renderExplainer(){
  if(SETTINGS.mode==='mr'){
    document.getElementById('rules-explainer').textContent =
      'MEAN-REVERSION MODE. A signal fires when price touches the lower Bollinger band ('+SETTINGS.bbLen+','+SETTINGS.bbMult+') while the close is above the 200-day average (uptrend)'+(SETTINGS.exclNews?', skipping days with a >4% single-day move (earnings/news proxy)':'')+'. The bet: the dip snaps back. Entry is the '+(SETTINGS.fill==='open'?'open of the bar after the signal':'signal-day close')+(SETTINGS.slippageBps?' plus '+SETTINGS.slippageBps+'bps slippage':'')+'. A HIT means price returned to the 20-day average within '+SETTINGS.horizon+' bars before falling '+SETTINGS.stop+'\u00d7 ATR('+SETTINGS.atrLen+') below entry. If neither happens in time, the close-to-close direction decides. R = profit in ATR units (distance-to-mean on a hit, -'+SETTINGS.stop+' on a stop-out). Clean re-verify 2026-09: sectors picked only on pre-2016 data, verified on 2016-2026 data they were never chosen on - 72.8% win rate, +0.19R per trade after costs (n=9,679, 221 symbols x 10 years, all five 2-year folds positive). Full 502-symbol arena reads the same: 72.6% / +0.18R (n=22,617), so the sector pick itself adds little. The catch: losses are 3x the size of wins, so position sizing decides survival.';
    return;
  }
  document.getElementById('rules-explainer').textContent =
    'BREAKOUT MODE. A signal fires when the close crosses outside the Bollinger band ('+SETTINGS.bbLen+','+SETTINGS.bbMult+')'+
    ' - long breakouts only (no breakdown / falling-knife entries)'+
    (SETTINGS.reqSqueeze?' with bandwidth in the lowest '+(SETTINGS.sqPct*100)+'% of the trailing '+SETTINGS.sqLook+' days':'')+
    (SETTINGS.reqVol?' with volume \u2265 '+SETTINGS.volMult+'\u00d7 the 20-day average':'')+
    (SETTINGS.reqTrend?' with the close on the signal side of the 50-day average':'')+
    (SETTINGS.exclNews?', skipping >4% single-day moves (news proxy)':'')+
    '. Entry is the '+(SETTINGS.fill==='open'?'open of the bar after the signal':'signal-day close')+(SETTINGS.slippageBps?' plus '+SETTINGS.slippageBps+'bps slippage':'')+(SETTINGS.regime?', only with the 200-day average on the signal side':'')+'. A HIT means price moved +'+SETTINGS.target+'\u00d7 ATR('+SETTINGS.atrLen+') in the signal direction within '+SETTINGS.horizon+' bars before moving '+SETTINGS.stop+'\u00d7 ATR against it; if both levels trade in one bar it scores a MISS (conservative). If neither level trades within '+SETTINGS.horizon+' bars, the close-to-close direction decides. Batting average = hits \u00f7 signals. R = profit in ATR units per trade - the expectancy check that keeps a high win rate honest. Signals repeat only after '+SETTINGS.cooldown+' bars.';
}

function renderUniverse(){
  var el=document.getElementById('universe-list'); if(!el) return;
  var bySec={}, syms=Object.keys(DATA);
  syms.forEach(s=>{ var sec=SECTORS[s]||'Custom imports'; (bySec[sec]=bySec[sec]||[]).push(s); });
  var html=syms.length+' symbols x 10 years of daily bars, in the six sectors picked on pre-2016 data only (clean selection, verified on data they were never chosen on).<br><br>';
  html+=Object.keys(bySec).sort().map(sec=> '<b>'+sec+' ('+bySec[sec].length+')</b>: '+bySec[sec].sort().join(', ')).join('<br><br>');
  el.innerHTML=html;
}
function switchTab(name){
  document.querySelectorAll('nav#tabs button').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.id==='tab-'+name));
  if(name==='dashboard2') runDash2();
}
document.querySelectorAll('nav#tabs button').forEach(b=> b.onclick=function(){ switchTab(b.dataset.tab); });

// settings wiring
function settingsToUI(){
  var m={bbLen:'s-bblen',bbMult:'s-bbmult',sqLook:'s-sqlook',sqPct:'s-sqpct',volMult:'s-volmult',atrLen:'s-atrlen',target:'s-target',stop:'s-stop',horizon:'s-horizon',cooldown:'s-cooldown',slippageBps:'s-slip'};
  for(var k in m) document.getElementById(m[k]).value=SETTINGS[k];
  document.getElementById('s-mode').value=SETTINGS.mode;
  document.getElementById('s-excl-news').checked=SETTINGS.exclNews;
  document.getElementById('s-req-squeeze').checked=SETTINGS.reqSqueeze;
  document.getElementById('s-req-vol').checked=SETTINGS.reqVol;
  document.getElementById('s-req-trend').checked=SETTINGS.reqTrend;
  document.getElementById('s-req-regime').checked=SETTINGS.regime;
  document.getElementById('s-fill').value=SETTINGS.fill;
}
document.getElementById('apply-settings').onclick=function(){
  var m={bbLen:'s-bblen',bbMult:'s-bbmult',sqLook:'s-sqlook',sqPct:'s-sqpct',volMult:'s-volmult',atrLen:'s-atrlen',target:'s-target',stop:'s-stop',horizon:'s-horizon',cooldown:'s-cooldown',slippageBps:'s-slip'};
  for(var k in m) SETTINGS[k]=parseFloat(document.getElementById(m[k]).value);
  SETTINGS.dir=1; // long breakouts only - breakdowns not exposed
  SETTINGS.mode=document.getElementById('s-mode').value;
  SETTINGS.exclNews=document.getElementById('s-excl-news').checked;
  SETTINGS.reqSqueeze=document.getElementById('s-req-squeeze').checked;
  SETTINGS.reqVol=document.getElementById('s-req-vol').checked;
  SETTINGS.reqTrend=document.getElementById('s-req-trend').checked;
  SETTINGS.regime=document.getElementById('s-req-regime').checked;
  SETTINGS.fill=document.getElementById('s-fill').value;
  saveSettings(); runAll(); switchTab('dashboard');
};

// presets
document.getElementById('preset-aggressive').onclick=function(){
  SETTINGS.stop=3.5; SETTINGS.horizon=40; saveSettings(); settingsToUI();
  document.getElementById('preset-note').textContent='Aggressive preset loaded (stop 3.5x ATR, horizon 40). Click Apply and re-run to use it.';
};
document.getElementById('preset-verified').onclick=function(){
  SETTINGS.stop=DEFAULTS.stop; SETTINGS.horizon=DEFAULTS.horizon; saveSettings(); settingsToUI();
  document.getElementById('preset-note').textContent='Verified default loaded (stop 3x ATR, horizon 30). Click Apply and re-run to use it.';
};
document.getElementById('reset-settings').onclick=function(){ SETTINGS=Object.assign({},DEFAULTS); saveSettings(); settingsToUI(); runAll(); };

// CSV import
document.getElementById('csv-file').addEventListener('change', function(e){
  var file=e.target.files[0]; if(!file) return;
  var sym=(document.getElementById('csv-symbol').value||'').trim().toUpperCase() || file.name.replace(/\.csv$/i,'').toUpperCase();
  var rd=new FileReader();
  rd.onload=function(){
    var rows=parseCSV(rd.result, sym);
    if(!rows){ alert('Could not parse that CSV. Expected Yahoo columns: Date, Open, High, Low, Close, Adj Close, Volume.'); return; }
    DATA[sym]=rows; persistImported(); runAll();
    document.getElementById('status-line').textContent='Imported '+sym+': '+rows.length+' bars. Re-run complete.';
    switchTab('dashboard');
  };
  rd.readAsText(file);
});

// export / import
function download(name, text, type){
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([text],{type:type||'application/json'}));
  a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),5000);
}
document.getElementById('export-json').onclick=function(){
  var custom={}; for(var k in DATA){ if(!(window.BUNDLED&&window.BUNDLED[k])) custom[k]=DATA[k]; }
  download('bb-verifier-backup-'+new Date().toISOString().slice(0,10)+'.json',
    JSON.stringify({version:1, exportedAt:new Date().toISOString(), settings:SETTINGS, data:custom, journal:JOURNAL}, null, 1));
};
document.getElementById('export-csv').onclick=function(){
  var out=['date,symbol,direction,entry,score,squeeze,volume_confirm,trend_align,result,r_multiple,bars_to_resolve,mfe,mae,atr'];
  JOURNAL.forEach(g=> out.push([g.date,g.sym,g.dir===1?'up':'down',g.entry,g.score,g.squeeze,g.vol,g.trend,g.res,g.r,g.bars,g.mfe,g.mae,g.atr].join(',')));
  download('bb-verifier-journal-'+new Date().toISOString().slice(0,10)+'.csv', out.join('\n'), 'text/csv');
};
document.getElementById('import-json-btn').onclick=function(){ document.getElementById('import-json').click(); };
document.getElementById('import-json').addEventListener('change', function(e){
  var file=e.target.files[0]; if(!file) return;
  var rd=new FileReader();
  rd.onload=function(){
    try{ var j=JSON.parse(rd.result);
      if(j.settings){ SETTINGS=Object.assign({},DEFAULTS,j.settings); saveSettings(); settingsToUI(); }
      if(j.data) for(var k in j.data) DATA[k]=j.data[k];
      persistImported(); runAll(); switchTab('dashboard');
    }catch(err){ alert('Not a valid BB Verifier backup file.'); }
  };
  rd.readAsText(file);
});


// v2 additions: execution realism controls, parameter sweep, time-fold stability (inspired by algo-deploy.com feature set)
(function injectV2(){
  var st=document.createElement('style');
  st.textContent='.sweep-cell{padding:6px 8px;text-align:center;border:1px solid var(--border);font-size:12px;}.sweep-head{color:var(--muted);font-size:11px;padding:6px 8px;}.sweep-n{display:block;color:var(--muted);font-size:10px;}select{background:var(--panel);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:9px 10px;font-size:14px;}';
  document.head.appendChild(st);
  var g1=document.querySelector('#tab-settings .settings-grid');
  var l1=document.createElement('label'); l1.innerHTML='Slippage (bps) <input type="number" id="s-slip" value="0" min="0" max="500">'; g1.appendChild(l1);
  var l2=document.createElement('label'); l2.innerHTML='Fill mode <select id="s-fill"><option value="close">Signal-day close</option><option value="open">Next-bar open</option></select>'; g1.appendChild(l2);
  var g2=document.querySelectorAll('#tab-settings .settings-grid')[1];
  var l3=document.createElement('label'); l3.innerHTML='<input type="checkbox" id="s-req-regime"> Require regime align (SMA200)'; g2.appendChild(l3);
  var dash=document.getElementById('tab-dashboard');
  var h1=document.createElement('h2'); h1.textContent='Parameter sweep (target x horizon)'; dash.appendChild(h1);
  var d1=document.createElement('div'); d1.id='sweep'; dash.appendChild(d1);
  var h2=document.createElement('h2'); h2.textContent='Stability over time (4 folds)'; dash.appendChild(h2);
  var d2=document.createElement('div'); d2.id='folds'; dash.appendChild(d2);
})();
function renderSweep(){
  var el=document.getElementById('sweep'); if(!el) return;
  var isMR=SETTINGS.mode==='mr';
  var rows=isMR?[1.5,2.0,2.5,3.0]:[0.5,1.0,1.5,2.0], cols=isMR?[10,15,20,30]:[3,5,7,10];
  var html='<table><thead><tr><th class="sweep-head">'+(isMR?'stop \\ horizon':'target \\ horizon')+'</th>';
  cols.forEach(function(h){ html+='<th class="sweep-head">'+h+' bars</th>'; });
  html+='</tr></thead><tbody>';
  rows.forEach(function(rv){
    html+='<tr><td class="sweep-head">'+rv+'x ATR</td>';
    cols.forEach(function(hz){
      var n=0,hh=0,rsum=0;
      Object.keys(DATA).forEach(function(s){
        var o=Object.assign({},SETTINGS,{horizon:hz});
        if(isMR){o.stop=rv;}else{o.target=rv;}
        var sigs=bbAnalyze(DATA[s], o);
        n+=sigs.length; hh+=sigs.filter(function(g){return g.res==='hit';}).length;
        sigs.forEach(function(g){ rsum+=g.r||0; });
      });
      var ba=n?100*hh/n:0, avgR=n?rsum/n:0;
      var col=n<30?'rgba(139,148,158,0.15)':(ba>=60&&avgR>0?'rgba(63,185,80,0.35)':(ba>=50?'rgba(63,185,80,0.15)':'rgba(248,81,73,0.12)'));
      html+='<td class="sweep-cell" style="background:'+col+'">'+(n?ba.toFixed(1)+'%':'\u2013')+'<span class="sweep-n">n='+n+' \u00b7 '+(avgR>=0?'+':'')+avgR.toFixed(2)+'R</span></td>';
    });
    html+='</tr>';
  });
  el.innerHTML=html+'</tbody></table><p class="muted">Green = at or above the 60% graduation floor with positive avg R. Gray = fewer than 30 signals, too thin to read. Same rules as Settings, varying only '+(isMR?'stop and horizon':'target and horizon')+'. A high win % with negative avg R loses money - read both numbers together.</p>';
}
function renderFolds(){
  var el=document.getElementById('folds'); if(!el) return;
  if(!JOURNAL.length){ el.innerHTML=''; return; }
  var dates=JOURNAL.map(function(g){return g.date;}).sort();
  var d0=dates[0], d1=dates[dates.length-1];
  var t0=new Date(d0).getTime(), t1=new Date(d1).getTime(), span=t1-t0;
  var folds=[[],[],[],[]];
  JOURNAL.forEach(function(g){ var k=Math.min(3,Math.floor(4*(new Date(g.date).getTime()-t0)/span)); folds[k].push(g); });
  var html='<table><thead><tr><th>Period</th><th>Signals</th><th>Win %</th><th>Avg R</th><th>95% CI</th></tr></thead><tbody>';
  folds.forEach(function(f,k){
    if(!f.length){ html+='<tr><td>fold '+(k+1)+'</td><td>0</td><td>–</td><td>–</td><td>–</td></tr>'; return; }
    var hh=f.filter(function(g){return g.res==='hit';}).length;
    var fr=f.reduce(function(a,g){return a+(g.r||0);},0)/f.length;
    var ci=typeof wilson==='function'?wilson(hh,f.length):null;
    var fd=f.map(function(g){return g.date;}).sort();
    html+='<tr><td>'+fd[0]+' → '+fd[fd.length-1]+'</td><td>'+f.length+'</td><td class="'+((hh/f.length)>=0.5?'pos':'neg')+'">'+(100*hh/f.length).toFixed(1)+'%</td><td class="'+(fr>=0?'pos':'neg')+'">'+(fr>=0?'+':'')+fr.toFixed(3)+'</td><td>'+(ci?ci.lo+'–'+ci.hi+'%':'–')+'</td></tr>';
  });
  el.innerHTML=html+'</tbody></table><p class="muted">A real edge survives every period, not just one lucky stretch. Wide or overlapping intervals mean the differences are noise.</p>';
}

// Dashboard 2: deep-history view (2005-01-01 to 2026-09-04), same universe and settings, lazy-loaded so the app stays light
function loadScript(src){
  return new Promise(function(res,rej){ var s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=function(){ rej(new Error('load failed: '+src)); }; document.body.appendChild(s); });
}
function runDash2(){
  var st=document.getElementById('status-line-2'); if(!st) return;
  if(JOURNAL2){ renderDash2(); return; }
  if(DASH2_LOADING) return;
  DASH2_LOADING=true;
  var files=['1-dash2_a_fixed.js','5-dash2_b.js','6-dash2_c.js'];
  var chain=Promise.resolve();
  files.forEach(function(f,i){ chain=chain.then(function(){ st.textContent='Loading deep-history data (2005-2026), part '+(i+1)+' of '+files.length+'...'; return loadScript(f); }); });
  chain.then(function(){
    st.textContent='Parsing deep-history bars...';
    setTimeout(function(){
      DATA2={};
      for(var s in window.BUNDLED2){ var rows=parseCSV(window.BUNDLED2[s], s); if(rows) DATA2[s]=rows; }
      window.BUNDLED2=null;
      st.textContent='Running backtest on the 2005-2026 window...';
      setTimeout(function(){
        JOURNAL2=[];
        var syms=Object.keys(DATA2).sort();
        for(var x=0;x<syms.length;x++){ var sym=syms[x];
          var sigs=bbAnalyze(DATA2[sym], SETTINGS);
          for(var i=0;i<sigs.length;i++){ var g=sigs[i]; g.sym=sym; JOURNAL2.push(g); }
        }
        JOURNAL2.sort((a,b)=> a.date<b.date?-1:1);
        DASH2_LOADING=false;
        renderDash2();
      },30);
    },30);
  }).catch(function(e){ DASH2_LOADING=false; st.textContent='Deep-history data failed to load: '+e.message; });
}
function renderDash2(){
  var f=JOURNAL2||[];
  var hits=f.filter(g=>g.res==='hit').length, misses=f.length-hits;
  var up=f.filter(g=>g.dir===1), dn=f.filter(g=>g.dir===-1);
  var upH=up.filter(g=>g.res==='hit').length, dnH=dn.filter(g=>g.res==='hit').length;
  document.getElementById('k2-ba').textContent=pct(hits,f.length);
  var ci=typeof wilson==='function'?wilson(hits,f.length):null;
  document.getElementById('k2-ba-sub').textContent=hits+' hits / '+f.length+' signals'+(ci?' \u00b7 95% CI '+ci.lo+'\u2013'+ci.hi+'%':'');
  document.getElementById('k2-sig').textContent=f.length;
  document.getElementById('k2-hit').textContent=hits;
  document.getElementById('k2-miss').textContent=misses;
  document.getElementById('k2-up').textContent=up.length;
  document.getElementById('k2-up-sub').textContent='win '+pct(upH,up.length);
  document.getElementById('k2-dn').textContent=dn.length;
  document.getElementById('k2-dn-sub').textContent='win '+pct(dnH,dn.length);
  var avgR=f.length? f.reduce(function(a,g){return a+(g.r||0);},0)/f.length : 0;
  var kR=document.getElementById('k2-avgr'); kR.textContent=(f.length?(avgR>=0?'+':'')+avgR.toFixed(3)+' R':'\u2013'); kR.className='kpi-val '+(avgR>=0?'hit':'miss');
  document.getElementById('k2-avgr-sub').textContent='avg per trade, ATR units';
  var syms=Object.keys(DATA2).sort();
  var totalBars=syms.reduce((a,s)=>a+DATA2[s].length,0);
  document.getElementById('status-line-2').textContent = syms.length+' symbols \u00b7 '+totalBars.toLocaleString()+' daily bars \u00b7 '+(syms.length&&DATA2[syms[0]].length? DATA2[syms[0]][0].d+' \u2192 '+DATA2[syms[0]][DATA2[syms[0]].length-1].d : 'no data')+(f.length===0?' \u00b7 no signals with current settings':'');
  var map={};
  JOURNAL2.forEach(g=>{ var sec=SECTORS[g.sym]||'Custom imports'; if(!map[sec])map[sec]={n:0,h:0,days:0}; map[sec].n++; if(g.res==='hit')map[sec].h++; });
  Object.keys(DATA2).forEach(s=>{ var sec=SECTORS[s]||'Custom imports'; if(map[sec]) map[sec].days+=DATA2[s].length; });
  var tb=document.querySelector('#sector-table2 tbody'); tb.innerHTML='';
  Object.keys(map).sort((a,b)=> (map[b].h/map[b].n)-(map[a].h/map[a].n)).forEach(sec=>{
    var m=map[sec]; if(!m.n) return;
    var tr=document.createElement('tr');
    tr.innerHTML='<td>'+sec+'</td><td>'+m.n+'</td><td>'+(100*m.n/(m.days||1)).toFixed(1)+'</td><td class="'+((m.h/m.n)>=0.5?'pos':'neg')+'">'+pct(m.h,m.n)+'</td>';
    tb.appendChild(tr);
  });
}

loadStored(); settingsToUI(); renderUniverse(); runAll();
if('serviceWorker' in navigator && location.protocol==='https:'){ navigator.serviceWorker.register('sw.js').catch(function(){}); }
})();
