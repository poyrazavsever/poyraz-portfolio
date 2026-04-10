---
title: "CSS Frameworkleri Tanıyoruz | 1. Bölüm: Bootstrap"
category: "General"
date: "2025-04-27"
readTime: "4 min read"
author: "Poyraz Avsever"
slug: "css-frameworkleri-tan-yoruz-1-b-l-m-bootstrap"
excerpt: "CSS Frameworkleri Tanıyoruz | 1. Bölüm: Bootstrap CSS Frameworkleri, artık modern web geliştirme süreçlerinde hayat kurtarıcı oluyor. Kendi css dosyalarımızı sıfırdan yazmak yerine …"
coverImage: "/blog/images/css-frameworkleri-tan-yoruz-1-b-l-m-bootstrap-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/css-frameworkleri-tan%C4%B1yoruz-1-b%C3%B6l%C3%BCm-bootstrap-232619268cc8"
---

# CSS Frameworkleri Tanıyoruz | 1. Bölüm: Bootstrap


![](/blog/images/css-frameworkleri-tan-yoruz-1-b-l-m-bootstrap-img-2.jpg)

CSS Frameworkleri, artık modern web geliştirme süreçlerinde hayat kurtarıcı oluyor. Kendi css dosyalarımızı sıfırdan yazmak yerine, önceden hazırlanmış, optimize edilmiş ve test edilmiş kodlardan faydalanabiliyoruz. Bu yazı serisi boyunca, en popüler frameworkleri adım adım birlikte öğreneceğiz. Serimizin ilk konuğu: **Bootstrap**!

## Bootstrap Nedir?

Bootstrap, Twitter mühendisleri tarafından geliştirilen, açık kaynaklı bir CSS frameworküdür. Temel amacı, hızlı ve uyumlu (responsive) web siteleri oluşturmayı kolaylaştırmaktır.

*   **İlk Çıkış Yılı:** 2011
*   **Geliştiriciler:** Mark Otto ve Jacob Thornton
*   **Ana Özellikleri:** Responsive grid sistemi, hazır UI bileşenleri, JavaScript pluginleri ve hızlı prototipleme imkanı.

## Neden Bootstrap?

Günümüzde hangi kurumdan, videodan ya da dökümantasyonlardan front-end öğrenmeye çalışıyorsanız karşınıza kesinlikle “Bootstrap” çıkmıştır çünkü:

*   **Kolay Başlangıç:** CDN üzerinden birkaç satır kodla hızlıca çalışmaya başlayabilirsin.
*   **Mobil Öncelikli:** Tüm tasarımlar mobil uyumlu düşünülerek geliştirilmiştir.
*   **Topluluk Desteği:** Sorun yaşadığında veya geliştirmek istediğinde çok geniş bir kaynak ve topluluk seni bekliyor.
*   **Kapsamlı Bileşenler:** Düğmeler, formlar, modallar, navigasyon barları ve daha fazlası hazır halde gelir.

## Nasıl Başlıyoruz?

1.  **Yöntem: CDN ile En Hızlı Başlangıç**

HTML dosyana sadece şu satırları eklemen yeterli:

<link href\="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel\="stylesheet"\>  
<script src\="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"\></script\>

**2\. Yöntem: NPM Üzerinden Kurulum**


Projeni biraz daha büyük ölçekli yönetmek istersen:

npm install bootstrap

## İlk Bootstrap Deneyimimiz: Basit Bir Sayfa

Şimdi Bootstrap’ı küçük bir örnekle kullanalım:

<!DOCTYPE html\>  
<html lang\="tr"\>  
<head\>  
  <meta charset\="UTF-8"\>  
  <meta name\="viewport" content\="width=device-width, initial-scale=1.0"\>  
  <title\>Bootstrap Başlangıç</title\>  
  <link href\="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel\="stylesheet"\>  
