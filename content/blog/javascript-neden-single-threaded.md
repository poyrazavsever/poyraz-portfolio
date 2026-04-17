---
title: "Javascript Neden Single-Threaded? Asenkron Mimarisini Anlamak"
category: "General"
date: "2026-04-17"
readTime: "8 min read"
author: "Poyraz Avsever"
slug: "javascript-neden-single-threaded"
excerpt: "Javascript neden tek bir iş parçacığıyla (single-threaded) çalışacak şekilde tasarlandı? Asenkron mimari, Event Loop, Promise ve Async/Await kavramlarını analojilerle basitçe açıklıyoruz."
coverImage: "https://cdn.hashnode.com/res/hashnode/image/upload/v1662447509724/F66XEPCsU.png"
---

# Javascript Neden Single-Threaded? Asenkron Mimarisini Anlamak

Merhaba,

Bu yazıda Javascript'in "Single-Threaded" yapısından, yani neden tek bir iş parçacığıyla çalıştığından bahsetmek istiyorum. Açıkçası bu konuyu ben de uzun süredir yüzeysel biliyordum (bilmiyordum). "Javascript tek thread'li çalışır" cümlesini duymuştum ama bunun gerçekte ne anlama geldiğini, arkasındaki sistemi tam olarak kavramak zaman alıyor arkadaşlar. Araştırdıkça ve öğrendikçe not aldım, şimdi de bu notlarımı sizinle paylaşmak istedim.

Yazı boyunca olabildiğince sade bir dil kullanmaya çalışacağım. Temel kavramlardan başlayacağız ve adım adım Promise, Async/Await gibi modern yapılara kadar ilerleyeceğiz.

## "Thread" Nedir?

Önce temel kavramı netleştirelim. Bilgisayar dünyasında "Thread" (iş parçacığı), işlemcinin aynı anda yürütebildiği görev yollarından biridir. Bir program birden fazla thread kullanabiliyorsa, aynı anda birçok işi paralel olarak yürütebilir. Buna "Multi-Threaded" diyoruz.

**Javascript ise "Single-Threaded" bir dildir.** Yani aynı anda sadece tek bir işi yapabilir. Bir işlem bitmeden diğerine geçmez. Kötü duruyor değil mi? Hayır, sadece devam et.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1662447509724/F66XEPCsU.png)

Bunu basit bir örnekle düşünebiliriz: Bir mutfakta tek bir aşçı var. Bu aşçı aynı anda hem çorbayı karıştırıp hem salata yapamaz, sırayla ilerlemek zorundadır.

### Peki neden böyle tasarlandı?

Bunun cevabı 1995 yılına dayanıyor. Javascript ilk ortaya çıktığında amacı çok basitti: form doğrulamaları yapmak ve ekrandaki birkaç elementi değiştirmek. Yani basit bir dil olarak doğdu.

Ama asıl neden şu: Javascript doğrudan ekrandaki yapıyı (DOM) değiştirir. Eğer birden fazla thread aynı anda DOM'a müdahale etseydi, ciddi çatışmalar çıkardı. Bir thread bir butonu silmeye çalışırken, diğeri aynı butona renk atamaya çalışabilirdi. Kimin sözü geçecek? Bu belirsizliği önlemek için Javascript en başından tek thread ile çalışacak şekilde tasarlandı.

## Call Stack ve Bekleme Sorunu

Tamam, Javascript tek thread ile çalışıyor. Peki kodları hangi sırayla işliyor?

Burada "Call Stack" yani Çağrı Yığını kavramı var. Call Stack, Javascript'in o an hangi fonksiyonu çalıştırdığını ve sırada ne olduğunu takip ettiği bir yapıdır. Üst üste yığılmış görevler gibi düşünebilirsiniz: en üstteki görev bitmeden alttakine geçilmez.

Bu yapı gayet düzenli çalışır, ta ki uzun süren bir işlemle karşılaşana kadar.

