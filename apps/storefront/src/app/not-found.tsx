import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@modules/common/components/ui"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Không tìm thấy trang | Lặng Store",
  description: "Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">Không tìm thấy trang</h1>
      <p className="text-small-regular text-ui-fg-base">
        Trang bạn yêu cầu không tồn tại hoặc đã được di chuyển.
      </p>
      <Link className="flex gap-x-1 items-center group" href="/vn">
        <Text className="text-ui-fg-interactive">Về trang chủ</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  )
}
