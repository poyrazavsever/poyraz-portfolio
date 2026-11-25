import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const outputDir = path.resolve("public/linkedin-covers/projects");

const covers = [
  {
    file: "reactive-image.png",
    name: "Reactive Image",
    eyebrow: "REACT &amp; NEXT.JS IMAGE COMPONENT",
    accent: "#8b5cf6",
    soft: "#ede9fe",
    visual: `
      <rect x="552" y="705" width="412" height="262" rx="28" fill="url(#sky)"/>
      <circle cx="897" cy="761" r="31" fill="#fbbf24"/>
      <path d="M565 967 L703 801 L825 967 Z" fill="#64748b"/><path d="M706 967 L865 773 L990 967 Z" fill="#8b5cf6"/>
      <rect x="467" y="750" width="178" height="54" rx="27" fill="white" stroke="#e5e7eb"/><text x="556" y="784" text-anchor="middle" class="chip">hover: zoom</text>
      <rect x="793" y="908" width="181" height="54" rx="27" fill="white" stroke="#e5e7eb"/><text x="884" y="942" text-anchor="middle" class="chip">click: expand</text>`,
    code: `&lt;ReactiveImage variant=&quot;zoom&quot; /&gt;`,
  },
  {
    file: "reactive-switcher.png",
    name: "Reactive Switcher",
    eyebrow: "THEME SWITCHER FOR REACT APPS",
    accent: "#f97316",
    soft: "#ffedd5",
    visual: `
      <rect x="410" y="711" width="564" height="230" rx="32" fill="white"/>
      <path d="M692 711 H942 A32 32 0 0 1 974 743 V909 A32 32 0 0 1 942 941 H692 Z" fill="#111827"/>
      <text x="533" y="813" text-anchor="middle" class="modeIcon" fill="#f59e0b">☀</text><text x="533" y="863" text-anchor="middle" class="mode" fill="#111827">Light</text>
      <text x="850" y="813" text-anchor="middle" class="modeIcon" fill="#c4b5fd">☾</text><text x="850" y="863" text-anchor="middle" class="mode" fill="white">Dark</text>
      <rect x="613" y="786" width="158" height="76" rx="38" fill="#f97316"/><circle cx="728" cy="824" r="30" fill="white"/>`,
    code: `&lt;ThemeSwitcher defaultMode=&quot;system&quot; /&gt;`,
  },
];

await mkdir(outputDir, { recursive: true });

for (const cover of covers) {
  const svg = `
    <svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="85%" cy="8%" r="52%"><stop stop-color="${cover.soft}"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#bfdbfe"/><stop offset=".56" stop-color="#e0f2fe"/><stop offset=".57" stop-color="#dcfce7"/></linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#334155" flood-opacity=".17"/></filter>
        <style>
          .brand{font:800 26px Arial,'Segoe UI',sans-serif;fill:#171923}.eyebrow{font:800 24px Arial,'Segoe UI',sans-serif;letter-spacing:2px;fill:${cover.accent}}.title{font:800 84px Arial,'Segoe UI',sans-serif;letter-spacing:-4px;fill:#171923}.subtitle{font:30px Arial,'Segoe UI',sans-serif;fill:#5f6673}.chip{font:750 19px Arial,'Segoe UI',sans-serif;fill:#171923}.mode{font:750 22px Arial,'Segoe UI',sans-serif}.modeIcon{font:54px Arial,'Segoe UI Symbol',sans-serif}.badge{font:850 20px Arial,'Segoe UI',sans-serif;letter-spacing:1px;fill:${cover.accent}}.code{font:21px Consolas,monospace;fill:#e5e7eb}
        </style>
      </defs>
      <rect width="1080" height="1080" fill="#fff"/><rect width="1080" height="1080" fill="url(#glow)"/>
      <rect x="76" y="76" width="38" height="38" rx="12" fill="#e83035"/><text x="95" y="103" text-anchor="middle" font-family="Arial" font-size="20" font-weight="800" fill="white">P</text><text x="130" y="104" class="brand">Poyraz Avsever</text>
      <rect x="823" y="76" width="181" height="48" rx="12" fill="none" stroke="${cover.accent}" stroke-width="2"/><text x="914" y="107" text-anchor="middle" class="badge">NPM PACKAGE</text>
      <text x="76" y="244" class="eyebrow">${cover.eyebrow}</text><text x="76" y="355" class="title">${cover.name}</text>
      <text x="76" y="418" class="subtitle">Production-ready, lightweight and designed</text><text x="76" y="461" class="subtitle">for a clean developer experience.</text>
      <rect x="76" y="626" width="928" height="380" rx="36" fill="#fff" stroke="#dfe3ea" filter="url(#shadow)"/>
      <rect x="122" y="894" width="440" height="66" rx="15" fill="#111827"/><text x="145" y="936" class="code">${cover.code}</text>
      ${cover.visual}
    </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(outputDir, cover.file));
}
