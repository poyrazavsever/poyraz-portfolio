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

- [x] `poyraz-ui@3.0.0` Node `>=22` istediği için local/Vercel Node versiyonu doğrulanmalı.
- [x] `pnpm-lock.yaml` v3 dependency graph ile temiz güncellenmeli.
- [x] `poyraz-ui/preset.css` v3 tokenları mevcut layout renklerini beklenmedik şekilde değiştirebilir.
- [x] Card template componentleri (`NewsCard`, `ImageCard`, `ArticleCard`, `TestimonialCard`) v3’te daha modern/secondaryy defaultlara sahip olduğu için mevcut compact tasarımda kayma oluşturabilir.
- [x] `CommandPalette`, `Sheet`, `Modal`, `Select`, `DropdownMenu` gibi Radix tabanlı componentlerde overlay, focus ve portal davranışı görsel olarak kontrol edilmeli.

### Orta Öncelikli Riskler

- [x] `Typography` variant ölçüleri v3 tokenlarıyla farklılaşabilir.
- [x] `Badge`, `Card`, `Button`, `Input` default radius/spacing değerleri mevcut `rounded-sm` class override’larıyla büyük ölçüde korunacak ama sayfa bazlı kontrol edilmeli.
- [x] `AnnouncementBar` v3 animasyon ve spacing’i `AppShell` içinde ekstra yükseklik/boşluk yaratabilir.
- [x] Mobile navbar sheet davranışı v3 overlay/close butonu nedeniyle farklı görünebilir.

### Düşük Öncelikli Riskler

- [x] `src/lib/themes.ts` aktif kullanılmıyor; v3 theme exportlarıyla uyumlu kalması yeterli.
- [x] `reactive-switcher` şu an kullanılmıyor; dark mode geçişi v3 migration kapsamına alınmamalı.
- [x] Portfolio tasarım polish istekleri migration sonrasına bırakılmalı.

---

## Faz 0 — Hazırlık ve Baseline

Amaç: Değişiklik yapmadan önce projenin mevcut sağlığını ve migration başlangıç noktasını netleştirmek.

### Görevler

- [x] `git status --short` ile mevcut dirty dosyaları not al.
- [x] Mevcut kullanıcı değişikliklerine dokunma.
- [x] `pnpm-workspace.yaml` içinde önceden yapılmış `allowBuilds` değişikliğini kullanıcı değişikliği olarak koru.
- [x] Paket yöneticisi versiyonunu doğrula.
- [x] Node versiyonunu doğrula.
- [x] `pnpm lint` çalıştır.
- [x] `pnpm build` çalıştır.
- [x] Varsa mevcut lint/build uyarılarını migration öncesi baseline olarak not al.

### Faz 0 Notları

- Node: `v24.16.0`
- pnpm: `11.5.1`
- Baseline `pnpm lint`: başarılı, mevcut 4 warning var.
- Baseline `pnpm build`: başarılı.
- Next baseline warning: `middleware` file convention deprecated, `proxy` öneriliyor.

### Kabul Kriterleri

- [x] Migration öncesi proje durumu belgelenmiş olmalı.
- [x] Mevcut build hatası varsa v3 geçişinden bağımsız olduğu anlaşılmalı.
- [x] Kullanıcı değişiklikleri ezilmemeli.

---

## Faz 1 — Dependency Geçişi

Amaç: `poyraz-ui` paketini v3’e almak ve lockfile’ı temiz güncellemek.

### Görevler

- [x] `package.json` içindeki `poyraz-ui` sürümünü `^3.0.0` yap.
- [x] `pnpm install` ile `pnpm-lock.yaml` güncelle.
- [x] `pnpm-lock.yaml` içinde `poyraz-ui@3.0.0` çözümlendiğini doğrula.
- [x] `package.json` içine gerekirse Node engine eklemeyi değerlendir:
  - `node >=22`
  - Bu değişiklik Vercel deploy ile uyumlu olmalı.
- [x] Vercel tarafında Node 22 kullanılacağından emin olmak için proje ayarı/notu ekle.

### Faz 1 Notları

- `poyraz-ui`: `^2.0.1` → `^3.0.0`
- `package.json` içine `engines.node: >=22` eklendi.
- `pnpm install` sonrası lockfile `poyraz-ui@3.0.0` olarak çözümlendi.
- pnpm, güvenlik politikası nedeniyle `pnpm-workspace.yaml` içine `minimumReleaseAgeExclude: poyraz-ui@3.0.0` ekledi.

### Kabul Kriterleri

