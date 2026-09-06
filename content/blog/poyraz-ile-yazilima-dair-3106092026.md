---
title: "Poyraz ile Yazılıma Dair #3106092026"
category: "Newsletter"
date: "2026-09-06"
readTime: "18 min read"
author: "Poyraz Avsever"
slug: "poyraz-ile-yazilima-dair-3106092026"
excerpt: "Bu hafta Claude, Gemini ve GPT'deki yeni gelişmelerden ajan tabanlı yazılım araçlarına, üretken tasarımdan açık kaynak ve uzay teknolojilerine uzanan yoğun bir gündemimiz var."
coverImage: "/blog/images/poyraz-ile-yazilima-dair-3106092026-cover.webp"
lang: "tr"
---

# Poyraz ile Yazılıma Dair #3106092026

Selamlar,

“Poyraz ile Yazılıma Dair”in 31 Ağustos–6 Eylül 2026 haftasını kapsayan yeni sayısına hoş geldiniz.

Bu hafta yapay zekâ modelleri yalnızca daha güçlü hale gelmedi; yazılım geliştirme, tasarım, güvenlik ve hatta kullandığımız bilgisayarların donanım beklentileri aynı anda değişmeye başladı. Gelin, haftanın gerçekten öne çıkan gelişmelerine birlikte bakalım.

## Yapay zekâ gelişmeleri

### Anthropic aynı modeli iki güvenlik katmanıyla sundu: Claude Fable 5.1 ve Mythos 5.1

