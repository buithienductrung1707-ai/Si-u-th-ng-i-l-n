# SePay readiness

Lặng Store dùng SePay làm phương án chuyển khoản QR chi phí thấp. Provider chỉ được đăng ký khi `SEPAY_ENABLED=true`; COD/manual payment vẫn có thể giữ song song.

## Biến môi trường

Đặt trong secret manager hoặc file local không commit:

```text
SEPAY_ENABLED=true
SEPAY_WEBHOOK_SECRET=<HMAC secret từ SePay>
SEPAY_BANK_ACCOUNT=<số tài khoản nhận tiền>
SEPAY_BANK_NAME=<tên ngân hàng>
SEPAY_ACCOUNT_NAME=<tên chủ tài khoản>
SEPAY_QR_URL_TEMPLATE=<URL QR có {amount} và {reference}>
```

Provider tạo mã tham chiếu từ `session_id`, trả thông tin tài khoản/QR cho storefront và giữ payment session ở trạng thái `pending_authorization` cho tới khi webhook hợp lệ.

## Webhook production

- URL: `https://<api-domain>/hooks/payment/sepay_sepay`.
- Chọn HMAC-SHA256 trong SePay; gửi `X-SePay-Signature` và `X-SePay-Timestamp`.
- Backend kiểm tra chữ ký constant-time, timestamp trong ±5 phút, giao dịch tiền vào, mã thanh toán và số tiền.
- Bật retry/monitoring của SePay; lưu `id` giao dịch làm khóa chống trùng ở lớp xử lý đơn hàng.
- Không dùng webhook không xác thực hoặc HTTP production.

## Smoke test local/staging

Sau khi backend chạy với SePay bật, tạo session thanh toán thử rồi chạy:

```bash
SEPAY_WEBHOOK_SECRET=<secret không commit> \
SEPAY_SESSION_ID=<payment-session-id> \
pnpm test:sepay-webhook
```

Script chỉ gửi payload TestBank giả lập, in status HTTP và không in secret. Không chạy script này với tài khoản ngân hàng live nếu chưa được phê duyệt.

Chỉ bật live sau khi SePay và ngân hàng xác nhận chấp nhận danh mục sản phẩm, thông tin pháp lý, hoàn tiền và đối soát. Test mode không dùng tiền thật.
