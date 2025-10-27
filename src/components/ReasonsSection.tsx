import { forwardRef } from 'react';
import { Heart, Shield, Truck, Users, Leaf, Award } from 'lucide-react';

interface ReasonsSectionProps {
  isVisible?: boolean;
}

const reasons = [
  {
    icon: Heart,
    title: 'An Toàn Sức Khỏe',
    description: 'Không chất bảo quản, không hóa chất độc hại, an toàn tuyệt đối cho sức khỏe gia đình bạn.',
  },
  {
    icon: Shield,
    title: 'Chất Lượng Đảm Bảo',
    description: 'Được kiểm định nghiêm ngặt, đạt tiêu chuẩn quốc tế, cam kết hoàn tiền nếu không đúng chất lượng.',
  },
  {
    icon: Truck,
    title: 'Giao Hàng Nhanh',
    description: 'Giao hàng tận nhà trong 24h, đảm bảo gạo luôn tươi mới khi đến tay người tiêu dùng.',
  },
  {
    icon: Users,
    title: 'Hỗ Trợ Nông Dân',
    description: 'Mỗi đơn hàng đều đóng góp trực tiếp cho nông dân địa phương, xây dựng cộng đồng bền vững.',
  },
  {
    icon: Leaf,
    title: 'Thân Thiện Môi Trường',
    description: 'Quy trình canh tác hữu cơ, bao bì tái chế, góp phần bảo vệ môi trường cho thế hệ tương lai.',
  },
  {
    icon: Award,
    title: 'Giải Thưởng Uy Tín',
    description: 'Đạt giải nhất "Gạo ngon nhất thế giới" 2019, được công nhận bởi các chuyên gia quốc tế.',
  },
];

const ReasonsSection = forwardRef<HTMLElement, ReasonsSectionProps>(({ isVisible }, ref) => {
  return (
    <section
      id="reasons"
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
            Tại sao chọn ST25?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Chúng tôi cam kết mang đến giá trị tốt nhất cho sức khỏe và cuộc sống của bạn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className={`group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-900 mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 sm:p-12 text-white text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">Cam kết của chúng tôi</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
            Chúng tôi cam kết 100% hoàn tiền nếu bạn không hài lòng với chất lượng sản phẩm.
            Sự tin tưởng của bạn là động lực để chúng tôi không ngừng hoàn thiện.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="font-bold text-2xl">98%</div>
              <div className="text-sm">Khách hàng hài lòng</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="font-bold text-2xl">5000+</div>
              <div className="text-sm">Đơn hàng mỗi tháng</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <div className="font-bold text-2xl">24/7</div>
              <div className="text-sm">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ReasonsSection.displayName = 'ReasonsSection';

export default ReasonsSection;