**Kaynaklar:** [Birincil kaynak — Anthropic duyurusu](https://www.anthropic.com/claude-fable-and-mythos-5-1), [İkincil kaynak — VentureBeat](https://venturebeat.com/technology/anthropics-claude-fable-5-1-and-mythos-5-1-arrive-with-a-75-cost-reduction-for-fable-cache-reads)

Anthropic, aynı temel modelin iki farklı güvenlik profiline sahip sürümleri olan Claude Fable 5.1 ve Claude Mythos 5.1’i yayımladı. Fable 5.1 genel kullanıma açılırken Mythos 5.1; siber güvenlik ve yaşam bilimlerindeki daha hassas yetenekler için doğrulanmış kişi ve kuruluşlarla sınırlandırıldı. Fable güvenlik açığı bulmaya yardım edebiliyor ancak istismar kodu geliştirmeye izin vermiyor; Mythos tarafında ise savunma ve bilimsel araştırma için daha esnek, kontrollü erişim programları uygulanıyor.

Ekonomik taraftaki asıl değişiklik önbellekten okunan girdinin milyon token başına 1 dolardan 0,25 dolara inmesi. Normal API fiyatı milyon giriş tokenı için 10, çıkış tokenı için 50 dolar olarak kalıyor; Anthropic bu değişikliğin tipik işlerde yaklaşık yüzde 25, yoğun ajan işlerinde yüzde 45’e kadar toplam maliyet avantajı oluşturabileceğini söylüyor. Şirket ayrıca müşteri verisini kendi bulutunda tutan Enterprise Frontier Safeguards mimarisini duyurdu ve Terminal-Bench Science 0.1’de yüzde 52,6, Terminal-Bench 4.0’da Fable için yüzde 55,8, Mythos için yüzde 60,9 sonuç bildirdi. Bu ölçümlerin üretici tarafından raporlandığını ve bağımsız üstünlük kanıtı olmadığını not etmek gerekiyor.

**Neden önemli?**

Uzun süre çalışan kodlama ve araştırma ajanları aynı bağlamı sürekli tekrar okuduğu için önbellek fiyatı, ilan edilen standart token fiyatından daha belirleyici hale gelebiliyor. Aynı zamanda genel model ile hassas yeteneklere erişen modelin güvenlik politikası üzerinden ayrılması, şirketlerin “tek model herkese aynı şekilde açılsın” yaklaşımından katmanlı erişime geçtiğini gösteriyor.

**Düşüncem:**

Bence burada model puanlarından daha önemli olan iki konu var: uzun çalışan ajanların gerçek maliyeti ve tehlikeli yeteneklere kimin erişeceği. Önbellek indirimi ajanları ekonomik hale getirirken Mythos yaklaşımı güçlü yeteneklerin herkese aynı kapıyla sunulamayacağını kabul ediyor. Yine de güvenlik katmanının ne kadar iyi çalıştığını şirketin kendi testlerinden değil, zaman içindeki bağımsız bulgulardan anlayacağız. Kısacası bu, yalnızca daha akıllı bir Claude değil; farklı risk düzeyleri için farklı dağıtım modeli denemesi.

### Gemini 3.8 Flash ajanlar için güçlendi, Flash Cyber savunmacılara ayrıldı

**Kaynaklar:** [Birincil kaynak — Google duyurusu](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/), [İkincil kaynak — The Verge](https://www.theverge.com/ai-artificial-intelligence/988742/google-gemini-3-8-flash)

Google, altı hafta içindeki üçüncü Flash sürümü olan Gemini 3.8 Flash’ı ve aynı temel zekâyı siber güvenliğe uyarlayan Gemini 3.8 Flash Cyber’ı duyurdu. Standart sürüm yazılım mühendisliği, çok adımlı akıl yürütme ve ajan görevlerine odaklanıyor. Model, 31 Aralık’a kadar milyon giriş tokenı başına 0,75, çıkış tokenı başına 3,75 dolarlık tanıtım fiyatıyla sunuluyor; 1 Ocak 2027’de bu fiyatların sırasıyla 1,50 ve 7,50 dolara çıkması planlanıyor.

Google’ın yayımladığı sonuçlarda Gemini 3.8 Flash, DeepSWE’de yüzde 73,8’e ulaşıyor. Flash Cyber ise açık bulma ve otomatik yama üretme görevlerine göre ayarlanmış durumda; Google kendi dil çeşitliliği testinde yüzde 70’in üzerinde başarı, CWE-Bench’te yüzde 47,2 pass@1 ve Chrome yamalarında önceki sisteme kıyasla 2,6 kat daha fazla doğru sonuç bildiriyor. Bunlar yine üretici ölçümleri. Cyber sürümü Fairwind Programı üzerinden güvenilir kamu kurumları, kritik altyapı işletmecileri ve yazılım bakımcılarıyla sınırlandırılırken standart model Gemini API, AI Studio, Android Studio ve çeşitli Google ürünlerine açıldı.

**Neden önemli?**

Flash sınıfı artık yalnızca “ucuz ve hızlı cevap veren küçük model” anlamına gelmiyor; uzun ajan döngüleri ve ciddi kodlama görevleri bu sınıfa taşınıyor. Bu, geliştiricilerin üst seviye modele her adımda para ödemeden daha geniş otomasyon kurabilmesini sağlayabilir. Öte yandan siber sürümün kısıtlı sunulması, model kapasitesi arttıkça ürün erişiminin de kimlik ve kullanım amacı üzerinden ayrışacağını gösteriyor.

**Düşüncem:**

Google’ın altı haftada üç Flash sürümü çıkarması bana model yarışının artık yıllık büyük lansmanlarla değil, sürekli optimizasyonla ilerlediğini söylüyor. Ancak düşük birim fiyat tek başına ucuz görev demek değil; daha uzun düşünen ve daha fazla araç çağıran bir ajan toplamda daha pahalı olabilir. Flash Cyber’ın kontrollü erişimi doğru bir refleks, fakat savunmacıların gerçekten fayda görüp görmediğini bağımsız vaka çalışmaları belirleyecek. Ben olsam seçim yaparken benchmark’tan önce görev başına maliyet, gecikme ve hata düzeltme oranına bakarım.

### GPT-6 Astra yetenek sıçramasıyla birlikte “kritik” siber risk eşiğine ulaştı

**Kaynaklar:** [Birincil kaynak — OpenAI lansmanı](https://openai.com/index/gpt-6-astra/), [Birincil güvenlik kaynağı — OpenAI](https://openai.com/index/safety-overview-gpt-6-astra/), [İkincil kaynak — Reuters](https://www.reuters.com/legal/litigation/openai-launches-new-astra-model-amid-growing-scrutiny-over-agents-safety-2026-09-03/)

OpenAI, GPT-6 Astra’yı bilgisayar kullanımı, tarama, yazılım mühendisliği, profesyonel iş akışları ve bilimsel görevler için yeni üst seviye modeli olarak duyurdu. Model ilk gün sınırlı sayıda kuruluşa açıldı; Plus, Pro, Business ve Enterprise kullanıcılarına kademeli dağıtım, ayrıca OpenAI API, Microsoft Azure ve AWS Bedrock erişimi duyuruldu. Standart API fiyatı milyon giriş tokenı başına 10, çıkış tokenı başına 50 dolar. OpenAI kendi değerlendirmelerinde Terminal-Bench 4.0’da yüzde 57,9, DeepSWE’de yüzde 74,1, ARC-AGI-3’te yüzde 99,9 ve ExploitBench’te yüzde 100 sonuç bildirdi; bu değerler üretici raporu olarak okunmalı.

Lansmanın kritik kısmı güvenlik tarafında. OpenAI, Astra’nın Preparedness Framework kapsamında “Critical” siber yetenek seviyesine ulaşan ilk geniş dağıtımlı modeli olduğunu açıkladı: uygun araç ve erişim verildiğinde daha önce bilinmeyen açıkları bulup insanın her adımı yönetmediği istismar yöntemleri geliştirebiliyor. Şirket daha sıkı izolasyon, model kontrol noktalarının şifrelenmesi ve tüm ajan güzergâhlarının izlenmesi gibi önlemler ekledi. Bununla birlikte sistem kartı testlerinde modelin yazılı akıl yürütmesinin önceki modele göre izlenmesinin zorlaştığı da açıkça kabul ediliyor; yani kapasite artarken denetlenebilirlik konusu tamamen çözülmüş değil.

**Neden önemli?**

Bu gelişme, genel amaçlı bir modelin yalnızca kod önermekten çıkıp gerçek sistemlerde güvenlik açığı bulabilecek ve araçlarla hareket edebilecek seviyeye gelmesi açısından önemli. Savunma ekipleri için yama ve inceleme hızını artırabilir; aynı kabiliyet kötüye kullanım halinde saldırganların maliyetini de düşürebilir. Bu yüzden model kalitesi kadar yetkilendirme, kayıt, onay ve durdurma mekanizmaları da ürün mimarisinin parçası haline geliyor.

**Düşüncem:**

Bu haberi “AGI geldi” diye okumak bana fazla kolaycı geliyor; benchmark doygunluğu gerçek dünyadaki yargı, güvenilirlik ve sorumluluk sorunlarını ortadan kaldırmıyor. Benim için asıl eşik, modelin bilgisayar başında ne kadar çok iş yaptığı değil, yanlış hedefe giderken ne kadar erken durdurulabildiği. OpenAI’ın hem yüksek yetenekleri hem de düşen izlenebilirliği aynı anda açıklaması önemli bir dürüstlük payı taşıyor. Bundan sonra ajan değerlendirmelerinde başarı oranının yanında yetki aşımı ve geri alınabilirlik ölçümlerini de görmek isteyeceğim.

## Yazılım gelişmeleri

### VS Code 1.136, pull request’i birleştirmeye hazırlama işini ajana veriyor

**Kaynaklar:** [Birincil kaynak — VS Code 1.136 sürüm notları](https://code.visualstudio.com/updates/v1_136), [İkincil kaynak — InfoWorld](https://www.infoworld.com/article/4218856/visual-studio-code-1-136-introduces-agent-merges-for-pull-requests.html)

Microsoft, Visual Studio Code 1.136 ile Agent Merge özelliğini önizleme olarak sundu. Bu özellik bir pull request’teki inceleme geri bildirimlerini ele alıyor, başarısız kontrolleri ve birleştirme çakışmalarını düzeltmeye çalışıyor, iş akışlarını yeniden çalıştırıyor ve PR birleştirilmeye hazır hale gelene kadar döngüyü sürdürüyor. Özellik `chat.agentMerge.enabled` ayarıyla etkinleştiriliyor ve şimdilik Agents penceresindeki bir oturum üzerinden başlatılıyor.

Sürüm ayrıca Copilot ve Claude ajan oturumlarının birden fazla klasör içeren çalışma alanlarında çalışmasını deneysel olarak destekliyor. İlişkili sohbetler hiyerarşik gösteriliyor; her oturumun durumu ve bekleyen onayları görülebiliyor, ajan yanıt verdiğinde ya da kullanıcı kararı gerektiğinde bildirim alınabiliyor. Kurumsal kullanıcılar dikte işlemini cihaz üzerinde tutabiliyor. Bunların yanında entegre tarayıcıya yazım önerileri ve bazı uzantı komutlarında oluşan beş saniyelik terminal gecikmesini gideren düzeltme eklendi.

**Neden önemli?**

Kod ajanları artık yalnızca editör içinde dosya yazmıyor; inceleme, CI ve birleştirme öncesi bakım döngüsüne giriyor. Bu, geliştiricinin tekrarlı düzeltme yükünü azaltabilir ama PR’ı gerçekten kabul etme sorumluluğunu ortadan kaldırmaz. Özelliğin önizleme ve çoklu kök desteğinin deneysel olması, özellikle büyük depolarda kontrollü pilot yapılmasını gerektiriyor.

**Düşüncem:**

Agent Merge bence kod üretmekten daha ilginç bir kullanım alanı, çünkü ekiplerin zamanını çoğu zaman ilk yazım değil son yüzde 20’lik düzeltme döngüsü tüketiyor. Yine de “kontroller geçti” ile “değişiklik doğru” aynı şey değil; iş kuralını ve mimari niyeti insan incelemesi korumalı. Bu özellik iyi kurulmuş testleri olan ekiplerde değerli, zayıf testli projelerde ise yalnızca hatayı daha hızlı görünmez hale getirebilir. Ajan kalitesi kadar repository disiplininin de sonucu belirleyeceği bir dönem başlıyor.

### GitHub Actions, runner ömrünü ve yeniden kullanılan workflow kimliğini görünür yaptı

**Kaynaklar:** [Birincil kaynak — GitHub Changelog](https://github.blog/changelog/2026-09-03-github-actions-early-september-2026-updates/), [İkincil kaynak — GitHub Actions bağlam dokümantasyonu](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)

GitHub Actions’a eklenen yeni REST API, belirli bir runner sürümünün yeni kayıt kabul etmeyi ve çalıştırma desteğini ne zaman sonlandıracağını döndürüyor. Repository, organization veya enterprise düzeyinde çağrılabilen `GET /actions/runners/deprecations/{version}` uç noktası; sürüm numarasıyla birlikte çalışma zamanı ve kayıt için son tarihleri veriyor. Böylece self-hosted runner kullanan ekipler bir sürüm aniden devre dışı kalmadan yükseltme planlayabiliyor.

Aynı güncellemede `GITHUB_TOKEN` için yalnızca `read` ve `none` değerlerini alan yeni `vulnerability-alerts` izni eklendi; workflow’lar daha geniş yetki istemeden Dependabot uyarılarını okuyabiliyor. Yeniden kullanılabilir workflow’lar da `job.workflow_ref`, `job.workflow_sha`, `job.workflow_repository` ve `job.workflow_file_path` alanlarıyla kendilerini tanımlayabiliyor. Bu değerler çağıran workflow’u gösteren bazı `github.*` alanlarından farklı olarak işi gerçekten tanımlayan workflow’un kimliğini veriyor; özellikler GitHub Enterprise Server’da henüz bulunmuyor.

**Neden önemli?**

Bu üç değişiklik küçük görünse de kurumsal CI/CD’nin iki temel sorununa dokunuyor: öngörülebilir bakım ve en az ayrıcalık. Runner kullanım ömrünün makine tarafından okunabilmesi otomatik uyarı sistemleri kurmayı kolaylaştırıyor; hassas uyarı verisine ayrı izin verilmesi ise gereksiz geniş token yetkilerini azaltıyor. Workflow kimliği de merkezi CI şablonlarında izlenebilirlik ve politika uygulaması için değerli.

**Düşüncem:**

Ben bu tür güncellemeleri gösterişli ajan özelliklerinden daha az heyecanlı ama üretimde daha kalıcı buluyorum. Bir runner’ın ne zaman öleceğini API’den öğrenebilmek, gece yarısı kırılan pipeline yerine planlı bakım demek. Yeni izin alanı da “kolay olsun diye her şeyi açalım” alışkanlığına küçük ama doğru bir darbe. Özellikle reusable workflow kullanan büyük ekipler için kaynak kimliğinin netleşmesi denetim kayıtlarını ciddi biçimde sadeleştirebilir.

### npm’de token’sız yayımlama birden fazla CI akışını desteklemeye başladı

**Kaynaklar:** [Birincil kaynak — GitHub/npm changelog](https://github.blog/changelog/2026-09-03-multiple-trusted-publishing-configurations-for-npm/), [İkincil kaynak — npm dokümantasyonu](https://docs.npmjs.com/trusted-publishers/)

npm paketleri artık aynı paket için birden fazla “trusted publisher” yapılandırmasına sahip olabiliyor. OIDC tabanlı bu yöntem, CI/CD sisteminin kısa ömürlü ve imzalı kimlik belirteciyle yayın yapmasını sağlıyor; uzun süre geçerli npm tokenlarını sır olarak saklama ihtiyacını ortadan kaldırıyor. Bir paket için kararlı sürüm, ön sürüm ve staging gibi farklı repository, workflow veya environment kombinasyonları ayrı ayrı tanımlanabiliyor; dokümantasyona göre aynı anda en fazla 10 bağlantı kurulabiliyor.

Güncelleme ayrıca staged paketlerin zararlı yazılım taraması bitmeden onaylanmasını engelliyor ve paketlerin Versions sekmesinde onaylandı, reddedildi ya da bekliyor durumlarını gösteren geçmiş sunuyor. Her yapılandırmada staging varsayılan; doğrudan `npm publish` ayrı olarak açılıyor. GitHub, insan onayı eklediği ve ele geçirilen bir workflow’un paketi doğrudan registry’ye gönderme riskini azalttığı için staging kullanımını öneriyor. Self-hosted runner desteğinin henüz bulunmadığını da not etmek gerekiyor.

**Neden önemli?**

Paket tedarik zinciri saldırılarında uzun ömürlü yayın tokenları kritik bir hedef. Birden fazla OIDC kimliği, monorepo, farklı CI sağlayıcıları veya ayrı release kanalları kullanan bakımcıların güvenli yöntemi terk etmeden çalışmasını sağlıyor. Zararlı yazılım taraması ve insan onayının aynı akışa bağlanması da tek bir CI ihlalinin etkisini sınırlandırabilir.

**Düşüncem:**

Bu özellik doğrudan son kullanıcıya görünmeyecek ama JavaScript ekosistemi için haftanın en değerli güvenlik gelişmelerinden biri olabilir. Güvenliği artıran bir yöntem gerçek iş akışına uymuyorsa ekipler sonunda geçici çözüm ya da kalıcı token kullanıyor; çoklu yapılandırma bu bahaneyi azaltıyor. Benim tercihim, OIDC ile birlikte stage-only yayın ve iki aşamalı insan onayı olurdu. Yine de yanlış repository veya workflow tanımı yapılabileceği için ilk geçişte deneme paketi ve ayrıntılı audit kaydı şart.

## Tasarım gelişmeleri

### Google Pics, Workspace’in içine ortak çalışmalı bir yapay zekâ görsel stüdyosu yerleştiriyor

**Kaynaklar:** [Birincil kaynak — Google duyurusu](https://blog.google/products-and-platforms/products/workspace/google-pics/), [İkincil kaynak — The Verge](https://www.theverge.com/tech/987423/google-pics-ai-image-editor-generator)

Google, Nano Banana görsel üretme ve düzenleme modeli üzerine kurulan Google Pics’i duyurdu. Araç hem bağımsız bir ürün hem de Workspace’in bir parçası olarak çalışıyor. Kullanıcılar metinle görsel üretebiliyor, bir nesneyi geri kalan kompozisyona dokunmadan seçip değiştirebiliyor, görsel içindeki yazıyı düzenleyebiliyor veya çevirebiliyor ve tek istemden birden fazla alternatif oluşturabiliyor.

Pics’in ayırt edici yanı yalnızca üretim değil, ekip çalışması ve mevcut belge akışına yerleşmesi. Aynı görsel üzerinde paylaşım ve ortak düzenleme yapılabiliyor; Docs ve Slides entegrasyonu duyuruyla birlikte başlarken Drive entegrasyonunun sonraki haftalarda gelmesi planlanıyor. Ürün Google AI Pro ve Ultra aboneleriyle çoğu Workspace işletme müşterisine kademeli olarak dağıtılıyor. Google’ın Workspace duyurusunda ayrıca sosyal medya, web ve baskı oranlarına kırpma ile 2K ve 4K büyütme seçenekleri bulunuyor.

**Neden önemli?**

Canva ve Adobe Express benzeri görsel üretim işleri, Google’ın zaten belge ve sunum için kullanılan ortamına taşınıyor. İçerik üreticileri için uygulamalar arasında dosya taşıma ve küçük revizyonları yeniden yaptırma süresi azalabilir. Tasarım ekipleri açısından ise marka tutarlılığı, lisans, yapay zekâ kaynaklı hata ve son kalite kontrolü daha önemli hale geliyor.

**Düşüncem:**

Google Pics’in asıl gücü yeni bir görsel modeli olmasından çok, insanların zaten çalıştığı Docs ve Slides’ın içine girmesi. Bir araç dağıtım avantajıyla milyonlarca kişiye ulaştığında, daha yetenekli ama ayrı duran rakipleri zorlayabilir. Buna rağmen nesneyi temiz ayırmak ya da görselde yazıyı düzeltmek tasarımın tamamı değil; hiyerarşi, mesaj ve marka dili hâlâ karar gerektiriyor. Ben bunu tasarımcının yerine geçen ürün değil, hızlı varyasyon ve üretim aracı olarak konumlandırırım.

### Figma, üretken eklenti ve shader’ları paylaşılabilir ve dışarı aktarılabilir koda dönüştürdü

**Kaynaklar:** [Birincil kaynak — Figma Blog](https://www.figma.com/blog/how-we-built-generative-plugins-and-shaders/), [İkincil kaynak — Figma ürün güncellemesi](https://forum.figma.com/product-updates-3/updates-to-generative-plugins-and-shaders-57397)

Figma’nın Config 2026’da tanıttığı istemle eklenti ve shader oluşturma özelliği bu hafta somut biçimde genişledi. Kullanıcılar oluşturdukları eklenti ve shader’ları Figma Community’de yayımlayabiliyor; Organization ve Enterprise planlarında kurum içinde özel olarak paylaşabiliyor. Shader’lara zaman ve fare hareketine tepki veren animasyon ile etkileşim eklenebiliyor, üretilen kod Figma içinden görüntülenip indirilebiliyor.

Teknik tarafta shader sistemi WebGPU tabanlı ve kullanıcı komut dosyaları ayrı sandbox’larda çalıştırılıyor. Figma MCP sunucusu üzerinden üçüncü taraf ajanlar bu üretken araçları görebiliyor ve değiştirebiliyor. Shader uygulanmış bir kare dışarıdaki ajana aktarıldığında, efektin React kodunda doğru biçimde uygulanması hedefleniyor; ayrıca HTML ve React dışa aktarımı sunuluyor. Figma tasarım ajanı Full seat kullanıcılarında açık beta olarak erişilebilir durumda ve birkaç hafta içinde yapay zekâ kredisi tüketmeye başlayacak.

**Neden önemli?**

Bu güncelleme tasarım dosyasını statik teslim belgesi olmaktan çıkarıp, çalışabilir görsel mantık ve kod taşıyan bir üretim yüzeyine yaklaştırıyor. Tasarımcılar ihtiyaçlarına göre küçük araçlar üretebilirken geliştiriciler efektin yalnızca ekran görüntüsünü değil, arkasındaki kodu da alabiliyor. Tasarım-geliştirme aktarımındaki kayıp azalabilir; ancak üretilen WebGPU ve React kodunun performans, erişilebilirlik ve bakım açısından gözden geçirilmesi gerekiyor.

**Düşüncem:**

Figma’nın burada yaptığı şey bana “AI ile tasarım üretmekten” daha olgun geliyor; çünkü çıktı yeniden kullanılabilir, incelenebilir ve paylaşılabilir hale geliyor. Kod görünür değilse üretken tasarım aracı kolayca kapalı bir sihir kutusuna dönüşür, kod erişimi bu yüzden önemli. Öte yandan herkesin efekt üretmesi iyi görsel kararların otomatik oluşacağı anlamına gelmiyor. Bence en güçlü kullanım, tasarım sistemine uygun mikro araçların kurum içinde paylaşılması ve geliştiriciye uygulanabilir karşılığının verilmesi olacak.

## Teknoloji haberleri

### NVIDIA, Hugging Face’i 12,93 milyar dolara satın almak için anlaşma yaptı

**Kaynaklar:** [Birincil kaynak — NVIDIA duyurusu](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/), [İkincil kaynak — Reuters](https://www.reuters.com/business/nvidia-buy-hugging-face-nearly-13-billion-big-bet-open-ai-models-2026-09-03/)

NVIDIA, Hugging Face’i 12.930.300.000 dolara satın almak üzere anlaşmaya vardığını resmen duyurdu. Reuters’a göre bunun 11,9 milyar doları hissedarlara ödeme, yaklaşık 1 milyar doları ise çalışanları şirkette tutmaya yönelik hisse teşvikleri şeklinde planlanıyor. Bu, tamamlanmış bir satın alma değil; anlaşmanın kapanış süreci bulunuyor. NVIDIA resmî açıklamasında platformun açık, çoklu bulut ve çoklu hızlandırıcı desteğini koruyacağını, Hugging Face kullanmak için NVIDIA donanımının zorunlu olmayacağını söyledi.

Hugging Face’in şirket verisine göre 18 milyondan fazla geliştiricisi, 3 milyondan fazla modeli, 500 bin veri seti ve 1 milyon uygulaması bulunuyor. Satın alma bu nedenle yalnızca bir model şirketini değil, açık ağırlıklı yapay zekâ ekosisteminin dağıtım ve keşif katmanlarından birini NVIDIA’ya bağlıyor. Reuters’ın aktardığı temel endişe, platform açık kalmayı sürdürse bile NVIDIA altyapısının rakip donanımlar karşısında zamanla kayırılıp kayırılmayacağı. Satın alma iddiası daha önce haberleştirilmiş olsa da şirketin resmî anlaşma duyurusu 3 Eylül’de yapıldığı için bu haftanın doğrulanmış gelişmesi olarak ele alındı.

**Neden önemli?**

NVIDIA böylece yalnızca GPU ve ağ donanımı sağlayan şirket olmaktan çıkıp modellerin bulunduğu, değerlendirildiği ve dağıtıldığı geliştirici platformunun da sahibi olma yoluna giriyor. Açık model ekosistemi için daha güçlü altyapı ve yatırım fırsatı doğabilir; aynı anda tarafsızlık, yönetişim ve tek bir şirketin zincirin çok fazla katmanını kontrol etmesi soruları büyüyor. Geliştiricilerin model ve donanım seçme özgürlüğünün fiilen korunup korunmadığı yakından izlenmeli.

**Düşüncem:**

Bu satın alma bence haftanın en büyük stratejik haberi; çünkü NVIDIA artık yalnızca kazmayı satan değil, maden sahasının girişini de yöneten oyuncu olmak istiyor. Hugging Face’in açık kalacağı sözü önemli ama gerçek test, AMD ya da başka hızlandırıcılarda eşit entegrasyon ve görünürlük devam ettiğinde verilecek. Açık kaynak topluluğu için daha fazla kaynak iyi haber, karar merkezinin yoğunlaşması ise ciddi risk. Ben önümüzdeki aylarda lisanslardan çok öneri algoritmaları, varsayılan inference seçenekleri ve platform yönetişimine bakacağım.

### Microsoft Project Zenith ile “hazır kodlama bilgisayarı” sınıfı oluşturuyor

**Kaynaklar:** [Birincil kaynak — Microsoft Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2026/09/04/announcing-project-zenith-the-ready-to-code-windows-experience/), [İkincil kaynak — The Verge](https://www.theverge.com/news/990051/microsoft-project-zenith-windows-developers)

Microsoft, Project Zenith’i geliştirici sınıfı cihazlarda sunulacak “hazır kodlama” ve dikkat dağıtmayan Windows deneyimi olarak tanıttı. Bu yeni bir Windows sürümü ya da ayrı bir işletim sistemi değil; belirli donanımlarda önceden yapılandırılmış Windows 11 ortamı. Başlangıç için 64 GB veya daha fazla birleşik bellek ve saniyede 250 GB’tan yüksek bellek bant genişliği gerekiyor. İlk cihazlar AMD Ryzen AI Halo tabanlı olacak; başka OEM ve yonga ortaklarının daha sonra eklenmesi planlanıyor.

Windows Terminal ve Visual Studio Code görev çubuğuna sabitleniyor; geliştirme dilleri, çalışma zamanları, kaynak kontrolü ve üretkenlik araçları hazır geliyor. Dosya uzantıları, gizli dosyalar ve tam yol varsayılan olarak görünür; uzun dosya yolu desteği açık, çeşitli öneri ve hesap bildirimleri kapalı. Microsoft bu donanım sınıfında 30 milyardan fazla parametreli modellerin yerelde ve ölçümlü bulut tokenı harcamadan çalıştırılabileceğini söylüyor. WSL, container ve ajan izolasyonuna yönelik Windows yatırımları da ortamın parçası.

**Neden önemli?**

Yerel yapay zekâ geliştirme işi artık yalnızca güçlü GPU’dan ibaret değil; birleşik bellek kapasitesi, bant genişliği, önceden kurulmuş araçlar ve işletim sistemi güvenlik sınırları birlikte ürünleştiriliyor. Yeni bilgisayar kurulum süresi kısalabilir ve bazı kodlama modelleri buluta veri göndermeden çalıştırılabilir. Buna karşılık 64 GB ve 250 GB/s eşiği, bu deneyimin başlangıçta üst seviye ve pahalı cihazlarla sınırlı kalacağını gösteriyor.

**Düşüncem:**

Project Zenith bana “developer edition” fikrinin 2026’daki karşılığı gibi geliyor, fakat bu kez merkezde terminal değil yerel ajanlar var. Hazır ayarlar faydalı, ancak geliştiricinin kendi ortamını kurabilmesi hâlâ önemli; iyi bir başlangıç profili kapalı bir iş akışına dönüşmemeli. Donanım eşiği de yerel AI’ın şimdilik herkes için değil, profesyonel iş istasyonları için tasarlandığını açıkça gösteriyor. Eğer fiyatlar makul seviyeye inerse bulut tokenı ile donanım yatırımı arasındaki hesabı yeniden yapacağız.

### Isar Aerospace, Avrupa ana karasından ticari olarak yörüngeye uydu taşıdı

**Kaynaklar:** [Birincil kaynak — Isar Aerospace görev güncellemeleri](https://www.isaraerospace.com/mission-updates-overview), [İkincil kaynak — Reuters](https://www.reuters.com/business/media-telecom/german-space-rocket-lifts-off-norway-base-2026-09-05/), [Kurumsal doğrulama — ESA](https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Spectrum_s_qualifying_second_launch)

Alman uzay girişimi Isar Aerospace’in Spectrum roketi, 5 Eylül saat 22.12 CEST’te Norveç’teki Andøya Spaceport’tan fırlatıldı ve yörüngeye ulaştı. Şirketin ikinci uçuşu olan “Onward and Upward” görevi beş CubeSat ile bir teknoloji deneyini taşıdı. Ana motor kesme, kademe ayrılması, ikinci kademe ateşleme, 100 kilometrelik Kármán hattının geçilmesi, yörünge daireselleştirme ve yük ayrılması tamamlandı. Şirket, uyduların son durumunu müşterilerle birlikte doğrulamayı sürdürdüğünü açıkladı.

Isar, bu başarıyla Avrupa’dan çıkan bir ticari uzay şirketinin kıta Avrupası’ndan yörüngeye uydu teslim ettiği ilk örnek olduğunu söylüyor; Reuters da uçuşu kıta Avrupası’ndan ilk ticari yörünge fırlatması olarak aktardı. 28 metre uzunluğundaki iki kademeli Spectrum, alçak Dünya yörüngesine 1.000 kilograma kadar yük taşımak üzere tasarlandı. Şirket 3’ten 7’ye kadar sonraki roketlerin üretimde olduğunu ve yeni 40 bin metrekarelik tesisinin yılda 40 araca kadar kapasite hedeflediğini belirtiyor; bu henüz ulaşılmış fırlatma sıklığı değil, üretim hedefi.

**Neden önemli?**

Avrupa’nın küçük uydu fırlatmalarında dış sağlayıcılara, özellikle de ABD merkezli sistemlere bağımlılığı uzun süredir stratejik sorun. Spectrum’un yörüngeye ulaşması ticari, bilimsel ve kamu görevleri için Avrupa içinden yeni bir seçenek oluşturuyor. Tek bir başarılı uçuş sürdürülebilir hizmet anlamına gelmese de, yeni nesil Avrupa roket şirketlerinin teknik eşiği aşabildiğini gösteriyor.

**Düşüncem:**

Roket işinde ikinci uçuşta yörüngeye ulaşmak gerçekten güçlü bir mühendislik sinyali. Yine de bir başarıyı hemen “Avrupa’nın SpaceX’i doğdu” başlığına çevirmek istemem; asıl sınav tekrar edilebilirlik, maliyet ve zamanında teslimat. Yılda 40 araç hedefi iddialı ve bunu gerçekleşmiş kapasiteyle karıştırmamak gerekiyor. Benim için bu uçuşun değeri, Avrupa’nın bağımsız erişim seçeneğini teoriden çalışan bir sisteme bir adım daha yaklaştırması.

## Bu hafta keşfettiğim açık kaynak proje

### TrustTunnel v1.2, gizlenmiş ve self-host edilebilir VPN’i macOS’ta kolaylaştırdı

**Kaynaklar:** [Birincil kaynak — GitHub v1.2.0 sürümü](https://github.com/TrustTunnel/TrustTunnelFlutterClient/releases/tag/v1.2.0), [Proje deposu — GitHub](https://github.com/TrustTunnel/TrustTunnel), [İkincil kaynak — TechRadar](https://www.techradar.com/vpn/vpn-services/adguard-makes-its-open-source-stealth-vpn-protocol-native-to-macos-with-one-click-setup)

TrustTunnel, AdGuard tarafından geliştirilen ve Apache 2.0 lisansıyla yayımlanan açık kaynak bir VPN protokolü. Trafiği HTTP/2 veya QUIC/HTTP/3 üzerinden normal HTTPS bağlantısına benzeterek derin paket incelemesine karşı daha zor ayırt edilir hale getirmeyi amaçlıyor. TCP, UDP ve ICMP tünelleme; sistem geneli TUN arayüzü, SOCKS5 proxy, split tunneling ve özel DNS upstream desteği var. Kullanıcı kendi VPS’inde, bulutunda ya da uygun ev sunucusunda endpoint çalıştırabiliyor.

Proje bu hafta ilk kez açık kaynak olmadı; haftaya ait somut gelişme 31 Ağustos’ta yayımlanan v1.2.0 sürümü. Bu sürüm TrustTunnel’ı Mac App Store üzerinden kurulabilen yerel macOS uygulamasına dönüştürdü; menü çubuğu göstergesi, açılışta çalıştırma ve otomatik bağlanma eklendi. Tüm platformlara log dışa aktarma geldi ve “Query log” adı daha anlaşılır olan “Connection log” şeklinde değiştirildi. Böylece daha önce komut satırı gerektiren macOS kurulumu geniş kullanıcı kitlesi için erişilebilir hale geldi.

**Neden önemli?**

TrustTunnel hem ağ protokolleriyle ilgilenen geliştiriciler için incelenebilir bir Rust projesi hem de kendi altyapısını yönetmek isteyenler için pratik bir self-host seçeneği. Özellikle VPN trafiğinin engellendiği ağlarda standart HTTPS’e benzeme yaklaşımı teknik olarak dikkat çekici. Ancak açık kaynak olması otomatik olarak güvenli, bağımsız denetimden geçmiş veya her ülkedeki mevzuata uygun olduğu anlamına gelmiyor; sunucu güvenliği ve doğru yapılandırma kullanıcıya ait.

**Düşüncem:**

Bu projeyi seçmemin nedeni yalnızca VPN olması değil, zor bir protokolü günlük kullanılabilir bir ürüne dönüştürmesi. Açık kaynak projelerde kurulum sürtünmesi çoğu zaman teknik kaliteden daha büyük engel ve v1.2 tam olarak bunu azaltıyor. Ben önce test sunucusunda kurar, DNS sızıntısı, kill switch davranışı ve bağlantı kesintilerini kendim ölçerdim. Yine de sansüre dayanıklı protokol, self-host ve denetlenebilir kod birleşimi TrustTunnel’ı takip etmeye değer kılıyor.

## Haftanın genel değerlendirmesi

Bu haftanın ortak teması benim için yapay zekânın “cevap veren model” aşamasından çıkıp bütün üretim zincirine yerleşmesi. Claude, Gemini ve GPT tarafında artık yalnızca zekâ puanı konuşmuyoruz; önbellek maliyeti, uzun ajan döngüsü, siber yetki, insan onayı ve izlenebilirlik konuşuyoruz. VS Code’un PR düzeltmesini ajana vermesi, Figma’nın üretilen efekti koda çevirmesi ve Microsoft’un 30 milyardan büyük modeller için ayrı bilgisayar sınıfı tanımlaması aynı değişimin farklı yüzleri.

Benim dikkat edeceğim nokta hız değil, kontrol olacak. Ajan daha uzun çalıştıkça ve daha fazla araca eriştikçe iyi testler, dar yetkiler, kayıt tutma ve geri alınabilir işlemler ürün kalitesinin ayrılmaz parçası haline geliyor. NVIDIA–Hugging Face anlaşması da bu dönüşümün ekonomik tarafını gösteriyor: mücadele yalnızca en iyi modeli yapmak için değil, modelin bulunduğu platformu, çalıştığı donanımı ve geliştiricinin günlük iş akışını yönetmek için veriliyor.
