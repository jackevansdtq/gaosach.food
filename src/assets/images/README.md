# Images Folder

## Cách sử dụng:

### Option 1: Public folder (Khuyến nghị)
Đặt hình vào: `public/images/`

**Sử dụng trong code:**
```tsx
<img src="/images/ten-file.jpg" alt="description" />
```

### Option 2: Assets folder
Đặt hình vào: `src/assets/images/`

**Import trong component:**
```tsx
import heroImage from '../../assets/images/hero.jpg';

<img src={heroImage} alt="description" />
```

### Hình ảnh hiện tại:
- Hero section: Pexels images (external)
- Story section: Pexels images (external)

### Recommended sizes:
- Banner/Hero: 1920x1080 px
- Card images: 800x600 px
- Icons: 400x400 px

