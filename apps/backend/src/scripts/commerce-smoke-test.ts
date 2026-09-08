import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils";

const expectedHandles = [
  "bo-cham-soc-thu-gian-hang-ngay",
  "thiet-bi-massage-ca-nhan-mini",
  "gel-goc-nuoc-diu-nhe",
  "hop-qua-rieng-tu",
];

export default async function commerceSmokeTest({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  const [{ data: regions }, { data: products }, { data: shippingOptions }] =
    await Promise.all([
      query.graph({
        entity: "region",
        fields: ["id", "currency_code", "countries.iso_2"],
      }),
      query.graph({
        entity: "product",
        fields: ["id", "handle", "variants.sku", "variants.prices"],
      }),
      query.graph({
        entity: "shipping_option",
        fields: ["id", "name"],
      }),
    ]);

  const vietnamRegion = regions.find(
    (region) =>
      region.currency_code === "vnd" &&
      region.countries?.some((country) => country?.iso_2 === "vn"),
  );
  if (!vietnamRegion) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Smoke test failed: Vietnam/VND region is missing.",
    );
  }

  const productHandles = new Set(
    products.map((product) => product.handle).filter(Boolean),
  );
  const missingProducts = expectedHandles.filter(
    (handle) => !productHandles.has(handle),
  );
  if (missingProducts.length > 0) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Smoke test failed: missing products ${missingProducts.join(", ")}.`,
    );
  }

  if (shippingOptions.length < 2) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `Smoke test failed: expected at least 2 shipping options, found ${shippingOptions.length}.`,
    );
  }

  logger.info(
    `Commerce smoke test passed: ${regions.length} region(s), ${products.length} product(s), ${shippingOptions.length} shipping option(s).`,
  );
}
