---
title: "Yayına Çıkmadan Önce Dikkat Et: Web Uygulamaları İçin Production Checklist"
category: "Testing"
date: "2026-07-22"
readTime: "16 min read"
author: "Poyraz Avsever"
slug: "yayina-cikmadan-once-dikkat-et"
permalink: "/yayina-cikmadan-once-dikkat-et"
excerpt: "Web uygulamanızı production ortamına göndermeden önce fonksiyon, güvenlik, bağımlılık, OWASP ZAP, KVKK, SEO, erişilebilirlik ve performans kontrollerini adım adım tamamlayın."
coverImage: "/blog/images/yayina-cikmadan-once-dikkat-et-cover.png"
lang: "tr"
---

# Yayına Çıkmadan Önce Dikkat Et: Web Uygulamaları İçin Production Checklist

Bir web uygulamasının geliştirme ortamında sorunsuz çalışması, yayına hazır olduğu anlamına gelmez. Gerçek kullanıcılar farklı cihazlardan gelir, beklemediğiniz girişler yapar, bağlantıyı yarıda keser, aynı butona iki kez basar ve uygulamanın hiç düşünmediğiniz köşelerine ulaşır. Üstelik production ortamında yalnızca fonksiyonlar değil; güvenlik, kişisel veriler, arama motorları, erişilebilirlik ve operasyon süreçleri de devreye girer.

Bu nedenle yayına çıkışı tek bir `deploy` komutu olarak değil, kontrollü bir teslim süreci olarak görmek gerekir. Aşağıdaki kontrol listesi küçük bir portföy sitesinden üyelik ve ödeme içeren büyük bir ürüne kadar uyarlanabilir. Her madde her projede aynı ağırlıkta olmayacaktır; önemli olan riskleri bilinçli biçimde değerlendirip sonucu kayıt altına almaktır.

> Bu yazıdaki güvenlik adımlarını yalnızca sahibi olduğunuz veya test etmek için açık izin aldığınız sistemlerde uygulayın. Otomatik araçların verdiği sonuçları da tek başına kesin açık kanıtı olarak değerlendirmeyin.

## 1. Temel Fonksiyon Testleri

İlk hedef, kullanıcının en önemli işlerini baştan sona tamamlayabildiğini doğrulamaktır. Bunun için uygulamanın bütün ekranlarını rastgele dolaşmak yerine kritik kullanıcı yolculuklarını listeleyin.

Örneğin üyelik içeren bir uygulamada şu akışları ayrı ayrı deneyin:

- Yeni kullanıcı kaydı, e-posta doğrulama ve ilk giriş
- Doğru ve yanlış bilgilerle oturum açma
- Şifre sıfırlama bağlantısının süresi ve tek kullanımlık olması
- Profil görüntüleme, güncelleme ve hesap silme
- Form gönderimi sırasında başarı, hata ve yükleniyor durumları
- Yetkili ve yetkisiz kullanıcıların görebildiği sayfalar
- Oturum süresi dolduğunda uygulamanın davranışı
- Çıkış yaptıktan sonra geri tuşuyla özel sayfalara erişim denemesi

Sadece “mutlu yolu” kontrol etmek yeterli değildir. Boş alan, çok uzun metin, beklenmeyen karakter, aynı isteğin iki kez gönderilmesi, yavaş bağlantı ve sunucudan gelen `400`, `401`, `403`, `404`, `429` ve `500` yanıtları da denenmelidir. Kullanıcı hata aldığında ne olduğunu anlayabilmeli; uygulama da yarım kalmış bir işlemi tamamlanmış gibi göstermemelidir.

### Production build'i gerçekten çalıştırın

Geliştirme sunucusu ile production build aynı davranmayabilir. Optimizasyonlar, çevre değişkenleri, sunucu tarafı render işlemleri ve yalnızca build sırasında görülen hatalar nedeniyle son kontrolü production modunda yapın.

PowerShell 7 ve üzerindeyseniz proje klasöründe şu komutu çalıştırabilirsiniz:

```powershell
npm run build && npm run start
```

Eski Windows PowerShell sürümlerinde `&&` desteklenmiyorsa iki komutu ayrı ayrı çalıştırın. Önce build'in başarıyla bittiğini gördükten sonra:

