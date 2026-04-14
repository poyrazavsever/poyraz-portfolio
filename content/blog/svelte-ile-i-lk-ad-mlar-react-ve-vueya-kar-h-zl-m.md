---
title: "Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı?"
category: "General"
date: "2024-09-14"
readTime: "8 min read"
author: "Poyraz Avsever"
slug: "svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m"
excerpt: "Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı? Öncellikle herkese merhaba. Bildiğiniz gibi frontend dünyasında çeşitli frameworkler ve kütüphanelerle tanışmak her …"
coverImage: "/blog/images/svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/svelte-ile-i%CC%87lk-ad%C4%B1mlar-react-ve-vueya-kar%C5%9F%C4%B1-h%C4%B1zl%C4%B1-m%C4%B1-c5ae640145c9"
---

# Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı?


Öncellikle herkese merhaba. Bildiğiniz gibi frontend dünyasında çeşitli frameworkler ve kütüphanelerle tanışmak her geliştiricinin geçtiği bir süreçtir. React, Vue ve Angular gibi devlerin arasına yeni bir oyuncu olarak giren Svelte, son dönemde popülerliğini artırdı. Peki, Svelte’i diğerlerinden ayıran temel farklar neler ve neden daha hızlı? Bu yazımda, Svelte’in yapısını, performans avantajlarını ve React ile Vue’ya karşı neden daha hızlı olduğunu inceleyelim.


![](/blog/images/svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m-img-2.jpg)

## Svelte Nedir ve Nasıl Çalışır?

Svelte, 2016 yılında Rich Harris tarafından geliştirilmiş, modern web uygulamaları oluşturmak için kullanılan bir framework’tür. Ancak Svelte’i diğer frameworklerden ayıran temel fark, bir _framework_ değil, bir **_compiler_ (derleyici**) olmasıdır. Bu, Svelte’in çalışma zamanı kütüphanesi olmadan doğrudan tarayıcıda çalıştığı anlamına gelir.

React ve Vue, tarayıcıda bir sanal DOM (Virtual DOM) kullanarak bileşenleri yönetir. Herhangi bir değişiklik olduğunda, sanal DOM ile gerçek DOM karşılaştırılır ve güncellenir. Bu işlem, her ne kadar optimize edilse de, tarayıcı üzerinde ekstra bir yük oluşturur. Svelte ise sanal DOM kullanmaz. Bunun yerine, bileşenlerin oluşturulma anında, doğrudan etkin ve optimize edilmiş JavaScript kodu üretir. Bu da onlara göre minimal bşr hız dahi olsa avantaj kazandırır.

## Svelte’i Neden Daha Hızlı Yapan Unsurlar?

1.  **Compile-time Optimizasyonlar**  
    Svelte’in en büyük avantajlarından biri, değişikliklerin compile-time’da optimize edilmesidir. Diğer frameworkler, tarayıcıda çalışma zamanı sırasında gerekli işlemleri yaparken, Svelte bu işlemleri geliştirme aşamasında yapar ve tarayıcıya doğrudan optimize edilmiş, minimal kod sunar.
2.  **Sanal DOM Yok**  
    Svelte, sanal DOM kullanmadığı için performans kaybı yaşamaz. React ve Vue, değişiklikleri sanal DOM’da işleyip ardından gerçek DOM’a yansıtırken, Svelte bu adımı atlar ve direkt olarak gerçek DOM üzerinde çalışır. Bu da uygulamanın daha hızlı tepki vermesini sağlar.
3.  **Daha Küçük Bundle Boyutları**  
    Svelte, framework kütüphanesini projeye dahil etmez. Bunun yerine, sadece bileşenlerde kullanılan kod derlenir ve çıktı dosyası oluşturulur. Bu sayede final bundle boyutu küçülür ve sayfa yükleme süreleri hızlanır.
