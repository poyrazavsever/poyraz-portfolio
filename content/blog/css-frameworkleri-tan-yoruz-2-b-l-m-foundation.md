---
title: "CSS Frameworkleri Tanıyoruz | 2. Bölüm: Foundation"
category: "General"
date: "2025-04-27"
readTime: "4 min read"
author: "Poyraz Avsever"
slug: "css-frameworkleri-tan-yoruz-2-b-l-m-foundation"
excerpt: "CSS Frameworkleri Tanıyoruz | 2. Bölüm: Foundation Merhaba arkadaşlar, bugün yeni konuğumuz “Foundation”. Gelin hep beraber tanışalım. Foundation Nedir? Foundation, ZURB tarafından …"
coverImage: "/blog/images/css-frameworkleri-tan-yoruz-2-b-l-m-foundation-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/css-frameworkleri-tan%C4%B1yoruz-2-b%C3%B6l%C3%BCm-foundation-68b08997cea3"
---

# CSS Frameworkleri Tanıyoruz | 2. Bölüm: Foundation


Merhaba arkadaşlar, bugün yeni konuğumuz “Foundation”. Gelin hep beraber tanışalım.

![](/blog/images/css-frameworkleri-tan-yoruz-2-b-l-m-foundation-img-2.jpg)

## Foundation Nedir?

**Foundation**, ZURB tarafından geliştirilmiş, responsive web tasarımını ön planda tutan bir CSS framework’üdür. Modern web tasarımları için güçlü bir altyapı sanan ve projenizin hızlıca şekillendirilmesini sağlayan bir framework ‘tür.

*   **Responsive Design**: Mobil uyumlu, masaüstü uyumlu web siteleri oluşturur.
*   **Flexbox ve Grid Sistemleri**: Kullanımı kolay grid ve flexbox destekleri sunar.
*   **Özelleştirilebilir Bileşenler**: Kendi tasarımınızı oluşturabileceğiniz hazır bileşenlerle gelir.

## 1\. Foundation’ın Temel Yapısı

Foundation ile bir sayfa tasarlarken, diğer framework’lerde olduğu gibi **grid sistemini** kullanacağız. Ancak Foundation, çok daha esnek yapıları destekleyebiliyor.

### Grid Sistemi

Örneğin bir sayfada 2 sütunlu bir düzen oluşturmak için:

<div class\="grid-x"\>  
  <div class\="cell small-12 medium-6"\>Sütun 1</div\>  
  <div class\="cell small-12 medium-6"\>Sütun 2</div\>  
</div\>

Burada;

*   `grid-x`: Grid sistemini x ekseninde başlatır.
*   `cell`: Her bir hücreyi tanımlar.
*   `small-12`: Mobilde 12 sütun kullan, tam genişlik ver anlamına geliyor.
*   `medium-6`: Masaüstünde 6 sütun, yani 2 sütunlu bir yapı anlamına geliyor.