```powershell
npm run build
npm run start
```

Uygulama açıldıktan sonra tarayıcının geliştirici araçlarında Console ve Network sekmelerini kontrol edin. Sessizce oluşan JavaScript hataları, başarısız ağ istekleri, karışık içerik uyarıları ve beklenmeyen yönlendirme döngüleri burada görünür.

### Yayın öncesi kısa fonksiyon listesi

- Kritik akışlar masaüstü ve mobil ekran boyutlarında tamamlanabiliyor mu?
- Formlar klavye ile kullanılabiliyor ve doğru hata mesajını gösteriyor mu?
- Yenileme ve doğrudan URL ile açma işlemleri çalışıyor mu?
- Boş, yükleniyor, başarı ve hata durumlarının her biri tasarlandı mı?
- E-posta, dosya yükleme, ödeme ve üçüncü taraf servisleri gerçek production ayarlarıyla kontrol edildi mi?
- Veritabanı migration'ları ve başlangıç verileri için geri dönüş planı var mı?

## 2. Basit Güvenlik ve Sızma Kontrolleri

Güvenlik yalnızca bir tarama aracını çalıştırmak değildir. Önce uygulamanın temel savunmalarını elle kontrol edin. Buradaki amaç saldırı yapmak değil, açıkça görülebilen yanlış yapılandırmaları yayın öncesinde yakalamaktır.

### Kimlik doğrulama ile yetkilendirmeyi ayırın

Kullanıcının oturum açmış olması, her kaynağa erişebileceği anlamına gelmez. Bir kullanıcı URL'deki kimliği değiştirerek başka bir kullanıcının siparişini, profilini veya belgesini görebiliyorsa Broken Access Control problemi vardır. Butonu arayüzden saklamak güvenlik önlemi değildir; yetki kontrolü her istekte sunucu tarafında yapılmalıdır.

Şunları deneyin:

- Oturum açmadan özel sayfalara ve API uçlarına doğrudan istek gönderin.
- Normal kullanıcı hesabıyla yönetici rotalarına ulaşmayı deneyin.
- URL, sorgu parametresi veya istek gövdesindeki kaynak kimliğini değiştirin.
- Bir hesabın oturum belirtecini başka kullanıcıya ait kaynaklarda kullanmayı deneyin.
- Çıkış yaptıktan sonra eski belirtecin geçersiz olduğundan emin olun.

### Gizli bilgiler ve güvenlik başlıkları

Kaynak kodu, JavaScript paketleri, source map dosyaları, ağ istekleri ve hata mesajlarında parola, özel API anahtarı, veritabanı bağlantı adresi veya erişim belirteci bulunmamalıdır. İstemciye gönderilen hiçbir değer gerçek anlamda gizli değildir.

HTTPS yönlendirmesini ve en azından şu başlıkları ihtiyacınıza göre değerlendirin:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- Clickjacking'e karşı CSP içindeki `frame-ancestors` kuralı

Çerezlerde hassasiyete göre `Secure`, `HttpOnly` ve uygun `SameSite` değerlerini kullanın. CORS ayarında kimlik bilgileri açıkken gelişigüzel origin kabul etmeyin. Giriş, şifre sıfırlama ve form gönderme gibi kötüye kullanıma açık noktalarda rate limit uygulayın.

OWASP Top 10'u bir “tam güvenlik testi” olarak değil, riskleri konuşmak için ortak bir başlangıç noktası olarak kullanabilirsiniz. 2025 listesinin ilk sıralarında Broken Access Control, Security Misconfiguration ve Software Supply Chain Failures bulunuyor.

## 3. Bağımlılık Güvenliği

Uygulamanızın güvenliği yalnızca yazdığınız koddan oluşmaz. Paket yöneticisiyle kurduğunuz her bağımlılık ve onun alt bağımlılıkları yazılım tedarik zincirine eklenen yeni bir halkadır.

Node.js projelerinde ilk kontrol için kullandığınız paket yöneticisine göre şu komutlardan birini çalıştırın:

```powershell
npm audit
```

```powershell
pnpm audit
```

