# Triển khai Lặng Store

## Môi trường phát triển

1. Cài Docker Desktop, Node 22+ và pnpm.
2. Chạy `docker compose -f docker-compose.dev.yml up -d` để khởi động PostgreSQL và Redis cục bộ.
3. Tạo `apps/backend/.env` từ mẫu, với `DATABASE_URL=postgres://medusa:medusa_local_development_only@localhost:5432/medusa` và `REDIS_URL=redis://localhost:6379`.
4. Đặt `JWT_SECRET` và `COOKIE_SECRET` bằng giá trị ngẫu nhiên riêng, sau đó chạy migration/seed của Medusa.
5. Lấy publishable API key từ Medusa Admin, rồi đặt URL backend, API key và `NEXT_PUBLIC_DEFAULT_REGION=vn` trong `apps/storefront/.env.local`.

## Production

- Dùng PostgreSQL và Redis được quản lý; tuyệt đối không dùng mật khẩu trong `docker-compose.dev.yml` cho production.
- Bảo mật biến môi trường qua secret manager của nhà cung cấp hosting; không commit `.env`.
- Chỉ cho phép HTTPS domain chính thức ở `STORE_CORS`, `ADMIN_CORS` và `AUTH_CORS`.
- Chạy migration trước deploy ứng dụng; backup PostgreSQL và kiểm thử phục hồi trước khi mở bán.
- Chỉ bật thanh toán, vận chuyển và webhook sau khi đã hoàn tất hồ sơ merchant/courier và kiểm thử sandbox.

## Xác nhận trước mở bán

1. Kiểm tra một đơn thử từ giỏ hàng đến xác nhận đơn.
2. Xác minh nhãn giao hàng và email/SMS không làm lộ danh mục nhạy cảm.
3. Rà soát quyền riêng tư, điều khoản, đổi trả và luồng yêu cầu xóa dữ liệu.
4. Bật giám sát lỗi, backup, cảnh báo và quy trình xử lý hoàn tiền/hủy đơn.
