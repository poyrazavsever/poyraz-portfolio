---
title: "Frontend Testing Araçları: Jest ve Cypress ile Başlamak"
category: "General"
date: "2024-09-20"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "frontend-testing-ara-lar-jest-ve-cypress-ile-ba-lamak"
excerpt: "Frontend Testing Araçları: Jest ve Cypress ile Başlamak Merhaba arkadaşlar! Yazılım geliştirmek, heyecan verici bir yolculuk ama aynı zamanda dikkatli olunması gereken bir süreç değil mi? …"
coverImage: "/blog/images/frontend-testing-ara-lar-jest-ve-cypress-ile-ba-lamak-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/frontend-testing-ara%C3%A7lar%C4%B1-jest-ve-cypress-ile-ba%C5%9Flamak-82ba26656a01"
---

# Frontend Testing Araçları: Jest ve Cypress ile Başlamak


![](/blog/images/frontend-testing-ara-lar-jest-ve-cypress-ile-ba-lamak-img-2.jpg)

**Merhaba arkadaşlar!**

Yazılım geliştirmek, heyecan verici bir yolculuk ama aynı zamanda dikkatli olunması gereken bir süreç değil mi? Kullanıcılar, uygulamalarımızdan her zaman en iyisini bekliyor ve bu beklentileri karşılamak için güvenilir, hatasız bir kod yazmak şart. İşte bu noktada test yazmanın önemi devreye giriyor.

Frontend alanı, kullanıcıların direk etkileşimde bulunduğu bir alan olduğu için, test yazmak daha da kritik hale geliyor. Unit testlerden E2E testlerine kadar pek çok farklı türde test var. Bu yazımda, seninle beraber popüler iki test aracı olan Jest ve Cypress’i keşfedeceğiz. Jest, JavaScript projelerinde sıkça tercih edilen bir test framework’ü, Cypress ise modern web uygulamaları için geliştirilmiş güçlü bir E2E test aracı. Bu araçların sağladığı avantajları ve nasıl kullanılacaklarını birlikte inceleyerek, test yazmaya dair daha fazla bilgi edinmene yardımcı olmayı umuyorum.

![](/blog/images/frontend-testing-ara-lar-jest-ve-cypress-ile-ba-lamak-img-3.jpg)

## Jest Nedir?

Gelin bakalım, jest nedir? Jest, Facebook tarafından geliştirilen ve JavaScript projeleri için oldukça popüler bir test framework’üdür. Hızlı ve kullanıcı dostu olmasıyla bilinir; bu da onu hem yeni başlayanlar hem de deneyimli geliştiriciler için ideal bir seçim yapar. Jest, testleri yazmayı ve çalıştırmayı oldukça kolay hale getirir, böylece kodunu test etmek için saatler harcamana gerek kalmaz.

Peki, Jest’i ne zaman kullanmalısın? Eğer React componentleri üzerinde çalışıyorsan veya basit JavaScript fonksiyonlarını test etmek istiyorsan, Jest kesinlikle işine yarayacak. Özellikle unit test yazarken, Jest’in sağladığı araçlar ile hataları daha kolay tespit edebilir ve kodunu güvence altına alabilirsin.

Kurulum ise oldukça basit. Tek bir komutla Jest’i projene ekleyebilirsin:

npm install \--save-dev jest

Kurulumdan sonra, Jest’i kullanmaya başlamak için birkaç temel ayar yapman yeterli. Şimdi, basit bir test örneğiyle devam edelim.

function toplama(a, b) {  
  return a + b;  
}

Bu fonksiyonu test etmek için Jest ile şöyle bir test yazabilirsin:

test('2 + 3 eşittir 5', () => {  
  expect(toplama(2, 3)).toBe(5);  
});

İşte bu kadar! Testi çalıştırmak için terminalde `npm test` komutunu kullanabilirsin. Eğer her şey yolundaysa, testin geçtiğini göreceksin.

## Jest ile Test Örneği

Jest ile test yazmak, emin ol düşündüğünden çok daha kolay. Test senaryolarını yazarken, `describe` ve `it` blokları kullanarak yapıyı oluşturabilirsin. Bu, testlerinin daha düzenli ve okunabilir olmasını sağlar.

Örneğin, bir `toplama` fonksiyonunu test ederken şöyle bir yapı oluşturabilirsin:

