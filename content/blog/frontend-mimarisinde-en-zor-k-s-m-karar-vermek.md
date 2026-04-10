---
title: "Frontend Mimarisinde En Zor Kısım: Karar Vermek"
category: "General"
date: "2025-12-23"
readTime: "10 min read"
author: "Poyraz Avsever"
slug: "frontend-mimarisinde-en-zor-k-s-m-karar-vermek"
excerpt: "Frontend Mimarisinde En Zor Kısım: Karar Vermek TL;DR Frontend mimarisinde asıl zor kısım “en iyi pattern”i bulmak değil; hangi kararı, ne zaman ve ne kadar kesinlikle vereceğine karar …"
coverImage: "/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/frontend-mimarisinde-en-zor-k%C4%B1s%C4%B1m-karar-vermek-b3719c7aaacd"
---

# Frontend Mimarisinde En Zor Kısım: Karar Vermek


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-2.jpg)

## **TL;DR**

Frontend mimarisinde asıl zor kısım “en iyi pattern”i bulmak değil; **hangi kararı, ne zaman ve ne kadar kesinlikle** vereceğine karar vermek. Çünkü frontend, ürün ihtiyaçlarıyla (hız, teslim tarihi, UX), ekip gerçekleriyle (tecrübe, sahiplik), ve teknik kısıtlarla (performans, bakım maliyeti) aynı anda pazarlık yapar. Bu yazıda mimari kararları “doğru/yanlış” ikileminden çıkarıp; **trade-off’larla yönetilen, geri alınabilirliği planlanan** ve ekibe uygun şekilde yazılı hale getirilen bir süreç olarak ele alacağım. Sonunda da kararları daha az stresli, daha izlenebilir ve daha sürdürülebilir hale getiren pratik bir yaklaşım paylaşacağım.

## İçerik

1.  Frontend mimarisinde “karar verme” problemi
2.  Frontend kararlarının neden diğer alanlara göre daha belirsiz?
3.  “Doğru mimari” arayışının neden yanıltıcı olduğuna bakalım.
4.  Geri alınabilir ve geri alınamaz kararlar arasındaki fark
5.  Frontend mimarisinde olgunluğumun gelişimi
6.  Karar vermemi kolaylaştıran düşünme çerçeveleri
7.  Sonuç


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-3.jpg)

## Frontend Mimarisinde “Karar Verme” Problemi

Frontend mimarisi dendiğinde çoğu kişinin aklına dosya yapıları, klasör isimleri ya da hangi state yönetim aracının kullanılacağı geliyor. Neden?

Oysa işin en zor kısmı bence bunların hiçbiri değil. En zor kısım, neye karar vereceğini bilmek. Açıkcası ben bunu fark ettikten sonra bunu araştırmaya ve bu yazıyı yazmaya başladım. Neden diye soruyor olabilirsin.

Çünkü frontend’de kararlar nadiren net oluyor. Genelde gri alanlarda dolaşır. Tam olarak “yanlış” değildir ama “kesin doğru” da değildir.

Günlük hayatta da benzer bir duruma benzetebiliriz bunu. Mesela yeni bir eve taşınırken:  
“Bu koltuğu buraya mı koysam, yoksa sonra mı yerleştirsem?”  
diye düşünürsün. Şu an koyarsan iş görür, ama ileride pişman olma ihtimali vardır. Koymazsan da ev eksik hissi verir.

Frontend mimarisindeki kararlar da aynen böyledir.

Bir component’i burada mı konumlandırmalıyım, yoksa daha genel bir yere mi almalıyım? Bu state gerçekten global mi, yoksa şimdilik local kalsa yeter mi? Bu yapı ileride büyür mü, yoksa şu an düşündüğümden küçük mü kalır?

Sorular bitmez. Çünkü frontend, sürekli değişen bir alanın tam ortasındadır.

Ürün fikri değişir, tasarım revize olur, kullanıcı davranışı farklı çıkar. Dün “çok mantıklı” görünen bir karar, bugün gereksiz hale gelebilir. Bu da frontend’de karar vermeyi teknik bir meseleden çok, **zamanlama ve sezgi** meselesine dönüştürür.

