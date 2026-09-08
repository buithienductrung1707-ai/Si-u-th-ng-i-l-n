# Bảo mật dependency và CI

## Cổng kiểm tra

Mọi push và pull request vào `main` chạy quality check với install từ lockfile, audit dependency production ở ngưỡng `moderate`, lint/type-check backend và build storefront. Job có quyền chỉ đọc, timeout và hủy các lần chạy cũ cùng ref.

Workflow audit hàng tuần cũng chỉ có quyền đọc. Nó thay thế updater Medusa cũ vì updater đó có quyền ghi repository và phụ thuộc vào secret Anthropic; không chạy tự động cập nhật framework hay tạo pull request có đặc quyền.

Dependabot của GitHub tạo tối đa ba pull request cập nhật dependency mỗi ecosystem. Mọi pull request vẫn cần qua quality check và review trước khi merge.

## Chính sách xử lý lỗ hổng

- Lỗ hổng production mức high/critical phải được sửa hoặc có ngoại lệ được ghi nhận trước khi merge.
- Lỗ hổng mức moderate được rà soát trong đợt cập nhật framework/dependency gần nhất; không ép override major nếu có nguy cơ phá tương thích runtime.
- Không chạy lifecycle script khi cài dependency trong CI.
- Không đưa secret vào workflow, log CI hoặc repository.

## Phạm vi hiện tại

Các override có phạm vi parent cho `ajv`, `uuid`, `qs`, cùng `postcss`, `sharp` và `lodash`, vá các advisory đã biết mà không nâng major của Next.js hoặc Medusa. Các dependency Medusa được giữ theo cùng phiên bản `2.19.0` và sẽ được nâng theo một pull request riêng có kiểm thử tích hợp.

## Smoke HTTP và checkout local

Sau khi backend, PostgreSQL, Redis và storefront local đang chạy, cung cấp publishable key qua biến môi trường tạm thời rồi chạy:

```bash
MEDUSA_PUBLISHABLE_KEY=pk_local pnpm test:http-smoke
```

Script kiểm tra storefront `/vn`, region Việt Nam/VND, catalog, payment provider hệ thống, tạo cart thử nghiệm và shipping options. Script không hoàn tất đơn, không gọi VNPAY và không ghi key vào log. Payment provider local chỉ dùng để kiểm tra luồng checkout; credentials thật vẫn bị vô hiệu hóa.

## Kiểm tra runtime production

`pnpm test:runtime-config` kiểm tra CORS explicit HTTPS, độ dài secret tối thiểu và đảm bảo VNPAY chưa được bật. Script chỉ báo tên biến lỗi, không in giá trị secret. Ở staging/production, chạy với `RUNTIME_CONFIG_ENV=production` sau khi secret manager đã inject biến môi trường.
