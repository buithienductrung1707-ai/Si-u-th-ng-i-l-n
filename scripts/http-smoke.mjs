const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const storefrontUrl = process.env.STOREFRONT_URL || "http://localhost:8000";
const publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "MEDUSA_PUBLISHABLE_KEY is required. Read it from Medusa Admin or the local ignored environment file without committing it.",
  );
}

const apiHeaders = {
  "content-type": "application/json",
  "x-publishable-api-key": publishableKey,
};

async function request(url, options = {}) {
  const response = await fetch(url, options);
  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return body;
}

const storefrontResponse = await fetch(`${storefrontUrl}/vn`);
if (!storefrontResponse.ok) {
  throw new Error(`Storefront returned HTTP ${storefrontResponse.status}`);
}

const { regions } = await request(`${backendUrl}/store/regions`, {
  headers: apiHeaders,
});
const region = regions?.find(
  (candidate) =>
    candidate.currency_code === "vnd" &&
    candidate.countries?.some((country) => country?.iso_2 === "vn"),
);
if (!region) {
  throw new Error("Vietnam/VND region was not returned by the Store API");
}

const productsResponse = await request(
  `${backendUrl}/store/products?region_id=${encodeURIComponent(region.id)}&limit=4`,
  { headers: apiHeaders },
);
if ((productsResponse.products || []).length < 4) {
  throw new Error("Store API returned fewer than four seeded products");
}

const { payment_providers: paymentProviders } = await request(
  `${backendUrl}/store/payment-providers?region_id=${encodeURIComponent(region.id)}`,
  { headers: apiHeaders },
);
if (
  !paymentProviders?.some((provider) => provider.id === "pp_system_default")
) {
  throw new Error("The local system payment provider is not available");
}

const { cart } = await request(`${backendUrl}/store/carts`, {
  method: "POST",
  headers: apiHeaders,
  body: JSON.stringify({ region_id: region.id }),
});
if (!cart?.id) {
  throw new Error("Store API did not create a test cart");
}

const { shipping_options: shippingOptions } = await request(
  `${backendUrl}/store/shipping-options?cart_id=${encodeURIComponent(cart.id)}`,
  { headers: apiHeaders },
);
if ((shippingOptions || []).length < 2) {
  throw new Error("Store API returned fewer than two shipping options");
}

console.log(
  JSON.stringify({
    storefront: storefrontResponse.status,
    region: region.currency_code,
    products: productsResponse.products.length,
    paymentProviders: paymentProviders.length,
    shippingOptions: shippingOptions.length,
    cartCreated: true,
  }),
);
