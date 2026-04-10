---
title: "Deneyimlemeden Öğrenmeniz Gereken Güvenlik Açıkları"
category: "General"
date: "2025-07-31"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "deneyimlemeden-renmeniz-gereken-g-venlik-a-klar"
excerpt: "Deneyimlemeden Öğrenmeniz Gereken Güvenlik Açıkları Yazılım geliştirme sürecinde ben dahil bir çoğumuz, kodun çalışmasına ve kullanıcı deneyiminin sorunsuz ilerlemesine …"
coverImage: "/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/deneyimlemeden-%C3%B6%C4%9Frenmeniz-gereken-g%C3%BCvenlik-a%C3%A7%C4%B1klar%C4%B1-55c31f58c2b2"
---

# Deneyimlemeden Öğrenmeniz Gereken Güvenlik Açıkları


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-2.jpg)

Yazılım geliştirme sürecinde ben dahil bir çoğumuz, kodun çalışmasına ve kullanıcı deneyiminin sorunsuz ilerlemesine odaklanıyoruz. Ancak bir proje ne kadar işlevsel görünürse görünsün, **arka planda kalan güvenlik önlemleri** yeterince düşünülmediğinde büyük sorunlara yol açabilir.

Yakın zamanda yaşadığım bir olay, bu gerçeğin var olduğunu bana güzelce hatırlattı.

Freelance olarak geliştirdiğim bir **blog uygulaması** vardı. Modern teknolojilerle **(Nextjs, Firebase, Express.js, MongoDB…)**, kullanıcı dostu bir arayüzle ve performans öncelikli geliştirilen bu uygulamayı, çalıştığım firmadaki deneyimli bir yazılımcı **abime** sadece fikir alışverişi için gösterdim. Ancak daha uygulamayı incelemesinin üzerinden birkaç dakika geçmişti ki ciddi bir güvenlik açığını (açıklarını) fark etti.

Bu durum benim için bir dönüm noktası oldu. Çünkü proje **çalışıyordu**. Hatta kullanıcı kayıt, içerik yönetimi gibi birçok özellik eksiksizdi. SEO 100 alıyordu, site aşırı hızlıydı. Ama güvenlik konusuna yeterince eğilmediğimi açıkça gösteriyordu sağolsun **abim**. Hemen ardından şu sorularla baş başa kaldım:

\- Next.js gibi modern bir framework kullanırken bile ne tür güvenlik açıkları doğabilir?  
\- Sık yapılan hatalar neler?  
\- Projeyi yayına almadan önce hangi kontroller mutlaka yapılmalı?  
\- Uygulama içi kontroller, istemci ve sunucu tarafında nasıl ayrılmalı?

Bu yazıda, hem kendi deneyimimi hem de bu olaydan sonra yaptığım kapsamlı araştırmaları bir araya getirerek, **web geliştirmede karşılaşılabilecek güvenlik açıkları** ve **bunlardan korunma yöntemlerini** detaylı şekilde paylaşacağım.

İster benim gibi junior bir geliştirici olun ister senior, bu yazıdaki bilgilerin projelerinizde ciddi fark yaratacağına inanıyorum.

## Yaşadığım Güvenlik Açığı Neydi?

![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-3.jpg)

Geliştirdiğim projede, admin paneline yalnızca yetkili kullanıcıların erişebilmesini sağlamak için bir doğrulama mekanizması kurmuştum. Ancak kurduğum bu mekanizma, düşündüğüm kadar sağlam değilmiş.

Admin paneline yönlendirme şu şekilde çalışıyordu:

1.  Kullanıcı admin paneline ait bir route’a erişiyordu (`/admin` gibi),
2.  Sayfa yüklendikten sonra `useEffect` içinde auth kontrolü yapılıyordu,
3.  Eğer kullanıcı admin değilse, sayfa içinden bir `router.push("/")` ile yönlendirme yapılıyordu.

