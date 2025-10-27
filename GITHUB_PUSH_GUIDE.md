# 🚀 Đẩy code lên GitHub

## ✅ Đã chuẩn bị:
- Git repository đã được init
- Commit đã được tạo (64 files)
- Remote origin đã được add

## 🔐 Cần authenticate với GitHub

### Cách 1: Personal Access Token (Recommended)

1. **Tạo token:**
   - Vào: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Chọn scope: `repo` (full control)
   - Copy token

2. **Push code:**
```bash
cd /Users/macbook/Downloads/project

# Set remote với token
git remote set-url origin https://YOUR_TOKEN@github.com/jackevansdtq/gaosach.food.git

# Push
git push -u origin main
```

### Cách 2: SSH Key

```bash
# Check SSH key
ls -la ~/.ssh

# Nếu chưa có, tạo mới:
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add vào GitHub: https://github.com/settings/keys

# Push
git push -u origin main
```

### Cách 3: GitHub CLI

```bash
# Install gh CLI nếu chưa có
brew install gh

# Login
gh auth login

# Push
git push -u origin main
```

---

## 📋 Quick Commands:

```bash
# Status
git status

# Check remote
git remote -v

# Force push (nếu cần)
git push -u origin main --force

# Xem commit log
git log --oneline
```

---

## 🛡️ Security Check:

File `.env` đã được ignore bởi `.gitignore`:
```
.env
.env.local
```

Chỉ có `.env.example` được commit - **An toàn** ✅

---

## 📁 Files đã được commit:

- ✅ Source code (src/)
- ✅ Components
- ✅ Images (anhlua1, anhlua2, anhlua3, st25)
- ✅ Docker files
- ✅ Nginx config
- ✅ Documentation
- ❌ .env (đã ignore) ✅
- ✅ .env.example

---

## 🎯 Sau khi push:

Repo sẽ có tại:
**https://github.com/jackevansdtq/gaosach.food**

---

Chọn 1 trong 3 cách trên để authenticate và push!


