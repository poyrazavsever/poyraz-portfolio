---
title: "Docker Nedir? — Kahveni Al, Docker’ı Konuşuyoruz."
category: "General"
date: "2025-07-03"
readTime: "4 min read"
author: "Poyraz Avsever"
slug: "docker-nedir-kahveni-al-docker-konu-uyoruz"
excerpt: "Docker Nedir? — Kahveni Al, Docker’ı Konuşuyoruz. Gelin biraz sohbbet edelim: Yazılım geliştirme dünyasında işler bazen biraz… dağınık. Bir yerde çalışan bir uygulama başka bir …"
coverImage: "/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/docker-nedir-kahveni-al-docker%C4%B1-konu%C5%9Fuyoruz-de83718255e8"
---

# Docker Nedir? — Kahveni Al, Docker’ı Konuşuyoruz.


![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-2.jpg)

Gelin biraz sohbbet edelim: Yazılım geliştirme dünyasında işler bazen biraz… dağınık. Bir yerde çalışan bir uygulama başka bir yerde çalışmaz, “bende çalışıyor” cümlesi ofis efsanesine dönüşür. Tabii ki uygulamanın sende çalışıp bir başkasında çalışmamasının bir çok sebebi var. Ama bugün onları konuşmayacağız. Biz bugün bu sorunların çoğunu çözmeyi vaad eden Docker’ı konuşacağız. Şimdi sahnemize “docker” çıkıyor, hem de kahraman edasıyla.

Docker, uygulamalarımızı ve onların bağımlılıklarını, çalıştıkları ortamla birlikte “konteyner” adı verilen hafif sanal kutuların içine koymamıza olanak tanıyan açık kaynaklı bir platform aslında. Ama merak etme, bu yazıda sadece teknik tanımların peşinden koşmayacağız. Ben nasıl anladıysam sana da öyle anlatacağım. Docker’ın ne olduğunu, neden bu kadar sevildiğini, geliştiricilerin neden onu ellerinden bırakmadığını birlikte keşfedeceğiz.

## Yazının Devamında Neler Var?

*   Neden Docker’a ihtiyaç duyduk?
*   Docker tam olarak ne yapar?
*   Konteyner nedir, sanal makineden farkı ne?
*   Docker ile ilk konteyner nasıl çalıştırılır?


![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-3.jpg)

## Neden Docker’a İhtiyaç Duyduk?

Bir yazılım projesine başladın. Geliştirme ortamını kurdun, kütüphaneleri yükledin, her şey tıkır tıkır çalışıyor. Ama sıra projeyi takım arkadaşına, test ortamına ya da sunucuya aktarmaya geldiğinde işler sarpa sarıyor. Çünkü…

> “Abi sende çalışıyor da, bende çalışmıyor ya.”

Bu hepimizin yaşadığı klasik bir senaryo. Çünkü her makine farklı: işletim sistemi farklı, kütüphane versiyonları farklı, yapılandırmalar farklı… Yani uygulamanın çalışması sadece yazılım ile alakalı değil, çalıştığı **ortamla** da ilgili.

İşte bu yüzden **Docker gibi araçlara ihtiyaç duyduk**. Çünkü yazılım sadece kod değil; onun bağımlılıkları, çalıştığı sistem, ayarları, portları, ortam değişkenleri… hepsi bir bütün. Docker, bu bütünlüğü “container (konteyner)” adını verdiğimiz izole kutulara sarıp, her yerde aynı şekilde çalışmasını sağlıyor.

## Docker Ne Yapar? — Büyülü Bir Sandık Gibi Düşün


![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-4.jpg)

Docker, yazılımını alır, çalışması için gereken her şeyi yanına koyar (kütüphaneler, ortam ayarları, servisler vb.) ve bunları bir konteyner içine paketler. Bu konteyner, nereye götürürsen götür, aynı şekilde çalışır.

Şöyle düşün:

*   Geliştirici bilgisayarı
*   Test sunucusu
*   Üretim ortamı
*   Bulut sağlayıcılar

Docker sayesinde hepsi aynı ortamı görür. Çünkü her şey konteynerin içinde, bilgisayarında ne olursa olsun etkilenmez.

Ve en güzeli: Docker çok hafif bir şey. Sanal makineler gibi ağır değil. Saniyeler içinde başlatılır, kaynaklarını çok ama çok az tüketir. Yani hem hızlı hem taşınabilir hem de güvenilir. **Büyülü bir sandık.**

## Container Nedir? Sanal Makineden Farkı Ne?

