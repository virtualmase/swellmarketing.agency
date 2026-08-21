# swellmarketing.agency Migration Register

## Purpose

`swellmarketing.agency` has been consolidated into `swellmarketing.xyz`. This register replaces the former route-wide homepage redirect with a documented destination for each public legacy route class. The current public service path is diagnostic or fit review, then written scope, then private collection. The legacy public checkout flow is not retained.

## Route decisions

| Legacy route or route class | Destination | Public-state decision | Reason |
|---|---|---|---|
| `/` | `https://swellmarketing.xyz/` | Migrated | The organization root now lives on `.xyz`. |
| `/pricing/` | `https://swellmarketing.xyz/pricing/` | Migrated | The current approved public programs and scope boundary are on the `.xyz` pricing page. |
| `/roadmap/` | `https://swellmarketing.xyz/roadmap.html` | Migrated | The current Swell roadmap is the route-specific successor. |
| `/checkout/agency-geo-os-setup/` | `https://swellmarketing.xyz/services/` | Migrated | The historical offer is replaced by the current services menu and consultative scope route. |
| `/checkout/ai-visibility-domination/` | `https://swellmarketing.xyz/resources/ai-visibility/` | Migrated | The current explanatory guide is the closest public successor. |
| `/checkout/enterprise-geo-command/` | `https://swellmarketing.xyz/services/` | Migrated | The historical commercial offer is replaced by the current service scope. |
| `/checkout/fractional-cgeo/` | `https://swellmarketing.xyz/services/` | Migrated | The historical commercial offer is replaced by the current service scope. |
| `/checkout/geo-audit/` | `https://swellmarketing.xyz/geo-audit/` | Migrated | The current diagnostic is the closest public audit entry point. |
| `/checkout/geo-authority/` | `https://swellmarketing.xyz/services/` | Migrated | The historical commercial offer is replaced by the current service scope. |
| `/checkout/geo-brand-entity-build/` | `https://swellmarketing.xyz/services/` | Migrated | The historical commercial offer is replaced by the current service scope. |
| `/checkout/geo-growth/` | `https://swellmarketing.xyz/pricing/` | Migrated | The current program page is the closest public successor. |
| `/checkout/geo-starter/` | `https://swellmarketing.xyz/geo-audit/` | Migrated | The current diagnostic is the closest public starting route. |
| `/checkout/white-label-geo-partner/` | `https://swellmarketing.xyz/partners/` | Migrated | The current partner route is the closest public successor. |
| `/thank-you/*` | `https://swellmarketing.xyz/contact/` | Retired private conversion route | Historical confirmation pages cannot reproduce a purchase, receipt, onboarding status, or private record. The current contact route is the approved support path. |
| Unlisted legacy path | `https://swellmarketing.xyz/` | Temporary fallback | This only covers undocumented historical URLs. Any observed material path must be added to this register and assigned a route-specific destination. |

## Release controls

Every redirect in `vercel.json` is permanent. Run `node scripts/verify-migration-config.mjs` before release. After production deployment, verify the representative root, pricing, roadmap, commercial, partner, audit, and thank-you routes with `curl -I` or an equivalent HTTP check. Do not publish new checkout or thank-you content under this retired domain without a new approved migration decision.
