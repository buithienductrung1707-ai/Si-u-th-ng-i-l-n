# Lặng Store MVP

## Purpose

Lặng Store is a Vietnamese privacy-first storefront for adult wellness products. It offers a calm, discreet shopping experience with original catalogue data, product discovery, guest checkout, and neutral fulfilment communication.

## Primary customer journey

1. A visitor confirms that they are 18+ without supplying personal information.
2. They browse categories, search, filter, view product variants, and add items to a cart.
3. They enter only fulfilment details, select discreet delivery, and choose COD or manual transfer.
4. They receive an order confirmation with neutral language and can use a private tokenized link to view the order.

## In scope

- Vietnamese storefront, VND formatting, mobile navigation, search, category filters, product detail pages, cart, account-optional checkout, and order status.
- Home-page trust statements: discreet packaging, minimal data, customer support hours, delivery zones, and return-policy link.
- An admin-managed catalogue, product variants, stock, promotions, orders, and customer records through Medusa.
- A configurable delivery method for inner-city fast delivery and nationwide standard delivery.
- A payment abstraction with enabled development methods: COD and manual transfer; placeholders for VNPay, MoMo, and ZaloPay.
- Privacy, age confirmation, returns, and support pages.

## Out of scope for MVP

- Live merchant payment credentials, carrier credentials, customer ID verification, loyalty points, public product reviews, marketplace synchronization, and automated marketing.

## Acceptance criteria

- A first-time visitor cannot browse or purchase until they acknowledge the 18+ notice.
- The home page clearly offers product browsing, search, discreet delivery, and support without blocking popups.
- A customer can add a selected variant to cart, change quantity, and start checkout on a phone-sized viewport.
- Checkout supports guest orders with name, phone, delivery address, and optional email only.
- COD and manual transfer can be selected without any third-party credentials.
- Customer-facing titles and notification templates avoid sensitive product wording.
- The repository has documented checks for end-to-end, accessibility, performance, dependency, and staging security testing.
