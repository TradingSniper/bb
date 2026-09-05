(function(){
"use strict";
var SECTORS={XLU:"Utilities",XLP:"Consumer Staples",XLV:"Health Care",XLRE:"Real Estate",XLI:"Industrials",XLB:"Materials",XLF:"Financials",XLE:"Energy",XLC:"Communication Services",XLK:"Technology",XLY:"Consumer Discretionary",KIE:"Insurance",KRE:"Regional Banks"};
var DEFAULTS={bbLen:20,bbMult:2,sqLook:126,sqPct:0.20,volMult:1.5,atrLen:14,mode:'mr',target:1.0,stop:3.0,horizon:30,cooldown:5,dir:1,reqSqueeze:false,reqVol:false,reqTrend:false,exclNews:true,fill:'close',slippageBps:10,regime:true};
var DATA={}, SETTINGS=loadSettings(), JOURNAL=[], FILTER={sym:null,res:null,dir:null};

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
  JOURNAL=[];
  var syms=Object.keys(DATA).sort();
  for(var s=0;s<syms.length;s++){ var sym=syms[s];
    var sigs=bbAnalyze(DATA[sym], SETTINGS);
    for(var i=0;i<sigs.length;i++){ var g=sigs[i]; g.sym=sym; JOURNAL.push(g); }
  }
  JOURNAL.sort((a,b)=> a.date<b.date?-1:1);
  render();
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
function renderSymbols(){
  var map={};
  JOURNAL.forEach(g=>{ if(!map[g.sym])map[g.sym]={n:0,h:0,score:0}; map[g.sym].n++; if(g.res==='hit')map[g.sym].h++; map[g.sym].score+=g.score; });
  var tb=document.querySelector('#symbol-table tbody'); tb.innerHTML='';
  Object.keys(map).sort().forEach(sym=>{
    var m=map[sym]; var tr=document.createElement('tr');
    tr.innerHTML='<td>'+sym+'</td><td>'+m.n+'</td><td>'+m.h+'</td><td>'+(m.n-m.h)+'</td><td class="'+((m.h/m.n)>=0.5?'pos':'neg')+'">'+pct(m.h,m.n)+'</td><td>'+(m.score/m.n).toFixed(0)+'</td>';
    tr.onclick=function(){ FILTER.sym=FILTER.sym===sym?null:sym; render(); switchTab('journal'); };
    tb.appendChild(tr);
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
      'MEAN-REVERSION MODE. A signal fires when price touches the lower Bollinger band ('+SETTINGS.bbLen+','+SETTINGS.bbMult+') while the close is above the 200-day average (uptrend)'+(SETTINGS.exclNews?', skipping days with a >4% single-day move (earnings/news proxy)':'')+'. The bet: the dip snaps back. Entry is the '+(SETTINGS.fill==='open'?'open of the bar after the signal':'signal-day close')+(SETTINGS.slippageBps?' plus '+SETTINGS.slippageBps+'bps slippage':'')+'. A HIT means price returned to the 20-day average within '+SETTINGS.horizon+' bars before falling '+SETTINGS.stop+'\u00d7 ATR('+SETTINGS.atrLen+') below entry. If neither happens in time, the close-to-close direction decides. R = profit in ATR units (distance-to-mean on a hit, -'+SETTINGS.stop+' on a stop-out). This is the config that survived out-of-sample testing on 161 symbols x 10 years: 72.5% win rate, +0.17R per trade after costs (n=2,623). The catch: losses are 3x the size of wins, so position sizing decides survival.';
    return;
  }
  document.getElementById('rules-explainer').textContent =
    'BREAKOUT MODE. A signal fires when the close crosses outside the Bollinger band ('+SETTINGS.bbLen+','+SETTINGS.bbMult+')'+
    (SETTINGS.dir===1?' - long breakouts only':SETTINGS.dir===-1?' - short breakdowns only':'')+
    (SETTINGS.reqSqueeze?' with bandwidth in the lowest '+(SETTINGS.sqPct*100)+'% of the trailing '+SETTINGS.sqLook+' days':'')+
    (SETTINGS.reqVol?' with volume \u2265 '+SETTINGS.volMult+'\u00d7 the 20-day average':'')+
    (SETTINGS.reqTrend?' with the close on the signal side of the 50-day average':'')+
    (SETTINGS.exclNews?', skipping >4% single-day moves (news proxy)':'')+
    '. Entry is the '+(SETTINGS.fill==='open'?'open of the bar after the signal':'signal-day close')+(SETTINGS.slippageBps?' plus '+SETTINGS.slippageBps+'bps slippage':'')+(SETTINGS.regime?', only with the 200-day average on the signal side':'')+'. A HIT means price moved +'+SETTINGS.target+'\u00d7 ATR('+SETTINGS.atrLen+') in the signal direction within '+SETTINGS.horizon+' bars before moving '+SETTINGS.stop+'\u00d7 ATR against it; if both levels trade in one bar it scores a MISS (conservative). If neither level trades within '+SETTINGS.horizon+' bars, the close-to-close direction decides. Batting average = hits \u00f7 signals. R = profit in ATR units per trade - the expectancy check that keeps a high win rate honest. Signals repeat only after '+SETTINGS.cooldown+' bars.';
}
function switchTab(name){
  document.querySelectorAll('nav#tabs button').forEach(b=>b.classList.toggle('active', b.dataset.tab===name));
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active', t.id==='tab-'+name));
}
document.querySelectorAll('nav#tabs button').forEach(b=> b.onclick=function(){ switchTab(b.dataset.tab); });

// settings wiring
function settingsToUI(){
  var m={bbLen:'s-bblen',bbMult:'s-bbmult',sqLook:'s-sqlook',sqPct:'s-sqpct',volMult:'s-volmult',atrLen:'s-atrlen',target:'s-target',stop:'s-stop',horizon:'s-horizon',cooldown:'s-cooldown',slippageBps:'s-slip'};
  for(var k in m) document.getElementById(m[k]).value=SETTINGS[k];
  document.getElementById('s-dir').value=String(SETTINGS.dir);
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
  SETTINGS.dir=parseInt(document.getElementById('s-dir').value,10);
  SETTINGS.mode=document.getElementById('s-mode').value;
  SETTINGS.exclNews=document.getElementById('s-excl-news').checked;
  SETTINGS.reqSqueeze=document.getElementById('s-req-squeeze').checked;
  SETTINGS.reqVol=document.getElementById('s-req-vol').checked;
  SETTINGS.reqTrend=document.getElementById('s-req-trend').checked;
  SETTINGS.regime=document.getElementById('s-req-regime').checked;
  SETTINGS.fill=document.getElementById('s-fill').value;
  saveSettings(); runAll(); switchTab('dashboard');
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

loadStored(); settingsToUI(); runAll();
if('serviceWorker' in navigator && location.protocol==='https:'){ navigator.serviceWorker.register('sw.js').catch(function(){}); }
})();
