# Poyraz Portfolio — poyraz-ui v3 Migration Plan

Bu planın amacı `poyraz-portfolio` projesini `poyraz-ui@2.x` kullanımından `poyraz-ui@3.0.0` kullanımına, mevcut sayfa düzenini ve portfolio kimliğini bozmadan geçirmek.

Öncelik sırası:

1. Önce paket geçişi ve build/type güvenliği.
2. Sonra mevcut layout davranışını koruma.
3. En son görsel polish ve yeni v3 tasarım yeteneklerini kontrollü ekleme.

> Not: Bu dokümandaki tasarım iyileştirmeleri v3 geçişinden sonra ayrı küçük fazlara bölünebilir. İlk migration hedefi “çalışan ve görsel olarak kırılmamış portfolio”dur.

---

## Mevcut Durum Özeti

- Proje Next.js `16.1.6`, React `19.2.3`, Tailwind CSS v4 kullanıyor.
- `poyraz-ui` şu anda npm paketi olarak `^2.0.1` kullanılıyor.
- `app/globals.css` içinde `@import "poyraz-ui/preset.css";` zaten mevcut.
- Componentler local registry copy olarak değil, doğrudan paket exportları üzerinden kullanılıyor.
- Aktif poyraz-ui importları şu alanlarda:
  - `poyraz-ui/atoms`
  - `poyraz-ui/molecules`
  - `poyraz-ui/organisms`
  - `poyraz-ui/themes`

Migration için avantajlı nokta: v3 tarafında kullanılan temel exportların çoğu korunmuş görünüyor. Bu nedenle geçişin büyük kısmı dependency bump + görsel/behavior doğrulama şeklinde ilerleyebilir.

---

## Risk Haritası

### Yüksek Öncelikli Riskler

- [ ] `poyraz-ui@3.0.0` Node `>=22` istediği için local/Vercel Node versiyonu doğrulanmalı.
- [ ] `pnpm-lock.yaml` v3 dependency graph ile temiz güncellenmeli.
- [ ] `poyraz-ui/preset.css` v3 tokenları mevcut layout renklerini beklenmedik şekilde değiştirebilir.
- [ ] Card template componentleri (`NewsCard`, `ImageCard`, `ArticleCard`, `TestimonialCard`) v3’te daha modern/glassy defaultlara sahip olduğu için mevcut compact tasarımda kayma oluşturabilir.
- [ ] `CommandPalette`, `Sheet`, `Modal`, `Select`, `DropdownMenu` gibi Radix tabanlı componentlerde overlay, focus ve portal davranışı görsel olarak kontrol edilmeli.

### Orta Öncelikli Riskler

- [ ] `Typography` variant ölçüleri v3 tokenlarıyla farklılaşabilir.
- [ ] `Badge`, `Card`, `Button`, `Input` default radius/spacing değerleri mevcut `rounded-sm` class override’larıyla büyük ölçüde korunacak ama sayfa bazlı kontrol edilmeli.
- [ ] `AnnouncementBar` v3 animasyon ve spacing’i `AppShell` içinde ekstra yükseklik/boşluk yaratabilir.
- [ ] Mobile navbar sheet davranışı v3 overlay/close butonu nedeniyle farklı görünebilir.

### Düşük Öncelikli Riskler

- [ ] `src/lib/themes.ts` aktif kullanılmıyor; v3 theme exportlarıyla uyumlu kalması yeterli.
- [ ] `reactive-switcher` şu an kullanılmıyor; dark mode geçişi v3 migration kapsamına alınmamalı.
- [ ] Portfolio tasarım polish istekleri migration sonrasına bırakılmalı.

---

## Faz 0 — Hazırlık ve Baseline

Amaç: Değişiklik yapmadan önce projenin mevcut sağlığını ve migration başlangıç noktasını netleştirmek.

### Görevler

