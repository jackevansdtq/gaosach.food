import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Info } from 'lucide-react';
import logoImage from '../assets/images/logogaosach.png';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-yellow-50 to-yellow-100 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left Column: Gạo ST25 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/90 flex items-center justify-center shadow-lg">
                <img src={logoImage} alt="Gạo Sạch Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Gạo ST25</h3>
                <p className="text-rice-field-green text-sm font-medium">Farm2Table</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Từ ruộng đến bàn ăn - Mang đến hương vị thuần khiết của đồng ruộng
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-rice-field rounded-full flex items-center justify-center hover:bg-rice-field-green transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-rice-field rounded-full flex items-center justify-center hover:bg-rice-field-green transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-rice-field rounded-full flex items-center justify-center hover:bg-rice-field-green transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Middle Column: Thông Tin Liên Hệ */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-rice-field-green" />
                <div>
                  <span className="font-medium">Địa chỉ:</span>
                  <br />
                  <span>Thứ 5, An Biên, An Giang</span>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-rice-field-green" />
                <div>
                  <span className="font-medium">Hotline:</span>
                  <br />
                  <span>0924 167 167</span>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-rice-field-green" />
                <div>
                  <span className="font-medium">Email:</span>
                  <br />
                  <span>info@farm2table.vn</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Ghi Chú */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Ghi Chú</h4>
            
            {/* Trial Period Notice */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-orange-500" />
                <div>
                  <p className="font-bold text-orange-600 mb-2">Giai đoạn thử nghiệm</p>
                  <p className="text-orange-600 text-sm leading-relaxed">
                    Chúng tôi đang trong giai đoạn thử nghiệm sản phẩm. Cảm ơn sự quan tâm và ủng hộ của quý khách hàng.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <p className="font-medium text-gray-700 mb-3">Phương thức thanh toán:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <span className="text-gray-700 text-sm">Visa</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PP</span>
                  </div>
                  <span className="text-gray-700 text-sm">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center text-gray-600">
          <p>&copy; 2025 Gạo ST25. Tất cả quyền được bảo lưu.</p>
          <p className="mt-2 text-sm">Được phát triển với tình yêu từ Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
