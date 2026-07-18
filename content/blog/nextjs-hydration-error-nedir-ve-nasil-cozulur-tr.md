---
title: "Next.js'te Hydration Error: Nedir, Neden Olur ve Nasıl Çözülür?"
category: "Frontend"
date: "2026-07-18"
readTime: "8 min read"
author: "Poyraz Avsever"
slug: "nextjs-hydration-error-nedir-ve-nasil-cozulur"
excerpt: "Next.js projelerinde sıkça karşılaşılan Hydration Error (Rehidrasyon Hatası) nedir? Sunucu ve istemci arasındaki HTML uyumsuzlukları neden kaynaklanır ve bu hataları nasıl profesyonelce çözebiliriz?"
coverImage: "/blog/images/nextjs-hydration-error-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/nextjs-hydration-error-nedir-ve-nasil-cozulur-hash"
lang: "tr"
---

![](/blog/images/nextjs-hydration-error-nedir-ve-nasil-cozulur.png)

Next.js ile uygulama geliştirirken ekranın ortasında aniden beliren o kırmızı hata mesajını hepimiz görmüşüzdür. Kendi projelerimde de bu durumla sık sık karşılaşınca "Her şeyi doğru yazdım neden çalışmıyor" demek yerine işin temeline inip bu konuyu detaylıca araştırmak istedim.

Bu hatanın adını hepimiz biliyoruz: Hydration Error. Ancak sadece ezbere çözümler bulmak yerine sistemin nasıl çalıştığını anlamak çok daha faydalı. Çünkü hatanın arkasındaki mantığı kavradığımızda onu çözmek çocuk oyuncağı haline geliyor.

Hadi önce işin mutfağına girelim.

### Pre-rendering: Cansız Bir HTML İskeleti

Next.js'i klasik React uygulamalarından ayıran en büyük özellik sayfaları tarayıcıya göndermeden önce sunucuda oluşturmasıdır. Buna Pre-rendering diyoruz.

Kullanıcı sitenize girdiğinde Next.js ona içi boş bir sayfa yerine tamamen dolu ve okunabilir bir HTML sunar. Bu sayede kullanıcılar içeriği anında görür. Buraya kadar her şey harika. Fakat sunucudan gelen bu HTML dosyası çok hızlı olsa da henüz cansız bir yapıdadır. Butonlara tıklayamazsınız veya menüleri açamazsınız çünkü React henüz devrede değildir.

### Hydration: Statik Koda Su Katmak

İşte tam bu noktada Hydration süreci başlıyor. Tarayıcı o statik HTML'i ekrana çizdikten hemen sonra arka planda React kodlarını indirip çalıştırıyor.

React uyanıp tarayıcıdaki bu cansız HTML yapısını inceliyor. Ardından kendi hafızasındaki yapı ile eşleştirip butonlara, formlara ve linklere gerekli işlevleri bağlayarak sayfayı interaktif hale getiriyor. Bu süreci kurumuş bir bitkiye su verip onu tekrar canlandırmaya benzetebilirsiniz. Zaten hydrate kelimesi de tam olarak buradan geliyor.

Sistem kulağa çok kusursuz geliyor ama bazen işler ters gidiyor ve konsolda şu mesajla karşılaşıyoruz:

```text
Error: Text content does not match server-rendered HTML.
```

Peki sistem bu kadar mantıklıyken React neden aniden hata verip işlemi durduruyor? Gelin şimdi bu sorunun temeline ve yapılan en yaygın hatalara birlikte bakalım.

---

## Asıl Problem: Uyuşmazlık (Mismatch)

React tarayıcıda uyandığında aslında çok net bir beklentisi vardır. Sunucunun hazırlayıp gönderdiği HTML yapısı ile kendi hafızasında oluşturduğu HTML yapısı birebir aynı olmalıdır. En ufak bir farklılık bile kabul edilmez.

Diyelim ki sunucu ekrana "A" yazdırdı. React tarayıcıda çalışıp "Benim buraya B yazmam gerekiyor" derse işler o an karışır. Çünkü React mevcut HTML'i değiştirmek için değil sadece devralmak için tasarlanmıştır. Devralacağı yapı beklediğinden farklı çıkarsa güvenlik ve tutarlılık adına işlemi durdurur ve o uyuşmazlık hatasını fırlatır.

Aslında React bize basitçe şunu söylüyor: "Sunucudan gelen taslak ile senin tarayıcıda çizmemi istediğin taslak birbirini tutmuyor. Hangisine güveneceğimi bilemiyorum."

