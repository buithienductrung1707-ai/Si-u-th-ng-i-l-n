import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import TrustPoints from "@modules/home/components/trust-points"
import FallbackCatalog from "@modules/home/components/fallback-catalog"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Không gian riêng tư",
  description: "Mua sắm riêng tư với đóng gói kín đáo và thanh toán linh hoạt.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  let region = null
  let collections = null

  try {
    region = await getRegion(countryCode)
    const response = await listCollections({
      fields: "id, handle, title",
    })
    collections = response.collections
  } catch {
    // The curated preview stays usable until the connected catalog is live.
  }

  return (
    <>
      <Hero />
      <TrustPoints />
      <FallbackCatalog />
      {collections && region && (
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      )}
    </>
  )
}
