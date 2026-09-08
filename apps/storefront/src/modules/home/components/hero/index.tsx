import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading } from "@modules/common/components/ui"

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#16070d]">
      <Image
        src="/images/tc-store-private-wellness-hero.png"
        alt="Không gian wellness riêng tư với hộp quà, chất liệu mềm và sản phẩm chăm sóc cá nhân"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[69%_center] opacity-80"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,5,12,0.98)_0%,rgba(31,7,17,0.94)_38%,rgba(50,12,28,0.52)_66%,rgba(25,5,13,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#16070d] to-transparent" />

      <div className="content-container relative z-10 flex min-h-[640px] items-center py-20 small:min-h-[700px] small:py-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-[#d9b36a]/40 bg-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f6dfb0] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7b365]" />
            TC Store · Private wellness
          </div>
          <span className="mt-7 block">
            <Heading
              level="h1"
              className="max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] text-white small:text-7xl"
            >
              Những điều riêng tư cũng xứng đáng được chăm chút.
            </Heading>
          </span>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#f5dfe3]/85 small:text-lg">
            Tuyển chọn nhẹ nhàng cho những khoảnh khắc bạn muốn dành trọn cho
            chính mình — kín đáo từ lúc chọn đến khi nhận hàng.
          </p>
          <div className="mt-9 flex flex-col gap-3 xsmall:flex-row">
            <LocalizedClientLink href="/store">
              <Button className="w-full rounded-full bg-[#f2d38e] px-7 py-3 text-[#2a0b19] shadow-[0_8px_30px_rgba(224,177,86,0.22)] transition hover:bg-[#fff0c5] xsmall:w-auto">
                Khám phá bộ sưu tập
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/shipping"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Giao hàng thật kín đáo
            </LocalizedClientLink>
          </div>
          <div className="mt-12 grid max-w-xl grid-cols-3 border-t border-white/15 pt-5 text-[#f5dfe3]">
            <div className="border-r border-white/15 pr-4">
              <p className="font-serif text-2xl text-white">18+</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#f5dfe3]/65">
                Không gian trưởng thành
              </p>
            </div>
            <div className="border-r border-white/15 px-4">
              <p className="font-serif text-2xl text-white">100%</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#f5dfe3]/65">
                Đóng gói trung tính
              </p>
            </div>
            <div className="pl-4">
              <p className="font-serif text-2xl text-white">7 ngày</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#f5dfe3]/65">
                Hỗ trợ tận tâm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
