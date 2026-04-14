---
title: "CSS Frameworkleri Tanıyoruz | 5. Bölüm: Materialize"
category: "General"
date: "2025-05-18"
readTime: "6 min read"
author: "Poyraz Avsever"
slug: "css-frameworkleri-tan-yoruz-5-b-l-m-materialize"
excerpt: "CSS Frameworkleri Tanıyoruz | 5. Bölüm: Materialize Merhaba arkadaşlar, bugün 5.bölümde sizlerle “Materialize” ile tanışıyoruz. Dilerseniz başlayalım. Google’ın Material Design …"
coverImage: "/blog/images/css-frameworkleri-tan-yoruz-5-b-l-m-materialize-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/css-frameworkleri-tan%C4%B1yoruz-5-b%C3%B6l%C3%BCm-materialize-5fd3c99862c2"
---

# CSS Frameworkleri Tanıyoruz | 5. Bölüm: Materialize


Merhaba arkadaşlar, bugün 5.bölümde sizlerle “Materialize” ile tanışıyoruz. Dilerseniz başlayalım.


![](/blog/images/css-frameworkleri-tan-yoruz-5-b-l-m-materialize-img-2.jpg)

Google’ın Material Design felsefesinden ilham alan Materialize, modern, duyarlı ve estetik kullanıcı arayüzleri oluşturmayı kolaylaştıran bir CSS frameworküdür. Bu yazıda, Materialize’ın temel özelliklerine, bileşen yapısına ve projelerde nasıl kullanılabileceğine yakından bakıyoruz.

## Material Design Nedir?

Material Design, 2014 yılında Google tarafından duyurulan modern bir tasarım dili. Bu sistemin temel amacı; fiziksel dünyanın kurallarını dijital ortama taşıyarak, sezgisel ve tutarlı kullanıcı deneyimleri oluşturmak. Yani butonlar, kartlar, gölgeler ya da animasyonlar rastgele değil; gerçek hayattaki fiziksel etkileşimleri taklit ederek tasarlanıyor. Bence gayet havalı bir başlangıç.

## Material Design’ın Temel İlkeleri:

*   **Derinlik ve Katman**: Öğeler birbirinden gölge ve konumlandırma ile ayrılır. Bu, kullanıcıya hiyerarşi ve önem hissi verir.
*   **Canlı Renkler**: Materyal tasarım, cesur ve doygun renkleri sever. Bu renkler genellikle marka kimliğini vurgulamak için kullanılır.
*   **Animasyon ve Geçişler**: Kullanıcı etkileşimleri akıcı geçişlerle desteklenir. Bu da kullanıcıya her şeyin bilinçli olarak gerçekleştiğini hissettirir.
*   **Tutarlılık**: Tüm platformlarda aynı görsel dilin korunmasına dikkat edilir.

Materialize CSS framework’ü de bu felsefeyi temel alarak geliştirildiği için, bileşenlerinden arayüz davranışına kadar her detayda bu prensipleri görebilirsin.


![](/blog/images/css-frameworkleri-tan-yoruz-5-b-l-m-materialize-img-3.jpg)

Materialize, sadece şık görünüm sunmakla kalmaz; aynı zamanda geliştiricilere zaman kazandıran birçok yerleşik özellik sunar. İşte öne çıkan temel bileşen ve özellikleri:

## 1\. Grid Sistemi (Izgara Yapısı)

Materialize, 12 sütunlu, esnek ve mobil uyumlu bir grid sistemi sunar. Bu yapı sayesinde sayfa düzenleri kolayca planlanabilir ve responsive tasarımlar rahatlıkla oluşturulabilir.

```html
<div class\="row"\>  
  <div class\="col s6"\>Sütun 1</div\>  
  <div class\="col s6"\>Sütun 2</div\>  
</div\>
```

## 2\. Hazır UI Bileşenleri

Materialize, Material Design felsefesiyle uyumlu birçok hazır bileşen içerir:

*   **Button**
*   **Card**
*   **Navbar**
*   **Modal**
*   **Tooltip**
*   **Dropdown**

Bu bileşenler hem şık görünür hem de kolayca özelleştirilebilir.

## 3\. Formlar ve Doğrulama

Form tasarımı ve doğrulama konusunda da oldukça güçlüdür. Giriş kutuları, radio/checkbox elemanları, dropdown menüler ve daha fazlası Materialize ile oldukça estetik ve işlevsel görünür.

## 4\. JavaScript Destekli Bileşenler

Materialize, bazı bileşenleri interaktif hale getirmek için JavaScript tabanlı yapı sunar. Örneğin:

*   **Slider**
*   **Parallax**
*   **Sidenav**
*   **Toast mesajlar**

Bunlar sadece HTML yapısıyla değil, JS üzerinden de kolayca yönetilebilir.

## 5\. İkon Seti Desteği

