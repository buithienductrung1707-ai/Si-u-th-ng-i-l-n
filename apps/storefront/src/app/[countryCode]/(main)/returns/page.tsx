import { Metadata } from "next"

import InformationPage from "@modules/common/components/information-page"

export const metadata: Metadata = {
  title: "Đổi trả & an toàn",
  description:
    "Thông tin đổi trả, kiểm tra đơn hàng và sử dụng sản phẩm an toàn tại TC Store.",
}

export default function ReturnsPage() {
  return (
    <InformationPage
      eyebrow="TC Store · Care"
      title="Chăm sóc sau mua, theo cách có trách nhiệm."
      intro="Với các sản phẩm chăm sóc cá nhân, sự an toàn và điều kiện vệ sinh luôn được đặt lên trước trong mọi quyết định hỗ trợ."
      sections={[
        {
          title: "Kiểm tra khi nhận hàng",
          body: (
            <p>
              Hãy kiểm tra tình trạng kiện hàng và thông tin nhận trước khi mở
              niêm phong. Nếu bao bì rách, ướt hoặc có dấu hiệu giao nhầm, hãy
              giữ lại vỏ kiện, hình ảnh liên quan và mã đơn hàng để được hỗ trợ.
            </p>
          ),
        },
        {
          title: "Sản phẩm chăm sóc cá nhân",
          body: (
            <p>
              Vì yếu tố vệ sinh, sản phẩm đã mở niêm phong hoặc đã sử dụng
              thường không phù hợp để đổi trả. Trường hợp giao sai, thiếu hàng
              hoặc lỗi do sản xuất sẽ được xem xét theo điều kiện công bố tại
              thời điểm mở bán và quy định pháp luật áp dụng.
            </p>
          ),
        },
        {
          title: "Sử dụng có trách nhiệm",
          body: (
            <p>
              Đọc hướng dẫn của nhà sản xuất trước khi dùng, vệ sinh và bảo quản
              đúng cách, ngừng sử dụng nếu có dấu hiệu kích ứng. Chỉ dùng sản
              phẩm cho người trưởng thành và để xa trẻ em.
            </p>
          ),
        },
      ]}
    />
  )
}
