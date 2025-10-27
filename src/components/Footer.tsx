import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Gạo ST25</h3>
            <p className="text-green-200 text-sm leading-relaxed">
              Hạt gạo tinh hoa từ đồng ruộng Việt Nam, mang đến sự an toàn và chất lượng cho mọi gia đình.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liên kết</h4>
            <ul className="space-y-2 text-green-200">
              <li>
                <a href="#hero" className="hover:text-white transition-colors duration-300">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors duration-300">
                  Câu chuyện
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors duration-300">
                  Sản phẩm
                </a>
              </li>
              <li>
                <a href="#reasons" className="hover:text-white transition-colors duration-300">
                  Tại sao chọn chúng tôi
                </a>
              </li>
              <li>
                <a href="#form" className="hover:text-white transition-colors duration-300">
                  Đăng ký
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-green-200">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>‭090 8992212‬</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>contact@gaost25.food</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Đồng Tháp, Việt Nam</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Theo dõi chúng tôi</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Nhận tin tức</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-3 py-2 rounded-l-lg text-green-900 focus:outline-none"
                />
                <button className="px-4 py-2 bg-green-600 rounded-r-lg hover:bg-green-700 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 text-center text-green-300">
          <p>&copy; 2025 Gạo ST25. Tất cả quyền được bảo lưu.</p>
          <p className="mt-2 text-sm">Được phát triển với tình yêu từ Việt Nam</p>
        </div>
      </div>
    </footer>
  );
}
