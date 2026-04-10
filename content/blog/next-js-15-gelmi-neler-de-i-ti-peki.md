---
title: "Next.js 15 Gelmiş, Neler Değişti Peki?"
category: "General"
date: "2025-07-18"
readTime: "7 min read"
author: "Poyraz Avsever"
slug: "next-js-15-gelmi-neler-de-i-ti-peki"
excerpt: "Next.js 15 Gelmiş, Neler Değişti Peki? Selam! Yeni bir Next.js sürümü daha geldi ve beraberinde yine pek çok yenilik ve bazı dikkat edilmesi gereken değişiklikler getirdi. Eğer aktif …"
coverImage: "/blog/images/next-js-15-gelmi-neler-de-i-ti-peki-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/next-js-15-gelmi%C5%9F-neler-de%C4%9Fi%C5%9Fti-peki-651cd716839b"
---

# Next.js 15 Gelmiş, Neler Değişti Peki?


![](/blog/images/next-js-15-gelmi-neler-de-i-ti-peki-img-2.jpg)

Next.js

### Selam!

Yeni bir Next.js sürümü daha geldi ve beraberinde yine pek çok yenilik ve bazı dikkat edilmesi gereken değişiklikler getirdi. Eğer aktif olarak Next.js ile projeler geliştiriyorsan, (benim gibi) bu sürüm seni heyecanlandırabilir.

Next.js 15; React 19 desteği, performans odaklı yenilikler ve geliştirici deneyimini iyileştiren pek çok özellikle birlikte geliyor. Ancak bu sürümle birlikte bazı alışkanlıklarımızı da değiştirmemiz gerekecek ne yazıkki. Oysa ben alışkanlıklarımı severim. Her neyse, özellikle App Router kullananlar için önemli yapısal güncellemeler var.

Bu yazıda, Next.js 15 ile gelen yenilikleri sade ve anlaşılır bir dille özetlemeye çalışacağım. Bu büyük değişiklikler neler, hangi özellikler projeni hızlandırır, geçiş sırasında nelere dikkat etmen gerekir — hepsini tek tek ele alacağız.

Hazırsan, detaylara geçelim.

## React 19 Desteği

Next.js 15’in belki de en çok dikkat çeken yeniliklerinden biri: **React 19 desteği**. React tarafında uzun süredir beklenen bazı özellikler nihayet bu sürümle birlikte hayatımıza girmeye başlıyor ve Next.js de bu geçişi oldukça sorunsuz hale getirmeye çalışıyor.

Eğer App Router kullanıyorsan, React 19 ile gelen birçok yeniliği doğrudan projende kullanmaya başlayabilirsin. Özellikle form yönetimi, UI bildirimleri ve server actions gibi konularda işler artık daha da kolaylaşıyor.

Ama önce yeni **React Özellikleri** neler onu anlamamız lazım.


![](/blog/images/next-js-15-gelmi-neler-de-i-ti-peki-img-3.jpg)

React 19

## Öne Çıkan Yeni React Özellikleri:

*   `**useActionState**`: Form işlemleri sırasında daha kolay state yönetimi yapmanı sağlıyor.
*   `**useFormStatus**` (geliştirilmiş hali): Form durumunu daha rahat kontrol edebiliyorsun, örneğin submit aşamasında butonları otomatik devre dışı bırakmak gibi.
*   **Form Actions**: Artık form verilerini doğrudan sunucu tarafında handle edebiliyorsun; bu da güvenlik ve performans açısından büyük avantaj.

Henüz React 19 tam anlamıyla stable değil, ancak Next.js 15 ile birlikte bu yeni API’leri kullanmaya başlayarak şimdiden adapte olabilirsin. Tabii istersen React 18 ile devam etmek de mümkün — özellikle Pages Router kullanan projelerde bu seçenek hâlâ geçerli.

Yani özetle: React 19 geliyor, Next.js hazır ve sen de hazırsan hemen bu yeni versiyona geçiş yapabilirsin.