**İşin zor tarafı şu:** Çoğu frontend kararı, verildiği anda yanlış hissettirmez. Aksine, genelde işe yarar. Sayfa açılır, feature çalışır, herkes yoluna devam eder. Problem, bu kararların **birikmeye** başlamasıyla ortaya çıkar.

Bir gün gelir, projeye yeni biri girer ve şu soruyu sorar: **“Bunu neden böyle yaptım?”**

Ve sen o anda aynı benim gibi şunu fark edersin:  
Aslında kötü bir karar vermemişsindir.  
Sadece o an için doğru olan bir kararı, **fazla uzun süre taşımışsındır**.

Frontend mimarisinde karar verme problemi tam olarak budur.  
Yanlış karar vermek değil; hangi kararın ne kadar süre geçerli olacağını kestirememek.

Bu yüzden frontend mimarisi, güçlü kurallardan çok; güçlü karar refleksleri gerektirir. Ve bu refleks, zamanla, hata yaparak ve geriye dönüp bakarak gelişir.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-4.jpg)

## Frontend Kararlarının Neden Diğer Alanlara Göre Daha Belirsiz?

Frontend’de karar vermeyi zorlaştıran şey, teknik bilginin eksikliği değildir. Asıl mesele, **aynı anda çok fazla değişkenle muhatap olmaktır**. Backend ya da altyapı tarafında kararlar genellikle daha dar bir çerçevede alınır. Veri modeli, iş kuralları ve sistem sınırları daha nettir. Frontend’de ise bu netlik neredeyse hiçbir zaman yoktur.

Çünkü frontend, doğrudan insan davranışıyla temas eder. Bence bu çok gerici.

Kullanıcı ne yapar, nereye tıklar, nerede vazgeçer, neyi anlamaz… Bunların hiçbiri baştan kesin değildir. Tasarım aşamasında her şey çok mantıklı görünür ama gerçek kullanıcıyla karşılaştığında bambaşka sonuçlar ortaya çıkabilir. Bu da frontend’de alınan mimari kararları sürekli “geçici” hale getirir.

Bir de ürün tarafı vardır. Bugün “küçük bir özellik” olarak gelen bir istek, birkaç ay sonra ürünün merkezine oturabilir. İlk başta basitçe çözülen bir akış, zamanla onlarca farklı senaryoyu taşımak zorunda kalır. O noktada dönüp bakarsın ve şunu fark edersin: Mimari karar, ürünün evrimine ayak uyduramamıştır.

**Ekip dinamikleri de bu belirsizliği artırır.** Frontend projeleri çoğu zaman tek kişiyle başlar, sonra ekip büyür. Ya da tam tersi olur; ekip küçülür, sorumluluklar artar. Dün herkesin anladığı bir yapı, bugün kimsenin dokunmak istemediği bir alana dönüşebilir. Aynı mimari karar, farklı ekip yapılarında tamamen farklı sonuçlar doğurur.

Tüm bu nedenlerle frontend’de mimari kararlar, teknik doğrulardan çok **bağlama bağımlıdır**. Bugün doğru olan, yarın fazla gelir. Bugün basit olan, yarın yetersiz kalır.

Bu belirsizlik kötü bir şey değildir. Aksine, frontend’i canlı tutan şeydir. Ama bu gerçeği kabul etmeden mimari kurmaya çalışmak, insanı sürekli yanlış karar verdiğini düşünmeye iter. Oysa çoğu zaman sorun kararın kendisi değil, **koşulların değişmiş olmasıdır**.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-5.jpg)

## “Doğru Mimari” Arayışının Neden Yanıltıcı Olduğu

Frontend mimarisiyle ilgili en büyük tuzaklardan biri, bir noktada “doğru” bir yapı olduğuna inanmak. Sanki yeterince araştırırsak, yeterince örnek incelersek, sonunda herkes için geçerli olan o mimariyi bulacakmışız gibi hissederiz. En azından ben öyle hissediyorum ;)

Bu konu hakkında uzman, kalifiye frontend developer’lar ile konuştuğumda bana gerçekte frontend dünyasında böyle bir olayın olmadığını söylediler.

Bir yazıda, bir konferans konuşmasında ya da bir GitHub reposunda gördüğümüz mimari yapı genellikle bağlamından kopuktur. Orada çalışan şey, o ekip için, o ürün için, o zaman dilimi için çalışıyordur. Ama biz o yapıyı alıp kendi projemize koyduğumuzda aynı sonucu alacağımızın hiçbir garantisi yoktur.

