# 🔄 Cách khác để push code

## Option 1: GitHub Desktop App

1. Download: https://desktop.github.com/
2. Mở app → Add existing repository
3. Chọn folder: `/Users/macbook/Downloads/project`
4. Click "Publish repository"
5. Done! ✅

## Option 2: Browser Upload

1. Truy cập: https://github.com/jackevansdtq/gaosach.food
2. Click "uploading an existing file"
3. Drag & drop folder project
4. Commit & push

## Option 3: Cài GitHub CLI

```bash
brew install gh
gh auth login
git push -u origin main
```

## Option 4: Fix Token Permissions

Token cần có quyền `repo`:
- Vào: https://github.com/settings/tokens
- Revoke token cũ
- Tạo mới với scope: `repo` (full control)