Peki bu iki yapı neden birbirinden farklı çıkıyor... Nerelerde hata yapıyoruz... Gelin en sık karşılaştığımız senaryolara bakalım.

## Hydration Hatasının En Yaygın 4 Sebebi

Bu uyuşmazlığın genelde çok temel birkaç sebebi oluyor. Karmaşık teoriler yerine basit kod örnekleriyle ilerleyelim.

### 1. Geçersiz HTML İç İçe Geçmeleri

HTML yazarken bazen kuralları esnetebiliyoruz ama React bu konuda oldukça hassas. Örneğin bir paragraf etiketinin içine yanlışlıkla bir div koyduğunuzu düşünün.

```html
<p>
  Merhaba
  <div>Dünya</div>
</p>
```

Sunucu bunu aynen oluşturup tarayıcıya gönderir. Fakat tarayıcılar hatalı HTML yapılarını gördüklerinde sayfayı düzgün göstermek için yapıyı otomatik olarak düzeltirler. Yani o div etiketini paragrafın dışına atarlar. React çalışıp DOM'a baktığında sunucudan gelen yapı ile tarayıcının kendi kendine düzelttiği yapının farklı olduğunu görür ve hatayı verir.

### 2. Sadece Tarayıcıya Özel Objeleri Kullanmak

En sık düştüğümüz tuzaklardan biri budur. Geliştirme yaparken ekran genişliğini veya sadece tarayıcıda olan bir veriyi okumak isteyebiliriz.

```jsx
function MyComponent() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return <div>{isMobile ? 'Mobil Görünüm' : 'Masaüstü Görünüm'}</div>
}
```

Sunucu tarafında yani Node.js ortamında window objesi yoktur. Bu yüzden sunucu bu kodu genelde hep "Masaüstü Görünüm" olarak çalıştırıp gönderir. Ama kodu bir telefonda açtığınızda React tarayıcıda çalışırken window objesini bulur ve "Mobil Görünüm" sonucunu üretir. Sunucudan gelen metin ile tarayıcıdaki metin uyuşmadığı için hydration hatası kaçınılmaz olur.

### 3. Rastgele Değerler ve Zamanlar

Her çalıştığında farklı sonuç üreten fonksiyonlar da bu sürecin düşmanıdır.

```jsx
function RandomNumber() {
  const number = Math.random()
  return <div>Şanslı numaranız: {number}</div>
}
```

Sunucu HTML'i oluştururken rastgele bir sayı üretir örneğin 0.5 diyelim. Tarayıcı sayfayı yükleyip React'i çalıştırdığında bu fonksiyon tekrar tetiklenir ve bu kez farklı bir sayı üretir. İki sonuç birbirinden farklı olduğu için sistem yine hata verir. Aynı durum ekrana anlık tarihi veya saati yazdırırken de yaşanır.

### 4. Tarayıcı Eklentileri

Bazen kodunuz tamamen kusursuzdur ama sayfayı yenilediğinizde yine bu hatayı alırsınız. Bunun sebebi Grammarly veya otomatik çeviri yapan tarayıcı eklentileri olabilir. Bu eklentiler sayfa yüklenir yüklenmez HTML yapısına dışarıdan müdahale edip kendi etiketlerini eklerler. React uyanıp HTML'e baktığında kendi ürettiği yapının eklentiler tarafından değiştirildiğini fark eder ve işlemi durdurur.

Sorunun kaynağını ve nedenlerini anladığımıza göre artık en keyifli kısma yani çözüm yollarına geçebiliriz.

---

## Hatayı Çözümleme Stratejileri (Nasıl Çözeriz?)

Hatanın nedenlerini ve React'in nasıl düşündüğünü kavradık. Peki bu sorunu kalıcı olarak nasıl çözeceğiz. İhtiyacınıza ve senaryonuza göre kullanabileceğiniz en etkili üç yöntemi inceleyelim.

### Yöntem 1: useEffect ile Render'ı Bekletmek (Mounted State)

Eğer uygulamanızda `window` objesine veya sadece tarayıcıda çalışan bir değere ihtiyacınız varsa en güvenli yol budur.

React'te `useEffect` hook'u sadece tarayıcıda (istemci tarafında) çalışır, sunucuda çalışmaz. Biz de bu bilgiyi kullanarak bir state oluşturabilir ve bileşenimizin gerçekten tarayıcıda yüklenip yüklenmediğini (mount olup olmadığını) kontrol edebiliriz.

