# Medium Yazılarını Kişisel Web Sitesine Taşıma Planı

Bu plan, Medium üzerindeki içeriklerin poyrazavsever.com (poyraz-portal) altyapısına Markdown formatında, SEO dostu ve kalıcı bir şekilde aktarılması için hazırlanmıştır.

---

## 1. Hazırlık ve Veri Edinme
* **Arşiv Talebi:** Medium Ayarları > Güvenlik > "Download your information" sekmesinden tüm verilerin yedeğini iste.
* **Yerel Çalışma Alanı:** Bilgisayarında `medium-migration` adlı geçici bir klasör oluştur ve gelen .zip dosyasını buraya ayıkla.
* **İçerik Analizi:** `posts` klasöründeki HTML dosyalarını incele. Hangi yazıların taşınacağına, hangilerinin taslak olarak kalacağına karar ver.

## 2. Format Dönüştürme (HTML -> Markdown)
* **Araç Seçimi:** HTML dosyalarını Markdown'a (.md) çevirmek için bir kütüphane (Turndown vb.) veya hazır bir CLI aracı belirle.
* **Frontmatter Yapılandırması:** Her Markdown dosyasının başına sitenin (Next.js/Astro vb.) okuyabileceği metadata bloklarını ekle:
    * Başlık (Title)
    * Yayın Tarihi (Date)
    * Kategori/Etiketler (Tags)
    * Kapak Görseli Yolu (Cover Image)
    * Medium Orijinal Linki (Canonical URL için)
* **Slug Temizliği:** Dosya isimlerini URL uyumlu hale getir (Örn: `yazi-basligi.md`).

## 3. Medya ve Görsel Yönetimi
* **Görsel İndirme:** Markdown içindeki Medium kaynaklı (miro.medium.com) görselleri yerel `/public/blog` klasörüne indir.
* **Link Güncelleme:** Markdown dosyasındaki uzak görsel linklerini, kendi sitendeki yerel yollarla değiştir.
* **Optimizasyon:** İndirilen görselleri WebP formatına çevirerek site hızını artır.

## 4. İçerik ve Kod Blokları Kontrolü
* **Kod Blokları:** Medium'daki kod bloklarının ve Gist yerleştirmelerinin Markdown'da ` ``` ` içine doğru şekilde girip girmediğini kontrol et.
* **Dahili Linkler:** Yazıların içinde başka Medium yazılarına verdiğin linkleri, kendi sitendeki yeni linklerle güncelle.
* **Bileşen Dönüştürme:** Eğer sitende özel UI bileşenleri kullanıyorsan (Örn: `poyraz-ui`), Markdown içindeki bazı yapıları bu bileşenlere uyarla.

## 5. SEO ve Yönlendirme Stratejisi
* **Canonical URL:** Arama motorlarının kopya içerik algılamaması için, web sitendeki yazıların `<head>` kısmına orijinal Medium linkini "canonical" olarak ekle.
* **Medium Güncelleme:** (Opsiyonel) Medium'daki yazılarını silmek yerine, en üstüne "Bu yazı artık poyrazavsever.com adresinde güncellenmektedir" notu ve linki ekle.

## 6. Yayınlama ve Test
* **Yerel Test:** Yazıları kendi portalında (localhost) render et. Görselleri, linkleri ve kod bloklarını manuel olarak test et.
* **Deployment:** İçerikleri GitHub repo'na pushla ve siteni yayına al.
* **Dizin Bildirimi:** Yeni URL'leri Google Search Console üzerinden dizine eklenmesi için gönder.

---
**Not:** Bu işlem bir kez yapıldıktan sonra, gelecekte yazacağın yazıları önce kendi sitende yayınlayıp sonra Medium'a "Import" etmen (Cross-posting) iş akışını çok daha kolaylaştıracaktır.