Bu durum günlük hayatta da çok tanıdıktır. Bir arkadaşın ben bu yöntemle çok rahat kilo verdim demesi gibi. O yöntem onun hayatına, temposuna, alışkanlıklarına uygundur. Sen aynısını yaptığında aynı sonucu alamazsın. Frontend mimarisi de tam olarak böyle işler.

“Best practice” diye sunulan pek çok şey aslında **best context practice**’tir.  
Bağlam değiştiğinde, doğrular da değişir.

Bir projede çok katmanlı, son derece düzenli bir mimari büyük bir avantajken; başka bir projede aynı yapı sadece yavaşlatıcı bir yüke dönüşebilir. Küçük bir ekip için fazla disiplin, büyük bir ekip için ise hayati bir düzen anlamına gelebilir.

“Doğru mimari” arayışı, farkında olmadan şunu da beraberinde getirir: Karar vermeyi ertemek.

Çünkü doğruyu ararken, “ya yanlış seçersem?” korkusu büyür. Bu korku da bizi ya hiç karar vermemeye ya da başkasının kararlarını kopyalamaya iter. Oysa mimari olgunluk, başkalarının kararlarını birebir uygulamak değil; **kendi bağlamında bilinçli tercihler yapabilmektir**.

Frontend mimarisinde iyi kararlar genellikle mükemmel değildir. Yeterince iyidir. Ve en önemlisi, **değiştirilebilir** olacak şekilde alınmıştır.


Bu noktada mesele, “en doğru mimari hangisi?” sorusu olmaktan çıkar.  
Asıl soru şudur: “Bu mimari, şu anki koşullarda bize hizmet ediyor mu?”

Bu soruyu sorabildiğimiz anda, doğru mimari arayışından çıkıp sağlıklı mimari kararlar almaya başlarız.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-6.jpg)

## Geri Alınabilir ve Geri Alınamaz Kararlar Arasındaki Fark

Frontend mimarisinde karar vermeyi gerçekten zorlaştıran şey, tüm kararların aynı ağırlıkta görünmesidir. İlk bakışta her şey “önemsiz bir detay” gibi durur. Bir klasör adı, bir componentin sınırı, bir state’in yeri… Hepsi küçük gibi hissettirir. Ama hepsi aynı değildir.

Bazı kararlar vardır; yanlış yapıldığında can sıkar ama düzeltilebilir.  
Bazıları vardır; yanlış yapıldığında proje uzun süre onunla yaşamak zorunda kalır.

Aradaki fark, kararın **geri alınabilir olup olmamasıdır**.

Geri alınabilir kararlar, frontend projelerinin nefes almasını sağlar. Bir component’i başka bir yere taşımak, bir hook’u yeniden yazmak, bir sayfanın iç yapısını değiştirmek… Bunlar zaman alır ama mümkündür. Bu tür kararlar, genellikle cesurca ve hızlı verilebilir. Çünkü hata yapma maliyeti düşüktür.

Geri alınamaz kararlar ise bence çok korkunç. Verildiği anda çok mantıklı görünür ama zamanla projeyi şekillendirir.

Örneğin, tüm projeyi tek bir global state etrafında kurgulamak ya da her şeyi belirli bir mimari kalıba zorla oturtmak. Ya da ekip bu yapıyı gerçekten benimsemeden, ağır bir düzen kurmak. Bu kararlar geri almak istediğinde sadece kodu değil, **alışkanlıkları, mental modeli ve ekip akışını** da değiştirmen gerekir.

Günlük hayattan düşünürsek; bir gün dışarı çıkarken giydiğin ayakkabıyı değiştirmek kolaydır. Ama yaşadığın şehri değiştirmek kolay değildir. İkisi de “karar”dır ama etkileri aynı değildir. Frontend mimarisinde de benzer bir durum vardır.

Sorun şu ki, çoğu zaman bu iki karar türünü ayırt etmeyiz. Her kararı aynı ciddiyetle ele alır ya da tam tersi, hepsini sonra bakarız diyerek geçiştiririz. Oysa mimari olgunluk, kararların önem derecesini ayırt edebilmekle başlar.

İyi bir yaklaşım şudur:  
\- Eğer bir karar geri alınamıyorsa, onu yavaş ver.  
\- Eğer geri alınabiliyorsa, mükemmeli bekleme.

