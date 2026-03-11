---
title: "Frontend Testing Araçları: Jest ve Cypress ile Başlamak"
category: "Testing"
date: "2026-02-22"
readTime: "9 min read"
author: "Poyraz Avsever"
excerpt: "Bu yazida temel kavramlari, pratik ornekleri ve uygulayabileceginiz ipuclarini sade bir dille bulabilirsiniz."
coverImage: "https://miro.medium.com/v2/resize:fit:1400/format:webp/0*uNpkjRqVlaB2WbDl.png"
---

Frontend tarafında kaliteyi korumanın en sağlam yolu testtir. Bu yazıda, farklı amaçlara hizmet eden iki güçlü aracı birlikte ele alıyoruz: Jest ve Cypress.



## Jest Nedir?

Jest, özellikle unit ve integration testlerde sık kullanılan hızlı bir JavaScript test framework'üdür. React projelerinde de çok yaygın kullanılır.

### Kurulum

```bash
npm install --save-dev jest
```

### Basit Test Örneği

```js
function toplama(a, b) {
  return a + b;
}

test("2 + 3 eşittir 5", () => {
  expect(toplama(2, 3)).toBe(5);
});
```

### Grup Testleri

```js
describe("Toplama Fonksiyonu", () => {
  it("2 + 3 eşittir 5", () => {
    expect(toplama(2, 3)).toBe(5);
  });

  it("0 + 0 eşittir 0", () => {
    expect(toplama(0, 0)).toBe(0);
  });
});
```

### Mocking Örneği

```js
jest.mock("axios");

it("API çağrısı başarılı olursa veriyi döndürmeli", async () => {
  const veriler = { data: { isim: "Ali" } };
  axios.get.mockResolvedValue(veriler);

  const cevap = await apiCagir();
  expect(cevap.isim).toBe("Ali");
});
```

### Snapshot Örneği

```js
import { render } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("MyComponent snapshot testi", () => {
  const { asFragment } = render(<MyComponent />);
  expect(asFragment()).toMatchSnapshot();
});
```

## Cypress Nedir?

Cypress, gerçek tarayıcıda çalışan ve kullanıcı akışlarını uçtan uca test etmeye odaklanan bir E2E test aracıdır.

![Frontend Testing Araçları: Jest ve Cypress ile Başlamak](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*ZRru4rVRykQczdO9.png)

### Kurulum

```bash
npm install cypress --save-dev
```

### Basit E2E Senaryosu

```js
describe("Form Testi", () => {
  it("Formu doldurmalı ve göndermeli", () => {
    cy.visit("https://ornekwebsayfasi.com");
    cy.get('input[name="isim"]').type("Ali");
    cy.get('input[name="email"]').type("ali@example.com");
    cy.get('button[type="submit"]').click();
    cy.get(".success-message").should("contain", "Başarıyla gönderildi!");
  });
});
```

## Jest ve Cypress Farkı

### Jest Ne Zaman?

- Fonksiyon ve component düzeyi testler
- Mocking/snapshot ihtiyaçları
- Hızlı geri bildirim

### Cypress Ne Zaman?

- Kullanıcı akışı testleri
- Form, yönlendirme, auth gibi senaryolar
- Gerçek tarayıcı davranışı doğrulama

## Sonuç

Jest ve Cypress birbirinin alternatifi değil, tamamlayıcısıdır. Jest ile iç mantığı, Cypress ile gerçek kullanıcı deneyimini doğrulayarak daha güvenilir bir frontend geliştirme süreci kurulabilir.