Bu sorunun cevabı, Docker’ın neden bu kadar devrim yarattığını daha iyi anlamamıza yardım ediyor.

### Sanal Makine (Virtual Machine):

*   Tam bir işletim sistemi çalıştırır (örneğin Ubuntu).
*   Ağırdır, RAM ve diskten bolca yer kaplar.
*   Başlatması zaman alır.

### Docker Konteyneri:

*   Sadece uygulaman ve onun çalışması için gerekli olan şeyleri içerir.
*   Ana sistemin çekirdeğini paylaşır.
*   Çok daha hafiftir ve hızlı başlar.
*   Aynı makine üzerinde birden fazla konteyner rahatlıkla çalışabilir.

## 🐳Docker ile İlk Konteynerimizi Çalıştıralım

Teori güzel, ama pratik olmadan biraz anlamsız kalıyor her şey. Şimdi Docker yüklü bir sistemde (Windows, Mac veya Linux fark etmez) ilk konteynerimizi çalıştırarak işe başlayalım.

### 1\. Docker Kurulu mu?

İlk adım olarak sisteminde Docker kurulu mu kontrol et. Terminal veya komut satırına şu komutu yaz:

```bash
docker \--version
```

Eğer kurulu değilse [aha da buradan](https://www.docker.com/products/docker-desktop/) Docker Desktop’u indirip yükleyebilirsin. Kurulum sonrası bilgisayarı yeniden başlatmak gerekebilir.

### 2\. İlk Docker Komutu: Hello World

```bash
docker run hello-world
```

Bu ne yapar dersen:

*   Docker Hub’dan `hello-world` isimli bir imaj çeker.
*   Bu imajı çalıştırır.
*   Terminalde sana “Merhaba, Docker çalışıyor!” mesajı verir. **Verdi mi?**

### 3\. Kendi Uygulamamız için Dockerfile Oluşturalım

Şimdi gel, basit bir Python uygulamasını Docker içinde çalıştıralım.


`app.py` dosyamız:

print("Docker içinden merhaba!")

`Dockerfile`:

\# Temel imaj olarak Python kullan dedik.  
FROM python:3.10-slim  
  
\# Çalışma dizinini ayarladık  
WORKDIR /app  
  
\# Kod dosyasını konteynere kopyaladıl  
COPY app.py .  
  
\# Konteyner başlatıldığında ne çalıştırılacak?  
CMD \["python", "app.py"\]

### Docker image oluştur:

Terminale şunu yaz:

```bash
docker build -t merhaba-dunya .
```

Uygulamayı çalıştır:

```bash
docker run merhaba-dunya
```

Ve boom! Terminalde şunu göreceksin:

Docker içinden merhaba!

### 4\. Peki Ne Oldu?

*   Docker, Python tabanlı bir mini sistem oluşturdu. (Hazır şeysileri var böyle.)
*   Senin `.py` dosyanı içine kopyaladı.
*   Ve bunu küçük, taşınabilir bir konteyner olarak çalıştırdı.

İşte bu kadar! Artık uygulaman sistemden bağımsız olarak, **Docker konteyneri içinde** çalıştı. Senin için özel bir ortam kurmaya gerek yok. Nerede çalıştırırsan çalıştır, sonuç aynı olacak.

![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-5.jpg)

## Sonuç — Docker Sadece Bir Araç Değil, Bir Alışkanlık (Bence)

Docker, modern yazılım geliştirme süreçlerinde sadece bir “araç” değil; **bir düşünme ve çalışma şekli**. Uygulamalarını izole ortamlarda çalıştırmak, bağımlılıkları yönetmek, “bende çalışıyor ama sunucuda bozuldu” gibi sorunları ortadan kaldırmak istiyorsan, Docker en büyük yardımcın olacak.

### Docker Neden Bu Kadar Seviliyor?

*   Her ortamda aynı şekilde çalışır.
*   Ekip çalışmasında uyum sağlar.
*   Uygulamaları taşımayı kolaylaştırır.
*   Otomasyon süreçlerini hızlandırır.
*   Yerel geliştirmeden üretime kadar tam destek sunar.

Ve en güzeli? Öğrenmesi keyifli, kullanması hızlı.  
Bir kez alıştığında her projene Docker desteği eklemek istersin. Çünkü özgürlük verir. Çünkü sistem karmaşasını senin yerine çözer.

Eğer bu yazıyı buraya kadar okuduysan, Docker dünyasına adım attın demektir. Şimdi tek yapman gereken denemek, öğrenmek. Okuduğun için sağol, görüşürüz.