4.  **Reaktif Yapı**  
    Svelte, reaktiviteyi bir dil özelliği gibi ele alır. Bir değişkenin değerini güncellediğinizde, Svelte otomatik olarak bu değişkenin kullanıldığı bileşenleri yeniden render eder. Bu, React ve Vue’da kullanılan state management yapılarından daha hafif ve hızlıdır.

## Svelte mi, React/Vue mu?

Tabii ki de her framework’ün kendine has avantajları ve kullanım alanları vardır. React ve Vue, geniş topluluk desteği, zengin ekosistem ve olgunlaşmış bir yapıya sahiptir. Ancak performans, küçük boyutlu projeler ve basitlik öncelikli olduğunda, Svelte dikkat çeken bir seçenek haline gelir.

Svelte, özellikle performansın kritik olduğu projelerde (örneğin düşük performanslı cihazlarda çalışacak uygulamalarda) önemli bir fark yaratabilir. Ayrıca, minimal yapısı sayesinde öğrenmesi de oldukça kolaydır. Bu yüzden yeni başlayanlar için de ideal bir tercih olabilir. Gelin örnek olarak react ve svelte yazımında ki farklara da göz atalım.

![](/blog/images/svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m-img-3.jpg)

## React vs Svelte: Bileşen Oluşturma ve State Yönetimi

### React’ta Bir Bileşen ve State Yönetimi

React’ta bir bileşen oluşturmak ve state yönetmek için genellikle `useState` hook'u kullanılır. İşte basit bir sayaç bileşeni örneği:

// React'ta sayaç bileşeni  
```tsx
import React, { useState } from 'react';  
function Counter() {  
 const \[count, setCount\] = useState(0);  
return (  
 <div>  
 <p>Count: {count}</p>  
 <button onClick={() => setCount(count + 1)}>  
```
 Increase  
```html
 </button>  
 </div>  
```
 );  
}  
```ts
export default Counter;
```

Burada React’in `useState` hook'u ile state yönetimi sağlanır. `onClick` olayında state güncellenir ve bileşen yeniden render edilir. Peki bunu svelte ile nasıl yapıyoruz?

### Svelte’te Aynı Bileşen

Svelte’de aynı işlevselliği elde etmek çok daha basit ve doğrudan olur. State yönetimi doğrudan JavaScript değişkenleri üzerinden yapılır ve Svelte reaktif yapısı sayesinde değişiklikler otomatik olarak bileşenleri yeniden render eder:

```html
<!-- Svelte'te sayaç bileşeni -->  
<script\>  let count = 0;</script\>  
  
<div\>  
  <p\>Count: {count}</p\>  
  <button on:click\={() => count += 1}>  
    Increase  
  </button\>  
</div\>
```

Bu daha büyük projelerde dez avantaj yaratabilir fakat küçük çaplı projelerde sürecin hızlanmasına olanak tanır.

## React vs Svelte: Props Kullanımı

### React’ta Props Kullanımı

React’ta bir bileşene `props` geçirerek veri aktarımı şu şekilde yapılır:

// React'ta parent bileşen  
```tsx
import React from 'react';  
import Greeting from './Greeting';  
  
function App() {  
  return <Greeting name="Svelte" />;  
}  
  
export default App;
```

// React'ta child bileşen  
```tsx
function Greeting({ name }) {  
  return <p>Hello, {name}!</p>;  
}  
  
export default Greeting;
```

Burada `Greeting` bileşenine `props` olarak `name` değerini geçiyoruz ve bu props'u child bileşende kullanıyoruz.

### Svelte’te Props Kullanımı

Svelte’de props kullanımı ise daha basit ve doğrudandır:

```html
<!-- Svelte'te parent bileşen -->  
<script\>  import Greeting from './Greeting.svelte';</script\>  
  
<Greeting name\="Svelte" />

<!-- Svelte'te child bileşen -->  
<script\>  export let name;</script\>  
  
<p\>Hello, {name}!</p\>
```

