---
title: "Fareyi Takip Eden AI Avatar Nasıl Yapılır?"
slug: "poyraz-cursor-portrait"
excerpt: "Wiro AI üzerinde MiniMax H3 ile ürettiğim 1:1 avatar videosunu, promptlardan FFmpeg optimizasyonuna ve React entegrasyonuna kadar adım adım oluşturun."
coverImage: "/animation-sources/poyraz-cursor-portrait/avatar-mouse-follow.gif"
platform: "Web"
tools:
  - "Wiro AI"
  - "MiniMax H3"
  - "FFmpeg"
  - "React"
date: "2026-08-29"
author: "Poyraz Avsever"
lang: "tr"
---

Bu efektte sağ alttaki portre normal bir video gibi oynatılmıyor. Video duraklatılmış halde tutuluyor; farenin ekrandaki dikey konumu videonun zaman çizelgesine bağlanıyor. Fare aşağıdayken portre aşağı-sola, ortadayken yatay-sola, yukarıdayken yukarı-sola bakıyor.

Videoyu **Wiro AI** üzerinden **MiniMax H3** modeliyle, **1:1 kare formatta** ürettim. Sonrasında videoyu FFmpeg ile sık ileri-geri sarılmaya uygun hale getirip React içinde `currentTime` üzerinden kontrol ettim.

Bu sayfadaki promptları doğrudan kopyalayabilir ve kendi portreniz, avatarınız veya marka karakteriniz için uyarlayabilirsiniz.

## Promptlardaki `[[...]]` alanları nasıl kullanılır?

Promptlarda gördüğünüz çift köşeli parantezler doldurulması gereken değişken alanlardır. Örneğin `[[OUTFIT]]` ifadesini promptta bırakmak yerine `plain red polo shirt` gibi kendi değerinizi yazmalısınız.

| Değişken | Ne yazılmalı? | Bu projedeki değer |
| --- | --- | --- |
| `[[SUBJECT]]` | Kişi veya karakter tanımı | 20 yaşında erkek içerik üreticisi |
| `[[OUTFIT]]` | Kıyafet | düz kırmızı polo tişört |
| `[[BACKGROUND_COLOR]]` | Düz arka plan | saf beyaz, `#FFFFFF` |
| `[[EXPRESSION]]` | Sabit yüz ifadesi | doğal ve nötr |
| `[[ASPECT_RATIO]]` | Üretim oranı | `1:1` |
| `[[HEAD_DIRECTION]]` | Başın sabit yatay yönü | yaklaşık 60 derece sola |
| `[[VIDEO_PATH]]` | Web video yolu | `/media/cursor-portrait/poyraz-bottom-right.mp4` |
| `[[POSTER_PATH]]` | Poster yolu | `/media/cursor-portrait/poyraz-bottom-right-poster.webp` |
| `[[FRAMEWORK]]` | Kullanılan teknoloji | Next.js, React, TypeScript |
| `[[STYLING_SYSTEM]]` | Stil sistemi | Tailwind CSS |

Bir promptu kullanmadan önce içindeki tüm `[[...]]` alanlarını aratın. Projeniz için karşılığı olmayan bir değişken kalmamalı.

## Sistem nasıl çalışıyor?

Tek bir videoyu gerçek zamanlı kontrol etmenin en stabil yolu videoyu sürekli oynatmak değil, onu kısa bir **hareket plakası** olarak kullanmaktır.

Bu uygulamadaki dört saniyelik zaman çizelgesi:

1. `0.00–0.25`: aşağı-sola bakış pozu sabit tutulur.
2. `0.25–3.75`: bakış aşağıdan yukarıya doğru ilerler.
3. Yaklaşık `2.00`: sola doğru nötr ve yatay bakış oluşur.
4. `3.75–4.00`: yukarı-sola bakış pozu sabit tutulur.

Fare aşağı-yukarı hareket ettikçe video bu aktif aralıkta ileri veya geri sarılır. Yatay fare konumu bu sürümde kullanılmaz; böylece yapay zeka videosunda bulunmayan ikinci bir hareket ekseni uydurulmaz.

> Tek video yalnızca üretilmiş hareket ekseninde güvenilir sonuç verir. Gerçek yatay ve dikey takip gerekiyorsa farklı yönlere ait tutarlı karelerden oluşan 3×3 bir sistem daha doğru yaklaşımdır.

## Üretim akışı

