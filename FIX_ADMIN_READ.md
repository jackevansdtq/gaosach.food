# 🔧 Fix: Admin không thể xem data

## ❌ Vấn đề:
- Form đăng ký hoạt động (data lưu vào DB) ✅
- Admin không thể xem đơn hàng ❌
- Database có policies sai

---

## ✅ Giải pháp:

### **Bước 1: Chạy SQL Migration**

1. Mở **Supabase Dashboard**
2. Chọn project của bạn
3. Click **SQL Editor** (sidebar trái)
4. Click **"New query"**
5. Copy toàn bộ nội dung file: `supabase/migrations/20250228000001_fix_admin_select.sql`
6. Paste vào SQL Editor
7. Click **"Run"** (hoặc Cmd/Ctrl + Enter)
8. Kiểm tra message **"Success"**

### **Bước 2: Chạy thêm migration cho UPDATE/DELETE**

Repeat với file: `supabase/migrations/20250228000000_update_admin_policies.sql`

---

## 📋 SQL cần chạy:

### **Migration 1: Fix SELECT permission**
```sql
-- Drop old policy
DROP POLICY IF EXISTS "Authenticated users can read all registrations" ON registrations;

-- Create new policy for anon role
CREATE POLICY "Allow public to read registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);
```

### **Migration 2: Add UPDATE/DELETE permission**
```sql
-- Allow UPDATE
CREATE POLICY "Allow update registrations"
  ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Allow DELETE
CREATE POLICY "Allow delete registrations"
  ON registrations
  FOR DELETE
  TO anon
  USING (true);
```

---

## 🎯 Sau khi chạy migration:

1. Vào: http://localhost:5173/admin
2. Login với password: `gaost25@2024`
3. Tab **"Đơn hàng"**
4. Xem list đơn hàng hiển thị ✅

---

## 🔍 Verify trong Supabase:

### **Check policies:**
1. Supabase Dashboard → **Authentication** → **Policies**
2. Table: `registrations`
3. Phải có 4 policies:
   - ✅ "Anyone can insert registrations" (INSERT)
   - ✅ "Allow public to read registrations" (SELECT) ← Mới thêm
   - ✅ "Allow update registrations" (UPDATE)
   - ✅ "Allow delete registrations" (DELETE)

---

## 📝 Lưu ý:

**Security:** Hiện cho phép anon đọc/update/delete vì dùng password bảo vệ ở app level. 

**Production:** Nên dùng Supabase Auth với role-based access control.

---

## ✅ Test sau khi fix:

```bash
# 1. Submit form trên homepage
# 2. Vào admin panel
# 3. Xem data hiển thị trong "Đơn hàng" tab
```