Raporu yalnızca açık sayısına bakarak değerlendirmeyin. Şu soruları sorun:

1. Açık production bağımlılığında mı, sadece geliştirme aracında mı?
2. Uygulamanız savunmasız kod yolunu gerçekten kullanıyor mu?
3. Güvenli sürüme yükseltme breaking change oluşturuyor mu?
4. Paket artık bakım almıyor mu; daha güvenli bir alternatif gerekli mi?
5. Risk kabul edilecekse sahibi, gerekçesi ve yeniden değerlendirme tarihi belli mi?

`npm audit fix --force` gibi zorlayıcı komutları sonucu incelemeden çalıştırmayın. Büyük sürüm yükseltmeleri uygulamayı bozabilir. Kilit dosyasını repoda tutun, CI ortamında deterministik kurulum kullanın ve bağımlılık güncellemelerini testlerden geçirerek birleştirin.

Ayrıca repoyu yanlışlıkla eklenmiş sırlar için tarayın. Geçmiş bir commit'e giren anahtarı yalnızca dosyadan silmek yeterli değildir; anahtarın iptal edilip yenilenmesi gerekir. Production'da kullanılan anahtarları en az yetki ilkesiyle sınırlandırın ve düzenli olarak döndürün.

## 4. OWASP ZAP ile Otomatik Güvenlik Taraması (Windows / PowerShell)

Elle yaptığınız kontrollerin ardından uygulamayı çalışan sistem üzerinden incelemek için OWASP ZAP Baseline Scan kullanabilirsiniz. Baseline Scan hedefi varsayılan olarak kısa süre spider ile dolaşır, ardından oluşan trafik üzerinde pasif tarama kurallarını çalıştırır. Aktif saldırı gerçekleştirmediği için CI/CD ve kontrollü production kontrolleri için Full Scan'e göre daha güvenli bir başlangıçtır.

Bu ayrım önemlidir: Baseline Scan yararlı uyarılar bulabilir ama uygulamanın güvenli olduğunu kanıtlamaz. Kimlik doğrulamalı ekranların tamamına ulaşamayabilir, iş mantığı açıklarını anlayamaz ve aktif sömürü denemeleri yapmaz. Sonuçları kod incelemesi, yetki testleri ve gerektiğinde uzman sızma testiyle tamamlayın.

### Gereksinimler

- Windows üzerinde Docker Desktop kurulu ve çalışıyor olmalı.
- Projeyi açtığınız PowerShell oturumu doğru klasörde olmalı.
- Uygulamanın production build'i çalışıyor olmalı.
- Tarayacağınız hedef size ait olmalı veya açık test izniniz bulunmalı.

Birinci PowerShell penceresinde uygulamayı başlatın:

```powershell
npm run build && npm run start
```

Uygulamanız `http://localhost:3000` adresinde açılıyorsa ikinci bir PowerShell penceresinde, yine projenin ana klasöründe şu tek satırı çalıştırın:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -r zap-baseline-report.html
```

Tarama tamamlandığında proje klasörünüzde `zap-baseline-report.html` dosyası oluşur. Dosyayı tarayıcıda açarak uyarıları, etkilenen URL'leri ve ZAP'ın önerdiği çözümleri inceleyebilirsiniz.

### Komutun her parçası ne yapıyor?

| Parça | Açıklama |
| --- | --- |
| `docker run` | ZAP imajından geçici bir konteyner başlatır. |
| `--rm` | Tarama bittiğinde durmuş konteyneri otomatik kaldırır; HTML raporunu silmez çünkü rapor host klasörüne yazılır. |
| `-t` | Konteynere sanal terminal ayırır ve çıktının terminalde okunmasını kolaylaştırır. |
| `-v "${PWD}:/zap/wrk/:rw"` | Geçerli proje klasörünü konteynerde `/zap/wrk/` yoluna okuma-yazma yetkisiyle bağlar. Raporun bilgisayarınızda kalmasını sağlayan kısım budur. |
| `zaproxy/zap-stable` | ZAP'ın kararlı Docker imajını kullanır. İlk çalıştırmada imaj indirilebilir. |
| `zap-baseline.py` | Zaman sınırlı spider ve pasif analiz yapan Baseline Scan betiğini çalıştırır. |
| `-t http://host.docker.internal:3000` | Taranacak hedefi belirtir. Protokol zorunludur. |
| `-r zap-baseline-report.html` | Tam HTML raporunun adını belirler. Mount sayesinde dosya proje klasörüne gelir. |

