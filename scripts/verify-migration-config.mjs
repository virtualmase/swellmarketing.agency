import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
const redirects = new Map(config.redirects.map(({ source, destination, permanent }) => [source, { destination, permanent }]));

const expected = {
  '/pricing/:path*': 'https://swellmarketing.xyz/pricing/',
  '/roadmap/:path*': 'https://swellmarketing.xyz/roadmap.html',
  '/checkout/agency-geo-os-setup/:path*': 'https://swellmarketing.xyz/services/',
  '/checkout/ai-visibility-domination/:path*': 'https://swellmarketing.xyz/resources/ai-visibility/',
  '/checkout/enterprise-geo-command/:path*': 'https://swellmarketing.xyz/services/',
  '/checkout/fractional-cgeo/:path*': 'https://swellmarketing.xyz/services/',
  '/checkout/geo-audit/:path*': 'https://swellmarketing.xyz/geo-audit/',
  '/checkout/geo-authority/:path*': 'https://swellmarketing.xyz/services/',
  '/checkout/geo-brand-entity-build/:path*': 'https://swellmarketing.xyz/services/',
  '/checkout/geo-growth/:path*': 'https://swellmarketing.xyz/pricing/',
  '/checkout/geo-starter/:path*': 'https://swellmarketing.xyz/geo-audit/',
  '/checkout/white-label-geo-partner/:path*': 'https://swellmarketing.xyz/partners/',
  '/thank-you/:path*': 'https://swellmarketing.xyz/contact/',
  '/': 'https://swellmarketing.xyz/',
  '/(.*)': 'https://swellmarketing.xyz/'
};

for (const [source, destination] of Object.entries(expected)) {
  assert.deepEqual(redirects.get(source), { destination, permanent: true }, `Incorrect redirect for ${source}`);
}

const legacyRoutes = [
  '/',
  '/pricing/',
  '/roadmap/',
  '/checkout/agency-geo-os-setup/',
  '/checkout/ai-visibility-domination/',
  '/checkout/enterprise-geo-command/',
  '/checkout/fractional-cgeo/',
  '/checkout/geo-audit/',
  '/checkout/geo-authority/',
  '/checkout/geo-brand-entity-build/',
  '/checkout/geo-growth/',
  '/checkout/geo-starter/',
  '/checkout/white-label-geo-partner/',
  '/thank-you/agency-geo-os-setup/',
  '/thank-you/ai-visibility-domination/',
  '/thank-you/enterprise-geo-command/',
  '/thank-you/fractional-cgeo/',
  '/thank-you/geo-audit/',
  '/thank-you/geo-authority/',
  '/thank-you/geo-brand-entity-build/',
  '/thank-you/geo-growth/',
  '/thank-you/white-label-geo-partner/'
];

function matchesRoute(source, route) {
  if (source === '/(.*)') return false;
  if (source.endsWith('/:path*')) {
    const prefix = source.slice(0, -7);
    return route === prefix || route.startsWith(`${prefix}/`);
  }
  return route === source;
}

for (const route of legacyRoutes) {
  assert.ok(config.redirects.some(({ source }) => matchesRoute(source, route)), `No specific migration rule covers ${route}`);
}

assert.equal(config.redirects.at(-1).source, '/(.*)', 'The unlisted-route fallback must be last.');
assert.equal(config.redirects.filter(({ source }) => source === '/(.*)').length, 1, 'Only one unlisted-route fallback is allowed.');

console.log(`Migration redirect validation passed: ${Object.keys(expected).length} rules and ${legacyRoutes.length} legacy paths checked.`);
