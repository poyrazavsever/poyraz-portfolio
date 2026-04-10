---
title: "Next.js ile Edge Functions: Hızlı Web Uygulamaları Nasıl Geliştirilir?"
category: "General"
date: "2025-09-17"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir"
excerpt: "Next.js ile Edge Functions: Hızlı Web Uygulamaları Nasıl Geliştirilir? TL;DR (Too Long; Didn’t Read): Edge Functions, kullanıcıya en yakın konumda çalışan, hızlı serverless …"
coverImage: "/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/next-js-ile-edge-functions-h%C4%B1zl%C4%B1-web-uygulamalar%C4%B1-nas%C4%B1l-geli%C5%9Ftirilir-d94eafacf50e"
---

# Next.js ile Edge Functions: Hızlı Web Uygulamaları Nasıl Geliştirilir?


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-2.jpg)

**TL;DR (Too Long; Didn’t Read):**  
Edge Functions, kullanıcıya en yakın konumda çalışan, hızlı serverless fonksiyonlardır.

Next.js ile tek satırda `runtime = 'edge'` diyerek bunu kullanabilirsin.  
Global kullanıcılar için gecikme süresini azaltır, kişiselleştirilmiş içerik, A/B testleri ve caching için idealdir.

### Nasıl İlerleyeceğim?

*   **Giriş**
*   **Edge Functions Nedir?**
*   **Next.js ile Edge Functions Kullanımı**
*   **Kullanım Senaryoları**
*   **Avantajlar ve Sınırlamalar**
*   **Sonuç ve Öneriler**

## Giriş

Modern web uygulamalarında hız, kullanıcı deneyiminin en kritik parçasıdır. Eminim sizinde sayfa biraz uzun yüklendiğinde siteden çıkmışlığınız vardır.

Sayfa yüklenme süresindeki milisaniyelik farklar bile kullanıcı davranışını değiştirebilir, dönüşüm oranlarını etkileyebilir.

Peki nasıl hızlandıracağız? İşte tam bu noktada **Edge Functions** devreye giriyor. Kullanıcıya en yakın yerde çalışan bu küçük fonksiyonlar, global ölçekte gecikmeyi minimuma indirir ve sunucu yükünü hafifletir.

Bu yazıda, Edge Functions’ın ne olduğunu, Next.js ile nasıl entegre edildiğini ve hangi senaryolarda en iyi sonucu verdiğini adım adım inceleyeceğiz.


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-3.jpg)

## Edge Functions Nedir?

Edge Functions, kullanıcıya **en yakın veri merkezinde** çalışan küçük, serverless fonksiyonlardır.

Böylece bir kullanıcı İstanbul’dan bir istekte bulunduğunda, bu istek ABD’deki ana sunucuya gitmek yerine İstanbul’a en yakın veri merkezinde işlenir.

Bu yaklaşım şu avantajları sağlar:

*   **Düşük gecikme (low latency):** İstekler daha hızlı yanıtlanır.
*   **Daha iyi kullanıcı deneyimi:** Sayfalar ve API yanıtları daha hızlı yüklenir.
*   **Global ölçeklenebilirlik:** Dünyanın her yerindeki kullanıcılar benzer hızda erişim sağlar.

export const runtime = 'edge';  
  
export async function GET(req: Request) {  
  const country = req.headers.get('x-vercel-ip-country') || 'US';  
  
  return new Response(  
    JSON.stringify({ currency: country === 'TR' ? '₺' : '$' }),  
    { headers: { 'Content-Type': 'application/json' } }  
  );  
}

Mesela bu örnekte, istek hangi ülkeden gelirse gelsin **en yakın edge node’da** çalışır ve kullanıcıya uygun para birimi döner.


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-4.jpg)

## Next.js ile Edge Functions Kullanımı

Next.js, Edge Functions kullanmayı son derece kolay hale getiriyor sağ olsun. Bir API Route’u edge üzerinde çalıştırmak için tek yapman gereken`**runtime = 'edge'**` satırını eklemektir.

### 1\. Basit Bir Edge Function Oluşturalım

Örnek olarak `app/api/hello/route.ts` dosyası oluşturalım:

export const runtime = 'edge';  
  
export async function GET() {  
  return new Response(  
    JSON.stringify({ message: 'Merhaba Edge!' }),  
    { headers: { 'Content-Type': 'application/json' } }  
  );  
}

Bu kadar :) Artık bu endpoint, global olarak edge sunucularında çalışacak.

Tarayıcıda `/api/hello` yoluna girdiğinde şöyle bir sonuç göreceksin:

{ "message": "Merhaba Edge!" }

### 2\. Middleware ile Edge Kullanımı

Next.js middleware yapısı **varsayılan olarak edge üzerinde çalışır.**  
Örneğin kullanıcıyı oturum durumuna göre yönlendirmek için:

// middleware.ts  
import { NextResponse } from 'next/server';  
  
export function middleware(req: Request) {  
  const isLoggedIn = Boolean(req.headers.get('x-user-auth'));  
  if (!isLoggedIn) {  
    return NextResponse.redirect(new URL('/login', req.url));  
  }  
  return NextResponse.next();  
}