## Async Request API’leri (BREAKING CHANGE)

Evet, geldik bu sürümün en dikkat edilmesi gereken değişikliklerinden birine. Artık bazı yerleşik Next.js API’leri **async** hale geldi. Bu da demek oluyor ki artık `await` yazmadan eskisi gibi kullanamıyoruz.

## Neler async oldu?

Aşağıdaki API’ler artık asenkron çalışıyor:

*   `cookies()`
*   `headers()`
*   `draftMode()`
*   `params`
*   `searchParams`

Bu API’leri kullanırken `await` yazman şart. Yani şöyle şeyler artık gerekiyor:

const cookies = await cookies()

## Nereleri etkiliyor?

Bu değişiklik özellikle şuraları etkiliyor:

*   Layout dosyaları
*   Sayfa (`page.tsx`) bileşenleri
*   Route handler’lar (`route.ts`)
*   Metadata fonksiyonları

Yani bu dosyaların içinde yukarıdaki API’leri kullanıyorsan hepsini async fonksiyonlara çevirmen gerekiyor. Aksi takdirde derleme veya çalışma zamanında hata alırsın.

## Kolay Geçiş için Codemod

Neyse ki Next.js ekibi bizi unutmamış ve bu geçişi kolaylaştırmak için bir araç sunmuş:

npx @next/codemod@latest async\-request\-apis

Bu komut sayesinde projenin içindeki eski kullanım biçimleriniz otomatik olarak async hale getirilebiliyor. Yine de kodu gözden geçirmek şart, çünkü her proje özelinde ufak dokunuşlar gerekebilir.

Sonuç olarak: Bu değişiklik ilk bakışta uğraştırıcı gibi görünebilir ama uzun vadede daha net bir veri yönetimi ve daha modern bir yapı sunuyor. Kodun daha tahmin edilebilir ve kontrol edilebilir olması da cabası bence.


![](/blog/images/next-js-15-gelmi-neler-de-i-ti-peki-img-4.jpg)

## Caching Davranışlarındaki Değişiklikler (BREAKING CHANGE)

Next.js 15 ile birlikte cache sistemi de baştan aşağı yenilendi diyebiliriz. Bu değişiklik, özellikle veri çekme (`fetch`), route handler’lar ve client-side navigasyon gibi konularda çalışanları doğrudan ilgilendiriyor.

### Ne Değişti Peki?

Artık `**fetch()**` **çağrıları ve** `**GET**` **route handler’ları varsayılan olarak cache'lenmiyor**.  
Yani daha önce otomatik olarak static hale gelen veri çekme işlemleri artık her çağrıldığında yeniden çalışıyor.

Bu durum, bazı projeler için performans düşüşüne neden olabilir. Ama merak etme, kontrol tamamen sende.

### Nasıl Eski Davranışı Geri Getiririm?

Eğer bir verinin cache’lenmesini ve static hale gelmesini istiyorsan artık bunu **açıkça belirtmen gerekiyor**.

export const dynamic = 'force-static'

veya daha esnek bir yapı istersen, `next.config.js` dosyasına aşağıdaki gibi bir ayar da ekleyebilirsin:

experimental: {  
  fetchCache: {  
    defaultStaleTime: 60 \* 1000 // 1 dakika  
  }  
}

### Bizi Neden Uğraştırıyorlar, Bu Değişiklik Neden Geldi?

Next.js artık daha deterministik bir sistem kurmak istiyor. Otomatik cache davranışları bazen beklenmeyen sonuçlar doğurabiliyordu. Bu yeni sistemle birlikte, her veri kaynağı için cache kararı tamamen geliştiriciye bırakılıyor. Bu da daha şeffaf ve yönetilebilir bir yapı sağlıyor.


Özetle: Eskiden “neden cache’lendi bu veri?” diye düşünüyorsan, artık bu sorunun cevabı sensin 🙂


