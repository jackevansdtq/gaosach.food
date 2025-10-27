# 🔧 Chạy Migration để Enable Edit/Delete

## ✨ Tính năng đã thêm:

1. **Edit đơn hàng** ✅
   - Inline editing
   - Save/Cancel buttons

2. **Delete đơn hàng** ✅
   - Confirmation modal
   - Không thể hoàn tác

3. **Search/Filter** ✅
   - Tìm theo tên, SĐT, địa chỉ, loại gạo

---

## 📋 Bước 1: Chạy Migration trong Supabase

### Cách 1: Qua SQL Editor (Khuyến nghị)

1. Truy cập: https://supabase.com/dashboard
2. Chọn project của bạn
3. Click **SQL Editor** (sidebar trái)
4. Click **"New query"**
5. Copy toàn bộ nội dung file: `supabase/migrations/20250228000000_update_admin_policies.sql`
6. Paste vào SQL Editor
7. Click **Run** (hoặc Cmd/Ctrl + Enter)
8. Kiểm tra message "Success"

### Cách 2: Qua Supabase CLI

```bash
# Install Supabase CLI (nếu chưa có)
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

---

## 🎯 Bước 2: Test tính năng

### 1. Test Edit:
1. Vào: http://localhost:5173/admin
2. Đăng nhập với password: `gaost25@2024`
3. Chuyển sang tab **"Đơn hàng"**
4. Click nút **Edit** (icon bút chì) ở đơn hàng bất kỳ
5. Chỉnh sửa thông tin
6. Click **Save** (icon check)
7. Verify: Data đã update trong Supabase

### 2. Test Delete:
1. Click nút **Delete** (icon thùng rác)
2. Xác nhận trong modal
3. Verify: Đơn hàng đã bị xóa

### 3. Test Search:
1. Nhập từ khóa vào ô search
2. Verify: Table filter theo keyword
3. Test với tên, SĐT, địa chỉ khác nhau

---

## 🐛 Troubleshooting

### Error: "new row violates row-level security policy"

**Nguyên nhân**: RLS policy chưa được update

**Giải pháp**:
1. Check đã chạy migration chưa
2. Vào Supabase → Database → Policies
3. Verify có 4 policies:
   - ✅ Anyone can insert registrations (INSERT)
   - ✅ Authenticated users can read (SELECT) 
   - ✅ Allow update registrations (UPDATE) ← Cần có
   - ✅ Allow delete registrations (DELETE) ← Cần có

### Edit không save được

**Check**:
- Browser Console (F12) có error không?
- Network tab: Request UPDATE có fail không?

**Debug**:
```javascript
// Mở Browser Console và chạy:
const testUpdate = async () => {
  const { createClient } = await import('@supabase/supabase-js');
  // Test your credentials
};
```

### Delete không hoạt động

**Check**:
- RLS policy đã có DELETE permission chưa?
- Console có error "permission denied"?

---

## 🔒 Security Note

Hiện tại using `anon` role cho UPDATE/DELETE (protected by app password).

**Production recommendation**:
- Tạo bảng `admins` trong Supabase
- Dùng Supabase Auth
- Check role trong policy: `auth.role() = 'admin'`

---

## ✅ Checklist sau khi chạy migration

- [ ] Migration chạy thành công trong Supabase
- [ ] 4 policies hiển thị trong Database → Policies
- [ ] Test Edit: Có thể update data
- [ ] Test Delete: Có thể xóa data
- [ ] Test Search: Filter hoạt động
- [ ] Data sync real-time với Supabase

---

## 📝 Next Steps (Optional)

### Nâng cấp:
- [ ] Filter theo ngày
- [ ] Pagination cho table lớn
- [ ] Bulk delete
- [ ] Export filtered results
- [ ] Email notifications

---

**Cần help?**
Check file: `DEBUG_WHITE_SCREEN.md`