- [ ] `git status --short` ile mevcut dirty dosyaları not al.
- [ ] Mevcut kullanıcı değişikliklerine dokunma.
- [ ] `pnpm-workspace.yaml` içinde önceden yapılmış `allowBuilds` değişikliğini kullanıcı değişikliği olarak koru.
- [ ] Paket yöneticisi versiyonunu doğrula.
- [ ] Node versiyonunu doğrula.
- [ ] `pnpm lint` çalıştır.
- [ ] `pnpm build` çalıştır.
- [ ] Varsa mevcut lint/build uyarılarını migration öncesi baseline olarak not al.

### Kabul Kriterleri

- [ ] Migration öncesi proje durumu belgelenmiş olmalı.
- [ ] Mevcut build hatası varsa v3 geçişinden bağımsız olduğu anlaşılmalı.
- [ ] Kullanıcı değişiklikleri ezilmemeli.

---

## Faz 1 — Dependency Geçişi

Amaç: `poyraz-ui` paketini v3’e almak ve lockfile’ı temiz güncellemek.

### Görevler

- [ ] `package.json` içindeki `poyraz-ui` sürümünü `^3.0.0` yap.
- [ ] `pnpm install` ile `pnpm-lock.yaml` güncelle.
- [ ] `pnpm-lock.yaml` içinde `poyraz-ui@3.0.0` çözümlendiğini doğrula.
- [ ] `package.json` içine gerekirse Node engine eklemeyi değerlendir:
  - `node >=22`
  - Bu değişiklik Vercel deploy ile uyumlu olmalı.
- [ ] Vercel tarafında Node 22 kullanılacağından emin olmak için proje ayarı/notu ekle.

### Kabul Kriterleri

- [ ] `package.json` v3 dependency kullanıyor.
- [ ] Lockfile v3’e güncellendi.
- [ ] Paket kurulumu temiz tamamlandı.
- [ ] Kullanılmayan geçici paket/alias eklenmedi.

---

## Faz 2 — Import ve API Uyumluluk Kontrolü

Amaç: v3 sonrası TypeScript/Next build seviyesinde kırılan import veya prop kullanımlarını düzeltmek.

### Kontrol Edilecek Import Grupları

- [ ] `poyraz-ui/atoms`
  - `Avatar`
  - `Badge`
  - `Button`
  - `Card`
  - `Input`
  - `Separator`
  - `Skeleton`
  - `Typography`
- [ ] `poyraz-ui/molecules`
  - `ArticleCard`
  - `CommandPalette`
  - `DropdownMenu`
  - `ImageCard`
  - `Modal`
  - `NewsCard`
  - `Pagination`
  - `Select`
  - `Sheet`
  - `TestimonialCard`
- [ ] `poyraz-ui/organisms`
  - `AnnouncementBar`
- [ ] `poyraz-ui/themes`
  - `poyrazLightTheme`
  - `poyrazDarkTheme`
  - `poyrazThemes`

### Görevler

- [ ] `rg "poyraz-ui"` ile tüm kullanım noktalarını tekrar listele.
- [ ] `pnpm lint` çalıştır.
- [ ] `pnpm build` çalıştır.
- [ ] Kırılan import varsa en küçük değişiklikle düzelt.
- [ ] Kırılan prop varsa component davranışını koruyarak v3 API’ya uyarla.
- [ ] Gereksiz refactor yapma.

### Kabul Kriterleri

- [ ] Tüm importlar v3 exportlarıyla uyumlu.
- [ ] Type/build hatası kalmadı.
- [ ] Sayfa düzenini etkileyecek gereksiz class değişikliği yapılmadı.

---

## Faz 3 — Global CSS ve Token Uyumluluğu

Amaç: v3 preset tokenlarının portfolio genel görünümünü bozmadığını doğrulamak.

### Görevler

- [ ] `app/globals.css` içindeki import sırasını koru:
  - `@import "tailwindcss";`
  - `@import "poyraz-ui/preset.css";`
- [ ] Custom utility’leri kontrol et:
  - `animate-marquee`
  - `pause-on-hover`
