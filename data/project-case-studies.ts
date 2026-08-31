export type ProjectCaseStudyLocale = "tr" | "en";

type LocalizedText = Record<ProjectCaseStudyLocale, string>;

type LocalizedList = Record<ProjectCaseStudyLocale, string[]>;

type LocalizedDecision = {
  title: LocalizedText;
  description: LocalizedText;
};

type LocalizedResult = {
  value: string;
  label: LocalizedText;
  description: LocalizedText;
};

type LocalizedScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
};

type ProjectCaseStudyDefinition = {
  slug: string;
  projectId: string;
  image: string;
  liveUrl: string;
  sourceUrl?: string;
  teamUrl?: string;
  applicationCategory: string;
  technologies: string[];
  title: LocalizedText;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  team: LocalizedText;
  context: LocalizedText;
  overview: LocalizedList;
  problem: LocalizedText;
  constraints: LocalizedList;
  decisions: LocalizedDecision[];
  designProcess: LocalizedText;
  designSteps: LocalizedList;
  challenge: LocalizedText;
  solution: LocalizedText;
  results: LocalizedResult[];
  metricsNote: LocalizedText;
  screenshotAlt: LocalizedText;
  screenshots: LocalizedScreenshot[];
  sourceNote: LocalizedText;
};

export type ProjectCaseStudy = Omit<
  ProjectCaseStudyDefinition,
  | "title"
  | "eyebrow"
  | "summary"
  | "role"
  | "team"
  | "context"
  | "overview"
  | "problem"
  | "constraints"
  | "decisions"
  | "designProcess"
  | "designSteps"
  | "challenge"
  | "solution"
  | "results"
  | "metricsNote"
  | "screenshotAlt"
  | "screenshots"
  | "sourceNote"
> & {
  locale: ProjectCaseStudyLocale;
  title: string;
  eyebrow: string;
  summary: string;
  role: string;
  team: string;
  context: string;
  overview: string[];
  problem: string;
  constraints: string[];
  decisions: Array<{ title: string; description: string }>;
  designProcess: string;
  designSteps: string[];
  challenge: string;
  solution: string;
  results: Array<{ value: string; label: string; description: string }>;
  metricsNote: string;
  screenshotAlt: string;
  screenshots: Array<{
    src: string;
    width: number;
    height: number;
    alt: string;
    caption: string;
  }>;
  sourceNote: string;
};

