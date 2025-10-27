import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, TrendingUp, Calendar, DollarSign, Download, LogOut, Edit, Trash2, X, Save } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Quản lý đơn hàng Gạo ST25</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-4 border-b-2 border-green-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'orders'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            Đơn hàng ({registrations.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <button
                onClick={() => setDetailView({ type: 'total', filter: () => true })}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Tổng đơn hàng</p>
                    <p className="text-3xl font-bold text-green-700 mt-2">{stats.total}</p>
                  </div>
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7 text-green-600" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'month', filter: (r) => new Date(r.created_at).getMonth() === new Date().getMonth() })}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Tháng này</p>
                    <p className="text-3xl font-bold text-emerald-700 mt-2">{stats.thisMonth}</p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'consumption', filter: () => true })}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Tổng tiêu thụ</p>
                    <p className="text-3xl font-bold text-blue-700 mt-2">{stats.totalConsumption} kg</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDetailView({ type: 'support', filter: (r) => Boolean(r.project_support && r.project_support.trim() !== '') })}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Có đóng góp</p>
                    <p className="text-3xl font-bold text-amber-700 mt-2">{stats.totalSupport}</p>
                  </div>
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-amber-600" />
                  </div>
                </div>
              </button>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Rice Type Distribution */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Phân loại sản phẩm</h3>
                <div className="space-y-4">
                  {[
                    { db: 'ST25 Thơm 5kg', label: 'Gạo nguyên cám 100%' },
                    { db: 'ST25 Cao Cấp 10kg', label: 'Gạo giữ cám 50%' },
                    { db: 'ST25 Đặc Biệt 2kg', label: 'Gạo trắng tinh 0%' },
                    { db: 'ST25 Gia Đình 20kg', label: 'Gạo đặc biệt (đang triển khai)' },
                  ].map(({ db, label }) => {
                    const count = getRiceTypeCount(db);
                    const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                    return (
                      <div key={db} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{label}</span>
                          <span className="font-semibold text-green-600">
                            {count} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hoạt động gần đây</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {registrations.slice(0, 10).map((reg) => (
                    <div key={reg.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{reg.name}</p>
                        <p className="text-xs text-gray-600">{new Date(reg.created_at).toLocaleString('vi-VN')}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full truncate max-w-[120px]">
                        {reg.rice_type === 'ST25 Thơm 5kg' ? 'Nguyên cám' :
                         reg.rice_type === 'ST25 Cao Cấp 10kg' ? 'Giữ cám' :
                         reg.rice_type === 'ST25 Đặc Biệt 2kg' ? 'Trắng tinh' :
                         reg.rice_type === 'ST25 Gia Đình 20kg' ? 'Đặc biệt' :
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
            {/* Orders List */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Danh sách đơn hàng</h2>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5 mr-2" />
                Export CSV
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, SĐT, địa chỉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Họ tên</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SĐT</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Địa chỉ</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Sản phẩm</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tiêu thụ</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Đóng góp</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRegistrations.map((reg, index) => (
                      <tr key={reg.id} className="hover:bg-green-50 transition-colors">
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
                              <option value="ST25 Gia Đình 20kg">Gạo đặc biệt (đang triển khai)</option>
                            </select>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              {reg.rice_type === 'ST25 Thơm 5kg' ? 'Gạo nguyên cám 100%' :
                               reg.rice_type === 'ST25 Cao Cấp 10kg' ? 'Gạo giữ cám 50%' :
                               reg.rice_type === 'ST25 Đặc Biệt 2kg' ? 'Gạo trắng tinh 0%' :
                               reg.rice_type === 'ST25 Gia Đình 20kg' ? 'Gạo đặc biệt (đang triển khai)' :
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
                                className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditData({});
                                }}
                                className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(reg)}
                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(reg.id)}
                                className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
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
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <p className="text-xl text-gray-600">Không tìm thấy kết quả cho "{searchTerm}"</p>
              </div>
            )}

            {registrations.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Chưa có đơn hàng nào</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail View Modal */}
      {detailView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
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
              <div className="space-y-3">
                {registrations.filter(detailView.filter).map((reg) => (
                  <div key={reg.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-100 hover:shadow-md transition-shadow">
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
                           reg.rice_type === 'ST25 Gia Đình 20kg' ? 'Gạo đặc biệt (đang triển khai)' :
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Xác nhận xóa</h3>
            <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa đơn hàng này? Hành động này không thể hoàn tác.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
