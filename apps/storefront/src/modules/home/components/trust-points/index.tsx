const trustPoints = [
  {
    index: "01",
    title: "Kín đáo khi đến tay bạn",
    description:
      "Hộp hàng trung tính, không dùng tên sản phẩm nhạy cảm bên ngoài.",
  },
  {
    index: "02",
    title: "Mua sắm theo cách của bạn",
    description:
      "Thanh toán linh hoạt, guest checkout và chỉ thu thập dữ liệu cần thiết.",
  },
  {
    index: "03",
    title: "Có người đồng hành",
    description:
      "Tư vấn nhẹ nhàng mỗi ngày, để bạn luôn thấy an tâm khi lựa chọn.",
  },
]

export default function TrustPoints() {
  return (
    <section className="relative overflow-hidden bg-[#16070d] pb-16 small:pb-24">
      <div className="content-container">
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 small:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="group bg-[#210a14] p-7 transition-colors hover:bg-[#32101f] small:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl text-[#efcb82]">
                  {point.index}
                </span>
                <span className="h-px w-12 bg-[#efcb82]/50 transition-all group-hover:w-20" />
              </div>
              <h2 className="mt-10 text-lg font-semibold tracking-tight text-white">
                {point.title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#f0dce1]/70">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