```jsx
import { useState, useEffect } from 'react'

function ClientOnlyComponent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Bu kod sadece tarayıcıda çalışacak
    setIsMounted(true)
  }, [])

  // Eğer henüz tarayıcıda değilsek hiçbir şey veya bir yükleniyor ekranı göster
  if (!isMounted) {
    return null
  }

  // Artık güvenle window objesini kullanabiliriz
  return <div>Ekran genişliği: {window.innerWidth}</div>
}
```

Bu yöntem sayesinde sunucu tarafı `null` döner, tarayıcı da ilk render aşamasında `null` döner. İkisi birbiriyle eşleştiği için hata almayız. Hemen ardından `useEffect` devreye girer ve gerçek içeriğimizi ekrana basar.

### Yöntem 2: Next.js Dynamic Imports (SSR'ı Kapatmak)

Eğer elinizde çok büyük bir bileşen varsa (örneğin bir harita kütüphanesi veya karmaşık bir grafik) ve bu bileşenin sunucuda render edilmesini hiç istemiyorsanız Next.js'in sunduğu harika bir özellik var.

`next/dynamic` kullanarak bir bileşeni projeye dahil ederken `{ ssr: false }` ayarını verebilirsiniz. Bu sayede Next.js o bileşeni sunucu tarafında tamamen yok sayar.

```jsx
import dynamic from 'next/dynamic'

// Bileşeni içe aktarırken ssr özelliğini kapatıyoruz
const NoSSRComponent = dynamic(() => import('../components/HeavyMap'), {
  ssr: false,
})

function MyPage() {
  return (
    <div>
      <h1>İletişim Sayfası</h1>
      <NoSSRComponent />
    </div>
  )
}
```

Bu yöntem hem hydration hatalarını kökünden çözer hem de gereksiz yere sunucuyu yormadığınız için performans artışı sağlar.

### Yöntem 3: Uyuşmazlığı Görmezden Gelmek (suppressHydrationWarning)

Bazen uyuşmazlık olduğunu biliriz ama bunun tamamen zararsız olduğundan eminizdir. Örneğin ekrana anlık saati yazdırıyorsunuzdur ve sunucudaki saat ile kullanıcının saatinin birkaç saniye farklı olması çok doğaldır.

Böyle durumlarda React'e "Ben ne yaptığımı biliyorum, bu HTML etiketindeki uyuşmazlığı görmezden gel" diyebiliriz.

```jsx
function CurrentTime() {
  const time = new Date().toLocaleTimeString()
  
  return (
    <div suppressHydrationWarning>
      Şu anki saat: {time}
    </div>
  )
}
```

Bu özelliği ilgili HTML etiketine eklediğinizde React o satır için hata fırlatmayı bırakır. Ancak burada çok önemli bir detay var. Bu özelliği sadece metin farklılıkları için kullanmalısınız. Eğer HTML yapısında bir farklılık varsa (örneğin fazladan bir div eklendiyse) bu özellik işe yaramaz ve uygulamanız yine hata verir. O yüzden bunu sadece son çare olarak ve dikkatlice kullanmakta fayda var.

---

## Sonuç ve En İyi Yaklaşımlar

Hydration hatası ilk başta çok korkutucu bir hata ekranı gibi görünse de aslında React'in uygulamamızı tutarsızlıklardan koruma yöntemidir. Sistemin nasıl çalıştığını anladıktan sonra bu hataları çözmek oldukça kolay bir hale geliyor.

Gelecekte bu hatalarla daha az karşılaşmak için şu üç temel alışkanlığı edinmek hayat kurtarıyor:

*   **Geçerli HTML Yazın:** HTML kurallarına her zaman sadık kalın. Bir span etiketinin içine div koymak gibi hatalı iç içe geçmelerden kaçının.
*   **Tarayıcı Verilerini Doğru Yönetin:** window, document veya localStorage gibi sadece tarayıcıya özgü yapıları kullanırken bileşeninizin sunucuda nasıl davranacağını her zaman hesaba katın.
*   **Doğru Aracı Seçin:** Karşınıza bir uyuşmazlık çıktığında ilk tercihiniz genelde useEffect ile bekletmek veya dynamic import ile sunucu render işlemini kapatmak olsun. suppressHydrationWarning özelliğini ise sadece saat veya rastgele sayı gibi ufak metin farklılıklarında kullanın.

Umarım bu yazı projelerinizde karşınıza çıkan o meşhur kırmızı hata ekranlarını daha stressiz bir şekilde çözmenize yardımcı olur. Geliştirme yaparken işin arka planındaki bu temel mantığı aklınızda bulundurmak size bolca zaman kazandıracaktır.

Bir sonraki yazıda görüşmek üzere.