Bu bakış açısını öğrendiğimden ve uygulamaya başladığımdan beri frontend’de hem daha hızlı ilerledim hem de gereksiz stresimin önüne geçtim. Çünkü artık mesele “yanlış karar verdim mi?” değil, “bu kararı gerektiğinde geri alabilecek miyim?” sorusuna dönüştü.

Frontend mimarisinde güven veren şey, hatasız olmak değil; **hatalarla yaşayabilecek bir yapı kurmaktır**.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-7.jpg)

## Frontend Mimarisinde Olgunluğumun Gelişimi

Frontend mimarisiyle ilişkim, çoğu geliştirici arkadaşımda olduğu gibi kurallarla başladı. İlk başlarda her şey netti. Çook doğru olan klasör yapıları vardı, olmazsa olmaz pattern’lerim vardı. Bunları uygularsam sorun yaşamayacağımı düşünüyordum. Bir projede ne kadar çok kural varsa, o kadar sağlam olacağına inanıyordum.

Sonra projeler büyümeye başladı.

Kurallara rağmen işler karışıyordu. Hatta bazen kurallar yüzünden daha da karışıyordu. Bir şeyi değiştirmek için çok fazla yere dokunmak gerekiyordu. Basit bir ihtiyacın çözümü, gereğinden fazla karmaşık hale geliyordu. O noktada ilk kez şunu fark ettim: Mimari, projeyi korumak kadar **kısıtlayabiliyordu** da.

Bu süreç içersinde çok güzel insanlar ile bu konu hakkında sohbetler ettim. Bol bol düşündüm. Bir süre sonra mimariye yaklaşımım değişti.  
Daha esnek olmaya çalıştım. Kuralları azalttım, yapıların zamanla şekillenmesine izin verdim. Bu sefer de başka bir problem ortaya çıktı. Başlangıçta hızlı ilerleyen projeler, belli bir noktadan sonra anlaşılmaz hale geliyordu. Herkes kendi bildiği gibi ekleme yapıyor, ortak bir yön duygusu kayboluyordu.

Bu iki uç arasında gidip gelmek, bana mimari olgunluğun aslında dengeyle ilgili olduğunu öğretti.

Olgunlaştıkça şunu fark ediyorsun: Mimari, baştan kusursuz olmak zorunda değil. Ama **bilinçli** olmak zorunda.

Artık karar verirken şu soruları sormaya başladım:

*   Bu yapı gerçekten bugün için mi gerekli?
*   Yarın değişirse, bunu söküp atabilir miyim?
*   Bu kararı ben mi anlayacağım, yoksa ekip de anlayabilecek mi?

En büyük değişim ise şurada oldu: Mimariyi savunulacak bir şey olarak değil, yaşayan bir şey olarak görmeye başladım.

Eskiden bir yapı kurduğumda, onun “bozulmaması” için uğraşıyordum. Şimdi ise bozulacağını kabul ediyorum. Hatta bozulmasını planlıyorum. Çünkü frontend projelerinde değişim kaçınılmaz. Olgunluk, bu değişimi engellemek değil, onunla birlikte akabilmek.

Bugün geriye dönüp baktığımda, frontend mimarisinde olgunluğumun artması daha karmaşık yapılar kurmamla değil, daha az ama daha anlamlı kararlar vermemle oldu. Her şeyi kontrol etmeye çalışmak yerine, hangi şeyleri kontrol etmem gerektiğini öğrenmek asıl dönüm noktasıydı.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-8.jpg)

## Karar Vermemi Kolaylaştıran Düşünme Çerçeveleri

Frontend mimarisinde belli bir noktadan sonra fark ettiğim şey şu oldu: Daha fazla bilgi, karar vermeyi her zaman kolaylaştırmıyor. Bazen tam tersi oluyor. Ne kadar çok seçenek görürsen, o kadar kararsız kalıyorsun. Bu yüzden zamanla kendime bazı basit düşünme çerçeveleri oluşturdum. Mükemmel değiller ama karar verirken beni sakinleştiriyorlar. Belki sizi de sakinleştirirler.

İlk çerçeve şu: Bu karar bugün gerçekten gerekli mi, yoksa yarın da olur mu?