![](/blog/images/next-js-15-gelmi-neler-de-i-ti-peki-img-5.jpg)

## Turbopack Artık Kararlı

Next.js’in uzun zamandır üzerinde çalıştığı **Turbopack**, sonunda `next dev --turbo` komutu ile **kararlı (stable)** hale geldi. Eğer proje boyutun büyümeye başladıysa ve “neden bu kadar yavaş build alıyorum?” diyorsan, bu bölüm tam sana göre.

### Turbopack Nedir?

Turbopack, Webpack’in yerini alması planlanan, Rust tabanlı yepyeni bir bundler. Ama sadece alternatif değil, **çok daha hızlı**.

**Next.js 15 ile gelen bazı ölçümler:**

*   İlk build süresi: %46'ya kadar daha hızlı
*   Fast Refresh: %96’ya varan hız artışı
*   Geliştirme sunucusu başlatma: %77 daha hızlı

diyor yani Vercel, deneyip göreceğiz.

### Nasıl Kullanılır?

Geliştirme ortamında Turbopack’i şöyle aktifleştirebilirsin:

next dev \--turbo

Ve eğer üretim ortamında da kullanmak istersen (şu an hâlâ alpha aşamasında ama 15.4 ile iyice olgunlaştı):

next build \--turbo

Tabii production tarafında dikkatli olmakta fayda var. Bazı üçüncü parti kütüphanelerde henüz %100 uyumlu olmayabilir. Ama gelişim çok hızlı ilerliyor.

### Neden Önemli?

Geliştirme sürecindeki en büyük zaman kaybı genellikle derleme (build) ve sayfa yenileme (refresh) anlarında yaşanır. (Bence) Turbopack bu noktada fark yaratıyor. Özellikle büyük projelerde çok ciddi zaman kazandırıyor ve akışını bozmadan kod yazmaya devam etmeni sağlıyor.

**Kısacası:** Artık Next.js projelerinde “derleme yavaş” bahanesi yavaş yavaş tarih oluyor. Turbopack sayesinde daha hızlı, daha tepkisel ve daha konforlu bir geliştirme süreci bizleri bekliyor gibi gözüküyor.

Harika, şimdi sıra geldi Next.js 15 ile birlikte hayatımıza giren ve geliştirici deneyimini doğrudan iyileştiren araçlara. Kod yazarken zaman kazandıran, hata ayıklamayı kolaylaştıran ve projeyi daha iyi anlamamıza yardımcı olan birkaç güzel yenilik var:

## Yeni Geliştirici Tool’ları: Daha Akıllı, Daha Yardımcı

Next.js 15 sadece performans değil, geliştirici konforu açısından da önemli yenilikler getirdi. Bu sürümle birlikte hem yeni araçlar eklendi hem de var olan bazı sistemler daha kullanıcı dostu hale getirildi.

### 1\. `@next/codemod` CLI

Next.js projeni yeni sürüme geçirirken en büyük yardımcın olacak araç bu.  
Özellikle async API değişiklikleri gibi manuel müdahale gerektiren konularda, `codemod` senin yerine kodu otomatik olarak dönüştürüyor.

Kullanımı çok basit:

npx @next/codemod@latest async\-request\-apis

Sadece async dönüşümü değil, başka dönüşümler için de bu aracı kullanabilirsin. Kod tabanını hızlıca yeni sürüme uygun hale getiriyor.

### 2\. Statik Route Göstergesi

Geliştirme ortamında artık her route’un statik mi dinamik mi olduğunu sayfa başında küçük bir etiketle görebiliyorsun.  
Bu özellik özellikle performans optimizasyonu yaparken çok işe yarıyor. Hangi sayfaların gerçekten static render edildiğini anında fark edebiliyorsun. Şahsen ben zorlanıyordum bu nokta da çoğu zaman.

### 3\. Geliştirilmiş Hata Ayıklama (Hydration ve Runtime)