Svelte’de bir değişkeni `export` ederek dışarıdan bileşene veri aktarılabilir. Bu, React'taki `props` yapısına karşılık gelir ve çok daha sade bir kullanım sunar. Aslında yine aynı yere varıyoruz. Daha komplike projelerde tercih edilmeyebilir.

## React vs Svelte: Form ve Event Yönetimi

### React’ta Form ve Event Yönetimi

React’ta formlarda state yönetimi ve event handling biraz daha karmaşık olabilir:

```tsx
import React, { useState } from 'react';  
  
function Form() {  
  const \[inputValue, setInputValue\] = useState('');  
  
  const handleChange = (e) => {  
    setInputValue(e.target.value);  
  };  
  
  return (  
    <div>  
      <input type="text" value={inputValue} onChange={handleChange} />  
      <p>Input: {inputValue}</p>  
    </div>  
  );  
}  
  
export default Form;
```

Her input değişikliğinde state güncellenir ve render tetiklenir.

### Svelte’te Form ve Event Yönetimi

Svelte’de form kontrolü ve event yönetimi ise çok daha basit:

```html
<script\>  let inputValue = '';</script\>  
  
<div\>  
  <input type\="text" bind:value\={inputValue} />  
  <p\>Input: {inputValue}</p\>  
</div\>
```

Svelte’de `bind` ifadesi ile bir input elemanını doğrudan bir değişkene bağlayabilirsiniz. Bu, iki yönlü veri bağlamayı (two-way binding) çok basit hale getirir. Gelin burada ki ana mantığı anladığımıza göre biraz daha Svelte’e odaklanalım ve Svelte’in özelliklerini daha derinlemesine inceleyelim.

## Svelte’de Lifecycle Metotları

Svelte’de lifecycle metotları, bileşenlerin yaşam döngüsü içinde belirli anlarda çalıştırmak istediğimiz kodları tanımlamamıza olanak tanır. Svelte, bu amaçla birkaç temel fonksiyon sunar:

*   `onMount`: Bileşen DOM'a yerleştirildiğinde çalışır.
*   `beforeUpdate`: DOM güncellenmeden hemen önce çalışır.
*   `afterUpdate`: DOM güncellendikten hemen sonra çalışır.
*   `onDestroy`: Bileşen DOM'dan kaldırıldığında çalışır.

### onMount Örneği:

Svelte’de bir bileşenin DOM’a eklenmesiyle birlikte yapılacak işlemleri `onMount` fonksiyonu ile tanımlayabilirsiniz:

```html
<script\>  import { onMount } from 'svelte';  
```
  
```ts
  let data;  
  
  onMount(async () => {  
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');  
```
    data = await res.json();  
  });</script\>  
  
```html
<div\>  
  {#if data}  
    <p\>{data.title}</p\>  
  {/if}  
</div\>
```

Bu örnekte `onMount`, bileşen DOM’a yerleştiği anda bir API çağrısı yapar ve sonuçları ekranda görüntüler.

## Svelte’de Reaktivite

Svelte’in en güçlü özelliklerinden biri reaktiviteyi doğal olarak ele almasıdır. Bir değişkenin değerinde bir değişiklik olduğunda, Svelte bu değişikliği otomatik olarak takip eder ve ilgili bileşeni yeniden render eder.


Svelte’de reaktiviteyi tetiklemek için sadece bir değişkenin değerini güncellemek yeterlidir. Reaktif ifadeler `let` anahtar kelimesiyle tanımlanır ve herhangi bir ek kod yazılmasına gerek kalmaz.

**Reaktif İfadeler:**

```html
<script\>  let count = 0;  
  let doubled;  
```
  
  // $: ifadesi, reaktif bir bloğu işaretler  
  $: doubled = count \* 2;</script\>  
  
```html
<p\>Count: {count}</p\>  
<p\>Doubled: {doubled}</p\>  
<button on:click\={() => count++}>Increase</button\>
```

Bu örnekte, `count` değişkeni her arttığında `doubled` reaktif olarak güncellenir ve bu değişiklik ekrana yansır.


