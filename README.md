# Gạo ST25 - E-commerce Website

Một website bán gạo ST25 hiện đại với giao diện đẹp mắt, được xây dựng với React + TypeScript + Tailwind CSS.

## ✨ Tính năng

- 🎨 **Giao diện hiện đại** với glass morphism và gradient effects
- 🛒 **Đặt hàng trực tuyến** với form đăng ký
- 📊 **Admin Dashboard** với thống kê và quản lý đơn hàng
- 📱 **Responsive design** hoạt động trên mọi thiết bị
- 🗄️ **Supabase Database** cho quản lý dữ liệu
- 🐳 **Docker** hỗ trợ deployment dễ dàng

## 🚀 Cài đặt và Chạy

### Yêu cầu
- Node.js >= 18
- npm hoặc yarn
- Docker (nếu chạy với Docker)

### Local Development

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview production build
npm run preview
```

### Với Docker

```bash
# Build và chạy container
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng container
docker-compose down
```

## 📁 Cấu trúc Project

```
project/
├── src/
│   ├── components/        # React components
│   │   ├── admin/        # Admin dashboard components
│   ├── assets/           # Images và static files
│   ├── lib/              # Utilities (Supabase client)
│   └── App.tsx           # Main app component
├── supabase/
│   └── migrations/       # Database migrations
├── public/               # Public static files
├── dist/                 # Build output
└── docker-compose.yml    # Docker configuration
```

## 🔧 Cấu hình

### 1. Biến môi trường

Copy `.env.example` thành `.env` và điền các giá trị:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 2. Database Setup

Xem file `SUPABASE_SETUP.md` để biết cách setup database.

### 3. Migrations

Chạy migrations:

```bash
# Database migrations đã được tạo trong supabase/migrations/
# Xem file RUN_ALL_MIGRATIONS.sql để chạy tất cả migrations
```

## 🎨 Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database
- **Lucide React** - Icons
- **Docker** - Containerization

## 📦 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🔐 Admin Dashboard

- URL: `/admin`
- Password mặc định: `gaosach.vn`
- Tính năng:
  - Xem thống kê đơn hàng
  - Quản lý đơn hàng (thêm/sửa/xóa)
  - Export CSV
  - Tìm kiếm và lọc

## 🌐 Deployment

### Production Build

```bash
npm run build
```

Output sẽ ở trong folder `dist/`.

### VPS Deployment

1. Build production
2. Setup nginx với config trong `nginx.conf`
3. Sử dụng Docker để deploy dễ dàng

### Docker Deployment

```bash
docker-compose up -d
```

## 📝 Lưu ý

- Đảm bảo Supabase database đã được setup đúng
- Các migrations cần được chạy trước khi sử dụng
- Admin password nên được thay đổi trong môi trường production

## 📄 License

© 2025 Gạo ST25. Tất cả quyền được bảo lưu.

## 🙏 Tín ngưỡng

"Phát triển bền vững: Ngày bắt đầu - 27/10/2025"

