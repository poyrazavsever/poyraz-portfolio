---
title: "CSS Frameworkleri Tanıyoruz | 3. Bölüm: Bulma"
category: "General"
date: "2025-05-02"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "css-frameworkleri-tan-yoruz-3-b-l-m-bulma"
excerpt: "CSS Frameworkleri Tanıyoruz | 3. Bölüm: Bulma Bu seride amacımız, popüler CSS framework’lerini sade bir dille tanıtmak, nasıl kullanılacaklarını göstermek ve küçük projelerle …"
coverImage: "/blog/images/css-frameworkleri-tan-yoruz-3-b-l-m-bulma-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/css-frameworkleri-tan%C4%B1yoruz-3-b%C3%B6l%C3%BCm-bulma-7576b893d449"
---

# CSS Frameworkleri Tanıyoruz | 3. Bölüm: Bulma

![](/blog/images/css-frameworkleri-tan-yoruz-3-b-l-m-bulma-img-2.jpg)

Bu seride amacımız, popüler CSS framework’lerini sade bir dille tanıtmak, nasıl kullanılacaklarını göstermek ve küçük projelerle öğrenmeyi desteklemek. İlk iki bölümde **Bootstrap** ve **Foundation** ile temel yapıları öğrendik. Şimdi sırada, sadeliği ve esnekliğiyle öne çıkan **Bulma** var. Açıkçası ben uzun zamandır **Bulma’yı** incelemek istiyordum. Bugüne nasip oldu.

Bulma, Flexbox temelli yapısı ve anlaşılır sınıf isimlendirmesiyle hem yeni başlayanlar hem de tecrübeli geliştiriciler için oldukça pratik bir seçenek. Hem hızlı prototipleme hem de üretim için kullanabileceğiniz güçlü bir araç.

Hazırsan, birlikte Bulma’nın dünyasına kısa bir yolculuğa çıkalım

## 1\. Bulma Nedir?

**Bulma**, modern web arayüzleri tasarlamak için geliştirilmiş, **yalnızca CSS içeren** ve %100 **Flexbox** tabanlı bir frontend framework’tür. JavaScript içermez; bu da onu, sade ve kontrolü tamamen geliştiriciye bırakan bir yapı haline getirir. Özellikle kendi sayfalarında da “Javascript” içermediğine sürekli vurgu yapılıyor.

Bulma’nın temel felsefesi, “**kodu anlamak kolay olmalı**” yaklaşımıdır. Açıkçası bu yaklaşıma oldukça katılıyorum. Sınıf isimlendirmeleri oldukça sezgiseldir ve HTML yazarken tasarımı aynı anda oluşturmak mümkündür. Bu yüzden özellikle **hızlı prototipleme** için çok tercih edilir.

## Öne Çıkan Özellikleri

### 1.1 - %100 Flexbox Tabanlı Olması

Bulma’nın layout sistemi tamamen Flexbox üzerine kuruludur. Bu sayede hem yatay hem de dikey hizalama işlemleri oldukça esnektir. Karmaşık grid yapıları bile birkaç satır sınıf ile kolayca oluşturulabilir.

```html
<div class\="columns"\>
  <div class\="column"\>İçerik 1</div\>
  <div class\="column"\>İçerik 2</div\>
</div\>
```

### 1.2 - Kolay Öğrenilebilir Sınıf Sistemi

Sınıf isimleri açık ve anlamlıdır:

- `is-primary`, `is-success`, `is-warning` gibi görsel sınıflar, bir bakışta ne işe yaradığını belli eder.
- `has-text-centered`, `is-fullwidth`, `is-size-4` gibi yapılar, stil vermek için CSS yazmadan işleri halletmenizi sağlar.

### 1.3 - Responsive Tasarımlarda Büyük Kolaylık

Mobil öncelikli yaklaşımı benimseyen Bulma, farklı ekran boyutları için özelleştirme yapmayı oldukça kolaylaştırır. Örneğin:

```html
<div class\="column is-full-mobile is-half-tablet is-one-third-desktop" \></div>
```