![](/blog/images/svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m-img-4.jpg)

## Svelte’de Store Kullanımı

Svelte, küçük projeler için bileşenler arası veri paylaşımı amacıyla oldukça basit bir state yönetim sistemi sunar. Bunun için **store** adı verilen bir yapı kullanılır. Svelte, 3 tür store sağlar: **writable**, **readable** ve **derived** store’lar.

### Writable Store Örneği:

Writable store, bileşenler arasında güncellenebilir bir veri paylaşımı sağlar. Aşağıda bir sayaç uygulaması için writable store kullanımını görebilirsiniz:

```html
<!-- store.js -->  
```
```ts
import { writable } from 'svelte/store';  
  
export const count = writable(0);
```

```html
<!-- App.svelte -->  
<script\>  import { count } from './store';</script\>  
  
<p\>Count: {$count}</p\>  
<button on:click\={() => count.update(n => n + 1)}>Increase</button\>
```

Store değerine erişmek için `$` işaretini kullanarak reaktif bir bağlama yapabilirsiniz. Ayrıca, `count.update()` ile store değerini güncelleyebilirsiniz. Gördüğünüz gibi oldukça basit.

## SvelteKit: Modern Web Uygulamaları İçin Güçlü Bir Araç

Svelte’in yanı sıra, **SvelteKit** de güçlü bir araç olarak ön plana çıkıyor. SvelteKit, Svelte’in üzerine inşa edilmiş bir framework’tür ve özellikle modern web uygulamaları geliştirmek için tasarlanmıştır. SSR (Sunucu Tarafı Rendering), statik site oluşturma, rotalama (routing) ve çok daha fazlasını kolayca entegre edebilmenizi sağlar.

### SvelteKit’in Temel Özellikleri:

*   **Sunucu Tarafı Rendering (SSR)**: SvelteKit, uygulamanın sunucu tarafında render edilmesine olanak tanır, bu da SEO dostu sayfalar ve hızlı ilk render süreleri anlamına gelir.
*   **Statik Site Üretimi**: Dinamik verileri çekip statik HTML dosyaları oluşturmak için kullanılabilir. Bu, SvelteKit’i hem dinamik hem de statik siteler için mükemmel bir seçim haline getirir.
*   **API Route’ları**: SvelteKit ile kendi API’larınızı oluşturabilirsiniz. Bu, tam anlamıyla bir full-stack uygulama geliştirmeyi mümkün kılar.

Svelte’in sunduğu sadelik, reaktivite ve performans avantajları ile özellikle küçük ve orta ölçekli projeler için harika bir çözüm sunar. Sonraki adım olarak **SvelteKit** kullanarak, daha geniş kapsamlı projelere yönelik işlevsellikler ekleyebilirsiniz.

## Sonuç

Svelte, modern web geliştirme dünyasında performans ve sadelik arayanlar için mükemmel bir çözüm sunuyor. React ve Vue gibi popüler framework’lere kıyasla daha basit bir yapıya sahiptir Svelte.

Svelte’in en büyük avantajlarından biri, öğrenmesi kolay ve reaktif yapısının doğal olarak sade olmasıdır. Bir değişkenin değerini güncellemek bile bileşenleri yeniden render etmek için yeterli olurken, lifecycle metodları ve store yönetimi de basit ve sezgiseldir. Ayrıca, animasyonlar ve geçiş efektleri gibi işlevler için de dahili destek sunarak, harici kütüphanelere olan ihtiyacı ortadan kaldırır.

Özellikle küçük ve performansın kritik olduğu projelerde, düşük bellek tüketimi ve hızlı çalışma süreleri sayesinde Svelte, dikkat çeken bir seçenek haline gelir. Ancak daha büyük projeler ve geniş ekosistem desteği gereken durumlarda React ve Vue gibi framework’ler hâlâ güçlü birer alternatif olabilir.

