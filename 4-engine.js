// BB Verifier engine v2 - identical logic powers the backtest in this app and the research analysis.
// v2: fill mode (signal close vs next-bar open), slippage, SMA200 regime filter, Wilson CI helper.
function bbAnalyze(rows, opts){
  opts = opts || {};
  var BB_LEN=opts.bbLen||20, BB_MULT=opts.bbMult||2, SQ_LOOK=opts.sqLook||126, SQ_PCT=opts.sqPct||0.20,
      VOL_MULT=opts.volMult!=null?opts.volMult:1.5, ATR_LEN=opts.atrLen||14,
      TARGET=opts.target||1.0, HORIZON=opts.horizon||5, COOLDOWN=opts.cooldown!=null?opts.cooldown:5,
      REQ_SQ=!!opts.reqSqueeze, REQ_VOL=!!opts.reqVol, REQ_TREND=!!opts.reqTrend,
      FILL=opts.fill||'close', SLIP=(opts.slippageBps||0)/10000, REGIME=!!opts.regime;
  var n=rows.length;
  var c=rows.map(r=>r.c), h=rows.map(r=>r.h), l=rows.map(r=>r.l), v=rows.map(r=>r.v), o=rows.map(r=>r.o);
  function sma(arr,i,len){ if(i<len-1) return null; var s=0; for(var k=i-len+1;k<=i;k++) s+=arr[k]; return s/len; }
  var mid=[],up=[],dn=[],bw=[],atr=[],vavg=[],sma50=[],sma200=[];
  for(var i=0;i<n;i++){
    var m=sma(c,i,BB_LEN); mid.push(m);
    if(m===null){up.push(null);dn.push(null);bw.push(null);}else{
      var s=0; for(var k=i-BB_LEN+1;k<=i;k++) s+=(c[k]-m)*(c[k]-m);
      var sd=Math.sqrt(s/BB_LEN); up.push(m+BB_MULT*sd); dn.push(m-BB_MULT*sd); bw.push((up[i]-dn[i])/m);
    }
    if(i<1){atr.push(null);}else{
      var tr=Math.max(h[i]-l[i], Math.abs(h[i]-c[i-1]), Math.abs(l[i]-c[i-1]));
      if(i<ATR_LEN){atr.push(null);}
      else if(i===ATR_LEN){var s2=0;for(var j=1;j<=ATR_LEN;j++){s2+=Math.max(h[j]-l[j],Math.abs(h[j]-c[j-1]),Math.abs(l[j]-c[j-1]));}atr.push(s2/ATR_LEN);}
      else{atr.push((atr[i-1]*(ATR_LEN-1)+tr)/ATR_LEN);}
    }
    vavg.push(sma(v,i,20)); sma50.push(sma(c,i,50)); sma200.push(sma(c,i,200));
  }
  function sqThresh(i){ if(i<SQ_LOOK) return null; var win=bw.slice(i-SQ_LOOK+1,i+1).filter(x=>x!==null); if(win.length<100) return null; win.sort((a,b)=>a-b); return win[Math.floor(SQ_PCT*(win.length-1))]; }
  var signals=[]; var lastSig=-9999;
  var lastI = n-HORIZON-(FILL==='open'?1:0);
  for(var i=0;i<lastI;i++){
    if(up[i]===null||atr[i]===null) continue;
    var dir = c[i]>up[i] ? 1 : (c[i]<dn[i] ? -1 : 0);
    if(dir===0) continue;
    if(i-lastSig < COOLDOWN) continue;
    var th=sqThresh(i); var squeeze = th!==null && bw[i]<=th;
    var volC = vavg[i]!==null && vavg[i]>0 && v[i] >= VOL_MULT*vavg[i];
    var trend = sma50[i]!==null && (dir===1 ? c[i]>sma50[i] : c[i]<sma50[i]);
    if(REQ_SQ && !squeeze) continue;
    if(REQ_VOL && !volC) continue;
    if(REQ_TREND && !trend) continue;
    if(REGIME && sma200[i]!==null && !(dir===1 ? c[i]>sma200[i] : c[i]<sma200[i])) continue;
    // entry: signal close, or next bar open (more realistic fill)
    var ei = FILL==='open' ? i+1 : i;
    var entry = (FILL==='open' ? o[ei] : c[i]);
    entry = dir===1 ? entry*(1+SLIP) : entry*(1-SLIP); // slippage always costs
    var target=TARGET*atr[i], res=null, resBar=null, mfe=0, mae=0;
    for(var j=ei+1;j<=ei+HORIZON;j++){
      var fav = dir===1 ? h[j]-entry : entry-l[j];
      var adv = dir===1 ? entry-l[j] : h[j]-entry;
      if(fav>mfe)mfe=fav; if(adv>mae)mae=adv;
      if(adv>=target){ res='miss'; resBar=j; break; } // adverse first; both-in-one-bar counts as miss (conservative)
      if(fav>=target){ res='hit'; resBar=j; break; }
    }
    if(res===null){ var move=c[ei+HORIZON]-entry; res = (dir===1?move>0:move<0)?'hit':'miss'; resBar=ei+HORIZON; }
    lastSig=i;
    signals.push({i:i, date:rows[i].d, dir:dir, entry:+entry.toFixed(2), squeeze:squeeze, vol:volC, trend:trend,
      res:res, bars:resBar-ei, mfe:+mfe.toFixed(2), mae:+mae.toFixed(2), atr:+atr[i].toFixed(2),
      score: 50 + (squeeze?20:0) + (volC?15:0) + (trend?15:0)});
  }
  return signals;
}
// Wilson score interval (95%) for a binomial proportion - the honest error bar on a batting average.
function wilson(hits, n){
  if(!n) return null;
  var z=1.96, p=hits/n, d=1+z*z/n;
  var ctr=(p+z*z/(2*n))/d, half=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;
  return {lo:+(100*(ctr-half)).toFixed(1), hi:+(100*(ctr+half)).toFixed(1)};
}
if (typeof module !== 'undefined') module.exports = { bbAnalyze, wilson };