1. Net, önden çekilmiş bir referans fotoğraf seçin.
2. Kimliği, kıyafeti, ışığı ve beyaz arka planı sabitleyen 1:1 master kareyi hazırlayın.
3. Master kareyi Wiro AI'a yükleyip MiniMax H3 ile hareket videosunu üretin.
4. Kimlik kayması, kamera hareketi veya arka plan titreşimi varsa onarım promptuyla yeniden üretin.
5. Videoyu 720×720 H.264 web asset'ine dönüştürün.
6. Videonun `currentTime` değerini farenin Y konumuna bağlayın.
7. Masaüstü, reduced-motion, koyu tema ve mobil davranışlarını ayrı ayrı test edin.

## 1. Master kare promptu

Referans fotoğrafı kullandığınız görsel üretim aracına yükleyin. Aşağıdaki promptta önce tüm `[[...]]` alanlarını değiştirin.

```prompt
Use the uploaded image only as the identity reference for [[SUBJECT]].
Create a new photorealistic, production-ready 1:1 studio portrait for an
interactive website animation. Preserve the exact recognizable identity,
facial proportions, skin tone, hairstyle, hairline, eyebrows, eye shape,
nose, lips, jawline, age, and overall appearance.

Composition:
- Square [[ASPECT_RATIO]] frame.
- Medium close-up from [[CROP_POINT]] upward.
- Keep the full head, hair, ears, neck, shoulders, and visible upper torso
  safely inside the frame.
- Keep comfortable negative space around the hair and shoulders.
- The shoulders remain stable and the head is turned approximately
  [[HEAD_DIRECTION]].
- Expression: [[EXPRESSION]].
- Outfit: [[OUTFIT]].

Background and light:
- Perfectly flat, seamless [[BACKGROUND_COLOR]] background.
- No gradient, texture, horizon line, furniture, props, text, watermark,
  logo, border, or visible cast shadow.
- Soft, bright studio lighting with natural skin texture.
- Keep hair, ears, face, shoulders, and clothing edges clean.

Continuity constraints:
- Do not beautify, age, de-age, stylize, or reinterpret the person.
- Do not change facial hair, outfit, accessories, body proportions, or light.
- Do not crop the hair, ears, shoulders, or upper torso.
- Generate one person and one clean master frame only.
```

Bu uygulama için kullandığım değerler:

```text
[[SUBJECT]] = a young male software creator
[[ASPECT_RATIO]] = 1:1
[[CROP_POINT]] = mid-torso
[[HEAD_DIRECTION]] = 60 degrees toward screen-left
[[EXPRESSION]] = calm, natural, neutral expression
[[OUTFIT]] = plain red polo shirt
[[BACKGROUND_COLOR]] = pure white (#FFFFFF)
```

## 2. Wiro AI / MiniMax H3 video promptu

Master kareyi Wiro AI üzerinde MiniMax H3 modeline referans olarak verin. Bu promptun amacı sinematik bir sahne değil, kare kare durdurulup sarılabilecek teknik bir hareket üretmektir.

```prompt
Animate the uploaded 1:1 master frame into a precise four-second motion-control
plate for an interactive website portrait. Preserve the exact identity, face,
hairstyle, red polo shirt, body proportions, lighting, colors, square framing,
and pure white background from the reference image.

Output:
- Duration: exactly 4.0 seconds.
- Aspect ratio: 1:1.
- One continuous shot with a completely locked, eye-level camera.
- No zoom, crop change, pan, tilt, dolly, reframing, or camera shake.
- No speech and no audio-dependent movement.

Head direction:
- Keep the subject turned approximately 60 degrees toward screen-left for
  the entire video.
- The horizontal head angle must not change.
- Never turn toward the camera and never rotate into a full side profile.

Exact motion timeline:
- 0.00–0.25 seconds: hold a clean down-left gaze and head-tilt pose.
- 0.25–3.75 seconds: move smoothly and continuously from down-left to up-left.
- At exactly 2.00 seconds: reach a neutral horizontal-left gaze.
- 3.75–4.00 seconds: hold the final up-left pose perfectly still.

Movement rules:
- Only the eyes and the minimum natural head/neck tilt required for the
  vertical gaze may move.
- Shoulders, torso, arms, clothing, body position, head scale, and horizontal
  head angle remain fixed.
- Keep the mouth closed and motionless.
- No talking, smiling, eyebrow movement, nodding, leaning, body sway,
  breathing motion, or secondary gesture.
- Movement must be slow, linear, anatomically coherent, and usable when
  scrubbed both forward and backward.

Continuity:
- Preserve the same recognizable face in every frame.
- Keep hair volume, hairline, ears, nose, jaw, skin texture, clothing folds,
  and lighting stable.
- No face drift, morphing, warped anatomy, flicker, or changing expression.
- Keep the background perfectly uniform pure white (#FFFFFF) in every frame.

This is not a cinematic scene. It is a deterministic frame-scrubbing asset
for a website and every intermediate frame must work as a clean still image.
```

