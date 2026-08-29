import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Đổi trả & an toàn",
  description:
    "Thông tin đổi trả, kiểm tra đơn hàng và sử dụng sản phẩm an toàn tại Lặng Store.",
}

export default function ReturnsPage() {
  return (
    <article className="content-container max-w-3xl py-14 small:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">
        Lặng Store
      </p>
      <h1 className="mt-4 text-4xl font-semibold text-slate-950">
        Đổi trả & an toàn
      </h1>
      <div className="mt-8 space-y-7 text-base leading-7 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Kiểm tra khi nhận hàng
          </h2>
          <p className="mt-2">
            Hãy kiểm tra tình trạng kiện hàng và thông tin nhận trước khi mở
            niêm phong. Nếu bao bì rách, ướt hoặc có dấu hiệu giao nhầm, hãy
            giữ lại vỏ kiện, hình ảnh liên quan và mã đơn hàng để được hỗ trợ.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Sản phẩm chăm sóc cá nhân
          </h2>
          <p className="mt-2">
            Vì yếu tố vệ sinh, sản phẩm đã mở niêm phong hoặc đã sử dụng thường
            không phù hợp để đổi trả. Trường hợp giao sai, thiếu hàng hoặc lỗi
            do sản xuất sẽ được xem xét theo điều kiện công bố tại thời điểm
            mở bán và quy định pháp luật áp dụng.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Sử dụng có trách nhiệm
          </h2>
          <p className="mt-2">
            Đọc hướng dẫn của nhà sản xuất trước khi dùng, vệ sinh và bảo quản
            đúng cách, ngừng sử dụng nếu có dấu hiệu kích ứng. Chỉ dùng sản
            phẩm cho người trưởng thành và để xa trẻ em.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-slate-950">
            Chính sách chính thức
          </h2>
          <p className="mt-2">
            Trước khi nhận đơn thật, Lặng sẽ công bố kênh hỗ trợ chính thức,
            thời hạn tiếp nhận yêu cầu và điều kiện đổi trả đã được rà soát
            pháp lý. Không gửi thông tin đơn hàng qua tài khoản cá nhân hoặc
            kênh chưa được cửa hàng xác thực.
          </p>
        </section>
      </div>
    </article>
  )
}
