# 🔍 Debug - Màn hình trắng

## Nguyên nhân có thể:

### 1. Browser Cache
**Giải pháp:**
- Hard refresh: `Cmd + Shift + R` (Mac) hoặc `Ctrl + Shift + R` (Windows)
- Hoặc clear cache trong DevTools

### 2. JavaScript Error
**Check:**
- Mở DevTools (F12)
- Tab Console
- Xem có error màu đỏ không

### 3. CORS Error với Supabase
**Check:**
- Tab Network trong DevTools
- Xem request tới Supabase có fail không
- Check URL: Có đúng `https://` không?

### 4. Missing Environment Variables
**Check file `.env`:**
```bash
cat .env
```

Phải có:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 5. Router không load
**Test:**
- Mở: http://localhost:5173/
- Nếu vẫn trắng → có thể do CSS hoặc JS error

---

## 🔧 Các bước debug

### Bước 1: Check DevTools Console
```javascript
// Mở http://localhost:5173
// Nhấn F12
// Xem Console tab
```

Nếu có error:
- **ReferenceError: ... is not defined** → thiếu import
- **Cannot read property** → null/undefined
- **CORS error** → Supabase config sai

### Bước 2: Check Network Tab
- Tab Network (DevTools)
- Reload page
- Xem request nào fail (màu đỏ)

### Bước 3: Test đơn giản
Tạm thời simplify App.tsx:

```typescript
// src/App.tsx - test version
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div><h1>Test OK</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
```

Nếu vẫn trắng → vấn đề là Vite config hoặc build

### Bước 4: Clear cache và restart
```bash
# Kill server
lsof -ti:5173 | xargs kill -9

# Clear node_modules cache (optional)
rm -rf node_modules/.vite

# Restart
npm run dev
```

---

## ✅ Checklist

- [ ] File `.env` có credentials?
- [ ] Server đang chạy? (port 5173)
- [ ] Browser Console có error?
- [ ] Network tab có request fail?
- [ ] Hard refresh (Cmd+Shift+R)?
- [ ] Supabase migration đã chạy?

---

## 🎯 Test nhanh

### URL 1: Trang chủ
```
http://localhost:5173/
```

**Expected:**
- Hero section với "Gạo ST25"
- Background xanh lá
- Các sections hiển thị

### URL 2: Admin
```
http://localhost:5173/admin
```

**Expected:**
- Form đăng nhập
- Background gradient xanh lá
- Input password

---

## 🚨 Nếu vẫn trắng

### Option 1: Check browser console
Mở terminal và chạy:
```bash
curl -s http://localhost:5173 | grep -i "root"
```

Nếu có `<div id="root"></div>` → React đang mount nhưng không render

### Option 2: Disable admin features tạm thời
Comment out admin imports để test homepage:

```typescript
// src/App.tsx
// import AdminLogin from './components/admin/AdminLogin';
// import AdminDashboard from './components/admin/AdminDashboard';

// Comment routes
// <Route path="/admin" element={<AdminPage />} />
```

Nếu homepage chạy → vấn đề là admin components

### Option 3: Check Supabase connection
```bash
# Test connection
node -e "
const {createClient} = require('@supabase/supabase-js');
const url = 'your_url';
const key = 'your_key';
const supabase = createClient(url, key);
console.log('Testing...');
supabase.from('registrations').select('count').then(r => console.log('OK:', r.data)).catch(e => console.log('ERROR:', e.message));
"
```

---

## 📝 Log template

Nếu gửi lỗi, cung cấp:

1. **Browser Console log:**
```
[Copy toàn bộ error message]
```

2. **Network tab:**
```
[Ghi lại request nào fail]
```

3. **Terminal output:**
```bash
npm run dev
# [Copy output]
```

4. **File .env** (ẩn key):
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=***hidden***
```

---

## 🎯 Quick Fix

### Nếu màn hình trắng 100% (không có gì):

**Possibility 1:** Router issue
```bash
# Check react-router-dom installed
npm list react-router-dom
```

**Possibility 2:** Build cache
```bash
rm -rf dist
rm -rf node_modules/.vite
npm run dev
```

**Possibility 3:** Supabase error blocking render
- Mở: http://localhost:5173/
- Open DevTools
- Check Console
- Nếu có error về Supabase → check .env

---

**Cần help thêm?**
Gửi screenshot của:
- Browser Console (F12 → Console tab)
- Network tab (màu đỏ)
- Terminal output khi chạy `npm run dev`

