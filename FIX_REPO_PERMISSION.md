# 🔧 Fix Repo Permission

## ❌ Vấn đề:
Token có thể truy cập repo của bạn nhưng **KHÔNG có quyền push** vào `gaosach.food`.

**Error 403:** Permission denied

---

## ✅ Giải pháp:

### Cách 1: Cấp quyền cho Token (RECOMMENDED)

Token hiện tại thiếu quyền `repo`:

1. Vào: https://github.com/settings/tokens
2. Tìm hoặc tạo token MỚI
3. **QUAN TRỌNG**: Check box **`repo`** (Full control of private repositories)
4. Save
5. Update remote URL:

```bash
cd /Users/macbook/Downloads/project
export NEW_TOKEN=your_new_token_with_repo_scope
git remote set-url origin https://${NEW_TOKEN}@github.com/jackevansdtq/gaosach.food.git
git push -u origin main
```

---

### Cách 2: Fork và Push sang Repo Khác

Nếu repo `gaosach.food` có vấn đề quyền:

```bash
# Create new repo với tên khác
# Truy cập: https://github.com/new
# Tên: gao-st25-website
# Public
# Create repository

# Update remote
git remote set-url origin https://github.com/jackevansdtq/gao-st25-website.git
git push -u origin main
```

---

### Cách 3: Tạo Repo Mới Hoàn Toàn

1. Truy cập: https://github.com/new
2. Repository name: `gao-st25` hoặc `gaosach-food`
3. Public
4. **KHÔNG** initialize với README
5. Create repository
6. Copy URL và chạy:

```bash
git remote set-url origin https://github.com/jackevansdtq/NEW_REPO_NAME.git
git push -u origin main
```

---

### Cách 4: GitHub Desktop (EASIEST)

1. Download: https://desktop.github.com/
2. Open → Add Existing Repository
3. Publish → Chọn repo mới
4. Done!

---

## 🔍 Kiểm tra Repo hiện tại:

Repo: https://github.com/jackevansdtq/gaosach.food

- Có thể empty hoặc private?
- Có vấn đề quyền với owner?
- Token không có scope phù hợp?

---

## ✅ Recommendation:

**Option A:** Dùng GitHub Desktop (đơn giản nhất)

**Option B:** Tạo repo mới tại: https://github.com/new
- Name: `gao-st25-website`
- Public
- Push code vào đó

Cần tôi tạo repo mới thay vì dùng `gaosach.food` không?


