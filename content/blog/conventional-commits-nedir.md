---
title: "Yazılım Projelerinde Düzen ve Verimlilik İçin: Conventional Commits Nedir?"
category: "Yazilim"
date: "2026-02-01"
readTime: "8 min read"
author: "Poyraz Avsever"
excerpt: "Bu yazida temel kavramlari, pratik ornekleri ve uygulayabileceginiz ipuclarini sade bir dille bulabilirsiniz."
coverImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WQOgajPE2m4aYuVC3SZoFQ.jpeg"
---

Yazılım geliştirme sürecinde yalnızca kod yazmıyoruz; aynı zamanda takım iletişimini ve proje geçmişini de yönetiyoruz. Commit mesajları bu süreçte kritik rol oynar. Conventional Commits, commit geçmişini daha anlaşılır ve sürdürülebilir hale getiren pratik bir standarttır.

## Conventional Commits Nedir?

Conventional Commits, commit mesajlarını belirli bir formatta yazmayı öneren bir standarttır. Her commit'in amacı daha hızlı anlaşılır; release notları, sürümleme ve ekip içi takip süreçleri kolaylaşır.

## Neden Kullanmalıyız?

### 1. Anlaşılabilirlik

Commit geçmişi daha okunabilir olur. Özellikle büyük projelerde hangi commit'in neyi değiştirdiğini bulmak çok daha hızlı hale gelir.

### 2. İzlenebilirlik ve Şeffaflık

Hangi değişikliğin bug fix, hangisinin yeni özellik olduğu netleşir. Geriye dönük analiz ve hata takibi kolaylaşır.

## Commit Mesajı Yapısı

Conventional Commits'te mesaj genelde üç bölümden oluşur:

- **Başlık (Summary)**: Tür + kısa açıklama
- **Gövde (Body)**: Değişikliğin nedeni ve detayları
- **Altbilgi (Footer)**: Breaking change veya issue referansları

## Sık Kullanılan Türler

- `feat`: Yeni özellik
- `fix`: Hata düzeltmesi
- `docs`: Dokümantasyon değişikliği
- `style`: Format/stil düzeni (işlev değişmez)
- `refactor`: Davranışı değiştirmeden kod iyileştirme

## Örnek Commit

```text
feat(login): add JWT authentication

Added JWT authentication to the login process to enhance security.
This change involves updating the login controller and modifying the user model.

BREAKING CHANGE: The user model now requires a JWT token for all login operations.
```

Bu örnekte:

- `feat(login)` kısmı değişikliğin türünü ve kapsamını açıklar.
- Body kısmı neyin ve neden yapıldığını anlatır.
- `BREAKING CHANGE` ifadesi geriye dönük uyumluluğu etkileyen bir güncelleme olduğunu belirtir.

## Sonuç

Conventional Commits, proje geçmişini düzenler ve ekip verimliliğini artırır. Özellikle takım çalışmasında ve sürüm yönetiminde standart bir commit dili oluşturmak için güçlü bir yöntemdir.

## Kaynak

- [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
- [3 reasons why you should use conventional commits](https://developer.vonage.com/en/blog/3-reasons-why-you-should-use-conventional-commits)
