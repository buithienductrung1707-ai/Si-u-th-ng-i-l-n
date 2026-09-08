# Mốc tiếp tục công việc

Ngày lưu: 2026-09-01

Dự án: Lặng Store

Repository chuẩn: `main` của `buithienductrung1707-ai/Si-u-th-ng-i-l-n`

## Đã hoàn tất

- Giai đoạn 0: chuẩn hóa repository, README, quy ước LF, private packages và loại build cache khỏi Git.
- Giai đoạn 1: Dependabot, dependency audit chỉ-đọc, quality gate CI và lockfile pnpm 10.11.1.
- Giai đoạn 2: seed có guard idempotent theo catalog, helper giá VND và smoke test commerce.
- Audit production: không còn advisory ở mức moderate trở lên sau các override có phạm vi.
- Xác nhận backend lint không lỗi, type-check backend/storefront đạt và production build storefront đạt.
- Giai đoạn 3: đã thêm HTTP smoke test cho catalog, payment providers, cart và shipping options; chỉ chạy với khóa local do người vận hành cung cấp, không gọi VNPAY.

Mốc Git trước phiên này: `57c16c8 feat: make commerce seed idempotent`

## Đã hoàn tất — Giai đoạn 3

- HTTP smoke test đã sẵn sàng qua `pnpm test:http-smoke`.
- Audit production với ngưỡng moderate đạt 0 advisory; CI đã dùng cùng ngưỡng.
- Đã bật lại lint/type-check trong production build storefront và sửa các lỗi tồn đọng.
- Commerce module smoke test đạt với 1 region, 4 products và 2 shipping options.
- Giai đoạn 4: backend fail-closed CORS/secret ở production, runtime config check, security checklist staging và rollback đã được bổ sung.

## Việc tiếp theo — Giai đoạn 4

1. Chạy HTTP smoke test trong môi trường staging với publishable key không chứa dữ liệu thật.
2. Cấu hình rate limit ở reverse proxy và xác nhận security headers theo domain staging.
3. Hoàn thiện cấu hình payment sandbox và webhook signature trước khi cân nhắc VNPAY.
4. Chạy diễn tập backup/restore và rollback trước khi mở traffic.

## Cách bắt đầu phiên sau

```bash
git clone https://github.com/buithienductrung1707-ai/Si-u-th-ng-i-l-n.git
cd Si-u-th-ng-i-l-n
pnpm install --frozen-lockfile --ignore-scripts
docker compose -f docker-compose.dev.yml up -d
```

Không commit `.env`, `.env.local`, build output, cache hoặc credentials. VNPAY vẫn tắt; chưa public deploy hay nhận thanh toán thật.
