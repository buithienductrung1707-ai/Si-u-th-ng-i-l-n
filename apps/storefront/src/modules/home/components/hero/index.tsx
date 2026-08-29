import Image from "next/image"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button, Heading } from "@modules/common/components/ui"

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden border-b border-rose-950 bg-[#2d1215]">
      <Image
        src="/assets/lang-wellness-hero.png"
        alt="Sản phẩm chăm sóc cá nhân được bày trong không gian kín đáo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#250d10]/95 via-[#3b151b]/80 to-[#3b151b]/10" />
      <div className="content-container relative z-10 flex min-h-[580px] items-center py-20 small:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">
            Riêng tư là ưu tiên
          </p>
          <span className="mt-5 block">
            <Heading
              level="h1"
              className="text-4xl leading-tight text-white font-semibold small:text-6xl"
            >
              Chăm sóc bản thân, theo cách thật riêng tư.
            </Heading>
          </span>
          <p className="mt-6 max-w-xl text-base leading-7 text-rose-50/90 small:text-lg">
            Sản phẩm được tuyển chọn cho những khoảnh khắc riêng. Đặt hàng kín
            đáo, chỉ cung cấp thông tin thật sự cần cho việc giao hàng.
          </p>
          <div className="mt-8 flex flex-col gap-3 xsmall:flex-row">
            <LocalizedClientLink href="/store">
              <Button className="w-full rounded-full bg-rose-200 px-6 py-3 text-rose-950 hover:bg-white xsmall:w-auto">
                Khám phá sản phẩm
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/shipping"
              className="inline-flex items-center justify-center rounded-full border border-rose-100/70 px-6 py-3 text-sm font-semibold text-white hover:border-white hover:bg-white/10"
            >
              Tìm hiểu giao hàng kín đáo
            </LocalizedClientLink>
          </div>
          <ul className="mt-10 grid gap-3 text-sm text-rose-50/90 xsmall:grid-cols-3">
            <li>Đóng gói trung tính</li>
            <li>Không cần tạo tài khoản</li>
            <li>Hỗ trợ mỗi ngày</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero
