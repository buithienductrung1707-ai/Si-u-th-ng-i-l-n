import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createCollectionsWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductOptionsWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function initialDataSeed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT,
  );

  logger.info("Seeding Lặng Store data...");

  const {
    result: [salesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: "Kênh bán lẻ Lặng",
          description: "Cửa hàng chăm sóc cá nhân tại Việt Nam",
        },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Lặng Storefront Publishable API Key",
          type: "publishable",
          created_by: "seed",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [salesChannel.id],
    },
  });

  await createStoresWorkflow(container).run({
    input: {
      stores: [
        {
          name: "Lặng Store",
          default_sales_channel_id: salesChannel.id,
          supported_currencies: [
            {
              currency_code: "vnd",
              is_default: true,
            },
          ],
        },
      ],
    },
  });

  const {
    result: [region],
  } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Việt Nam",
          currency_code: "vnd",
          countries: ["vn"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });

  await createTaxRegionsWorkflow(container).run({
    input: [
      {
        country_code: "vn",
        provider_id: "tp_system",
      },
    ],
  });

  const {
    result: [stockLocation],
  } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "Kho phân phối Lặng",
          address: {
            address_1: "Hồ Chí Minh",
            city: "Hồ Chí Minh",
            country_code: "vn",
          },
        },
      ],
    },
  });

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Giao hàng kín đáo tại Việt Nam",
    type: "shipping",
    service_zones: [
      {
        name: "Việt Nam",
        geo_zones: [
          {
            country_code: "vn",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [ModuleRegistrationName.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [ModuleRegistrationName.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  });

  const serviceZone = fulfillmentSet.service_zones[0];
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Giao tiêu chuẩn kín đáo",
        price_type: "flat",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfiles[0].id,
        provider_id: "manual_manual",
        data: { id: "standard-discreet" },
        type: {
          label: "Giao tiêu chuẩn",
          description:
            "Đóng gói không nêu nội dung nhạy cảm; dự kiến 2–5 ngày.",
          code: "standard_discreet",
        },
        prices: [
          {
            currency_code: "vnd",
            amount: 45000,
          },
          {
            region_id: region.id,
            amount: 45000,
          },
        ],
      },
      {
        name: "Giao nhanh nội thành",
        price_type: "flat",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfiles[0].id,
        provider_id: "manual_manual",
        data: { id: "express-discreet" },
        type: {
          label: "Giao nhanh nội thành",
          description: "Xác nhận phạm vi phục vụ trước khi giao.",
          code: "express_discreet",
        },
        prices: [
          {
            currency_code: "vnd",
            amount: 30000,
          },
          {
            region_id: region.id,
            amount: 30000,
          },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [salesChannel.id],
    },
  });

  const { result: productCategories } = await createProductCategoriesWorkflow(
    container,
  ).run({
    input: {
      product_categories: [
        { name: "Chăm sóc cá nhân", is_active: true },
        { name: "Massage thư giãn", is_active: true },
        { name: "Gel & phụ kiện", is_active: true },
        { name: "Quà tặng riêng tư", is_active: true },
      ],
    },
  });

  const { result: collections } = await createCollectionsWorkflow(
    container,
  ).run({
    input: {
      collections: [
        { title: "Thiết yếu hằng ngày", handle: "thiet-yeu-hang-ngay" },
        { title: "Khoảnh khắc thư giãn", handle: "khoanh-khac-thu-gian" },
      ],
    },
  });

  const {
    result: [productOption],
  } = await createProductOptionsWorkflow(container).run({
    input: {
      product_options: [
        {
          title: "Phiên bản",
          values: ["Tiêu chuẩn"],
        },
      ],
    },
  });

  const categoryByName = new Map(
    productCategories.map((category) => [category.name, category.id]),
  );
  const collectionByHandle = new Map(
    collections.map((collection) => [collection.handle, collection.id]),
  );

  const products = [
    {
      title: "Bộ chăm sóc thư giãn hằng ngày",
      handle: "bo-cham-soc-thu-gian-hang-ngay",
      description:
        "Bộ sản phẩm tối giản cho khoảng thời gian chăm sóc riêng tư, phù hợp nhịp sống bận rộn.",
      category: "Chăm sóc cá nhân",
      collection: "thiet-yeu-hang-ngay",
      sku: "LANG-CARE-001",
      price: 289000,
    },
    {
      title: "Thiết bị massage cá nhân Mini",
      handle: "thiet-bi-massage-ca-nhan-mini",
      description:
        "Thiết kế nhỏ gọn, thao tác đơn giản và dễ cất giữ; hướng đến cảm giác thư giãn cá nhân.",
      category: "Massage thư giãn",
      collection: "khoanh-khac-thu-gian",
      sku: "LANG-MASSAGE-001",
      price: 459000,
    },
    {
      title: "Gel gốc nước dịu nhẹ",
      handle: "gel-goc-nuoc-diu-nhe",
      description:
        "Kết cấu gốc nước, không mùi, thông tin thành phần minh bạch để bạn chủ động lựa chọn.",
      category: "Gel & phụ kiện",
      collection: "thiet-yeu-hang-ngay",
      sku: "LANG-GEL-001",
      price: 149000,
    },
    {
      title: "Hộp quà riêng tư",
      handle: "hop-qua-rieng-tu",
      description:
        "Một lựa chọn quà tặng tinh tế với thông điệp kín đáo, để trao đi sự quan tâm theo cách của bạn.",
      category: "Quà tặng riêng tư",
      collection: "khoanh-khac-thu-gian",
      sku: "LANG-GIFT-001",
      price: 359000,
    },
  ];

  const { result: createdProducts } = await createProductsWorkflow(
    container,
  ).run({
    input: {
      products: products.map((product) => ({
        title: product.title,
        handle: product.handle,
        description: product.description,
        status: ProductStatus.PUBLISHED,
        category_ids: [categoryByName.get(product.category)!],
        collection_id: collectionByHandle.get(product.collection),
        options: [{ id: productOption.id }],
        variants: [
          {
            title: "Tiêu chuẩn",
            sku: product.sku,
            manage_inventory: true,
            options: {
              [productOption.title]: "Tiêu chuẩn",
            },
            prices: [
              {
                amount: product.price,
                currency_code: "vnd",
              },
            ],
          },
        ],
        sales_channels: [{ id: salesChannel.id }],
      })),
    },
  });

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "sku"],
  });

  const inventoryBySku = new Map(
    inventoryItems.map((item) => [item.sku, item.id]),
  );
  const productVariants = createdProducts.flatMap(
    (product) => product.variants,
  );

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: productVariants.map((variant) => ({
        inventory_item_id: inventoryBySku.get(variant.sku)!,
        location_id: stockLocation.id,
        stocked_quantity: 100,
      })),
    },
  });

  logger.info("Lặng Store seed complete.");
}
