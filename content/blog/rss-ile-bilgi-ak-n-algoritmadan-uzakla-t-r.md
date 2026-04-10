---
title: "RSS ile Bilgi Akışını Algoritmadan Uzaklaştır."
category: "General"
date: "2025-08-24"
readTime: "4 min read"
author: "Poyraz Avsever"
slug: "rss-ile-bilgi-ak-n-algoritmadan-uzakla-t-r"
excerpt: "RSS ile Bilgi Akışını Algoritmadan Uzaklaştır. Algoritmalar değil, tercihlerin yön verdiği bir içerik akışını nasıl kuracağını anlatacağım bugün sana. 15 dakikada RSS’e …"
coverImage: "/blog/images/rss-ile-bilgi-ak-n-algoritmadan-uzakla-t-r-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/rss-ile-bilgi-ak%C4%B1%C5%9F%C4%B1n%C4%B1-algoritmadan-uzakla%C5%9Ft%C4%B1r-a30340175da3"
---

# RSS ile Bilgi Akışını Algoritmadan Uzaklaştır.


Algoritmalar değil, tercihlerin yön verdiği bir içerik akışını nasıl kuracağını anlatacağım bugün sana. 15 dakikada RSS’e geçiş, araçlar, mini projeler ve pratik ipuçları bu yazı içersinde. Dilersen başlayalım!


![](/blog/images/rss-ile-bilgi-ak-n-algoritmadan-uzakla-t-r-img-2.jpg)

## TL;DR

*   RSS, web sitelerinin yeni içeriklerini kronolojik ve reklamsız biçimde takip etmeni sağlar.
*   15 dakikada: bir okuyucu seç → 3–5 kaynağa abone ol → klasörle → bildirimleri ayarla → OPML yedekle.
*   Geliştiriciysen: basit bir XML şablonuyla kendi RSS’ini üret veya bir betikle haftalık özet e-postası gönder.

## Neden 2025’te RSS hâlâ anlamlı?

*   **Kronolojik ve şeffaf:** “Önce sana bunu gösterelim” mantığı yok; yeni olan en üstte.
*   **Odaklı:** Gürültüyü azaltır; reklam, öneri, sonsuz kaydırma yok. Sen bunu beğendiğine göre bunu da beğenirsin gibi yönlendirmeler yok. Neyi takip etmek istiyorsan onu takip ediyorsun. Çok basit değil mi?
*   **Taşınabilir:** OPML ile tüm aboneliklerini bir dosyada yedekleyip başka okuyucuya taşıyabilirsin. Bağımlılık derdin yok.
*   **Esnek:** Haber, blog, podcast, hatta iş ilanı siteleri… Birçok formatı tek akışta birleştirirsin. Tek bir yer üzerinden sade, anlamlı bir arayüzle hepsini görürsün.

## RSS nedir?

**RSS (Really Simple Syndication)**, sitelerin yeni içeriklerini makinece okunabilir bir XML dosyası üzerinden yayınlamasıdır. Okuyucu (reader) uygulaması bu XML’i düzenli aralıklarla kontrol eder, yeni yazıları “okunmamış” olarak sana getirir. Konsept çok basit ve çok anlamlı.

## Nasıl çalışır?

Bir RSS besleği (feed), temelde şu elemanlardan oluşur:

*   **channel:** Besleğin kendisine dair meta (başlık, açıklama, site adresi).
*   **item:** Her bir içerik girdisi (başlık, bağlantı, tarih, özet, içerik).
*   **enclosure (opsiyonel):** Dosya ekleri (ör: podcast mp3).

Okuyucu uygulama bu XML’i indirir → değişiklik tarihine bakar → yeni “item”ları kutuna düşürür. Basit, hızlı ve güvenilir.

## Hangi problemleri çözer?

*   Farklı platformlarda dağınık duran içerikleri **tek merkezde** toplar.
*   Algoritmik akışların tetiklediği **dikkat dağınıklığını** azaltır. Benim en büyük problemim bu. Youtube’a bir şey öğrenmek için giremez oldum.
*   İçeriklerin kaybolmasını engeller; hepsi **kronolojik** sıradadır. Gayet basit.

## Başlarken: Bir RSS okuyucu seç

Aşağıdaki kategorilerden birini seçmen çoğu kullanıcı için yeterlidir. (Araç isimleri örnektir; benzer seçenekler çoktur.)

*   **Web tabanlı:** tarayıcıdan her yerde erişim (ör. bulut tabanlı okuyucular).
*   **Masaüstü:** klavye kısayolları ve rahat okuma (ör. macOS/Windows için native uygulamalar).
*   **Mobil:** boş zamanlarda yakalama (iOS/Android uygulamaları).
*   **Kendin barındır:** kontrol ve mahremiyet (ör. self-hosted çözümler. Belki bir yazıda da bunu öğreniriz.).

