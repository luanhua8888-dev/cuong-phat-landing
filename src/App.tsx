import { Phone, Mail, Truck, BadgeCheck, Clock, MapPin, Shirt, ShoppingBag, Award } from 'lucide-react'
import { Link, Outlet, Route, Routes, useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { bySlug, productsSample } from './data/products'
import bannerBG from './assets/banner-1-BG.jpg.webp'
import bannerOK from './assets/banner-1-ok.png.webp'

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<HomePage />} />
        <Route path="san-pham" element={<ProductsPage />} />
        <Route path="san-pham/:slug" element={<ProductDetailPage />} />
        <Route path="tu-van" element={<ConsultPage />} />
        <Route path="gioi-thieu" element={<AboutPage />} />
        <Route path="lien-he" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

function Shell() {
  return (
    <div className="min-h-dvh flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingContacts />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <HeroSlider />
      <Features />
      <Products />
      <CategoryShowcase />
    </>
  )
}

function Container(props: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-screen-2xl px-4 md:px-6 ${props.className ?? ''}`}>{props.children}</div>
  )
}

function FloatingContacts() {
  const phone = '091 257 0878'
  const phoneHref = 'tel:0912570878'
  const zaloHref = 'https://zalo.me/0912570878'
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute left-4 bottom-6 pointer-events-auto">
        <a href={phoneHref} className="group flex items-center gap-3 pr-4 pl-2 h-12 rounded-full bg-gray-100 shadow-lg border border-green-200">
          <span className="relative inline-grid place-items-center w-10 h-10 rounded-full bg-green-500 text-white">
            <span className="absolute inline-block w-10 h-10 rounded-full border-2 border-green-400" />
            <span className="absolute w-10 h-10 rounded-full border border-green-300 animate-ping" />
            <Phone size={18} />
          </span>
          <span className="text-red-600 font-semibold">Gọi ngay {phone}</span>
        </a>
      </div>
      <div className="absolute right-6 bottom-6 pointer-events-auto">
        <a href={zaloHref} target="_blank" rel="noreferrer" aria-label="Chat Zalo" className="relative grid place-items-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg">
          <span className="absolute inset-0 rounded-full bg-blue-400 opacity-50 animate-ping" />
          <span className="absolute inset-0 rounded-full bg-blue-300 opacity-30 animate-ping [animation-delay:200ms]" />
          <span className="relative font-bold text-sm">Zalo</span>
        </a>
      </div>
    </div>
  )
}

function TopBar() {
  return (
    <div className="bg-gray-50 text-gray-600 text-sm">
      <Container className="py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1"><Phone size={16}/> 091 257 0878</span>
          <span className="hidden sm:inline-flex items-center gap-1"><Mail size={16}/> info@cuongphat.vn</span>
        </div>
        <a href="#lien-he" className="text-accent hover:underline">Tư vấn miễn phí</a>
      </Container>
    </div>
  )
}

function Header() {
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(term ? `/san-pham?q=${encodeURIComponent(term)}` : '/san-pham')
  }
  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <Container className="py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gray-900 text-white grid place-items-center font-bold">CP</div>
          <div>
            <div className="font-semibold leading-tight">Cường Phát</div>
            <div className="text-xs text-gray-500">Sản xuất túi vải & đồng phục</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-accent">Trang chủ</Link>
          <Link to="/san-pham" className="hover:text-accent">Sản phẩm</Link>
          <Link to="/tu-van" className="hover:text-accent">Tư vấn</Link>
          <Link to="/gioi-thieu" className="hover:text-accent">Giới thiệu</Link>
          <Link to="/lien-he" className="hover:text-accent">Liên hệ</Link>
        </nav>
        <form onSubmit={onSubmit} className="hidden sm:flex items-center gap-2">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-52 md:w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="submit" className="rounded-md bg-accent px-3 py-2 text-white text-sm font-medium shadow hover:opacity-90">Search</button>
        </form>
      </Container>
    </header>
  )
}

function HeroSlider() {
  const slides = [
    { src: bannerBG, alt: 'Banner 1' },
    { src: bannerOK, alt: 'Banner 2' },
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(id)
  }, [])

  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length)

  return (
    <section className="py-6">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img src={slides[index].src} alt={slides[index].alt} className="w-full h-auto object-cover" />
          <button aria-label="Prev" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow">‹</button>
          <button aria-label="Next" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white px-3 py-2 shadow">›</button>
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? 'bg-accent' : 'bg-white/70'} ring-1 ring-black/10`} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50">
      <Container className="py-14 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-accent font-medium mb-3">
            <div className="w-2 h-2 rounded-full bg-accent" /> Chất lượng hàng đầu
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Sản xuất túi vải <br className="hidden sm:block"/> siêu bền đẹp
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Chuyên sản xuất túi vải canvas, túi đồng phục, áo thun chất lượng cao. Cam kết chất lượng, giao hàng nhanh chóng trên toàn quốc.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#san-pham" className="rounded-md bg-gray-900 text-white px-5 py-3 font-medium hover:opacity-90">Xem sản phẩm</a>
            <a href="#lien-he" className="rounded-md bg-accent text-white px-5 py-3 font-medium hover:opacity-90">Liên hệ ngay</a>
          </div>
        </div>
        <div className="relative grid grid-cols-2 gap-6">
          <div className="rounded-xl overflow-hidden border bg-white shadow">
            <div className="aspect-[4/3] bg-gradient-to-br from-sky-200 via-white to-sky-100 grid place-items-center">
              <ShoppingBag className="text-accent" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 right-0">
              <span className="inline-flex items-center rounded-full bg-white border px-4 py-2 text-sm font-semibold shadow-sm">Chất lượng A+</span>
            </div>
            <div className="rounded-xl border bg-gray-50">
              <div className="aspect-square grid place-items-center text-gray-400">
                <Award className="text-accent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Card(props: { title: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm flex items-start gap-3">
      <div className="p-2 rounded-md bg-accent/10">{props.icon}</div>
      <div className="font-medium text-gray-800">{props.title}</div>
    </div>
  )
}

