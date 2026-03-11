---
title: "Yazılım Projelerinde Düzen ve Verimlilik İçin: Conventional Commits Nedir?"
category: "Yazilim"
date: "2026-02-01"
readTime: "8 min read"
author: "Poyraz Avsever"
excerpt: "Yazılım geliştirme sürecinde, kod yazmanın ötesinde pek çok detayla uğraşıyoruz. Commit mesajları da bu sürecin kritik bir parçası tabii ki. Ancak commit mesajları, bazen dağını..."
coverImage: "/news/performance.svg"
---

Yazılım geliştirme sürecinde, kod yazmanın ötesinde pek çok detayla uğraşıyoruz. Commit mesajları da bu sürecin kritik bir parçası tabii ki. Ancak commit mesajları, bazen dağınık, anlaşılmaz ve düzensiz olabiliyor. İşte bu noktada “Conventional Commits” devreye giriyor.

![Yazılım Projelerinde Düzen ve Verimlilik İçin: Conventional Commits Nedir?](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WQOgajPE2m4aYuVC3SZoFQ.jpeg)

Conventional Commits Nedir?

Conventional Commits, commit mesajlarınızı belirli bir formata oturtan bir yazılım standardı. Amaç, her commit’in ne yaptığını net bir şekilde ifade etmek ve proje geçmişini daha anlaşılır hale getirmek. Commit mesajlarınızı bu standarda göre yazmak, projeyi daha düzenli, takip edilebilir ve sürdürülebilir kılar. Gelin şimdi beraber inceleyelim.
Neden Conventional Commits Kullanmalıyız?
1. Anlaşılabilirlik

Commit geçmişinin anlaşılabilir olması hepimiz için önemli. Bu standart, projede yapılan değişikliklerin kolayca takip edilmesini sağlıyor. Büyük projelerde, hangi commit’in hangi sorunu çözdüğünü veya hangi yeni özelliği eklediğini anlamak zaman zaman zorlaştığı için bu gibi standartları kullanmak yazılımcıların işini kolaylaştırıyor.
2. İzlenebilirlik ve Şeffaflık

Commit mesajlarımızı tutarlı ve net hale getirmek, proje geçmişimizde yapılan değişikliklerin izlenmesini kolaylaştırıyor. Özellikle geriye dönük uyumluluğu bozan değişikliklerde, bu düzenlemeler büyük bir avantaj sağlıyor.
Peki Bu Commit Mesajları Nasıl Yazılıyor?

Conventional Commits’e göre, her commit mesajı üç ana bölümden oluşur:

    Başlık (Summary): Mesajın türünü ve kısaca ne yaptığını belirtir.
    Gövde (Body): Değişikliğin detaylarını açıklar. Neden yapıldığını ve nasıl yapıldığını anlatır.
    Altbilgi (Footer): Breaking changes gibi uyumluluğu bozan değişiklikler veya kapatılan sorunlar burada belirtilir.

    Commit Türleri

Commit mesajları belirli türlerle başlar. İşte en yaygın kullanılan türler: Daha detaylı commit türlerini incelemek için tıklayın.

    feat: Yeni bir özellik eklenmesi.
    fix: Bir hatanın düzeltilmesi.
    docs: Sadece dokümantasyonla ilgili değişiklikler.
    style: Kodun işleyişini değiştirmeyen biçimlendirme (boşluklar, noktalı virgüller vb.).
    refactor: Kodda, işlevini değiştirmeyen yeniden düzenleme.

Gelin beraber örnek bir Commit Mesajını inceleyelim:

    feat(login): add JWT authentication

    Added JWT authentication to the login process to enhance security.
    This change involves updating the login controller and modifying the user model.

    BREAKING CHANGE: The user model now requires a JWT token for all login operations.

    Başlık (Summary):

    feat:
    Commit türünü belirtir. Burada feat (feature) türü kullanılmış, bu da commit'in projeye yeni bir özellik eklediğini gösterir. Başka türler de kullanılabilir, örneğin fix (bir hatayı düzeltmek), docs (dokümantasyon güncellemeleri) gibi.
    (login):
    Parantez içinde belirtilen bölüm, bu özelliğin veya değişikliğin hangi modülü veya bölümü etkilediğini gösterir. Burada login kullanılmış, yani yapılan değişiklik, login (giriş) süreciyle ilgilidir.
    add JWT authentication:
    Bu, commit'in yaptığı spesifik değişikliği kısa ve öz bir şekilde açıklar. Burada, JWT (JSON Web Token) ile kimlik doğrulamanın login sürecine eklendiği belirtiliyor.

2. Gövde (Body):

    İlk Cümle:
    “Added JWT authentication to the login process to enhance security.”
    Bu cümle, yapılan değişikliğin amacını ve sonucunu açıklar. Burada, JWT kimlik doğrulamasının login sürecine eklendiği ve bunun güvenliği artırmak amacıyla yapıldığı belirtiliyor.
    İkinci Cümle:
    “This change involves updating the login controller and modifying the user model.”
    Bu cümle, değişikliğin hangi dosya veya modülleri etkilediğini daha detaylı açıklar. Burada, login controller’ın güncellendiği ve user model’in değiştirildiği belirtiliyor.

3. Altbilgi (Footer):

    BREAKING CHANGE:
    Bu ifade, uyumluluğu bozan bir değişiklik olduğunu gösterir. Eğer bir commit, mevcut kodun çalışmasını bozacak bir değişiklik yapıyorsa, bu mutlaka belirtilmelidir. Bu, diğer geliştiricilerin bu değişiklikten haberdar olmasını sağlar.
    Detay:
    “The user model now requires a JWT token for all login operations.”
    Bu açıklama, uyumluluğu bozan değişikliğin ne olduğunu detaylandırır. Burada, kullanıcı modelinin artık tüm giriş işlemleri için bir JWT token gerektirdiği belirtiliyor. Bu, diğer geliştiricilerin bu değişikliği uygularken dikkatli olmaları gerektiğini ifade eder.

Sonuç olarak

Conventional Commits, yazılım geliştirme sürecimizi daha düzenli, anlaşılır ve verimli hale getirdi. Commit mesajlarımızı belirli bir yapıya oturtarak, proje yönetimimizi daha sürdürülebilir ve izlenebilir bir hale getirdik.

Eğer siz de projelerinizde daha düzenli bir commit geçmişi istiyorsanız, Conventional Commits’i denemenizi tavsiye ederim.
Kaynak

[https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)
[https://developer.vonage.com/en/blog/3-reasons-why-you-should-use-conventional-commits](https://developer.vonage.com/en/blog/3-reasons-why-you-should-use-conventional-commits)
