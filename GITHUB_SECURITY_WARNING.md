# ⚠️ SECURITY WARNING - Token đã bị lộ

## 🚨 Quan trọng:

**Token GitHub của bạn đã bị lộ trong chat này!**

**Hành động ngay lập tức:**

### Bước 1: Revoke Token (URGENT!)

1. Truy cập: https://github.com/settings/tokens
2. Tìm token bắt đầu với: `github_pat_***`
3. Click **Revoke** (Hủy)
4. Tạo token mới nếu cần

### Bước 2: Tạo Token Mới

1. Vào: https://github.com/settings/tokens/new
2. Chọn "Generate new token (classic)"
3. Đặt tên: "gaosach.food project"
4. Chọn scope: `repo` (đầy đủ quyền)
5. Click "Generate token"
6. **Copy và lưu an toàn**

---

## 🔒 Cách push an toàn hơn:

### Option 1: GitHub CLI (Khuyến nghị)

```bash
# Install
brew install gh

# Login
gh auth login

# Push (không cần nhập token)
git push -u origin main
```

### Option 2: SSH Key

```bash
# Check SSH key
ls -la ~/.ssh

# Nếu chưa có, tạo mới
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add vào GitHub: https://github.com/settings/keys

# Push qua SSH
git remote set-url origin git@github.com:jackevansdtq/gaosach.food.git
git push -u origin main
```

### Option 3: New Token với limited scope

Tạo token mới như trên, **KHÔNG chia sẻ** trong chat!

---

## 🛡️ Best Practices:

1. **KHÔNG commit token vào code**
2. **KHÔNG chia sẻ token trong chat/email**
3. **Dùng SSH keys hoặc GitHub CLI**
4. **Rotate tokens thường xuyên**
5. **Set token expiration**

---

Token hiện tại đã bị lộ, cần revoke NGAY!

