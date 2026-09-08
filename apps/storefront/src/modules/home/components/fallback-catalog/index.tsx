import LocalizedClientLink from "@modules/common/components/localized-client-link"

const products = [
  {
    name: "Bộ chăm sóc thư giãn hằng ngày",
    detail: "Một điểm khởi đầu tối giản, êm dịu và dễ lựa chọn.",
    price: "289.000 ₫",
    tone: "from-[#4a1729] via-[#8d3e58] to-[#d69b95]",
    label: "Ritual hằng ngày",
  },
  {
    name: "Thiết bị massage cá nhân Mini",
    detail: "Nhỏ gọn, nhẹ nhàng và thuận tiện cất giữ.",
    price: "459.000 ₫",
    tone: "from-[#211827] via-[#5f3b58] to-[#b2819c]",
    label: "Chọn lọc",
  },
  {
    name: "Gel gốc nước dịu nhẹ",
    detail: "Không mùi, chất liệu minh bạch cho cảm giác thoải mái.",
    price: "149.000 ₫",
    tone: "from-[#433126] via-[#9b7052] to-[#ddc0a1]",
    label: "Êm dịu",
  },
  {
    name: "Hộp quà riêng tư",
    detail: "Một cách tinh tế để trao sự quan tâm vừa đủ.",
    price: "359.000 ₫",
    tone: "from-[#3d1025] via-[#82264b] to-[#e0a1ac]",
    label: "Quà tặng",
  },
]

type FallbackCatalogProps = {
  mode?: "home" | "store"
}

const FallbackCatalog = ({ mode = "home" }: FallbackCatalogProps) => {
  const isStore = mode === "store"

  return (
    <section
      className={
        isStore
          ? "rounded-[1.5rem] border border-[#eadeda] bg-white p-6 shadow-[0_10px_28px_rgba(58,21,34,0.05)]"
          : "relative overflow-hidden bg-[#f8f3ef] py-20 small:py-28"
      }
    >
      {!isStore && (
        <div className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8c9ba]/50 blur-3xl" />
      )}
      <div className={isStore ? "" : "content-container relative"}>
        <div className="flex flex-col justify-between gap-6 small:flex-row small:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8c3851]">
              {isStore
                ? "Danh mục đang được đồng bộ"
                : "Curated for your quiet moments"}
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.04em] text-[#281017] small:text-6xl">
              {isStore
                ? "Những lựa chọn vừa vặn vẫn ở đây."
                : "Chọn một điều vừa vặn cho hôm nay."}
            </h2>
            {isStore && (
              <p className="mt-4 max-w-lg text-base leading-7 text-[#735a62]">
                Trong khi danh mục đầy đủ hoàn tất đồng bộ, bạn vẫn có thể xem
                các lựa chọn phổ biến và nhận tư vấn kín đáo.
              </p>
            )}
          </div>
          <LocalizedClientLink
            href="/support"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-[#6b1c3b]"
          >
            Nhận tư vấn kín đáo
            <span className="text-lg transition-transform group-hover:translate-x-1">
              →
            </span>
          </LocalizedClientLink>
        </div>

        <div className="mt-12 grid gap-5 small:grid-cols-2 large:grid-cols-4">
          {products.map((product, index) => (
            <article
              key={product.name}
              className="group rounded-[1.5rem] bg-white p-3 shadow-[0_16px_45px_rgba(71,23,38,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(71,23,38,0.16)]"
            >
              <div
                className={`relative flex aspect-[4/5] overflow-hidden rounded-[1.1rem] bg-gradient-to-br p-5 ${product.tone}`}
              >
                <span className="relative z-10 h-fit rounded-full border border-white/35 bg-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {product.label}
                </span>
                <span className="absolute -bottom-12 -right-10 h-40 w-40 rounded-full border border-white/25 bg-white/15 transition-transform duration-500 group-hover:scale-125" />
                <span className="absolute bottom-9 right-10 h-24 w-20 rotate-[24deg] rounded-[45%] border border-white/45 bg-white/25 shadow-xl backdrop-blur-sm" />
                <span className="absolute bottom-7 right-8 font-serif text-5xl text-white/45">
                  0{index + 1}
                </span>
              </div>
              <div className="px-2 pb-2 pt-5">
                <h3 className="text-lg font-semibold leading-6 text-[#2a1119]">
                  {product.name}
                </h3>
                <p className="mt-2 min-h-10 text-sm leading-5 text-[#735a62]">
                  {product.detail}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#eee3e3] pt-4">
                  <span className="font-semibold text-[#7d2342]">
                    {product.price}
                  </span>
                  <LocalizedClientLink
                    href="/support"
                    className="rounded-full bg-[#2a1119] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#8c3851]"
                  >
                    Xem chi tiết
                  </LocalizedClientLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FallbackCatalog