![](https://i.sstatic.net/xAQPR.png)

Diyelim ki kodunuzda bir API'den veri çekiyorsunuz ve bu istek 3 saniye sürüyor. Senkron bir yapıda Javascript o 3 saniye boyunca başka hiçbir şey yapamaz. Sayfa donar, butonlar çalışmaz, kullanıcı hiçbir yere tıklayamaz. Buna **"Blocking" (engelleme)** deniyor.

Ben bunu ilk öğrendiğimde "O zaman her şey nasıl çalışıyor? Sayfalar neden donmuyor?" diye sormuştum kendime. Cevap bir sonraki bölümde.


## Asenkron Mimari ve Web API'ler

İşte burada Javascript'in asıl zekice tasarlanmış tarafı ortaya çıkıyor.

Javascript tek başına çalışıyor olabilir ama tarayıcı ona yardımcı araçlar sağlıyor. Bunlara **Web API** diyoruz. `setTimeout`, `fetch`, DOM event listener'ları gibi işlemler aslında Javascript'in kendisi tarafından değil, tarayıcının arka planında yürütülür.

Yani şöyle düşünün: Javascript bir `fetch()` çağrısı yaptığında, bu işi tarayıcıya devreder ve kendi yoluna devam eder. Beklemez. Tarayıcı o işi arka planda halleder, iş bitince sonucu bir kuyruğa koyar.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcs5bi_NVIcZjw5ly9EDTAD4NxpmJ1ARvdw&s)

Bu sistemi ayakta tutan 3 temel parça var:

1. **Web API'ler:** Uzun süren işlemleri (ağ istekleri, zamanlayıcılar) arka planda yürüten tarayıcı araçları.
2. **Callback Queue (Görev Kuyruğu):** Tamamlanan işlemlerin sonuçlarının beklediği kuyruk.
3. **Event Loop (Olay Döngüsü):** Call Stack boşaldığında, kuyrukta bekleyen görevleri alıp Call Stack'e ileten mekanizma.

Event Loop'u ben şöyle anladım: Javascript elindeki işi bitirir, sonra kafasını kaldırıp "Kuyrukta bekleyen var mı?" diye bakar. Varsa onu alır, çalıştırır. Bu döngü sürekli tekrar eder.

Bu sayede Javascript tek thread ile çalışmasına rağmen, kullanıcı deneyimini bozmadan arka planda pek çok işi halledebiliyor.


## Callback Fonksiyonları ve "Callback Hell"

Peki arka planda tamamlanan bir iş bittiğinde, Javascript ne yapacağını nereden biliyor?

İşte burada **Callback** kavramı devreye giriyor. Callback, "Bu iş bittiğinde şu fonksiyonu çalıştır" demektir. Yani bir işlemi başlatırken, sonucu ne yapacağımızı da önceden söylüyoruz.

Javascript uzun yıllar boyunca asenkron işlemleri bu şekilde yürüttü. Basit senaryolarda gayet iyi çalışıyordu. Ama işler karmaşıklaşınca sorunlar başladı.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdwb9RvK0TchSTi3M0ecIFfqT9kHFE-kbnAQ&s)

Birbirini takip eden işlemler olduğunda, her callback bir öncekinin içine yazılmak zorunda kalıyordu. "Veriyi çek, sonra işle, sonra kaydet, sonra kullanıcıya bildir...". Her adım bir kademe daha içeri giriyordu ve kod sağa doğru kaymaya başlıyordu.

Bu duruma yazılım dünyasında **"Callback Hell"** deniyor. Kodu okumanız, hata ayıklamanız ve bakımını yapmanız inanılmaz zorlaşıyordu. Bu sorunla bizzat karşılaşmadıysanız bile, internette bu yapının örneklerini gördüğünüzde ne demek istediğimi anlarsınız.


## Promises: Daha Temiz Bir Yaklaşım

Callback Hell sorununun farkına varıldıktan sonra, ES6 (2015) ile birlikte Javascript'e **Promise** yapısı eklendi. Türkçeye "Söz" olarak çevirebiliriz ve mantığı da tam olarak bu.

Bir Promise oluşturduğunuzda, Javascript size şunu söylüyor: *"Bu işin sonucunu şu an veremem ama söz veriyorum, bittiğinde sana bildireceğim."*

