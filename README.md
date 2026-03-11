# Portfolio New

Poyraz Avsever icin hazirlanmis, `Next.js + poyraz-ui` tabanli portfolyo ve ayni repoda yer alan Electron tabanli veri yonetim paneli.

## Monorepo Yapisi

```text
.
|- app/                  # Next.js route'lari
|- components/           # UI component'leri
|- content/              # Markdown icerikleri (blog, podcast)
|- data/                 # TypeScript veri kaynaklari
|- public/               # Statik dosyalar
|- apps/
|  |- data-panel/        # Electron dashboard (icerik yonetimi + publish)
```

## Gereksinimler

- Node.js 20+
- pnpm 9+
- Git

## Kurulum

```bash
pnpm install
```

## Frontend Komutlari

```bash
pnpm dev        # Next.js local
pnpm lint       # ESLint
pnpm build      # Production build
pnpm start      # Production run
```

## Electron Data Panel Komutlari

```bash
pnpm panel:dev            # Electron panel (development)
pnpm panel:clean          # apps/data-panel/dist temizle
pnpm panel:pack           # Paket test (unpacked)
pnpm panel:dist           # Tum hedefler icin distributable
pnpm panel:dist:win       # Windows NSIS installer
pnpm panel:dist:portable  # Windows portable exe
```

## Icerik Kaynaklari

- Blog markdown: `content/blog/*.md`
- Podcast markdown:
  - `content/podcasts/yazilim/*.md`
  - `content/podcasts/masa-basi/*.md`
- Site verileri: `data/*.ts`

## Electron Panel Neleri Yapar?

- Blog/podcast icerigi olusturma-guncelleme-silme
- `data/*.ts` export dizilerini form tabanli yonetme
- `public/` altina medya yukleme/silme
- `git add + commit + push` ile yayinlama akisi

## Open-Source ve Ozellestirme Rehberi

### 1) Dashboard tab/field ozellestirme

Paneldeki koleksiyonlar ve form alanlari su dosyadan yonetilir:

- `apps/data-panel/renderer/configs.js`

Buradan:

- yeni tab/collection ekleyebilir,
- alan tiplerini (`text`, `textarea`, `number`, `url`) degistirebilir,
- kart gorunumunu (`card`) ozellestirebilirsin.

### 2) Farkli repo koku ile calistirma

Panel varsayilan olarak bu monorepo kokunu kullanir. Farkli klasor icin:

- Cevresel degisken: `PORTFOLIO_WORKSPACE_ROOT`
- veya CLI arguman: `--workspace-root=<path>`

Ornek (PowerShell):

```powershell
$env:PORTFOLIO_WORKSPACE_ROOT = "D:\my-portfolio-repo"
pnpm panel:dev
```

Ornek (packaged exe):

```powershell
.\apps\data-panel\dist\portfolio-data-panel-0.1.0-x64-portable.exe --workspace-root="D:\my-portfolio-repo"
```

Panel baslarken `data`, `public`, `content/blog`, `content/podcasts` klasorlerini dogrular.

### 3) Publish akisini degistirme

Git publish akisi `apps/data-panel/main.cjs` icindeki `publishChanges` fonksiyonunda.
Varsayilan akista:

- `git add data public content`
- otomatik/manuel commit message
- `git push`

Istersen branch secimi, PR tabanli akış, veya sadece commit modlari ekleyebilirsin.

## Release Checklist

1. `pnpm lint`
2. `pnpm build`
3. Icerik/veri kontrolu (`content/`, `data/`, `public/`)
4. Electron panel akisi kontrolu (`pnpm panel:dev`)
5. Gerekirse distributable kontrolu (`pnpm panel:pack` / `pnpm panel:dist`)

## Troubleshooting

### YouTube cookie/SameSite uyarilari

Embed URL'ler `youtube-nocookie.com` formatina cekildi. Bu degisiklik cross-site cookie kaynakli konsol gurultusunu azaltir.
Tarayici guvenlik politikasi nedeniyle bazi 3rd-party loglar tamamen sifirlanamayabilir; bu durumda uygulama davranisi etkilenmez.
