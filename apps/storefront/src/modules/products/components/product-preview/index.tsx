import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block rounded-[1.35rem] bg-white p-3 shadow-[0_12px_30px_rgba(61,21,37,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(61,21,37,0.15)]"
    >
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="rounded-[1rem] border-0 bg-[#f0e5e2] shadow-none"
        />
        <div className="flex items-start justify-between gap-4 px-2 pb-2 pt-5">
          <div className="min-w-0">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a5167]">
              Đóng gói kín đáo
            </p>
            <Text
              className="text-base font-semibold leading-6 text-[#2a1119] transition group-hover:text-[#8c3851]"
              data-testid="product-title"
            >
              {product.title}
            </Text>
          </div>
          <div className="shrink-0 pt-5 text-right">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
