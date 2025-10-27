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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white text-sm font-bold mb-6 shadow-lg">
            ✨ Câu chuyện của chúng tôi
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Câu chuyện ST25
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
            Hành trình từ đồng ruộng đến bàn ăn gia đình bạn
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group hover:shadow-green-500/50 transition-shadow duration-500">
              <img
                src="https://images.pexels.com/photos/2382795/pexels-photo-2382795.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Rice field"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-900/40 to-transparent"></div>
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
              <div className="group text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-100 hover:border-green-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-green-900">Chứng nhận</div>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-blue-900">Xuất Khẩu</div>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-amber-900">Hữu Cơ</div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 rounded-3xl p-12 sm:p-16 transition-all duration-1000 delay-500 shadow-2xl ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-7xl font-black text-white mb-3 bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">2019</div>
              <div className="text-green-100 font-bold text-lg mb-2">Năm đạt giải</div>
              <div className="text-sm text-green-50 leading-relaxed">
                Giải nhất gạo ngon nhất thế giới
              </div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-7xl font-black text-white mb-3 bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">50+</div>
              <div className="text-green-100 font-bold text-lg mb-2">Quốc gia</div>
              <div className="text-sm text-green-50 leading-relaxed">
                Xuất khẩu đến nhiều thị trường
              </div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-7xl font-black text-white mb-3 bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">100%</div>
              <div className="text-green-100 font-bold text-lg mb-2">Hữu cơ</div>
              <div className="text-sm text-green-50 leading-relaxed">
                Không hóa chất, an toàn tuyệt đối
              </div>
            </div>
          </div>
        </div>

        {/* Farm to Table Section */}
        <div className={`mt-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full text-white text-sm font-bold mb-6 shadow-lg">
              🌾 Hành trình của chúng tôi
            </div>
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-900 to-green-700 bg-clip-text text-transparent">
                Từ Ruộng Đến Bàn Ăn
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hành trình từ hạt giống đến bữa cơm gia đình, mang đến hương vị thuần khiết nhất
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1: Từ Ruộng */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-green-500/30 transition-all duration-500 border-2 border-green-100 hover:border-green-300">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={anhLua1}
                  alt="Rice field"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Sprout className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full">
                  <span className="text-2xl font-black text-green-600">01</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black text-green-900 mb-4">Từ Ruộng</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Giống lúa ST25 được trồng trên vùng đất canh tác thuận theo tự nhiên, kết hợp vừa trồng lúa vừa nuôi tôm
                </p>
              </div>
            </div>

            {/* Step 2: Xay Theo Yêu Cầu */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-amber-500/30 transition-all duration-500 border-2 border-amber-100 hover:border-amber-300">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={anhLua2}
                  alt="Rice milling"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Gauge className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full">
                  <span className="text-2xl font-black text-amber-600">02</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black text-amber-900 mb-4">Xay Theo Yêu Cầu</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Lúa được xay tươi theo đơn đặt hàng, giữ nguyên dinh dưỡng và hương vị tự nhiên nhất
                </p>
              </div>
            </div>

            {/* Step 3: Đến Bàn Ăn */}
            <div className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-red-500/30 transition-all duration-500 border-2 border-red-100 hover:border-red-300">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={anhLua3}
                  alt="Family dining"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Utensils className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-lg px-4 py-2 rounded-full">
                  <span className="text-2xl font-black text-red-600">03</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-black text-red-900 mb-4">Đến Bàn Ăn</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
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