- [ ] `bg-background`, `text-foreground`, `border-border`, `muted-foreground` gibi semantic tokenların v3 karşılığını görsel olarak kontrol et.
- [ ] Light mode temel kontrastı kontrol et.
- [ ] Dark mode aktif değilse migration kapsamında dark mode ekleme.

### Kabul Kriterleri

- [ ] Global CSS minimal kaldı.
- [ ] Tailwind v4 compile sorunu yok.
- [ ] Semantic tokenlar sayfa genelinde okunabilir.

---

## Faz 4 — Layout ve Shell Doğrulaması

Amaç: Site iskeletini korumak.

### Kontrol Edilecek Dosyalar

- [ ] `app/[locale]/layout.tsx`
- [ ] `components/app-shell.tsx`
- [ ] `components/site-navbar.tsx`
- [ ] `components/search-command.tsx`
- [ ] `components/language-switcher.tsx`

### Görevler

- [ ] Locale layout render zincirini kontrol et.
- [ ] `AppShell` max width ve spacing değerlerinin değişmediğini doğrula.
- [ ] `AnnouncementBar` yüksekliği ve border davranışını kontrol et.
- [ ] Desktop navbar hizasını kontrol et.
- [ ] Mobile navbar sheet aç/kapat davranışını kontrol et.
- [ ] Search command palette aç/kapat davranışını kontrol et.
- [ ] Cmd/Ctrl + K shortcut davranışını doğrula.

### Kabul Kriterleri

- [ ] Navbar layout bozulmadı.
- [ ] Mobile menü çalışıyor.
- [ ] Search command çalışıyor.
- [ ] Announcement bar sayfa içeriğini itip bozmadı.

---

## Faz 5 — Sayfa Bazlı Görsel Regression Kontrolü

Amaç: Mevcut portfolio düzenini v3 sonrası sayfa sayfa korumak.

### Ana Sayfa

- [ ] `HomeHero` kart yerleşimi korunuyor.
- [ ] `NewsCard` yükseklikleri düzgün.
- [ ] Hero görsel alanı taşmıyor.
- [ ] References marquee çalışıyor.
- [ ] Sponsor kartları hizalı.

### About

- [ ] Eğitim ve deneyim kartları compact kalıyor.
- [ ] Sertifika sheet açılıyor.
- [ ] Bookmark sheet açılıyor.
- [ ] Referans ve gönüllülük link kartları hizalı.

### Blog

- [ ] Kategori badge’leri doğru görünüyor.
- [ ] Search input focus state rahatsız etmiyor.
- [ ] `ArticleCard` grid yüksekliği dengeli.
- [ ] Pagination active state düzgün.
- [ ] Empty state bozulmadı.

### Blog Detail

- [ ] Markdown typography okunabilir.
- [ ] Code block görünümü korunuyor.
- [ ] Mermaid block loading/error kartları düzgün.
- [ ] TOC paneli taşmıyor.
- [ ] Progress bar çalışıyor.

### Projects

- [ ] `ImageCard` square grid düzenini bozmuyor.
- [ ] NPM/GitHub kartları aynı yükseklik mantığında kalıyor.
- [ ] Badge ve icon spacingleri düzgün.

### Content

- [ ] YouTube cardları düzgün.
- [ ] PDF preview kartları düzgün.
- [ ] PDF modal açılıyor.
- [ ] Prev/Next buttonları çalışıyor.

### Links

- [ ] Profile card rounded/glass görünüm korunuyor.
- [ ] `Select` ve `Input` aynı satırda düzgün.
- [ ] Link kartları hover’da layout shift yapmıyor.
- [ ] Mobile layout taşmıyor.

### Contact / Gallery / Volunteer / References

- [ ] Kartlar compact düzeni koruyor.
- [ ] Linkler çalışıyor.
- [ ] Galeri modal/preview davranışı korunuyor.

### Kabul Kriterleri

- [ ] Kritik sayfalarda layout kırığı yok.
- [ ] Horizontal overflow yok.
- [ ] Component default değişimleri mevcut tasarımı bozmadı.

---

## Faz 6 — Davranış ve Etkileşim Testleri

