# Quy ước phát triển

## Nguồn chuẩn

Nhánh `main` của repository GitHub Lặng Store là nguồn chuẩn duy nhất cho thay đổi dùng chung. Làm việc trên một nhánh ngắn hạn, kiểm tra thay đổi, rồi tạo pull request hoặc commit rõ ràng vào `main`.

Không coi một bản clone cục bộ bổ sung là một nhánh sản phẩm độc lập. Trước khi bắt đầu, luôn kiểm tra remote, nhánh hiện tại và `git status` của checkout chuẩn.

## Tệp không được commit

- `.env`, `.env.local` và mọi secret hoặc API key
- output build: `.next/`, `dist/`, `.medusa/`, `build/`
- cache TypeScript: `*.tsbuildinfo`
- dữ liệu database, volume Docker và log runtime

Không chép secret vào issue, commit, tài liệu hay ảnh chụp màn hình.

## Thay đổi an toàn

1. Dùng pnpm 10.11.1 từ repository root.
2. Chạy kiểm tra phù hợp với phần đã sửa; tối thiểu type-check storefront và lint backend khi ảnh hưởng mã nguồn.
3. Không chạy Next production build khi development server đang dùng chung `.next`.
4. Không bật cổng thanh toán, webhook, provider giao nhận hoặc public deploy bằng dữ liệu giả. Những thao tác đó cần credentials và phê duyệt riêng.
5. Không tắt quy tắc ESLint của Medusa để làm xanh CI; sửa nguyên nhân hoặc ghi nhận giới hạn rõ ràng.

## Môi trường local

`docker-compose.dev.yml` chỉ dành cho máy phát triển. PostgreSQL và Redis cần healthy trước khi chạy backend. Cấu hình đầy đủ và trình tự seed có trong [README](../README.md).
