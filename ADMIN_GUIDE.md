# Hướng dẫn sử dụng Admin Panel

## 🎯 Tính năng Admin Panel

Trang admin cho phép bạn:
- ✅ Xem thống kê đơn hàng trực quan
- ✅ Quản lý danh sách đơn hàng đăng ký
- ✅ Export dữ liệu ra CSV
- ✅ Theo dõi hoạt động gần đây
- ✅ Phân tích sản phẩm phổ biến

---

## 🔐 Đăng nhập Admin

### URL truy cập:
```
http://localhost:5173/admin
```

### Thông tin đăng nhập:
- **Mật khẩu mặc định**: `gaost25@2024`

⚠️ **Lưu ý**: Nên đổi mật khẩu trong code khi deploy production!

### File cần chỉnh sửa:
```typescript
src/components/admin/AdminLogin.tsx
// Dòng 10:
const ADMIN_PASSWORD = 'gaost25@2024'; // <-- Đổi mật khẩu ở đây
```

---

## 📊 Dashboard - Tổng quan

### 1. Thẻ thống kê (Stats Cards)
- **Tổng đơn hàng**: Tổng số đơn đăng ký
- **Tháng này**: Số đơn trong tháng hiện tại
- **Tổng tiêu thụ**: Tổng kg gạo được tiêu thụ/tháng
- **Có đóng góp**: Số khách hàng đóng góp hỗ trợ nông dân

### 2. Biểu đồ phân loại sản phẩm
- Hiển thị số lượng và % của từng loại gạo
- Bar chart trực quan
- 4 loại: ST25 Thơm 5kg, Cao Cấp 10kg, Đặc Biệt 2kg, Gia Đình 20kg

### 3. Hoạt động gần đây
- Hiển thị 10 đơn hàng mới nhất
- Có tên khách hàng, ngày giờ, loại sản phẩm

---

## 📋 Quản lý đơn hàng

### Tab "Đơn hàng"
- Hiển thị danh sách chi tiết tất cả đơn hàng
- Thông tin hiển thị:
  - STT
  - Họ tên khách hàng
  - Số điện thoại
  - Địa chỉ giao hàng
  - Loại gạo
  - Tiêu thụ hàng tháng (kg)
  - Đóng góp dự án
  - Ngày đăng ký

### Export CSV
- Click nút "Export CSV" để xuất dữ liệu
- File CSV chứa tất cả đơn hàng
- Tên file: `gaost25_registrations_YYYY-MM-DD.csv`
- Encoding: UTF-8 (có BOM)

---

## 🎨 Giao diện

### Màu sắc chủ đạo:
- 🟢 Green: Total orders, Dashboard theme
- 🔵 Emerald: Monthly stats
- 🔵 Blue: Consumption stats
- 🟠 Amber: Support stats

### Responsive Design:
- ✅ Desktop: Grid layout, full table
- ✅ Tablet: 2 column layout
- ✅ Mobile: Stack layout

---

## 🔄 Flow hoạt động

### 1. Khách hàng đăng ký
```
Website → Form submit → Supabase DB → Admin Dashboard
```

### 2. Admin xem dữ liệu
```
Admin login → Dashboard → Real-time data from Supabase
```

### 3. Export dữ liệu
```
Admin → Click Export CSV → Download file
```

---

## 🛠️ Cấu trúc Code

```
src/
├── components/
│   ├── admin/
│   │   ├── AdminLogin.tsx      # Trang đăng nhập
│   │   └── AdminDashboard.tsx   # Dashboard chính
│   └── ...
├── App.tsx                      # Routing
└── lib/
    └── supabase.ts             # Supabase client
```

---

## 📝 API Queries

### Fetch Registrations:
```typescript
const { data, error } = await supabase
  .from('registrations')
  .select('*')
  .order('created_at', { ascending: false });
```

### Export CSV:
```typescript
const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
```

---

## 🔒 Bảo mật

### Authentication hiện tại:
- LocalStorage-based (simple)
- Mật khẩu hard-coded

### Nâng cấp cho Production:
```typescript
// Sử dụng Supabase Auth
import { supabase } from '../lib/supabase';

// Admin table trong Supabase
// Khi login, check role = 'admin'
// Store JWT token thay vì localStorage flag
```

### Recommendation:
1. Tạo bảng `admins` trong Supabase
2. Implement Supabase Auth
3. Check role-based access
4. Add JWT verification

---

## 🚀 Deploy

### Build production:
```bash
npm run build
```

### Deploy to Vercel/Netlify:
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

### Environment Variables:
```bash
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

---

## 🐛 Troubleshooting

### Không thấy dữ liệu?
1. Kiểm tra Supabase credentials trong `.env`
2. Kiểm tra migration đã chạy chưa
3. Mở Browser Console (F12) xem error

### Đăng nhập không được?
1. Xóa localStorage: DevTools → Application → Clear storage
2. Kiểm tra mật khẩu trong code

### Export CSV bị lỗi font?
- File đã có BOM (UTF-8)
- Excel sẽ đọc đúng tiếng Việt

---

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Check Browser Console (F12)
2. Check Supabase Dashboard
3. Kiểm tra network requests

---

## 📈 Roadmap tương lai

- [ ] Advanced filtering và search
- [ ] Thống kê theo thời gian (charts)
- [ ] Xóa/chỉnh sửa đơn hàng
- [ ] Email notifications
- [ ] Multi-user admin support
- [ ] Permissions management