- [x] `package.json` v3 dependency kullanıyor.
- [x] Lockfile v3’e güncellendi.
- [x] Paket kurulumu temiz tamamlandı.
- [x] Kullanılmayan geçici paket/alias eklenmedi.

---

## Faz 2 — Import ve API Uyumluluk Kontrolü

Amaç: v3 sonrası TypeScript/Next build seviyesinde kırılan import veya prop kullanımlarını düzeltmek.

### Kontrol Edilecek Import Grupları

- [x] `poyraz-ui/atoms`
  - `Avatar`
  - `Badge`
  - `Button`
  - `Card`
  - `Input`
  - `Separator`
  - `Skeleton`
  - `Typography`
- [x] `poyraz-ui/molecules`
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
- [x] `poyraz-ui/organisms`
  - `AnnouncementBar`
- [x] `poyraz-ui/themes`
  - `poyrazLightTheme`
  - `poyrazDarkTheme`
  - `poyrazThemes`

### Görevler

- [x] `rg "poyraz-ui"` ile tüm kullanım noktalarını tekrar listele.
- [x] `pnpm lint` çalıştır.
- [x] `pnpm build` çalıştır.
- [x] Kırılan import varsa en küçük değişiklikle düzelt.
- [x] Kırılan prop varsa component davranışını koruyarak v3 API’ya uyarla.
- [x] Gereksiz refactor yapma.

### Faz 2 Notları

- V3 sonrası import/API kırığı çıkmadı.
- `pnpm lint`: başarılı, baseline ile aynı 4 warning devam ediyor.
- `pnpm build`: başarılı.
- Bu fazda component kullanımını veya layout classlarını değiştirmeye gerek kalmadı.

### Kabul Kriterleri

- [x] Tüm importlar v3 exportlarıyla uyumlu.
- [x] Type/build hatası kalmadı.
- [x] Sayfa düzenini etkileyecek gereksiz class değişikliği yapılmadı.

---

## Faz 3 — Global CSS ve Token Uyumluluğu

Amaç: v3 preset tokenlarının portfolio genel görünümünü bozmadığını doğrulamak.

### Görevler

- [x] `app/globals.css` içindeki import sırasını koru:
  - `@import "tailwindcss";`
  - `@import "poyraz-ui/preset.css";`
- [x] `poyraz-ui` dist utility classlarının tüketici build/dev tarafında tarandığını garantiye al.
  - `@source "../node_modules/poyraz-ui/dist";`
- [x] Custom utility’leri kontrol et:
  - `animate-marquee`
  - `pause-on-hover`
- [x] `bg-background`, `text-foreground`, `border-border`, `muted-foreground` gibi semantic tokenların v3 karşılığını görsel olarak kontrol et.
- [x] Light mode temel kontrastı kontrol et.
- [x] Dark mode aktif değilse migration kapsamında dark mode ekleme.

### Kabul Kriterleri

- [x] Global CSS minimal kaldı.
- [x] Tailwind v4 compile sorunu yok.
- [x] Semantic tokenlar sayfa genelinde okunabilir.

### Faz 3 Ara Notları

- `ArticleCard` ve `TestimonialCard` içindeki avatar görselleri npm paketinin template classlarına (`size-6`, `size-9`) bağlı.
- Avatar boyutlarının bozulması component kullanımından değil, Tailwind source scan/dev cache tarafında `poyraz-ui/dist` classlarının kaçırılmasından kaynaklanabilir.
- Componentlere hardcoded avatar classı eklemek yerine `app/globals.css` içinde paket dist source’u açıkça tanımlandı.
- Bu değişiklik sonrası `pnpm lint` ve `pnpm build` başarılı.
- Build CSS çıktısında `.bg-background`, `.text-foreground`, `.border-border`, `.text-muted-foreground`, `.animate-marquee`, `.pause-on-hover:hover`, `.size-6` ve `.size-9` classları doğrulandı.
- Dark mode/theme switcher bu migration fazında eklenmedi; mevcut light mode korunuyor.

---

## Faz 4 — Layout ve Shell Doğrulaması

Amaç: Site iskeletini korumak.

### Kontrol Edilecek Dosyalar

- [x] `app/[locale]/layout.tsx`
- [x] `components/app-shell.tsx`
- [x] `components/site-navbar.tsx`
- [x] `components/search-command.tsx`
- [x] `components/language-switcher.tsx`

### Görevler

