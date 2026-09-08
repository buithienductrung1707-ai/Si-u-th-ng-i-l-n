# Checklist staging và rollback

## Trước khi mở staging

- [ ] Dùng PostgreSQL và Redis riêng, không dùng mật khẩu trong `docker-compose.dev.yml`.
- [ ] Chạy `pnpm test:runtime-config` với `RUNTIME_CONFIG_ENV=production` và secret manager của staging.
- [ ] CORS chỉ chứa domain HTTPS staging; không dùng `*`, localhost hoặc domain quản trị không cần thiết.
- [ ] Reverse proxy bật HTTPS, HSTS, giới hạn request cho `/store/*`, `/auth/*` và `/admin/*`.
- [ ] Chạy `pnpm test:http-smoke` với publishable key staging không chứa dữ liệu thật.
- [ ] Thanh toán chỉ dùng provider sandbox đã được đối tác chấp thuận; VNPAY vẫn tắt nếu chưa đủ hồ sơ merchant.

## Kiểm tra sau deploy

- [ ] Xác nhận catalog, cart, shipping và payment session sandbox hoạt động.
- [ ] Xác nhận log không chứa secret, token, số thẻ, OTP hoặc nội dung nhạy cảm.
- [ ] Tạo backup PostgreSQL và kiểm thử khôi phục trên bản sao trước khi nhận đơn.
- [ ] Kiểm tra cảnh báo lỗi, health check, thời gian phản hồi và trạng thái worker.

## Rollback

1. Dừng nhận traffic mới ở reverse proxy hoặc bật maintenance page.
2. Giữ nguyên database; không chạy migration ngược nếu chưa có bản backup đã kiểm thử.
3. Trỏ ứng dụng về image/commit trước đó và chạy health check + HTTP smoke test.
4. Xác minh cart/payment session không tạo đơn ngoài ý muốn.
5. Ghi nhận nguyên nhân, thời điểm, commit và quyết định mở lại traffic.