MiniMax H3 çıktısını değerlendirirken yalnızca ilk ve son kareye bakmayın. Orta karede yüzün, kulağın, saç çizgisinin ve tişört kenarlarının bozulmadığını da kontrol edin.

## 3. Sorunlu videoyu yeniden üretme promptu

İlk üretimde yüz kayması veya kamera hareketi varsa problemi `[[OBSERVED_PROBLEMS]]` alanına açıkça yazın.

```prompt
Regenerate this clip as a strict technical motion plate. The previous result
is unusable because: [[OBSERVED_PROBLEMS]].

Lock every property except the intended vertical gaze and head-tilt movement:
- preserve the exact identity and facial proportions in every frame;
- keep the horizontal head angle fixed at approximately 60 degrees left;
- fixed camera, crop, focal length, scale, head position, shoulders, torso,
  arms, outfit, expression, lighting, and background;
- one slow linear movement from down-left to up-left;
- neutral horizontal-left pose at exactly two seconds;
- closed and motionless mouth;
- no speech, smile, blink during movement, eyebrow motion, body sway,
  zoom, parallax, lighting shift, background flicker, face morphing,
  hair change, ear deformation, or new objects;
- perfectly uniform pure white (#FFFFFF) background.

This clip will be paused and scrubbed frame by frame. Every intermediate frame
must remain anatomically coherent and visually consistent with the reference.
```

Örnek problem tanımı:

```text
[[OBSERVED_PROBLEMS]] = the face changes near the final pose, the shoulders
move with the head, and the white background flickers between frames
```

## 4. Videoyu web için hazırlama

Yapay zeka videosu doğrudan tarayıcıya konabilir; ancak sık `currentTime` güncellemelerinde codec ve keyframe aralığı büyük fark yaratır. Ben çıktıyı 720×720, 30 FPS, sessiz H.264 ve her kare keyframe olacak şekilde hazırladım.

```bash
ffmpeg -i INPUT.mp4 \
  -vf "scale=720:720:force_original_aspect_ratio=decrease,pad=720:720:(ow-iw)/2:(oh-ih)/2:color=white,fps=30" \
  -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 1 -keyint_min 1 -sc_threshold 0 -movflags +faststart \
  public/media/cursor-portrait/poyraz-bottom-right.mp4
```

Buradaki kritik tercihler:

- `-an`: sesi tamamen kaldırır.
- `yuv420p`: Safari ve Chromium uyumluluğunu artırır.
- `faststart`: MP4 metadata'sını dosyanın başına taşır.
- `-g 1`: her kareyi keyframe yaparak sık seek işlemini hızlandırır.
- `scale + pad`: görüntüyü esnetmeden 1:1 beyaz yüzeyde tutar.

### Medya optimizasyonu için coding-agent promptu

```prompt
Projeye eklediğim [[INPUT_VIDEO_PATH]] videosunu fare konumuyla ileri ve geri
sarılacak bir web hareket plakası olarak hazırla.

Kaynak dosyaya dokunma veya üzerine yazma.

Hedefler:
- Video: [[VIDEO_PATH]]
- Poster: [[POSTER_PATH]]
- Tam süre: 4.00 saniye
- Başlangıç pozu: 0.00–0.25
- Aktif hareket: 0.25–3.75
- Son poz: 3.75–4.00
- Çözünürlük: 720×720
- FPS: 30
- Codec: H.264 MP4, libx264, yuv420p
- Ayarlar: preset slow, CRF 20, faststart, ses yok
- Sık currentTime değişimi için her kare veya en fazla iki karede bir keyframe

En-boy oranını bozma. Gerekirse #FFFFFF padding kullan. Saç, yüz, kulak,
omuz veya kıyafeti kesme. İşlemden sonra süre, çözünürlük, FPS, codec ve dosya
boyutunu doğrula; ilk, orta ve son kareyi görsel olarak kontrol et. Alakasız
proje dosyalarına dokunma.
```

## 5. Mouse Y değerini video zamanına eşleme

Farenin Y konumu ekranın üstünde `0`, altında `window.innerHeight` değerindedir. Önce bu değeri ters çevirip `0–1` aralığına sıkıştırıyorum, ardından videonun aktif zaman aralığına map ediyorum.