- [x] Locale layout render zincirini kontrol et.
- [x] `AppShell` max width ve spacing değerlerinin değişmediğini doğrula.
- [x] `AnnouncementBar` yüksekliği ve border davranışını kontrol et.
- [x] Desktop navbar hizasını kontrol et.
- [x] Mobile navbar sheet aç/kapat davranışını kontrol et.
- [x] Search command palette aç/kapat davranışını kontrol et.
- [x] Cmd/Ctrl + K shortcut davranışını doğrula.

### Kabul Kriterleri

- [x] Navbar layout bozulmadı.
- [x] Mobile menü çalışıyor.
- [x] Search command çalışıyor.
- [x] Announcement bar sayfa içeriğini itip bozmadı.

### Faz 4 Notları

- Locale layout `NextIntlClientProvider` + `AppShell` zinciriyle korunuyor.
- `AppShell` container yapısı `max-w-4xl`, `px-4 sm:px-6`, `py-4` olarak değişmedi.
- `SiteNavbar` desktop link/search/social dropdown hattı v3 componentleriyle build ve runtime smoke testinden geçti.
- `SearchCommand` click ile açılıyor, query yazınca sonuç üretiyor ve dialog render oluyor.
- Mobile viewport smoke testinde `Menü` sheet dialogu açıldı.
- Runtime smoke sonucu:
  - `navLogo`: başarılı
  - `announcement`: başarılı
  - `commandOpen`: başarılı
  - `commandItems`: 2 sonuç
  - `mobileSheet`: başarılı

---

## Faz 5 — Sayfa Bazlı Görsel Regression Kontrolü

Amaç: Mevcut portfolio düzenini v3 sonrası sayfa sayfa korumak.

### Ana Sayfa

- [x] `HomeHero` kart yerleşimi korunuyor.
- [x] `NewsCard` yükseklikleri düzgün.
- [x] Hero görsel alanı taşmıyor.
- [x] References marquee çalışıyor.
- [x] Sponsor kartları hizalı.

### About

- [x] Eğitim ve deneyim kartları compact kalıyor.
- [x] Sertifika sheet açılıyor.
- [x] Bookmark sheet açılıyor.
- [x] Referans ve gönüllülük link kartları hizalı.

### Blog

- [x] Kategori badge’leri doğru görünüyor.
- [x] Search input focus state rahatsız etmiyor.
- [x] `ArticleCard` grid yüksekliği dengeli.
- [x] Pagination active state düzgün.
- [x] Empty state bozulmadı.

### Blog Detail

- [x] Markdown typography okunabilir.
- [x] Code block görünümü korunuyor.
- [x] Mermaid block loading/error kartları düzgün.
- [x] TOC paneli taşmıyor.
- [x] Progress bar çalışıyor.

### Projects

- [x] `ImageCard` square grid düzenini bozmuyor.
- [x] NPM/GitHub kartları aynı yükseklik mantığında kalıyor.
- [x] Badge ve icon spacingleri düzgün.

### Content

- [x] YouTube cardları düzgün.
- [x] PDF preview kartları düzgün.
- [x] PDF modal açılıyor.
- [x] Prev/Next buttonları çalışıyor.

### Links

- [x] Profile card rounded/secondary görünüm korunuyor.
- [x] `Select` ve `Input` aynı satırda düzgün.
- [x] Link kartları hover’da layout shift yapmıyor.
- [x] Mobile layout taşmıyor.

### Contact / Gallery / Volunteer / References

- [x] Kartlar compact düzeni koruyor.
- [x] Linkler çalışıyor.
- [x] Galeri modal/preview davranışı korunuyor.

### Kabul Kriterleri

- [x] Kritik sayfalarda layout kırığı yok.
- [x] Horizontal overflow yok.
- [x] Component default değişimleri mevcut tasarımı bozmadı.

### Faz 5 Notları

- Production runtime smoke testte şu sayfalar desktop viewportta kontrol edildi:
  - `/tr`
  - `/tr/about`
  - `/tr/blog`
  - `/tr/projects`
  - `/tr/content`
  - `/tr/links`
  - `/tr/contact`
  - `/tr/gallery`
  - `/tr/about/references`
  - `/tr/about/volunteer-community`
- Tüm bu sayfalarda horizontal overflow `0` ölçüldü.
- Oversized rounded avatar/image regression bulunmadı.
- Blog empty state `/tr/blog?search=unlikelymigrationquery` ile doğrulandı.
- Blog detail sayfasında progress bar ve TOC render doğrulandı.
- Gallery preview/modal akışı 15 galeri itemı üzerinden doğrulandı.

---

## Faz 6 — Davranış ve Etkileşim Testleri

Amaç: Sadece build almakla kalmayıp interaktif alanları doğrulamak.

