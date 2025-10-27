# ⚡ Fix và Push Code Lên GitHub

## ❌ Vấn đề hiện tại:
Token không có quyền truy cập repo.

---

## ✅ GIẢI PHÁP NHANH:

### Bước 1: Revoke Token Cũ (Token đã bị lộ!)

Vào: https://github.com/settings/tokens
- Tìm token `github_pat_***`
- Click **Revoke**

### Bước 2: Tạo Token Mới

1. Vào: https://github.com/settings/tokens/new
2. Name: `gaosach-food-repo`
3. **QUAN TRỌNG**: Check box **`repo`** (full control)
4. Click "Generate token"
5. Copy token mới (chỉ hiện 1 lần!)

### Bước 3: Push với Token Mới

```bash
cd /Users/macbook/Downloads/project

# Set remote với token mới
export NEW_TOKEN=your_new_token_here
git remote set-url origin https://${NEW_TOKEN}@github.com/jackevansdtq/gaosach.food.git

# Push
git push -u origin main
```

---

## 🎯 HOẶC: Dùng GitHub Desktop (Đơn giản nhất)

1. Download: https://desktop.github.com/
2. Install
3. Open app
4. File → Add Local Repository
5. Chọn: `/Users/macbook/Downloads/project`
6. Click "Publish repository"
7. Done! ✅

---

## 📝 Token đã bị lộ:

**IMMEDIATELY revoke:**
`github_pat_... (đã được ẩn để tránh lộ)`

**Revoke here:** https://github.com/settings/tokens
