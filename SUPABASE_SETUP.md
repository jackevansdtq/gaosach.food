# Hướng dẫn kết nối Supabase cho dự án Gạo ST25

## Bước 1: Tạo tài khoản và Project trên Supabase

1. Truy cập: https://supabase.com
2. Đăng ký/Đăng nhập tài khoản
3. Click **"New Project"**
4. Điền thông tin:
   - **Project Name**: `gao-st25` (hoặc tên bạn muốn)
   - **Database Password**: Tạo password mạnh (lưu ý lại để truy cập sau)
   - **Region**: Chọn `Singapore (nearest)` hoặc region gần Việt Nam nhất
   - **Pricing Plan**: Chọn Free tier

5. Click **"Create new project"**
6. Đợi 1-2 phút để Supabase setup hoàn tất

## Bước 2: Lấy Credentials (API Keys)

1. Vào project đã tạo
2. Vào **Settings** (icon bánh răng ở sidebar trái)
3. Click **API** (trong Settings menu)
4. Copy 2 thông tin quan trọng:
   - **Project URL** (ví dụ: `https://xxxxx.supabase.co`)
   - **anon public key** (chuỗi dài bắt đầu bằng `eyJ...`)

## Bước 3: Cấu hình dự án

1. Mở file `.env` trong thư mục root của dự án
2. Paste thông tin vào:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Quan trọng**: Thay thế với thông tin thực từ Supabase của bạn!

## Bước 4: Chạy Migration (Tạo bảng registrations)

### Cách 1: Sử dụng Supabase CLI (Khuyến nghị)

1. Cài đặt Supabase CLI:
```bash
npm install -g supabase
```

2. Đăng nhập Supabase:
```bash
supabase login
```

3. Link project với local:
```bash
supabase link --project-ref your-project-ref
```
(Lấy project-ref từ URL: `https://supabase.com/dashboard/project/your-project-ref`)

4. Chạy migration:
```bash
supabase db push
```

### Cách 2: Chạy trực tiếp trên Dashboard (Đơn giản hơn)

1. Vào project Supabase
2. Click **SQL Editor** ở sidebar trái
3. Click **"New query"**
4. Copy toàn bộ nội dung file `supabase/migrations/20251027154206_create_registrations_table.sql`
5. Paste vào SQL Editor
6. Click **"Run"** (hoặc Ctrl/Cmd + Enter)
7. Kiểm tra xem có message "Success. No rows returned" là thành công

## Bước 5: Kiểm tra kết nối

1. Mở terminal trong thư mục dự án
2. Chạy lệnh:
```bash
npm run dev
```

3. Mở trình duyệt: http://localhost:5173
4. Scroll xuống form đăng ký
5. Điền thử form và submit
6. Vào Supabase Dashboard → Table Editor → xem bảng `registrations`

Nếu thấy data được lưu thành công thì đã kết nối hoàn tất!

## Bước 6: Kiểm tra bảo mật (Row Level Security)

1. Vào **Authentication** → **Policies** trong Supabase
2. Tìm bảng `registrations`
3. Kiểm tra có 2 policies:
   - ✅ "Anyone can insert registrations" (FOR INSERT)
   - ✅ "Authenticated users can read all registrations" (FOR SELECT)

Nếu chưa có, chạy lại SQL migration.

## Troubleshooting

### Lỗi: "Invalid API key"
- Kiểm tra lại VITE_SUPABASE_ANON_KEY đã copy đúng chưa
- Restart dev server sau khi đổi .env

### Lỗi: "relation 'registrations' does not exist"
- Chưa chạy migration thành công
- Thử lại Bước 4 (chạy SQL migration)

### Lỗi: "new row violates row-level security policy"
- RLS policy chưa setup
- Chạy lại SQL migration

### Form submit lỗi
- Mở Browser DevTools (F12) → Console
- Xem error message chi tiết
- Kiểm tra network tab xem request có được gửi không

## Lưu ý quan trọng

⚠️ **KHÔNG commit file `.env` lên Git!**
- File `.env` đã có trong `.gitignore`
- Chỉ cần commit `.env.example`

✅ **Để nhận registration:**
- Vào Supabase Dashboard
- Table Editor → registrations
- Xem tất cả đăng ký của khách hàng

🔐 **Để bảo mật hơn:**
- Chỉ admin mới xem được registrations
- Nên tạo tài khoản admin để login vào Supabase

