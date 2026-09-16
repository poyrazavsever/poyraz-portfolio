---
title: "Khoj + Obsidian: Kişisel Yapay Zekâ Kurulum Promptu"
slug: "khoj-obsidian-kurulum-promptu"
excerpt: "Videoda kullandığım; Ubuntu VPS üzerinde Khoj kurulumu, Gemini bağlantısı ve Obsidian senkronizasyonu için hazırladığım prompt."
coverImage: "/animation-sources/khoj-obsidian-kurulum-promptu/cover.webp"
platform: "Prompt"
tools:
  - "Khoj"
  - "Obsidian"
  - "Gemini"
  - "Docker"
  - "Cloudflare"
date: "2026-09-16"
author: "Poyraz Avsever"
lang: "tr"
---

Videoda, Obsidian notlarımla çalışan kişisel bir yapay zekâ asistanını kendi sunucuma kurmak için kullandığım promptu aşağıda paylaşıyorum. Khoj, Docker, Gemini ve Cloudflare yapılandırmasını kapsayan metni tek seferde kopyalayabilir; köşeli parantez içindeki alanları ve domain bilgilerini kendinize göre düzenleyebilirsiniz.

````prompt
Aşağıdaki kurulumu benim adıma baştan sona gerçekleştir. Komut önermekle yetinme; erişebildiğin terminali, yerel dosyaları ve bağlı Cloudflare hesabını kullanarak kurulumu uygula, sonuçları test et ve hatalarla karşılaşırsan güvenli biçimde çöz.

## Amaç

Hostinger’dan aldığım düz Ubuntu 24.04 VPS üzerine Docker kullanarak Khoj ve PostgreSQL kurmak istiyorum.

Khoj:

* Kendi domainim üzerinden HTTPS ile erişilebilir olmalı.
* Obsidian Vault’umla senkronize olmalı.
* Yanıt üretmek için Gemini API kullanmalı.
* Bilgisayarım kapalıyken de VPS üzerinde çalışmaya devam etmeli.
* İnternete açık olacağı için anonim erişime izin vermemeli.
* Khoj’un kendi portu doğrudan internete açılmamalı.
* Sunucu yeniden başladığında servisler otomatik olarak çalışmalı.

## Kullanılacak bilgiler

* VPS IP adresi: `[VPS_IP_ADRESİ]`
* VPS kullanıcısı: `root`
* Root parolası: `[ROOT_PAROLASI]`
* Domain: `brain.poyrazavsever.com`
* Cloudflare hesabı: ChatGPT’ye bağlı Cloudflare hesabımı kullan
* Gemini API anahtarı: `[GEMINI_API_ANAHTARI]`
* Khoj yönetici e-postası: `[E_POSTA_ADRESİ]`
* Geçici Khoj yönetici parolası: `[GEÇİCİ_YÖNETİCİ_PAROLASI]`
* Obsidian Vault yolu: `[OBSIDIAN_VAULT_YOLU]`

SSH anahtarı kullanma. Sunucuya `root` kullanıcısı ve verdiğim root parolasıyla bağlan. Bağlantı yine SSH protokolü üzerinden kurulabilir ancak kimlik doğrulaması parola ile yapılmalı.

Videoda gösterdiğim root parolasını ve geçici yönetici parolasını kurulum tamamlandıktan sonra değiştireceğim. Kurulumun sonunda değiştirmem gereken bütün parolaları ve anahtarları bana hatırlat.

## Çalışma kuralları

1. İşleme başlamadan önce sunucunun mevcut durumunu kontrol et.
2. Sunucuda bulunan mevcut servisleri veya dosyaları izinsiz silme.
3. Yıkıcı ya da geri alınması zor bir işlem gerekiyorsa uygulamadan önce benden onay al.
4. Parolaları ve API anahtarlarını terminal çıktısında veya sonuç raporunda gösterme.
5. Gizli değerleri mümkünse `.env` dosyasında sakla ve dosya iznini `600` olarak ayarla.
6. Güncel Khoj deposunu ve resmî kurulum dokümantasyonunu incele. Eski veya artık desteklenmeyen değişkenleri tahmin ederek kullanma.
7. Bir komut hata verirse kurulumu bırakma. Logları incele, sorunu belirle, güvenli çözümü uygula ve yeniden test et.
8. Her önemli değişiklikten önce mevcut dosyanın yedeğini oluştur.
9. Obsidian Vault içerisindeki notları silme, yeniden adlandırma veya toplu olarak değiştirme.
10. Gerçek gizli değerleri sohbet yanıtına tekrar yazma.

## 1. Sunucuyu kontrol et

Önce Ubuntu sürümünü, disk alanını, belleği, işlemciyi, açık portları ve çalışan servisleri kontrol et.

Docker kuruluymuş gibi davranma. Bu VPS, Docker şablonu kullanılmadan kurulmuş düz Ubuntu 24.04 sunucudur.

