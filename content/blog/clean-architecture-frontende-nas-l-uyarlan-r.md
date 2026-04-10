---
title: "Clean Architecture Frontend’e Nasıl Uyarlanır?"
category: "General"
date: "2025-12-02"
readTime: "10 min read"
author: "Poyraz Avsever"
slug: "clean-architecture-frontende-nas-l-uyarlan-r"
excerpt: "Clean Architecture Frontend’e Nasıl Uyarlanır? İçerik Giriş Frontend’de neden mimariye ihtiyaç duyuyoruz? Clean Architecture’ın temel fikri Clean Architecture frontend’e uygulanabilir …"
coverImage: "/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/clean-architecture-frontende-nas%C4%B1l-uyarlan%C4%B1r-2db91f7e7c97"
---

# Clean Architecture Frontend’e Nasıl Uyarlanır?


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-2.jpg)

## İçerik

*   Giriş
*   Frontend’de neden mimariye ihtiyaç duyuyoruz?
*   Clean Architecture’ın temel fikri
*   Clean Architecture frontend’e uygulanabilir mi?
*   Katmanların tanımı
*   Bağımlılık yönü ve soyutlama mantığı
*   Kod organizasyonu ve best practices
*   Todo örneği ile uygulama
*   Sonuç ve değerlendirme

## TL;DR

Frontend’de Clean Architecture, tüm projeyi “UI + Application + Domain + Infrastructure” olarak zihinde ayrıştırmayı önerir. Domain kurallarını component’lere karıştırmak yerine, React bileşenlerini sadece sunum aracı olarak ele alırız. API çağrılarını bileşenlerde değil, infrastructure tarafında tutarız. Her katman sadece iç katmanlara bağlı olur. Bu yaklaşım küçük örneklerde ekstra soyutlama gibi görünse de proje büyüdükçe okunabilirliği, test edilebilirliği ve sürdürülebilirliği artırır. Yazıda, Todo örneği üzerinden katmanların nasıl ayrıldığını ve React ile nasıl uygulanabileceğini gösteriyoruz.

## Giriş

Frontend projeleri küçükken her şey yolunda görünür; API çağrısı component’in içinde olur, state orada tutulur, UI da orada şekillenir. Ancak proje büyümeye başladığında bu yaklaşım hızla karmaşaya dönüşür. İş mantığı, sunum ve veri erişimi birbirine karışır: kodu okumak, test etmek ve genişletmek zorlaşır.

Clean Architecture tam da bu noktada devreye giriyor arkadaşlar. Genelde backend dünyasına ait gibi görünse de, aslında React (Ben uzun süredir React üzerine çalıştığım için buradan örnekler vereceğim ama Angular, Vue gibi teknolojilerde dahil tabii ki buraya) gibi UI odaklı projelerde de büyük bir fayda sağlıyor. Bu yazımda Clean Architecture’ı frontend açısından sade bir dille ele alacağız ve basit bir Todo örneği ile nasıl uygulanabileceğini göstereceğiz.

Amaç; soyut teoriler değil, günlük geliştirme deneyimini daha düzenli bir hale getirmek.

## Frontend’de neden mimariye ihtiyaç duyuyoruz?

Bir React projesini açıp hızlıca bir şeyler inşa etmeye başlamak çoğu zaman oldukça rahatlatıcıdır. Bir component oluştururuz, API çağrısını içine koyarız, state’i kah burada kah orada tutarız, sonra UI’yı da o component’te render ederiz. Başlangıçta her şey basit görünür çünkü uygulama küçüktür. Ama bu yaklaşım büyüdükçe sorunlar doğurur.

Örneğin küçük bir Todo uygulaması düşünelim. Başta tek bir liste, bir input ve bir butonumuz vardır. Her şey App.js içinde olabilir ve işler yürür. Şimdi uygulamaya filtre ekleyelim, sonra kullanıcı giriş sistemi ekleyelim, sonra kategori desteği ve offline kullanım derken App.js bir anda 500 satır olur. Tüm bu iş mantığı bir noktada “Burada ne vardı?” diye kendimize sormaya başlatır.


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-3.jpg)

Asıl problem, frontend’in sadece arayüz çizmekten ibaret olmamasıdır. **Veri yönetimi, doğrulama, iş kuralları, kullanıcı davranışı, performans, erişilebilirlik ve dış servislerle entegrasyon** gibi konular aslında işin merkezindedir. Bu yüzden her şeyi component seviyesinde çözmeye çalıştığımızda, büyüdükçe iç içe geçmiş bir kod yığınına dönüşür.