Bir Promise'in 3 durumu olabilir:

1. **Pending (Bekliyor):** İşlem henüz tamamlanmadı.
2. **Resolved / Fulfilled (Tamamlandı):** İşlem başarıyla bitti ve sonuç hazır.
3. **Rejected (Reddedildi):** İşlem sırasında bir hata oluştu.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsLmzRlgIchb27XiPptm7eV9MDSE2GjHt_Aw&s)

Promise'lerin en buyuk avantajı, `.then()` ve `.catch()` ile zincirleme yazabilmemizdir. Callback'lerdeki gibi iç içe girmiyor, alt alta düz bir şekilde ilerliyor. Kodu hem yazmak hem okumak çok daha kolay hale geliyor.

Ben Promise yapısını ilk anladığımda, Callback ile yazdığım eski kodlara dönüp baktığımda farkın ne kadar büyük olduğunu görmüştüm. Gerçekten ciddi bir iyileştirme.


## Async / Await ve "Syntactic Sugar" Kavramı

Promise'ler büyük bir adımdı. Ama geliştiriciler hala daha sade bir yazım şekli istiyorlardı. `.then()` zincirleri uzadığında yine karmaşıklaşabiliyordu.

ES8 (2017) ile birlikte **Async / Await** sözdizimi geldi. Bunu anlamak için önce bir kavramı bilmek gerekiyor: **"Syntactic Sugar" (Sözdizimsel Şeker)**.

Syntactic Sugar, arka planda yeni bir mekanizma icat etmeden, mevcut yapının üzerine daha okunabilir bir yazım şekli eklemek demektir. Async/Await tam olarak budur. Arka planda hala Promise çalışıyor. Ama biz kodu yazarken sanki senkron bir kod yazıyormuşuz gibi hissediyoruz.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7QVvY5ARv47EaH8i56oDgdH0VcAl5bhyHdA&s)

Bir fonksiyonun başına `async` yazıyorsunuz, içindeki beklemesi gereken işlemlerin başına `await` koyuyorsunuz. Javascript `await` gördüğünde o işlemi beklerken bloklanmıyor, arka planda diğer işlere devam ediyor. Sonuç geldiğinde kaldığı yerden devam ediyor.

Kodu okuyan biri, sanki satır satır sırayla ilerleyen senkron bir kod görüyor. Ama arka planda asenkron mekanizma kusursuz çalışmaya devam ediyor. Bu yüzden Async/Await, hem yazması hem okuması en kolay asenkron yapı olarak günümüzde standart haline geldi.

Ben de bu konuyu öğrenirken, Async/Await'in aslında Promise'in üzerine giydirilmiş bir kılıf olduğunu anlamak en kritik noktaydı. Yeni bir teknoloji değil, var olanın daha güzel yazılmış hali.


## Sonuç

Javascript tek bir thread ile çalışıyor. Ama bu bir kısıtlama değil, bilinçli bir tasarım kararı. DOM üzerindeki çatışmaları önlemek için böyle seçildi ve asenkron mimari sayesinde bu yapının dezavantajları ortadan kaldırıldı.

Kısaca özetlersek:

- **Single-Threaded:** Aynı anda tek iş yapılır. DOM çatışmalarını önler.
- **Call Stack:** Kodların sırayla işlendiği yapıdır.
- **Web API + Event Loop:** Uzun süren işlemleri arka plana devreder, tamamlanınca kuyruktan alıp işler.
- **Callback:** "İş bitince şunu yap" mantığıdır. Basit ama iç içe geçince karışır.
- **Promise:** Sonucu söz olarak döndürür, zincirleme yazılır.
- **Async/Await:** Promise'in üzerine gelen Syntactic Sugar. Senkron gibi okunur, asenkron çalışır.

Bu konuyu öğrenirken benim için en önemli kırılma noktası, Javascript'in "tek başına" çalışmıyor olması oldu. Tek thread ile çalışıyor ama tarayıcının sağladığı araçlarla birlikte çok verimli bir sistem kuruyor. Umarım bu yazı sizin için de benzer bir resim çizdirmiştir.