const PROJECT_CASE_STUDIES: ProjectCaseStudyDefinition[] = [
  {
    slug: "ostim-web-portali",
    projectId: "ostim-web-portal",
    image: "/projects/ostim.webp",
    liveUrl: "https://ostim.org.tr",
    teamUrl: "https://omedya.com",
    applicationCategory: "BusinessApplication",
    technologies: [
      ".NET 10",
      "Minimal APIs",
      "EF Core",
      "PostgreSQL",
      "Angular 20",
      "Angular Material",
      "Tailwind CSS",
      "Astro",
      "Liquid",
      "Fluid",
      "Docker",
    ],
    title: {
      tr: "OSTİM Web Portalı",
      en: "OSTİM Web Portal",
    },
    eyebrow: {
      tr: "Kurumsal vaka çalışması",
      en: "Professional case study",
    },
    summary: {
      tr: "OSTİM ana portalı ile yedi sanayi kümesini, tek bir yönetilebilir altyapı üzerinde kendi alan adı, içeriği, yetkileri ve görsel kimliğiyle çalıştıran hostname tabanlı çok kiracılı web ekosistemi.",
      en: "A hostname-based multi-tenant web ecosystem that runs the main OSTİM portal and seven industrial clusters on one manageable platform while preserving each tenant's domain, content, permissions, and visual identity.",
    },
    role: {
      tr: "Full-stack Developer",
      en: "Full-stack Developer",
    },
    team: {
      tr: "Omedya A.Ş. Dijital Ajans bünyesinde ürün ekibi",
      en: "Product team at Omedya Digital Agency",
    },
    context: {
      tr: "Kurumsal müşteri projesi",
      en: "Enterprise client project",
    },
    overview: {
      tr: [
        "OSTİM ekosistemi; ana kurumsal portalın yanı sıra ARUS, HTK, ENERJİK, İSİM, KAUÇUK, MEDİKAL ve OSSA kümelerine hizmet veriyor. Her yapı kendi içeriğini, menüsünü, alan adını ve marka kimliğini korurken ortak bir backend ve yönetim panelinden yararlanıyor.",
        "Projede backend, yönetim paneli ve herkese açık web katmanında full-stack geliştirici olarak görev aldım. Sorumluluğum yalnızca ekran geliştirmek değil; tenant çözümleme, veri erişimi, modüler içerik alanları, yeniden kullanılabilir yönetim arayüzleri ve tema üretim hattı gibi sistemi taşıyan kararların uygulamasını da kapsıyordu.",
      ],
      en: [
        "The OSTİM ecosystem serves the main corporate portal together with ARUS, HTK, ENERJİK, İSİM, KAUÇUK, MEDİKAL, and OSSA. Each organization keeps its own content, navigation, domain, and visual identity while sharing one backend and administration system.",
        "I worked across the backend, admin panel, and public web layer as a full-stack developer. My responsibility went beyond individual screens and included implementing the foundations of the system: tenant resolution, data access, modular content domains, reusable admin infrastructure, and the theme delivery pipeline.",
      ],
    },
    problem: {
      tr: "Sekiz ayrı kurumsal deneyimi bağımsız kod tabanları ve yönetim panelleriyle çoğaltmadan sunmak gerekiyordu. Ortak özellikler merkezden geliştirilmeli; buna karşılık tenant verisi, yetkileri, alan adı, SEO ayarları ve görsel kimliği birbirinden güvenli biçimde ayrılmalıydı.",
      en: "Eight distinct corporate experiences had to be delivered without duplicating codebases and admin panels. Shared capabilities needed to evolve centrally, while tenant data, permissions, domains, SEO settings, and brand identities remained safely isolated.",
    },
    constraints: {
      tr: [
        "Tenant'a özel ve tüm tenant'larda ortak kullanılan verilerin aynı modelde birlikte yaşayabilmesi",
        "Hostname üzerinden doğru tenant'ın belirlenmesi ve her veri sorgusunda izolasyonun korunması",
        "Yetkili kullanıcılar için kontrollü tenant'lar arası yönetim ihtiyacı",
        "Farklı marka kimlikleri korunurken yeni kümelerin düşük maliyetle sisteme eklenebilmesi",
        "Geniş içerik modülü yüzeyine rağmen yönetim panelinin tutarlı ve sürdürülebilir kalması",
        "Dinamik CMS içeriği sunarken herkese açık sayfalarda SEO ve hızlı sunucu taraflı çıktı gereksinimi",
      ],
      en: [
        "Supporting tenant-specific and shared global entities in the same data model",
        "Resolving the correct tenant from the hostname and preserving isolation in every data query",
        "Controlled cross-tenant administration for authorized users",
        "Keeping distinct brand identities while making new cluster onboarding inexpensive",
        "Maintaining a consistent admin experience across a broad set of content modules",
        "Delivering dynamic CMS content with SEO-friendly, fast server-rendered public pages",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Tenant bağlamını isteğin girişinde çözmek",
          en: "Resolve tenant context at the request boundary",
        },
        description: {
          tr: "Tenant hostname üzerinden belirleniyor; tenant-aware veri erişimi ve otomatik filtreler bu bağlamı uygulamanın tamamına taşıyor. Böylece izolasyon her modülün tekrar tekrar çözmesi gereken bir detay olmaktan çıkıyor.",
          en: "The tenant is resolved from the hostname, and tenant-aware data access plus automatic filters propagate that context throughout the application. Isolation becomes a platform concern instead of logic that every module must reimplement.",
        },
      },
      {
        title: {
          tr: "Modüler monolit ile ortak çekirdek",
          en: "A shared core built as a modular monolith",
        },
        description: {
          tr: "OmdCore üzerinde .NET 10 Minimal APIs, EF Core ve PostgreSQL kullanan modüler domain sınırları kuruldu. Dağıtım ve operasyon tek parça kalırken içerik ve iş alanları birbirinden ayrıştırıldı.",
          en: "Modular domain boundaries were built on OmdCore using .NET 10 Minimal APIs, EF Core, and PostgreSQL. Deployment and operations stay unified while content and business domains remain separated.",
        },
      },
      {
        title: {
          tr: "Yeniden kullanılabilir yönetim altyapısı",
          en: "Reusable administration infrastructure",
        },
        description: {
          tr: "Angular 20'nin zoneless ve standalone yapısı; Angular Material, Tailwind CSS, dinamik formlar ve ortak CRUD bileşenleriyle birleştirildi. Yeni modüller aynı etkileşim ve yetkilendirme kalıplarını tekrar kullanabiliyor.",
          en: "Angular 20's zoneless standalone architecture was combined with Angular Material, Tailwind CSS, dynamic forms, and shared CRUD components. New modules can reuse the same interaction and authorization patterns.",
        },
      },
      {
        title: {
          tr: "Statik tema geliştirme, dinamik sunum",
          en: "Static theme development, dynamic delivery",
        },
        description: {
          tr: "Herkese açık temalar Astro ile geliştiriliyor, Liquid'e aktarılıyor ve .NET içinde Fluid üzerinden sunucu tarafında render ediliyor. Böylece tema geliştirme hızı ile CMS kontrollü dinamik yayın bir arada tutuluyor.",
          en: "Public themes are developed with Astro, exported to Liquid, and rendered server-side in .NET through Fluid. This combines a fast theme development workflow with dynamic CMS-controlled delivery.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım sistemi iki seviyede ele alındı: OSTİM ana portalı için kendine özgü bir tema, yedi küme içinse ortak davranışları koruyan yeniden kullanılabilir bir küme tema tabanı. Tenant ayarları; renk, logo, menü, içerik ve SEO katmanında kimliği özelleştiriyor.",
      en: "The design system was handled at two levels: a dedicated theme for the main OSTİM portal and a reusable cluster theme foundation for the seven industrial clusters. Tenant settings customize identity across color, logo, navigation, content, and SEO.",
    },
    designSteps: {
      tr: [
        "Ortak sayfa ve içerik kalıplarını belirleme",
        "OSTİM ana portalı ile küme deneyimlerini tema seviyesinde ayırma",
        "İçerik editörleri için tutarlı dinamik form ve CRUD akışları oluşturma",
        "Tenant markasını kod çoğaltmadan ayarlar üzerinden uygulama",
      ],
      en: [
        "Identify shared page and content patterns",
        "Separate the main OSTİM and cluster experiences at the theme layer",
        "Build consistent dynamic form and CRUD flows for content editors",
        "Apply tenant branding through configuration instead of code duplication",
      ],
    },
    challenge: {
      tr: "En zor kısım, veri izolasyonu ve marka özgürlüğünü korurken sekiz deneyimi tek bir ürün gibi geliştirebilmekti. Sadece arayüzü temalandırmak yeterli değildi; veri modeli, yetkiler, içerik kapsamı ve render zincirinin aynı tenant bağlamına güvenmesi gerekiyordu.",
      en: "The hardest part was evolving eight experiences as one product without sacrificing data isolation or brand freedom. Theming the interface alone was not enough; the data model, permissions, content scope, and rendering pipeline all had to trust the same tenant context.",
    },
    solution: {
      tr: "Tenant bağlamı request sınırında merkezi olarak çözüldü; otomatik veri filtreleri ve tenant-aware servislerle alt katmanlara taşındı. Ortak/global varlıklar açıkça modellendi, tenant'lar arası işlemler yetkilendirildi ve tema katmanı aynı bağlamı kullanacak şekilde Fluid render hattına bağlandı.",
      en: "Tenant context was resolved centrally at the request boundary and carried into lower layers through automatic data filters and tenant-aware services. Shared entities were modeled explicitly, cross-tenant operations were permissioned, and the theme layer was connected to the same context through the Fluid rendering pipeline.",
    },
    results: [
      {
        value: "8",
        label: { tr: "Markalı web deneyimi", en: "Branded web experiences" },
        description: {
          tr: "OSTİM ana portalı ve yedi sanayi kümesi aynı platform üzerinde çalışıyor.",
          en: "The main OSTİM portal and seven industrial clusters run on the same platform.",
        },
      },
      {
        value: "1",
        label: { tr: "Ortak backend ve yönetim", en: "Shared backend and admin" },
        description: {
          tr: "İçerik, yetki ve iş modülleri merkezi bir sistemden yönetiliyor.",
          en: "Content, permissions, and business modules are managed from one system.",
        },
      },
      {
        value: "7",
        label: { tr: "Bağımsız küme kimliği", en: "Independent cluster identities" },
        description: {
          tr: "Her küme kendi alan adı, menüsü, içeriği, SEO'su ve markasını koruyor.",
          en: "Each cluster keeps its own domain, navigation, content, SEO, and branding.",
        },
      },
    ],
    metricsNote: {
      tr: "Trafik, gelir veya dönüşüm verileri bu vaka çalışması için paylaşılmadı. Bu nedenle sonuçları uydurma yüzdeler yerine teslim edilen platform kapsamı ve operasyonel konsolidasyon üzerinden ifade ediyorum.",
      en: "Traffic, revenue, and conversion figures were not available for publication. The outcome is therefore expressed through delivered platform scope and operational consolidation rather than invented percentages.",
    },
    screenshotAlt: {
      tr: "OSTİM Web Portalı proje önizlemesi",
      en: "OSTİM Web Portal project preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/ostim-web-portal/homepage.webp",
        width: 1660,
        height: 6414,
        alt: {
          tr: "OSTİM Web Portalı ana sayfasının tam ekran görünümü",
          en: "Full-page view of the OSTİM Web Portal homepage",
        },
        caption: {
          tr: "OSTİM ana portalı; kurumsal içerik, firma arama, haberler, projeler ve küme bağlantılarını tek deneyimde birleştiriyor.",
          en: "The OSTİM homepage brings corporate content, company search, news, projects, and cluster access into one experience.",
        },
      },
    ],
    sourceNote: {
      tr: "Kaynak kod, müşteri projesi olduğu için herkese açık değil.",
      en: "The source code is private because this is a client project.",
    },
  },
  {
    slug: "ostim-istihdam",
    projectId: "ostim-employment",
    image: "/projects/ostim-istihdam.webp",
    liveUrl: "https://ostimistihdam.com",
    teamUrl: "https://omedya.com",
    applicationCategory: "BusinessApplication",
    technologies: [
      ".NET 10",
      "Minimal APIs",
      "EF Core",
      "PostgreSQL",
      "Angular 20",
      "Angular Material",
      "Tailwind CSS",
      "Astro",
      "Liquid",
      "Fluid",
      "İŞKUR API",
      "Gemini AI",
    ],
    title: {
      tr: "OSTİM İstihdam",
      en: "OSTİM Employment",
    },
    eyebrow: {
      tr: "Kurumsal vaka çalışması",
      en: "Professional case study",
    },
    summary: {
      tr: "Aday takibi, şirket iş birliği ve kamu odaklı istihdam süreçlerini; İŞKUR senkronizasyonu, yapay zekâ destekli moderasyon ve müşteri bazlı dağıtımlarla birleştiren full-stack işe alım platformu.",
      en: "A full-stack recruitment platform combining candidate tracking, company collaboration, and public-sector employment workflows with İŞKUR synchronization, AI-assisted moderation, and customer-specific deployments.",
    },
    role: {
      tr: "Full-stack Developer",
      en: "Full-stack Developer",
    },
    team: {
      tr: "Omedya A.Ş. Dijital Ajans bünyesinde ürün ekibi",
      en: "Product team at Omedya Digital Agency",
    },
    context: {
      tr: "Temmuz 2025 – Mayıs 2026 · Kurumsal müşteri projesi",
      en: "July 2025 – May 2026 · Enterprise client project",
    },
    overview: {
      tr: [
        "OSTİM İstihdam; iş ve staj ilanlarını, aday başvurularını, şirket kayıtlarını ve kamu odaklı istihdam operasyonlarını ortak bir sistemde yönetmek için geliştirildi. Aday profili; eğitim, deneyim, dil ve CV verileriyle birlikte başvuru ve görüşme sürecine bağlanıyor.",
        "Omedya A.Ş. bünyesinde full-stack geliştirici olarak backend, Angular yönetim paneli ve herkese açık web katmanında görev aldım. İş ilanlarından raporlara, entegrasyonlardan müşteri bazlı production yapılandırmasına kadar ürünün birden fazla katmanında aktif geliştirme yaptım.",
      ],
      en: [
        "OSTİM Employment was developed to manage job and internship listings, candidate applications, company records, and public-sector employment operations in one system. Candidate education, experience, language, and CV data connect directly to application and interview workflows.",
        "As a full-stack developer at Omedya, I contributed across the backend, Angular administration panel, and public web layer. My work covered multiple layers of the product, from job listings and reports to integrations and customer-specific production configuration.",
      ],
    },
    problem: {
      tr: "Aday, işveren ve istihdam ofisi süreçleri farklı veri ve iletişim kanallarına dağılıyordu. Platformun ilan yayınından başvuru takibine, görüşme notlarından dış entegrasyonlara kadar bütün yaşam döngüsünü tek bir yetkili sistemde toplaması gerekiyordu.",
      en: "Candidate, employer, and employment-office workflows were fragmented across different data and communication channels. The platform needed to bring the complete lifecycle—from publishing listings to tracking applications, interview notes, and external integrations—into one permissioned system.",
    },
    constraints: {
      tr: [
        "Aday, şirket, yönetici ve içerik editörü için farklı rol ve veri görünürlükleri",
        "İŞKUR ilanlarının düzenli ve güvenilir biçimde senkronize edilmesi",
        "CV ve profil gibi kişisel verilerde doğrulama, yetkilendirme ve güvenli dosya yönetimi",
        "Çok sayıda iş akışı için tekrar kullanılabilir yönetim ekranları ve dinamik formlar",
        "OSTİM ve CV Sağlık gibi müşteriler için izole veritabanı, yapılandırma ve marka kimliği",
        "Herkese açık içerikte hızlı sunum, lokalizasyon ve teknik SEO gereksinimi",
      ],
      en: [
        "Different roles and data visibility rules for candidates, companies, administrators, and editors",
        "Reliable recurring synchronization of İŞKUR job listings",
        "Validation, authorization, and secure file handling for personal CV and profile data",
        "Reusable administration screens and dynamic forms across many workflows",
        "Isolated databases, configuration, and branding for customers such as OSTİM and CV Sağlık",
        "Fast delivery, localization, and technical SEO for public content",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Katmanlı OmdCore mimarisi",
          en: "Layered OmdCore architecture",
        },
        description: {
          tr: "Backend; Domain, Infrastructure, Application ve Presentation katmanları üzerinde .NET 10 Minimal APIs, EF Core ve PostgreSQL ile kuruldu. Modül sınırları büyüyen iş alanlarının birbirinden ayrılmasını sağladı.",
          en: "The backend uses .NET 10 Minimal APIs, EF Core, and PostgreSQL across Domain, Infrastructure, Application, and Presentation layers. Module boundaries keep growing business domains separated.",
        },
      },
      {
        title: {
          tr: "Convention tabanlı modül ve endpoint keşfi",
          en: "Convention-based module and endpoint discovery",
        },
        description: {
          tr: "Convention tabanlı modül keşfi ve source-generated endpoint yaklaşımıyla yeni yeteneklerin sisteme tutarlı biçimde eklenmesi kolaylaştırıldı; doğrulama, cache, yetki ve seçenek modelleri ortak altyapıya taşındı.",
          en: "Convention-based module discovery and source-generated endpoints make new capabilities consistent to add, while validation, caching, authorization, and typed options live in shared infrastructure.",
        },
      },
      {
        title: {
          tr: "Zoneless Angular yönetim paneli",
          en: "Zoneless Angular administration",
        },
        description: {
          tr: "Angular 20 standalone bileşenleri, Angular Material, Tailwind CSS, dinamik CRUD formları, filtreler, dashboard'lar, grafikler ve ortak yönetim ekranlarıyla tekrar kullanılabilir bir operasyon arayüzü oluşturuldu.",
          en: "Angular 20 standalone components, Angular Material, Tailwind CSS, dynamic CRUD forms, filters, dashboards, charts, and shared management screens form a reusable operations interface.",
        },
      },
      {
        title: {
          tr: "Entegrasyonları kontrollü servis sınırlarına almak",
          en: "Contain integrations behind controlled services",
        },
        description: {
          tr: "İŞKUR senkronizasyonu, Gemini tabanlı içerik moderasyonu ve e-posta/SMS bildirimleri iş akışlarından ayrıştırılmış servisler olarak ele alındı.",
          en: "İŞKUR synchronization, Gemini-based content moderation, and email/SMS notifications are handled as services separated from core workflows.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım süreci, aday ve işveren için herkese açık yolculuklarla istihdam ekibinin operasyon ekranlarını birbirinden ayırarak ilerledi. Aynı veri modelini kullanan bu deneyimler, her rolün yalnızca karar vermesi için gereken bilgi ve aksiyonları görmesini hedefledi.",
      en: "The design process separated public candidate and employer journeys from the employment team's operational screens. Both experiences share the same data model while exposing only the information and actions each role needs to make decisions.",
    },
    designSteps: {
      tr: [
        "İlan, başvuru, değerlendirme ve görüşme yaşam döngüsünü haritalama",
        "Aday, şirket ve yönetici rollerinin bilgi sınırlarını belirleme",
        "Yoğun veri girişlerini dinamik form ve ortak CRUD kalıplarıyla sadeleştirme",
        "Herkese açık temayı CMS kontrollü, hızlı ve SEO uyumlu biçimde sunma",
      ],
      en: [
        "Map the listing, application, assessment, and interview lifecycle",
        "Define information boundaries for candidate, company, and administrator roles",
        "Simplify data-heavy operations with dynamic forms and shared CRUD patterns",
        "Deliver the public theme as a fast, SEO-ready, CMS-controlled experience",
      ],
    },
    challenge: {
      tr: "En zor teknik alan, iç iş akışları ile dış sistemleri aynı başvuru yaşam döngüsünde güvenilir biçimde buluşturmaktı. Senkronizasyon veya bildirim hataları ana operasyonu bozmamalı; buna rağmen kullanıcıya güncel ve izlenebilir durum sunulmalıydı.",
      en: "The hardest technical area was reliably connecting internal workflows and external systems inside the same application lifecycle. Synchronization or notification failures could not break core operations, yet users still needed current and traceable status.",
    },
    solution: {
      tr: "Dış entegrasyonlar kontrollü servis ve background süreçlerine ayrıldı; uygulama durumları sistemin kendi veri modelinde tutuldu. Güçlü doğrulama, yetkilendirme ve raporlama katmanları sayesinde operatörler başvurunun geçmişini tek merkezden takip edebildi.",
      en: "External integrations were separated into controlled services and background processes, while application states remained in the platform's own data model. Validation, authorization, and reporting let operators trace application history from one place.",
    },
    results: [
      {
        value: "2",
        label: { tr: "Müşteri dağıtımı", en: "Customer deployments" },
        description: {
          tr: "Aynı kod tabanı OSTİM ve CV Sağlık için izole yapılandırma, veritabanı ve markayla çalışıyor.",
          en: "The same codebase runs for OSTİM and CV Sağlık with isolated configuration, databases, and branding.",
        },
      },
      {
        value: "1",
        label: { tr: "Uçtan uca aday yaşam döngüsü", en: "End-to-end candidate lifecycle" },
        description: {
          tr: "İlan, başvuru, görüşme, not ve durum takibi ortak platformda yönetiliyor.",
          en: "Listings, applications, interviews, notes, and status tracking are managed in one platform.",
        },
      },
      {
        value: "API + AI",
        label: { tr: "Gerçek entegrasyonlar", en: "Production integrations" },
        description: {
          tr: "İŞKUR senkronizasyonu ve Gemini moderasyonu manuel operasyon yükünü azaltıyor.",
          en: "İŞKUR synchronization and Gemini moderation reduce manual operational work.",
        },
      },
    ],
    metricsNote: {
      tr: "İşe yerleştirme, başvuru dönüşümü veya trafik metrikleri yayınlanmadığı için sonuçları doğrulanabilir ürün kapsamı, entegrasyonlar ve müşteri dağıtımları üzerinden ifade ediyorum.",
      en: "Placement, application conversion, and traffic metrics were not available for publication, so the outcome is described through verifiable product scope, integrations, and customer deployments.",
    },
    screenshotAlt: {
      tr: "OSTİM İstihdam platformu önizlemesi",
      en: "OSTİM Employment platform preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/ostim-employment/homepage.webp",
        width: 1660,
        height: 4432,
        alt: {
          tr: "OSTİM İstihdam ana sayfasının tam ekran görünümü",
          en: "Full-page view of the OSTİM Employment homepage",
        },
        caption: {
          tr: "İş arama, aday kaydı, şirket kayıtları, haberler ve kariyer içeriklerini aynı herkese açık deneyimde birleştiren ana sayfa.",
          en: "The public homepage combines job search, candidate registration, company records, news, and career content.",
        },
      },
    ],
    sourceNote: {
      tr: "Kaynak kod, müşteri projesi olduğu için herkese açık değil.",
      en: "The source code is private because this is a client project.",
    },
  },
  {
    slug: "targiz",
    projectId: "targiz-app",
    image: "/projects/targiz.png",
    liveUrl: "https://targiz.com",
    applicationCategory: "BusinessApplication",
    technologies: [
      "React Native",
      "Next.js",
      "TypeScript",
      "Express.js",
      "Supabase",
      "Tailwind CSS",
      "AI Integrations",
    ],
    title: { tr: "Targiz", en: "Targiz" },
    eyebrow: {
      tr: "Ürün liderliği vaka çalışması",
      en: "Product leadership case study",
    },
    summary: {
      tr: "Çiftçilerin hastalık tespiti, bilgiye erişim, dijital lojistik ve pazar süreçlerini tek bir mobil öncelikli platformda birleştirmeyi hedefleyen yapay zekâ destekli tarım ürünü.",
      en: "An AI-assisted, mobile-first agriculture product designed to unite disease diagnosis, information access, digital logistics, and market workflows for farmers.",
    },
    role: {
      tr: "Software Lead ve Full-stack Developer",
      en: "Software Lead and Full-stack Developer",
    },
    team: {
      tr: "Organizasyonunu, planlamasını ve görev dağılımını yönettiğim 3 kişilik ekip",
      en: "Three-person team whose organization, planning, and task allocation I led",
    },
    context: {
      tr: "Aktif geliştirme · Girişim ürünü",
      en: "Active development · Startup product",
    },
    overview: {
      tr: [
        "Targiz; tarımsal operasyonları dijitalleştirmek, üreticinin bilgiye erişimini güçlendirmek ve çiftçi, tedarikçi ile alıcı arasındaki bağı daha doğrudan kurmak amacıyla geliştiriliyor. Ürün; yapay zekâ destekli hastalık analizi, topluluk, tarla takibi, lojistik ve pazar gibi alanları aynı deneyimde buluşturuyor.",
        "Üç kişilik ekipte software lead olarak organizasyon, planlama ve görev dağılımını yürütürken geliştirmeye de aktif full-stack katkı verdim. React Native ve Next.js istemcilerinden Express.js servislerine, Supabase veri katmanından yapay zekâ modüllerine kadar ürünün teknik yönünün şekillenmesinde görev aldım.",
      ],
      en: [
        "Targiz is being developed to digitize agricultural operations, strengthen access to information, and create more direct connections among farmers, suppliers, and buyers. The product brings AI-assisted disease analysis, community, field tracking, logistics, and marketplace capabilities into one experience.",
        "As software lead in a three-person team, I managed organization, planning, and task allocation while contributing actively as a full-stack developer. I helped shape the technical direction across React Native and Next.js clients, Express.js services, the Supabase data layer, and AI-driven modules.",
      ],
    },
    problem: {
      tr: "Üreticinin hastalık bilgisi, güncel piyasa verisi, lojistik ve satış kanallarına erişimi parçalı. Sahada kullanılan ürünün düşük sürtünmeli çalışması, farklı kullanıcıları buluşturması ve yapay zekâ çıktısını anlaşılır bir aksiyona dönüştürmesi gerekiyordu.",
      en: "Farmers' access to disease information, current market data, logistics, and sales channels is fragmented. A field-ready product needed to reduce interaction friction, connect different participants, and turn AI output into understandable action.",
    },
    constraints: {
      tr: [
        "Sahada ve farklı ekran boyutlarında kullanılabilecek mobil öncelikli deneyim",
        "Web ve mobil istemciler arasında tutarlı veri ve özellik davranışı",
        "Hassas veriler ve yapay zekâ destekli analizler için güvenli işlem sınırları",
        "Topluluk, hastalık analizi, lojistik ve pazar gibi farklı ürün alanlarının birlikte büyümesi",
        "Üç kişilik ekipte planlama, görev dağılımı ve aktif geliştirme sorumluluğunun dengelenmesi",
        "Gelişen ürün ihtiyaçlarına rağmen sürdürülebilir frontend ve API sınırları",
      ],
      en: [
        "A mobile-first experience usable in the field and across screen sizes",
        "Consistent data and feature behavior across web and mobile clients",
        "Secure processing boundaries for sensitive data and AI-assisted analysis",
        "Parallel growth of community, disease analysis, logistics, and marketplace domains",
        "Balancing planning, task allocation, and active development in a three-person team",
        "Sustainable frontend and API boundaries despite evolving product needs",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Mobil öncelikli, çapraz platform istemciler",
          en: "Mobile-first cross-platform clients",
        },
        description: {
          tr: "React Native mobil deneyimi ve Next.js web yüzeyi ortak ürün hedefleri etrafında kurgulandı. Özellik sınırları, sahadaki temel yolculukların her istemcide tutarlı ilerlemesini amaçlıyor.",
          en: "The React Native mobile experience and Next.js web surface are designed around shared product goals. Feature boundaries keep critical field workflows consistent across clients.",
        },
      },
      {
        title: {
          tr: "Supabase veri katmanı, Express servis sınırı",
          en: "Supabase data layer, Express service boundary",
        },
        description: {
          tr: "Supabase hızlı ürün geliştirme için veri yeteneklerini sağlarken, Express.js servisleri iş kurallarını ve istemciler arası ortak davranışı kontrollü bir API katmanında topluyor.",
          en: "Supabase provides data capabilities for fast product development, while Express.js services centralize business rules and shared client behavior behind a controlled API layer.",
        },
      },
      {
        title: {
          tr: "Yapay zekâyı ayrı bir ürün yeteneği olarak ele almak",
          en: "Treat AI as a separate product capability",
        },
        description: {
          tr: "Hastalık analizi gibi yapay zekâ akışları doğrudan arayüze gömülmek yerine güvenli veri işleme ve açıklanabilir sonuç sunumu olan ayrı modüller olarak tasarlandı.",
          en: "AI workflows such as disease analysis are designed as separate modules with secure data processing and explainable result presentation instead of being embedded directly into the interface.",
        },
      },
      {
        title: {
          tr: "Teknik liderliği görünür çalışma akışına dönüştürmek",
          en: "Turn technical leadership into a visible workflow",
        },
        description: {
          tr: "İş kapsamı parçalara ayrıldı, öncelikler netleştirildi ve görevler ekip üyelerinin sorumluluklarına göre dağıtıldı. Kodlama ile koordinasyon aynı teslim hedefleri üzerinden yürütüldü.",
          en: "Work was broken into clear scopes, priorities were made explicit, and tasks were allocated according to team responsibilities. Coding and coordination followed the same delivery goals.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım, çiftçinin günlük ihtiyaçlarına mümkün olduğunca doğrudan ulaşmasını hedefleyen mobil öncelikli bir bilgi mimarisiyle ilerledi. Ana ekran hızlı aksiyonları öne çıkarırken topluluk, yapay zekâ analizi ve operasyon modülleri kendi görev bağlamlarını koruyor.",
      en: "The design follows a mobile-first information architecture that gives farmers direct access to daily needs. The dashboard prioritizes quick actions, while community, AI analysis, and operational modules retain their own task contexts.",
    },
    designSteps: {
      tr: [
        "Çiftçinin sahadaki temel bilgi ve işlem ihtiyaçlarını önceliklendirme",
        "Ana ekranı hızlı erişim, ajanda ve topluluk sinyalleri etrafında kurma",
        "Hastalık analizini görsel yükleme, teşhis ve öneri adımlarına ayırma",
        "Web ve mobilde ortak tasarım dili ile açık/koyu tema davranışını koruma",
      ],
      en: [
        "Prioritize the farmer's core information and action needs in the field",
        "Structure the dashboard around quick access, agenda, and community signals",
        "Split disease analysis into image upload, diagnosis, and recommendation steps",
        "Preserve a shared design language and theme behavior across web and mobile",
      ],
    },
    challenge: {
      tr: "En büyük zorluk, geniş ürün vizyonunu küçük bir ekibin sürdürülebilir biçimde teslim edebileceği parçalara dönüştürmekti. Teknik liderlik görevleriyle aktif full-stack geliştirmeyi aynı anda yürütürken bağımlılıkların ve önceliklerin görünür kalması gerekiyordu.",
      en: "The central challenge was turning a broad product vision into increments that a small team could deliver sustainably. Dependencies and priorities had to remain visible while I balanced technical leadership with active full-stack development.",
    },
    solution: {
      tr: "Ürün alanlarını modüler iş paketlerine ayırdım; ekip planlamasını teslim hedefleri ve teknik bağımlılıklar üzerinden yönettim. Ortak istemci davranışlarını ve servis sınırlarını netleştirerek ekip üyelerinin paralel ilerleyebileceği bir geliştirme düzeni kurduk.",
      en: "I divided product domains into modular work packages and managed planning around delivery goals and technical dependencies. By clarifying shared client behavior and service boundaries, we created a development workflow that allowed team members to progress in parallel.",
    },
    results: [
      {
        value: "3",
        label: { tr: "Kişilik ürün ekibi", en: "Person product team" },
        description: {
          tr: "Organizasyon, planlama ve görev dağılımını yönetirken geliştirmeye aktif katkı verdim.",
          en: "I led organization, planning, and task allocation while contributing actively to development.",
        },
      },
      {
        value: "4",
        label: { tr: "Ana ürün alanı", en: "Core product domains" },
        description: {
          tr: "Hastalık analizi, bilgi/topluluk, lojistik ve pazar erişimi aynı ürün vizyonunda birleşiyor.",
          en: "Disease analysis, information/community, logistics, and marketplace access share one product vision.",
        },
      },
      {
        value: "Web + Mobile",
        label: { tr: "Çapraz platform deneyimi", en: "Cross-platform experience" },
        description: {
          tr: "Next.js ve React Native istemcileri ortak servis ve veri katmanından yararlanıyor.",
          en: "Next.js and React Native clients use shared service and data layers.",
        },
      },
    ],
    metricsNote: {
      tr: "Targiz aktif geliştirme aşamasında. Ürün henüz sonuçlanmış kullanıcı, gelir veya verim artışı metriği paylaşmadığı için bu bölüm ekip, platform ve teslim edilen özellik kapsamını gösteriyor.",
      en: "Targiz is under active development. Since verified user, revenue, or productivity metrics are not yet available, this section presents team, platform, and delivered feature scope.",
    },
    screenshotAlt: {
      tr: "Targiz tarım platformu önizlemesi",
      en: "Targiz agriculture platform preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/targiz/marketing-site.webp",
        width: 1660,
        height: 4999,
        alt: {
          tr: "Targiz tanıtım sitesinin tam ekran görünümü",
          en: "Full-page view of the Targiz marketing site",
        },
        caption: {
          tr: "Ürün değerini, güncel hal fiyatlarını ve çiftçi odaklı yetenekleri anlatan tanıtım sayfası.",
          en: "The marketing site presents the product value, current wholesale market prices, and farmer-focused capabilities.",
        },
      },
      {
        src: "/projects/case-studies/targiz/dashboard.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Targiz hızlı erişim ve ajanda dashboard'u",
          en: "Targiz quick-access and agenda dashboard",
        },
        caption: {
          tr: "Topluluk, takvim, planlama ve yapay zekâ analizine hızlı erişim sağlayan ana çalışma alanı.",
          en: "The primary workspace provides quick access to community, calendar, planning, and AI analysis.",
        },
      },
      {
        src: "/projects/case-studies/targiz/community.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Targiz çiftçi topluluğu keşfet ekranı",
          en: "Targiz farmer community discovery screen",
        },
        caption: {
          tr: "Üreticilerin saha sorularını paylaşabildiği ve deneyim aktarabildiği topluluk akışı.",
          en: "The community feed lets farmers share field questions and practical experience.",
        },
      },
      {
        src: "/projects/case-studies/targiz/disease-analysis.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Targiz yapay zekâ destekli bitki hastalığı analiz ekranı",
          en: "Targiz AI-assisted plant disease analysis screen",
        },
        caption: {
          tr: "Bitki görselinden teşhis, güven skoru, hastalık bilgisi ve önerilen zirai ilaçları sunan analiz sonucu.",
          en: "The result view presents diagnosis, confidence, disease details, and suggested agricultural treatments from a plant image.",
        },
      },
    ],
    sourceNote: {
      tr: "Kaynak kod aktif geliştirilen girişim ürününe ait olduğu için herkese açık değil.",
      en: "The source code is private because the startup product is under active development.",
    },
  },
  {
    slug: "take-neta",
    projectId: "neta",
    image: "/projects/neta.png",
    liveUrl: "https://www.takeneta.com",
    sourceUrl: "https://github.com/poyrazavsever/neta",
    applicationCategory: "BusinessApplication",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Express.js",
      "AI Integrations",
      "Self-hosting",
    ],
    title: { tr: "Take Neta", en: "Take Neta" },
    eyebrow: {
      tr: "Bağımsız ürün vaka çalışması",
      en: "Independent product case study",
    },
    summary: {
      tr: "Freelancer'ların görev, proje, müşteri ve finans akışlarını kendi kontrol ettikleri tek bir çalışma alanında birleştiren, yapay zekâ destekli ve self-hosted kişisel işletim sistemi.",
      en: "An AI-assisted, self-hosted personal operating system that brings freelancers' tasks, projects, clients, and financial workflows into one workspace they control.",
    },
    role: {
      tr: "Kurucu, ürün tasarımcısı ve full-stack geliştirici",
      en: "Founder, product designer, and full-stack developer",
    },
    team: {
      tr: "Tek başıma geliştirdiğim side project",
      en: "Solo side project",
    },
    context: {
      tr: "Öğrenme ve ürün geliştirme projesi",
      en: "Learning and product development project",
    },
    overview: {
      tr: [
        "Neta, bağımsız çalışanların günlük görevlerini, proje kilometre taşlarını, müşteri ilişkilerini ve finansal görünümünü ayrı SaaS ürünlerine dağıtmadan yönetebilmesi için tasarlandı.",
        "Ürünü fikirden arayüze, frontend'den API'ye ve self-hosted kullanım senaryosuna kadar tek başıma geliştiriyorum. Bu proje benim için yalnızca özellik üretmek değil; ürün kapsamı belirleme, teknik kararların bakım maliyetini tartma ve gerçek bir sistemi uçtan uca sahiplenme çalışması.",
      ],
      en: [
        "Neta is designed for independent professionals who want to manage daily tasks, project milestones, client relationships, and financial visibility without scattering their work across separate SaaS products.",
        "I develop the product alone from concept and interface design to frontend, API, and the self-hosted usage model. It is not only an exercise in shipping features; it is a way to practice product scoping, evaluate the maintenance cost of technical decisions, and own a real system end to end.",
      ],
    },
    problem: {
      tr: "Freelancer'lar günlük işlerini çoğu zaman görev yönetimi, CRM, finans ve raporlama için farklı araçlara bölüyor. Bu parçalanma bağlam kaybı, tekrar veri girişi, abonelik yorgunluğu ve iş verisi üzerinde daha az kontrol yaratıyor.",
      en: "Freelancers often split daily work across separate task management, CRM, finance, and reporting tools. That fragmentation creates context switching, duplicated data entry, subscription fatigue, and less control over business data.",
    },
    constraints: {
      tr: [
        "Tek geliştiriciyle yönetilebilir bir ürün ve operasyon kapsamı",
        "Kullanıcının verisi ve dağıtımı üzerinde kontrol sahibi olduğu self-hosted kurulum",
        "Farklı yapay zekâ sağlayıcılarını destekleyebilecek bağımsız entegrasyon yaklaşımı",
        "Birçok iş alanını birleştirirken arayüzün ağır bir ERP hissine dönüşmemesi",
        "Müşteriye şeffaflık sağlarken iç iş verilerini salt okunur portal sınırının dışında tutmak",
      ],
      en: [
        "A product and operational scope maintainable by one developer",
        "Self-hosted deployment that gives users control over their data and runtime",
        "A provider-independent integration approach for multiple AI services",
        "Combining several business domains without making the interface feel like a heavy ERP",
        "Giving clients transparency while keeping internal business data outside the read-only portal boundary",
      ],
    },
    decisions: [
      {
        title: {
          tr: "İş akışlarını tek veri bağlamında birleştirmek",
          en: "Unify workflows around one data context",
        },
        description: {
          tr: "Görev, proje, müşteri ve finans alanları birbirinden kopuk mini uygulamalar yerine ilişkili ürün modülleri olarak ele alındı. Böylece kullanıcı aynı işi farklı araçlarda yeniden tanımlamak zorunda kalmıyor.",
          en: "Tasks, projects, clients, and finance are modeled as related product modules instead of disconnected mini-apps. Users do not have to redefine the same work across several tools.",
        },
      },
      {
        title: {
          tr: "Self-hosting'i ürünün parçası yapmak",
          en: "Treat self-hosting as a product capability",
        },
        description: {
          tr: "Self-hosted kullanım sonradan eklenen bir dağıtım seçeneği değil, veri sahipliği ve bağımsızlık hedefinin temel parçası olarak tasarlandı.",
          en: "Self-hosting is designed as a core part of data ownership and independence, not as a deployment option added after the product is complete.",
        },
      },
      {
        title: {
          tr: "Yapay zekâ sağlayıcısını soyutlamak",
          en: "Abstract the AI provider",
        },
        description: {
          tr: "İş verisini sorgulama ve görev özetleme yetenekleri tek bir sağlayıcıya kilitlenmeden kurgulandı; kullanıcı entegre seçenekler arasından seçim yapabiliyor.",
          en: "Business-data queries and task summaries are designed without locking the product to one provider, allowing users to choose among integrated options.",
        },
      },
      {
        title: {
          tr: "Müşteri portalını salt okunur sınırla ayırmak",
          en: "Separate the client portal with a read-only boundary",
        },
        description: {
          tr: "Müşteri, proje ilerlemesini görebiliyor; ancak iç operasyon verisini değiştiremiyor. Şeffaflık sağlanırken çalışma alanının kontrolü freelancer'da kalıyor.",
          en: "Clients can view project progress but cannot mutate internal operational data. This adds transparency while the freelancer retains control of the workspace.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım yaklaşımında önce freelancer'ın gün içinde en sık baktığı bilgiler belirleniyor, ardından her modül için ayrıntı kademeli olarak açılıyor. Amaç her özelliği aynı anda göstermek değil, tek bakışta işin durumunu anlaşılır kılmak.",
      en: "The design process starts by identifying the information a freelancer checks most often, then progressively reveals detail inside each module. The goal is not to display every feature at once, but to make the state of the business understandable at a glance.",
    },
    designSteps: {
      tr: [
        "Dağınık freelancer iş akışlarını ortak bir yolculukta haritalama",
        "Günlük kararlar için gerekli özet bilgiyi dashboard'a taşıma",
        "Görev, proje, müşteri ve finans alanlarında ortak etkileşim kalıpları kurma",
        "Müşterinin göreceği bilgiyi ayrı ve salt okunur bir deneyim olarak tasarlama",
      ],
      en: [
        "Map fragmented freelance workflows into one journey",
        "Bring the summary information needed for daily decisions into the dashboard",
        "Establish shared interaction patterns across tasks, projects, clients, and finance",
        "Design client-facing information as a separate read-only experience",
      ],
    },
    challenge: {
      tr: "En zor ürün problemi, dört farklı iş alanını bir araya getirirken yeni bir karmaşıklık merkezi yaratmamaktı. Birleşik deneyim ancak modüller aynı bağlamı paylaşıp kendi sınırlarını koruduğunda değer üretiyor.",
      en: "The hardest product problem was bringing four business domains together without creating a new center of complexity. A unified experience is valuable only when modules share context while preserving clear boundaries.",
    },
    solution: {
      tr: "Ortak navigasyon ve veri ilişkileri üzerine kurulan modüler bir ürün yapısı oluşturdum. Dashboard genel görünümü sağlıyor; ayrıntılı görev, proje, müşteri ve finans akışları kendi alanlarında ilerliyor. Yapay zekâ ve müşteri portalı da bu çekirdeğin üzerine kontrollü yetenekler olarak ekleniyor.",
      en: "I built a modular product structure around shared navigation and data relationships. The dashboard provides the overview, while detailed task, project, client, and finance workflows stay inside their own domains. AI and the client portal are added as controlled capabilities on top of that core.",
    },
    results: [
      {
        value: "4",
        label: { tr: "Birleşik iş alanı", en: "Unified business domains" },
        description: {
          tr: "Görev/proje yönetimi, CRM, finans ve müşteri görünürlüğü tek üründe buluşuyor.",
          en: "Task and project management, CRM, finance, and client visibility meet in one product.",
        },
      },
      {
        value: "1",
        label: { tr: "Kontrollü çalışma alanı", en: "Controlled workspace" },
        description: {
          tr: "Self-hosted yaklaşım, işletme verisini kullanıcının yönettiği ortamda tutuyor.",
          en: "The self-hosted model keeps business data in an environment controlled by the user.",
        },
      },
      {
        value: "AI",
        label: { tr: "Sağlayıcı seçme özgürlüğü", en: "Provider choice" },
        description: {
          tr: "Sorgulama ve özetleme özellikleri tek bir yapay zekâ sağlayıcısına kilitlenmiyor.",
          en: "Query and summarization capabilities are not locked to a single AI provider.",
        },
      },
    ],
    metricsNote: {
      tr: "Neta bağımsız ve öğrenme odaklı bir side project. Henüz doğrulanmış kullanıcı, gelir veya dönüşüm metriği paylaşmıyorum; bu bölüm ürünün teslim edilen kapsamını gösteriyor.",
      en: "Neta is an independent, learning-focused side project. I am not publishing unverified user, revenue, or conversion metrics; this section describes the delivered product scope.",
    },
    screenshotAlt: {
      tr: "Take Neta ürün önizlemesi",
      en: "Take Neta product preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/take-neta/dashboard.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Take Neta birleşik işletme dashboard'u",
          en: "Take Neta unified business dashboard",
        },
        caption: {
          tr: "Finans, projeler, görevler ve kişisel göstergeleri tek bakışta sunan ana dashboard.",
          en: "The main dashboard presents finance, projects, tasks, and personal indicators at a glance.",
        },
      },
      {
        src: "/projects/case-studies/take-neta/clients.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Take Neta müşteri CRM ve satış hattı görünümü",
          en: "Take Neta client CRM and pipeline view",
        },
        caption: {
          tr: "Potansiyel müşterileri, takip durumlarını ve kayıtlı geliri bir araya getiren CRM alanı.",
          en: "The CRM workspace combines leads, follow-up states, and recorded revenue.",
        },
      },
    ],
    sourceNote: {
      tr: "Neta'nın kaynak kodu GitHub üzerinde açık olarak incelenebilir.",
      en: "Neta's source code is publicly available on GitHub.",
    },
  },
  {
    slug: "ohhike",
    projectId: "ohhike",
    image: "/projects/ohhike.png",
    liveUrl: "https://www.ohhike.com",
    sourceUrl: "https://github.com/poyrazavsever/ohhike-mono",
    applicationCategory: "HealthApplication",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Express.js",
      "Better Auth",
      "SQLite",
      "Drizzle ORM",
      "pnpm",
      "Turborepo",
      "Docker Compose",
      "nginx",
      "Dokploy",
    ],
    title: { tr: "OhHike", en: "OhHike" },
    eyebrow: {
      tr: "Bağımsız ürün vaka çalışması",
      en: "Independent product case study",
    },
    summary: {
      tr: "Günün büyük bölümünü masa başında geçiren geliştiriciler için aktivite, haftalık sağlık planı ve beslenme takibini kendi sunucusunda bir araya getiren, zorunlu telemetri içermeyen self-hosted uygulama.",
      en: "A self-hosted application for desk-bound developers that brings activity, weekly health planning, and nutrition tracking together without mandatory telemetry.",
    },
    role: {
      tr: "Ürün tasarımcısı ve full-stack geliştirici",
      en: "Product designer and full-stack developer",
    },
    team: {
      tr: "Tek başıma geliştirdiğim side project",
      en: "Solo side project",
    },
    context: {
      tr: "Öğrenme ve mimari deneme projesi",
      en: "Learning and architecture exploration project",
    },
    overview: {
      tr: [
        "OhHike; yürüyüş, koşu ve antrenman kayıtlarını haftalık sağlık planı, beslenme ve kalori takibiyle birleştiriyor. Türk yemek kataloğu ve porsiyon bazlı kalori hesabı, günlük kullanımın yerel ihtiyaçlara daha uygun olmasını sağlıyor.",
        "Projeyi tek başıma, öğrenme amacıyla geliştirdim. Frontend, backend, kimlik doğrulama, veri modeli, otomatik testler ve production dağıtımı aynı monorepo içinde ele alındı. Çok kullanıcılı yapıda her kullanıcının sağlık verisi izole tutuluyor.",
      ],
      en: [
        "OhHike combines walking, running, and workout logs with weekly health planning, nutrition, and calorie tracking. A Turkish food catalog with portion-based calorie calculation makes daily use more relevant to local needs.",
        "I built the project alone as a learning exercise. Frontend, backend, authentication, data modeling, automated tests, and production deployment are handled in the same monorepo. Each user's health data remains isolated in the multi-user system.",
      ],
    },
    problem: {
      tr: "Masa başında çalışan geliştiricilerin hareket, beslenme ve haftalık hedefleri çoğu zaman farklı uygulamalara dağılıyor. Bu araçlar gereğinden büyük olabilir, kişisel veriyi üçüncü taraf sistemlere taşıyabilir veya yerel beslenme alışkanlıklarına yeterince uymayabilir.",
      en: "Desk-bound developers often spread movement, nutrition, and weekly goals across several applications. Those tools may be oversized, send personal data to third-party systems, or fail to reflect local nutrition habits.",
    },
    constraints: {
      tr: [
        "Sağlık ve aktivite verilerinde kullanıcı bazlı kesin veri izolasyonu",
        "Zorunlu telemetri olmadan self-hosted ve yönetilebilir çalışma",
        "Tek geliştiricinin sürdürebileceği modüler backend sınırları",
        "Mock API yerine gerçek Express servisleri ve geçici SQLite veritabanlarıyla güvenilir testler",
        "Frontend, API ve deployment parçalarını tek monorepo içinde tutarlı biçimde yönetmek",
        "Türk yemekleri için porsiyon bazlı, günlük kullanıma uygun kalori girişi",
      ],
      en: [
        "Strict per-user isolation for health and activity data",
        "A manageable self-hosted runtime without mandatory telemetry",
        "Modular backend boundaries sustainable by one developer",
        "Reliable tests using real Express services and temporary SQLite databases instead of mocked APIs",
        "Consistent management of frontend, API, and deployment pieces in one monorepo",
        "Practical portion-based calorie entry for Turkish foods",
      ],
    },
    decisions: [
      {
        title: {
          tr: "pnpm ve Turborepo ile monorepo",
          en: "A pnpm and Turborepo monorepo",
        },
        description: {
          tr: "React/Vite frontend ile Express backend aynı çalışma alanında yönetiliyor. Paylaşılan geliştirme komutları ve paket sınırları, tek kişiyle uçtan uca ilerlemeyi kolaylaştırıyor.",
          en: "The React/Vite frontend and Express backend live in the same workspace. Shared development commands and package boundaries make end-to-end ownership practical for one developer.",
        },
      },
      {
        title: {
          tr: "Backend'de modüler monolit",
          en: "A modular monolith backend",
        },
        description: {
          tr: "Express.js, Better Auth, SQLite ve Drizzle ORM üzerinde özellik alanları ayrıştırıldı. Dağıtım basit kalırken domain sınırları büyümeye hazır tutuluyor.",
          en: "Feature domains are separated on top of Express.js, Better Auth, SQLite, and Drizzle ORM. Deployment stays simple while domain boundaries remain ready to grow.",
        },
      },
      {
        title: {
          tr: "Mock yerine gerçek servis testi",
          en: "Real service tests instead of API mocks",
        },
        description: {
          tr: "Otomatik testler gerçek Express servislerini ve her koşuda oluşturulan geçici SQLite veritabanlarını kullanıyor. Böylece route, servis ve veri erişimi birlikte doğrulanıyor.",
          en: "Automated tests use real Express services and temporary SQLite databases created per run. Routes, services, and data access are verified together.",
        },
      },
      {
        title: {
          tr: "Tekrarlanabilir self-hosted dağıtım",
          en: "Repeatable self-hosted deployment",
        },
        description: {
          tr: "Production sistemi Docker Compose, nginx ve Dokploy üzerinden çalışıyor. Uygulama bileşenleri ve reverse proxy davranışı tanımlı bir dağıtım akışında tutuluyor.",
          en: "The production system runs through Docker Compose, nginx, and Dokploy. Application components and reverse-proxy behavior remain in a defined deployment workflow.",
        },
      },
    ],
    designProcess: {
      tr: "Arayüz, günlük kayıt yükünü azaltmaya odaklanıyor: hızlı aktivite ve öğün girişi, haftalık plan üzerinden yön bulma ve ilerlemeyi tek ekranda okuyabilme. Açık ve koyu tema aynı bilgi hiyerarşisini koruyor.",
      en: "The interface focuses on reducing the burden of daily logging: quick activity and meal entry, orientation through a weekly plan, and readable progress in one place. Light and dark themes preserve the same information hierarchy.",
    },
    designSteps: {
      tr: [
        "Masa başı çalışan bir geliştiricinin günlük kayıt ihtiyaçlarını belirleme",
        "Aktivite, plan ve beslenmeyi aynı haftalık bağlamda birleştirme",
        "Porsiyon bazlı Türk yemek kataloğuyla veri girişini hızlandırma",
        "Açık/koyu temada aynı erişilebilir hiyerarşiyi koruma",
      ],
      en: [
        "Identify the daily logging needs of a desk-bound developer",
        "Unify activity, planning, and nutrition in the same weekly context",
        "Speed up entry with a portion-based Turkish food catalog",
        "Preserve the same accessible hierarchy in light and dark themes",
      ],
    },
    challenge: {
      tr: "En zor teknik konu, çok kullanıcılı bir sağlık uygulamasında veri sahipliğini her akışta korurken testleri gerçek sisteme yakın ve hızlı tutmaktı. Sadece endpoint seviyesinde kontrol yeterli değildi; veri erişiminin ve servis davranışının birlikte doğrulanması gerekiyordu.",
      en: "The hardest technical problem was preserving data ownership across every workflow in a multi-user health application while keeping tests fast and close to the real system. Endpoint checks alone were not enough; data access and service behavior had to be verified together.",
    },
    solution: {
      tr: "Kullanıcı sahipliği kimlik doğrulama ve veri erişimi sınırlarına taşındı; modüller yalnızca aktif kullanıcı bağlamındaki verilere erişecek şekilde kurgulandı. Entegrasyon testleri gerçek Express servislerini geçici SQLite veritabanlarıyla çalıştırarak izolasyonu ve davranışı aynı senaryoda sınadı.",
      en: "User ownership was carried into authentication and data-access boundaries, and modules were designed to access data only in the active user's context. Integration tests run real Express services against temporary SQLite databases, exercising isolation and behavior in the same scenario.",
    },
    results: [
      {
        value: "3",
        label: { tr: "Aktivite türü", en: "Activity types" },
        description: {
          tr: "Yürüyüş, koşu ve antrenman kayıtları ortak sağlık geçmişinde tutuluyor.",
          en: "Walking, running, and workout logs live in one health history.",
        },
      },
      {
        value: "Multi-user",
        label: { tr: "İzole kişisel veri", en: "Isolated personal data" },
        description: {
          tr: "Her kullanıcı yalnızca kendi aktivite, plan ve beslenme verisiyle çalışıyor.",
          en: "Each user works only with their own activity, planning, and nutrition data.",
        },
      },
      {
        value: "0",
        label: { tr: "Zorunlu telemetri", en: "Mandatory telemetry" },
        description: {
          tr: "Self-hosted kullanımda izleme servisi zorunlu tutulmuyor.",
          en: "No tracking service is required for self-hosted use.",
        },
      },
    ],
    metricsNote: {
      tr: "OhHike tek başıma geliştirdiğim öğrenme odaklı bir side project. Kullanıcı, gelir veya sağlık sonucu gibi doğrulanmamış metrikler yerine ürün ve mimari kapsamını paylaşıyorum.",
      en: "OhHike is a learning-focused side project that I built alone. I describe product and architecture scope instead of presenting unverified user, revenue, or health outcome metrics.",
    },
    screenshotAlt: {
      tr: "OhHike sağlık ve aktivite takip uygulaması önizlemesi",
      en: "OhHike health and activity tracking application preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/ohhike/marketing-site.webp",
        width: 1660,
        height: 5212,
        alt: {
          tr: "OhHike tanıtım sayfasının tam ekran görünümü",
          en: "Full-page view of the OhHike marketing site",
        },
        caption: {
          tr: "OhHike'ın geliştiricilere odaklanan self-hosted sağlık takip yaklaşımını anlatan tanıtım sayfası.",
          en: "The marketing site explains OhHike's self-hosted health tracking approach for developers.",
        },
      },
      {
        src: "/projects/case-studies/ohhike/today.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "OhHike günlük aktivite ve plan ekranı",
          en: "OhHike daily activity and plan screen",
        },
        caption: {
          tr: "Günün planını, aktivite süresini ve mesafeyi tek ekranda toplayan günlük alan.",
          en: "The daily workspace combines the day's plan, activity duration, and distance.",
        },
      },
      {
        src: "/projects/case-studies/ohhike/nutrition.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "OhHike porsiyon bazlı beslenme kayıt ekranı",
          en: "OhHike portion-based nutrition logging screen",
        },
        caption: {
          tr: "Türk yemek kataloğunda arama ve porsiyon miktarına göre kalori hesaplama akışı.",
          en: "The flow for searching the Turkish food catalog and calculating calories by portion size.",
        },
      },
    ],
    sourceNote: {
      tr: "OhHike monorepo kaynak kodu GitHub üzerinde açık olarak incelenebilir.",
      en: "OhHike's monorepo source code is publicly available on GitHub.",
    },
  },
];

