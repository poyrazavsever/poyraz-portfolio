---
title: "Three.js: 3 Boyutlu Dünyaya Merhaba"
category: "General"
date: "2024-12-02"
readTime: "3 min read"
author: "Poyraz Avsever"
slug: "three-js-3-boyutlu-d-nyaya-merhaba"
excerpt: "Three.js: 3 Boyutlu Dünyaya Merhaba Dostlar, bugün size bir yazılımcının 3D dünyaya giriş hikayesini anlatacağım. Hani şu hayal gücünüzde dönen küreler, ışıklar, gölgeler var …"
coverImage: "/blog/images/three-js-3-boyutlu-d-nyaya-merhaba-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/three-js-3-boyutlu-d%C3%BCnyaya-merhaba-07b174dd6759"
---

# Three.js: 3 Boyutlu Dünyaya Merhaba


Dostlar, bugün size bir yazılımcının 3D dünyaya giriş hikayesini anlatacağım. Hani şu hayal gücünüzde dönen küreler, ışıklar, gölgeler var ya… Hazırsanız, Three.js ile yolculuğa çıkıyoruz!


![](/blog/images/three-js-3-boyutlu-d-nyaya-merhaba-img-2.jpg)

### “Bu Ne Güzel Bir Kütüphane!”

Three.js ile tanışmam bundan çok uzun zaman önce @Emir Uluçay arkadaşım sayesinde oldu. Ekranda bir küp dönüyordu. Basit bir küp işte, ama dönüyor. Kodu inceledikçe “Vay be, bunları yapabiliyorsam daha neler yaparım!” dedim. Ve böylece Three.js ile tanıştım oldum. O gün bugündür siz tembellik deyin, ben zamanım olmadı diyeyim bir türlü oturup 2 kelam edememiştik three.js ile. Fakat şuan staj yaptığım şirkette Three.js öğrenme taski girilmesin mi… Şimdi bakalım neymiş ne değilmiş bu arkadaş.

## Three.js: Nedir, Ne Değildir?

Three.js, **JavaScript ile tarayıcı üzerinde 3D grafikler oluşturmak için kullanılan bir kütüphane.** Basit bir küpten karmaşık bir 3D şehre kadar her şeyi tasarlayabilirsiniz. Ama önce şunu netleştirelim:

*   **Three.js bir oyun motoru değildir.** Yani Unity ya da Unreal Engine gibi her şeyi tek çatı altında sunmaz. Ama WebGL’in üstüne güzel bir soyutlama katmanı ekleyerek 3D grafiklerle uğraşmayı eğlenceli hale getirir.
*   **Three.js, WebGL’in süper kahramanı gibidir.** WebGL doğrudan GPU ile çalışır ve yüksek performans sağlar, ama kullanması zor olabilir. Three.js, bu karmaşıklığı giderir ve size daha az kodla harika işler yapma şansı verir.

## Peki Three.js Neler Sunar?

### 1\. Sahne Yönetimi (Scene Management)

Three.js, bir sahne (scene) oluşturmanıza olanak tanır. Sahne, 3D dünyanızı barındıran bir konteyner gibidir. İçine nesneler, ışıklar ve kameralar ekleyebilirsiniz.

const scene = new THREE.Scene();

### 2\. Kameralar

Kameralar, 3D sahnenizi “görmeyi” sağlar. Three.js’de iki ana kamera türü vardır:

*   **PerspectiveCamera**: İnsan gözünün görme şekline benzer. Uzak nesneler daha küçük görünür.
*   **OrthographicCamera**: Nesneler uzaklıklarına göre boyut değiştirmez. Teknik çizimler için kullanışlıdır.

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
camera.position.z = 5;

### 3\. Geometri ve Malzeme (Geometry & Material)

Geometri, 3D dünyanızdaki nesnelerin şekillerini tanımlar: küreler, kutular, düzlemler… Malzeme ise bu şekillerin nasıl görüneceğini belirler. Örneğin, mat mı parlak mı, hangi renkte olacak?

const geometry = new THREE.BoxGeometry();  
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  
const cube = new THREE.Mesh(geometry, material);  
scene.add(cube);

