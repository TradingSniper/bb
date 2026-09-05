# BB Verifier

Sandbox verification tool for a Bollinger Band breakout/breakdown thesis. No brokerage connection, no orders, no real funds. Not investment advice.

Live app: https://tradingsniper.github.io/bb/

## What it does

- Identifies Bollinger band breaks to the upside (close above upper band) and downside (close below lower band), with optional confirmations: bandwidth squeeze, volume spike, trend alignment.
- Backtests every signal against what actually happened next and scores HIT / MISS.
- Dashboard shows the cumulative "batting average" (hits / signals), per-sector and per-symbol breakdowns, and a full audit trail: every signal can be opened to inspect the exact bars that decided it.
- Ships with 10 years of daily data for 13 sector ETFs (XLU, XLP, XLV, XLRE, XLI, XLB, XLF, XLE, XLC, XLK, XLY, KIE, KRE). Import any Yahoo Finance historical CSV to test any symbol.
- Exports/imports JSON backups and a journal CSV. PWA: installable, works offline.

## How a hit is scored (default rules)

Signal: close crosses outside the Bollinger band (20, 2), long breakouts only by default, with the 200-day average on the signal side. Entry: signal-day close plus 10bps slippage.
HIT: price moves +1.0 x ATR(14) in the signal direction within 5 bars before moving 1.0 x ATR against it (target and stop are independently adjustable - asymmetric risk is supported). If both levels trade in one bar, it scores a MISS (conservative). If neither trades within 5 bars, close-to-close direction decides. Signals repeat only after a 5-bar cooldown.

Every signal also carries an R multiple (profit in ATR units: +target on a hit, -stop on a stop-out, close-to-close move on timeout). The dashboard shows expectancy (avg R) next to the batting average, because a high win rate with a small target and a wide stop can still lose money - avg R is the honesty check.

All parameters are adjustable in the Settings tab; the dashboard re-runs the full backtest instantly.

## Files

- `index.html`, `styles.css`, `app.js` - the app
- `engine.js` - the signal + scoring engine (same logic used for the research analysis)
- `data.js` - bundled sector ETF data (daily OHLCV, source: Yahoo Finance chart API, 2016-09-06 to 2026-09-04)
- `manifest.webmanifest`, `sw.js`, icons - PWA shell

## Deploy

Static site. Any static host works: GitHub Pages (this repo, main branch, root), Netlify, Vercel, S3, or `python3 -m http.server` locally. Service worker requires HTTPS (or localhost).