### Neden `localhost:3000` değil?

Konteynerin içinden bakıldığında `localhost`, Windows'ta çalışan uygulamanızı değil ZAP konteynerinin kendisini ifade eder. Docker Desktop, host makineye ulaşmak için `host.docker.internal` adını sağlar. Bu nedenle tarayıcıda `http://localhost:3000` olarak gördüğünüz uygulama ZAP komutunda genellikle `http://host.docker.internal:3000` olur.

Uygulamanız başka portta çalışıyorsa yalnızca portu değiştirin:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:8080 -r zap-baseline-report.html
```

Uzak bir test veya production adresi taranacaksa doğrudan HTTPS adresini yazın:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t https://example.com -r zap-baseline-report.html
```

### Faydalı Baseline Scan seçenekleri

- `-m 3`: Geleneksel spider'ın hedefi kaç dakika dolaşacağını belirler. Varsayılan değer 1 dakikadır.
- `-T 10`: ZAP'ın başlaması ve pasif taramanın tamamlanması için beklenecek azami süreyi dakika cinsinden sınırlar.
- `-j`: JavaScript ağırlıklı sayfaları keşfetmek için modern spider'ı da kullanır; süreyi ve kaynak tüketimini artırabilir.
- `-J zap-report.json`: HTML yanında otomasyon araçlarının okuyabileceği JSON raporu üretir.
- `-w zap-report.md`: Markdown raporu üretir.
- `-g zap-rules.conf`: Varsayılan kural yapılandırmasını oluşturur.
- `-c zap-rules.conf`: Kuralları `INFO`, `WARN`, `FAIL` veya `IGNORE` olarak sınıflandırdığınız yapılandırmayı kullanır.
- `-I`: WARN bulunduğunda komutun başarısız dönüş kodu vermemesini sağlar. CI politikanızı bilinçli belirlemeden eklemeyin.

