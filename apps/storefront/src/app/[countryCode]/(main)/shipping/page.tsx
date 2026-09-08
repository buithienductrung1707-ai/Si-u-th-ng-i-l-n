import { Metadata } from "next"

import InformationPage from "@modules/common/components/information-page"

export const metadata: Metadata = {
  title: "Giao hàng kín đáo",
  description: "Thông tin giao hàng và đóng gói trung tính tại TC Store.",
}

export default function ShippingPage() {
  return (
    <InformationPage
      eyebrow="TC Store · Delivery"
      title="Giao đến tay bạn, thật kín đáo."
      intro="Từ cách đóng gói đến nội dung xác nhận đơn, TC Store chỉ giữ lại những thông tin cần thiết để đơn hàng đến đúng nơi."
      sections={[
        {
          title: "Đóng gói trung tính",
          body: (
            <p>
              Tên sản phẩm không xuất hiện ở nhãn ngoài. Kiện hàng sử dụng bao
              bì kín, tên người gửi trung tính và chỉ ghi thông tin cần cho đơn
              vị vận chuyển.
            </p>
          ),
        },
        {
          title: "Thời gian dự kiến",
          body: (
            <p>
              Nội thành có lựa chọn giao nhanh tùy khu vực. Đơn liên tỉnh dùng
              dịch vụ tiêu chuẩn; thời gian và phí hiển thị rõ trước khi bạn xác
              nhận đơn.
            </p>
          ),
        },
        {
          title: "Thanh toán",
          body: (
            <p>
              Các phương thức thanh toán được phê duyệt sẽ luôn hiển thị rõ ở
              checkout trước khi bạn xác nhận đơn. TC Store không yêu cầu bạn
              gửi thông tin thanh toán qua kênh cá nhân.
            </p>
          ),
        },
      ]}
    />
  )
}
