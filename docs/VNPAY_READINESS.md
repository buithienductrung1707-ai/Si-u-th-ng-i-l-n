# VNPAY readiness

Lặng Store has selected VNPAY Gateway as the primary payment option for a
Vietnamese launch. The gateway remains disabled until VNPAY has approved the
merchant's actual adult-wellness catalog in writing and issued credentials.

## Merchant onboarding gate

Before implementation is activated, retain the following outside Git:

- Written confirmation that the exact product category is accepted.
- Merchant contract and production `VNPAY_TMN_CODE` and `VNPAY_HASH_SECRET`.
- A public HTTPS domain and final return and IPN URLs registered with VNPAY.
- Final, legally reviewed shipping, cancellation, refund, return and support
  contact information visible to customers.
- Separate sandbox credentials for acceptance testing.

Never add the VNPAY secret, merchant code, customer payment data or callback
payloads to the repository, browser code or application logs.

## Required flow

1. Create the Medusa payment session on the backend and create a unique,
   idempotent merchant transaction reference.
2. Generate a signed VNPAY redirect URL in the backend only; the storefront
   must not construct a request with the hash secret.
3. Send the shopper to VNPAY's hosted payment page in VND.
4. Use the return URL only to show the shopper a status page. Verify the signed
   server-to-server IPN before recording a payment or releasing fulfilment.
5. Validate the reference, amount, currency, response and transaction status;
   make duplicate IPNs safe to process.
6. Reconcile failed, delayed and disputed payments before shipping.

VNPAY's sandbox documentation describes the required `vnp_TmnCode`,
`vnp_HashSecret`, payment URL, Return URL and SSL-protected IPN URL. It also
distinguishes the customer redirect from the IPN that updates the merchant's
payment state: <https://sandbox.vnpayment.vn/apis/docs/thanh-toan-pay/pay.html>.

## Project configuration

Set the following values only through the deployment secret manager or local
untracked environment file:

```text
VNPAY_ENABLED=true
VNPAY_TMN_CODE=<merchant code>
VNPAY_HASH_SECRET=<secret from VNPAY>
VNPAY_PAYMENT_URL=<sandbox or production URL confirmed by VNPAY>
VNPAY_RETURN_URL=https://<store-domain>/payment/vnpay/return
VNPAY_IPN_URL=https://<api-domain>/hooks/payment/vnpay/ipn
```

The provider adapter, callback endpoints and checkout option must not be
enabled until all onboarding-gate items are complete.
