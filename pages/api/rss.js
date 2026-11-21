// Fetches an Aftenposten RSS feed server-side to avoid browser CORS issues.
// Usage: /api/rss?url=https://www.aftenposten.no/rss/
const ALLOWED = new Set(['www.aftenposten.no', 'aftenposten.no']);

module.exports = async (req, res) => {
  let target;
  try { target = new URL(req.query.url); } catch { return res.status(400).send('bad url'); }
  if (target.protocol !== 'https:' || !ALLOWED.has(target.hostname)) return res.status(403).send('host not allowed');
  try {
    const r = await fetch(target, {
      headers: {'User-Agent': 'Mozilla/5.0 (compatible; oslo-dash)', Accept: 'application/rss+xml, application/xml, text/xml, */*'},
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok) return res.status(502).send('upstream HTTP ' + r.status);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).send(await r.text());
  } catch (e) { res.status(504).send('upstream failed: ' + e.message); }
};
