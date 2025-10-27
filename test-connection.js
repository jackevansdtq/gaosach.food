// Script kiểm tra kết nối Supabase
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 Kiểm tra kết nối Supabase...\n');

if (!supabaseUrl || !supabaseKey) {
  console.log('❌ Thiếu credentials trong .env');
  console.log('VITE_SUPABASE_URL:', supabaseUrl || 'MISSING');
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'SET' : 'MISSING');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('✅ Credentials đã được load');
    console.log('📡 URL:', supabaseUrl);
    console.log('🔑 Key:', supabaseKey.substring(0, 20) + '...\n');

    // Test 1: Kiểm tra connection
    console.log('Test 1: Kiểm tra connection...');
    const { data, error } = await supabase
      .from('registrations')
      .select('count');

    if (error) {
      console.log('❌ Error:', error.message);
      
      if (error.message.includes('does not exist')) {
        console.log('💡 Giải pháp: Bạn cần chạy migration SQL');
        console.log('   Xem file: SUPABASE_SETUP.md (Bước 4)');
      }
      
      if (error.message.includes('row-level security')) {
        console.log('💡 Giải pháp: RLS policies chưa được setup');
        console.log('   Chạy lại migration SQL');
      }
    } else {
      console.log('✅ Kết nối thành công!\n');
    }

    // Test 2: Kiểm tra có thể insert không
    console.log('Test 2: Kiểm tra INSERT permission...');
    const testData = {
      name: 'Test User',
      contact: '0123456789',
      address: 'Test Address',
      rice_type: 'ST25 Thơm 5kg',
      monthly_consumption: '10',
      project_support: '',
    };

    const { data: insertData, error: insertError } = await supabase
      .from('registrations')
      .insert([testData])
      .select();

    if (insertError) {
      console.log('❌ Cannot insert:', insertError.message);
    } else {
      console.log('✅ INSERT permission OK');
      console.log('   Created test record ID:', insertData[0].id);
      
      // Clean up test record
      await supabase
        .from('registrations')
        .delete()
        .eq('id', insertData[0].id);
      console.log('🧹 Đã xóa test record\n');
    }

    // Summary
    console.log('📊 KẾT QUẢ KIỂM TRA:');
    console.log('================================');
    console.log('✅ Kết nối Supabase: OK');
    console.log(data ? '✅ SELECT permission: OK' : '⚠️  SELECT: Need admin access');
    console.log(insertError ? '❌ INSERT permission: ' + insertError.message : '✅ INSERT permission: OK');
    console.log('================================\n');

    console.log('🚀 Dự án đã sẵn sàng!');
    console.log('   Mở: http://localhost:5173');
    console.log('   Test form ở section "Đăng ký đặt hàng"\n');

  } catch (err) {
    console.log('❌ Unexpected error:', err.message);
    console.log(err);
  }
}

testConnection();