Bir diğer örnek: API’den gelen veriyi component içinde doğrudan kullanmak ilk günlerde sorun yaratmaz. Ama bir ay sonra başka bir component aynı veriyi işlemeye ihtiyaç duyduğunda aynı işi tekrar yazmak zorunda kalırız. Test etmek zorlaşır, hataları izole etmek imkansız hale gelir ve yeni biri projeye dahil olduğunda “Bu logic neden burada çalışıyor?” diye sürekli soru sormaya başlar.

İşte mimarinin amacı bu karmaşayı önlemektir. Küçük bir uygulamada bile mantığı katmanlara ayırmak, projeyi büyütmek istediğimizde işimizi kolaylaştırır. Başta fazladan zahmetmiş gibi görünse de, aynı Todoyu bir yıl sonrasına devrettiğinizde kendinizden memnun kalırsınız. Mimarinin önemi aslında “bugün değil, yarın” için hazırlanma fikrinden doğar. Güzel bir fikir değil mi?

## Clean Architecture’ın temel fikri

Clean Architecture kabaca şunu söyler: Uygulamanın merkezindeki kurallar dış etkilerden bağımsız olmalı. Yani iş mantığı, UI’dan, veri kaynağından, framework’ten ya da teknolojisel tercihlerden etkilenmemeli.


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-4.jpg)

Bunu günlük hayattan bir örnekle düşünelim. Bir restoranın mutfağında yemek pişirme kuralları vardır: etin nasıl marine edildiği, sosların nasıl hazırlandığı, pişirme süresi gibi şeyler. Bu kurallar müşteri içeride oturuyor mu, paket servis mi istiyor, yoksa drive-thru’dan mı geliyor fark etmez. Siparişin nasıl iletildiği sürecin detayını değiştirir ama yemeğin tarifini değiştirmez.

Clean Architecture’ın temel fikri de buna benzer. Uygulamanın “mutfağı”, yani domain ve iş kuralları sabit kalır. Kullanıcı ister web üzerinden ister mobil uygulamadan gelsin; ister API yerelde çalışsın ister uzak bir sunucuda olsun; hatta UI framework’ü React yerine Svelte olsun fark etmez. Uygulamanın özünü oluşturan kurallar değişmez.

Bu yaklaşım üç kilit düşünce üzerine oturur:

*   Bağımlılıkları merkeze değil dışarıya doğru konumlandırmak
*   İç katmanların dış katmanlardan habersiz olması
*   **Teknolojilerin birer detay ve değişken unsur olarak görülmesi — Bu bence çok önemli —**

Bu yüzden Clean Architecture projeyi katmanlara böler; kapalı bir çekirdek (domain) ve onun etrafında onu destekleyen halkalar oluşturur. Böylece değişen teknolojiye rağmen kurallar sabit kalır.

Bu fikir ilk bakışta fazla soyut gibi görünebilir. Ancak amacı çok basittir: İş mantığını korumak, değişimi kolaylaştırmak ve her şeyin yerini belli kılan bir düzen oluşturmak. Asıl değer, projeyi büyütmeye çalıştığımızda ortaya çıkar. Çünkü artık “Bu kod nereye gelmeli?” sorusunun net bir cevabı vardır.

## Clean Architecture frontend’e uygulanabilir mi?

Bu soru genelde ilk tepki olarak gelir çünkü Clean Architecture çoğunlukla backend dünyasında konuşulur. Servisler, domain katmanı, repository’ler derken sanki yalnızca API tarafına aitmiş gibi bir hava oluşur. Oysa frontend de artık sadece HTML render eden bir yüzey değil. Karmaşık iş akışları, offline senaryolar, cache stratejileri, authentication yönetimi, veri senkronizasyonu ve hatta **state persistence** gibi backend’e yakın sorumluluklar taşıyor.


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-5.jpg)

Bu yüzden cevap: Evet, Clean Architecture frontend’e hem uygulanabilir hem de faydalıdır.

İlginç olan şu: Frontend’de zaten farkında olmadan bu fikirlere yakın hareket ediyoruz. UI bileşenlerini ayırıyoruz, service dosyaları açıyoruz, veri yönetimi için context veya store kullanıyoruz. Clean Architecture aslında bunu biraz daha bilinçli ve yapılandırılmış hale getiriyor.

