# Vận hành Lặng Store

## Mô hình thanh toán và giao hàng

Môi trường mẫu chỉ dùng nhà cung cấp hệ thống của Medusa để kiểm tra kỹ thuật. Trước khi nhận đơn thật, thay thế bằng các adapter đã được đối tác phê duyệt cho thanh toán và vận chuyển. Không lưu thông tin thẻ, mã OTP hoặc ảnh giấy tờ trong Medusa.

Thiết lập cấu hình bí mật trên nền tảng triển khai, không ghi vào Git:

- `DATABASE_URL` — PostgreSQL riêng cho môi trường.
- `JWT_SECRET`, `COOKIE_SECRET` — chuỗi ngẫu nhiên, khác nhau giữa môi trường.
- `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS` — chỉ các domain HTTPS chính thức.
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`, `NEXT_PUBLIC_DEFAULT_REGION=vn` — storefront.

## Trước khi mở bán

1. Soát lại điều khoản, chính sách riêng tư, độ tuổi và chính sách đổi trả với tư vấn pháp lý tại Việt Nam.
2. Tạo sản phẩm thật trong Admin; điền thành phần, hướng dẫn an toàn, tồn kho, hình ảnh do bạn sở hữu quyền sử dụng và giá VND.
3. Ký hợp đồng với đối tác thanh toán/vận chuyển phù hợp danh mục hàng; kiểm thử sandbox, webhook có xác thực chữ ký và trạng thái hoàn tiền/hủy.
4. Kiểm tra giao diện ở 360 px, 768 px, 1440 px; thử bàn phím, trình đọc màn hình và đơn hàng thử.
5. Bật HTTPS, backup PostgreSQL, logging không chứa PII nhạy cảm, cảnh báo lỗi và quy trình xóa dữ liệu theo yêu cầu khách.

## Không triển khai khi

- Chưa có adapter thanh toán/giao hàng đã được phê duyệt.
- Chưa có chính sách/đầu mối hỗ trợ thật để hiển thị cho khách.
- Chưa chạy migration và seed trên một cơ sở dữ liệu thử nghiệm độc lập.
