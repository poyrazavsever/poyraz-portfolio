---
title: "Vue.js Dokümantasyonunu Birlikte Türkçeye Çeviriyoruz!"
category: "General"
date: "2026-04-22"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "vuejs-dokumantasyon-ceviri-projesi"
excerpt: "Vue.js öğrenme sürecimde hissettiğim Türkçe kaynak eksikliğini gidermek için başlattığım topluluk çeviri projesine davetlisiniz."
coverImage: "/blog/images/vuejs-ceviri-bolum1.png"
---

# Vue.js Dokümantasyonunu Birlikte Türkçeye Çeviriyoruz!

![]( /blog/images/vuejs-ceviri-bolum1.png)

Merhaba,

Bugün sizi benim için oldukça heyecan verici olan ve yeni başladığım bir projeye davet etmek istiyorum: **Vue.js resmi dokümantasyonunu Türkçeye çeviriyoruz!**

Son zamanlarda kendimi frontend alanında geliştirmeye devam ediyorum ve rotamı Vue.js'e çevirdim. Öğrenme sürecimde her zaman olduğu gibi ilk başvurduğum yer resmi dokümantasyon oldu. Vue'nun dokümantasyonu gerçekten çok temiz ve anlaşılır yazılmış. Ancak okurken bir şey çok net bir şekilde dikkatimi çekti: Türkçe çevirisi yoktu.

"Neden olmasın?" dedim kendi kendime. Hem kendi öğrenme sürecimi pekiştirecek, hem teknik okumalarımı geliştirecek, hem de bu teknolojiyi öğrenmek isteyen ama dil bariyerine takılan diğer geliştiricilere fayda sağlayacak harika bir adım olabilirdi. Dürüst olmak gerekirse böyle büyük ve kapsamlı bir dokümantasyonu tek başıma çevirmek çok ciddi bir zaman alırdı. Üstelik ben de hala bu teknolojiyi öğrenme aşamasında olan biriyim ve elbette eksiklerim ya da hatalarım olabilir.

İşte tam da bu yüzden, bunu bireysel bir deneme olmaktan çıkarıp, topluluk destekli bir açık kaynak (open source) projesine dönüştürmeye karar verdim. Birlikte yaparsak hem daha hızlı ilerleriz, hem birbirimizin hatalarını düzeltiriz, hem de ortaya hepimizin gurur duyacağı ortak bir Türkçe kaynak çıkar diye düşündüm ve hemen çalışmalara başladım.

## Peki Bunu Nasıl Düzenliyoruz?

![]( /blog/images/vuejs-ceviri-bolum2.png)

Açıkçası projeye ilk başladığımda "Bunu nasıl yöneteceğim?" sorusu kafamı biraz kurcaladı. Markdown dosyalarını tek tek kendi kendime çevirip commit atmak yerine, başkalarının da kolayca katılıp iş bölümü yapabileceği bir düzen kurmam gerekiyordu. 

Github'da oluşturduğum depoda (repo) oldukça şeffaf bir yöntem izlemeye karar verdim: **Çevrilecek her bir dokümantasyon sayfası için ayrı bir Issue açtım.**

Yani dokümantasyondaki her sayfa, projemizde tamamlanmayı bekleyen bir görev olarak listeleniyor. Bu sayede hem ne kadar işimiz kaldığını görebiliyoruz, hem de katkıda bulunmak isteyen biri çok rahat bir şekilde listeye bakıp "Ben bu sayfayı çevirmek istiyorum" diyebiliyor.

## Süreci Takip Etmek İçin Ne Yaptım?

![]( /blog/images/vuejs-ceviri-bolum3.png)

Issue açmak güzeldi ama "şu an kim ne yapıyor, hangi sayfa boşta?" sorularının yanıtı hala belirsizdi. Bu yüzden GitHub üzerinde bir **Kanban board** kurdum. Benim gibi projeler üretmeyi seven biriyseniz, o "Done" sütununun dolmaya başlamasının ne kadar motive edici olduğunu bilirsiniz.

Üstüne bir de GitHub'ın sunduğu otomasyonları ekledim. Yani ben elle bir kartı sütundan sütuna taşımıyorum, her şey kendiliğinden oluyor:

- Bir görev birine atandığında (assign), kart **"In Progress"** sütununa geçiyor.
- O görev için bir Pull Request açıldığında, kart **"Review"** sütununa geçiyor.
- PR onaylanıp merge edildiğinde, kart **"Done"** sütununa taşınıyor.