Sunucuda eski veya yarım kalmış bir Docker/Khoj kurulumu varsa önce durumunu raporla. Mevcut verileri silmeden güvenli biçimde devam et.

## 2. Sunucuyu hazırla

Sistem paketlerini güncelle.

Kurulum için gerekli temel araçları yükle:

* curl
* wget
* git
* ca-certificates
* gnupg
* ufw
* nginx
* certbot
* python3-certbot-nginx

Sunucunun saat dilimini ve saat senkronizasyonunu kontrol et.

## 3. Docker’ı kur

Docker Engine ve Docker Compose eklentisini Docker’ın güncel resmî Ubuntu deposunu kullanarak kur.

Kurulumdan sonra şu kontrolleri gerçekleştir:

```bash
docker --version
docker compose version
systemctl status docker
```

Docker servisinin sistem açılışında otomatik başlamasını sağla.

## 4. Khoj kurulum dosyalarını hazırla

Kurulum dizini olarak şunu kullan:

```bash
/opt/khoj
```

Khoj’un güncel resmî Docker Compose dosyasını aşağıdaki resmî depodan al:

```text
https://github.com/khoj-ai/khoj
```

Kurulum dosyalarını düzenlemeden önce orijinal Compose dosyasının yedeğini oluştur.

Khoj ve PostgreSQL için kalıcı Docker volume’ları kullan. Container silinse veya yeniden oluşturulsa bile veriler kaybolmamalı.

Gerekli güçlü değerleri güvenli biçimde üret:

* PostgreSQL parolası
* Django secret key

Bunları `.env` dosyasında sakla. `.env` dosyasına yalnızca root erişebilsin:

```bash
chmod 600 .env
```

Khoj yönetici hesabını verdiğim e-posta ve geçici parola ile yapılandır.

Anonim kullanım modunu kapat. Sisteme giriş yapmadan sohbet edilmesine veya notlara erişilmesine izin verme.

## 5. Gemini’yi yapılandır

Yanıt oluşturacak model sağlayıcısı olarak Gemini kullan.

Verdiğim `GEMINI_API_KEY` değerini güvenli biçimde yapılandır. OpenAI API kullanma ve benden OpenAI API anahtarı isteme.

Khoj’un mevcut sürümünde model seçiminin yönetim panelinden yapılması gerekiyorsa veritabanını doğrudan değiştirme. Khoj’u çalışır hale getir ve yönetim panelinde tamamlamam gereken en kısa adımları bana göster.

Mevcut ve desteklenen bir Gemini modeli seç. Model adını tahmin etmek yerine Khoj’un güncel sürümünün desteklediği modelleri kontrol et.

## 6. Khoj’u güvenli biçimde çalıştır

Khoj portunu yalnızca sunucunun kendisinden erişilebilir olacak şekilde yayınla:

```yaml
ports:
  - "127.0.0.1:42110:42110"
```

`42110` portunu doğrudan internete açma.

Container’ları arka planda çalıştır ve yeniden başlatma politikasını `unless-stopped` olarak ayarla.

Yapılandırmayı başlatmadan önce doğrula:

```bash
docker compose config --quiet
```

Ardından servisleri çalıştır:

```bash
docker compose up -d
```

Şunlarla durumu kontrol et:

```bash
docker compose ps
docker compose logs --tail=100
curl -I http://127.0.0.1:42110
```

Khoj ve PostgreSQL servislerinin sağlıklı biçimde çalıştığını doğrula.

## 7. Cloudflare DNS kaydını oluştur

ChatGPT’ye bağlı Cloudflare hesabımı kullan.

`poyrazavsever.com` alan adı altında şu DNS kaydını oluştur:

* Tür: `A`
* Ad: `brain`
* Hedef: `[VPS_IP_ADRESİ]`

Mevcut aynı isimli kayıt varsa çakışma oluşturma. Önce kaydı kontrol et ve gerekiyorsa güvenli biçimde güncelle.

SSL sertifikası oluşturulurken gerekirse kaydı geçici olarak `DNS only` durumuna getir. Sertifika başarıyla oluşturulduktan sonra Cloudflare proxy özelliğini etkinleştir.

Cloudflare SSL/TLS modunu `Full (strict)` olarak ayarla. Daha zayıf olan `Flexible` modunu kullanma.

## 8. Nginx reverse proxy ve HTTPS kur

Nginx’i aşağıdaki domain için reverse proxy olarak yapılandır:

```text
brain.poyrazavsever.com
```

Gelen istekleri şu adrese yönlendir:

```text
http://127.0.0.1:42110
```

Khoj’un sohbet ve gerçek zamanlı özelliklerinin çalışması için gerekli proxy header’larını ve WebSocket desteğini ekle.

Nginx yapılandırmasını etkinleştirmeden önce test et:

```bash
nginx -t
```

Let’s Encrypt ve Certbot kullanarak domain için geçerli SSL sertifikası oluştur.

