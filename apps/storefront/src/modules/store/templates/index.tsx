import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <main className="bg-[#f8f3ef] pb-20">
      <section className="relative overflow-hidden bg-[#210a14]">
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#9b405a]/30 blur-3xl" />
        <div className="content-container relative py-14 small:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f1ce86]">
            TC Store collection
          </p>
          <h1
            className="mt-4 max-w-2xl font-serif text-4xl tracking-[-0.04em] text-white small:text-6xl"
            data-testid="store-page-title"
          >
            Khám phá theo nhịp riêng của bạn.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#f4dfe5]/75">
            Những lựa chọn được tuyển chọn kỹ, giao kín đáo và luôn tôn trọng
            khoảng riêng tư của bạn.
          </p>
        </div>
      </section>

      <section className="content-container mt-8 flex flex-col gap-6 small:mt-10 small:flex-row small:items-start">
        <aside className="w-full rounded-[1.25rem] border border-[#eadeda] bg-white p-6 shadow-[0_10px_28px_rgba(58,21,34,0.05)] small:sticky small:top-24 small:w-[250px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c3851]">
            Tìm sản phẩm phù hợp
          </p>
          <RefinementList sortBy={sort} />
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-7 flex items-end justify-between border-b border-[#e9ddda] pb-5">
            <div>
              <p className="text-sm text-[#795c65]">Mua sắm kín đáo · 18+</p>
              <h2 className="mt-1 font-serif text-3xl tracking-[-0.035em] text-[#2a1119]">
                Bộ sưu tập TC Store
              </h2>
            </div>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
              optionValueIds={optionValueIds}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

export default StoreTemplate
