# Portfolio New

Bu monorepo, Next.js tabanlı portfolyo web uygulaması ve Electron ile geliştirilen veri yönetim panelini bir arada sunar.

## Mimari

```mermaid
flowchart TD
  subgraph Web Uygulama (Next.js)
    A[app/] --> B[components/]
    A --> C[content/]
    A --> D[data/]
    A --> E[public/]
    B --> F[UI Bilesenleri]
    C --> G[Markdown Blog/Podcast]
    D --> H[TypeScript Veri Kaynaklari]
    E --> I[Statik Dosyalar]
  end
  subgraph Electron Data Panel
    J[apps/data-panel/]
    J --> K[renderer/]
    J --> L[main.cjs]
    J --> M[preload.cjs]
    K --> N[configs.js]
    J --> O[assets/]
    J --> P[Electron build scripts]
  end
  J --> D
  J --> E
  J --> C
  J --> Q[Git ile publish]
  Q --> D
  Q --> E
  Q --> C
  A -.-> E
  A -.-> D
  A -.-> C
```

### Klasörler ve Akış

- **app/**: Next.js route ve sayfa yapısı
- **components/**: UI bileşenleri (React)
- **content/**: Markdown içerikler (blog, podcast)
- **data/**: TypeScript veri kaynakları (projeler, referanslar, eğitim vb.)
- **public/**: Statik dosyalar (görseller, pdf, avatar)
- **apps/data-panel/**: Electron tabanlı içerik yönetim paneli
  - **renderer/**: Panelin arayüzü ve form konfigürasyonları
  - **main.cjs**: Electron ana süreç, dosya ve git işlemleri
  - **configs.js**: Koleksiyon ve form alanı yönetimi

### Akış

1. Web uygulaması Next.js ile çalışır, içerik ve veri dosyalarını okur.
2. Electron paneli ile içerik (blog/podcast), veri (data/\*.ts) ve medya (public/) yönetimi yapılır.
3. Panelde yapılan değişiklikler git ile commit/push edilerek yayınlanır.
4. Paneldeki koleksiyonlar ve form alanları configs.js ile özelleştirilebilir.

## Gereksinimler

- Node.js 20+
- pnpm 9+
- Git

## Kurulum

```bash
pnpm install
```

## Frontend Komutları

```bash
pnpm dev        # Next.js local
pnpm lint       # ESLint
pnpm build      # Production build
pnpm start      # Production run
```

## Electron Data Panel Komutları

```bash
pnpm panel:dev            # Electron panel (development)
pnpm panel:clean          # apps/data-panel/dist temizle
pnpm panel:pack           # Paket test (unpacked)
pnpm panel:dist           # Tüm hedefler için distributable
pnpm panel:dist:win       # Windows NSIS installer
pnpm panel:dist:portable  # Windows portable exe
```

## İçerik Kaynakları

- Blog markdown: `content/blog/*.md`
- Podcast markdown:
  - `content/podcasts/yazilim/*.md`
  - `content/podcasts/masa-basi/*.md`
- Site verileri: `data/*.ts`

## Electron Panel Özellikleri

- Blog/podcast içeriği oluşturma-güncelleme-silme
- `data/*.ts` export dizilerini form tabanlı yönetme
- `public/` altına medya yükleme/silme
- `git add + commit + push` ile yayınlama akışı

## Özelleştirme ve Açık Kaynak

### Dashboard tab/field özelleştirme

Paneldeki koleksiyonlar ve form alanları `apps/data-panel/renderer/configs.js` dosyasından yönetilir.

- Yeni tab/collection ekleyebilir
- Alan tiplerini (`text`, `textarea`, `number`, `url`) değiştirebilir
- Kart görünümünü özelleştirebilirsin

### Farklı repo kökü ile çalıştırma

Panel varsayılan olarak bu monorepo kökünü kullanır. Farklı klasör için:

- Çevresel değişken: `PORTFOLIO_WORKSPACE_ROOT`
- veya CLI argüman: `--workspace-root=<path>`

Örnek (PowerShell):

```powershell
$env:PORTFOLIO_WORKSPACE_ROOT = "D:\my-portfolio-repo"
pnpm panel:dev
```

Örnek (packaged exe):

```powershell
.\apps\data-panel\dist\portfolio-data-panel-0.1.0-x64-portable.exe --workspace-root="D:\my-portfolio-repo"
```

Panel başlarken `data`, `public`, `content/blog`, `content/podcasts` klasörlerini doğrular.

### Publish akışını değiştirme

Git publish akışı `apps/data-panel/main.cjs` içindeki `publishChanges` fonksiyonunda yönetilir.
Varsayılan akış:

- `git add data public content`
- Otomatik/manuel commit message
- `git push`
  Branch seçimi, PR tabanlı akış veya sadece commit modları eklenebilir.

## Yayın ve Kontrol Listesi

1. `pnpm lint`
2. `pnpm build`
3. İçerik/veri kontrolü (`content/`, `data/`, `public/`)
4. Electron panel akışı kontrolü (`pnpm panel:dev`)
5. Gerekirse distributable kontrolü (`pnpm panel:pack` / `pnpm panel:dist`)

## Sorun Giderme

### YouTube cookie/SameSite uyarıları

Embed URL'ler `youtube-nocookie.com` formatına çekildi. Bu değişiklik cross-site cookie kaynaklı konsol gürültüsünü azaltır.
Tarayıcı güvenlik politikası nedeniyle bazı 3rd-party loglar tamamen sıfırlanamayabilir; bu durumda uygulama davranışı etkilenmez.
