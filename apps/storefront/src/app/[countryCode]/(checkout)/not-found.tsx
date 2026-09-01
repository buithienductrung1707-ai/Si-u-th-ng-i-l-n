import InteractiveLink from "@modules/common/components/interactive-link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Không tìm thấy trang | Lặng Store",
  description: "Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.",
}

export default async function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Không tìm thấy trang</h1>
      <p className="text-small-regular text-ui-fg-base">
        Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.
      </p>
      <InteractiveLink href="/vn">Về trang chủ</InteractiveLink>
    </div>
  )
}
