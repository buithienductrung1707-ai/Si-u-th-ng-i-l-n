# Cấu hình domain TC Store

Domain storefront chính thức đã chọn: `tcstore.vn`.

## Biến môi trường production

```dotenv
NEXT_PUBLIC_BASE_URL=https://tcstore.vn
STORE_CORS=https://tcstore.vn
AUTH_CORS=https://tcstore.vn
```

`ADMIN_CORS` phải là domain quản trị riêng hoặc origin backend đã được xác nhận; không mở rộng thành `*`. Nếu backend dùng subdomain, đặt `NEXT_PUBLIC_MEDUSA_BACKEND_URL` và webhook SePay theo domain API thực tế, ví dụ `https://api.tcstore.vn`.

## DNS và HTTPS

- Trỏ bản ghi DNS của `tcstore.vn` tới nền tảng hosting storefront.
- Cấp chứng chỉ TLS hợp lệ và chuyển hướng HTTP sang HTTPS.
- Cấu hình domain API riêng trước khi đăng ký webhook: `https://<api-domain>/hooks/payment/sepay_sepay`.
- Chỉ sau khi DNS/TLS hoạt động mới đổi CORS production và chạy HTTP smoke test.

Local preview vẫn dùng `http://localhost:8000` và không bị thay đổi.