Bu yapı, mobilde tam genişlik, tablette yarım, masaüstünde üçte bir genişlik anlamına gelir.

### 1.4 - JavaScript Bağımlılığı Yok

Bulma yalnızca CSS içerir. Yani framework içerisinde herhangi bir JS bileşeni bulunmaz. Bu da onu Vue, React, Angular gibi modern frameworklerle **kolay entegre edilebilir** hale getirir. Dilersen kendi JS kodlarını yazarak veya üçüncü taraf kütüphanelerle destekleyebilirsin.

### 1.5 - Zengin Hazır Bileşen Desteği

Buton, kart, form, navbar, mesaj kutuları, breadcrumb gibi birçok arayüz bileşeni varsayılan olarak gelir. Örneğin:

## 2\. Bulma Nasıl Kurulur?

Bulma’yı kullanmaya başlamak için birkaç farklı yöntem mevcut. İster bir CDN üzerinden hızlıca yükleyebilir, ister projene npm ile kurulum yaparak daha kontrollü bir entegrasyon gerçekleştirebilirsin.

### 2.1- CDN ile Hızlı Kurulum

Bulma’yı en hızlı şekilde projene dahil etmek için **CDN** (Content Delivery Network) kullanabilirsin. Bu yöntem, projene herhangi bir dosya indirmen gerekmeden doğrudan Bulma’nın sunucularından stil dosyalarını yükler.

İhtiyacın olan tek şey HTML dosyanıza şu satırı eklemek:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
  \
/>
```

### 2.2- npm ile Kurulum

Projenin bir Node.js tabanlı yapısı varsa, npm ile Bulma’yı projenize dahil edebilirsin. Bu, özellikle projeyi daha profesyonel şekilde yönetmek isteyenler için iyi bir seçenek. Adımlar:

1 — Projende npm’i başlat:

```bash
npm init -y
```

2 — Bulma’yı kur:

```bash
npm install bulma
```

3 — `node_modules` klasöründen Bulma stil dosyasını projene import et:

@import 'node_modules/bulma/css/bulma.min.css';

Bu yöntemle, projenin gereksinimlerine göre daha esnek bir kurulum yapmış olursun. Ayrıca, Bulma’nın özelleştirilmiş sürümleri için Sass kullanabilirsin.

### 2.3- Sass ile Özelleştirme (İleri Seviye)

Bulma, Sass ile özelleştirilebilirsin. Özellikle tasarımın bazı kısımlarını değiştirmek istiyorsan, Bulma’nın Sass dosyasını projene dahil edip, kendi özel tasarımını oluşturabilirsin. Bulma’nın Sass dosyasına erişmek için npm kurulumunu kullanman gerekecek.

1- Sass dosyasını import et:

@import 'node_modules/bulma/bulma';

2- Bulma’nın sunduğu değişkenleri ve mixin’leri kullanarak renk, yazı tipi, buton boyutları gibi tasarım öğelerini özelleştirebilirsin. Örneğin:

$primary: #ff6347;

Böylece, global tema renklerinizi değiştirmiş olursunuz.

Harika! Şimdi **Bulma ile Basit Bir Proje** yapalım. Bu projede, Bulma’nın sunduğu temel bileşenleri kullanarak basit bir **landing page** (karşılama sayfası) tasarımı oluşturacağız. Aslında ne kadar basit ve anlaşılır olduğunu göreceksiniz. Dilerseniz başlayalım.

## Basit Bir Proje: Landing Page Tasarımı

Bu projede, temel HTML yapısını kullanarak Bulma framework’ü ile şık bir karşılama sayfası hazırlayacağız. İşte adım adım nasıl yapacağımız:

### 1\. HTML Yapısını Oluşturma

Öncelikle, temel HTML yapısını oluşturalım. Bulma’nın sunduğu `hero` sınıfını kullanarak bir başlık bölümü ekleyeceğiz ve altında birkaç kart bileşeni olacak.

```html
<!DOCTYPE html\>
<html lang\="en"\>
<head\>
  <meta charset\="UTF-8"\>
  <meta name\="viewport" content\="width=device-width, initial-scale=1.0"\>
  <title\>Bulma Landing Page</title\>
  <link rel\="stylesheet" href\="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"\>