function Features() {
  return (
    <section className="py-10 border-t bg-white">
      <Container>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Feature title="Khách hàng thân thiết" desc="Chương trình ưu đãi" icon={<Shirt className="text-accent" />} />
          <Feature title="Vận chuyển nhanh" desc="Tất cả các tỉnh thành" icon={<Truck className="text-accent" />} />
          <Feature title="Cam kết chất lượng" desc="Đúng chất lượng" icon={<BadgeCheck className="text-accent" />} />
          <Feature title="Tư vấn online" desc="Từ 08h00 - 22h00" icon={<Clock className="text-accent" />} />
        </div>
      </Container>
    </section>
  )
}

function Feature(props: { title: string; desc: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-5 bg-gray-50">
      <div className="w-9 h-9 rounded-md bg-accent/10 grid place-items-center mb-2">{props.icon}</div>
      <div className="text-sm text-accent font-semibold">{props.title}</div>
      <div className="mt-1 text-gray-800 font-medium">{props.desc}</div>
    </div>
  )
}

function Products() {
  const products = [
    { title: 'Áo Polo Nam' },
    { title: 'Áo Polo Nữ' },
    { title: 'Áo Thun Đồng Phục' },
    { title: 'Áo Thun BHP' },
  ]
  return (
    <section id="san-pham" className="py-16 bg-white">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
        <p className="mt-2 text-gray-600">Khám phá bộ sưu tập túi vải và đồng phục chất lượng cao của chúng tôi</p>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.title} className="rounded-xl border overflow-hidden bg-white shadow-sm">
              <div className="aspect-video bg-[radial-gradient(#f59e0b_20%,transparent_20%),radial-gradient(#8b5cf6_20%,transparent_20%)] [background-position:0_0,20px_20px] [background-size:40px_40px]" />
              <div className="p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="mt-4">
                  <Link to="/lien-he" className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-white text-sm font-medium hover:opacity-90">Liên hệ ngay</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Footer() {
  return (
    <footer className="mt-auto border-t bg-gray-900 text-gray-200">
      <Container className="py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white text-gray-900 grid place-items-center font-bold">CP</div>
            <div className="font-semibold">Cường Phát</div>
          </div>
          <p className="mt-3 text-sm text-gray-300">Chuyên sản xuất túi vải, đồng phục chất lượng cao. Không ngừng đổi mới để mang đến sản phẩm tốt nhất.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Sản phẩm</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Áo Thun Đồng Phục</li>
            <li>Túi Vải Canvas</li>
            <li>Áo Polo</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Dịch vụ</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Thiết kế Logo</li>
            <li>In Ấn Chuyên Nghiệp</li>
            <li>Tư vấn miễn phí</li>
          </ul>
        </div>
        <div id="lien-he">
          <div className="font-semibold mb-3">Liên hệ</div>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="inline-flex items-center gap-2"><MapPin size={16}/> 123 Đường Cộng Quỳnh, Q.1, TP.HCM</li>
            <li className="inline-flex items-center gap-2"><Phone size={16}/> 091 257 0878</li>
            <li className="inline-flex items-center gap-2"><Mail size={16}/> info@cuongphat.vn</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">© 2024 Cường Phát. Tất cả quyền được bảo lưu.</div>
    </footer>
  )
}

