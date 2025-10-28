import { forwardRef, useState, FormEvent } from 'react';
import { User, Phone, MapPin, Package, DollarSign, Send, Star, Heart, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RegistrationFormProps {
  isVisible?: boolean;
}

const RegistrationForm = forwardRef<HTMLElement, RegistrationFormProps>(({ isVisible }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    riceType: 'ST25 Thơm 5kg',
    monthlyConsumption: '',
    projectSupport: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name,
            contact: formData.contact,
            address: formData.address,
            rice_type: formData.riceType,
            monthly_consumption: formData.monthlyConsumption,
            project_support: formData.projectSupport,
          },
        ]);

      if (error) throw error;

      setSubmitMessage({
        type: 'success',
        text: 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.',
      });

      setFormData({
        name: '',
        contact: '',
        address: '',
        riceType: 'ST25 Thơm 5kg',
        monthlyConsumption: '',
        projectSupport: '',
      });
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="form"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#eff9f1] via-white to-[#fdfdf8]"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Đăng ký đặt hàng
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">
            Điền thông tin để chúng tôi có thể phục vụ bạn tốt nhất
          </p>
        </div>

        <div
          className={`bg-white/95 border border-green-100 rounded-[32px] shadow-[0_24px_60px_rgba(34,197,94,0.12)] p-8 sm:p-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center text-slate-800 font-semibold mb-2">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Họ và Tên <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 shadow-[0_6px_18px_rgba(15,23,42,0.05)] focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div>
              <label htmlFor="contact" className="flex items-center text-slate-800 font-semibold mb-2">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Số Điện Thoại <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 shadow-[0_6px_18px_rgba(15,23,42,0.05)] focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                placeholder="example@email.com hoặc 0901234567"
              />
            </div>

            <div>
              <label htmlFor="address" className="flex items-center text-slate-800 font-semibold mb-2">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Địa Chỉ <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 placeholder:text-slate-400 shadow-[0_6px_18px_rgba(15,23,42,0.05)] focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                placeholder="Nhập địa chỉ giao hàng"
              />
            </div>

            <div>
              <label htmlFor="riceType" className="flex items-center text-slate-800 font-semibold mb-2">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Loại Gạo Muốn Đặt <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="riceType"
                name="riceType"
                value={formData.riceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.05)] focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 appearance-none"
              >
                <option value="ST25 Thơm 5kg">Gạo nguyên cám 100%</option>
                <option value="ST25 Cao Cấp 10kg">Gạo giữ cám 50%</option>
                <option value="ST25 Đặc Biệt 2kg">Gạo trắng tinh 30%</option>
              </select>
            </div>

            <div>
              <label htmlFor="monthlyConsumption" className="flex items-center text-slate-800 font-semibold mb-2">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Lượng Tiêu Thụ Hàng Tháng <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="monthlyConsumption"
                name="monthlyConsumption"
                value={formData.monthlyConsumption}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-[0_6px_18px_rgba(15,23,42,0.05)] focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300 appearance-none"
              >
                <option value="">Chọn lượng tiêu thụ</option>
                <option value="5-10kg (Gia đình nhỏ)">5-10kg (Gia đình nhỏ)</option>
                <option value="10-20kg (Gia đình trung bình)">10-20kg (Gia đình trung bình)</option>
                <option value="20-30kg (Gia đình đông người)">20-30kg (Gia đình đông người)</option>
                <option value="Trên 30kg (Nhu cầu lớn)">Trên 30kg (Nhu cầu lớn)</option>
              </select>
            </div>

            <div className="bg-gradient-to-br from-[#fff4e5] via-[#fff0da] to-[#ffe8c6] border border-[#ffd7a8] rounded-[28px] shadow-[0_18px_40px_rgba(249,115,22,0.18)] p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-inner shadow-[#ffd7a8]/60">
                  <Star className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-lg font-bold text-orange-700 flex items-center gap-2">
                    Hỗ Trợ Kinh Phí Cho Dự Án <span className="text-orange-500">*</span>
                  </p>
                  <p className="flex items-center text-sm text-orange-600 mt-1 gap-2">
                    <Heart className="w-4 h-4 text-orange-400" />
                    Chúng tôi rất trân trọng sự đồng hành để triển khai dự án.
                  </p>
                </div>
              </div>
              <div className="relative">
                <DollarSign className="w-5 h-5 text-orange-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="projectSupport"
                  name="projectSupport"
                  value={formData.projectSupport}
                  onChange={handleChange}
                  className="w-full pl-12 pr-6 py-3 rounded-2xl border-2 border-[#f7c28d] bg-white text-slate-800 shadow-[0_6px_18px_rgba(249,115,22,0.12)] focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 appearance-none"
                >
                  <option value="">Chọn mức hỗ trợ (không bắt buộc)</option>
                  <option value="5.000.000 VND">5.000.000 VND</option>
                  <option value="10.000.000 VND">10.000.000 VND</option>
                  <option value="20.000.000 VND">20.000.000 VND</option>
                </select>
              </div>
            </div>

            {submitMessage && (
              <div
                className={`p-4 rounded-lg ${
                  submitMessage.type === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {submitMessage.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#ff6a1f] to-[#f9471f] text-white rounded-[18px] font-bold text-lg tracking-wide transition-all duration-300 shadow-[0_18px_35px_rgba(249,71,31,0.3)] hover:shadow-[0_22px_40px_rgba(249,71,31,0.38)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Đang gửi...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gửi đăng ký
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-green-100 text-center space-y-2">
            <p className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Thông tin của bạn được bảo mật tuyệt đối.
            </p>
            <p className="text-sm text-slate-500">
              Cần hỗ trợ? <a href="tel:0908992212" className="text-green-600 font-semibold hover:text-green-700">Gọi ngay: 090 8992212</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

RegistrationForm.displayName = 'RegistrationForm';

export default RegistrationForm;