React ile düşündüğümüzde:

*   UI layer zaten component yapısıyla doğal bir sınır oluşturuyor.
*   State yönetim araçları bir nevi application layer gibi konumlanıyor.
*   Hooks ve custom logic’ler use case gibi davranabiliyor.
*   API fetcher’ları infrastructure katmanını temsil ediyor.

Yani React bize Clean Architecture’ı uygulamak için kötü bir zemin sağlamıyor, tam tersine doğal bir başlangıç noktası sunuyor. Tek ihtiyaç, bu parçaların bilinçli bir şekilde ayrılması ve birbirlerine bağımlılıklarının doğru yönde kurulması.

Frontend’de Clean Architecture’ın asıl kazanımı, büyüyen projenin kontrol edilebilir ve test edilebilir kalmasıdır. UI değiştirilebilir, framework değişebilir, veri kaynağı farklılaşabilir. Ancak domain ve uygulama mantığı aynı kalır. İşin güzelliği de burada: Yarın React yerine başka bir UI kütüphanesi kullanmak isterseniz, iş mantığınızın yüzde sekseni taşınabilir durumda olur.

Bu yüzden “frontend’de mimari gereksiz yük” algısı yerine, “küçük bir yatırım ile uzun vadede rahatlık” yaklaşımı daha gerçekçi bir bakış açısıdır.

## Katmanların tanımı

Clean Architecture’ın en bilinen tarafı katman kavramıdır. “**Layer**” kelimesi kulağa teorik gelebilir ama aslında yapılmaya çalışılan şey çok basittir: Kodun hangi amaca hizmet ettiğini belirlemek ve o kodu doğru yere koymak.


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-6.jpg)

Frontend’de bunu şu dört ana başlık üzerinden düşünebiliriz:

**1\. UI (Presentation) Katmanı**  
Bu katman kullanıcıyla temas eden yüzdür. React component’leri, butonlar, formlar, sayfalar, animasyonlar ve görsel davranış burada yer alır. Buradaki kodun tek görevi, veriyi ekrana taşımak ve kullanıcı etkileşimlerini yakalamaktır. İş mantığı burada olmamalıdır. UI katmanı “ne” olacağını değil, “nasıl görüneceğini” temsil eder.

**2\. Application Katmanı**  
Bu katman, uygulamanın davranışını yöneten yerdir. State yönetimi, use case’lerin orkestrasyonu, doğrulama akışları, UI ile domain arasında köprü görevini üstlenen logic burada bulunur. Bir işi başlatır, domain’i çalıştırır, sonuçları UI’ya geri iletir.

**3\. Domain (Core) Katmanı**  
Bu uygulamanın en iç halkasıdır. İş kuralları, modeller, entity yapılandırmaları, use case fonksiyonları ve domain’e özgü doğrulamalar burada yer alır. Domain hiçbir teknolojiye bağımlı olmamalıdır. API çağrısı yapmaz, UI ile ilgilenmez, sadece işin nasıl çalışması gerektiğini tanımlar.

**4\. Infrastructure (External Services) Katmanı**  
Burada teknoloji detayları yer alır. API çağrıları, fetch işlemleri, localStorage, indexedDB, third-party entegrasyonları, veri adaptörleri vs. Bu katman domain’in ihtiyaçlarını karşılar ama domain’in kendisini bilmez. Domain sadece bir abstract interface’e güvenip concrete implementasyonun burada olduğundan habersiz olur.

Bu katmanları ayrıştırmanın en büyük faydası şudur: Her şeyin nerede var olması gerektiğini biliyoruz. UI’da domain logic’i görmeye başladığımızda yanlış bir şeyler yaptığımızı anlarız. Infrastructure detaylarının component’e karıştığını gördüğümüzde “Bu servis UI’da ne arıyor?” diyebiliriz.

Katmanlar, frontend’in doğal karmaşasını isimlendirmemizi ve yönetmemizi sağlayan zihinsel bir çerçevedir. Bu ayrım zamanla otomatikleşir ve “Bu kod nereye gitmeli?” sorusunun tek seferde cevaplanmasını sağlar.

## Bağımlılık yönü ve soyutlama mantığı

Clean Architecture’ın belki de en kritik noktası bağımlılık yönüdür. Bu fikri anlamak, katmanları sadece dosya yapısı olarak değil, davranış modeli olarak kavramamızı sağlar.


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-7.jpg)