### 4\. Işıklandırma (Lighting)

Işık, sahnenizi gerçekçi hale getirir. Three.js, çeşitli ışık türleri sunar:

*   AmbientLight (Genel aydınlatma)
*   PointLight (Nokta ışığı)
*   DirectionalLight (Güneş gibi yönlendirilmiş ışık)

const light = new THREE.PointLight(0xffffff, 1, 100);  
light.position.set(10, 10, 10);  
scene.add(light);

### 5\. Renderer

Renderer, sahnenizi tarayıcıda görüntülemenizi sağlar. Three.js’nin WebGLRenderer’ı, GPU’nun gücünü kullanarak sahneleri hızlı bir şekilde çizer.

const renderer = new THREE.WebGLRenderer();  
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);

### 6\. Animasyon

Three.js ile sahnenizi canlandırabilirsiniz. Bu, genellikle bir **animasyon döngüsü** kullanılarak yapılır:

function animate() {  
    requestAnimationFrame(animate);  
    cube.rotation.x += 0.01;  
    cube.rotation.y += 0.01;  
    renderer.render(scene, camera);  
}  
animate();

## Neler Yapabilirsiniz?

1.  **Etkileşimli 3D Web Siteleri**: Hareket eden nesneler, dönen küpler, dinamik arka planlar…
2.  **3D Veri Görselleştirme**: Haritalar, grafikler ve simülasyonlar.
3.  **Basit Oyunlar**: Oyun motoru olmasa da basit 3D oyunlar oluşturabilirsiniz. (DENEYECEĞİM!!!)
4.  **VR ve AR Deneyimleri**: WebXR ile sanal ve artırılmış gerçeklik projeleri geliştirmek mümkün.

### Gelin bir önreğe bakalım

import \* as THREE from 'three';  
  
// Sahne oluştur  
const scene = new THREE.Scene();  
  
// Kamera ve ışık  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);  
camera.position.z = 5;  
  
// Renderer  
const renderer = new THREE.WebGLRenderer();  
renderer.setSize(window.innerWidth, window.innerHeight);  
document.body.appendChild(renderer.domElement);  
  
// Geometri ve malzeme  
const geometry = new THREE.BoxGeometry();  
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  
const cube = new THREE.Mesh(geometry, material);  
  
scene.add(cube);  
  
// Animasyon  
function animate() {  
    requestAnimationFrame(animate);  
    cube.rotation.x += 0.01;  
    cube.rotation.y += 0.01;  
    renderer.render(scene, camera);  
}  
animate();

Evet, yukarıdaki kod bir küp çizer ve onu döndürür. **Kodun içine girmekten korkmayın.** Bir kez parçaları anlarsanız LEGO gibi bir araya geliyor.

![](/blog/images/three-js-3-boyutlu-d-nyaya-merhaba-img-3.jpg)

### “Tamam Ama Neden Three.js?”

Öncelikle, tarayıcıda 3D yapmak demek WebGL kullanmak demek. WebGL, ham haliyle biraz karmaşık. Ama Three.js tüm bu karmaşıklığı alıyor, paketliyor ve yazılımcı dostu bir hale getiriyor. Yani otobanda giderken GPS ile yol bulmak gibi!

### Nereden Başlamalı?

Başlamak için şu adımları izleyebilirsiniz:

1.  Three.js Dokümantasyonu: Resmi dokümantasyon, her şeyin kapısı.
2.  YouTube ve Medium: İnanın, topluluk her şeyi sizin için çözmüş.

### Kendiniz Deneyin!

Son olarak, deney yapmaktan korkmayın. Küpleri küre yapın, sahneyi ışıklarla doldurun, kamerayı döndürün. Three.js, size hayal gücünüzü ekrana yansıtma şansı tanıyor.


Unutmayın, her devasa proje bir dönmeyle başlayan küple başlar. Şimdi sıra sizde!

**Not:** Yazıyı hazırlarken birkaç sahne çizdim, şimdi onları biraz daha geliştirmeye gidiyorum. :) Sorularınız varsa yorum bırakabilirsiniz!