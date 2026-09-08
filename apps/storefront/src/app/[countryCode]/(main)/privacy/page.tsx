import { Metadata } from "next"

import InformationPage from "@modules/common/components/information-page"

export const metadata: Metadata = {
  title: "Chính sách riêng tư",
  description: "Cách TC Store xử lý tối thiểu dữ liệu cần cho đơn hàng.",
}

export default function PrivacyPage() {
  return (
    <InformationPage
      eyebrow="TC Store · Privacy"
      title="Sự riêng tư là một phần của dịch vụ."
      intro="Chúng tôi thiết kế trải nghiệm mua sắm với nguyên tắc thu thập tối thiểu, dùng đúng mục đích và giao tiếp theo kênh bạn lựa chọn."
      sections={[
        {
          title: "Dữ liệu tối thiểu",
          body: (
            <p>
              Chúng tôi chỉ dùng tên người nhận, số điện thoại và địa chỉ để xử
              lý giao hàng. Email là tùy chọn cho việc gửi xác nhận và tra cứu
              đơn.
            </p>
          ),
        },
        {
          title: "Không gian 18+",
          body: (
            <p>
              Xác nhận độ tuổi được lưu trên thiết bị của bạn. Bước này không
              yêu cầu ngày sinh, giấy tờ hay dữ liệu nhận dạng.
            </p>
          ),
        },
        {
          title: "Đơn hàng và hỗ trợ",
          body: (
            <p>
              Thông tin đơn hàng chỉ hiển thị cho người sở hữu đơn hoặc quản trị
              viên được phân quyền. Quy trình xem, chỉnh sửa hoặc xóa dữ liệu sẽ
              được công bố cùng kênh hỗ trợ chính thức trước khi mở bán.
            </p>
          ),
        },
      ]}
    />
  )
}
