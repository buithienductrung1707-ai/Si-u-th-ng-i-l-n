const trustPoints = [
  {
    title: "Đóng gói kín đáo",
    description: "Không sử dụng tên sản phẩm nhạy cảm ở nhãn ngoài kiện hàng.",
  },
  {
    title: "Chỉ thu thập dữ liệu cần thiết",
    description:
      "Guest checkout, email là tùy chọn và thông tin đơn hàng được bảo vệ.",
  },
  {
    title: "Giao linh hoạt",
    description: "Nội thành nhanh hoặc giao tiêu chuẩn toàn quốc theo khu vực.",
  },
]

export default function TrustPoints() {
  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="content-container grid gap-4 py-8 small:grid-cols-3 small:py-10">
        {trustPoints.map((point) => (
          <article key={point.title} className="rounded-2xl bg-slate-50 p-5">
            <h2 className="font-semibold text-slate-950">{point.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {point.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