Hydration hatası mı aldın? (BEN SÜREKLİ ALIYORUM, BIKTIM ARTIK) Eskiden terminale bak, stack trace incele, hangi component sorumlu bul derken epey zaman kaybolurdu. Artık çok daha kullanışlı bir hata ekranı seni karşılıyor.

*   Hangi bileşen kaynaklı hata verdiği
*   Ne zaman tetiklendiği
*   React’ın hangi lifecycle aşamasında olduğu gibi bilgiler doğrudan görsel olarak sunuluyor.

Özetle: Next.js 15 ile “debug” süreci daha kısa, “upgrade” süreci daha kolay, ve hangi sayfanın nasıl render edildiğini anlamak artık çok daha basit. Geliştirici deneyimi ciddi anlamda ileri taşınmış diyebiliriz.

## Gözlemlenebilirlik (Observability) ve `instrumentation.js`

Uygulaman canlıya çıktı, her şey güzel görünüyor ama… Bir yerlerde bir şey yavaş, bir endpoint zaman zaman hata veriyor. İşte bu noktada **gözlemlenebilirlik (observability)** devreye giriyor.

Next.js 15 ile birlikte gelen `instrumentation.js` artık **kararlı (stable)** durumda ve projene entegre etmek oldukça kolay.

### Peki `instrumentation.js` nedir?

Bu dosya, uygulamanın sunucu tarafında gerçekleşen istekleri izlemeni ve gerektiğinde özel işlemler yapmanı sağlar. Yani bir nevi “arka planda olan biteni yakalayan kanca” gibi düşünebilirsin.

### İki ana özellik var:

*   `**register()**`: Uygulama başladığında bir kez çalışır. Örneğin APM veya log sistemini burada başlatabilirsin.
*   `**onRequestError()**`: Herhangi bir istek hata verdiğinde tetiklenir. Hangi route, hangi hata, ne zaman... hepsi burada toplanabilir.

### Ne İşe Yarıyor Yani?

*   Performans takibi (örn: bir endpoint hep 300ms üzerinde mi çalışıyor?)
*   APM entegrasyonları (örnek: Sentry, OpenTelemetry)
*   Hata loglama sistemleri (örn: request bazlı loglama)

// instrumentation.ts  
export function register() {  
  console.log('Server started')  
}  
  
export function onRequestError(error) {  
  console.error('Request error:', error)  
}

Yani artık ne zaman, ne oldu, neden oldu gibi sorulara çok daha kolay yanıt bulabiliyorsun.

Sonuç olarak: Next.js 15 artık sadece “görsel olarak düzgün çalışan” değil, arka planda da izlenebilen, ölçülebilen ve analiz edilebilen projeler oluşturman için altyapı sunuyor.

## Sonuç: Next.js 15 ile Daha Hızlı, Daha Kontrol Edilebilir Projeler

Next.js 15, sadece “yeni bir sürüm” değil; hem geliştirici deneyimini iyileştiren hem de modern web uygulamalarının ihtiyaçlarına daha iyi cevap veren ciddi bir adım.

Özellikle React 19 desteği, Turbopack’in kararlı hale gelmesi ve observability araçları, projeni daha sağlam temellere oturtmanı sağlıyor.

Tabii ki bazı breaking change ler var — özellikle async API’ler ve cache davranışları. Ama bu değişiklikler seni zorlamaktan çok, kodunun daha bilinçli, daha yönetilebilir olmasını hedefliyor. Ve Next.js ekibi, bu geçişi kolaylaştırmak için gerekli araçları da sunmuş durumda.

Eğer projeni güncellemeyi düşünüyorsan:

*   Önce bir yedeğini al,
*   `codemod` ile geçişi başlat,
*   ve yavaş yavaş yeni sistemleri test etmeye başla.

İleriyi düşünen projeler için Next.js 15 gerçekten güçlü bir temel sunuyor.

Buraya kadar okuyan herkese teşekkürler, görüşmek üzere.