Temel kural şudur:  
İç katmanlar dış katmanlara asla bağımlı olmamalıdır. Bağımlılık her zaman dıştan içe doğru ilerler.

Başka bir ifadeyle, domain UI’yı tanımaz, API’yı bilmez, React ile ilgilenmez. Domain sadece kendisine ne söylenirse onu yapar. Bu yaklaşım domain’i uzun ömürlü ve taşınabilir kılar.

Bunu şöyle düşünebiliriz:

Bir fabrika düşünün. Ürün üretim hattı içerde yer alır. Dışarıdaki sevkiyat araçları, müşteriyle iletişim şekli veya kapının rengi üretim bandının nasıl çalıştığını değiştirmez. Üretim bandı dış etkilerden bağımsızdır. Clean Architecture’ın bağımlılık yönü de tam olarak bunu söyler.

Bu yön nasıl sağlanır?  
İşte burada soyutlama devreye girer. Domain’in API’yı doğrudan çağırmak yerine bir interface’e, yani bir sözleşmeye güvenmesi gerekir. Domain “illa fetch kullan” demez, sadece “bana todo’ları getir” der. O işi nasıl yapacağımız infrastructure katmanına kalmıştır.

Bu soyutlama sayesinde:

*   Domain test edilebilir hale gelir
*   API değiştiğinde domain kodu değişmez
*   UI değiştiğinde iş mantığı sabit kalır
*   Proje büyüdükçe yollar karmaşıklaşmaz

React tarafında bu fikrin karşılığı şudur: Component içinde API almak yerine bir servis veya adapter üzerinden almak. Bu, component’i UI rolüne sadık bırakır, domain ise framework bağımsız kalır.


Bağımlılık yönü asla “UI domain’i yönetir” şeklinde değil, “domain ihtiyaçları yönetir, dış dünya bunu karşılar” şeklindedir. Temelde amaç, kodun kararlarını iş kurallarının belirlemesi ve teknolojilerin sadece bir ayrıntı olarak davranmasıdır.

## Kod organizasyonu ve best practices

Clean Architecture’ı frontend’de uygularken ilk temas noktamız genelde klasör yapısı oluyor. Dosya yapısı tek başına mimariyi garanti etmez ama zihnimizi doğru yönde çalıştırmamıza yardımcı olur.

Basitleştirilmiş bir örnek düşünelim:


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-8.jpg)

Burada amaç her dosyanın niyetini netleştirmek. Örneğin:

*   `domain/todo` sadece todo’nun iş kuralları ile ilgilenir. “Todo nedir, hangi alanlara sahiptir, hangi durumlar geçerlidir?” gibi soruları yanıtlar.
*   `application/todo` domain’i kullanarak UI’ya veri sağlayan hook’lar veya servisler içerir.
*   `infrastructure/todo` API, localStorage veya başka bir kaynağa erişmek için gerekli adaptörleri bulundurur.
*   `ui` tarafı ise tamamen React component’lerinden oluşur.

Buradaki önemli best practice şu:  
**Dosyaları “teknolojiye göre” değil, “anlama göre” gruplayalım.**

Yani `components`, `hooks`, `services` gibi yatay ayrımlar yerine, feature odaklı ve katman bilinçli bir yapı daha uzun ömürlü olur. Örneğin:

*   `todo` bir feature’dır; domain, application ve infrastructure içinde kendi alanı vardır.
*   `ui/todo` altında da bu feature’a ait component’leri tutabiliriz.

İkinci kritik nokta: Component’lerin görevini sınırlı tutmak.

React tarafında sık yapılan hata, tek component içinde hem UI hem fetch hem de domain kararlarını vermek. Bunun yerine:

*   UI component: Sadece props alıp render yapan “dumb” component.
*   Container / Page component: Application layer’daki hook’ları kullanarak veriyi UI’ya taşıyan bileşen.
*   Hook / service: Use case’leri ve domain’i bilen, UI’dan bağımsız mantık katmanı.

Mesela şöyle bir yapı gayet sağlıklı:


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-9.jpg)

`useTodoList` ise domain ve infrastructure ile konuşur, UI ile değil. Bu sayede:

*   Domain’i test ederken React’i ayağa kaldırmak zorunda kalmayız.
*   Todo listesini başka bir UI (örneğin mobil veya farklı bir web framework) ile de kullanabiliriz.
*   Refactor yaparken “bu logic’i nereden çekmeliyim?” sorusu azalır.