HTTP isteklerini otomatik olarak HTTPS’e yönlendir. Sertifikanın otomatik yenilenmesini kontrol et:

```bash
certbot renew --dry-run
```

## 9. Güvenlik duvarını yapılandır

UFW’yi etkinleştirmeden önce parola ile kullandığımız SSH bağlantısının engellenmeyeceğinden emin ol.

Yalnızca gerekli portlara izin ver:

* `22/tcp`
* `80/tcp`
* `443/tcp`

Khoj’un `42110` portunu dış dünyaya açma.

UFW’yi etkinleştir ve durumu kontrol et:

```bash
ufw status verbose
```

Dışarıdan yalnızca SSH, HTTP ve HTTPS portlarının erişilebilir olduğunu doğrula.

Root ile parola girişini kurulum sırasında kapatma. Kurulum tamamlandıktan sonra daha güvenli bir kullanıcı ve SSH anahtarı yapısına geçmem için ayrıca öneri sun ancak bunu benden onay almadan uygulama.

## 10. Obsidian Vault’u hazırla

Bilgisayarımda bulunan Vault yolunu kontrol et:

```text
[OBSIDIAN_VAULT_YOLU]
```

Vault içerisindeki Markdown notlarını inceleyebilirsin ancak notları değiştirme veya silme.

Senkronizasyondan önce aşağıdaki türde hassas içerikleri tespit etmeye çalış:

* API anahtarları
* `.env` dosyaları
* Parolalar
* Müşteri bilgileri
* Kimlik veya ödeme bilgileri
* Özel belgeler
* Senkronize edilmemesi gereken klasörler

Hassas olabilecek içerikleri bana raporla ve benim onayım olmadan Khoj’a gönderme.

Vault’un tamamını doğrudan VPS dosya sistemine kopyalama. Obsidian’ın Khoj Community Plugin’i üzerinden sunucuya senkronizasyon yap.

Eklenti kurulabiliyorsa kur ve yapılandır. Obsidian arayüzünde manuel işlem gerekiyorsa bana yalnızca gerekli adımları göster:

1. Khoj eklentisini yükleme
2. Sunucu adresini girme
3. Khoj API anahtarını ekleme
4. Senkronize edilecek klasörleri belirleme
5. `Force Sync` çalıştırma

Sunucu adresi olarak şunu kullan:

```text
https://brain.poyrazavsever.com
```

Khoj API anahtarını ekranda veya raporda açık biçimde gösterme.

## 11. Kurulumu test et

Aşağıdaki testleri gerçekleştir:

1. Khoj ve PostgreSQL container’ları çalışıyor mu?
2. Sunucu yeniden başlatıldığında container’lar otomatik açılıyor mu?
3. `https://brain.poyrazavsever.com` geçerli SSL sertifikasıyla açılıyor mu?
4. HTTP istekleri HTTPS’e yönlendiriliyor mu?
5. Giriş yapılmadan kişisel notlara erişilebiliyor mu?
6. `42110` portuna internet üzerinden doğrudan erişilebiliyor mu?
7. Gemini ile örnek bir sohbet oluşturulabiliyor mu?
8. Obsidian’dan gönderilen örnek bir not Khoj tarafından bulunabiliyor mu?
9. Khoj verdiği cevapta ilgili nota dayanıyor mu?
10. Docker volume’ları kalıcı mı?
11. Certbot otomatik yenilemesi çalışıyor mu?
12. Cloudflare SSL modu `Full (strict)` olarak ayarlanmış mı?

Test amacıyla Obsidian Vault’uma zarar verecek veya notlarımı değiştirecek bir işlem yapma.

## 12. Sonuç raporu hazırla

Kurulum tamamlandığında kısa ve anlaşılır bir rapor ver:

* Kurulan servisler
* Container durumları
* Kullanılan domain
* HTTPS durumu
* Cloudflare DNS ve SSL durumu
* Açık portlar
* Khoj yönetici paneline nasıl gireceğim
* Gemini’nin çalışıp çalışmadığı
* Obsidian bağlantısının durumu
* Yedeklenmesi gereken dizin ve Docker volume’ları
* Sistemi başlatma, durdurma ve güncelleme komutları
* Karşılaşılan hatalar ve uygulanan çözümler
* Manuel tamamlamam gereken işlemler

Raporda hiçbir parola, API anahtarı, secret key veya oturum bilgisi gösterme.

Son olarak bana şunları hatırlat:

* Videoda görünen root parolasını değiştirmek
* Geçici Khoj yönetici parolasını değiştirmek
* Görünmüş olabilecek API anahtarlarını yenilemek
* Vault ve Khoj veritabanı için düzenli yedekleme oluşturmak
* Root parola erişimi yerine daha sonra SSH anahtarına geçmek

Eksik bir bilgi yoksa kuruluma başla. Yalnızca gerçekten gerekli bir bilgi eksikse bana sor; her küçük adımda onay bekleme.
````
