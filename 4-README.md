# BB Verifier

Sandbox verification tool for a Bollinger Band breakout/breakdown thesis. No brokerage connection, no orders, no real funds. Not investment advice.

Live app: https://tradingsniper.github.io/bb/

## What it does

- Identifies Bollinger band breaks to the upside (close above upper band) and downside (close below lower band), with optional confirmations: bandwidth squeeze, volume spike, trend alignment.
- Backtests every signal against what actually happened next and scores HIT / MISS.
- Dashboard shows the cumulative "batting average" (hits / signals), per-sector and per-symbol breakdowns, and a full audit trail: every signal can be opened to inspect the exact bars that decided it.
- Ships with 10 years of daily data for 80 liquid single stocks across the six verified winning sectors (utilities, health care, insurance, energy, industrials, technology). Staples, REITs, regional banks, materials, and telecom were tested and dropped - negative or thin expectancy in this strategy (XLU, XLP, XLV, XLRE, XLI, XLB, XLF, XLE, XLC, XLK, XLY, KIE, KRE). Import any Yahoo Finance historical CSV to test any symbol.
- Exports/imports JSON backups and a journal CSV. PWA: installable, works offline.

## How a hit is scored (default rules)

Two strategies, switchable in Settings:

MEAN-REVERSION (default, the verified winner): buy when price touches the lower band (20, 2) while above the 200-day average, skipping >4% news days. Target: return to the 20-day mean within 30 bars. Stop: 3 x ATR(14). On the 80-stock winning-sector universe: 75.7% win rate out-of-sample, +0.29R per trade after 10bps costs (n=1,307); 71.8% / +0.12R on the older 2016-2022 data that played no part in sector selection. All four time folds positive. Losses are ~3x the size of wins - position sizing decides survival.

BREAKOUT: close crosses outside the band, long-only by default with the 200-day average on the signal side. Entry: signal-day close plus 10bps slippage. HIT: +1.0 x ATR within 5 bars before -1.0 x ATR (target and stop independently adjustable). Honest ceiling: ~53% win rate at breakeven expectancy - the edge is competed away on large-cap dailies.

If both levels trade in one bar, it scores a MISS (conservative). If neither trades within the horizon, close-to-close direction decides. Signals repeat only after a 5-bar cooldown.

Every signal also carries an R multiple (profit in ATR units: +target on a hit, -stop on a stop-out, close-to-close move on timeout). The dashboard shows expectancy (avg R) next to the batting average, because a high win rate with a small target and a wide stop can still lose money - avg R is the honesty check.

All parameters are adjustable in the Settings tab; the dashboard re-runs the full backtest instantly.

## Files

- `index.html`, `styles.css`, `app.js` - the app
- `engine.js` - the signal + scoring engine (same logic used for the research analysis)
- `data.js` - bundled sector ETF data (daily OHLCV, source: Yahoo Finance chart API, 2016-09-06 to 2026-09-04)
- `manifest.webmanifest`, `sw.js`, icons - PWA shell

## Deploy

Static site. Any static host works: GitHub Pages (this repo, main branch, root), Netlify, Vercel, S3, or `python3 -m http.server` locally. Service worker requires HTTPS (or localhost).