function localizeDefinition(
  definition: ProjectCaseStudyDefinition,
  locale: ProjectCaseStudyLocale,
): ProjectCaseStudy {
  return {
    ...definition,
    locale,
    title: definition.title[locale],
    eyebrow: definition.eyebrow[locale],
    summary: definition.summary[locale],
    role: definition.role[locale],
    team: definition.team[locale],
    context: definition.context[locale],
    overview: definition.overview[locale],
    problem: definition.problem[locale],
    constraints: definition.constraints[locale],
    decisions: definition.decisions.map((decision) => ({
      title: decision.title[locale],
      description: decision.description[locale],
    })),
    designProcess: definition.designProcess[locale],
    designSteps: definition.designSteps[locale],
    challenge: definition.challenge[locale],
    solution: definition.solution[locale],
    results: definition.results.map((result) => ({
      value: result.value,
      label: result.label[locale],
      description: result.description[locale],
    })),
    metricsNote: definition.metricsNote[locale],
    screenshotAlt: definition.screenshotAlt[locale],
    screenshots: definition.screenshots.map((screenshot) => ({
      src: screenshot.src,
      width: screenshot.width,
      height: screenshot.height,
      alt: screenshot.alt[locale],
      caption: screenshot.caption[locale],
    })),
    sourceNote: definition.sourceNote[locale],
  };
}

export const PROJECT_CASE_STUDY_SLUGS = PROJECT_CASE_STUDIES.map(
  (project) => project.slug,
);

export function getProjectCaseStudy(
  slug: string,
  locale: ProjectCaseStudyLocale,
) {
  const project = PROJECT_CASE_STUDIES.find((item) => item.slug === slug);
  return project ? localizeDefinition(project, locale) : undefined;
}

export function listProjectCaseStudies(locale: ProjectCaseStudyLocale) {
  return PROJECT_CASE_STUDIES.map((project) =>
    localizeDefinition(project, locale),
  );
}
