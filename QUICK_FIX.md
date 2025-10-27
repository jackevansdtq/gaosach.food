# 🚨 Quick Fix - Màn hình trắng

## ✅ Server đang chạy tại:
```
http://localhost:5173
```

---

## 🔥 Giải pháp nhanh:

### 1. Hard Refresh Browser:
```
Mac: Cmd + Shift + R
Windows: Ctrl + Shift + R
```

### 2. Clear Cache hoàn toàn:
- Mở DevTools (F12)
- Right-click vào Reload button
- Chọn "Empty Cache and Hard Reload"

### 3. Hoặc dùng Incognito mode:
- Mở tab ẩn danh
- Truy cập: http://localhost:5173

---

## 🎯 Kiểm tra có lỗi:

1. Mở http://localhost:5173
2. Nhấn F12
3. Tab Console
4. Copy toàn bộ error màu ĐỎ và gửi lại

---

## 💡 Nếu vẫn trắng:

Check thử trang admin trực tiếp:
```
http://localhost:5173/admin
```

Nếu trang admin hiển thị → Homepage có vấn đề
Nếu cả 2 trắng → Có lỗi JavaScript trong code

---

## 🔧 Restart server thủ công:

```bash
# Kill server
lsof -ti:5173 | xargs kill -9

# Chạy lại
npm run dev
```