</head\>  
<body\>  
  <div class\="container mt-5"\>  
    <h1 class\="text-center"\>Merhaba Bootstrap!</h1\>  
    <p class\="lead text-center"\>CSS frameworkleri serimizin ilk adımındasınız 🎉</p\>  
    <button class\="btn btn-primary d-block mx-auto"\>Bana Tıkla!</button\>  
  </div\>  
</body\>  
</html\>

Ve işte bu kadar.

## 1\. Bootstrap’ın Temel Yapısı

Bootstrap projeleri, genellikle şu 3 temel yapı üzerine kuruludur:

*   **Container:** İçerikleri sınırlamak ve hizalamak için kullanılır.
*   **Row:** Satır oluşturur. Grid sisteminin temel taşıdır.
*   **Col:** Sütunları ifade eder. Responsive tasarımın kalbidir.

## Container Nedir?

`container` sınıfı, içerikleri ortalamak ve belirli bir genişlikte tutmak için kullanılır.

<div class\="container"\>  
  İçerik burada yer alacak.  
</div\>

İstersen tam genişlikte bir container da kullanabilirsin:

<div class\="container-fluid"\>  
  Bu container ekranın tamamını kaplar.  
</div\>

## 2\. Bootstrap Grid Sistemi

Bootstrap’ın en güçlü özelliklerinden biri: **12 kolonlu grid sistemi**. Bu sistemle her cihaz boyutuna göre düzenlemeler yapabiliyoruz.

### Basit Grid Kullanımı

<div class\="container"\>  
  <div class\="row"\>  
    <div class\="col"\>Sütun 1</div\>  
    <div class\="col"\>Sütun 2</div\>  
    <div class\="col"\>Sütun 3</div\>  
  </div\>  
</div\>

Yukarıdaki kod 3 eşit genişlikte sütun oluşturuyor.

### Özel Genişlik Belirleme

İstersen sütunlara özel genişlikler de verebilirsin:

<div class\="row"\>  
  <div class\="col-6"\>%50 genişlik</div\>  
  <div class\="col-3"\>%25 genişlik</div\>  
  <div class\="col-3"\>%25 genişlik</div\>  
</div\>

### Responsive Grid

Farklı ekran boyutlarına göre farklı genişlikler ayarlayabilirsin:

<div class\="row"\>  
  <div class\="col-12 col-md-8"\>Büyük ekranlarda 8 birim</div\>  
  <div class\="col-6 col-md-4"\>Büyük ekranlarda 4 birim</div\>  
</div\>

*   `col-12`: Küçük ekranlarda tüm satırı kapla.
*   `col-md-8`: Orta ve daha büyük ekranlarda 8 kolon kapla.

## 3\. Bootstrap Bileşenleri

Bootstrap, tonlarca hazır bileşen sunuyor. Birkaç önemli bileşene beraber bakabilirz:

### Düğmeler (Buttons)

<button class\="btn btn-primary"\>Primary Düğme</button\>  
<button class\="btn btn-success"\>Success Düğme</button\>  
<button class\="btn btn-danger"\>Danger Düğme</button\>

Renk kodları ile istediğin tarzı seçebilirsin.

### Kartlar (Cards)

<div class\="card" style="width: 18rem;"\>  
  <img src\="https://via.placeholder.com/150" class\="card-img-top" alt\="..."\>  
  <div class\="card-body"\>  
    <h5 class\="card-title"\>Kart Başlığı</h5\>  
    <p class\="card-text"\>Bu bir Bootstrap kart bileşenidir.</p\>  
    <a href\="#" class\="btn btn-primary"\>Bir yere git</a\>  
  </div\>  
</div\>

Kartlar, görsel + içerik kombinasyonları için çok ideal.

### Navigasyon Bar (Navbar)

<nav class\="navbar navbar-expand-lg navbar-light bg-light"\>  
  <a class\="navbar-brand" href\="#"\>Logo</a\>  
  <button class\="navbar-toggler" type\="button" data-bs-toggle\="collapse" data-bs-target\="#navbarNav"\>  
    <span class\="navbar-toggler-icon"\></span\>  
  </button\>  
  <div class\="collapse navbar-collapse" id\="navbarNav"\>  
    <ul class\="navbar-nav"\>  
      <li class\="nav-item"\>  
        <a class\="nav-link active" href\="#"\>Ana Sayfa</a\>  
      </li\>  
      <li class\="nav-item"\>  
        <a class\="nav-link" href\="#"\>Hakkında</a\>  
      </li\>  
    </ul\>  
  </div\>  
