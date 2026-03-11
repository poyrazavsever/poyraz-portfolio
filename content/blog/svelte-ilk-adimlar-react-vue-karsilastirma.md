---
title: "Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı?"
category: "Frontend"
date: "2026-02-14"
readTime: "11 min read"
author: "Poyraz Avsever"
excerpt: "Frontend dünyasında React, Vue ve Angular gibi güçlü seçenekler var. Son yıllarda bu listeye güçlü bir alternatif..."
coverImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*Dx04pr9plejiCcWI.png"
---

Frontend dünyasında React, Vue ve Angular gibi güçlü seçenekler var. Son yıllarda bu listeye güçlü bir alternatif olarak Svelte de eklendi. Peki Svelte'i farklı yapan ne ve neden çoğu senaryoda daha hızlı hissediliyor?

## Svelte Nedir?

Svelte, geleneksel anlamda sadece bir runtime framework değil; derleme (compile-time) odaklı bir yaklaşıma sahip. Uygulama çalışmadan önce bileşenleri optimize edip tarayıcıya daha sade JavaScript gönderir.

## Svelte'i Hızlı Yapan Unsurlar

- **Compile-time optimizasyon**: İşin büyük kısmı build aşamasında çözülür.
- **Virtual DOM yok**: Ara katman maliyetini azaltır.
- **Daha küçük bundle**: Runtime yükü azalır.
- **Doğal reaktivite**: Basit state güncellemeleri için ek soyutlamalara daha az ihtiyaç duyulur.

## React ve Svelte Karşılaştırması

### 1. State Yönetimi

React örneği:

```jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

Svelte örneği:

```svelte
<script>
  let count = 0;
</script>

<div>
  <p>Count: {count}</p>
  <button on:click={() => (count += 1)}>Increase</button>
</div>
```

### 2. Props Kullanımı

React:

```jsx
function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}
```

Svelte:

```svelte
<script>
  export let name;
</script>

<p>Hello, {name}!</p>
```

### 3. Form Yönetimi

React:

```jsx
import React, { useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Input: {inputValue}</p>
    </div>
  );
}
```

Svelte:

```svelte
<script>
  let inputValue = "";
</script>

<div>
  <input type="text" bind:value={inputValue} />
  <p>Input: {inputValue}</p>
</div>
```

## Lifecycle Metotları

Svelte tarafında en sık kullanılan lifecycle fonksiyonları:

- `onMount`
- `beforeUpdate`
- `afterUpdate`
- `onDestroy`

`onMount` örneği:

```svelte
<script>
  import { onMount } from "svelte";

  let data;

  onMount(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    data = await res.json();
  });
</script>

{#if data}
  <p>{data.title}</p>
{/if}
```

## Reaktivite

Svelte'in en güçlü taraflarından biri, reaktif ifadeleri dil seviyesinde desteklemesi:

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;
</script>

<p>Count: {count}</p>
<p>Doubled: {doubled}</p>
<button on:click={() => count++}>Increase</button>
```

## Store Kullanımı

Bileşenler arası state paylaşımı için `store` yapısı çok kullanışlıdır.

`store.js`:

```js
import { writable } from "svelte/store";

export const count = writable(0);
```

`App.svelte`:

```svelte
<script>
  import { count } from "./store";
</script>

<p>Count: {$count}</p>
<button on:click={() => count.update((n) => n + 1)}>Increase</button>
```

![Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı?](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*6oapfP2KKU3JTo8H.png)

## SvelteKit Neden Önemli?

SvelteKit, Svelte üzerine kurulu modern bir framework'tür. Özellikle şu konularda güçlüdür:

- SSR (Server-Side Rendering)
- Statik site üretimi
- Dosya tabanlı routing
- API endpoint tanımları

Bu yapı, Svelte'i küçük projelerden ürün seviyesine taşımayı kolaylaştırır.

## Sonuç

Svelte, performans ve sadelik odaklı bir geliştirme deneyimi sunuyor. Küçük ve orta ölçekli projelerde çok hızlı sonuç verir; büyük projelerde ise SvelteKit ile birlikte oldukça güçlü bir seçenek haline gelir.

## Kaynaklar

- [Svelte Documentation](https://svelte.dev/docs)
- [Svelte Tutorial](https://svelte.dev/tutorial)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [LogRocket - Svelte vs React](https://blog.logrocket.com/svelte-vs-react/)

![Svelte ile İlk Adımlar: React ve Vue’ya Karşı Hızlı mı?](https://miro.medium.com/v2/resize:fit:1258/format:webp/0*GLNSJNWQcg9K79Xe.png)