describe('Toplama Fonksiyonu', () => {  
  it('2 + 3 eşittir 5', () => {  
    expect(toplama(2, 3)).toBe(5);  
  });  
  
  it('0 + 0 eşittir 0', () => {  
    expect(toplama(0, 0)).toBe(0);  
  });  
});

Bu yapı ile fonksiyonunun farklı durumlarını test etmiş oluyorsun. `describe` bloğu, test grubu için bir başlık oluştururken, `it` blokları ise her bir test senaryosunu tanımlıyor. Basit değil mi?

## Mocking ve Spy Kullanımı

Bazen test ettiğin kod, dış bağımlılıklara (örneğin, API isteklerine) ihtiyaç duyabilir. Bu durumlarda, Jest’in sunduğu mocking ve spy özellikleri devreye giriyor. Mocking ile bağımlılıkları taklit edebilir ve testlerinizi izole edebilirsin.

Örneğin, bir API çağrısını mocklamak için şu şekilde yapabilirsin:

jest.mock('axios'); // axios kütüphanesini mockladık  
  
it('API çağrısı başarılı olursa veriyi döndürmeli', async () => {  
  const veriler = { data: { isim: 'Ali' } };  
  axios.get.mockResolvedValue(veriler); // Mock cevap  
  
  const cevap = await apiCagir(); // Api istek atıyoruz  
  expect(cevap.isim).toBe('Ali');  
});

## Snapshot Testing

Snapshot testing, bileşenlerinin görsel çıktılarının kaydedilmesi ve daha sonra bu çıktılarla karşılaştırılması için mükemmel bir yöntemdir. Özellikle React componentlerinde oldukça kullanışlıdır.


Bir bileşeni snapshot ile test etmek için, şu şekilde yazabilirsin:

import { render } from '@testing-library/react';  
import MyComponent from './MyComponent';  
  
test('MyComponent snapshot testi', () => {  
  const { asFragment } = render(<MyComponent />);  
  expect(asFragment()).toMatchSnapshot(); // Componentin çıktısını kaydediyor  
});

## Cypress Nedir?


![](/blog/images/frontend-testing-ara-lar-jest-ve-cypress-ile-ba-lamak-img-4.jpg)

Cypress, modern web uygulamaları için geliştirilmiş güçlü bir E2E (end-to-end) test aracı. Kullanıcı etkileşimlerini gerçek zamanlı olarak simüle edebilmesi, onu diğer test araçlarından ayıran en önemli özelliklerinden biri. Cypress, kullanıcıların uygulamanla nasıl etkileşimde bulunduğunu test ederken, hataları hızlı bir şekilde tespit etmeni sağlıyor.

Cypress ile test yazmak oldukça keyifli, çünkü her şey anlık geri bildirim almanı sağlayacak şekilde tasarlanmış. Testlerini yazarken tarayıcıda anlık olarak sonuçları görebilirsin; bu da debugging sürecini oldukça kolaylaştırır.

Cypress’i projene eklemek de oldukça basit. Tek bir komutla kurulumunu gerçekleştirebilirsin:

npm install cypress \--save-dev

Kurulumdan sonra, `npx cypress open` komutunu çalıştırarak Cypress arayüzünü açabilirsin. Buradan test senaryolarını kolayca yazmaya başlayabilirsin.

## Basit Bir Test Örneği

Cypress ile test yazmak için öncelikle test senaryonu belirlemen gerekiyor. Örneğin, bir web sayfasına erişip bir butona tıklayarak bir formu doldurmayı test edelim:

describe('Form Testi', () => {  
  it('Formu doldurmalı ve göndermeli', () => {  
    cy.visit('https://ornekwebsayfasi.com'); // Test edilecek web sayfasına git  
    cy.get('input\[name="isim"\]').type('Ali'); // İsim alanına "Ali" yaz  
    cy.get('input\[name="email"\]').type('ali@example.com'); // Email alanına söylediğimiz mailiyaz  
    cy.get('button\[type="submit"\]').click(); // Gönder butonuna tıkla  
    cy.get('.success-message').should('contain', 'Başarıyla gönderildi!'); // Başarı mesajını kontrol et  
  });  
});

Yukarıdaki örnekte, bir formu doldurup gönderirken Cypress’in sağladığı basit komutları kullandık. `cy.visit()`, `cy.get()` ve `cy.type()` gibi komutlar ile kullanıcı etkileşimlerini simüle ettik.

