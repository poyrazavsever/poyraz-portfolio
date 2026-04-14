---
title: "CSS Frameworkleri Tanıyoruz | 4. Bölüm: Chakra UI"
category: "General"
date: "2025-05-04"
readTime: "3 min read"
author: "Poyraz Avsever"
slug: "css-frameworkleri-tan-yoruz-4-b-l-m-chakra-ui"
excerpt: "CSS Frameworkleri Tanıyoruz | 4. Bölüm: Chakra UI Modern React uygulamaları için sade, güçlü ve erişilebilir bir çözüm mü arıyorsunuz? O zaman Chakra UI sizin için biçilmiş kaftan …"
coverImage: "/blog/images/css-frameworkleri-tan-yoruz-4-b-l-m-chakra-ui-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/css-frameworkleri-tan%C4%B1yoruz-4-b%C3%B6l%C3%BCm-chakra-ui-529192099789"
---

# CSS Frameworkleri Tanıyoruz | 4. Bölüm: Chakra UI


**Modern React uygulamaları için sade, güçlü ve erişilebilir bir çözüm mü arıyorsunuz?** O zaman Chakra UI sizin için biçilmiş kaftan olabilir.


Biliyorsunuz bu seride css frameworkleri ile tanışıyoruz. Bu bölümde, özellikle React geliştiricilerinin sıklıkla tercih ettiği, bileşen tabanlı ve esnek yapısıyla dikkat çeken **Chakra UI**’yi tanıyoruz. Dilerseniz başlayalım.

![](/blog/images/css-frameworkleri-tan-yoruz-4-b-l-m-chakra-ui-img-2.jpg)

## 1\. Chakra UI Nedir?

**Chakra UI**, React uygulamaları için modern, erişilebilir ve yeniden kullanılabilir bileşenler sağlayan bir **component-based UI library**’dir. Özellikle geliştiricilere yani size hızlı ve tutarlı tasarımlar yapabilmeleri için basitlik ve tema desteği sunar.

### Öne çıkan özellikleri:

*   **React tabanlı** modern bileşenler
*   **Tema desteği** ve kolay özelleştirme
*   **Erişilebilirlik (Accessibility)** ön planda
*   **Styled System** tabanlı stil verme yaklaşımı
*   Koyu/açık mod desteği varsayılan olarak gelir

## 2\. Kurulum ve Başlangıç

Chakra UI, yalnızca **React** projeleriyle çalışır. Bu nedenle, öncelikle bir React projesine ihtiyacınız olacak. Eğer bir projen yoksa `Vite` ya da `Create React App` kullanarak hızlıca başlayabilirsin.

### 2.1. React projesi oluştur (Vite ile öneriyorum)

```bash
npm create vite@latest my\-chakra-app -- --template react  
```
cd my\-chakra-app  
```bash
npm install
```

veya

```bash
npx create-react-app my\-chakra-app  
```
cd my\-chakra-app

### 2.2. Chakra UI’yi yükle

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Burada yüklediğimiz framer-motion doc ‘da zorunlu koşulmuyor fakat tavsiye ediyorum.

### 3.3. Uygulamayı ChakraProvider ile sarmala

`main.jsx` (veya `index.js`) dosyanı şu şekilde güncelle:

```ts
import React from 'react'  
import ReactDOM from 'react-dom/client'  
import { ChakraProvider } from '@chakra-ui/react'  
import App from './App'  
```
  
ReactDOM.createRoot(document.getElementById('root')).render(  
```html
  <React.StrictMode\>  
    <ChakraProvider\>  
      <App />  
    </ChakraProvider\>  
  </React.StrictMode\>  
```
)

### Artık hazırsın!

Chakra UI bileşenlerini kullanmaya başlayabilirsin. Örnek:

```tsx
import { Button } from '@chakra-ui/react'  
  
function MyButton() {  
  return <Button colorScheme\="teal"\>Merhaba Chakra!</Button\>  
}
```

Bunun çalışıp çalışmadığını kontrol et. Eğer çalışıyorsa sağlıklı bir şekilde yüklemişsindir.

## 3\. Mini Proje: Basit Bir Profil Kartı

Bu küçük projede, Chakra UI bileşenleriyle şık ve responsive bir **profil kartı** tasarlayacağız. Projede kullanacağımız bileşenler:

*   `Box`, `Image`, `Text`, `Stack`, `Button`, `Flex`, `Avatar`
*   Chakra UI’nin **temaya dayalı renk sistemi** ve **spacing sistemini** kullanacağız.

```ts
import {  
```
  Box,  
  Flex,  
  Avatar,  
  Text,  
  Stack,  
  Button,  
  useColorModeValue,  
} from "@chakra-ui/react";  
  
```tsx
function ProfileCard() {  
  return (  
    <Flex align\="center" justify\="center" minH\="100vh" bg\={useColorModeValue("gray.100", "gray.900")}>  
      <Box  
```
        maxW\="sm"  
        w\="full"  
        bg\={useColorModeValue("white", "gray.800")}  
        boxShadow\="lg"  
        rounded\="lg"  
        p\={6}  
        textAlign\="center"  
      >  