Kağıt üzerinde işe yarıyor gibi görünse de, pratikte büyük bir güvenlik açığı barındırıyormuş, bu genç kardeşiniz nereden bilsin.

Projeyi sadece fikir alışverişi amacıyla gösterdiğim yazılımcı **abim**, bu yönlendirme yapılmadan önce tarayıcıda admin panelinin içeriğini görüntülemeyi başardı. Yani kullanıcı admin olmasa bile, auth kontrolü yapılmadan önce bileşenler render edilmişti.

### Bu Neden Tehlikeli?

*   Sayfa yüklenir yüklenmez içeriğin render edilmesi, aslında yetkisi olmayan kullanıcının **gizli verileri görmesine** (çokta gizli değil ama) neden olabiliyor.
*   Üstelik bu sayfada form bileşenleri, istatistikler, hatta belki de yönetimsel aksiyon butonları varsa (ki vardı), saldırgan bu endpoint’lere doğrudan istek göndererek sistemi istismar edebilir.

Bu noktada temel problem şuydu: **Yetki kontrolü istemci tarafında yapılıyordu.**

Bu, kilitli(?) bir kapının önüne not koymaya benzer: “Bu odaya sadece yetkililer girebilir. Değilsen geri dön.”  
Ama unutmayın, **kapı aslında kilitli değil**, sadece not bırakılmış.

### Doğru Yaklaşım Ne Olmalıydı?

Next.js gibi SSR destekli projelerde, özellikle özel route’lara erişim gerekiyorsa:

*   Yetki kontrolü **sunucu tarafında (**`**getServerSideProps**`**)** yapılmalı,
*   Ya da sayfa tamamen `middleware` ile koruma altına alınmalı (**abim** direkt bana bunu önerdi),
*   Ve hiçbir şekilde yetkisiz kullanıcıya **gizli içerik render edilmemeli**. (Ben bunu yaptım.)

## Şimdi gelelim diğer araştırmalarıma, özellikle web projelerinde sık görülen güvenlik açıkları ve alınması gereken önlemler.

Yazılım geliştirirken çoğu zaman “çalışıyor mu?” sorusunu odak noktasına koyuyorduk ya. Ancak uygulamanın sorunsuz çalışması, onun güvenli olduğu anlamına hiçbir zaman gelmiyor. Kullanıcıdan gelen her veri, tarayıcıda görünen her bileşen ve sunucuya gönderilen her istek potansiyel bir açık barındırabilir.

İşte modern web projelerinde — özellikle Next.js gibi framework’lerle geliştirilenlerde — en sık karşılaşılan güvenlik açıkları ve bu açıklara karşı alınması gereken önlemler:


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-4.jpg)

### 1\. Yetkisiz Erişim (Broken Access Control)

**Nedir?**  
Kullanıcının kendisine ait olmayan kaynaklara erişebilmesi. Örneğin: başkasına ait içerikleri görüntüleyebilmesi, düzenleyebilmesi ya da silebilmesi.

**Nasıl oluşur?**

*   Auth kontrolünün sadece frontend’de yapılması
*   API endpoint’lerinde kullanıcıya ait verilerle ilgili kontrol yapılmaması

**Nasıl önlenir?**

*   Her istek sunucu tarafında doğrulanmalı. Örneğin: `req.user.id === post.userId` gibi kontroller mutlaka yapılmalı
*   Yetki kontrolü client’ta değil, backend ya da API route’larda yapılmalı.


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-5.jpg)

### 2\. XSS (Cross-Site Scripting)

**Nedir?**  
Kötü niyetli bir kullanıcının uygulamaya zararlı JavaScript kodu enjekte etmesi ve bu kodun diğer kullanıcıların tarayıcısında çalışması.


**Nasıl oluşur?**

*   Kullanıcıdan alınan verilerin doğrudan HTML’e yazılması
*   `dangerouslySetInnerHTML` gibi yöntemlerin güvenlik önlemi olmadan kullanılması

**Nasıl önlenir?**

