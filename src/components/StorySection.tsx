import { forwardRef } from 'react';
import { Leaf, Award, Globe, Sprout, Gauge, Utensils } from 'lucide-react';
import anhLua1 from '../assets/images/anhlua1.png';
import anhLua2 from '../assets/images/anhlua2.png';
import anhLua3 from '../assets/images/anhlua3.png';

interface StorySectionProps {
  isVisible?: boolean;
}

const StorySection = forwardRef<HTMLElement, StorySectionProps>(({ isVisible }, ref) => {
  return (
    <section
      id="story"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Câu chuyện ST25
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/2382795/pexels-photo-2382795.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Rice field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-3xl font-bold text-green-900 mb-6">
              Từ Đồng Ruộng Đến Bàn Ăn
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Từ ruộng đồng phù sa màu mỡ, nơi chở che bởi bàn tay tận tụy của người nông dân. 
            Chúng tôi tự hào mang đến hạt Gạo ST25 – giống gạo đã được vinh danh "Gạo ngon nhất thế giới"
             năm 2019.
            </p>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              Chúng tôi cam kết mang đến cho bạn những hạt gạo nguyên chất, được chăm sóc tận tâm
              từ khâu gieo trồng đến thu hoạch, đảm bảo 100% hữu cơ và an toàn cho sức khỏe.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-green-900">Chứng nhận</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Globe className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-green-900">Xuất Khẩu</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-green-900">Hữu Cơ</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 sm:p-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-green-700 mb-2">2019</div>
              <div className="text-green-900 font-medium">Năm đạt giải</div>
              <div className="text-sm text-gray-600 mt-2">
                Giải nhất gạo ngon nhất thế giới
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-700 mb-2">50+</div>
              <div className="text-green-900 font-medium">Quốc gia</div>
              <div className="text-sm text-gray-600 mt-2">
                Xuất khẩu đến nhiều thị trường
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-700 mb-2">100%</div>
              <div className="text-green-900 font-medium">Hữu cơ</div>
              <div className="text-sm text-gray-600 mt-2">
                Không hóa chất, an toàn tuyệt đối
              </div>
            </div>
          </div>
        </div>

        {/* Farm to Table Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-blue-900">Câu Chuyện</span>{' '}
              <span className="text-green-700">Của Chúng Tôi</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Hành trình từ hạt giống đến bữa cơm gia đình, mang đến hương vị thuần khiết nhất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Từ Ruộng */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={anhLua1}
                  alt="Rice field"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sprout className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-900 mb-3">Từ Ruộng</h3>
                <p className="text-gray-700 leading-relaxed">
                  Giống lúa ST25 được trồng trên vùng đất canh tác thuận theo tự nhiên, kết hợp vừa trồng lúa vừa nuôi tôm
                </p>
              </div>
            </div>

            {/* Step 2: Xay Theo Yêu Cầu */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={anhLua2}
                  alt="Rice milling"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Gauge className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-900 mb-3">Xay Theo Yêu Cầu</h3>
                <p className="text-gray-700 leading-relaxed">
                  Lúa được xay tươi theo đơn đặt hàng, giữ nguyên dinh dưỡng và hương vị tự nhiên nhất
                </p>
              </div>
            </div>

            {/* Step 3: Đến Bàn Ăn */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={anhLua3}
                  alt="Family dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <Utensils className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-green-900 mb-3">Đến Bàn Ăn</h3>
                <p className="text-gray-700 leading-relaxed">
                  Mang đến bữa cơm gia đình những hạt gạo thơm ngon, bổ dưỡng và an toàn tuyệt đối
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

StorySection.displayName = 'StorySection';

export default StorySection;
