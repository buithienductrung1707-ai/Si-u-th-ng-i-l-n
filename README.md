# Lặng Store

Storefront thương mại điện tử tiếng Việt cho sản phẩm chăm sóc sức khỏe tình dục người lớn. Dự án được xây dựng độc lập với thương hiệu, nội dung và hình ảnh riêng; không sao chép mã nguồn, nội dung hoặc tài sản từ website tham chiếu.

> Trạng thái: môi trường phát triển/demo. Chưa được phép nhận thanh toán thật hoặc public deploy.

## Kiến trúc

- Storefront: Next.js 15, ứng dụng tại `apps/storefront`
- Commerce backend: Medusa 2, ứng dụng tại `apps/backend`
- Dịch vụ cục bộ: PostgreSQL 16 và Redis 7 qua Docker Compose
- Package manager bắt buộc: pnpm 10.11.1

## Nguồn chuẩn và quy ước Git

Repository GitHub này là nguồn chuẩn của dự án. Mọi thay đổi chia sẻ phải được kiểm tra, commit và đẩy lên nhánh `main` của repository này.

Nếu môi trường cục bộ có thêm thư mục `store/`, hãy xem đó là bản làm việc tương thích cho preview cục bộ, không phải một nguồn Git thứ hai để chia nhánh hay tạo commit độc lập. Không commit tệp môi trường, build cache hoặc thông tin khóa truy cập.

Tệp sinh ra bởi công cụ như `.next/`, `dist/`, `.medusa/` và `*.tsbuildinfo` đã bị loại khỏi Git. Kho mã quy định LF cho mã nguồn để tránh drift CRLF/LF giữa máy phát triển và CI.

## Chạy cục bộ

### Điều kiện cần

- Node.js theo dải phiên bản trong `package.json` (Node 20.19+ hoặc 22.12+)
- pnpm 10.11.1
- Docker Desktop đang chạy

### 1. Cài dependencies và hạ tầng cục bộ

```bash
pnpm install
docker compose -f docker-compose.dev.yml up -d
```

### 2. Tạo cấu hình local

Sao chép hai tệp mẫu `.env.template` thành `apps/backend/.env` và `apps/storefront/.env.local`. Tạo các secret backend khác nhau, ngẫu nhiên, chỉ dùng ở local; tuyệt đối không commit chúng.

Sau khi backend chạy, tạo hoặc lấy publishable API key trong Medusa Admin rồi đặt vào `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` của storefront. Cấu hình storefront local phải dùng:

```dotenv
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_DEFAULT_REGION=vn
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

### 3. Chuẩn bị database và dữ liệu demo

Với database local mới, chạy migration rồi seed một lần:

```bash
cd apps/backend
pnpm exec medusa db:migrate
pnpm exec medusa exec ./src/migration-scripts/initial-data-seed.ts
```

Seed hiện dành cho database development mới. Không chạy lại trên database đã có dữ liệu cho đến khi quy trình seed idempotent được hoàn thiện.

### 4. Chạy hai ứng dụng

Mở hai terminal riêng:

```bash
pnpm --dir apps/backend dev
```

```bash
pnpm --dir apps/storefront dev
```

- Storefront: `http://localhost:8000/vn`
- Medusa Admin: `http://localhost:9000/app`

## Kiểm tra trước khi thay đổi

```bash
pnpm --dir apps/storefront exec tsc --noEmit
pnpm --dir apps/storefront build
pnpm --dir apps/backend lint
```

Không chạy production build của storefront đồng thời với Next development server dùng chung thư mục `.next`.

## Thanh toán và vận hành

VNPAY Gateway là hướng tích hợp được chọn nhưng đang tắt: chỉ kích hoạt sau khi có hợp đồng merchant, domain HTTPS, credentials sandbox/production và quy trình kiểm thử webhook riêng. Chi tiết tại [docs/VNPAY_READINESS.md](docs/VNPAY_READINESS.md).

Checklist vận hành, deploy và các giới hạn trước mở bán nằm tại [docs/OPERATIONS.md](docs/OPERATIONS.md) và [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Không public deploy khi chưa hoàn thành các yêu cầu pháp lý, thanh toán, giao nhận, monitoring và backup.

## Tài liệu kỹ thuật

- [Quy ước phát triển](docs/DEVELOPMENT.md)
- [Bảo mật dependency và CI](docs/SECURITY.md)
- [Mốc tiếp tục phiên sau](docs/RESUME_NEXT_SESSION.md)
- [Vận hành cục bộ](docs/OPERATIONS.md)
- [Triển khai](docs/DEPLOYMENT.md)
- [Chuẩn bị VNPAY](docs/VNPAY_READINESS.md)