Materialize, Google’ın Material Icons kütüphanesini doğal olarak destekler. Böylece ekstra bir ikon kütüphanesi aramadan projene kolayca ikon ekleyebilirsin.

```html
<i class\="material-icons"\>home</i\>
```

Materialize’ın sunduğu bu temel özellikler, hızlı ve etkileyici kullanıcı arayüzleri geliştirmek isteyenler için büyük kolaylık sağlar. Özellikle yeni başlayanlar için kurulum ve kullanım açısından oldukça kullanıcı dostudur.

## Kurulum ve Kullanım

Materialize’ı projene entegre etmek oldukça basit. İster hızlıca denemek için CDN üzerinden, ister daha kapsamlı projelerde NPM gibi paket yöneticileriyle kullanabilirsin. İşte iki yaygın kurulum yöntemi:

### Hızlı Başlangıç (CDN ile)

Sadece birkaç satır HTML koduyla Materialize’ı projenize entegre edebilirsiniz:

```html
<!-- Materialize CSS -->  
<link rel\="stylesheet" href\="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"\>  
  
<!-- Materialize JS -->  
<script src\="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"\></script\>
```

Bu yöntem, özellikle küçük çaplı projeler ve hızlı prototipleme için oldukça idealdir.

### Paket Yöneticisi ile (NPM)

Daha profesyonel bir yapı kurmak istersen, Materialize’ı NPM aracılığıyla kurabilirsin:

```bash
npm install materialize-css
```

Ardından `import` komutlarıyla projenin ilgili dosyalarında kullanabilirsin:

```ts
import "materialize-css/dist/css/materialize.min.css";  
import "materialize-css/dist/js/materialize.min.js";
```

### Örnek Kullanım

```html
<a class\="waves-effect waves-light btn"\>Tıkla</a\>
```

Materialize’ın `waves-effect` sınıfı sayesinde butona tıklama efekti otomatik olarak eklenir. Küçük ama etkili detaylar ile kullanıcı deneyimi artırılır.


Materialize’ın kurulumu ve kullanımı bu kadar basit. Az kodla çok şey elde etmek isteyen geliştiriciler için oldukça kullanıcı dostu bir yapı sunuyor.


![](/blog/images/css-frameworkleri-tan-yoruz-5-b-l-m-materialize-img-4.jpg)

Materialize CSS’in güçlü yönlerinden biri, sade yapısı ve örneklerle hızlı sonuç alınabilmesidir. Bu bölümde, framework’ün bazı temel özelliklerini küçük kod parçacıklarıyla tanıyalım.

## Grid Sistemi (Sütun Yapısı)

Responsive tasarımlar için kullanılan sütun yapısı oldukça esnektir:

```html
<div class\="row"\>  
  <div class\="col s6"\>Sol Alan</div\>  
  <div class\="col s6"\>Sağ Alan</div\>  
</div\>
```

*   `s6` sınıfı, küçük ekranlarda 12 sütunluk yapının yarısını kaplayacak şekilde ayarlanır.
*   `row` sınıfı satır başlatır, `col` ise sütunu temsil eder.

## Kart Bileşeni (Card)

Kullanıcıya içerik sunmak için oldukça şık bir bileşen:

```html
<div class\="card"\>  
  <div class\="card-content"\>  
    <span class\="card-title"\>Başlık</span\>  
    <p\>Bu bir kart açıklamasıdır.</p\>  
  </div\>  
</div\>
```

## Butonlar

Basit ama şık butonlar tek satırda oluşturulabilir:

```html
<a class\="waves-effect waves-light btn"\>Tıkla</a\>
```

`waves-effect` ve `waves-light` sınıfları sayesinde tıklama animasyonu eklenir.

## Modal

```html
<!-- Tetikleyici -->  
<a class\="waves-effect waves-light btn modal-trigger" href\="#demoModal"\>Aç</a\>  
  
<!-- Modal -->  
<div id\="demoModal" class\="modal"\>  
  <div class\="modal-content"\>  
    <h4\>Merhaba!</h4\>  
    <p\>Bu bir modal içeriktir.</p\>  
  </div\>  
</div\>
```

Modal’ın çalışması için JS dosyalarının yüklü olması ve `M.Modal.init()` ile başlatılması gerekir.

Bu örneklerle Materialize CSS’in kullanımının ne kadar basit olduğunu görebilirsin. Minimum kodla maksimum estetik hedeflenmiş durumda.

## Avantajlar & Dezavantajlar

Her framework gibi Materialize’ın da güçlü yönleri olduğu kadar bazı sınırlamaları da mevcut. Bu bölümde hem öne çıkan avantajlara hem de dikkat edilmesi gereken dezavantajlara göz atalım.

## ✅ Avantajlar

### 1\. Material Design Uyumu

