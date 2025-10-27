import { forwardRef, useState, FormEvent } from 'react';
import { User, Phone, MapPin, Package, DollarSign, Send } from 'lucide-react';
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
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white"
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
          className={`bg-white rounded-2xl shadow-2xl p-8 sm:p-12 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center text-green-900 font-semibold mb-2">
                <User className="w-5 h-5 mr-2" />
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                placeholder="Nhập họ và tên của bạn"
              />
            </div>

            <div>
              <label htmlFor="contact" className="flex items-center text-green-900 font-semibold mb-2">
                <Phone className="w-5 h-5 mr-2" />
                Số điện thoại
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div>
              <label htmlFor="address" className="flex items-center text-green-900 font-semibold mb-2">
                <MapPin className="w-5 h-5 mr-2" />
                Địa chỉ giao hàng
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                placeholder="Nhập địa chỉ chi tiết"
              />
            </div>

            <div>
              <label htmlFor="riceType" className="flex items-center text-green-900 font-semibold mb-2">
                <Package className="w-5 h-5 mr-2" />
                Loại gạo
              </label>
              <select
                id="riceType"
                name="riceType"
                value={formData.riceType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
              >
                <option value="ST25 Thơm 5kg">Gạo nguyên cám 100%</option>
                <option value="ST25 Cao Cấp 10kg">Gạo giữ cám 50%</option>
                <option value="ST25 Đặc Biệt 2kg">Gạo trắng tinh 0%</option>
                <option value="ST25 Gia Đình 20kg">Gạo đặc biệt(đang triển khai)</option>
              </select>
            </div>

            <div>
              <label htmlFor="monthlyConsumption" className="flex items-center text-green-900 font-semibold mb-2">
                <Package className="w-5 h-5 mr-2" />
                Tiêu thụ hàng tháng (kg)
              </label>
              <input
                type="number"
                id="monthlyConsumption"
                name="monthlyConsumption"
                value={formData.monthlyConsumption}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                placeholder="Số kg gạo gia đình bạn sử dụng mỗi tháng"
              />
            </div>

            <div>
              <label htmlFor="projectSupport" className="flex items-center text-green-900 font-semibold mb-2">
                <DollarSign className="w-5 h-5 mr-2" />
                Đóng góp dự án (tùy chọn)
              </label>
              <input
                type="text"
                id="projectSupport"
                name="projectSupport"
                value={formData.projectSupport}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none transition-colors duration-300"
                placeholder="Số tiền bạn muốn đóng góp cho dự án"
              />
              <p className="text-sm text-gray-600 mt-2">
                Chúng tôi rất biết ơn sự đóng góp của bạn!
              </p>
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
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                'Đang gửi...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Gửi đăng ký
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-green-200 text-center">
            <p className="text-gray-700">
              Bạn cần hỗ trợ?{' '}
              <a href="tel:0908992212" className="text-green-600 font-semibold hover:text-green-700">
                Gọi ngay: 090 8992212
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

RegistrationForm.displayName = 'RegistrationForm';

export default RegistrationForm;
