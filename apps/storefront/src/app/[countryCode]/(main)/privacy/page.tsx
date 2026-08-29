import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính sách riêng tư",
  description: "Cách Lặng Store xử lý tối thiểu dữ liệu cần cho đơn hàng.",
}

export default function PrivacyPage() {
  return (
    <article className="content-container max-w-3xl py-14 small:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Lặng Store
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Chính sách riêng tư
      </h1>
      <div className="mt-8 space-y-7 text-base leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Dữ liệu tối thiểu
          </h2>
          <p className="mt-2">
            Chúng tôi chỉ dùng tên người nhận, số điện thoại và địa chỉ để xử lý
            giao hàng. Email là tùy chọn cho việc gửi xác nhận và tra cứu đơn.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Không gian 18+
          </h2>
          <p className="mt-2">
            Xác nhận độ tuổi được lưu trên thiết bị của bạn. Bước này không yêu
            cầu ngày sinh, giấy tờ hay dữ liệu nhận dạng.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Đơn hàng và hỗ trợ
          </h2>
          <p className="mt-2">
            Thông tin đơn hàng chỉ hiển thị cho người sở hữu đơn hoặc quản trị
            viên được phân quyền. Bạn có thể yêu cầu xem, chỉnh sửa hoặc xóa dữ
            liệu theo quy trình hỗ trợ khi website vận hành chính thức.
          </p>
        </section>
      </div>
    </article>
  )
}
