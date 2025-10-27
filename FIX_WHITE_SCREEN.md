# 🚨 FIX: Màn hình trắng

## ✅ Server đang chạy tại:
```
http://localhost:5173
```

---

## 🎯 Các bước khắc phục

### 1. Đảm bảo đang truy cập đúng URL:
✅ **Trang chủ**: http://localhost:5173/
✅ **Admin**: http://localhost:5173/admin

Không thêm port khác (5174, 8080, etc.)

---

### 2. Hard refresh browser:

**Mac:**
```
Cmd + Shift + R
```

**Windows/Linux:**
```
Ctrl + Shift + R
```

---

### 3. Mở DevTools và check Console:

1. Mở: http://localhost:5173
2. Nhấn **F12**
3. Tab **Console**
4. Copy toàn bộ error màu ĐỎ
5. Gửi lại cho tôi

---

### 4. Nếu vẫn trắng, thử disable admin tạm thời:

**File**: `src/App.tsx`

Thay dòng 69-77 bằng:
```typescript
function App() {
  return (
    <HomePage />
  );
}
```

Chạy lại:
```bash
npm run dev
```

Nếu homepage hiển thị → Vấn đề là admin components
Nếu vẫn trắng → Vấn đề là homepage

---

### 5. Check .env có đúng không:

```bash
cat .env | grep VITE
```

Phải có 2 dòng:
- VITE_SUPABASE_URL=https://xxxxx.supabase.co
- VITE_SUPABASE_ANON_KEY=eyJ...

---

## 🎯 Quick fix nếu vẫn không chạy:

```bash
# 1. Kill all servers
lsof -ti:5173 | xargs kill -9
lsof -ti:5174 | xargs kill -9

# 2. Clear cache
rm -rf node_modules/.vite

# 3. Restart
npm run dev
```

---

## 📸 Gửi cho tôi:

Nếu vẫn trắng, gửi:
1. Screenshot browser Console (F12 → Console)
2. Screenshot Network tab (check màu đỏ)
3. Output của: `cat .env`

