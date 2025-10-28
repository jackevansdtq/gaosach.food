import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, TrendingUp, DollarSign, Download, LogOut, Edit, Trash2, X, Save, Search, BarChart3, Package, CheckCircle2 } from 'lucide-react';

interface Registration {
  id: string;
  name: string;
  contact: string;
  address: string;
  rice_type: string;
  monthly_consumption: string;
  project_support: string;
  created_at: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders'>('dashboard');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Registration>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [detailView, setDetailView] = useState<{ type: string; filter: (reg: Registration) => boolean } | null>(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reg: Registration) => {
    setEditingId(reg.id);
    setEditData(reg);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from('registrations')
        .update(editData)
        .eq('id', editingId);

      if (error) throw error;

      await fetchRegistrations();
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error('Error updating registration:', error);
      alert('Lỗi khi cập nhật. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchRegistrations();
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Lỗi khi xóa. Vui lòng thử lại.');
    }
  };

  const stats = {
    total: registrations.length,
    thisMonth: registrations.filter(
      (r) => new Date(r.created_at).getMonth() === new Date().getMonth()
    ).length,
    totalConsumption: registrations.reduce((sum, r) => sum + parseInt(r.monthly_consumption || '0'), 0),
    totalSupport: registrations.filter((r) => r.project_support && r.project_support.trim() !== '').length,
  };

  const exportToCSV = () => {
    const headers = ['STT', 'Họ tên', 'SĐT', 'Địa chỉ', 'Loại gạo', 'Tiêu thụ/tháng', 'Đóng góp', 'Ngày đăng ký'];
    const rows = registrations.map((r, index) => [
      index + 1,
      r.name,
      r.contact,
      r.address,
      r.rice_type,
      r.monthly_consumption,
      r.project_support || '',
      new Date(r.created_at).toLocaleDateString('vi-VN'),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gaost25_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getRiceTypeCount = (type: string) => {
    return registrations.filter((r) => r.rice_type === type).length;
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      reg.name.toLowerCase().includes(search) ||
      reg.contact.toLowerCase().includes(search) ||
      reg.address.toLowerCase().includes(search) ||
      reg.rice_type.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-500/20"></div>
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Đang tải dữ liệu</h2>
          <p className="text-green-200">Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Modern Header */}
      <header className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-48 -right-48"></div>
          <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -bottom-48 -left-48"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-green-100 mt-1">Quản lý thông minh - Gạo ST25 Premium</p>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Modern Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-2 bg-white/60 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-white/20">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 px-6 py-4 font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                : 'text-gray-700 hover:bg-white/80 hover:scale-102'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-6 py-4 font-bold rounded-xl transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                : 'text-gray-700 hover:bg-white/80 hover:scale-102'
            }`}
          >
            📦 Đơn hàng ({registrations.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <>
            {/* Modern Stats Cards with Glass Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <button
                onClick={() => setDetailView({ type: 'total', filter: () => true })}
                className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-8 hover:shadow-green-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-green-100 text-sm font-medium mb-2">Tổng đơn hàng</p>
                <p className="text-5xl font-black text-white mb-2">{stats.total}</p>
                <div className="flex items-center gap-2 text-green-100">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Đang hoạt động</span>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'month', filter: (r) => new Date(r.created_at).getMonth() === new Date().getMonth() })}
                className="group bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-2xl p-8 hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-blue-100 text-sm font-medium mb-2">Tháng này</p>
                <p className="text-5xl font-black text-white mb-2">{stats.thisMonth}</p>
                <div className="flex items-center gap-2 text-blue-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">Tăng trưởng</span>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'consumption', filter: () => true })}
                className="group bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-8 hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-purple-100 text-sm font-medium mb-2">Tổng tiêu thụ</p>
                <p className="text-5xl font-black text-white mb-2">{stats.totalConsumption}</p>
                <div className="flex items-center gap-2 text-purple-100">
                  <Package className="w-4 h-4" />
                  <span className="text-sm font-semibold">Kilogram</span>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'support', filter: (r) => Boolean(r.project_support && r.project_support.trim() !== '') })}
                className="group bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-2xl p-8 hover:shadow-amber-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-amber-100 text-sm font-medium mb-2">Có đóng góp</p>
                <p className="text-5xl font-black text-white mb-2">{stats.totalSupport}</p>
                <div className="flex items-center gap-2 text-amber-100">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-semibold">Tài trợ</span>
                </div>
              </button>
            </div>

            {/* Charts Row with Glass Morphism */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Rice Type Distribution */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Phân loại sản phẩm</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { db: 'ST25 Thơm 5kg', label: 'Gạo nguyên cám 100%' },
                    { db: 'ST25 Cao Cấp 10kg', label: 'Gạo giữ cám 50%' },
                    { db: 'ST25 Đặc Biệt 2kg', label: 'Gạo trắng tinh 0%' },
                  ].map(({ db, label }) => {
                    const count = getRiceTypeCount(db);
                    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={db} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800 font-semibold text-sm">{label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-green-600">{count}</span>
                            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500 transition-all duration-700 shadow-lg"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Hoạt động gần đây</h3>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {registrations.slice(0, 10).map((reg, idx) => (
                    <div key={reg.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-black text-white">{idx + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{reg.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{new Date(reg.created_at).toLocaleString('vi-VN')}</p>
                      </div>
                      <span className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg truncate max-w-[130px]">
                        {reg.rice_type === 'ST25 Thơm 5kg' ? 'Nguyên cám' :
                         reg.rice_type === 'ST25 Cao Cấp 10kg' ? 'Giữ cám' :
                         reg.rice_type === 'ST25 Đặc Biệt 2kg' ? 'Trắng tinh' :
                         reg.rice_type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* Orders List Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                Danh sách đơn hàng
              </h2>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                <Download className="w-5 h-5" />
                Export CSV
              </button>
            </div>

            {/* Modern Search */}
            <div className="mb-6 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="🔍 Tìm kiếm theo tên, SĐT, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border-2 border-green-200 rounded-2xl focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all shadow-lg"
              />
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Họ tên</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">SĐT</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Địa chỉ</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Tiêu thụ</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Đóng góp</th>
                      <th className="px-6 py-5 text-left text-xs font-bold text-white uppercase tracking-wider">Ngày</th>
                      <th className="px-6 py-5 text-center text-xs font-bold text-white uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-green-100">
                    {filteredRegistrations.map((reg, index) => (
                      <tr key={reg.id} className="bg-white/50 hover:bg-green-50/70 transition-all duration-300 hover:shadow-md">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.name || ''}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded"
                            />
                          ) : (
                            reg.name
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.contact || ''}
                              onChange={(e) => setEditData({ ...editData, contact: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded"
                            />
                          ) : (
                            reg.contact
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.address || ''}
                              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded"
                            />
                          ) : (
                            reg.address
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === reg.id ? (
                            <select
                              value={editData.rice_type || ''}
                              onChange={(e) => setEditData({ ...editData, rice_type: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded text-sm"
                            >
                              <option value="ST25 Thơm 5kg">Gạo nguyên cám 100%</option>
                              <option value="ST25 Cao Cấp 10kg">Gạo giữ cám 50%</option>
                              <option value="ST25 Đặc Biệt 2kg">Gạo trắng tinh 0%</option>
                            </select>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {reg.rice_type === 'ST25 Thơm 5kg' ? 'Gạo nguyên cám 100%' :
                               reg.rice_type === 'ST25 Cao Cấp 10kg' ? 'Gạo giữ cám 50%' :
                               reg.rice_type === 'ST25 Đặc Biệt 2kg' ? 'Gạo trắng tinh 0%' :
                               reg.rice_type}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.monthly_consumption || ''}
                              onChange={(e) => setEditData({ ...editData, monthly_consumption: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded"
                            />
                          ) : (
                            `${reg.monthly_consumption} kg`
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {editingId === reg.id ? (
                            <input
                              type="text"
                              value={editData.project_support || ''}
                              onChange={(e) => setEditData({ ...editData, project_support: e.target.value })}
                              className="w-full px-2 py-1 border border-green-300 rounded"
                            />
                          ) : reg.project_support ? (
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                              {reg.project_support}
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(reg.created_at).toLocaleString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {editingId === reg.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={handleSaveEdit}
                                className="p-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg hover:scale-110 transition-all duration-300"
                                title="Lưu"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditData({});
                                }}
                                className="p-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 shadow-lg hover:scale-110 transition-all duration-300"
                                title="Hủy"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(reg)}
                                className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:scale-110 transition-all duration-300"
                                title="Chỉnh sửa"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(reg.id)}
                                className="p-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 shadow-lg hover:scale-110 transition-all duration-300"
                                title="Xóa"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredRegistrations.length === 0 && registrations.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-2xl p-16 text-center border-2 border-yellow-200">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">Không tìm thấy kết quả</h3>
                <p className="text-xl text-gray-600 mb-6">"{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {registrations.length === 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl shadow-2xl p-16 text-center border-2 border-blue-200">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-4">Chưa có đơn hàng nào</h3>
                <p className="text-xl text-gray-600">Hãy chờ khách hàng đặt hàng!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail View Modal with Glass Morphism */}
      {detailView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {detailView.type === 'total' && 'Chi tiết tất cả đơn hàng'}
                {detailView.type === 'month' && 'Đơn hàng tháng này'}
                {detailView.type === 'consumption' && 'Đơn hàng theo tiêu thụ'}
                {detailView.type === 'support' && 'Đơn hàng có đóng góp'}
              </h3>
              <button
                onClick={() => setDetailView(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4">
                {registrations.filter(detailView.filter).map((reg) => (
                  <div key={reg.id} className="bg-gradient-to-r from-green-50 via-emerald-50 to-cyan-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Họ tên</p>
                        <p className="font-semibold text-gray-900">{reg.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">SĐT</p>
                        <p className="font-semibold text-gray-900">{reg.contact}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                        <p className="font-semibold text-gray-900">{reg.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sản phẩm</p>
                        <p className="font-semibold text-green-700">
                          {reg.rice_type === 'ST25 Thơm 5kg' ? 'Gạo nguyên cám 100%' :
                           reg.rice_type === 'ST25 Cao Cấp 10kg' ? 'Gạo giữ cám 50%' :
                           reg.rice_type === 'ST25 Đặc Biệt 2kg' ? 'Gạo trắng tinh 0%' :
                           reg.rice_type}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Tiêu thụ</p>
                        <p className="font-semibold text-blue-700">{reg.monthly_consumption} kg/tháng</p>
                      </div>
                      {reg.project_support && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-1">Đóng góp</p>
                          <p className="font-semibold text-amber-700">{reg.project_support}</p>
                        </div>
                      )}
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Ngày đăng ký</p>
                        <p className="text-sm text-gray-700">{new Date(reg.created_at).toLocaleString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-6 border-t">
              <p className="text-gray-600">
                Tổng số: <span className="font-bold text-gray-900">{registrations.filter(detailView.filter).length}</span>
              </p>
              <button
                onClick={() => setDetailView(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border-2 border-red-200 animate-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <X className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-3">Xác nhận xóa</h3>
              <p className="text-lg text-gray-600">Bạn có chắc chắn muốn xóa đơn hàng này?</p>
              <p className="text-sm text-red-600 font-semibold mt-2">⚠️ Hành động này không thể hoàn tác!</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