</nav\>

## Mini Proje: Bootstrap ile Basit Bir İletişim Sayfası

Öğrendiklerimizi pekiştirmek için birlikte küçük bir iletişim sayfası tasarlayalım.

<!DOCTYPE html\>  
<html lang\="tr"\>  
<head\>  
  <meta charset\="UTF-8"\>  
  <meta name\="viewport" content\="width=device-width, initial-scale=1"\>  
  <title\>İletişim Formu</title\>  
  <link href\="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel\="stylesheet"\>  
</head\>  
<body\>  
  
<div class\="container py-5"\>  
  <h2 class\="text-center mb-4"\>Bize Ulaşın</h2\>  
    
  <form class\="mx-auto" style\="max-width: 600px;"\>  
    <div class\="mb-3"\>  
      <label for\="name" class\="form-label"\>Adınız</label\>  
      <input type\="text" class\="form-control" id\="name" placeholder\="Adınızı girin"\>  
    </div\>  
    <div class\="mb-3"\>  
      <label for\="email" class\="form-label"\>E-posta Adresiniz</label\>  
      <input type\="email" class\="form-control" id\="email" placeholder\="E-posta adresinizi girin"\>  
    </div\>  
    <div class\="mb-3"\>  
      <label for\="message" class\="form-label"\>Mesajınız</label\>  
      <textarea class\="form-control" id\="message" rows\="4" placeholder\="Mesajınızı yazın"\></textarea\>  
    </div\>  
    <button type\="submit" class\="btn btn-primary w-100"\>Gönder</button\>  
  </form\>  
</div\>  
  
</body\>  
</html\>

### Bu Mini Projede Neler Öğrendik?

*   Container ve grid yapısını kullanarak belli bir düzen oluşturduk.
*   Form elemanlarını Bootstrap ile daha şık hale getirdik.
*   Button ve spacing (boşluk) classlarını (py-5, mb-3, w-100) kullandık.

Bu küçük örnek, Bootstrap ile bir tasarımın ne kadar hızlı oluşturabileceğinizi gösteriyor. Yukarıdaki kodları inceleyerek bir çok noktayı anlayabilirsiniz.

## Bootstrap’ı Daha İyi Öğrenmek İçin Ne Yapabilirsin?

*   **Bootstrap Resmi Dokümantasyonu** sürekli güncelleniyor ve harika örneklerle dolu, inceleyebilirsiniz. ([https://getbootstrap.com/](https://getbootstrap.com/))
*   **Kendi Küçük Projelerini Yap:** Mini portföyler, basit blog tasarımları, admin panelleri denemek çok öğretici olur.
*   **Responsive Tasarımlar Üzerinde Çalış:** Farklı ekran boyutlarına uyum sağlamak için grid ve flex yapılarını bol bol kullan. Bunları ne kadar çok kullanırsan aşinalığın o kadar artacak.
*   **Bootstrap Temalarına Göz At:** Ücretsiz tema sitelerinden ilham alabilirsin, kodlarını incele ve kendin tekrar kurmaya çalış. (Örneğin: [https://startbootstrap.com/](https://startbootstrap.com/))
*   **Ekstra Bileşenleri Kullanmayı Öğren:** Modals, Toasts, Offcanvas gibi daha ileri seviye bileşenleri projelerinde deneyerek Bootstrap bilgin kat kat artar.

## Kapanış

Bu bölümde Bootstrap’ın temel yapı taşlarını ve ilk bileşenlerini tanıdık.  
Bir sonraki yazımda Foundation ile tanışmaya gideceğiz. Daha fazla framework tanımak için takipte kalın, hoşçakalın.