```ts
const TOTAL_DURATION = 4;
const ACTIVE_START = 0.25;
const ACTIVE_END = 3.75;
const DEFAULT_TIME = 2;
const SMOOTHING = 0.12;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function mapPointerYToTime(pointerY: number, viewportHeight: number) {
  if (viewportHeight <= 0) return DEFAULT_TIME;

  const progress = clamp(1 - pointerY / viewportHeight, 0, 1);
  return ACTIVE_START + progress * (ACTIVE_END - ACTIVE_START);
}
```

Eşleme sonucu:

| Fare konumu | Progress | Video zamanı | Bakış |
| --- | ---: | ---: | --- |
| Ekranın altı | `0` | `0.25` | aşağı-sola |
| Ekranın ortası | `0.5` | `2.00` | yatay-sola |
| Ekranın üstü | `1` | `3.75` | yukarı-sola |

`pointerX` bu hesaplamaya hiç girmez. Fare yalnızca sağa veya sola hareket ettiğinde video karesi değişmez.

## 6. Akıcı scrub için React yaklaşımı

Her pointer event'inde React state güncellemek yerine yüksek frekanslı değerleri ref içinde tutun. Tek bir `requestAnimationFrame` döngüsü mevcut zamanı hedef zamana yaklaştırsın.

```ts
const pointerYRef = useRef<number | null>(null);
const targetTimeRef = useRef(DEFAULT_TIME);
const currentTimeRef = useRef(DEFAULT_TIME);
const rafIdRef = useRef<number | null>(null);

function animate() {
  const difference = targetTimeRef.current - currentTimeRef.current;
  currentTimeRef.current += difference * SMOOTHING;

  const video = videoRef.current;
  if (video && Math.abs(video.currentTime - currentTimeRef.current) > 1 / 120) {
    video.currentTime = currentTimeRef.current;
  }

  if (Math.abs(difference) > 0.002) {
    rafIdRef.current = requestAnimationFrame(animate);
  } else {
    rafIdRef.current = null;
  }
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType !== "mouse") return;

  pointerYRef.current = event.clientY;
  targetTimeRef.current = mapPointerYToTime(
    event.clientY,
    window.innerHeight,
  );

  if (rafIdRef.current === null) {
    rafIdRef.current = requestAnimationFrame(animate);
  }
}
```

Üretim kodunda ayrıca metadata yüklenmesini, video priming ihtiyacını, sekme görünürlüğünü ve listener temizliğini yönetmek gerekir.

## 7. Component'i kodlatmak için hazır prompt

Aşağıdaki prompt Next.js, React veya benzer bir frontend projesinde coding agent ile kullanılabilir. Köşeli alanları kendi projenize göre doldurun.

```prompt
Mevcut [[FRAMEWORK]] projesine, ekranın sağ altında duran ve farenin yalnızca
Y konumunu takip eden tekrar kullanılabilir `PointerPortraitFollower` component'i
ekle. Stil sistemi: [[STYLING_SYSTEM]].

Asset'ler:
- Video: [[VIDEO_PATH]]
- Poster: [[POSTER_PATH]]

Sistem sabitleri:
- TOTAL_DURATION = 4
- ACTIVE_START = 0.25
- ACTIVE_END = 3.75
- DEFAULT_TIME = 2
- SMOOTHING = 0.12

Davranış:
- Video normal şekilde oynatılmayacak; paused tutulacak.
- Yalnızca pointerY kullan. pointerX zamanlamayı hiçbir şekilde etkilemesin.
- progress = clamp(1 - pointerY / window.innerHeight, 0, 1)
- targetTime = ACTIVE_START + progress * (ACTIVE_END - ACTIVE_START)
- Global pointermove listener kullan fakat pointer event başına React state
  güncelleme.
- pointerY, targetTime ve currentTime değerlerini ref içinde tut.
- Tek requestAnimationFrame döngüsünde damping uygula.
- Seek işlemlerini yaklaşık 30–60 Hz ile sınırla ve çok küçük farklarda atla.
- Fare pencere dışına çıktığında veya pencere odağı kaybolduğunda 2.00 saniyelik
  nötr poza yumuşakça dön.

Video:
- muted, playsInline, preload="auto", controls yok, autoplay yok
- loadedmetadata sonrasında 2.00 saniyeye getir
- İlk gerçek pointer hareketinde gerekiyorsa muted olarak kısa prime et ve pause et
- Asset hatasında kırık video ikonu yerine poster göster

Yerleşim:
- position: fixed; right: [[RIGHT_OFFSET]]; bottom: [[BOTTOM_OFFSET]]
- width: [[DESKTOP_WIDTH]]; aspect-ratio: 1 / 1; z-index: [[Z_INDEX]]
- object-fit: contain; background: [[BACKGROUND_COLOR]]
- pointer-events: none; user-select: none; aria-hidden: true
- Border, radius, shadow veya yatay aynalama ekleme

Responsive:
- pointer: coarse veya dar ekranda animasyonu kapat
- Touch hareketlerini fare gibi yorumlama
- prefers-reduced-motion durumunda poster göster veya component'i gizle
- CTA, link ve menülerin tıklanmasını engelleme

Yaşam döngüsü:
- SSR sırasında window/document kullanma
- visibilitychange ile görünmeyen sekmede RAF ve seek'i durdur
- pointermove, pointerleave, blur, resize, visibilitychange ve RAF temizliğini
  unmount sırasında eksiksiz yap
- Aynı anda birden fazla RAF döngüsü başlatma

Mapping ve clamp işlemlerini saf TypeScript yardımcılarına ayır. Projede test
altyapısı varsa alt, orta, üst ve clamp sınırları için test ekle. Ağır animasyon
kütüphanesi ekleme. Build, typecheck, lint ve mevcut testleri çalıştır.
```

