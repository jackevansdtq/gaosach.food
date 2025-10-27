# 🐳 Hướng dẫn chạy dự án Gạo ST25 với Docker

## 📋 Yêu cầu:
- Docker
- Docker Compose

---

## 🚀 Cách chạy

### Bước 1: Chuẩn bị file .env

Tạo file `.env` trong thư mục root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Bước 2: Build và chạy container

```bash
# Build image
docker-compose build

# Chạy container
docker-compose up -d

# Xem logs
docker-compose logs -f
```

### Bước 3: Truy cập website

Mở browser: **http://localhost:3000**

---

## 🛠️ Các lệnh Docker thường dùng:

```bash
# Start container
docker-compose up -d

# Stop container
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Enter container
docker-compose exec gao-st25-web sh

# Remove everything
docker-compose down -v
```

---

## 📝 Files đã tạo:

```
Dockerfile          # Multi-stage build
docker-compose.yml  # Docker Compose config
nginx.conf          # Nginx configuration
.dockerignore       # Ignore files
```

---

## 🔄 Build và Deploy:

### Local development:
```bash
npm run dev
```

### Production with Docker:
```bash
docker-compose up -d --build
```

---

## 🌐 Deploy lên server:

### Push to Docker Hub (optional):

```bash
# Tag image
docker tag gao-st25-web your-dockerhub/gao-st25:latest

# Push
docker push your-dockerhub/gao-st25:latest
```

### Deploy on server:

```bash
# Pull image
docker pull your-dockerhub/gao-st25:latest

# Run
docker run -d \
  -p 3000:80 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  --name gao-st25 \
  your-dockerhub/gao-st25:latest
```

---

## 🐛 Troubleshooting:

### Container không start:
```bash
docker-compose logs
docker-compose up --force-recreate
```

### Port 3000 đã được dùng:
Sửa `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Thay 3000 bằng 8080
```

### Environment variables không load:
```bash
# Check .env file exists
cat .env

# Restart container
docker-compose restart
```

---

## ✅ Checklist trước khi deploy:

- [ ] File `.env` có đầy đủ credentials
- [ ] Đã test local: `docker-compose up`
- [ ] Website hiển thị OK tại http://localhost:3000
- [ ] Admin panel hoạt động: http://localhost:3000/admin
- [ ] Form đăng ký lưu được vào Supabase

---

**Cần help?** Check logs: `docker-compose logs -f`

