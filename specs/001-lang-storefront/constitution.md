# Lặng Store Constitution

## Product principles

1. Customer privacy is a product feature. Collect only the fields needed to fulfil an order, support guest checkout, and never expose product names in browser titles, shipment labels, notification subjects, or analytics events.
2. The storefront is 18+ only. Age confirmation is a voluntary, device-local acknowledgement; it must not request identity documents or store a birth date.
3. The site is mobile-first, keyboard-accessible, fast on common Vietnamese mobile networks, and fully usable without marketing cookies.
4. Brand, copy, imagery, product data, and code are original. The reference shop informs required commerce flows only; no visual or content assets are copied.
5. Payment and delivery providers are adapters. Until a merchant account and category approval exist, the usable development options are cash on delivery and manual bank transfer only.

## Delivery standards

- TypeScript must remain strict and code must pass the repository lint/build checks.
- Each commerce flow needs an acceptance test before release.
- Production release requires a privacy review, a payment-provider approval, a carrier confirmation, and a successful staging security scan.
