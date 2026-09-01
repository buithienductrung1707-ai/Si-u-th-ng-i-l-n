# Mốc tiếp tục công việc

Ngày lưu: 2026-09-01

Dự án: Lặng Store

Repository chuẩn: `main` của `buithienductrung1707-ai/Si-u-th-ng-i-l-n`

## Đã hoàn tất

- Giai đoạn 0: chuẩn hóa repository, README, quy ước LF, private packages và loại build cache khỏi Git.
- Giai đoạn 1: Dependabot, dependency audit chỉ-đọc, quality gate CI và lockfile pnpm 10.11.1.
- Audit production: 0 high/critical; còn 2 moderate (`ajv`, `uuid`) để xử lý cùng đợt nâng Medusa có kiểm thử.
- Xác nhận backend lint không lỗi, type-check backend/storefront đạt và production build storefront đạt.

Mốc Git cuối: `1125350 ci: harden dependency checks`

## Việc tiếp theo — Giai đoạn 2

1. Làm seed dữ liệu Medusa idempotent: chạy lại không tạo vùng, sản phẩm, shipping option hoặc inventory trùng.
2. Thêm kiểm tra inventory và giá VND theo đơn vị major (tránh cảnh báo `@medusajs/prices-in-major-units`).
3. Viết smoke test API cho region, catalog, cart và shipping option trên PostgreSQL/Redis local.
4. Chỉ sau khi test ổn định mới xử lý hai advisory moderate còn lại trong một PR dependency riêng.

## Cách bắt đầu phiên sau

```bash
git clone https://github.com/buithienductrung1707-ai/Si-u-th-ng-i-l-n.git
cd Si-u-th-ng-i-l-n
pnpm install --frozen-lockfile --ignore-scripts
docker compose -f docker-compose.dev.yml up -d
```

Không commit `.env`, `.env.local`, build output, cache hoặc credentials. VNPAY vẫn tắt; chưa public deploy hay nhận thanh toán thật.
