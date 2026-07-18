---
title: "Poyraz ile Yazılıma Dair #1319072026"
category: "Newsletter"
date: "2026-07-19"
readTime: "6 min read"
author: "Poyraz Avsever"
slug: "poyraz-ile-yazilima-dair-1319072026"
excerpt: "Bu hafta yapay zeka model fiyat savaşlarından kurumsal ajan protokollerine, HTTP QUERY metodundan Figma ve Cloudflare güncellemelerine kadar yoğun bir teknoloji gündemimiz var."
coverImage: "/blog/images/poyraz-ile-yazilima-dair-1319072026-cover.png"
lang: "tr"
---

# Poyraz ile Yazılıma Dair #1319072026

Selamlar,

Poyraz ile Yazılıma Dair serimizin yeni haftasındayız. Yine teknoloji, yazılım ve tasarım dünyasını sarsan, ajandalara not edilmesi gereken gelişmeleri sade ve doğrudan bir şekilde bir araya getirdim.

Gelin, bu haftanın öne çıkan yapay zeka olaylarıyla hızlıca başlayalım.

## Yapay Zeka Gelişmeleri

### Büyük Model Fiyat Savaşı ve Çip Krizi

[Kaynak linki](https://kersai.com/ai-breakthroughs-july-2026/)

Grok 4.5, GPT-5.6 ve Muse Spark 1.1 arasında büyük bir fiyat rekabeti başladı. Yapay zeka maliyetleri düşerken, Meta açık ağırlıklı modellerden çekildi ve DeepSeek, Nvidia bağımlılığını azaltmak için kendi çipini tasarlamaya girişti.

Diğer yandan Microsoft, kar marjı krizi nedeniyle 4.800 kişiyi işten çıkardı. Artık büyük şirketler geleneksel SaaS yazılımlarına lisans ödemek yerine kendi yapay zeka sistemlerini kuruyor. Bu durum yazılım sektöründeki kartları tamamen yeniden dağıtacak bence. Yapay zekanın maliyet emtiasına dönüşmesi harika olsa da, büyük teknoloji şirketlerinin iş gücünü bu denli sert kesmesi, kurumsal dönüşümün ne kadar sancılı olacağının en net kanıtı.

### Kurumsal Ajan Protokolü İttifakı

[Kaynak linki](https://www.buildfastwithai.com/blogs/ai-news-today-july-13-2026)

Google, Microsoft, Salesforce, Snowflake ve ServiceNow dev bir ortaklık kurdu. Amaçları, Anthropic ve OpenAI'nin kurumsal pazardaki gücünü kırmak için ortak bir yapay zeka ajan-bağlantı protokolü geliştirmek.

Yapay zekanın kendi zekasından ziyade, artık sistemlerin birbiriyle nasıl konuşacağı, yani "internet tesisatı" savaşı başladı. Kimin standardı kabul görürse önümüzdeki 10 yılın kazananı o olacak. Biz geliştiriciler için bu protokol savaşlarını takip etmek kritik; çünkü gelecekte entegrasyonlarımızı bu yeni kurallara göre yazacağız.

### GPT-Live: Tam Çift Yönlü Ses Devrimi

[Kaynak linki](https://openai.com/tr-TR/index/introducing-gpt-live/)

OpenAI, eşzamanlı olarak hem konuşup hem dinleyebilen GPT-Live ses modelini çıkardı. Eski asistanlar gibi sıranın gelmesini beklemiyor, insan gibi araya girilmesini veya söz kesilmesini doğal bir şekilde tolere edebiliyor.

Ağır bir mantıksal işlem gerektiğinde ise arka planda bunu diğer modellere devredip sohbet akışını hiç bozmuyor. Sesli asistanlarla "telsiz" gibi konuşma dönemi bitti diyebiliriz. Müşteri hizmetlerinden günlük kodlama asistanı deneyimlerimize kadar AI etkileşimini bambaşka bir doğallığa taşıyacak bir altyapı.

### PwC ve OpenAI Kurumsal Ön Cephe İşbirliği

[Kaynak linki](https://podimo.com/shows/the-varosity-ai-gtm-report/episode/6f099132-aecb-582d-a0ea-339add4b8581)

Danışmanlık devi PwC, OpenAI'nin yeni sesli ajan altyapısını kullanarak müşteri hizmetleri, pazarlama ve satış departmanlarında doğrudan otonom sesli asistanları devreye aldı.

Bu hamle, çağrı merkezi ve müşteri temas noktalarında teoride konuşulan yapay zeka devriminin sahada fiilen başladığını gösteriyor. Artık AI sadece arka ofis işlerinde kod yazan bir araç değil, doğrudan müşterinin karşısına çıkan dijital bir çalışan haline geliyor.

## Yazılım Gelişmeleri

### HTTP QUERY Metodu Standardizasyonu

[Kaynak linki](https://www.developersdigest.tech/blog/rfc-10008-http-query-method)

IETF, 16 yıl aradan sonra HTTP protokolüne "QUERY" adında ilk kez yeni bir metod ekledi. Eskiden büyük yapay zeka istemleri veya karmaşık veriler için POST kullanıyorduk ama bu istekler önbelleğe alınamadığı için büyük GPU ve sunucu maliyetleri yaratıyordu.

QUERY metodu ise tıpkı POST gibi gövdede devasa veri taşıyabilirken, tıpkı GET gibi güvenli ve önbelleklenebilir çalışıyor. Bu durum veri merkezlerindeki maliyetleri uç noktalarda ciddi oranda düşürecektir. Ancak siber güvenlik ekipleri için acil bir alarm bu; çünkü mevcut güvenlik duvarları bu metodu henüz tanımadığı için araya gizlenmiş saldırıları gözden kaçırabilir. Savunma sistemlerimizi acilen güncellememiz gerekiyor.

### TypeScript 7.0'ın Go Diliyle Yeniden Doğuşu

[Kaynak linki](https://www.infoworld.com/article/4196378/go-based-typescript-7-0-arrives.html)

Microsoft, JavaScript tabanlı çalışan TypeScript derleyicisini tamamen Go diline taşıdı. Go'nun yerel hız ve çoklu iş parçacığı desteği sayesinde devasa projelerde derleme süreleri tam 10 kat hızlandı.

Dakikalar süren beklemelerin saniyelere düşmesi biz geliştiricilerin günlük üretim hızını inanılmaz artıracaktır. Eski projelerin ve araçların bozulmaması için geriye dönük bir uyumluluk paketi olan `tsc6` sunmaları da geçiş sürecini oldukça kolaylaştırmış.

### Supabase OpenCode ve Binary Destek Güncellemesi

[Kaynak linki](https://github.com/orgs/supabase/discussions/47796)

Açık kaynaklı veri tabanı platformu Supabase, yapay zeka ajanlarının doğrudan tablolara, loglara ve uç fonksiyonlara bağlanmasını sağlayan "OpenCode" adında bir MCP entegrasyonu çıkardı.

Ayrıca canlı ekran görüntüleri ve sensör verileri gibi ağır paketleri daha düşük gecikmeyle aktarmak için anlık yayın altyapısına ikili veri desteği ekledi. AI ajanlarının veri tabanlarıyla bu kadar doğrudan ve yapılandırılmış çalışabilmesi, otonom yazılım süreçlerinde veri yönetimini çok daha stabil hale getirecektir.

### GitHub Gelişmiş Arama ve Güvenlik Taramaları

[Kaynak linki](https://releasebot.io/updates/github)

GitHub, projeler sekmesine mantıksal operatörlerle çalışan gelişmiş arama özellikleri eklerken, yöneticilere de arşivlenmiş PR'ları genel görünümden kaldırma yetkisi verdi.

En kritik güncelleme ise Copilot içine gelen `/security-review` komutu; bu sayede yazdığımız kod değişiklikleri anında yüksek doğrulukla güvenlik analizinden geçebiliyor. Kod yazma hızı arttıkça güvenlik zafiyeti riski de büyüyordu, bu tarz yerleşik tarama araçları projelerin temiz kalması için artık zorunlu bir ihtiyaç.

## Tasarım Gelişmeleri

### Figma Code Layers ve GPT-5.6 Entegrasyonu

[Kaynak linki](https://releasebot.io/updates/figma)

Figma, koda dayalı ekranların içeri aktarım sürecini iyileştiren "Code Layers" özelliğini çıkardı. Artık içe aktarılan tasarımlar, sistemdeki mevcut değişkenlere otomatik olarak bağlanıyor.

Ayrıca Figma Make platformuna entegre edilen GPT-5.6 modeli, çok eksik metin komutlarından bile görsel hiyerarşisi kusursuz, kendi kendini onarabilen işlevsel prototipler üretebiliyor. Tasarım ile kod arasındaki teslim sürtüşmelerini sıfıra indiren bu adım, Figma'nın artık sadece bir çizim aracı değil, ürün geliştirmenin ana merkezine yerleştiğini gösteriyor.

### Meta Astryx Tasarım Sistemi Yükselişi

[Kaynak linki](https://www.opensourceforu.com/2026/07/github-trending-astryx-brings-ai-ready-open-source-to-react/)

Meta, kendi iç uygulamalarında yıllarca test ettiği ve CSS yükünü %80 azaltan StyleX tabanlı "Astryx" React tasarım sistemini açık kaynak olarak sundu.

Bu sistemin asıl devrimsel yanı, insanlar yerine yapay zeka kodlama ajanlarının anlayabileceği makine-okunabilir JSON manifestoları ve MCP desteği sunması. Kodlama ajanlarının arayüz üretirken gördüğü halüsinasyonları tamamen ortadan kaldıran bu yaklaşım, gelecekte tasarım sistemlerinin insanlar için değil, otonom ajanlar için optimize edileceğinin net bir işareti.

## Teknoloji Haberleri

### Apple'dan OpenAI'ye Ticari Sır Davası

[Kaynak linki](https://www.buildfastwithai.com/blogs/ai-news-today-july-13-2026)

Apple, özellikle M-serisi çiplerini ve cihaz-içi yapay zeka altyapısını geliştiren 400'den fazla çalışanını transfer ettiği gerekçesiyle OpenAI'ye "ticari sır hırsızlığı" davası açtı.

Elon Musk'ın da X platformu üzerinden tartışmaya dahil olup davayı desteklemesi, olayı tam bir prestij savaşına dönüştürdü. Yapay zeka rekabeti artık sadece yazılımdaki modeller üzerinden değil, o modellerin çalışacağı donanım ve çip teknolojileri üzerinden yürütülüyor. Sektördeki yetenek savaşlarının ne kadar agresifleşebileceğini bu dava ile çok net görüyoruz.

### EU AI Act 50. Madde Yürürlüğe Giriyor

[Kaynak linki](https://podimo.com/shows/the-varosity-ai-gtm-report/episode/920602b7-8715-5d8a-979d-b3c31007dc61)

Avrupa Birliği Yapay Zeka Yasası'nın sentetik içeriklerin açıkça yapay zeka tarafından üretildiğinin belirtilmesini zorunlu kılan 50. Maddesi, 2 Ağustos itibarıyla yasal yaptırım gücüne kavuşuyor.

En kritik nokta; bu yasal sorumluluk OpenAI veya Anthropic gibi modeli üreten şirkete değil, o içeriği sitelerinde veya reklamlarında yayınlayan markaya ait olacak. Yapay zeka araçlarını kullanan tüm şirketlerin yasal cezalarla karşılaşmamak için içerik süreçlerini acilen bu şeffaflık kurallarına göre düzenlemesi gerekiyor.

### Intel'den İrlanda'ya 5 Milyar Euro'luk Dev Çip Yatırımı

[Kaynak linki](https://newsroom.intel.com/)

Yarı iletken tedarik zincirinde Avrupa'nın payını artırmak isteyen Intel, İrlanda'daki üretim tesislerini genişletmek için 5 milyar Euro'luk dev bir yatırım kararı aldı.

Şirket ayrıca kendi kurumsal yapısını otonom ajanlarla dijitalleştirmek için Google Cloud ve Gemini Enterprise ile stratejik bir ortaklığa gitti. Çip üretimindeki altyapı yatırımlarının bu denli büyümesi, önümüzdeki yıllarda yapay zekanın donanım tarafındaki arz krizlerini çözmek adına çok stratejik bir hamle.

### Cloudflare HTTP 402 ile Ajanlardan Ödeme Alıyor

[Kaynak linki](https://unrot.co/blogs/today-top-10-ai-news-july-13-2026)

Cloudflare, web sitelerinin kendi içeriklerini okuyan veya kazıyan yapay zeka ajanlarından anında ödeme tahsil edebilmesi için "Monetization Gateway" altyapısını duyurdu.

Bu sistem, 1990'larda internetin ilk günlerinde tasarlanan ama bugüne kadar hiç kullanılmayan HTTP 402 "Payment Required" hata kodunu x402 standardı üzerinden hayata döndürüyor. İnternetin gelir modeli, botların ve makinelerin sitelerle ticaret yaptığı yepyeni bir makine ekonomisine doğru evriliyor.

### Illinois'ten Zorunlu Yapay Zeka Denetim Yasası

[Kaynak linki](https://www.enterprisetimes.co.uk/2026/07/13/security-and-ai-news-from-the-week-beginning-6-july-2026/)

ABD'nin Illinois eyaleti, yıllık geliri 500 milyon doları aşan şirketlerin yapay zeka sistemleri üzerinde bağımsız dış denetim yaptırmalarını zorunlu kılan bir yasayı kabul etti.

Yasa, sistemlerde fark edilen güvenlik açıklarının veya telafisi zor zararların 72 saat içinde bildirilmesini şart koşuyor. Devletlerin yapay zeka üzerindeki denetim mekanizmalarını sertleştirmesi, otonom sistemler geliştiren büyük ölçekli şirketler için uyumluluk süreçlerini yeni bir iş kalemi haline getirecektir.

Haftaya yeni bölümde, en güncel gelişmeler ile görüşmek üzere.

Herkese keyifli ve sakin bir hafta dilerim! 👋