> _Poyraz’ın Tavsiyesi: Web + mobil kombinasyonu en pratiktir. Başlangıçta ücretsiz bir plan yeter. Şuna bakabilirsiniz:_ [_Fluent Reader_](https://hyliu.me/fluent-reader/)

## 15 Dakikada RSS’e Geçiş (Adım Adım)

1.  **Okuyucu kur** → web hesabı aç veya uygulamayı indir.
2.  **3–5 kaynak bul:**

*   2 teknoloji/blog (ör. kişisel bloglar)
*   1 haber sitesi (ör. yerel/güncel)
*   1 ilgi alanı (tasarım, veri, yapay zekâ)

**3\. Feed’i bul ve ekle:**

*   Site üst/alt bölümünde **RSS** / **Feed** ikonu
*   URL sonlarında sık görülen yollar bunlar: `/feed`, `/rss`, `/atom.xml`

**4\. Klasörle:** `Teknoloji`, `Tasarım`, `Günlük` gibi basit klasörler.


**5\. Bildirim ayarla:** Sadece “önemli” klasöre bildirim aç; hepsine değil.

**6\. OPML yedekle:** Okuyucu ayarlarında **Dışa Aktar (Export OPML)**. Dosyayı sakla.

## Mini Proje #1: Kendi RSS besleğini üret (statik site/blog)

Bir blog yazılarını programatik olarak RSS’e dökmek istersen, en yalın şablon aşağıdaki gibidir. (RSS 2.0 örneği)

<?xml version="1.0" encoding="UTF-8"?>  
<rss version\="2.0"\>  
 <channel\>  
 <title\>Ornek Blog</title\>  
 <link\>https://ornek.site</link\>  
 <description\>Son yazılar</description\>  
 <language\>tr-TR</language\>  
 <lastBuildDate\>Sun, 24 Aug 2025 10:00:00 +0300</lastBuildDate\>  
<item\>  
 <title\>İlk Yazım</title\>  
 <link\>https://ornek.site/ilk-yazim</link\>  
 <guid isPermaLink\="true"\>https://ornek.site/ilk-yazim</guid\>  
 <pubDate\>Sat, 23 Aug 2025 09:00:00 +0300</pubDate\>  
 <description\><!\[CDATA\[Kısa bir özet veya HTML içerik.\]\]></description\>  
 </item\>  
</channel\>  
</rss\>

### **Üretim seçenekleri:**

*   Statik site jeneratörleri (ör. Next.js, Astro, Hugo) için plugin/route ile dinamik üretim ki ben böyle yapıyorum.
*   Backend’de (Node, Python, .NET vb.) bir `/rss.xml` endpoint’i de bir tercih.

> _Poyraz’ın İpucusu:_ `_guid_` _değerini kalıcı yap; okuyucular aynı yazıyı tekrar göstermesin._

## Mini Proje #2: RSS’den haftalık özet e-postası (Node.js)

Aşağıdaki iskelet, birkaç feed’i okuyup son 7 günün başlıklarını toparlar. (Gereksinimler: `rss-parser`, e-posta için bir SMTP veya servis.)

// package.json: rss-parser ve nodemailer ekleyin  
// npm i - pnpm add - yarn i rss-parser nodemailer  
  
const Parser = require('rss-parser');  
const nodemailer = require('nodemailer');  
const parser = new Parser();  
  
const FEEDS = \[  
  'https://ornek.site/rss.xml',  
  'https://baska.site/feed'  
\];  
  
async function fetchItemsLast7Days() {  
  const now = new Date();  
  const weekAgo = new Date(now.getTime() - 7\*24\*60\*60\*1000);  
  const items = \[\];  
  
  for (const url of FEEDS) {  
    const feed = await parser.parseURL(url);  
    for (const item of feed.items) {  
      const d = new Date(item.isoDate || item.pubDate || 0);  
      if (d >= weekAgo) {  
        items.push({ title: item.title, link: item.link, date: d, source: feed.title });  
      }  
    }  
  }  
  
  // Tarihe göre yeni → eski  
  return items.sort((a, b) => b.date - a.date);  
}  
  
async function sendEmail(summaryHtml) {  
  const transporter = nodemailer.createTransport({  
    host: process.env.SMTP\_HOST,  
    port: 587,  
    secure: false,  
    auth: { user: process.env.SMTP\_USER, pass: process.env.SMTP\_PASS }  
  });  
  
  await transporter.sendMail({  
    from: 'RSS Özet <no-reply@senin-domainin.com>',  
    to: 'sen@eposta.com',  
    subject: 'Haftalık RSS Özeti',  
    html: summaryHtml  
  });  
}  
  
function renderHtml(items){  
  const lis = items.map(i => \`<li><a href="${i.link}"\>${i.title}</a> — <em>${i.source}</em></li>\`).join('');  
  return \`<h2>Bu Hafta</h2><ul>${lis}</ul>\`;  
}  
  
(async () => {  
  const items = await fetchItemsLast7Days();  
  const html = renderHtml(items);  
  if (items.length) await sendEmail(html);  
})();

> P_oyraz’ın İpucusu: Bunu bir zamanlayıcıyla (cron, GitHub Actions, serverless scheduler) haftada 1 kez tetikle._

## Sonuç Olarak Değerli Sen

*   Bugün bir okuyucu seç ve 3–5 feed ekle.
*   Haftalık bir zaman dilimi belirle (ör. Pazar akşamı 30 dk) ve kaçırdıklarını yakala.
*   OPML yedeğini al; sonra Mini Proje #2’yi deneyip haftalık özetini otomatikleştir.

Kendi kurduğun RSS düzenini (araçlar, klasör yapısı, ipuçları) yorumlarda paylaşabilir ve başkalarına ilham olabilirsin. Bu yazıyı faydalı bulduysan, kaydet ve paylaş ki daha fazla kişinin “bilgi akışını algoritmadan uzaklaştırmasına” yardım etmiş ol. Teşekkürler.