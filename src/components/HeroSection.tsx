import { forwardRef } from 'react';
import { Sprout } from 'lucide-react';

interface HeroSectionProps {
  isVisible?: boolean;
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(({ isVisible }, ref) => {
  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-100 to-green-200" />

      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/2382795/pexels-photo-2382795.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-white rounded-full shadow-2xl">
          <Sprout className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-900 mb-6">
          Gạo ST25
        </h1>

        <p className="text-xl sm:text-2xl lg:text-3xl text-green-800 mb-8 font-light">
          Hạt gạo tinh hoa từ đồng ruộng Việt Nam
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#form"
            className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold text-lg hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Đăng ký ngay
          </a>
          <a
            href="#story"
            className="px-8 py-4 bg-white text-green-600 rounded-full font-semibold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Tìm hiểu thêm
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-green-900">
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="text-sm uppercase tracking-wide">Hữu cơ</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">Số 1</div>
            <div className="text-sm uppercase tracking-wide">Thế giới</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">An toàn</div>
            <div className="text-sm uppercase tracking-wide">Tuyệt đối</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
