# 🔧 Fix Deploy VPS - supabaseUrl is required

## ❌ Lỗi hiện tại:
```
Uncaught Error: supabaseUrl is required
```

**URL:** https://gao.monngonmienque.vn/

---

## 🔍 Nguyên nhân:

Docker build trên VPS **KHÔNG có** environment variables.
Code đã được build SẴN và upload lên VPS, không có env vars.

---

## ✅ GIẢI PHÁP 1: Build lại trên VPS với env vars

### Trên VPS server:

```bash
# 1. Pull code mới nhất
cd /path/to/project
git pull

# 2. Tạo file .env
cat > .env << EOF
VITE_SUPABASE_URL=https://jsomezfryjzpsagglngt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb21lemZyeWp6cHNhZ2dsbmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzkxMzIsImV4cCI6MjA3NzE1NTEzMn0.3jucBlVw1GefopS_bbPPmdarDc5SOg9T71rfdyhv6j8
EOF

# 3. Rebuild Docker với env vars
docker-compose down
docker-compose up -d --build
```

---

## ✅ GIẢI PHÁP 2: Hard-code env vars (Quick fix)

### Sửa file: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jsomezfryjzpsagglngt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb21lemZyeWp6cHNhZ2dsbmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzkxMzIsImV4cCI6MjA3NzE1NTEzMn0.3jucBlVw1GefopS_bbPPmdarDc5SOg9T71rfdyhv6j8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Sau đó rebuild:**
```bash
npm run build
docker-compose up -d --build
```

---

## ✅ GIẢI PHÁP 3: Sửa code để fallback

### Sửa: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jsomezfryjzpsagglngt.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb21lemZyeWp6cHNhZ2dsbmd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzkxMzIsImV4cCI6MjA3NzE1NTEzMn0.3jucBlVw1GefopS_bbPPmdarDc5SOg9T71rfdyhv6j8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🎯 Khuyến nghị: Solution 1

Trên VPS chạy:
```bash
# Upload .env file lên VPS
# Sau đó rebuild
docker-compose down
docker-compose up -d --build
```

---

**Chọn 1 trong 3 cách trên để fix!**

