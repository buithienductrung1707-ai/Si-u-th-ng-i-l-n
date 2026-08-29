import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Giao hàng kín đáo",
  description: "Thông tin giao hàng và đóng gói trung tính tại Lặng Store.",
}

export default function ShippingPage() {
  return (
    <article className="content-container max-w-3xl py-14 small:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Lặng Store
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Giao hàng kín đáo
      </h1>
      <div className="mt-8 space-y-7 text-base leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Đóng gói trung tính
          </h2>
          <p className="mt-2">
            Tên sản phẩm không xuất hiện ở nhãn ngoài. Kiện hàng sử dụng bao bì
            kín, tên người gửi trung tính và chỉ ghi thông tin cần cho đơn vị
            vận chuyển.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Thời gian dự kiến
          </h2>
          <p className="mt-2">
            Nội thành có lựa chọn giao nhanh tùy khu vực. Đơn liên tỉnh dùng
            dịch vụ tiêu chuẩn; thời gian và phí hiển thị rõ trước khi bạn xác
            nhận đơn.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">Thanh toán</h2>
          <p className="mt-2">
            Môi trường hiện tại chỉ dùng nhà cung cấp thanh toán hệ thống để
            kiểm tra kỹ thuật và không nhận thanh toán thật. Các phương thức
            thanh toán được phê duyệt sẽ hiển thị rõ tại checkout trước khi
            cửa hàng chính thức mở bán.
          </p>
        </section>
      </div>
    </article>
  )
}
