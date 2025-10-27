# 📸 Hướng dẫn thêm hình ảnh

## 📁 Thư mục đã tạo:

```
public/images/           ✅ Khuyến nghị dùng
src/assets/images/       ✅ Alternative
```

## 🎯 Cách thêm hình:

### 1. Copy hình vào public/images/

```bash
# Example:
cp ~/Downloads/my-image.jpg public/images/
```

### 2. Cập nhật code trong StorySection.tsx:

Thay URL hiện tại:
```tsx
src="https://images.pexels.com/photos/..."
```

Thành:
```tsx
src="/images/my-image.jpg"
```

## 📝 Ví dụ code sau khi thay:

```tsx
<img
  src="/images/ruong-lua.jpg"  // ← Đặt file vào public/images/
  alt="Rice field"
  className="w-full h-full object-cover"
/>
```

## 🔄 Các vị trí cần thay trong StorySection.tsx:

**Dòng 125:** Hình "Từ Ruộng"
```tsx
src="/images/ruong-lua.jpg"
```

**Dòng 147:** Hình "Xay Theo Yêu Cầu"  
```tsx
src="/images/gạo-xay.jpg"
```

**Dòng 169:** Hình "Đến Bàn Ăn"
```tsx
src="/images/bua-com.jpg"
```

## ✅ Sau khi thay hình:

1. Đặt file vào `public/images/`
2. Sửa URL trong StorySection.tsx
3. Reload browser để xem