Birçok mimari tartışma aslında erken başlar. Henüz ürünün yönü netleşmemişken, olası tüm senaryoları düşünmeye çalışırız. Oysa çoğu karar, gerçekten ihtiyaç doğmadan verildiğinde yanlış olur. Eğer bir yapı bugün somut bir problemi çözmüyorsa, onu biraz ertelemek çoğu zaman daha sağlıklıdır.

İkinci çerçeve: Bu karar kimleri etkileyecek? Sadece kendimi değil, ekipteki diğer geliştiricileri de ya da gelecekteki beni düşünmeye başladığım an kararlar netleşiyor. Bu yapı yeni gelen birinin işini kolaylaştıracak mı, yoksa önce bunu öğrenmen lazım mı diyeceğiz? Eğer bir karar sürekli açıklama gerektiriyorsa, muhtemelen fazla karmaşıktır.

Üçüncü çerçeve: Yanılırsam bedeli ne olur? Her kararın bir hata ihtimali vardır. Burada önemli olan hata yapıp yapmamak değil, hatanın maliyetidir. Eğer yanlış yaparsam bir günümü mü alır, yoksa haftalarca sürecek bir refactor mı gerektirir? Bedeli düşük olan kararları hızlı, bedeli yüksek olanları yavaş almak ciddi bir fark yaratıyor.

Dördüncü çerçeve: Bu yapı büyümeye mi, değişmeye mi hazırlanıyor?  
Frontend projeleri genelde büyüyeceği varsayılarak tasarlanır. Oysa çoğu proje büyümez, değişir. Akışlar değişir, öncelikler değişir, kullanıcı davranışı değişir. Bu yüzden mimariyi “daha fazla şey ekleriz” düşüncesinden çok, “bir şeyleri rahatça değiştirebilir miyiz?” sorusu üzerinden değerlendirmek kararları sadeleştiriyor.

Son olarak kendime sıkça şunu soruyorum: Bu kararı üç ay sonra savunabilir miyim? Bu sorunun cevabı evetse, karar genelde yeterince iyidir. Hayırsa, ya erken verilmiştir ya da gereğinden fazla iddialıdır. Mimari kararların hepsini sevmek zorunda değilim; ama neden aldığımı hatırlamak zorundayım.

Bu çerçeveler beni daha iyi bir YAZILIM MİMARI yapmadı belki, ama daha rahat bir geliştirici yaptı. Çünkü artık karar vermek, “doğruyu bulma” çabası değil; bilinçli bir tercih yapma süreci.


![](/blog/images/frontend-mimarisinde-en-zor-k-s-m-karar-vermek-img-9.jpg)

## Sonuç

Bu yazıyı yazarken aslında bir şey öğretmeye değil, son zamanlarda kendimde fark ettiğim değişimleri paylaşmaya çalıştım. Frontend mimarisine bakışımın nasıl evrildiğini, karar verme sürecinin benim için neden daha merkezi bir hale geldiğini anlatmak istedim.

Eskiden mimariyi daha çok kurallar, yapılar ve “doğru çözümler” üzerinden düşünüyordum. Şimdi ise daha çok zamanlama, bağlam ve geri alınabilirlik üzerinden düşünüyorum. Daha az iddialı ama daha bilinçli kararlar almaya çalışıyorum. Her şeyi en baştan doğru yapmak yerine, değişime alan bırakan yapılar kurmanın beni hem teknik hem zihinsel olarak rahatlattığını fark ettim.

Bu değişim bir anda olmadı. Projeler büyüdükçe, bazı kararların yük haline geldiğini gördükçe, bazılarını da fazla ciddiye aldığımı fark ettikçe oluştu. Bugün geriye dönüp baktığımda, frontend mimarisinde ilerlemek benim için daha karmaşık çözümler üretmek değil; **hangi kararların gerçekten önemli olduğunu ayırt edebilmek** anlamına geliyor.

Eğer bu yazı, senin de bir kararın üzerine biraz daha düşünmene ya da “ben bunu neden böyle yapmıştım?” diye sormana sebep olduysa, amacına ulaşmış demektir. Frontend mimarisi çoğu zaman sessiz ilerler ama verdiğimiz kararlar uzun süre bizimle kalır.

Okuduğun için teşekkür ederim. Umarım bir yerinde sana da dokunmuştur