Daha detaylı incelemek için [Foundation Framework Doc](https://get.foundation/sites/docs/index.html) sayfasından dökümantasyonu inceleyebilirsin.

## 2\. Foundation Kurulumu

### Hızlı Başlangıç (CDN ile)

Eğer hemen başlamak istiyorsan:

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites/dist/css/foundation.min.css"\>

Ardından HTML dosyanda Foundation class’larını kullanmaya başlayabilirsin.

### Daha Kapsamlı Projeler İçin Kurulum

Daha kapsamlı projelerde `npm` ile kurulumunu öneririm:

npm install foundation-sites

Sonrasında:

npx foundation new

Bu komutla, sana temel bir Foundation projesi kurabilirsin.

## 3\. Foundation İle Mini Bir Proje: Duyuru Kutusu Tasarlayalım

Bu kısımda, Foundation’ın sunduğu **callout** bileşenini kullanarak **duyuru kutusu** tasarımı yapacağız. Bu basit proje, Foundation’ın bileşenlerini nasıl kullanabileceğimizi ve responsive (duyarlı) bir tasarım nasıl oluşturulacağını göstermek için bence çok ideal.

### Adım 1: Duyuru Kutusu Bileşenini Oluşturma

Foundation’da duyuru, uyarı ya da önemli bilgileri vurgulamak için **callout** bileşeni kullanılabiliriz. **Callout** bileşeni, dikkat çekici bir stil sunarak mesajları öne çıkarır. Hadi hemen bir örnek üzerinden başlayalım:

<!DOCTYPE html\>  
<html lang\="tr"\>  
<head\>  
  <meta charset\="UTF-8"\>  
  <meta name\="viewport" content\="width=device-width, initial-scale=1.0"\>  
  <title\>Foundation Duyuru Kutusu</title\>  
  <link rel\="stylesheet" href\="https://cdn.jsdelivr.net/npm/foundation-sites/dist/css/foundation.min.css"\>  
</head\>  
<body\>  
  <!-- Duyuru Kutusu -->  
  <div class\="callout primary"\>  
    <h5\>Yeni Özellik Duyurusu!</h5\>  
    <p\>Web sitemizde yeni özellikler eklendi. Hızlıca göz atın ve denemek için tıklayın!</p\>  
    <a href\="#" class\="button"\>Özellikleri Keşfedin</a\>  
  </div\>  
  
  <!-- Foundation Scripts -->  
  <script src\="https://cdn.jsdelivr.net/npm/foundation-sites/dist/js/foundation.min.js"\></script\>  
</body\>  
</html\>

### Açıklamalar:

*   `**callout primary**`: `callout` bileşeni ile duyuru kutusunun stilini tanımlıyoruz. `primary` sınıfı ise kutunun rengini belirler (genellikle mavi tonlarında oluyor.).

### Adım 2: Duyuru Kutusunu Responsive Yapma

Bu proje, mobil uyumlu bir duyuru kutusu oluşturmayı da içeriyor. Foundation, **grid sistemi** ve **responsive utilities** ile sayfanın farklı ekran boyutlarına göre nasıl uyumlu hale getirileceğini gayet kolaylaştırır.


Örneğin, duyuru kutusunun genişliğini ekran boyutuna göre değiştirebiliriz:

<div class\="callout primary grid-container"\>  
  <div class\="grid-x grid-padding-x"\>  
    <div class\="cell small-12 medium-8 large-6"\>  
      <h5\>Yeni Özellik Duyurusu!</h5\>  
      <p\>Web sitemizde yeni özellikler eklendi. Hızlıca göz atın ve denemek için tıklayın!</p\>  
      <a href\="#" class\="button"\>Özellikleri Keşfedin</a\>  
    </div\>  
  </div\>  
</div\>

### Açıklamalar:

*   `**grid-container**`: Container sınıfı, grid sisteminin düzenli çalışmasını sağlar.
*   `**grid-x grid-padding-x**`: `grid-x` tüm satırı tanımlar, `grid-padding-x` ise yatay boşluk ekler.
*   `**cell small-12 medium-8 large-6**`: Burada, duyuru kutusunun küçük ekranlarda tam genişlikte (12 sütun), orta boy ekranlarda 8 sütun ve büyük ekranlarda ise 6 sütun genişliğinde olmasını sağlıyoruz.

Bu düzen sayesinde duyuru kutusu, ekran boyutuna göre daha rahat yerleşim alacak ve kullanıcının her cihazda düzgün görüntülenmesini sağlayacaktır.

### Adım 3: Stil ve Renklendirme

Foundation, **temalar** ve **renkler** konusunda da özelleştirme imkanı sunar. `callout` bileşeninin varsayılan olarak gelen renkleri değiştirmek için, sınıflara renkler ekleyebilirsiniz.

Örneğin:

<div class\="callout alert"\>  
  <h5\>Önemli Uyarı!</h5\>  
  <p\>Web sitemiz geçici olarak bakıma alındı. Lütfen daha sonra tekrar deneyin.</p\>  
</div\>

*   `**alert**`: Bu sınıf, **kırmızı** bir arka plan rengini ifade eder ve genellikle uyarılar için kullanılır.
*   `**secondary**`: Duyuru kutusunun renk paletini değiştirir, farklı bir ton verir.

### Adım 4: İnteraktif Özellikler Eklemek

Foundation ile basit **modal pencereler** ve **accordion** gibi interaktif özellikler de ekleyebilirsiniz. Örneğin, kullanıcı butona tıkladığında bir **modal pencere** açılmasını sağlayabiliriz:

<!-- Button to trigger modal -->  
<a href\="#" class\="button" data-open\="duyuruModal"\>Daha Fazla Bilgi</a\>  
  
<!-- Modal -->  
<div class\="reveal" id\="duyuruModal" data-reveal\>  
  <h2\>Detaylı Özellikler</h2\>  
  <p\>Bu özellikler hakkında daha fazla bilgi almak için web sitemizi inceleyebilirsiniz.</p\>  
  <button class\="close-button" data-close aria-label\="Close reveal" type\="button"\>  
    <span aria-hidden\="true"\>&times;</span\>  
  </button\>  
</div\>  
  
<!-- Foundation Scripts -->  
<script src\="https://cdn.jsdelivr.net/npm/foundation-sites/dist/js/foundation.min.js"\></script\>  
<script\>  $(document).foundation();</script\>

Burada reveal sınıfını kullanarak bir modal pencere oluşturuyoruz. data-open özelliği ile, butona tıklandığında ilgili modal pencerenin açılmasını sağlıyoruz.

## 4\. Foundation Öğrenmek İçin İpuçları

*   **Resmi Dokümantasyon:** [https://get.foundation/](https://get.foundation/)
*   **Flexbox Kullanımı:** Flexbox ile düzenleme yapmayı öğrenmelesin, Foundation ile çok güçlü düzenler oluşturabilirsin.
*   **Proje Bileşenleri:** Formlar, butonlar, modal pencereler gibi bileşenleri kullanarak projeni hızlıca inşa et. Kendine bir tasarım, bir proje belirle ve onu foundation ile inşa et.
*   **Responsive Tasarımlar Yap:** Foundation’ın responsive özelliklerini keşfederek, sitenizin tüm cihazlarla uyumlu olmasını sağlayın. Ne kadar çok pratik yaparsanız o kadar hızlanır ve aşina olursunuz.
*   **Özelleştirme Yap:** Foundation’un css dosyalarını özelleştirerek, projene özel bir tema oluştur. Dosyaları kurcalamak foundation’ı çok daha iyi anlamana sebep olacaktır.

## Kapanış

Bu bölümde Foundation’ın temel yapı taşlarını ve ilk bileşenlerini tanıdık.  
Bir sonraki yazımda **Bulma** ile tanışmaya gideceğiz. Benim favorilerimden biri kendisi. Daha fazla framework tanımak için takipte kalın, hoşçakalın.