Bir diğer best practice de isimlendirmede tutarlılıktır.

Örneğin:

*   Domain tarafında `Todo`, `TodoId`, `TodoStatus` gibi net isimler kullanmak,
*   Application tarafında `useTodoList`, `createTodo`, `toggleTodoStatus` gibi eylem odaklı isimler seçmek,
*   Infrastructure tarafında `TodoApi`, `TodoRepository`, `TodoStorage` gibi veri kaynaklarını vurgulayan isimler vermek, projenin okunabilirliğini ciddi anlamda artırır.

Son olarak: Her soyutlamayı gerçekten ihtiyaç oldukça eklemek önemli. Küçük bir projede bir anda 10 farklı layer açmak yerine, problem ortaya çıktıkça ve tekrar eden desenleri gördükçe bu yapıyı genişletmek daha doğal bir yol. Yani hedefimiz “kitaba uygun dosya yapısı” değil, “ekipçe rahatça anlayabildiğimiz ve büyüyebilen” bir yapı kurmak olmalı.

Bir sonraki adımda, bu prensipleri somutlaştırmak için todo domain’ini konuşup, ardından basit bir örnek üzerinden gideceğiz.

## Todo örneği ile uygulama

Clean Architecture’ı anlamanın en iyi yolu, küçük bir Todo örneğini katmanlara bölerek görmek. Aşağıda minimal ama fikir veren bir yapı var:

Klasör Yapım:


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-10.jpg)

Bu yapı şunu söylüyor:

*   domain: Todo’nun tanımı ve kuralları
*   infrastructure: Todo verisini nasıl sakladığımız
*   application: Bu veriyi ve kuralları UI ile nasıl konuşturduğumuz
*   ui: Kullanıcıya gösterdiğimiz React bileşenleri

### 1) Domain: Todo tanımı ve kuralları


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-11.jpg)


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-12.jpg)

Domain şu an hiçbir şey bilmiyor: React yok, localStorage yok, fetch yok.

### 2) Infrastructure: localStorage implementasyonu


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-13.jpg)

Burada domain’in tanıdığı tek şey `TodoRepository` interface’i. LocalStorage tamamen detay.

### 3) Application: useTodoList hook’u


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-14.jpg)

Bu hook:

*   UI’den istek alıyor
*   Domain fonksiyonlarını kullanıyor (`createTodo`, `toggleTodo`)
*   Infrastructure ile konuşuyor (`todoRepository`)
*   Kendisi React’e bağımlı ama domain’e UI detayı taşımıyor.

### 4) UI: Sayfa ve görünüm bileşenleri


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-15.jpg)


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-16.jpg)

Burada:

*   `TodoListPage` application katmanıyla konuşan container bileşeni
*   `TodoListView` sadece render yapan, “saf” UI bileşeni

Bu haliyle proje hala çok basit, ama önemli olan fikir:

*   Domain: Kurallar ve model
*   Application: Akış ve state
*   Infrastructure: Veri kaynağı detayları
*   UI: Sunum

Yarın localStorage yerine gerçek bir API kullanmak istersen sadece `todoRepository` implementasyonunu değiştiriyorsun; domain aynı, application aynı, UI aynı kalıyor. Clean Architecture’ın önemi tam burada ortaya çıkıyor.

## Sonuç ve değerlendirme


![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-17.jpg)

Clean Architecture’ı frontend’de uygulamak ilk bakışta fazla yapılandırılmış gelebilir; özellikle küçük projelerde “Buna gerek var mı?” sorusu akla düşer. Ancak mesele dosya dizinleri veya katman isimleri değil, zihinsel düzen kazanmaktır. Todo örneğinde gördüğümüz gibi, domain mantığını UI’dan ayırmak, veri erişimini bir detay olarak ele almak ve davranışları uygulama katmanında tutmak projeyi okunabilir, genişletilebilir ve test edilebilir kılıyor.

Bu yaklaşım büyüyen projelerde rahatlatıcı bir etki yaratıyor. API değiştiğinde domain aynı kalıyor, UI yenilendiğinde iş mantığı taşınabiliyor. Asıl kazanım mimari değil; değişime dayanıklı bir kod alışkanlığı edinmek. Clean Architecture’ı “ideal dosya yapısı” olarak değil, doğru soruları sormayı öğreten bir düşünme biçimi olarak görmek belki de en iyi başlangıç noktasıdır.