import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hỗ trợ kín đáo",
  description: "Kênh hỗ trợ và quy trình chăm sóc khách hàng của Lặng Store.",
}

export default function SupportPage() {
  return (
    <article className="content-container max-w-3xl py-14 small:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Lặng Store
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Hỗ trợ kín đáo
      </h1>
      <div className="mt-8 space-y-4 text-base leading-7 text-slate-700">
        <p>
          Đội ngũ hỗ trợ sẽ dùng ngôn ngữ trung tính khi xác nhận đơn và chỉ
          liên hệ theo kênh bạn cung cấp trong checkout.
        </p>
        <p>
          Thông tin liên hệ, giờ phục vụ và chính sách đổi trả sẽ được bổ sung
          trước khi phát hành chính thức; không dùng số điện thoại hoặc tài
          khoản cá nhân mẫu trong môi trường demo.
        </p>
      </div>
    </article>
  )
}