### Manuel Test Listesi

- [x] Navbar linkleri locale-aware route ediyor.
- [x] Language switcher route’u bozmadan locale değiştiriyor.
- [x] Social dropdown açılıyor/kapanıyor.
- [x] Mobile sheet açılıyor/kapanıyor.
- [x] Search palette:
  - [x] Click ile açılıyor.
  - [x] Cmd/Ctrl + K ile açılıyor.
  - [x] Arama filtreliyor.
  - [x] Internal linke gidiyor.
  - [x] External link yeni sekme açıyor.
- [x] About sheetleri açılıyor/kapanıyor.
- [x] Atatürk widget modal açılıyor.
- [x] PDF modal açılıyor.
- [x] PDF modal içinde prev/next çalışıyor.
- [x] Blog pagination linkleri doğru query üretir.

### Kabul Kriterleri

- [x] Temel kullanıcı akışlarında regression yok.
- [x] Focus trap/overlay kilitlenmesi yok.
- [x] Body scroll lock sorun çıkarmıyor.

### Faz 6 Notları

- Navbar `/tr` → `/tr/about` locale-aware route akışı geçti.
- Language switcher `/tr` → `/en` akışı geçti.
- Social dropdown açılışı doğrulandı.
- Search palette:
  - Click ile açıldı.
  - `Ctrl+K` ile açıldı.
  - `blog` araması sonuç döndürdü.
  - Internal item route etti.
  - `GitHub` external item yeni sayfa hedefi olarak `https://github.com/poyrazavsever` açtı.
- About certificate ve bookmark sheetleri açıldı.
- Atatürk widget modalı açıldı.
- Content PDF modalı 27 PDF card button üzerinden doğrulandı; prev/next kontrolleri modalda göründü.
- Blog pagination linkleri `/blog?page=2` ve `/blog?page=3` queryleriyle doğrulandı.
- Mobile sheet açıldığında body scroll lock aktifti.

---

## Faz 7 — Build, Lint ve Release Readiness

Amaç: Deploy edilebilir temiz durum elde etmek.

### Görevler

- [x] `pnpm lint`
- [x] `pnpm build`
- [x] `git diff --check`
- [x] `git status --short`
- [x] Build sırasında Next warningleri not al.
- [x] Vercel Node 22 gereksinimi için deploy notu çıkar.

### Kabul Kriterleri

- [x] Build başarılı.
- [x] Lint başarılı ya da mevcut baseline dışı yeni hata yok.
- [x] Diff sadece migration kapsamındaki dosyalardan oluşuyor.

### Faz 7 Notları

- `pnpm lint`: başarılı. Baseline dışı yeni hata yok; mevcut 4 warning devam ediyor:
  - `components/blog-detail-content.tsx`: `@next/next/no-img-element`
  - `components/links-content.tsx`: `@next/next/no-img-element`
  - `scripts/fetch-medium-all.mjs`: kullanılmayan `mkdirSync`
  - `scripts/test-medium-scraper.mjs`: kullanılmayan `response`
- `pnpm build`: başarılı.
- Next build warning: `middleware` file convention deprecated, `proxy` öneriliyor.
- `git diff --check`: temiz.
- `git status --short`: yalnızca migration kapsamındaki 5 dosya değişti:
  - `package.json`
  - `pnpm-lock.yaml`
  - `pnpm-workspace.yaml`
  - `app/globals.css`
  - `docs/poyraz-ui-v3-migration-plan.md`
- Deploy notu: `poyraz-ui@3.0.0` Node `>=22` istediği için Vercel project Node.js runtime ayarı Node 22+ olmalı. `package.json` içinde `engines.node: >=22` eklendi.

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

- [x] Commitler anlamlı ve review edilebilir.
- [x] Kullanıcı değişiklikleri commit kapsamına yanlışlıkla alınmadı.
- [x] Final notta test sonuçları açıkça yazıldı.

### Faz 8 Notları

- Commitler migration kapsamını okunabilir tutacak şekilde şu mantıkla ayrıldı:
  1. Plan/checklist dokümantasyonu.
  2. `poyraz-ui@3.0.0` dependency ve lockfile geçişi.
  3. Tailwind v4 consumer source scan düzeltmesi.
- Commit kapsamı yalnızca migration için değişen dosyalarla sınırlandı.

---

## Migration Sonrasına Bırakılacak Tasarım İşleri

Bu işler v3 geçişinden sonra ayrıca ele alınmalı:

- [ ] Portfolio genelini daha secondaryy/soft v3 tarzına yaklaştırma.
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