Böylece kimse "acaba bu sayfayı çeviren var mı?" diye düşünmüyor. Her şey şeffaf ve anlık olarak görünüyor. Bu düzen sayesinde biz de sadece çeviriye ve Vue.js öğrenmeye odaklanabiliyoruz.

## Nasıl Dahil Olabilirsiniz?

![]( /blog/images/vuejs-ceviri-bolum4.png)

Bu projeyi tek başıma yürütmemin çok uzun süreceğini söylemiştim. O yüzden eğer Vue.js öğreniyorsanız, İngilizce okuma pratiği yapmak istiyorsanız veya sadece açık kaynağa destek olmanın o güzel hissini yaşamak istiyorsanız sizi de bekliyoruz. Süreç inanın çok basit:

1. **Bir Görev Seçin:** GitHub repomuzdaki "Issues" kısmına gidin ve henüz kimsenin almadığı (Ready durumundaki) bir sayfayı seçin.
2. **Görevi Üzerinize Alın:** Issue'nun altına "Bu sayfayı ben çevirebilirim" tarzında bir yorum bırakın. Hemen o görevi size atayalım (assign edelim).
3. **Çeviriye Başlayın:** Repoyu kendi hesabınıza "Fork"layın. İlgili markdown (.md) dosyasını bulun ve çevirmenizi yapın.
4. **Gönderin (Pull Request):** Çeviriniz bittiğinde projemize bir Pull Request açın. Biz de hızlıca inceleyelim, eksik varsa beraber öğrenerek düzeltelim ve ana projeye dahil edelim.

Gördüğünüz gibi aslında son derece standart bir açık kaynak katkı süreci. Hatta daha önce hiçbir açık kaynak projeye katkıda bulunmadıysanız, bu projenin sizin için harika, risksiz ve öğretici bir ilk adım olacağına eminim.

## Çevirirken Dikkat Ettiğimiz Birkaç Şey

![]( /blog/images/vuejs-ceviri-bolum5.png)

Herkesin farklı bir çeviri tarzı olduğu için ortaya tutarlı bir Türkçe kaynak çıkması adına ufak tefek kurallarımız var elbette. Çok göz korkutucu şeyler değil; örneğin kod bloklarının içini çevirmemeye özen gösteriyoruz veya "component", "props", "render" gibi Türkçeye çevrildiğinde kafa karıştırabilecek teknik terimleri orijinal haliyle bırakmayı tercih ediyoruz.

Bütün bu detayları repomuzdaki `CONTRIBUTING.md` dosyasında derledik. Çeviriye başlamadan önce o dosyaya bir göz atmanız aklınızdaki soru işaretlerini giderecektir.

## Son Söz

![]( /blog/images/vuejs-ceviri-bolum6.png)

Eğer siz de benim gibi Vue.js dünyasını keşfediyorsanız veya halihazırda tecrübeli bir geliştiriciyseniz, bu projede herkese yetecek kadar sayfa var. Birlikte, ekosisteme değer katacak sağlam bir Türkçe kaynak bırakabiliriz.

Projeyi incelemek, Kanban tahtamıza göz atmak veya hemen bir Issue seçip çeviriye başlamak isterseniz repomuza buradan ulaşabilirsiniz: [poyrazavsever/vuejs-docs-tr](https://github.com/poyrazavsever/vuejs-docs-tr)

Gelin, Vue.js'i birlikte Türkçeleştirelim!

## Katkı Sağlamak İsteyenler İçin Faydalı Linkler

Aşağıdaki linkleri başlamadan önce incelemenizi öneririm. Çeviri sürecini kolaylaştıracak her şey burada derli toplu duruyor:

- [CONTRIBUTING.md](https://github.com/poyrazavsever/vuejs-docs-tr/blob/main/.github/CONTRIBUTING.md) -- Katkı rehberi. Çeviriye başlamadan önce mutlaka okuyun.
- [GLOSSARY.md](https://github.com/poyrazavsever/vuejs-docs-tr/blob/main/GLOSSARY.md) -- Terim sözlüğü. Hangi İngilizce terimin Türkçe karşılığının ne olduğunu buradan kontrol edebilirsiniz.
- [Pull Request Şablonu](https://github.com/poyrazavsever/vuejs-docs-tr/blob/main/.github/pull_request_template.md) -- PR açarken size yol gösterecek hazır şablon.
- [Çeviri Görevi Şablonu](https://github.com/poyrazavsever/vuejs-docs-tr/blob/main/.github/ISSUE_TEMPLATE/translation_task.md) -- Her Issue bu şablonla açılıyor, sürecin nasıl ilerlediğini görebilirsiniz.