// Pages
function PageHeader(props: { title: string; desc?: string }) {
  return (
    <section className="bg-gray-50 border-b">
      <Container className="py-10">
        <h1 className="text-3xl font-bold text-gray-900">{props.title}</h1>
        {props.desc ? <p className="mt-2 text-gray-600">{props.desc}</p> : null}
      </Container>
    </section>
  )
}

function ProductsPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  return (
    <>
      <PageHeader title="Sản phẩm" desc={q ? `Kết quả tìm kiếm cho "${q}"` : 'Danh mục các sản phẩm nổi bật của Cường Phát'} />
      <Products />
    </>
  )
}

function ConsultPage() {
  return (
    <>
      <PageHeader title="Tư vấn" desc="Đặt câu hỏi và nhận tư vấn nhanh chóng" />
      <section className="py-10">
        <Container>
          <div className="rounded-xl border p-6 bg-white">
            <h2 className="font-semibold text-gray-900">Gửi yêu cầu tư vấn</h2>
            <form className="mt-4 grid md:grid-cols-2 gap-4">
              <input className="border rounded-md px-3 py-2" placeholder="Họ và tên" />
              <input className="border rounded-md px-3 py-2" placeholder="Số điện thoại" />
              <input className="md:col-span-2 border rounded-md px-3 py-2" placeholder="Email (không bắt buộc)" />
              <textarea className="md:col-span-2 border rounded-md px-3 py-2 min-h-32" placeholder="Nội dung cần tư vấn" />
              <button className="md:col-span-2 rounded-md bg-accent text-white px-4 py-2 font-medium">Gửi yêu cầu</button>
            </form>
          </div>
        </Container>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeader title="Giới thiệu" desc="Về Cường Phát - Chất lượng tạo nên uy tín" />
      <section className="py-10">
        <Container>
          <div className="prose max-w-none">
            <p>
              Cường Phát chuyên sản xuất túi vải canvas, áo thun đồng phục với quy trình hiện đại và đội ngũ nhiều kinh nghiệm.
              Chúng tôi cam kết mang đến sản phẩm chất lượng cao, giao hàng nhanh chóng trên toàn quốc.
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeader title="Liên hệ ngay" desc="Nhận báo giá nhanh trong ngày" />
      <section className="py-10">
        <Container>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-6 bg-white">
              <h2 className="font-semibold text-gray-900 mb-4">Thông tin liên hệ</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="inline-flex items-center gap-2"><MapPin size={18}/> 123 Đường Cộng Quỳnh, Q.1, TP.HCM</li>
                <li className="inline-flex items-center gap-2"><Phone size={18}/> 091 257 0878</li>
                <li className="inline-flex items-center gap-2"><Mail size={18}/> info@cuongphat.vn</li>
              </ul>
            </div>
            <div className="rounded-xl border p-6 bg-white">
              <h2 className="font-semibold text-gray-900">Gửi yêu cầu</h2>
              <form className="mt-4 grid gap-4">
                <input className="border rounded-md px-3 py-2" placeholder="Họ và tên" />
                <input className="border rounded-md px-3 py-2" placeholder="Số điện thoại" />
                <textarea className="border rounded-md px-3 py-2 min-h-32" placeholder="Nội dung" />
                <button className="rounded-md bg-gray-900 text-white px-4 py-2 font-medium">Gửi</button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

function CategoryShowcase() {
  const categories = ['Áo thun', 'Đồng phục', 'May túi vải', 'Balo', 'Nón tai bèo']

  // Load images from folders and convert to items {src,title}
  const mapAothun = import.meta.glob('./assets/mayaothun/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapDongphuc = import.meta.glob('./assets/maydongphuc/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapTuivai = import.meta.glob('./assets/maytuivai/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapBalo = import.meta.glob('./assets/maybalo/*', { eager: true, as: 'url' }) as Record<string, string>

  const fmt = (p: string) => {
    const base = p.split('/').pop() || ''
    return base.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
  }
  const slugify = (s: string) => s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
  const itemsFrom = (m: Record<string, string>, category: string) =>
    Object.keys(m).sort().map((k) => {
      const title = fmt(k)
      return { src: m[k], title, slug: slugify(title), category }
    })

  const shirts = useMemo(() => itemsFrom(mapAothun, 'MAY ÁO THUN'), [])
  const uniforms = useMemo(() => itemsFrom(mapDongphuc, 'MAY ĐỒNG PHỤC'), [])
  const canvasBags = useMemo(() => itemsFrom(mapTuivai, 'MAY TÚI VẢI'), [])
  const balos = useMemo(() => itemsFrom(mapBalo, 'MAY BALO'), [])
  return (
    <section className="py-16 bg-gray-50 border-t">
      <Container>
        <div className="grid md:grid-cols-5 gap-6">
          <aside className="md:col-span-1 space-y-6">
            <div className="rounded-xl border bg-white overflow-hidden">
              <div className="bg-accent/10 px-4 py-3 font-semibold text-gray-800">Danh mục sản phẩm</div>
              <ul>
                {categories.map((c) => (
                  <li key={c} className="border-t">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50">{c}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-white overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 font-semibold text-gray-800">Tin tức thị trường</div>
              <ul className="p-4 space-y-3 text-sm text-gray-600">
                <li>Phối màu đồng phục công sở – lựa chọn hoàn hảo</li>
                <li>Chọn chất liệu vải cho áo thun đồng phục</li>
              </ul>
            </div>
          </aside>
          <div className="md:col-span-4 space-y-12">
            <SectionCarousel title="MAY ÁO THUN" items={shirts} />
            <SectionCarousel title="MAY ĐỒNG PHỤC" items={uniforms} />
            <SectionCarousel title="MAY TÚI VẢI" items={canvasBags} />
            <SectionCarousel title="MAY BALO" items={balos} />
          </div>
        </div>
      </Container>
    </section>
  )
}

function SectionGrid(props: { title: string; items: { title: string }[]; patternClass?: string }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-extrabold text-gray-900">{props.title}</h3>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {props.items.map((p) => (
          <div key={p.title} className="rounded-xl border bg-white overflow-hidden shadow-sm">
            <div className={`aspect-[4/3] ${props.patternClass ?? 'bg-[radial-gradient(#22c55e_20%,transparent_20%),radial-gradient(#10b981_20%,transparent_20%)] [background-position:0_0,20px_20px] [background-size:40px_40px]'}`} />
            <div className="p-4 font-semibold text-gray-800 uppercase tracking-wide">{p.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

type MediaItem = { src: string; title: string; slug: string; category?: string }

function SectionCarousel({ title, items }: { title: string; items: MediaItem[] }) {
  const slides = useMemo(() => {
    const size = 4
    const chunks: MediaItem[][] = []
    for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size))
    return chunks.length ? chunks : [[]]
  }, [items])

  const [index, setIndex] = useState(0)
  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(next, 5000)
    return () => clearInterval(id)
  }, [slides.length])

  // Drag/swipe support
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [drag, setDrag] = useState<{ active: boolean; startX: number; delta: number }>({ active: false, startX: 0, delta: 0 })
  const onDown = (e: React.PointerEvent) => {
    setDrag({ active: true, startX: e.clientX, delta: 0 })
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.active) return
    setDrag((d) => ({ ...d, delta: e.clientX - d.startX }))
  }
  const endDrag = (e?: React.PointerEvent) => {
    if (!drag.active) return
    const threshold = 80
    if (drag.delta > threshold) prev()
    else if (drag.delta < -threshold) next()
    setDrag({ active: false, startX: 0, delta: 0 })
  }
  const percentOffset = (() => {
    const el = containerRef.current
    if (!drag.active || !el) return 0
    return (drag.delta / el.clientWidth) * 100
  })()

  return (
    <div>
      <div className="flex items-center gap-4 mb-2">
        <h3 className="text-2xl font-extrabold text-gray-900">{title}</h3>
        <div className="h-px flex-1 bg-gray-200" />
        {slides.length > 1 && (
          <div className="hidden md:flex items-center gap-2">
            <button onClick={prev} className="rounded-md border px-2 py-1 text-sm">‹</button>
            <button onClick={next} className="rounded-md border px-2 py-1 text-sm">›</button>
          </div>
        )}
      </div>
      <div
        ref={containerRef}
        className={`relative overflow-hidden select-none ${drag.active ? 'cursor-grabbing' : 'cursor-grab'} touch-pan-y`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <div className={`flex ${drag.active ? '' : 'transition-transform duration-700'}`} style={{ transform: `translateX(calc(-${index * 100}% + ${percentOffset}%))` }}>
          {slides.map((group, gi) => (
            <div key={gi} className="min-w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {group.map((p) => (
                  <Link to={`/san-pham/${p.slug}`} key={p.title} className="group rounded-xl border bg-white overflow-hidden shadow-sm" onClick={(e)=>{ if(Math.abs(drag.delta) > 10){ e.preventDefault(); } }}>
                    <div className="h-64 md:h-72 overflow-hidden bg-white grid place-items-center">
                      <img src={p.src} alt={p.title} draggable={false} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>
                    <div className="p-4 font-semibold text-gray-800 uppercase tracking-wide">{p.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2 w-2 rounded-full ${i === index ? 'bg-accent' : 'bg-white'} ring-1 ring-black/10`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Build a global product list from assets for detail page
function useAllProducts(): MediaItem[] {
  const mapAothun = import.meta.glob('./assets/mayaothun/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapDongphuc = import.meta.glob('./assets/maydongphuc/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapTuivai = import.meta.glob('./assets/maytuivai/*', { eager: true, as: 'url' }) as Record<string, string>
  const mapBalo = import.meta.glob('./assets/maybalo/*', { eager: true, as: 'url' }) as Record<string, string>

  const fmt = (p: string) => {
    const base = p.split('/').pop() || ''
    return base.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim()
  }
  const slugify = (s: string) => s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-')
  const itemsFrom = (m: Record<string, string>, category: string) =>
    Object.keys(m).map((k) => {
      const title = fmt(k)
      return { src: m[k], title, slug: slugify(title), category }
    })

  return useMemo(() => [
    ...itemsFrom(mapAothun, 'MAY ÁO THUN'),
    ...itemsFrom(mapDongphuc, 'MAY ĐỒNG PHỤC'),
    ...itemsFrom(mapTuivai, 'MAY TÚI VẢI'),
    ...itemsFrom(mapBalo, 'MAY BALO'),
  ], [])
}

function ProductDetailPage() {
  const { slug } = useParams()
  const products = useAllProducts()
  // Prefer dynamic assets; if not found, fall back to sample DB
  const product = products.find((p) => p.slug === slug) || bySlug(slug || '')

  if (!product) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center text-gray-600">Sản phẩm không tồn tại.</div>
        </Container>
      </section>
    )
  }

  return (
    <>
      <PageHeader title={product.title} desc={product.category} />
      <section className="py-10">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl border bg-white overflow-hidden">
              <img src={(product as any).src ?? product.images?.[0]} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
              <div className="mt-2 text-sm text-gray-500">Danh mục: {product.category}</div>
              <div className="mt-6 space-y-3 text-gray-700">
                <p>{(product as any).description ?? 'Liên hệ để được tư vấn mẫu mã, chất liệu vải và báo giá tốt nhất.'}</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Thiết kế theo yêu cầu, in/thêu logo.</li>
                  <li>Giao hàng toàn quốc, nhanh chóng.</li>
                </ul>
              </div>
              {'rating' in product && (
                <div className="mt-4 text-sm text-gray-600">Đánh giá: {(product as any).rating} ★ · {(product as any).reviews} lượt</div>
              )}
              <div className="mt-6 flex gap-3">
                <a href="tel:0912570878" className="rounded-md bg-gray-900 text-white px-4 py-2">Gọi 091 257 0878</a>
                <a href="https://zalo.me/0912570878" target="_blank" rel="noreferrer" className="rounded-md bg-accent text-white px-4 py-2">Chat Zalo</a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}