```html
        <Avatar size\="xl" src\="https://i.pravatar.cc/300" mb\={4} />  
        <Text fontSize\="2xl" fontWeight\="bold"\>  
          Ayşe Yılmaz  
        </Text\>  
        <Text fontSize\="sm" color\="gray.500" mb\={4}\>  
          Frontend Developer | İstanbul  
        </Text\>  
        <Stack direction\="row" spacing\={4} justify\="center"\>  
          <Button colorScheme\="teal" variant\="solid"\>  
            Takip Et  
          </Button\>  
          <Button colorScheme\="teal" variant\="outline"\>  
            Mesaj Gönder  
          </Button\>  
        </Stack\>  
      </Box\>  
    </Flex\>  
  );  
```
}  
  
```ts
export default ProfileCard;
```

### 1\. `Flex`

```html
<Flex align\="center" justify\="center" minH\="100vh" bg\={...}\>
```

Sayfanın tamamında kartı **ortalamak** için kullanılıyoruz.

*   `align="center"` → Dikey hizalama için
*   `justify="center"` → Yatay hizalama için
*   `minH="100vh"` → Sayfanın tamamını kapsaması için yükseklik
*   `bg={...}` → Arka plan rengini açık/koyu moda göre ayarlıyoruz (`useColorModeValue` ile)

### 2\. `Box`

```html
<Box  
  maxW\="sm"  
  w\="full"  
  bg\={...}  
  boxShadow\="lg"  
  rounded\="lg"  
  p\={6}  
  textAlign\="center"  
\>
```

Tüm profil kartının çerçevesini oluşturuyor bu eleman. Atr ‘ları ise:

*   `maxW="sm"` → Genişliği sınırlar (small boyut)
*   `w="full"` → Mobilde tam genişlik
*   `boxShadow="lg"` → Gölgelendirme efekti
*   `rounded="lg"` → Köşeleri yumuşatır
*   `p={6}` → İç boşluk (padding)
*   `textAlign="center"` → Kart içindeki tüm yazıları ortalıyor.

### 3\. `Avatar`

```html
<Avatar size\="xl" src\="https://i.pravatar.cc/300" mb\={4} />
```

Adından da anlaşılacağı üzere kullanıcının fotoğrafını gösteriyor.

*   `size="xl"` → Büyük boy avatar
*   `src="..."` → Avatar resmi (örnek olarak rastgele bir avatar servisi)
*   `mb={4}` → Alt boşluk (margin bottom)

### 4\. `Stack` + `Button`

```html
<Stack direction\="row" spacing\={4} justify\="center"\>  
  <Button colorScheme\="teal" variant\="solid"\>  
    Takip Et  
  </Button\>  
  <Button colorScheme\="teal" variant\="outline"\>  
    Mesaj Gönder  
  </Button\>  
</Stack\>
```

`Stack`: Chakra’nın **dikey veya yatay sıralama** komponentidir.

*   `direction="row"` → Butonları yatay sıralar
*   `spacing={4}` → Aralarındaki boşluk
*   `Button`: Chakra’nın hazır buton bileşeni
*   `colorScheme="teal"` → Temadaki teal rengini kullanır
*   `variant="solid"` vs. `variant="outline"` → Dolu ya da çerçeveli buton stilleri

Aslında genel mantık çok basit, dolayısıyla dökümantasyonda biraz zaman geçirdikten sonra projelerinizi hızlıca yapmaya başlayabilirsiniz.

## Chakra UI ‘ı daha detaylı öğrenmek için

### Resmî Dokümantasyon

Chakra UI’nin dökümantasyonu oldukça anlaşılır ve örneklerle doludur, incelemenizi tavsiye ederim.  
🔗 [https://chakra-ui.com/docs](https://chakra-ui.com/docs)

### Öneridiğim Konular

Daha detaya inmek istersen şu konulara göz atmanı öneririm:

*   **Theme Customization**: Renkler, fontlar, spacing’ler nasıl özelleştirilir?
*   **Responsive Design**: Chakra ile mobil uyumluluğu yönetme
*   **Dark Mode**: Chakra’nın dark mode desteği nasıl yapılandırılır?
*   **Component Composition**: Kendi özel bileşenlerini Chakra tabanlı nasıl oluşturursun?
*   **Hooks**: `useDisclosure`, `useMediaQuery`, `useColorMode` gibi özel hook’ların gücü

## Proje Fikirleri

*   Blog kartları
*   Dashboard bileşenleri
*   E-ticaret ürün kartları
*   Karanlık mod destekli portfolyo sayfası

**Unutma:** Chakra UI’nin asıl gücü, tekrar kullanılabilirlik ve sade komponent mimarisinde. Kendi projelerinde Chakra kullanarak hızlı ve sürdürülebilir arayüzler geliştirebilirsin. Buraya kadar okuduğun için teşekkür ederim, serinin bir sonraki yazısında görüşmek üzere.