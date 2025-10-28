import { forwardRef } from 'react';
import { Leaf, Fish, Handshake, Sparkles } from 'lucide-react';

interface ReasonsSectionProps {
  isVisible?: boolean;
}

const reasons = [
  {
    icon: Leaf,
    title: '100% Hữu Cơ',
    description: 'Không sử dụng hóa chất, thuốc trừ sâu. An toàn tuyệt đối cho sức khỏe gia đình.',
    color: 'rice-field-green',
  },
  {
    icon: Fish,
    title: 'Mô Hình Lúa Tôm',
    description: 'Kết hợp nuôi tôm và trồng lúa, tạo hệ sinh thái tự nhiên, gạo thơm ngon hơn.',
    color: 'sunset-orange',
  },
  {
    icon: Handshake,
    title: 'Hợp Tác Nông Hộ',
    description: 'Liên kết trực tiếp với nông dân, đảm bảo nguồn gốc và chất lượng ổn định.',
    color: 'sunset-orange',
  },
  {
    icon: Sparkles,
    title: 'Xay Tươi Mới',
    description: 'Chỉ xay khi có đơn hàng, đảm bảo gạo luôn tươi mới và giữ nguyên hương vị.',
    color: 'rice-field-green',
  },
];

const ReasonsSection = forwardRef<HTMLElement, ReasonsSectionProps>(({ isVisible }, ref) => {
  return (
    <section
      id="reasons"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Tại Sao Chọn <span className="text-rice-field-green">Gạo Lúa Tôm</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những giá trị đặc biệt mà chúng tôi mang đến cho bạn và gia đình
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const iconBgColor = reason.color === 'rice-field-green' ? 'bg-rice-field-green' : 'bg-sunset-orange';
            
            return (
              <div
                key={index}
                className={`text-center transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg">
                  <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ReasonsSection.displayName = 'ReasonsSection';

export default ReasonsSection;