Bu uygulamadaki örnek değişkenler:

```text
[[FRAMEWORK]] = Next.js App Router, React, TypeScript
[[STYLING_SYSTEM]] = Tailwind CSS and Poyraz UI
[[VIDEO_PATH]] = /media/cursor-portrait/poyraz-bottom-right.mp4
[[POSTER_PATH]] = /media/cursor-portrait/poyraz-bottom-right-poster.webp
[[RIGHT_OFFSET]] = 24px
[[BOTTOM_OFFSET]] = 0px
[[DESKTOP_WIDTH]] = clamp(110px, 11vw, 170px)
[[Z_INDEX]] = 40
[[BACKGROUND_COLOR]] = #FFFFFF
```

## 8. Mobil, erişilebilirlik ve fallback

Bu efekt masaüstünde fare ile anlam kazanıyor. Touch hareketlerini pointer takibi gibi yorumlamak sayfayı kullanmayı zorlaştırır ve gereksiz video decode maliyeti oluşturur.

Benim tercihlerim:

- `pointer: coarse` cihazlarda component'i render etmemek.
- `840px` altındaki ekranlarda tamamen gizlemek.
- `prefers-reduced-motion` tercihine saygı göstermek.
- Koyu temada beyaz arka planlı asset'i gizlemek.
- Portreyi `pointer-events: none` ve `aria-hidden="true"` ile dekoratif tutmak.
- Video yüklenmezse poster göstermek.

## 9. Kalite kontrol listesi

### Video

- İlk, orta ve son karede aynı kişi görünüyor mu?
- Baş video boyunca yaklaşık 60 derece sola dönük kalıyor mu?
- İlk kare aşağı-sola, orta kare yatay-sola, son kare yukarı-sola mı bakıyor?
- Saç, kulak, çene ve yüz orta karelerde bozuluyor mu?
- Omuzlar veya tişört istemeden hareket ediyor mu?
- Kamera, ışık veya beyaz arka plan titreşiyor mu?
- Video tersine sarıldığında hareket doğal görünüyor mu?

### Web

- Video fare hareket etmeden kendi kendine oynuyor mu? Oynamamalı.
- Fare yukarı ve aşağı giderken doğru yönde sarılıyor mu?
- Yalnızca sağa-sola harekette video zamanı sabit kalıyor mu?
- Hızlı harekette seek kuyruğu veya gecikme oluşuyor mu?
- Fare pencere dışına çıktığında nötr poza dönüyor mu?
- Portre linklerin ve CTA'ların tıklanmasını engelliyor mu?
- Mobilde ve reduced-motion modunda animasyon kapanıyor mu?
- Video yüklenmezse poster görünüyor mu?
- Sayfa değişiminden sonra listener veya RAF ikiye katlanıyor mu?

## Kendi projenize uyarlayın

Bu sistemi farklı bir kişi, çizim veya marka maskotuna taşımak için beş şey yeterli:

1. `[[...]]` değişkenlerini karakterinize göre doldurun.
2. 1:1 ve düz arka planlı tutarlı bir master kare üretin.
3. MiniMax H3 video promptunda yalnızca istediğiniz hareket eksenini tarif edin.
4. Aktif video aralığını farenin aynı eksenine map edin.
5. Optimize video ve poster yollarını component'e bağlayın.

En kritik karar, videoda olmayan bir hareketi kod tarafında taklit etmeye çalışmamaktır. Yapay zeka videosunu kontrollü bir hareket plakası olarak tasarladığınızda efekt hem daha doğal hem de daha kolay test edilebilir hale gelir.