## Cypress’in Sunduğu Avantajlar

Cypress’in en büyük avantajlarından biri, testleri yazarken anlık geri bildirim alabilmendir. Testler çalışırken, tarayıcıda hangi adımların gerçekleştiğini görüp hataları hemen tespit edebilirsin. Ayrıca, Cypress ile birlikte gelen görsel test aracı sayesinde, test sonuçlarını kolayca inceleyebilirsin.

Cypress, test ortamlarını yönetmekte de oldukça başarılıdır. Farklı ortamlar için ayarları yapılandırabilir, test verilerini kolayca oluşturabilirsin. Bu da, projeni test etme sürecini daha da verimli hale getirir.

## Jest ve Cypress Arasındaki Farklar

Jest ve Cypress, farklı test ihtiyaçlarını karşılamak için tasarlanmış iki güçlü araçtır. Ancak, hangi durumda hangisini kullanman gerektiğini bilmen önemli. İşte bu iki araç arasındaki temel farklar:

### Kullanım Alanları

*   **Jest:** Jest, genellikle unit ve integration testler için kullanılır. JavaScript ve özellikle React projelerinde, componentlerin ve fonksiyonların bağımsız olarak test edilmesini sağlar. Jest, daha çok uygulamanın iç yapısını test ederken, dış bağımlılıklardan bağımsız bir şekilde çalışmanıza olanak tanır.
*   **Cypress:** Cypress, end-to-end (E2E) testler için idealdir. Kullanıcı etkileşimlerini simüle ederek, uygulamanın tüm akışını test etmeni sağlar. Cypress ile, bir kullanıcının uygulamanı nasıl deneyimleyeceğini gerçek bir tarayıcı ortamında test edebilirsin.

### Test Yazım Tarzı

*   **Jest:** Jest’te test yazarken, `describe`, `it` ve `expect` gibi yapıları kullanarak senaryoları belirli bir düzen içinde yazarsın. Mocking ve snapshot testing gibi özellikleri sayesinde, fonksiyonel testler yazmak oldukça kolaydır.
*   **Cypress:** Cypress’te test yazarken, daha doğal bir kullanıcı akışı oluşturursun. `cy.get()`, `cy.type()`, ve `cy.click()` gibi komutlar ile kullanıcı etkileşimlerini simüle edersin. Bu, test yazımını daha basit hale getirir.

### Geribildirim Süreci

*   **Jest:** Jest testlerini çalıştırırken sonuçları terminal üzerinden görürsün. Eğer bir test başarısız olursa, hata mesajlarını inceleyerek sorunu bulabilirsin. Ancak, anlık görselleştirme imkanı sınırlıdır.
*   **Cypress:** Cypress, testleri çalıştırırken bir tarayıcı penceresinde anlık sonuçları gösterir. Testlerin hangi adımda başarısız olduğunu görerek, hataları daha kolay tespit edebilirsin. Bu görsel geribildirim, debugging sürecini oldukça hızlandırır.

### Hangi Aracı Ne Zaman Kullanmalısın?

*   **Jest:** Eğer uygulamanın iç yapısını test etmek istiyorsan, fonksiyonları ve componentleri ayrı ayrı değerlendirmek için Jest’i kullan. Bu, özellikle React bileşenlerinde unit test yazmak için gayet ideal.
*   **Cypress:** Kullanıcı akışlarını, etkileşimlerini ve tüm uygulama işlevselliğini test etmek istiyorsan, Cypress mükemmel bir seçim olacaktır. E2E testlerin ile kullanıcı deneyimini en gerçekçi şekilde değerlendirebilirsin.

## Sonuç

Test yazma pratiği, yazılım geliştirme sürecinin vazgeçilmez bir parçası. Hem Jest hem de Cypress, projelerinin kalitesini artırmak ve kullanıcı deneyimini iyileştirmek için güçlü araçlar sunuyor. Her iki aracın da kendine özgü avantajları ve kullanım alanları var, bu nedenle projenin ihtiyaçlarına göre en uygun olanı seçmek çok önemlidir. Ben de daha yeni yeni öğreniyorum ve bu süreçte öğrendiklerimi ise aktarmaya çalışyorum. **Umarım bu yazımda anlattıklarım sana yardımcı olmuştur. İyi kodlamalar!**