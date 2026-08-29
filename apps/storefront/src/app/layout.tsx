import { getBaseURL } from "@lib/util/env"
import AgeGate from "@modules/common/components/age-gate"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "Lặng — Không gian riêng tư",
    template: "%s | Lặng",
  },
  description:
    "Không gian mua sắm riêng tư với đóng gói kín đáo và hỗ trợ tận tâm.",
  openGraph: {
    title: "Lặng — Không gian riêng tư",
    description:
      "Sản phẩm chăm sóc cá nhân với giao hàng kín đáo và thông tin minh bạch.",
    images: ["/assets/lang-wellness-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lặng — Không gian riêng tư",
    description: "Chăm sóc bản thân, theo cách thật riêng tư.",
    images: ["/assets/lang-wellness-hero.png"],
  },
}

// Storefront pages need live Medusa data; render them only when requested.
export const dynamic = "force-dynamic"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="vi" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
        <AgeGate />
      </body>
    </html>
  )
}
