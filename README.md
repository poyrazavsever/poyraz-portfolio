# Portfolio New

Bu monorepo, Next.js tabanlı portfolyo web uygulaması ve Electron ile geliştirilen veri yönetim panelini bir arada sunar.

## Mimari

```mermaid
flowchart TD
  subgraph WebUygulama["Web Uygulama (Next.js)"]
    A[app/] --> B[components/]
    A --> C[content/]
    A --> D[data/]
    A --> E[public/]
    B --> F[UI Bileşenleri]
    C --> G[Markdown Blog/Podcast]
    D --> H[TypeScript Veri Kaynakları]
    E --> I[Statik Dosyalar]
  end

  subgraph ElectronDataPanel["Electron Data Panel"]
    J[apps/data-panel/] --> K[renderer/]
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
```

### Klasörler ve Akış

- `app/`: Next.js route ve sayfa yapısı
- `components/`: UI bileşenleri (React)
- `content/`: Markdown içerikler (blog, podcast)
- `data/`: TypeScript veri kaynakları (projeler, referanslar, eğitim vb.)
- `public/`: Statik dosyalar (görseller, PDF, avatar)
- `apps/data-panel/`: Electron tabanlı içerik yönetim paneli
  - `renderer/`: Panelin arayüzü ve form konfigürasyonları
  - `main.cjs`: Electron ana süreç, dosya ve git işlemleri
  - `configs.js`: Koleksiyon ve form alanı yönetimi

### Akış

1. Web uygulaması Next.js ile çalışır, içerik ve veri dosyalarını okur.
2. Electron paneli ile içerik (blog/podcast), veri (`data/*.ts`) ve medya (`public/`) yönetimi yapılır.
3. Panelde yapılan değişiklikler git ile commit/push edilerek yayınlanır.
4. Paneldeki koleksiyonlar ve form alanları `configs.js` ile özelleştirilebilir.

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
pnpm dev
pnpm lint
pnpm build
pnpm start
```

## Electron Data Panel Komutları

```bash
pnpm panel:dev
pnpm panel:clean
pnpm panel:pack
pnpm panel:dist
pnpm panel:dist:win
pnpm panel:dist:portable
```

## İçerik Kaynakları

- Blog markdown: `content/blog/*.md`
- Podcast markdown:
  - `content/podcasts/yazilim/*.md`
  - `content/podcasts/masa-basi/*.md`
- Site verileri: `data/*.ts`
- RSS feed: `/rss.xml` (blog yazılarından otomatik üretilir)

## Electron Panel Özellikleri

- Blog/podcast içeriği oluşturma, güncelleme, silme
- `data/*.ts` export dizilerini form tabanlı yönetme
- `public/` altına medya yükleme/silme
- `git add + commit + push` ile yayınlama akışı

## Özelleştirme ve Açık Kaynak

### Dashboard tab/field özelleştirme

Paneldeki koleksiyonlar ve form alanları `apps/data-panel/renderer/configs.js` dosyasından yönetilir.

- Yeni tab/collection ekleyebilirsin
- Alan tiplerini (`text`, `textarea`, `number`, `url`) değiştirebilirsin
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
- Otomatik veya manuel commit message
- `git push`

İstersen branch seçimi, PR tabanlı akış veya sadece commit modu ekleyebilirsin.

## Yayın ve Kontrol Listesi

1. `pnpm lint`
2. `pnpm build`
3. İçerik/veri kontrolü (`content/`, `data/`, `public/`)
4. Electron panel akışı kontrolü (`pnpm panel:dev`)
5. Gerekirse distributable kontrolü (`pnpm panel:pack` / `pnpm panel:dist`)

## Sorun Giderme

### YouTube cookie/SameSite uyarıları

Embed URL'ler `youtube-nocookie.com` formatına çekildi. Bu değişiklik cross-site cookie kaynaklı konsol gürültüsünü azaltır.
Tarayıcı güvenlik politikası nedeniyle bazı üçüncü parti loglar tamamen sıfırlanamayabilir; bu durumda uygulama davranışı etkilenmez.