</head\>
<body\>

  <!-- Hero Section -->
  <section class\="hero is-primary is-fullheight"\>
    <div class\="hero-body"\>
      <div class\="container"\>
        <h1 class\="title"\>
          Hoş Geldiniz
        </h1\>
        <h2 class\="subtitle"\>
          Bulma ile Basit Bir Landing Page Tasarımı
        </h2\>
      </div\>
    </div\>
  </section\>

  <!-- Feature Section -->
  <section class\="section"\>
    <div class\="container"\>
      <div class\="columns is-multiline"\>
        <div class\="column is-4"\>
          <div class\="card"\>
            <div class\="card-content"\>
              <h3 class\="title is-4"\>Özellik 1</h3\>
              <p\>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p\>
            </div\>
          </div\>
        </div\>
        <div class\="column is-4"\>
          <div class\="card"\>
            <div class\="card-content"\>
              <h3 class\="title is-4"\>Özellik 2</h3\>
              <p\>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p\>
            </div\>
          </div\>
        </div\>
        <div class\="column is-4"\>
          <div class\="card"\>
            <div class\="card-content"\>
              <h3 class\="title is-4"\>Özellik 3</h3\>
              <p\>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p\>
            </div\>
          </div\>
        </div\>
      </div\>
    </div\>
  </section\>

  <!-- Footer Section -->
  <footer class\="footer"\>
    <div class\="content has-text-centered"\>
      <p\>
        <strong\>Bulma Landing Page</strong\> by <a href\="https://github.com/yourusername"\>Your Name</a\>.
      </p\>
    </div\>
  </footer\>

</body\>
</html\>
```

### 2\. Açıklamalar

- **Hero Section**: Bulma’nın `hero` sınıfı ile ekranın tamamını kaplayan bir başlık bölümümüz var. Burada `is-primary` sınıfı, başlık kısmına ana renk tonunu verir
- **Feature Section**: Bu bölümde üç adet kart kullanıyoruz. Her kart, bir özellik tanıtımı yapacak şekilde tasarlandı. `columns` sınıfı ile kartları hizalıyoruz.
- **Footer Section**: Sayfanın alt kısmında, sayfa hakkında kısa bir bilgi veren basit bir footer bulunuyor.

### 3\. CSS Özelleştirmeleri (isteğe bağlı)

Eğer özelleştirmek istersen, Bulma’nın sunduğu renkleri veya tasarım ögelerini değiştirebilirsin. Örneğin, `hero` kısmının rengini değiştirebilir veya kartların stilini özelleştirebilirsin.

```html
<section class\="hero is-link is-fullheight" \></section>
```

### 4\. Responsive Tasarım

Bulma, mobil öncelikli tasarım sunar. Bu nedenle tasarım, mobil cihazlarda düzgün bir şekilde görüntülenir. `columns` sınıfı ve `is-multiline` sayesinde, ekran boyutuna göre kartlar düzgün bir şekilde yerleşir. Küçük ekranlarda her kart bir satıra düşer, büyük ekranlarda ise yan yana yer alırlar.

![](/blog/images/css-frameworkleri-tan-yoruz-3-b-l-m-bulma-img-3.jpg)

![](/blog/images/css-frameworkleri-tan-yoruz-3-b-l-m-bulma-img-4.jpg)

## Sonuç

Bu projede, Bulma’nın **kolay kullanımı**, **responsive özellikleri** ve **hazır bileşenleri** sayesinde hızlı bir şekilde profesyonel görünümlü bir sayfa oluşturduk. Artık, Bulma’yı kullanarak daha büyük projeler geliştirebilirsin.

### Daha İleri Gitmek İçin

- Bulma’nın **belgelerini** ([bulma.io](https://www.bulma.io)) inceleyerek daha fazla bileşen ve özelleştirme hakkında bilgi edinebilirsin.
- Bulma’yı projende Sass ile kullanarak stil dosyalarını daha detaylı şekilde yönetebilirsin.