Svelte, hem yeni başlayanlar hem de deneyimli geliştiriciler için güçlü bir araç sunarken, performans ve basitlikten ödün vermeyen bir çözüm arayanların radarında olmayı hak ediyor. Gelin şimdi “Svelte’i nasıl daha derinlemesine öğrenebiliriz bir bakalım.”

## Kaynaklar

Svelte’i öğrenmek için birçok ücretsiz ve kaliteli kaynak bulunuyor. Aşağıda benim de kaynak olarak aldığım hem videolar hem de yazılar ile Svelte’i derinlemesine öğrenebilirsiniz.

### YouTube Videoları

1.  **Svelte Crash Course (Traversy Media)**

*   [Svelte Crash Course](https://www.youtube.com/watch?v=zojEMeQGGHs)
*   Bu video, Svelte’in temellerini anlamak ve basit bir proje oluşturmak için mükemmel bir başlangıç noktası. React ve Vue gibi popüler framework’lere aşina olanlar için Svelte’in farklılıkları net bir şekilde açıklanıyor.

**2\. Learn Svelte in 5 Minutes (Web Dev Simplified)**

*   [Learn Svelte in 5 Minutes](https://www.youtube.com/watch?v=uK2RnIzrQ0M)
*   Svelte’in temel yapısını hızlıca öğrenmek isteyenler için kısa ve etkili bir video.

**3\. SvelteKit Crash Course (Net Ninja)**

*   [SvelteKit Crash Course](https://www.youtube.com/watch?v=UU7MgYIbtAk)
*   Svelte’in modern web uygulamaları için geliştirilmiş framework’ü olan SvelteKit’i detaylıca incelemek ve ilk projeni geliştirmek için bu video rehber olacaktır.

### Yazılı Kaynaklar ve Makaleler

1.  **Svelte Resmi Dokümantasyon**

*   Svelte Documentation
*   Svelte’in dökümanyasyonu, framework’ün her yönünü detaylıca açıklayan, başlangıç seviyesinden ileri seviyeye kadar her geliştiriciye hitap eden kapsamlı bir kaynak. Dökümanyasyon okumayı seviyorsanız başka bir kaynağa ihtiyacınız kalacağını düşünmüyorum.

**2\. Svelte for Beginners: A Hands-On Guide (Smashing Magazine)**

*   Svelte for Beginners
*   Smashing Magazine’in hazırladığı bu rehber, Svelte ile çalışmaya başlamak isteyenler için adım adım bir yol haritası sunuyor. Kesinlikle göz atmalısınız.

**3\. Understanding Svelte Reactivity (Dev.to)**

*   Understanding Svelte Reactivity
*   Svelte’in reaktif yapısını derinlemesine anlamak isteyenler için harika bir makale. Reaktiviteyi diğer framework’lerle karşılaştırarak Svelte’in farkını anlatıyor.

**4\. Svelte vs React: What’s The Difference? (LogRocket Blog)**

*   Svelte vs React
*   Svelte ve React arasındaki farkları daha ayrıntılı bir şekilde incelemek için bu makale, framework’lerin avantajlarını ve kullanım alanlarını karşılaştırıyor. Ben de bu yazıda ki karşılaştırmalarımda kaynak olarak burayı kullandım.

### Online Kurslar

1.  **Svelte.js — The Complete Guide (Udemy)**

*   Svelte.js — The Complete Guide
*   Udemy’de yer alan bu kapsamlı kurs, Svelte’in temellerini ve ileri düzey özelliklerini öğrenmek isteyen geliştiriciler için ideal.

**2\. Learn Svelte and Sapper from Scratch (Frontend Masters)**

*   Learn Svelte from Scratch
*   Frontend Masters tarafından sunulan bu kurs, Svelte ve onun eski framework’ü olan Sapper üzerinde yoğunlaşarak modern uygulama geliştirmeye odaklanıyor. Bakmanızı tavsiye ederim.

![](/blog/images/svelte-ile-i-lk-ad-mlar-react-ve-vueya-kar-h-zl-m-img-5.jpg)