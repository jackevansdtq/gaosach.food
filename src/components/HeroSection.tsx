import { forwardRef } from 'react';
import { Sprout, Award, Globe, CheckCircle } from 'lucide-react';

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
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,197,94,0.3),transparent)]"></div>
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Icon with Glass Effect */}
        <div className="inline-flex items-center justify-center w-28 h-28 mb-8 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full shadow-2xl hover:scale-110 transition-all duration-300">
          <Sprout className="w-14 h-14 text-white" />
        </div>

        {/* Title with Gradient */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6">
          <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent animate-gradient">
            Gạo ST25
          </span>
        </h1>

        <p className="text-2xl sm:text-3xl lg:text-4xl text-green-100 mb-4 font-light">
          Hạt gạo tinh hoa từ đồng ruộng Việt Nam
        </p>
        
        <p className="text-lg sm:text-xl text-green-200 mb-12 font-medium">
          Giải nhất "Gạo ngon nhất thế giới" 2019
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#form"
            className="group px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 transform hover:-translate-y-2 hover:scale-105 flex items-center gap-2"
          >
            <span>Đăng ký ngay</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#story"
            className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 shadow-2xl hover:shadow-white/50 transform hover:-translate-y-2 hover:scale-105"
          >
            Tìm hiểu thêm
          </a>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">100%</div>
            <div className="text-green-200 font-semibold uppercase tracking-wider text-sm">Hữu cơ</div>
          </div>
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">#1</div>
            <div className="text-green-200 font-semibold uppercase tracking-wider text-sm">Thế giới</div>
          </div>
          <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="text-5xl font-black text-white mb-2 group-hover:scale-110 transition-transform">50+</div>
            <div className="text-green-200 font-semibold uppercase tracking-wider text-sm">Quốc gia</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-12 h-12 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
          <svg
            className="w-6 h-6 text-white"
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
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
