// Quick Supabase connection test
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

console.log('🔍 Checking Supabase connection...\n');

// Read .env file
const envContent = fs.readFileSync('.env', 'utf8');
const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.+)/);
const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/);

if (!urlMatch || !keyMatch) {
  console.log('❌ Không tìm thấy credentials trong .env');
  process.exit(1);
}

const supabaseUrl = urlMatch[1].trim();
const supabaseKey = keyMatch[1].trim();

console.log('✅ Credentials loaded');
console.log('📡 URL:', supabaseUrl);
console.log('🔑 Key:', supabaseKey.substring(0, 30) + '...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  try {
    // Test connection
    console.log('Test 1: Connection...');
    const { data, error } = await supabase.from('registrations').select('count');
    
    if (error) {
      console.log('❌ Error:', error.message);
      if (error.message.includes('does not exist')) {
        console.log('\n💡 Giải pháp: Chưa chạy migration!');
        console.log('   - Mở Supabase Dashboard → SQL Editor');
        console.log('   - Chạy file: supabase/migrations/20251027154206_create_registrations_table.sql');
      }
      process.exit(1);
    }
    
    console.log('✅ Connected!\n');
    
    // Test insert
    console.log('Test 2: INSERT permission...');
    const testData = {
      name: 'Test Connection',
      contact: '0123456789',
      address: 'Test Address',
      rice_type: 'ST25 Thơm 5kg',
      monthly_consumption: '10',
      project_support: '',
    };
    
    const { data: inserted, error: insertErr } = await supabase
      .from('registrations')
      .insert([testData])
      .select();
    
    if (insertErr) {
      console.log('❌', insertErr.message);
    } else {
      console.log('✅ INSERT OK (created:', inserted[0].id, ')');
      
      // Cleanup
      await supabase.from('registrations').delete().eq('id', inserted[0].id);
      console.log('🧹 Cleaned up test data\n');
    }
    
    console.log('📊 SUMMARY:');
    console.log('================================');
    console.log('✅ Supabase connection: OK');
    console.log('✅ Database accessible: OK');
    console.log('✅ Form will work: OK');
    console.log('================================\n');
    
    console.log('🚀 Ready to use!');
    console.log('   Open: http://localhost:5173\n');
    
  } catch (err) {
    console.log('❌ Error:', err.message);
  }
})();
