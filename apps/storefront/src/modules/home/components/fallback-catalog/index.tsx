import LocalizedClientLink from "@modules/common/components/localized-client-link"

const products = [
  {
    name: "Bộ chăm sóc thư giãn hằng ngày",
    detail: "Tối giản, riêng tư và dễ lựa chọn.",
    price: "289.000 ₫",
    tone: "from-[#f6dfdb] to-[#e9b7b0]",
  },
  {
    name: "Thiết bị massage cá nhân Mini",
    detail: "Nhỏ gọn, êm ái và thuận tiện cất giữ.",
    price: "459.000 ₫",
    tone: "from-[#d9c1c7] to-[#a66c7b]",
  },
  {
    name: "Gel gốc nước dịu nhẹ",
    detail: "Không mùi, minh bạch thành phần.",
    price: "149.000 ₫",
    tone: "from-[#ece1d5] to-[#d9bca1]",
  },
  {
    name: "Hộp quà riêng tư",
    detail: "Một cách tinh tế để trao sự quan tâm.",
    price: "359.000 ₫",
    tone: "from-[#e6ccd1] to-[#c48b97]",
  },
]

const FallbackCatalog = () => {
  return (
    <section className="content-container py-14 small:py-20">
      <div className="flex flex-col justify-between gap-5 small:flex-row small:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
            Gợi ý cho bạn
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 small:text-4xl">
            Bộ sưu tập chọn lọc
          </h2>
        </div>
        <LocalizedClientLink
          href="/support"
          className="text-sm font-semibold text-rose-800 underline-offset-4 hover:underline"
        >
          Nhận tư vấn kín đáo
        </LocalizedClientLink>
      </div>
      <div className="mt-9 grid gap-4 small:grid-cols-2 large:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.name}
            className="group overflow-hidden rounded-2xl border border-rose-100 bg-white p-4 shadow-sm transition-transform duration-200 hover:-translate-y-1"
          >
            <div
              className={`flex aspect-[4/3] items-end rounded-xl bg-gradient-to-br p-4 ${product.tone}`}
            >
              <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-rose-950 backdrop-blur">
                Đóng gói kín đáo
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              {product.name}
            </h3>
            <p className="mt-2 min-h-10 text-sm leading-5 text-slate-600">
              {product.detail}
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="font-semibold text-rose-800">
                {product.price}
              </span>
              <LocalizedClientLink
                href="/support"
                className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:border-rose-500"
              >
                Xem chi tiết
              </LocalizedClientLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FallbackCatalog
