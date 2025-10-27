#!/bin/bash
echo "🔧 Cập nhật Supabase credentials vào file .env"
echo ""
read -p "Nhập VITE_SUPABASE_URL: " supabase_url
read -p "Nhập VITE_SUPABASE_ANON_KEY: " supabase_key

cat > .env << FILE
# Supabase Configuration
VITE_SUPABASE_URL=$supabase_url
VITE_SUPABASE_ANON_KEY=$supabase_key
FILE

echo ""
echo "✅ Đã cập nhật file .env thành công!"
echo ""
echo "📝 Nội dung file .env:"
cat .env
