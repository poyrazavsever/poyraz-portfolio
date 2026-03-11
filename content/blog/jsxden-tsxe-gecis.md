---
title: "JSX’den TSX’e Geçiş: Kişisel Bir Deneyim"
category: "TypeScript"
date: "2026-02-18"
readTime: "8 min read"
author: "Poyraz Avsever"
excerpt: "JavaScript'ten TypeScript'e geçiş, özellikle React projelerinde kod kalitesini gözle görülür şekilde artırıyor..."
coverImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*yRK5eL_pqabAhrn7"
---

JavaScript'ten TypeScript'e geçiş, özellikle React projelerinde kod kalitesini gözle görülür şekilde artırıyor. Bu yazıda JSX'ten TSX'e geçişte yaşadığım deneyimi, zorlukları ve kazançları paylaşıyorum.

## Neden TypeScript?

Geçiş kararının temel nedeni daha güvenli ve öngörülebilir kod yazabilmekti. Dinamik tip yapısı bazı durumlarda hızlı başlatma sağlasa da, proje büyüdükçe hata ayıklama maliyetini artırabiliyor.

## Geçiş Sürecinde İzlediğim Yol

- Temel `props` ve `state` tiplerini netleştirdim.
- Bileşenleri tek seferde değil, kademeli şekilde TSX'e taşıdım.
- Hata mesajlarını rehber gibi kullanıp tip sistemini adım adım oturttum.

## JSX ve TSX Karşılaştırması

### JSX Örneği

```jsx
import React from "react";

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

### TSX Örneği

```tsx
import React from "react";

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

## Farklar

### Tip Kontrolü

- JSX: Yerleşik tip güvenliği yoktur.
- TSX: `props` ve `state` açıkça tiplenebilir.

### Geliştirici Deneyimi

- JSX: IDE desteği daha sınırlı olabilir.
- TSX: Otomatik tamamlama ve erken hata yakalama daha güçlüdür.

### Kod Güvenliği

- JSX: Runtime'da hata görme ihtimali daha yüksektir.
- TSX: Hataların önemli kısmı derleme aşamasında yakalanır.

## Karşılaştığım Zorluklar

- Eski JavaScript kodunu tip sistemine uyarlamak zaman aldı.
- Bazı bağımlılıklarda ek tip tanımları gerekebildi.
- Başlangıçta tip kuralları yavaşlatıyor gibi görünse de, orta vadede geliştirme hızını artırdı.

## Elde Ettiğim Kazanımlar

- Daha güvenli kod tabanı
- Daha güçlü IDE desteği
- Daha kolay bakım ve refactor

## Sonuç

JSX'ten TSX'e geçiş ilk etapta zahmetli görünse de, uzun vadede proje kalitesini artıran önemli bir yatırım. Özellikle ekipli geliştirmede TypeScript, ortak bir kalite standardı oluşturuyor.