Google’ın Material Design prensiplerini temel aldığı için arayüzler oldukça modern ve tanıdık bir kullanıcı deneyimi sunar.

### 2\. Hazır Bileşenler

Buton, navbar, kart, modal gibi UI bileşenleri önceden tasarlanmış halde gelir. Bu da geliştirme sürecini hızlandırır.

### 3\. Kolay Öğrenilebilirlik

Özellikle yeni başlayanlar için oldukça sade bir sözdizimine sahip. Hızlıca projeye dahil edilip kullanılabilir.

### 4\. Responsive Tasarım Desteği

Mobil uyumlu grid sistemi sayesinde cihazlar arası geçişlerde görsel bütünlük korunur.

### 5\. CDN ile Anında Kullanım

Kurulum süreci çok kolaydır; sadece iki satırla projeye entegre edilebilir.

## ❌ Dezavantajlar

### 1\. Topluluk Desteği Sınırlı

Bootstrap ya da Tailwind gibi büyük bir topluluğa sahip değildir. Kaynak bulmak zaman zaman zor olabilir.

### 2\. Özelleştirme Zorluğu

Hazır bileşen yapısı, daha fazla kontrol isteyen geliştiriciler için sınırlandırıcı olabilir. Her şeyin “hazır” olması bazen esnekliği kısıtlayabilir.

### 3\. Geliştirme Hızı Düşük

Son dönemde güncellemeleri yavaşlamış durumda. Bu da sürdürülebilirlik konusunda bazı soru işaretleri oluşturabilir.

Materialize, hızlı ve şık prototipler geliştirmek için harika bir araç olsa da büyük ölçekli projeler veya çok özel UI ihtiyaçları için sınırlayıcı olabilir. Bu yüzden projene başlamadan önce ihtiyaçlarını net belirlemen çok önemli.

## Materialize ile Yapılmış Projeler

Materialize, hızlı prototipleme ve modern görünümlü arayüzler oluşturmak isteyen geliştiriciler için oldukça cazip bir seçenek. Peki bu framework gerçek dünyada nasıl kullanılmış? İşte ilham verebilecek bazı örnekler:

### 1\. Admin Dashboard Arayüzleri

Materialize, özellikle basit kontrol panelleri ve yönetici arayüzleri için tercih edilir.

### 2\. Kişisel Portfolyo Siteleri

Frontend geliştiriciler veya tasarımcılar, portfolyo sitelerini hızlıca oluşturmak için Materialize’ı tercih eder. Renk uyumu ve hazır bileşenler sayesinde profesyonel bir görünüm elde edilir.

### 3\. Bloglar ve Tanıtım Siteleri

Materialize ile responsive, sade ve kullanıcı dostu blog temaları kolayca geliştirilebilir.

## Örnek Projeler ve Kaynaklar

### 1\. Materialize Showcase Sayfası

Materialize CSS’in resmi web sitesinde, framework kullanılarak oluşturulmuş çeşitli projelerin sergilendiği bir bölüm bulunmaktadır. Bu sayfada, farklı sektörlerden ve amaçlardan projeleri inceleyebilir, ilham alabilirsiniz.  
🔗 [Materialize Showcase](https://materializecss.com/showcase.html)

### 2\. GitHub Üzerinde Açık Kaynak Projeler

GitHub’da, Materialize CSS kullanılarak geliştirilmiş birçok açık kaynak proje mevcuttur. Bu projeler, farklı kullanım senaryoları ve bileşen entegrasyonları hakkında fikir edinmenizi sağlar. Örneğin:  
🔗 [Materialize CSS Template — GitHub](https://github.com/Erickmateli/materialize-css-template)

### 3\. Materialize CSS Temaları

Materialize CSS’in resmi web sitesinde, farklı kullanım senaryolarına uygun temalar sunulmaktadır. Bu temalar, projelerinize hızlı bir başlangıç yapmanız için faydalı olabilir.  
🔗 [Materialize Temaları](https://materializecss.com/themes.html)

## Kapanış & Değerlendirme

Materialize CSS, sade yapısı ve Google’ın Material Design ilkelerine olan sadakatiyle, özellikle görsel olarak güçlü ve modern arayüzler oluşturmak isteyen geliştiriciler için büyük bir kolaylık sağlar. Hazır bileşenleri, responsive grid sistemi ve basit sözdizimi sayesinde hem yeni başlayanlar hem de hızlı prototipleme yapmak isteyen deneyimli geliştiriciler tarafından tercih edilebilir.

Ancak framework’ün büyük projelerdeki sınırlılıkları, özelleştirme konusundaki kısıtlamaları ve topluluk desteğinin sınırlı oluşu gibi dezavantajlarını da göz ardı etmemek gerekir. Eğer sade, hızlı ve estetik bir çözüm arıyorsan, Materialize CSS tam sana göre olabilir.