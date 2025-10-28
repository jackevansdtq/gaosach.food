import { forwardRef } from 'react';
import { Sprout } from 'lucide-react';
import riceFieldImage from '../assets/images/5a40742ba105b393eb8bc595d8ac9cc7.jpg';

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
      {/* Rice Field Background - Fixed */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${riceFieldImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Dark overlay to reduce brightness for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Warm Sunset Gradient Overlay matching the image */}
      <div className="absolute inset-0 bg-gradient-to-b from-sunset-orange/50 via-sunset-gold/30 to-transparent"></div>
      
      {/* Content Container - Smooth parallax */}
      <div className="relative z-10 w-full parallax-content">
        {/* Top Left Logo & Brand */}
        <div className="absolute top-8 left-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-rice-field rounded-full flex items-center justify-center shadow-lg sunrise-glow">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">Gạo ST25</h3>
            <p className="text-sm text-white/90">Farm2Table</p>
          </div>
        </div>

        {/* Center Content */}
        <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div>
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-2">
              Gạo ST25
            </h1>
            
            {/* Subtitle in Rice Field Green - Enhanced visibility */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-8" style={{ 
              textShadow: '0 0 30px rgba(124, 179, 66, 1), 0 0 60px rgba(124, 179, 66, 0.8), 3px 3px 6px rgba(0,0,0,0.5)',
              filter: 'drop-shadow(0 0 20px rgba(124, 179, 66, 0.9))'
            }}>
              Từ Ruộng Đến Bàn Ăn
            </h2>
            
            {/* Description */}
            <p className="text-xl sm:text-2xl text-white mb-12 font-medium">
              Farm to Table - Hương vị thuần khiết từ đồng ruộng
            </p>
            
            {/* CTA Button Sunset Orange */}
            <a
              href="#products"
              className="btn-sunset inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              <span className="text-2xl">↓</span>
              <span>Khám Phá Sản Phẩm</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
