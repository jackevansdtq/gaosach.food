import { forwardRef, useState } from 'react';
import { Package } from 'lucide-react';
import st25_1 from '../assets/images/st25_1.jpg';
import st253 from '../assets/images/st253.jpeg';
import gaoSt25 from '../assets/images/gao-st25.webp';

interface ProductsSectionProps {
  isVisible?: boolean;
}

const products = [
  {
    name: 'Nguyên Cám',
    percentage: 100,
    description: 'Giữ nguyên lớp cám tự nhiên, giàu chất xơ, vitamin B và khoáng chất. Hương vị đậm đà, thích hợp cho người quan tâm sức khỏe.',
    color: 'green',
    image: st25_1,
  },
  {
    name: 'Giữ Cám',
    percentage: 50,
    description: 'Cân bằng giữa dinh dưỡng và hương vị. Giữ lại một phần cám tự nhiên, vừa bổ dưỡng vừa dễ tiêu hóa.',
    color: 'amber',
    image: st253,
  },
  {
    name: 'Trắng Tinh',
    percentage: 0,
    description: 'Xay trắng hoàn toàn, hạt gạo trắng tinh, mềm dẻo. Hương thơm đặc trưng của ST25, phù hợp mọi lứa tuổi.',
    color: 'blue',
    image: gaoSt25,
  },
];

const ProductsSection = forwardRef<HTMLElement, ProductsSectionProps>(({ isVisible }, ref) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(10);

  const scrollToForm = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage === 50) return 'bg-amber-500';
    if (percentage === 0) return 'bg-gray-300';
    return 'bg-blue-500';
  };

  const getBadgeColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-600';
    if (percentage === 50) return 'bg-amber-600';
    return 'bg-blue-600';
  };

  return (
    <section
      id="products"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-4">
            Sản phẩm của chúng tôi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Đa dạng mức độ xay xát, phù hợp với mọi nhu cầu và sở thích
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-green-900">{product.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getBadgeColor(product.percentage)}`}>
                    {product.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                {product.percentage < 100 && (
                  <div className="mb-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(product.percentage)} transition-all duration-500`}
                        style={{ width: `${product.percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                {selectedProduct === product.name && (
                  <div className="mb-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                    <label className="block text-sm font-semibold text-green-900 mb-2">
                      Chọn số lượng (kg)
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">5 kg</span>
                      <span className="text-2xl font-bold text-green-700">{quantity} kg</span>
                      <span className="text-sm text-gray-600">100 kg</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (selectedProduct === product.name) {
                      // Nếu đã chọn sản phẩm này rồi, scroll đến form
                      setTimeout(() => scrollToForm(), 300);
                    } else {
                      // Nếu chưa chọn, mở panel để chọn số lượng
                      setSelectedProduct(product.name);
                    }
                  }}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {selectedProduct === product.name ? 'Chuyển Đến Đăng Ký ▼' : 'Đăng Ký Đặt Trước'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

ProductsSection.displayName = 'ProductsSection';

export default ProductsSection;
