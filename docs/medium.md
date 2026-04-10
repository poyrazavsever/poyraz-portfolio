# Medium Yazılarını Arşiv Beklemeden (Hızlı) Taşıma Planı

Bu plan, Medium'un "Download your information" sürecini beklemeden, yayındaki makaleleri doğrudan URL üzerinden Markdown formatına dönüştürmek için tasarlanmıştır.

---

## 1. Yöntem Seçimi ve Araç Kurulumu
* **CLI (Toplu Çekim):** Tüm yazıları tek seferde çekmek için terminal üzerinden `medium-to-markdown` gibi araçları hazırla.
* **Eklenti (Tekil Çekim):** Eğer yazı sayısı az ise, tarayıcıya "MarkDownload" veya "Medium to Markdown" eklentisini kur.
* **Klasör Yapısı:** Kendi web siten (poyrazavsever.com) içinde yazılar için geçici bir `/temp-blog` klasörü oluştur.

## 2. İçerikleri Otomatik Çekme
* **Kullanıcı Yazılarını Listeleme:** Medium profilindeki (medium.com/@kullaniciadi) tüm yazı linklerini bir liste haline getir.
* **Dönüştürme Komutunu Çalıştırma:** Terminal kullanarak tüm halka açık yazıları Markdown dosyası olarak yerel bilgisayarına indir.
* **Kontrol:** İndirilen dosyaların `.md` uzantılı olduğunu ve içeriklerin (özellikle kod bloklarının) okunaklı olduğunu doğrula.

## 3. Metadata (Frontmatter) Düzenleme
* **Başlık ve Tarih:** Her dosyanın en üstüne sitenin tanıması için gerekli bilgileri ekle (Title, Date, Slug).
* **Kategori Atama:** Yazıları Medium'daki etiketlerine göre klasörle veya etiket metadatalarını güncelle.
* **Özet (Excerpt):** Yazıların giriş kısmından kısa birer özet oluşturup dosyaların başına ekle.

## 4. Görsel ve Medya Optimizasyonu
* **Görsel Kaynakları:** Markdown içindeki `https://miro.medium.com/...` ile başlayan görsel linklerini tespit et.
* **Yerel Kaydetme:** Bu görselleri manuel veya bir script yardımıyla indirip sitendeki `/public/images/blog` klasörüne taşı.
* **Yol Güncelleme:** Markdown dosyalarındaki görsel linklerini kendi sunucundaki yeni yollarla (`/images/blog/yazi1.jpg` gibi) değiştir.

## 5. Web Sitesine Entegrasyon
* **Dosya Transferi:** Hazırlanan `.md` dosyalarını sitenin içerik yönetim sistemine (Content klasörüne) kopyala.
* **Link Kontrolü:** Yazı içindeki diğer Medium yazılarına giden linkleri, kendi sitendeki yeni URL yapısına göre (`/blog/yazi-adi`) güncelle.
* **SEO Ayarı:** Her yazı için `canonical` etiketini Medium'daki orijinal linki gösterecek şekilde ayarla (Bu adım SEO için kritiktir).

## 6. Yayın ve Doğrulama
* **Local Build:** Projeyi yerelde çalıştırarak görsellerin ve stilin (UI) doğru göründüğünden emin ol.
* **Deployment:** Değişiklikleri ana repo'na gönder ve yayına al.
* **Yönlendirme:** (Opsiyonel) Medium profilindeki biyografi kısmına "Yazılarım artık poyrazavsever.com/blog adresinde!" notunu ekle.