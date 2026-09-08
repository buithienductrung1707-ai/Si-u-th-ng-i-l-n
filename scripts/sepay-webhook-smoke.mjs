import { createHmac } from "node:crypto";

const baseUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const secret = process.env.SEPAY_WEBHOOK_SECRET;
const sessionId = process.env.SEPAY_SESSION_ID;

if (!secret || !sessionId) {
  console.error(
    "Set SEPAY_WEBHOOK_SECRET and SEPAY_SESSION_ID before running the SePay webhook smoke test.",
  );
  process.exit(1);
}

const payload = JSON.stringify({
  id: Number(process.env.SEPAY_TEST_TRANSACTION_ID || 900001),
  gateway: "TestBank",
  transactionDate: new Date().toISOString(),
  accountNumber: "TEST_ACCOUNT",
  code: sessionId,
  content: `${sessionId} test mode`,
  transferType: "in",
  transferAmount: Number(process.env.SEPAY_TEST_AMOUNT || 1000),
  referenceCode: "TEST_REFERENCE",
});

const timestamp = Math.floor(Date.now() / 1000).toString();
const signature = `sha256=${createHmac("sha256", secret)
  .update(`${timestamp}.${payload}`)
  .digest("hex")}`;

const response = await fetch(`${baseUrl}/hooks/payment/sepay_sepay`, {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-sepay-signature": signature,
    "x-sepay-timestamp": timestamp,
  },
  body: payload,
});

console.log(
  JSON.stringify({
    endpoint: "/hooks/payment/sepay_sepay",
    status: response.status,
    accepted: response.ok,
  }),
);

if (!response.ok) {
  process.exit(1);
}
