import type { MetadataRoute } from "next"

import { getBaseURL } from "@lib/util/env"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseURL()

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/vn/account/", "/vn/cart", "/vn/checkout", "/vn/order/", "/api/"],
    },
    sitemap: new URL("/sitemap.xml", baseUrl).toString(),
  }
}
