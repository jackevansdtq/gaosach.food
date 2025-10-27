# 🎯 Hướng dẫn cuối cùng - Chạy Migration

## ✅ Copy và paste SQL này vào Supabase:

```sql
-- Step 1: Fix SELECT permission
DROP POLICY IF EXISTS "Authenticated users can read all registrations" ON registrations;

CREATE POLICY "Allow public to read registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);

-- Step 2: Allow UPDATE permission
DROP POLICY IF EXISTS "Allow update registrations" ON registrations;

CREATE POLICY "Allow update registrations"
  ON registrations
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Step 3: Allow DELETE permission
DROP POLICY IF EXISTS "Allow delete registrations" ON registrations;

CREATE POLICY "Allow delete registrations"
  ON registrations
  FOR DELETE
  TO anon
  USING (true);
```

---

## 🚀 Cách chạy:

1. **Mở Supabase Dashboard**: https://supabase.com/dashboard
2. **Chọn project** của bạn
3. **Click SQL Editor** (sidebar trái)
4. **Click "New query"**
5. **Paste toàn bộ SQL** ở trên
6. **Click "Run"** (hoặc Cmd/Ctrl + Enter)
7. **Đợi message "Success"**

---

## ✅ Sau khi chạy xong:

1. **Refresh admin panel**: http://localhost:5173/admin
2. **Login**: `gaost25@2024`
3. **Tab "Đơn hàng"**
4. **Xem list đơn hàng** ✅

---

## 🎉 Features đã hoàn thành:

- ✅ View đơn hàng (SELECT)
- ✅ Edit đơn hàng (UPDATE)
- ✅ Delete đơn hàng (DELETE)
- ✅ Search/Filter
- ✅ Export CSV
- ✅ Dashboard statistics

---

## 📊 Verify policies:

Sau khi chạy SQL, check trong Supabase:

**Dashboard → Authentication → Policies → registrations**

Phải có **4 policies**:
1. ✅ "Anyone can insert registrations" (INSERT)
2. ✅ "Allow public to read registrations" (SELECT)
3. ✅ "Allow update registrations" (UPDATE)
4. ✅ "Allow delete registrations" (DELETE)

---

**Lưu ý**: SQL đã có `DROP POLICY IF EXISTS` nên không bị lỗi duplicate!