Bu middleware, kullanıcıya en yakın edge node’da çalışır, bu sayede yönlendirmeler çok daha hızlıdır.

### 3\. Dikkat Edilmesi Gerekenler

*   Node.js özel modülleri (ör. `fs`, `net`) desteklenmez.
*   Edge fonksiyonlar kısa süreli, stateless olmalıdır. Bu gerçekten önemli.
*   Daha uzun işlemler için normal serverless fonksiyon veya API route kullanılabilir.


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-5.jpg)

## Kullanım Senaryoları

### 1\. Kişiselleştirme (Geo → para birimi / dil)

Burada amaç kullanıcının ülkesi veya şehri bazında anında içerik/pref seçimi. Peki Nasıl? Edge’te request header’larından ülkeyi al, yanıtı kişiselleştir.


_Örnek (app/api/prefs/route.ts):_

export const runtime = 'edge';  
  
export async function GET(req: Request) {  
  const country = req.headers.get('x-vercel-ip-country') || 'US';  
  const currency = country === 'TR' ? '₺' : '$';  
  return new Response(JSON.stringify({ currency }), {  
    headers: { 'Content-Type': 'application/json' }  
  });  
}

Bu kod ile Türkiye’den gelen kullanıcı **₺** görürken, ABD’den gelen kullanıcı **$** görecektir.

### 2\. A/B Test (Varyant Dağıtımı)

Amacımız yeni bir özelliği kullanıcıların belirli bir yüzdesine göstermek. Mesela bir şeyi test etmek istiyor ya da bölge bazlı özellik geliştirmek istiyor olabilirsiniz.

import { NextResponse } from 'next/server';  
  
export const config = { matcher: \['/'\] };  
  
export function middleware(req: Request) {  
  const cookie = req.headers.get('cookie') || '';  
  const variant = /variant=(A|B)/.exec(cookie)?.\[1\] || (Math.random() < 0.5 ? 'A' : 'B');  
  
  const res = NextResponse.next();  
  res.headers.append('Set-Cookie', \`variant=${variant}; Path=/; Max-Age=2592000; SameSite=Lax\`);  
  return res;  
}

Bu örnek kullanıcıya A veya B varyantını atar ve tüm isteklerde tutarlı kalmasını sağlar.

### 3\. Feature Flags (Kademeli Açılış)

Burada ise amacımız yeni özellikleri %10 / %50 gibi kademelerle yayına almak. Yukarıdaki ile benzer sebeplerden bunu yapmak istiyor olabilirsiniz.

export const runtime = 'edge';  
  
export async function GET() {  
  const enabled = Math.random() < 0.2; // %20 açık  
  return new Response(JSON.stringify({ newFeature: enabled }), {  
    headers: { 'Content-Type': 'application/json' }  
  });  
}

Gerçekte kullanıcı kimliğine göre hash alırsan, aynı kullanıcı her zaman aynı sonucu görür.

### 4\. Edge Cache (Hızlı Yanıtlar)

Okuma ağırlıklı API’leri CDN üzerinde önbelleğe almak için bu tarz bir ihtiyacınız olabilir.

export const runtime = 'edge';  
  
export async function GET() {  
  const data = { headlines: \['Edge is fast', 'Next.js 15 released'\] };  
  return new Response(JSON.stringify(data), {  
    headers: {  
      'Content-Type': 'application/json',  
      'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300'  
    }  
  });  
}

Bu sayede kullanıcılar her istekte milisaniyeler içinde yanıt alır.

## Avantajlar ve Sınırlamalar

Edge Functions güçlü ama her senaryoda doğru tercih olmayabilir. Sizin için artılarını ve eksilerini listeledim.


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-6.jpg)

## Sonuç ve Öneriler

Edge Functions, modern web uygulamalarının **hız ve kullanıcı deneyimi** sorunlarına güçlü bir çözüm sunuyor. Kullanıcıya en yakın konumda çalışan bu fonksiyonlar sayesinde:

*   Sayfalar çok daha hızlı yüklenir,
*   Global kitlelere eşit performans sağlanır,
*   Sunucu maliyetleri optimize edilir.
*   Sunucu maliyetleri optimize edilir.

Eğer global erişimi olan bir projen varsa, özellikle:

*   **Kişiselleştirilmiş içerik** sunuyorsan,
*   **A/B testleri** yapıyorsan,
*   **Hızlı yönlendirme ve middleware** ihtiyacın varsa,

Edge Functions kullanmayı mutlaka denemelisin.

Buraya kadar okuduğun için teşekkür ederim! 🙌

Bu yazının sana Edge Functions konusunda fikir verdiğini ve yeni şeyler deneme isteğini uyandırdığını umuyorum.

[**Instagram**](https://www.instagram.com/poyraz_avsever/) — [**LinkedIn**](https://www.linkedin.com/in/poyrazavsever) — [**Kişisel Web Sitem**](https://www.poyrazavsever.com)

Bir sonraki yazıda görüşmek üzere, **sağlıcakla!**


![](/blog/images/next-js-ile-edge-functions-h-zl-web-uygulamalar-nas-l-geli-tirilir-img-7.jpg)

> _Görseller_ **_Gemini_** _ile oluşturulmuştur._