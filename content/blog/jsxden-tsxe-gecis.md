---
title: "JSX’den TSX’e Geçiş: Kişisel Bir Deneyim"
category: "TypeScript"
date: "2026-02-18"
readTime: "8 min read"
author: "Poyraz Avsever"
excerpt: "Son zamanlarda JavaScript’ten TypeScript’e geçiş yapmak üzerine yoğun bir şekilde çalışıyorum ve bu süreçte yaşadıklarımı sizlerle paylaşmak istiyorum."
coverImage: "/news/performance.svg"
---

Merhaba arkadaşlar!

![JSX’den TSX’e Geçiş: Kişisel Bir Deneyim](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*yRK5eL_pqabAhrn7)

Son zamanlarda JavaScript’ten TypeScript’e geçiş yapmak üzerine yoğun bir şekilde çalışıyorum ve bu süreçte yaşadıklarımı sizlerle paylaşmak istiyorum. TypeScript, JavaScript’in sunduğu dinamik yapının üzerine statik tiplerin eklenmesiyle kod yazım sürecini bir adım ileriye taşıyor. Peki ben neden geçiyorum? Şuan bir ekiple beraber bir proje üzerinde çalışıyoruz. Ve buna karar kaldık. Bu geçişin benim için nasıl bir yolculuk olduğunu anlatmak, belki sizlere de bu konuda yardımcı olabilir.
Başlangıç: Neden TypeScript?

İlk olarak, TypeScript’e geçiş yapma kararımızın arkasında daha sağlam ve hatasız bir kod yazma isteğimiz vardı. JavaScript’te dinamik tipler bazen kafa karıştırıcı olabiliyor ve bu, büyük projelerde hata ayıklama sürecini zorlaştırıyor. TypeScript, bu sorunları çözmek için tip güvenliği ve geliştirilmiş hata ayıklama yetenekleri sunuyor.
İlk Adımlar: JS’den TSX’e

Geçiş süreci, özellikle JSX’ten TSX’e geçerken bazı zorluklar getirdi. İlk başta, tip tanımlamaları ve interface’lerle ilgili kafam karışmadı değil. Ancak, bu süreçte birkaç önemli adım izlemeye başladım:

    Temel Tip Tanımlamaları: Öncelikle, projedeki temel tipleri tanımlamaya başladım. Bu, özellikle props ve state gibi yapılar için çok faydalı oldu. TypeScript ile, her bir prop ve state’in türünü belirleyerek, olası hataları erkenden yakalayabiliyorum.
    TSX ile JSX’yi Anlama: JSX’ten TSX’e geçişte en önemli şeylerden biri, type checking (tip kontrolü) özelliğinden yararlanmak. Bu, bileşenlerin doğru tipteki verilerle çalışıp çalışmadığını kontrol etmeme yardımcı oldu.
    Gradual Migration (Aşamalı Geçiş): Geçiş sürecini bir anda yapmadım. Bunun yerine, projeyi kademeli olarak TypeScript’e taşıdım. Bu sayede, karşılaştığım sorunları daha kolay çözebildim ve büyük değişiklikler yapmadan önce küçük parçalar üzerinde çalışabildim.

Gelin küçük bir karşılaştırma yapalım.
JSX (JavaScript XML)

JSX, React bileşenlerinde JavaScript kodunu HTML benzeri bir sözdizimi ile yazmamıza olanak tanır. Ancak, JSX’te tip kontrolü yapılmıyor.

import React from 'react';

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;

TSX (TypeScript XML)

TSX ise, JSX’in TypeScript ile birleştirilmiş hali olup, tip kontrolü ve daha iyi hata ayıklama özellikleri sunuyor. Tip güvenliği sağlıyor ve bu, bileşenlerin beklenmedik hatalara karşı korunmasına yardımcı oluyor.

import React from 'react';

// Props için TypeScript ile tip tanımlaması
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;

Karşılaştırma

    Tip Kontrolü:

    JSX: Tip kontrolü yoktur.
    TSX: Props ve state için tip tanımlamaları yapılabilir.

2. Geliştirici Deneyimi:

    JSX: Kod tamamlama ve hata ayıklama sınırlıdır.
    TSX: Daha iyi kod tamamlama ve erken hata tespiti sağlar.

3. Kod Güvenliği:

    JSX: Tip hatalarına karşı koruma yoktur.
    TSX: Tip hatalarını önlemeye yardımcı olur ve daha güvenli kod sağlar.

Bu örnekler, JSX ve TSX arasındaki temel farkları gösteriyor sanırım. Kısaca TypeScript kullanarak daha sağlam ve güvenli bir kod yazabilirsiniz arkadaşlar.
Yaşadığım Zorluklar

TypeScript’e geçiş yaparken karşılaştığım bazı zorluklar oldu. En büyük sorunlardan biri, eski JavaScript kodunun TypeScript’e uyumlu hale getirilmesiydi. Özellikle, mevcut kodlarda eksik tip tanımlamaları ve uyumsuzluklar bulmak bazen zaman alabiliyor. Düzeltiyorum, çok zaman alıyor. Ayrıca, bazı kütüphaneler ve araçlar TypeScript ile tam uyumlu olmayabiliyor, bu da ekstra uyum sorunlarına neden olabiliyor. Fakat daha sonra dönüp baktığım zaman bunlara değdini görüyorum.
Faydalar

Ancak, TypeScript’in avantajları bu zorlukları gölgede bırakıyor. İşte bu geçişten elde ettiğim bazı önemli faydalar:

    Daha Güvenli Kod: TypeScript sayesinde, kodumda hata yapma olasılığım azaldı. Tip güvenliği, hataları daha erken aşamada tespit etmemi sağlıyor.
    Daha İyi Geliştirici Deneyimi: TypeScript, editörde daha iyi kod tamamlama ve hata ayıklama araçları sunuyor. Bu, geliştirme sürecimi daha verimli hale getiriyor.
    Daha Kolay Bakım: Tip tanımlamaları ve interface’ler, kodun bakımını ve genişletilmesini kolaylaştırıyor. Bu, özellikle büyük projelerde büyük bir avantaj.

Sonuç

TypeScript’e geçiş yapmak, benim için zorlu ama öğretici bir süreç oldu. Bu geçiş, uzun vadede daha sağlam ve sürdürülebilir kod yazmama yardımcı oldu. Eğer siz de JavaScript’ten TypeScript’e geçmeyi düşünüyorsanız, başlangıçta bazı zorluklar yaşayabilirsiniz ama bu çabanın karşılığını eminim uzun vadede göreceksiniz.

Umarım bu yazı, TypeScript’e geçiş yapmayı düşünenler için faydalı olur. Siz de deneyimlerinizi veya sorularınızı paylaşmak isterseniz, yorumlarda buluşalım!
