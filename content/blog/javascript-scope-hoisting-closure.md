---
title: "Javascript'te Scope, Hoisting ve Closure'ı Gerçekten Anlamak"
category: "Javascript"
date: "2026-04-24"
readTime: "15 min read"
author: "Poyraz Avsever"
slug: "javascript-scope-hoisting-closure"
excerpt: "Scope, hoisting, closure, IIFE ve module pattern gibi Javascript'in temel kavramlarını öğrenme sürecimden notlar."
coverImage: "https://miro.medium.com/v2/resize:fit:967/1*nMN_sFFFUH8BU0JfzcAV4Q.jpeg"
---

# Javascript'te Scope, Hoisting ve Closure'ı Gerçekten Anlamak

![](https://miro.medium.com/v2/resize:fit:967/1*nMN_sFFFUH8BU0JfzcAV4Q.jpeg)

Merhaba,

Javascript öğrenirken bazı kavramlar var ki, herkes "bunları bilmen lazım" diyor ama tam olarak ne olduklarını açıklayan çok az kaynak buluyorsun. Scope, hoisting, closure... Hepsini duymuşsundur muhtemelen. Ben de duymuştum. Hatta kullanıyordum bile. Ama bir gün bir bug ile saatlerce uğraştıktan sonra fark ettim ki bu kavramları gerçekten anlamadan sadece ezberden ilerliyormuşum.

O bug'ı çözdükten sonra oturup bu konuları en baştan, temelden çalışmaya karar verdim. Bu yazı da o süreçte aldığım notların derlenmiş hali. Uzman birinin yukarıdan anlattığı bir rehber değil, benim gibi öğrenme sürecinde olan birinin "aa demek buymuş" dediği anları paylaştığı bir yazı olarak düşünebilirsiniz.

Yazıda sırasıyla scope nedir, var/let/const farkları, hoisting, temporal dead zone, lexical environment, scope chain, closure, bellek maliyetleri, IIFE ve module pattern konularına bakacağız. Her biri bir öncekinin üzerine inşa ediliyor, o yüzden sırayla okumanızı öneririm.

Haydi başlayalım.

## Scope (Kapsam) Nedir?

![](https://miro.medium.com/v2/resize:fit:1400/1*KxHwVbB0zhnSVrhrWtT-gg.jpeg)

Scope, bir değişkenin kodun neresinden erişilebilir olduğunu belirleyen kuraldır. Yani bir değişken tanımladığında, o değişkeni her yerden kullanabiliyor musun yoksa sadece belirli bir alan içinde mi geçerli? Bunu belirleyen şey scope.

Javascript'te üç temel scope var:

### Global Scope

Herhangi bir fonksiyon veya blok içinde olmayan, en dış katmanda tanımlanan değişkenler global scope'tadır. Kodun her yerinden erişilebilirler.

```javascript
const kullaniciAdi = "Poyraz";

function selamla() {
  console.log(kullaniciAdi); // "Poyraz" -- erişebiliyor
}

selamla();
console.log(kullaniciAdi); // "Poyraz" -- buradan da erişebiliyor
```

### Function Scope

Bir fonksiyonun içinde tanımlanan değişkenler sadece o fonksiyonun içinde geçerlidir. Dışarıdan erişilemezler.

```javascript
function hesapla() {
  const sonuc = 42;
  console.log(sonuc); // 42 -- sorunsuz
}

hesapla();
console.log(sonuc); // ReferenceError -- dışarıdan erişemiyoruz
```

Ben başlarda bunu pek düşünmeden her şeyi global scope'a atıyordum. Kod küçükken sorun olmuyor ama proje büyüdükçe hangi değişkenin nereden geldiğini takip etmek gerçekten zorlaşıyor. Değişken isimleri çakışıyor, beklenmedik değerler çıkıyor. O zaman scope'un neden bu kadar önemli olduğunu anladım.

### Block Scope

`if`, `for`, `while` gibi yapıların süslü parantezleri `{}` bir blok oluşturur. `let` ve `const` ile tanımlanan değişkenler bu bloğun dışından erişilemez.

```javascript
if (true) {
  const mesaj = "bloğun içindeyim";
  console.log(mesaj); // "bloğun içindeyim"
}

console.log(mesaj); // ReferenceError -- blok dışında erişilemiyor
```

Block scope kavramı `let` ve `const` ile geldi. Peki ondan önce `var` ile durum nasıldı? Bir sonraki bölümde tam olarak buna bakacağız.

## var vs let / const

![](https://www.c-sharpcorner.com/article/what-is-the-difference-between-var-let-and-const-in-javascript2/Images/polotno.jpeg)

Bu konu benim kafamı en çok karıştıran konulardan biriydi. Üçü de değişken tanımlıyor, peki neden üç tane var? Farkları ne?

### var: Function Scope

`var` ile tanımlanan değişkenler sadece fonksiyon kapsamını tanır. Blok kapsamını tanımaz. Yani bir `if` veya `for` bloğunun içinde `var` ile bir şey tanımlasan bile, o değişken bloğun dışından da erişilebilir.

```javascript
if (true) {
  var isim = "Poyraz";
}

console.log(isim); // "Poyraz" -- dışarıdan erişebiliyor!
```

Bu ilk başta kullanışlı gibi görünebilir ama aslında tehlikeli. Çünkü farkında olmadan değişkenlerin kapsamı dışına sızmasına yol açıyor.

### let ve const: Block Scope

`let` ve `const` ise blok kapsamına sahip. Süslü parantez `{}` içinde tanımladığın değişken, o parantezin dışından erişilemez.

```javascript
if (true) {
  let isim = "Poyraz";
}

console.log(isim); // ReferenceError
```

### Klasik Sorun: for Döngüsü + setTimeout

Bu farkı en iyi gösteren örnek şu:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Çıktı: 3, 3, 3
```

`var` function-scoped olduğu için döngü bittiğinde `i` zaten 3 olmuş oluyor ve tüm callback'ler aynı `i`'yi görüyor. Ama `let` kullanırsak:

```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// Çıktı: 0, 1, 2
```

`let` her döngü iterasyonunda yeni bir kapsam oluşturduğu için her callback kendi `i` değerini görüyor. Bu farkı ilk öğrendiğimde "aa o yüzden böyle oluyormuş" demiştim. Gerçekten kafa karıştırıcı bug'ların kaynağı bu.

### const Hakkında Bir Not

`const` ile tanımlanan değişkenin kendisi yeniden atanamaz ama eğer bir object veya array tutuyorsa, o object'in içeriği değiştirilebilir.

```javascript
const kisi = { isim: "Poyraz" };
kisi.isim = "Ali"; // Bu çalışır
kisi = { isim: "Veli" }; // TypeError -- yeniden atama yapılamaz
```

`const` "değer sabittir" değil, "referans sabittir" demek. Bu ayrımı bilmek önemli.

## Hoisting

![](https://media.geeksforgeeks.org/wp-content/uploads/20250726100849187796/hoisting_in_javascript_2.webp)

Hoisting, Javascript motorunun kodu çalıştırmadan önce yaptığı bir hazırlık aşaması. Motor kodunu iki aşamada işler:

1. **Creation Phase (Oluşturma):** Değişken ve fonksiyon tanımlarını hafızaya alır.
2. **Execution Phase (Çalıştırma):** Kodu satır satır çalıştırır.

Bu yüzden bazı durumlarda bir değişkeni veya fonksiyonu tanımlamadan önce kullanabiliyorsun. Ama dikkat, her şey aynı şekilde hoist edilmiyor.

### var ile Hoisting

`var` ile tanımlanan değişkenler hoist edilir ama değerleri `undefined` olarak atanır.

```javascript
console.log(sayi); // undefined
var sayi = 5;
```

Motor bunu şu şekilde görüyor:

```javascript
var sayi; // tanım yukarı taşındı, değer undefined
console.log(sayi); // undefined
sayi = 5; // değer burada atandı
```

### Fonksiyon Deklarasyonları

Fonksiyon deklarasyonları tamamen hoist edilir. Yani tanımlamadan önce çağırabilirsin.

```javascript
selamla(); // "Merhaba!" -- çalışıyor

function selamla() {
  console.log("Merhaba!");
}
```

### let ve const ile Hoisting

`let` ve `const` da aslında hoist ediliyor. Ama bir farkla: tanım satırlarına gelene kadar erişilemezler. Bu da bizi bir sonraki konuya getiriyor.

Ben hoisting'i ilk duyduğumda "Javascript benim kodumu mu değiştiriyor?" diye düşünmüştüm. Tam olarak öyle değil tabii, ama motor gerçekten kodu çalıştırmadan önce bir ön hazırlık yapıyor ve bu davranışı bilmezsen garip hatalarla karşılaşabilirsin.

## Temporal Dead Zone (Ölü Bölge)

![](https://media.geeksforgeeks.org/wp-content/uploads/20210809013602/Screenshotfrom20210809013548.png)

Az önce `let` ve `const`'un da hoist edildiğini söyledim. Ama `var`'dan farklı olarak tanım satırına gelene kadar erişilemezler. İşte bu erişilemez bölgenin adı **Temporal Dead Zone (TDZ)**.

```javascript
console.log(isim); // ReferenceError: Cannot access 'isim' before initialization
let isim = "Poyraz";
```

`var` olsaydı `undefined` alırdık. Ama `let` ile direkt hata fırlatıyor. Bu kasıtlı bir tasarım kararı. Neden? Çünkü bir değişkeni tanımlamadan önce kullanmak genellikle bir hatadır ve Javascript motoru bunu erken yakalamamızı istiyor.

```javascript
// TDZ başlangıcı -- let tanımı hoist edildi ama erişilemez
console.log(x); // ReferenceError
// ... kodun diğer satırları
let x = 10; // TDZ burada biter, artık erişilebilir
console.log(x); // 10
```

TDZ'yi öğrenince kafamda çok şey oturdu. "Neden `var` yerine `let` kullanıyoruz?" sorusunun en somut cevaplarından biri bu: `let` ve `const` bizi hatalardan erken koruyor.

## Lexical Environment ve Scope Chain

![](https://miro.medium.com/v2/resize:fit:1400/1*8qdQDsD8JpByuGra8T_3uw.png)

### Lexical Environment

Javascript'te scope, kodun nereye yazıldığına göre belirlenir. Çalışma zamanında değil, yazım zamanında. Buna **Lexical Environment** deniyor.

Her fonksiyon oluşturulduğunda bir Lexical Environment oluşur. Bu environment iki şey tutar:

1. O ortamda tanımlı değişkenler.
2. Bir üst ortama referans (outer reference).

```javascript
const disariDeger = "ben dışarıdayım";

function dis() {
  const ortaDeger = "ben ortadayım";

  function ic() {
    const icDeger = "ben içerideyim";
    console.log(icDeger);     // kendi ortamı
    console.log(ortaDeger);   // bir üst ortam
    console.log(disariDeger); // en dış ortam (global)
  }

  ic();
}

dis();
```

`ic()` fonksiyonu çalışırken önce kendi ortamına bakıyor, bulamazsa `dis()` fonksiyonunun ortamına, orada da bulamazsa global ortama çıkıyor.

### Scope Chain

Bu yukarı doğru arama mekanizmasına **Scope Chain** deniyor. Her ortam bir üst ortama bağlı ve bu zincir global scope'a kadar devam ediyor. Global scope'ta da bulamazsa `ReferenceError` alıyorsun.

```javascript
const a = 1;

function birinci() {
  const b = 2;

  function ikinci() {
    const c = 3;
    console.log(a + b + c); // 6 -- üç farklı scope'tan okuyor
  }

  ikinci();
}

birinci();
```

Scope chain'i anlamak benim için kritik bir noktaydı. Çünkü bir sonraki konu olan closure, tam olarak bu mekanizma üzerine inşa ediliyor.

## Closure Nedir?

![](https://edward-huang.com/images/what-is-really-so-special-about-javascript-closure-/Closure%20JS.png)

Scope chain'i anladıysak şimdi bir soru sorabiliriz: bir fonksiyon, tanımlandığı yerden ayrıldıktan sonra da o scope chain'e erişebilir mi?

Cevap: evet. Ve buna **closure** deniyor.

Closure, bir fonksiyonun tanımlandığı ortamdaki değişkenleri, o ortamın çalışması bittikten sonra bile hatırlama yeteneğidir.

```javascript
function sayacOlustur() {
  let sayi = 0;

  return function() {
    sayi++;
    console.log(sayi);
  };
}

const sayac = sayacOlustur();
sayac(); // 1
sayac(); // 2
sayac(); // 3
```

`sayacOlustur()` çoktan çalışıp bitti. Normalde `sayi` değişkeninin bellekten silinmesi gerekirdi. Ama döndürülen iç fonksiyon hala `sayi`'ya erişiyor. Çünkü iç fonksiyon oluşturulduğu ortamın bir referansını tutuyor. Bu closure.

Closure kavramını ilk anladığımda geriye dönüp baktım ve birçok yerde farkında olmadan zaten kullandığımı gördüm. Event listener'lar, callback'ler, hatta React'taki state mantığı bile closure'a dayanıyor.

Bir closure oluşması için üç şey gerekiyor:

1. Bir dış fonksiyon olmalı.
2. İç fonksiyon, dış fonksiyonun değişkenine erişmeli.
3. İç fonksiyon dışarıya döndürülmeli veya başka bir yere aktarılmalı.

## Closure ve Bellek Maliyetleri

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKXdBQQsQUAwBFbNUbsY10t04cU8xUPyECww&s)

Closure'un bir bedeli var. Normalde bir fonksiyon çalışıp bittiğinde, içindeki değişkenler Garbage Collector tarafından bellekten temizlenir. Ama closure varsa, iç fonksiyon o değişkenlere hala referans tuttuğu için Garbage Collector onları temizleyemiyor.

```javascript
function buyukVeriTut() {
  const devData = new Array(1000000).fill("veri");

  return function() {
    console.log(devData.length);
  };
}

const fn = buyukVeriTut();
// devData bellekte durmaya devam ediyor
// çünkü fn hala ona referans tutuyor
```

Bu örnekte `devData` bir milyon elemanlık bir dizi. `buyukVeriTut()` çalışıp bitti ama döndürülen fonksiyon `devData`'ya eriştiği için bu koca dizi bellekte kalmaya devam ediyor.

Bu her zaman sorun demek değil. Küçük veriler için closure gayet güvenli. Ama büyük veri yapıları, DOM referansları veya sürekli oluşturulan closure'lar söz konusu olduğunda dikkatli olmak gerekiyor.

Closure'un bedava olmadığını öğrenmek benim için önemli bir noktaydı. Her güçlü araç gibi, bilinçli kullanmak gerekiyor.

## IIFE (Anında Çalışan Fonksiyonlar)

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffPUSN-VdA6RngHHaWrXFsi6HQDkZf8HvJQ&s)

IIFE, "Immediately Invoked Function Expression" kısaltması. Türkçesiyle: anında çalışan fonksiyon ifadesi. Tanımlandığı anda kendini çağıran bir fonksiyon.

```javascript
(function() {
  const gizli = "bu dışarıdan erişilemez";
  console.log(gizli);
})();

console.log(gizli); // ReferenceError
```

İlk parantez fonksiyonu bir ifadeye (expression) çeviriyor, ikinci parantez onu hemen çağırıyor.

IIFE'nin asıl amacı global scope'u kirletmemek. ES6 öncesinde `let` ve `const` yoktu, block scope yoktu. Değişkenleri izole etmenin tek yolu onları bir fonksiyonun içine koymaktı. IIFE tam olarak bunu yapıyor: geçici bir kapsam yaratıyor ve işi bitince yok oluyor.

```javascript
// ES6 öncesi: IIFE ile izolasyon
(function() {
  var sayac = 0;
  // sayac burada güvende, global'e sızmıyor
})();

// ES6 sonrası: block scope ile aynı iş
{
  let sayac = 0;
  // aynı izolasyon, daha temiz sözdizimi
}
```

IIFE'yi ilk gördüğümde sözdizimi garip gelmişti. Ama amacını anlayınca "ne kadar zekice" dedim. Şimdi `let/const` ve modüller sayesinde eskisi kadar yaygın kullanılmıyor ama eski kodlarda çok karşılaşırsınız ve ne olduğunu bilmek gerekiyor.

## Module Pattern ve Kapsülleme

![](https://media.geeksforgeeks.org/wp-content/uploads/20220705232902/RevealingModulePatternExample.jpg)

Şimdiye kadar öğrendiğimiz her şey bir araya gelince ortaya çok güzel bir yapı çıkıyor: **Module Pattern**.

IIFE ile izole bir kapsam oluşturuyorsun. Closure sayesinde o kapsam içindeki değişkenlere dışarıdan erişimi kontrol ediyorsun. Sonuç: dışarıdan erişilemeyen (private) değişkenler ve sadece senin izin verdiğin (public) metotlar.

```javascript
const SayacModulu = (function() {
  let sayi = 0; // private -- dışarıdan erişilemez

  return {
    artir: function() {
      sayi++;
    },
    azalt: function() {
      sayi--;
    },
    goster: function() {
      console.log(sayi);
    }
  };
})();

SayacModulu.artir();
SayacModulu.artir();
SayacModulu.goster(); // 2
console.log(SayacModulu.sayi); // undefined -- private
```

`sayi` değişkenine dışarıdan hiçbir şekilde erişemiyorsun. Sadece `artir`, `azalt` ve `goster` fonksiyonları üzerinden kontrollü bir şekilde etkileşim kurabiliyorsun. Bu kavrama programlamada **Encapsulation (Kapsülleme)** deniyor.

Module pattern'i görünce "IIFE ve closure bir araya gelince böyle bir şey çıkıyormuş" demiştim. Her şeyin birbirine bağlandığını görmek gerçekten tatmin edici.

Modern Javascript'te `import` ve `export` ile kullandığımız modül sistemi aslında bu kalıbın resmileşmiş, dile entegre edilmiş hali. Ama temelde aynı fikir: kapsülleme ve kontrollü erişim.

## Kapanış

Bu yazıda scope'tan başlayıp module pattern'e kadar bir yolculuk yaptık. Şimdi geriye bakınca her kavramın bir öncekinin üzerine inşa edildiğini görebilirsiniz:

- **Scope** bize değişkenlerin görünürlüğünü öğretti.
- **var/let/const** bu görünürlüğün nasıl kontrol edildiğini gösterdi.
- **Hoisting** Javascript motorunun kodu nasıl hazırladığını anlattı.
- **TDZ** `let` ve `const`'un bizi hatalardan nasıl koruduğunu gösterdi.
- **Lexical Environment** kapsamın kodun yazıldığı yere göre belirlendiğini açıkladı.
- **Scope Chain** değişken arama mekanizmasını ortaya koydu.
- **Closure** bu zincirin fonksiyon bittikten sonra bile yaşamasını sağladı.
- **IIFE** global scope'u korumak için geçici kapsamlar yarattı.
- **Module Pattern** tüm bunları birleştirerek kapsüllenmiş yapılar oluşturdu.

Bu kavramları öğrenmek benim için Javascript'e bakış açımı tamamen değiştirdi. Artık bir bug gördüğümde "acaba scope mu karışmış, closure mı var?" diye düşünebiliyorum ve çoğu zaman sorunu çok daha hızlı buluyorum. Umarım bu yazı sizin için de benzer bir etki yaratmıştır.