Amaç: Sadece build almakla kalmayıp interaktif alanları doğrulamak.

### Manuel Test Listesi

- [ ] Navbar linkleri locale-aware route ediyor.
- [ ] Language switcher route’u bozmadan locale değiştiriyor.
- [ ] Social dropdown açılıyor/kapanıyor.
- [ ] Mobile sheet açılıyor/kapanıyor.
- [ ] Search palette:
  - [ ] Click ile açılıyor.
  - [ ] Cmd/Ctrl + K ile açılıyor.
  - [ ] Arama filtreliyor.
  - [ ] Internal linke gidiyor.
  - [ ] External link yeni sekme açıyor.
- [ ] About sheetleri açılıyor/kapanıyor.
- [ ] Atatürk widget modal açılıyor.
- [ ] PDF modal açılıyor.
- [ ] PDF modal içinde prev/next çalışıyor.
- [ ] Blog pagination linkleri doğru query üretir.

### Kabul Kriterleri

- [ ] Temel kullanıcı akışlarında regression yok.
- [ ] Focus trap/overlay kilitlenmesi yok.
- [ ] Body scroll lock sorun çıkarmıyor.

---

## Faz 7 — Build, Lint ve Release Readiness

Amaç: Deploy edilebilir temiz durum elde etmek.

### Görevler

- [ ] `pnpm lint`
- [ ] `pnpm build`
- [ ] `git diff --check`
- [ ] `git status --short`
- [ ] Build sırasında Next warningleri not al.
- [ ] Vercel Node 22 gereksinimi için deploy notu çıkar.

### Kabul Kriterleri

- [ ] Build başarılı.
- [ ] Lint başarılı ya da mevcut baseline dışı yeni hata yok.
- [ ] Diff sadece migration kapsamındaki dosyalardan oluşuyor.

---

## Faz 8 — Commit ve Handoff

Amaç: Migration değişikliklerini okunabilir şekilde teslim etmek.

### Önerilen Commit Gruplaması

1. `docs: plan poyraz-ui v3 migration`
   - Sadece bu plan dosyası.

2. `chore: migrate portfolio to poyraz-ui v3`
   - `package.json`
   - `pnpm-lock.yaml`
   - Gerekirse `pnpm-workspace.yaml`
   - Gerekirse küçük API uyumluluk düzeltmeleri.

3. Eğer görsel uyumluluk düzeltmesi gerekiyorsa:
   - `fix: preserve portfolio layout with poyraz-ui v3`

### Kabul Kriterleri

- [ ] Commitler anlamlı ve review edilebilir.
- [ ] Kullanıcı değişiklikleri commit kapsamına yanlışlıkla alınmadı.
- [ ] Final notta test sonuçları açıkça yazıldı.

---

## Migration Sonrasına Bırakılacak Tasarım İşleri

Bu işler v3 geçişinden sonra ayrıca ele alınmalı:

- [ ] Portfolio genelini daha glassy/soft v3 tarzına yaklaştırma.
- [ ] Button hover animasyonlarını portfolio CTA’larına uygulama.
- [ ] Typography text effectlerini hero/blog başlıklarında kullanma.
- [ ] Card variantlarını sayfa bazlı standardize etme.
- [ ] Dark mode/theme switcher ekleme.
- [ ] Links sayfasını daha modern micro-landing görünümüne taşıma.
- [ ] Navbar ve command palette görsel polish.
- [ ] Blog kartlarında daha zengin image/metadata layout.

---

## İlk Uygulama Sırası

Migration’a başlarken uygulanacak pratik sıra:

1. Faz 0 baseline.
2. Faz 1 dependency geçişi.
3. Faz 2 import/API kontrolü.
4. Faz 7 build/lint doğrulaması.
5. Faz 4 ve Faz 5 hızlı görsel kontrol.
6. Gerekiyorsa küçük düzeltmeler.
7. Commit.

Bu sıra major geçişi hızlı tamamlamaya, tasarım detaylarını ise yayın sonrası küçük ve güvenli iterasyonlara bırakmaya uygundur.
