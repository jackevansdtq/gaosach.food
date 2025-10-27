# 🚀 Commands để chạy trên VPS

## 📁 Trên VPS server:

```bash
# 1. Pull code mới (có fix env vars)
cd /path/to/gaosach
git pull

# 2. Rebuild
docker-compose down
docker-compose up -d --build

# 3. Check logs
docker-compose logs -f

# 4. Kiểm tra
curl http://localhost:80
```

---

## ✅ Files đã được sửa:

1. **src/lib/supabase.ts**
   - Thêm fallback values
   - Không bị lỗi nếu env vars không có

2. **Dockerfile**
   - Accept ARG và ENV
   - Pass vào build time

3. **docker-compose.yml**
   - Load env từ .env file
   - Pass vào Dockerfile

---

## 🔄 Upload code lên VPS:

### Option 1: Git pull
```bash
# Trên VPS
cd /path/to/repo
git pull
docker-compose down
docker-compose up -d --build
```

### Option 2: SCP upload
```bash
# Từ local Mac
scp -r /Users/macbook/Downloads/project/* user@vps:/path/to/project/
```

---

**Sau khi rebuild trên VPS, website sẽ chạy được!**