*   Kullanıcıdan gelen tüm içerikler sanitize edilmeli. (örn: `DOMPurify`, `sanitize-html`)
*   `dangerouslySetInnerHTML` kullanımı mutlaka filtreleme ile birlikte yapılmalı.


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-6.jpg)

### 3\. CSRF (Cross-Site Request Forgery)

**Nedir?**  
Kullanıcının oturumunun açık olduğu bir anda, haberi olmadan kötü niyetli bir isteğin onun adına sunucuya gönderilmesi.

**Nasıl oluşur?**

*   Kullanıcıdan gelen POST isteklerinin kimlik doğrulaması olmadan işlenmesi

**Nasıl önlenir?**

*   CSRF token kullanımı (NextAuth, trpc, tRPC gibi çözümlerde desteklenir)
*   CORS politikalarının sıkı şekilde tanımlanması
*   SameSite cookie ayarlarının uygun yapılması


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-7.jpg)

### 4\. SSR/ISR Fonksiyonlarında Gizli Bilgi Sızıntısı

**Nedir?**  
Sunucu tarafında çalışması gereken bazı hassas verilerin yanlışlıkla istemciye taşınması.

**Nasıl oluşur?**

*   `getServerSideProps` içinde alınan tüm verilerin `props` olarak frontend’e iletilmesi
*   Admin panelde gizli verilerin, kontrolsüzce SSR sonucu sayfada görünmesi

**Nasıl önlenir?**

*   Hassas veriler `props` olarak frontend’e gönderilmemeli
*   Yalnızca gerekli ve güvenli veriler render edilmeli
*   Gerekiyorsa ayrı bir API route ile sadece yetkili kullanıcılara veri sağlanmalı


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-8.jpg)

### 5\. Güvensiz API Kullanımı

**Nedir?**  
API route’larının herkes tarafından erişilebilir ve manipüle edilebilir olması.

**Nasıl oluşur?**

*   Herhangi bir doğrulama yapmadan POST/PUT/DELETE isteklerinin kabul edilmesi

**Nasıl önlenir?**

*   API route’larında oturum kontrolü (örneğin NextAuth ile `getServerSession`) (Ben bunu yeni öğrenmenin üzüntüsünü yaşıyorum.)
*   Kullanıcıların sadece kendi verilerine işlem yapabilmesini sağlayan kontroller


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-9.jpg)

### 6\. Rate Limiting Eksikliği

**Nedir?**  
Saldırganların sürekli istek göndererek sistemin kaynaklarını tüketmesi (örneğin brute force, form spam).

**Nasıl oluşur?**

*   API endpoint’lerinde istek sayısına sınır konulmaması
*   Özellikle auth, şifre sıfırlama gibi kritik rotalarda koruma eksikliği

**Nasıl önlenir?**

*   `express-rate-limit`, `next-rate-limit`, `upstash/ratelimit` gibi kütüphaneler kullanarak sınır koymak
*   Captcha entegrasyonu (reCAPTCHA, **hCaptcha** benim favorim)


![](/blog/images/deneyimlemeden-renmeniz-gereken-g-venlik-a-klar-img-10.jpg)

### 7\. .env Verilerinin İstemciye Taşınması

**Nedir?**  
Sunucuya özel gizli key’lerin istemci tarafına taşınması.

**Nasıl oluşur?**

*   `.env` değişkenlerinin `NEXT_PUBLIC_` prefix’i ile kullanılması ama aslında gizli bir bilgi içermesi. (Ben bunu çok yapmışım, çok. Kimse beni uyarmadı, ama artık siz uyarıldınız değerli arkadaşlar.)

**Nasıl önlenir?**

*   Gizli veriler sadece sunucu tarafında kullanılmalı
*   `NEXT_PUBLIC_` sadece açık anahtarlar veya güvenli veriler için ayrılmalı

Buraya kadar okuyan herkese sonsuz teşekkür. Eğer sizlerin de bana tavsiyeleri varsa duymaktan mutluluk duyarım. Sağlıcakla.