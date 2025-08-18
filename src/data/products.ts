export type Product = {
  id: string
  name: string
  slug: string
  category: string
  description: string
  images: string[]
  price?: number
  rating: number
  reviews: number
  specs?: Record<string, string>
  tags?: string[]
}

// Import a few sample images that already exist in the repo
// Note: You can replace/extend these anytime with real product images
import baloLaptop from '../assets/maybalo/BALO LAPTOP1.webp'
import baloLogo from '../assets/maybalo/BALO IN LOGO.webp'
import baloNhanVien from '../assets/maybalo/BALO NHÂN VIÊN 05.webp'
import canvasBags from '../assets/colorful-canvas-bags.png'

export const productsSample: Product[] = [
  {
    id: 'p-balo-laptop',
    name: 'Balo Laptop',
    slug: 'balo-laptop',
    category: 'MAY BALO',
    description:
      'Balo laptop 15-17 inch, chất liệu Oxford chống nước nhẹ, đệm lưng thoáng khí, ngăn laptop riêng và nhiều ngăn phụ tiện dụng.',
    images: [baloLaptop],
    price: 450000,
    rating: 4.7,
    reviews: 132,
    specs: {
      'Chất liệu': 'Oxford/Polyester',
      'Kích thước': '46 x 30 x 14 cm',
      'Ngăn laptop': '15-17 inch',
      'Màu sắc': 'Đen/Đỏ (tùy chọn)'
    },
    tags: ['balo', 'laptop', 'chống nước']
  },
  {
    id: 'p-balo-logo',
    name: 'Balo in logo',
    slug: 'balo-in-logo',
    category: 'MAY BALO',
    description:
      'Balo in/thêu logo theo yêu cầu doanh nghiệp, phù hợp làm quà tặng sự kiện, onboarding nhân viên.',
    images: [baloLogo],
    price: 390000,
    rating: 4.5,
    reviews: 78,
    specs: {
      'Chất liệu': 'Polyester 600D',
      'Kích thước': '44 x 28 x 13 cm',
      'In/Thêu': 'Theo thiết kế',
      'SL tối thiểu': '50 cái'
    },
    tags: ['balo', 'logo', 'quà tặng']
  },
  {
    id: 'p-balo-nhan-vien',
    name: 'Balo nhân viên 05',
    slug: 'balo-nhan-vien-05',
    category: 'MAY BALO',
    description:
      'Mẫu balo đơn giản, tối ưu chi phí cho đồng phục nhân viên – bền bỉ, thoải mái khi đeo.',
    images: [baloNhanVien],
    price: 320000,
    rating: 4.3,
    reviews: 54,
    specs: {
      'Chất liệu': 'Canvas/Poly',
      'Kích thước': '45 x 29 x 12 cm',
      'Màu sắc': 'Xám',
      'Bảo hành': '6 tháng'
    },
    tags: ['balo', 'đồng phục']
  },
  {
    id: 'p-tui-vai-canvas',
    name: 'Túi vải canvas',
    slug: 'tui-vai-canvas',
    category: 'MAY TÚI VẢI',
    description:
      'Túi vải canvas thân thiện môi trường, in ấn theo thiết kế, phù hợp sự kiện – bán lẻ – quà tặng.',
    images: [canvasBags],
    price: 35000,
    rating: 4.8,
    reviews: 201,
    specs: {
      'Chất liệu': 'Canvas 12oz',
      'Kích thước': '36 x 32 x 8 cm',
      'Tải trọng': '8-10 kg',
      'Kiểu quai': 'Quai vai/Quai tay'
    },
    tags: ['túi vải', 'canvas', 'eco']
  }
]

export const bySlug = (slug: string): Product | undefined =>
  productsSample.find((p) => p.slug === slug)