Örneğin HTML ve JSON raporunu birlikte üretip tarama süresini artırmak için:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -m 3 -T 10 -r zap-baseline-report.html -J zap-baseline-report.json
```

### Dönüş kodlarını doğru okuyun

ZAP betiği rapor üretmiş olsa bile terminal komutu sıfırdan farklı bir kodla bitebilir. Bu her zaman aracın bozulduğu anlamına gelmez:

- `0`: Belirlenen politikaya göre başarı.
- `1`: En az bir `FAIL` bulundu.
- `2`: `FAIL` yok, en az bir `WARN` bulundu.
- `3`: Taramanın kendisinde başka bir hata oluştu; hedefe erişememe, zaman aşımı veya yapılandırma problemi gibi nedenleri araştırın.

PowerShell'de son dönüş kodunu görmek için taramadan hemen sonra `$LASTEXITCODE` yazabilirsiniz. CI sürecinde `1` ve `2` kodlarına nasıl davranılacağını takım politikanız belirlemelidir. Varsayılan olarak uyarı üretmesi beklenen bir aracı sürekli yok saymak yerine, önce başlangıç raporunu değerlendirin; gerçek riskleri `FAIL`, kabul edilenleri gerekçesiyle `IGNORE` veya geçici olarak takip edilenleri uygun bir ilerleme kaydıyla yönetin.

### Sık karşılaşılan sorunlar

#### Hedefe ulaşılamıyor

Önce uygulamanın tarayıcıda açıldığını doğrulayın. Sonra portun doğru olduğunu ve komutta `host.docker.internal` kullandığınızı kontrol edin. Uygulama yalnızca farklı bir arayüze bağlanmışsa sunucu dinleme ayarını incelemeniz gerekebilir.

#### Rapor proje klasöründe görünmüyor

Komutu proje ana klasöründe çalıştırdığınızdan, volume ifadesinin tırnak içinde olduğundan ve `/zap/wrk/:rw` ile yazma izni verdiğinizden emin olun. Windows sürücüsü Docker Desktop ile paylaşılmıyorsa Docker ayarlarını da kontrol edin.

#### Çok fazla uyarı var

Önce uyarıları önem derecesine göre gruplayın. Güvenlik başlıkları, çerez seçenekleri ve bilgi sızdıran sunucu başlıkları sık görülür. Her bulgunun istek ve yanıt kanıtını inceleyin; false positive olanı gerekçesiz biçimde kapatmayın. Düzeltmeden sonra aynı komutu çalıştırıp raporları karşılaştırın.

## 5. Yasal Gereklilikler ve Veri Yönetimi

Kişisel veri topluyorsanız teknik olarak güvenli olmak tek başına yeterli değildir. Hangi veriyi, hangi amaçla, hangi hukuki sebebe dayanarak, ne kadar süreyle işlediğinizi bilmeniz gerekir. Bu bölüm hukuki danışmanlık değildir; ürününüzün faaliyet alanı ve hedeflediği ülkelere göre uzman görüşü alın.

Türkiye'de KVKK kapsamında aydınlatma yükümlülüğü, kişisel verisi işlenen kişiye veri sorumlusunun kimliği, işleme amacı, aktarım, toplama yöntemi, hukuki sebep ve ilgili kişi hakları hakkında bilgi verilmesini kapsar. Açık rıza gereken bir işlemde rıza almak, aydınlatma yükümlülüğünü ortadan kaldırmaz.

Yayın öncesinde şunları kontrol edin:

- Gizlilik ve aydınlatma metinleri gerçek veri akışını yansıtıyor mu?
- Zorunlu olmayan çerezler ve izleme araçları gerekli onaydan önce çalışıyor mu?
- Toplanan her alan gerçekten gerekli mi; veri minimizasyonu uygulandı mı?
- Saklama süresi dolan verinin silinmesi, yok edilmesi veya anonimleştirilmesi planlandı mı?
- Kullanıcı erişim, düzeltme ve silme taleplerini nasıl iletecek?
- Analitik, e-posta, hata izleme ve bulut sağlayıcılarına hangi veriler aktarılıyor?
- Yedekler şifreli mi, geri yükleme testi yapıldı mı ve erişimler kayıt altına alınıyor mu?
- Veri ihlalinde sorumluların, iletişim zincirinin ve yapılacak işlemlerin yazılı olduğu bir olay müdahale planı var mı?

Loglarda parola, tam erişim belirteci, kredi kartı verisi veya gereksiz kişisel bilgi tutmayın. Production verisini geliştirme ve test ortamlarına kopyalamayın; zorunluysa anonimleştirme veya maskeleme uygulayın. Yönetim panellerinde çok faktörlü kimlik doğrulama ve rol bazlı yetkilendirme kullanın.

KVKK'nın veri güvenliği açıklaması, veri sorumlusunun hukuka aykırı işlemeyi ve erişimi önlemek, verilerin muhafazasını sağlamak için uygun teknik ve idari tedbirleri almasını bekler. Bu nedenle güvenlik kontrol listeniz hukuki uyum sürecinden ayrı düşünülemez.

## 6. SEO, Erişilebilirlik ve Kapanış Kontrolleri

Son aşamada ürünün bulunabilir, kullanılabilir ve gözlemlenebilir olduğundan emin olun. Teknik olarak çalışan ama arama motorunun okuyamadığı, klavyeyle kullanılamayan veya hata verdiğinde kimseye haber vermeyen bir uygulama production'a hazır değildir.

### SEO

- Her sayfada açıklayıcı ve benzersiz `title` ile meta description bulunmalı.
- Canonical URL doğru olmalı; HTTP/HTTPS, `www` ve sondaki eğik çizgi varyasyonları tek adrese yönlenmeli.
- `robots.txt` production sayfalarını yanlışlıkla engellememeli.
- XML sitemap yalnızca yayınlanabilir ve canonical URL'leri içermeli.
- Open Graph ve sosyal medya kapakları gerçek ortamda erişilebilir olmalı.
- Başlık hiyerarşisi anlamlı olmalı; her şeyi görsel boyut için başlık yapmayın.
- 404 sayfası doğru HTTP durum kodunu döndürmeli.
- Yapılandırılmış veriler sayfada görünen içerikle uyuşmalı.

### Erişilebilirlik

WCAG 2.2'yi referans alarak en azından klavye kullanımı, görünür odak, renk kontrastı, form etiketleri, hata mesajları ve alternatif metinleri kontrol edin.

- Sayfanın tamamı yalnızca klavye ile kullanılabiliyor mu?
- Odak sırası mantıklı ve odak göstergesi görünür mü?
- Görsellerin anlamlı `alt` metni var mı; dekoratif görseller ekran okuyucudan gizleniyor mu?
- Form alanları görünür etiketlere ve programatik isimlere sahip mi?
- Hata yalnızca kırmızı renk ile mi anlatılıyor, yoksa metinle de açıklanıyor mu?
- Modal açıldığında odak yönetiliyor ve `Escape` ile kapanabiliyor mu?
- Hareketli içerik azaltılmış hareket tercihini dikkate alıyor mu?
- Yakınlaştırmada ve dar ekranlarda içerik kayboluyor mu?

Otomatik erişilebilirlik araçları iyi bir başlangıçtır ama klavye ve ekran okuyucu denemesinin yerini tutmaz.

### Performans ve operasyon

Lighthouse veya benzeri ölçümlerle yalnızca puana değil, gerçek darboğaza bakın. Büyük görselleri uygun boyutta ve modern formatta sunun, kritik olmayan JavaScript'i erteleyin, font yüklemesini düzenleyin ve cache politikasını doğrulayın. Ölçümü birkaç kez, mümkünse düşük güçlü mobil cihaz ve yavaş ağ koşullarında tekrarlayın.

Son olarak şu operasyon sorularını cevaplayın:

- Hatalar merkezi bir sistemde izleniyor ve doğru kişiye bildirim gidiyor mu?
- Sağlık kontrolü, uptime takibi ve temel metrikler var mı?
- Deployment sürümü veya commit kimliği kaydediliyor mu?
- Veritabanı migration'ı geriye uyumlu mu?
- Bir önceki sürüme dönme adımı gerçekten denendi mi?
- DNS, SSL sertifikası ve alan adı yenilemeleri izleniyor mu?
- Production çevre değişkenleri ve üçüncü taraf webhook adresleri doğrulandı mı?

## Sonuç: Yayına Çıkmak Bir An Değil, Bir Süreçtir

İyi bir yayın kontrolü, hiç hata olmayacağını garanti etmez. Asıl kazancı, bilinen riskleri görünür hâle getirmesi ve sorun çıktığında ne yapacağınızı önceden belirlemesidir.

Kısa özetle yayına çıkmadan önce:

1. Kritik kullanıcı akışlarını production build üzerinde test edin.
2. Yetki kontrollerini, gizli bilgileri, çerezleri ve güvenlik başlıklarını inceleyin.
3. Bağımlılık ve yazılım tedarik zinciri risklerini değerlendirin.
4. OWASP ZAP Baseline Scan ile çalışan uygulamayı tarayıp raporu yorumlayın.
5. Kişisel veri akışlarını, aydınlatma metinlerini ve saklama süreçlerini doğrulayın.
6. SEO, erişilebilirlik, performans, izleme ve geri dönüş planını tamamlayın.

Bu listeyi repoda yaşayan bir dokümana dönüştürün. Her sürümde işaretleyin, yeni bir olay yaşandığında listeyi güncelleyin ve mümkün olan maddeleri CI/CD sürecinde otomatikleştirin. Böylece “umarım çalışır” diyerek yapılan bir yayın yerine, kanıtı ve geri dönüş planı olan kontrollü bir teslim süreci kurarsınız.

## Kaynaklar

- [OWASP ZAP Baseline Scan dokümantasyonu](https://www.zaproxy.org/docs/docker/baseline-scan/)
- [OWASP ZAP Docker kullanıcı rehberi](https://www.zaproxy.org/docs/docker/about/)
- [OWASP Top 10:2025](https://owasp.org/Top10/)
- [KVKK — Aydınlatma Yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-)
- [KVKK — Veri Güvenliğine İlişkin Yükümlülükler](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler)
- [W3C — Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
