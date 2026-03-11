# Portfolio Data Panel (Electron)

Bu uygulama `data/`, `content/` ve `public/` klasorlerini yonetmek icin hazirlanmis Electron dashboard'dur.

## Scripts

```bash
pnpm run clean
pnpm run dev
pnpm run pack
pnpm run dist
pnpm run dist:win
pnpm run dist:portable
```

## Workspace Root Secimi

Panel varsayilan olarak monorepo kokunu kullanir (`../../`).
Farkli klasor ile calistirmak icin:

- Environment variable: `PORTFOLIO_WORKSPACE_ROOT`
- CLI arg: `--workspace-root=<path>`

PowerShell ornegi:

```powershell
$env:PORTFOLIO_WORKSPACE_ROOT = "D:\my-portfolio-repo"
pnpm run dev
```

Portable EXE ornegi:

```powershell
.\dist\portfolio-data-panel-0.1.0-x64-portable.exe --workspace-root="D:\my-portfolio-repo"
```

## Ozellestirme

Form ve tab yapisi:

- `renderer/configs.js`

Publish akisi:

- `main.cjs` icindeki `publishChanges` fonksiyonu.
