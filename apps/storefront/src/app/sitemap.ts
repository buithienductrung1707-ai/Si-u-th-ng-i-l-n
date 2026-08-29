import type { MetadataRoute } from "next"

import { getBaseURL } from "@lib/util/env"

const publicRoutes = [
  { path: "/vn", priority: 1, changeFrequency: "weekly" as const },
  { path: "/vn/store", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/vn/shipping", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/vn/returns", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/vn/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/vn/support", priority: 0.6, changeFrequency: "monthly" as const },
  {
    path: "/vn/products/bo-cham-soc-thu-gian-hang-ngay",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/vn/products/thiet-bi-massage-ca-nhan-mini",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/vn/products/gel-goc-nuoc-diu-nhe",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/vn/products/hop-qua-rieng-tu",
    priority: 0.8,
    changeFrequency: "weekly" as const,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseURL()

  return publicRoutes.map((route) => ({
    ...route,
    url: new URL(route.path, baseUrl).toString(),
  }))
}
