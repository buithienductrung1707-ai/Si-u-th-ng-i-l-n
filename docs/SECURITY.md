# Bảo mật dependency và CI

## Cổng kiểm tra

Mọi push và pull request vào `main` chạy quality check với install từ lockfile, audit dependency production ở ngưỡng `high`, lint/type-check backend và build storefront. Job có quyền chỉ đọc, timeout và hủy các lần chạy cũ cùng ref.

Workflow audit hàng tuần cũng chỉ có quyền đọc. Nó thay thế updater Medusa cũ vì updater đó có quyền ghi repository và phụ thuộc vào secret Anthropic; không chạy tự động cập nhật framework hay tạo pull request có đặc quyền.

Dependabot của GitHub tạo tối đa ba pull request cập nhật dependency mỗi ecosystem. Mọi pull request vẫn cần qua quality check và review trước khi merge.

## Chính sách xử lý lỗ hổng

- Lỗ hổng production mức high/critical phải được sửa hoặc có ngoại lệ được ghi nhận trước khi merge.
- Lỗ hổng mức moderate được rà soát trong đợt cập nhật framework/dependency gần nhất; không ép override major nếu có nguy cơ phá tương thích runtime.
- Không chạy lifecycle script khi cài dependency trong CI.
- Không đưa secret vào workflow, log CI hoặc repository.

## Phạm vi hiện tại

Các override `postcss`, `sharp` và `lodash` vá các advisory đã biết mà không nâng major của Next.js hoặc Medusa. Các dependency Medusa được giữ theo cùng phiên bản `2.19.0` và sẽ được nâng theo một pull request riêng có kiểm thử tích hợp.
