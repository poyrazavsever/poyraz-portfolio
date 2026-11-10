import { TRACKED_EXTERNAL_HREFS } from "@/lib/links";

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
    liveUrl: TRACKED_EXTERNAL_HREFS.ostim,
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
    liveUrl: TRACKED_EXTERNAL_HREFS.ostimEmployment,
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
    liveUrl: TRACKED_EXTERNAL_HREFS.targiz,
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
    liveUrl: TRACKED_EXTERNAL_HREFS.neta,
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
    liveUrl: TRACKED_EXTERNAL_HREFS.ohhike,
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
  {
    slug: "commit-kingdom",
    projectId: "commit-kingdom",
    image: "/projects/commitkingdom.png",
    liveUrl: "https://commitkingdom.com",
    applicationCategory: "GameApplication",
    technologies: [
      "React Native",
      "React Native Web",
      ".NET 10",
      "EF Core",
      "PostgreSQL",
      "Angular",
      "Astro",
      "Electron",
      "Go",
      "VS Code Extension API",
      "RevenueCat",
      "Docker",
      "Cloudflare",
    ],
    title: { tr: "Commit Kingdom", en: "Commit Kingdom" },
    eyebrow: {
      tr: "Bağımsız ürün vaka çalışması",
      en: "Independent product case study",
    },
    summary: {
      tr: "Editörde doğrulanan kodlama emeğini enerji, XP ve altına dönüştüren; oyuncunun bu kaynaklarla kulesini büyütüp ordusunu kurduğu ve ortak haritada sefere çıktığı, geliştiriciler için 2D strateji/RPG oyunu.",
      en: "A 2D strategy/RPG game for developers that turns coding effort verified in the editor into energy, XP, and gold, which players spend growing their tower, training an army, and marching on a shared map.",
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
      tr: "Kapalı kaynak ticari side project",
      en: "Closed-source commercial side project",
    },
    overview: {
      tr: [
        "Commit Kingdom, kişisel bir planlama uygulaması olarak başladı. ‘Yaptım’ demeye dayalı ödüllerin adil olmadığını, fotoğrafla kanıtlamanın ise angarya olduğunu gördüğümde kitleyi geliştiricilere daralttım: geliştiricinin emeği editörden, ek zahmet olmadan ölçülebiliyor.",
        "Ürünü fikirden oyun tasarımına, editör eklentilerinden backend'e, mağaza hazırlığından ödeme altyapısına kadar tek başıma geliştiriyorum. Oyun kod yazmanın yerine geçmiyor; yazılan kod oyunu mümkün kılıyor.",
      ],
      en: [
        "Commit Kingdom started as a personal planning app. When I saw that rewards based on saying ‘I did it’ were unfair and photo proof was a chore, I narrowed the audience to developers: a developer's effort can be measured straight from the editor with no extra work.",
        "I build the product alone, from concept and game design to editor plugins, backend, store preparation, and billing. The game does not replace writing code; the code you write makes the game possible.",
      ],
    },
    problem: {
      tr: "Oyunlaştırılmış verimlilik uygulamaları çoğunlukla kullanıcının beyanına güveniyor; bu da ödülleri anlamsızlaştırıyor. Geliştiriciler için gerçek emeği gizliliği koruyarak, hile yapılamayacak şekilde ve AI destekli kodlamayı adil biçimde hesaba katarak ölçmek gerekiyordu.",
      en: "Gamified productivity apps mostly trust user self-reports, which makes rewards meaningless. For developers, real effort had to be measured while preserving privacy, resisting cheating, and fairly accounting for AI-assisted coding.",
    },
    constraints: {
      tr: [
        "Kaynak kod, dosya yolu veya branch bilgisi sunucuya hiç gönderilmeden emek ölçmek",
        "VS Code, Cursor, Windsurf, JetBrains IDE'leri ve Visual Studio gibi farklı editörleri desteklemek",
        "AI destekli kodlamayı yok saymadan insan emeğinden ayırmak",
        "Tek geliştiriciyle 1 Ocak 2027'de Android, iOS ve webde birlikte yayına çıkmak",
        "Ücretli CI ve gereksiz altyapı maliyeti olmadan çalışmak",
      ],
      en: [
        "Measure effort without ever sending source code, file paths, or branch names to the server",
        "Support many editors, including VS Code, Cursor, Windsurf, JetBrains IDEs, and Visual Studio",
        "Separate AI-assisted coding from human effort without ignoring it",
        "Launch on Android, iOS, and the web together on January 1, 2027, as a solo developer",
        "Operate without paid CI or unnecessary infrastructure costs",
      ],
    },
    decisions: [
      {
        title: {
          tr: "WakaTime uyumlu protokol, kendi sunucum",
          en: "A WakaTime-compatible protocol with my own server",
        },
        description: {
          tr: "Tracker, wakatime-cli'nin Go fork'u üzerine kurulu; .NET backend'deki Tracking modülü WakaTime uyumlu heartbeat'leri kabul ediyor. Böylece mevcut editör eklenti ekosistemi yeniden kullanılırken veri tamamen bende kalıyor. Proje adları cihazda HMAC ile hash'leniyor.",
          en: "The Tracker builds on a Go fork of wakatime-cli, and the Tracking module in the .NET backend accepts WakaTime-compatible heartbeats. This reuses the existing editor plugin ecosystem while keeping data fully in-house. Project names are HMAC-hashed on the device.",
        },
      },
      {
        title: {
          tr: "AI destekli kodu ağırlıklandırmak",
          en: "Weighting AI-assisted code",
        },
        description: {
          tr: "Beş dakikalık dilimlerde AI satır değişikliği insanınkini geçtiğinde dilim ‘AI destekli’ sayılıyor; insan emeği ×1.0, AI destekli emek ×0.5 ağırlıkla ve günlük üst sınırla enerjiye dönüşüyor.",
          en: "A five-minute slice counts as ‘AI-assisted’ when AI line changes exceed human ones; human effort converts to energy at ×1.0 and AI-assisted effort at ×0.5, with a daily cap.",
        },
      },
      {
        title: {
          tr: "Cezalandırmayan hile tespiti",
          en: "Anti-cheat that does not punish",
        },
        description: {
          tr: "Anomali servisi uzun gün, uzun hafta, düzenli aralık ve paylaşılan makine sinyallerini işaretliyor. İşaretli günler ödülü yine alıyor; yalnızca PvP baskınları admin incelemesine kadar duruyor ve ret durumunda ödüller ledger kayıtlarıyla geri alınıyor.",
          en: "An anomaly service flags long-day, long-week, regular-interval, and shared-machine signals. Flagged days still earn rewards; only PvP raids pause until admin review, and rewards are reversed through ledger entries if rejected.",
        },
      },
      {
        title: {
          tr: "Mikroservis yerine modüler monolit",
          en: "A modular monolith instead of microservices",
        },
        description: {
          tr: ".NET 10 backend; Tracking, Economy, Game, Billing, Reports gibi 13 modülden oluşuyor. MVP'de Redis veya kuyruk yok; transactional outbox ve host içi worker'lar yeterli.",
          en: "The .NET 10 backend consists of 13 modules such as Tracking, Economy, Game, Billing, and Reports. The MVP has no Redis or message queue; a transactional outbox and in-host workers are enough.",
        },
      },
      {
        title: {
          tr: "Gücü satmayan Plus aboneliği",
          en: "A Plus subscription that never sells power",
        },
        description: {
          tr: "Kingdom Plus; ayrıntılı kod raporları, paylaşılabilir kartlar ve GitHub README kartları sunuyor. Enerji ve asker asla satılmıyor; ödemeler RevenueCat ve sunucu taraflı entitlement ledger'ı ile yönetiliyor.",
          en: "Kingdom Plus offers detailed code reports, shareable cards, and GitHub README cards. Energy and soldiers are never sold; payments run through RevenueCat and a server-side entitlement ledger.",
        },
      },
    ],
    designProcess: {
      tr: "Tüm ürün, mimari ve ekonomi kararları Obsidian vault'unda ADR olarak tutuluyor. Kapsam teslim tarihine göre bilinçli olarak daraltıldı: Phaser tabanlı platform oyunu yerine kule ve ortak strateji haritasına odaklanıldı.",
      en: "Every product, architecture, and economy decision is recorded as an ADR in an Obsidian vault. Scope was deliberately narrowed to fit the launch date: instead of a Phaser-based platformer, the game focuses on the tower and a shared strategy map.",
    },
    designSteps: {
      tr: [
        "Doğrulanabilir emek fikrini geliştirici kitlesine pivot ederek netleştirme",
        "Tracker → heartbeat → enerji → oyun ekonomisi zincirini uçtan uca tasarlama",
        "Gerçek bir Windows + VS Code kurulumunda 15 dakikalık kod hedefini uçtan uca doğrulama",
        "Masaüstü uygulama, editör eklentileri, mobil uygulama ve mağaza süreçlerini aşamalı yayına hazırlama",
      ],
      en: [
        "Clarify the verifiable-effort idea by pivoting to a developer audience",
        "Design the Tracker → heartbeat → energy → game economy chain end to end",
        "Validate a 15-minute coding goal end to end on a real Windows + VS Code setup",
        "Prepare the desktop app, editor plugins, mobile app, and store processes for a staged release",
      ],
    },
    challenge: {
      tr: "Emek ölçümü hem adil hem de pratik olmak zorundaydı. Büyük AI araç günlüklerine sahip bir makinede ilk tarama sekiz dakikayı aştı; kullanıcı yokken çalışan AI ajanları ‘insan’ dakikası kazanabiliyordu; uzun ama dürüst çalışma günleri de hile gibi görünebiliyordu.",
      en: "Effort measurement had to be both fair and practical. On a machine with large AI tool logs, the first scan took over eight minutes; AI agents running while the user was away could earn ‘human’ minutes; and long but honest work days could look like cheating.",
    },
    solution: {
      tr: "Taramaya zaman ve boyut sınırı koyup CLI'ı editörü bloklamadan arka planda çalıştırdım. Satır değişikliği olmayan ve çoğunluğu AI kodlama heartbeat'i olan dilimleri AI destekli saydım. Hile tespitini ödülü kesmek yerine yalnızca rekabetçi etkiyi askıya alan ve geri alınabilir ledger kayıtlarına dayanan bir modele çevirdim.",
      en: "I added time and size limits to the scan and ran the CLI in the background without blocking the editor. Slices with no line changes that are mostly AI-coding heartbeats count as AI-assisted. Anti-cheat became a model that suspends only competitive impact instead of withholding rewards, backed by reversible ledger entries.",
    },
    results: [
      {
        value: "13",
        label: { tr: "Backend modülü", en: "Backend modules" },
        description: {
          tr: "Tracking'den Economy ve Billing'e kadar modüler monolit içinde ayrışan alanlar.",
          en: "Domains separated within the modular monolith, from Tracking to Economy and Billing.",
        },
      },
      {
        value: "4",
        label: { tr: "Editör ailesi", en: "Editor families" },
        description: {
          tr: "VS Code tabanlı editörler, JetBrains IDE'leri, Visual Studio ve masaüstü uygulaması üzerinden terminal AI ajanları.",
          en: "VS Code-based editors, JetBrains IDEs, Visual Studio, and terminal AI agents through the desktop app.",
        },
      },
      {
        value: "3",
        label: { tr: "Lansman platformu", en: "Launch platforms" },
        description: {
          tr: "Android, iOS ve web; 1 Ocak 2027'de aynı React Native kod tabanından.",
          en: "Android, iOS, and the web from the same React Native codebase on January 1, 2027.",
        },
      },
    ],
    metricsNote: {
      tr: "Commit Kingdom henüz lansman öncesi aşamada. Doğrulanmış kullanıcı veya gelir metriği paylaşmıyorum; bu bölüm teslim edilen kapsamı gösteriyor.",
      en: "Commit Kingdom is still pre-launch. I am not publishing unverified user or revenue metrics; this section describes the delivered scope.",
    },
    screenshotAlt: {
      tr: "Commit Kingdom ürün önizlemesi",
      en: "Commit Kingdom product preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/commit-kingdom/marketing-site.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Commit Kingdom web sitesi ana sayfası",
          en: "Commit Kingdom website homepage",
        },
        caption: {
          tr: "Yazılan kodun krallığın gücüne dönüştüğünü anlatan ana sayfa.",
          en: "The homepage explains how the code you write becomes your kingdom's power.",
        },
      },
      {
        src: "/projects/case-studies/commit-kingdom/how-it-works.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Commit Kingdom nasıl çalışır ve Kingdom Plus bölümü",
          en: "Commit Kingdom how-it-works and Kingdom Plus section",
        },
        caption: {
          tr: "Kodla, güce dönüştür, krallığını kur döngüsü ve Kingdom Plus aboneliği.",
          en: "The code, convert to power, build your kingdom loop and the Kingdom Plus subscription.",
        },
      },
    ],
    sourceNote: {
      tr: "Commit Kingdom ticari bir ürün olduğu için oyun ve backend kodu kapalıdır; editör entegrasyonlarını sağlayan Tracker ayrı bir açık kaynak depoda geliştiriliyor.",
      en: "Commit Kingdom is a commercial product, so the game and backend code are private; the Tracker that powers editor integrations is developed in a separate open-source repository.",
    },
  },
  {
    slug: "tudi-daily",
    projectId: "tudi-daily",
    image: "/projects/tudidaily.png",
    liveUrl: "https://tudidaily.com",
    applicationCategory: "ProductivityApplication",
    technologies: [
      "React Native",
      "React Native Web",
      "Reanimated",
      "react-native-svg",
      "SQLite",
      "IndexedDB",
      ".NET 10",
      "EF Core",
      "PostgreSQL",
      "Angular",
      "Astro",
      "Cloudflare Workers",
      "Cloudflare D1",
    ],
    title: { tr: "Tudi Daily", en: "Tudi Daily" },
    eyebrow: {
      tr: "Ekip ürünü vaka çalışması",
      en: "Team product case study",
    },
    summary: {
      tr: "Ajanda, kişisel defterler ve serbest düzenlenebilir panoyu tablet kalemi odaklı tek bir çalışma alanında birleştiren; iOS, Android ve webde aynı kod tabanından çalışan, çevrim dışı öncelikli dijital kırtasiye ürünü.",
      en: "A pen-first, offline-first digital stationery product that combines a planner, personal notebooks, and a free-form board in one workspace, running on iOS, Android, and the web from a single codebase.",
    },
    role: {
      tr: "Proje yöneticisi, teknik karar sahibi ve code reviewer",
      en: "Project manager, technical decision owner, and code reviewer",
    },
    team: {
      tr: "Aslı Sena Mercimek ve Merve Safa Güneş ile üç kişilik ekip",
      en: "Three-person team with Aslı Sena Mercimek and Merve Safa Güneş",
    },
    context: {
      tr: "Kapalı kaynak ticari ürün",
      en: "Closed-source commercial product",
    },
    overview: {
      tr: [
        "Tudi Daily, tablet ve dijital kalem kullanan öğrenciler için ‘kutudan çıktığı gibi çalışan, sonra kişiselleştirilebilen’ bir dijital kırtasiye deneyimi olarak tasarlandı. Ajanda tarihli bir defter gibi davranıyor; kapak, sayfa çevirme ve kalemle yazma ürünün merkezinde duruyor.",
        "Ekipte rolüm ağırlıklı olarak proje yönetimi, görev dağılımı ve review süreçleriydi. Ürün ve mimari kararlarını kayda geçirdim, işi modül bazlı issue'lara bölüp ekip arkadaşlarımın uzmanlıklarına göre dağıttım, her PR'ı review edip merge ve sürüm sorumluluğunu üstlendim.",
      ],
      en: [
        "Tudi Daily is designed as a digital stationery experience for students who use tablets and digital pens, one that works out of the box and can be personalized later. The planner behaves like a dated notebook; covers, page turns, and pen input sit at the heart of the product.",
        "My role on the team centered on project management, task distribution, and review processes. I recorded product and architecture decisions, split the work into module-level issues assigned by expertise, reviewed every pull request, and owned merges and releases.",
      ],
    },
    problem: {
      tr: "Tablet kullanıcıları planlama, not alma ve fikir toplama için genellikle birbirinden kopuk uygulamalar kullanıyor; bu araçların çoğu ya kalemle yazmayı ikinci planda bırakıyor ya da bağlantı olmadan güvenilir çalışmıyor.",
      en: "Tablet users usually rely on disconnected apps for planning, note-taking, and collecting ideas; most of them either treat pen input as an afterthought or fail to work reliably without a connection.",
    },
    constraints: {
      tr: [
        "Tek React Native kod tabanıyla iOS, Android ve web desteği",
        "Kalem, dokunma ve fare girdisini platformlar arasında tutarlı hale getirmek; avuç içi temasını reddetmek",
        "Bağlantı yokken veri kaybı olmadan çalışan çevrim dışı öncelikli depolama",
        "Türkçe ve İngilizce'nin ilk günden birlikte yayına çıkması",
        "Üç kişilik ekipte paralel çalışmayı bozmayan, ücretli CI gerektirmeyen bir süreç",
      ],
      en: [
        "iOS, Android, and web support from one React Native codebase",
        "Consistent pen, touch, and mouse input across platforms, with palm rejection",
        "Offline-first storage that loses no data without a connection",
        "Turkish and English shipping together from day one",
        "A process that keeps a three-person team working in parallel without paid CI",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Expo yerine bare React Native",
          en: "Bare React Native instead of Expo",
        },
        description: {
          tr: "Native host'ları doğrudan sahiplenmek; mürekkep çizimi ve SQLite gibi native işleri kolaylaştırırken ücretli build servislerine bağımlılığı ortadan kaldırdı.",
          en: "Owning the native hosts directly simplified native work such as ink rendering and SQLite while removing dependence on paid build services.",
        },
      },
      {
        title: {
          tr: "Skia'dan önce SVG ile mürekkep",
          en: "SVG ink before Skia",
        },
        description: {
          tr: "Kalem çizgileri, orta nokta Bézier yumuşatmasıyla SVG path'lerine dönüştürülüyor. Üç platformda zaten çalışan bu yaklaşım, NDK ve çapraz derleme riskini MVP sonrasına bıraktı; 1.000 çizgi 50 ms bütçenin çok altında işleniyor.",
          en: "Pen strokes are converted into SVG paths with midpoint Bézier smoothing. This approach already worked on all three platforms and deferred NDK and cross-compilation risk until after the MVP; 1,000 strokes render well under a 50 ms budget.",
        },
      },
      {
        title: {
          tr: "CRDT yerine outbox ile senkronizasyon",
          en: "Outbox-based sync instead of CRDTs",
        },
        description: {
          tr: "Tek kullanıcılı MVP için sıra numaralı ve idempotency anahtarlı bir sync outbox ile tombstone silmeler seçildi. SQLite, IndexedDB ve bellek adaptörleri aynı sözleşme testlerinden geçiyor.",
          en: "For a single-user MVP we chose a sync outbox with sequence numbers, idempotency keys, and tombstone deletes. SQLite, IndexedDB, and in-memory adapters all pass the same contract test suite.",
        },
      },
      {
        title: {
          tr: "Modül başına şema içeren modüler monolit",
          en: "A modular monolith with one schema per module",
        },
        description: {
          tr: ".NET 10 backend'de her modülün kendi PostgreSQL şeması ve DbContext'i var; böylece ekip üyeleri birbirinin migration'larıyla çakışmadan paralel çalışabiliyor.",
          en: "In the .NET 10 backend each module has its own PostgreSQL schema and DbContext, so teammates can work in parallel without colliding on migrations.",
        },
      },
      {
        title: {
          tr: "Waitlist için Worker + D1",
          en: "Worker + D1 for the waitlist",
        },
        description: {
          tr: "Ürün hazır olmadan backend operasyonu taşımamak için Astro sitesi Cloudflare Worker üzerinde, waitlist ise Turnstile, rate limit ve onay e-postasıyla D1'de çalışıyor.",
          en: "To avoid running backend operations before the product exists, the Astro site runs on a Cloudflare Worker and the waitlist lives in D1 with Turnstile, rate limiting, and confirmation emails.",
        },
      },
    ],
    designProcess: {
      tr: "Ürün ve mimari kararları Obsidian vault'unda ADR olarak tutuluyor; kod ile not ayrıştığında iş yarım sayılıyor. Her iş bir modülü uçtan uca kapsayan issue olarak tanımlanıyor, PR şablonu kapsam, doğrulama, erişilebilirlik ve risk/geri dönüş başlıklarını zorunlu kılıyor.",
      en: "Product and architecture decisions live as ADRs in an Obsidian vault; work is not considered done when code and notes diverge. Each task is an issue that covers one module end to end, and the PR template requires scope, verification, accessibility, and risk/rollback sections.",
    },
    designSteps: {
      tr: [
        "İşi modül bazlı issue'lara bölüp efor puanlarıyla ekip arkadaşlarımın uzmanlıklarına göre dağıtma",
        "Her PR'ı kendi worktree'sinde ve ayrı bir PostgreSQL veritabanında çalıştırarak review etme",
        "Review bulgularını tarihli oturum notlarına ve handoff dokümanlarına işleme",
        "PR'daki placeholder görselleri marka arşivinden veya Higgsfield ile gerçek asset'lere çevirip merge etme",
      ],
      en: [
        "Split work into module-level issues with effort points and assign them by teammates' expertise",
        "Review each PR in its own worktree against a separate PostgreSQL database",
        "Record review findings in dated session notes and handoff documents",
        "Replace placeholder images in PRs with real assets from the brand archive or Higgsfield before merging",
      ],
    },
    challenge: {
      tr: "En zor kısım, üç platformda aynı hissi veren bir kalem deneyimini çevrim dışı çalışan bir veri katmanıyla birlikte kurarken üç kişilik ekibin paralel ilerleyebilmesini sağlamaktı. IndexedDB'nin await'ler arasında transaction tutamaması, Reanimated'in web production paketinde çalışmaması ve kimlik akışındaki review bulguları bu sürecin somut örnekleriydi.",
      en: "The hardest part was building a pen experience that feels the same on three platforms, on top of an offline-first data layer, while keeping a three-person team moving in parallel. IndexedDB being unable to hold transactions across awaits, Reanimated not working in the production web bundle, and review findings in the identity flow were concrete examples.",
    },
    solution: {
      tr: "Platform farklarını sözleşme testleriyle güvence altına alınan adaptörlerin arkasına aldık: IndexedDB'de başarısız yazmalar elle geri alınıyor, web animasyonları CSS tabanlı .web.tsx dosyalarına taşındı. Süreç tarafında ücretli CI yerine herkesin push öncesi çalıştırdığı yerel CI'ı, şablonlu PR'ları ve tarihli review oturumlarını kurdum.",
      en: "We put platform differences behind adapters guarded by contract tests: failed IndexedDB writes are rolled back manually, and web animations moved into CSS-based .web.tsx files. On the process side, I set up local CI that everyone runs before pushing instead of paid CI, templated PRs, and dated review sessions.",
    },
    results: [
      {
        value: "3",
        label: { tr: "Platform, tek kod tabanı", en: "Platforms, one codebase" },
        description: {
          tr: "iOS, Android ve web aynı React Native uygulamasından çalışıyor.",
          en: "iOS, Android, and web run from the same React Native app.",
        },
      },
      {
        value: "21.6 ms",
        label: { tr: "1.000 çizgi işleme", en: "Render for 1,000 strokes" },
        description: {
          tr: "SVG tabanlı mürekkep, 50 ms bütçenin çok altında kalıyor.",
          en: "SVG-based ink stays well under the 50 ms budget.",
        },
      },
      {
        value: "TR + EN",
        label: { tr: "Eş zamanlı lansman", en: "Simultaneous launch" },
        description: {
          tr: "Landing sayfası ve waitlist iki dilde canlıda.",
          en: "The landing page and waitlist are live in both languages.",
        },
      },
    ],
    metricsNote: {
      tr: "Tudi Daily henüz waitlist aşamasında. Kullanıcı ve gelir metriği paylaşmıyorum; bu bölüm teslim edilen kapsamı ve ölçülmüş teknik değerleri gösteriyor.",
      en: "Tudi Daily is still in the waitlist stage. I am not publishing user or revenue metrics; this section shows the delivered scope and measured technical values.",
    },
    screenshotAlt: {
      tr: "Tudi Daily ürün önizlemesi",
      en: "Tudi Daily product preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/tudi-daily/marketing-site.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Tudi Daily landing sayfası",
          en: "Tudi Daily landing page",
        },
        caption: {
          tr: "Erken erişim çağrısı ve maskot Tudi ile karşılayan landing sayfası.",
          en: "The landing page greets visitors with the early-access call and the mascot Tudi.",
        },
      },
      {
        src: "/projects/case-studies/tudi-daily/planner.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Tudi Daily ajanda bölümü",
          en: "Tudi Daily planner section",
        },
        caption: {
          tr: "Tarihli ve tarihsiz planlama, görevler ve hızlı notları tanıtan ajanda bölümü.",
          en: "The planner section presents dated and undated planning, tasks, and quick notes.",
        },
      },
      {
        src: "/projects/case-studies/tudi-daily/notebooks.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Tudi Daily defterler bölümü",
          en: "Tudi Daily notebooks section",
        },
        caption: {
          tr: "Kapak, kâğıt türü ve mürekkep seçenekleriyle kişisel defterler.",
          en: "Personal notebooks with cover, paper type, and ink options.",
        },
      },
    ],
    sourceNote: {
      tr: "Tudi Daily ticari bir ürün olduğu için kaynak kodu kapalıdır.",
      en: "Tudi Daily is a commercial product, so its source code is private.",
    },
  },
  {
    slug: "my-akademi-portfolio",
    projectId: "my-akademi-portfolio",
    image: "/projects/my-akademi-portfolio.webp",
    liveUrl: "https://myportfolio.poyrazavsever.com",
    sourceUrl: "https://github.com/poyrazavsever/my-portfolio",
    applicationCategory: "WebApplication",
    technologies: [
      "ASP.NET Core MVC",
      ".NET 10",
      "Entity Framework Core 10",
      "SQL Server",
      "Bootstrap 5.3",
      "SweetAlert2",
      "jQuery Validation",
      "Docker",
      "Cloudflare Tunnel",
      "Higgsfield",
      "ffmpeg",
    ],
    title: {
      tr: "Portfolyo ve Yönetim Paneli",
      en: "Portfolio and Admin Panel",
    },
    eyebrow: {
      tr: "M&Y Akademi bootcamp vaka çalışması",
      en: "M&Y Academy bootcamp case study",
    },
    summary: {
      tr: "M&Y Yazılım Eğitim Akademi 12. Dönem bootcamp'inin ilk projesi olarak geliştirdiğim; ana sayfadaki her bölümün veritabanından geldiği ve tamamının yönetim panelinden düzenlendiği ASP.NET Core MVC portfolyo sitesi.",
      en: "An ASP.NET Core MVC portfolio built as the first project of the M&Y Software Academy 12th-term bootcamp, where every homepage section comes from the database and is fully editable from an admin panel.",
    },
    role: {
      tr: "Full-stack geliştirici ve arayüz tasarımcısı",
      en: "Full-stack developer and interface designer",
    },
    team: {
      tr: "Bireysel bootcamp projesi",
      en: "Individual bootcamp project",
    },
    context: {
      tr: "M&Y Yazılım Eğitim Akademi · 12. Dönem Akşam Grubu · 1. Proje: Portfolyo Case",
      en: "M&Y Software Academy · 12th Term Evening Group · Project 1: Portfolio Case",
    },
    overview: {
      tr: [
        "Case, statik bir portfolyo yerine içeriği tamamen yönetilebilen bir site istiyordu: hero, hakkımda, deneyim, eğitim, yetenekler, projeler, sertifikalar ve iletişim bölümlerinin hepsi veritabanından gelmeli ve admin panelinden düzenlenmeliydi.",
        "Projeyi 12 faz hâlinde ilerlettim; her fazın sonunda neyi neden yaptığımı, karşılaştığım hataları ve çözümlerini öğrenme notlarına yazdım. Sonunda uygulamayı Docker ile kendi sunucumda yayına aldım.",
      ],
      en: [
        "The case asked for a fully manageable site instead of a static portfolio: hero, about, experience, education, skills, projects, certificates, and contact sections all had to come from the database and be editable from an admin panel.",
        "I worked through the project in 12 phases and wrote down what I did, why, and the errors I hit along the way in learning notes. Finally, I shipped the app to my own server with Docker.",
      ],
    },
    problem: {
      tr: "Bir bootcamp case'i kolayca çalışan ama sığ bir CRUD uygulamasına dönüşebilir. Hedefim, case gereksinimlerinin hepsini karşılarken ilişkisel veri, doğrulama, dosya yükleme güvenliği ve yayına hazırlık gibi gerçek bir üründe beklenen ayrıntıları da doğru kurmaktı.",
      en: "A bootcamp case can easily become a shallow CRUD app that merely works. My goal was to meet every case requirement while also getting right the details expected from a real product: relational data, validation, upload security, and production readiness.",
    },
    constraints: {
      tr: [
        "ASP.NET Core MVC, EF Core Code First ve SQL Server ile sınırlı teknoloji seti",
        "Kategori ↔ Proje bire-çok ilişkisi, filtre ve veritabanından gelen dropdown zorunluluğu",
        "Gelen kutusunda mesajın orijinal içeriğinin düzenlenememesi",
        "CV için yalnızca PDF kabul eden, sunucuda güvenli saklanan bir indirme akışı",
        "Projenin migration'lar ve örnek veriyle sıfırdan kurulabilmesi",
      ],
      en: [
        "A technology set limited to ASP.NET Core MVC, EF Core Code First, and SQL Server",
        "A required one-to-many Category ↔ Project relation, filtering, and a database-backed dropdown",
        "Inbox messages whose original content cannot be edited",
        "A PDF-only CV download flow with secure server-side storage",
        "A project that can be set up from scratch with migrations and sample data",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Her bölüm için bir View Component",
          en: "One View Component per section",
        },
        description: {
          tr: "Ana sayfanın her bölümü kendi View Component'i ile veritabanından besleniyor. Pasif kayıtlar sorgu seviyesinde eleniyor; deneyim ve eğitim başlangıç tarihine göre sıralanıyor.",
          en: "Each homepage section is fed from the database by its own View Component. Inactive records are filtered at the query level, and experience and education are ordered by start date.",
        },
      },
      {
        title: {
          tr: "Kategori silmede Cascade yerine Restrict",
          en: "Restrict instead of Cascade on category delete",
        },
        description: {
          tr: "Bir kategori silinince projelerin sessizce kaybolmaması için ilişki Fluent API ile Restrict yapıldı; admin bunun yerine kategoride kaç proje olduğunu anlatan bir mesaj görüyor.",
          en: "The relation was set to Restrict with the Fluent API so projects never silently disappear when a category is deleted; the admin instead sees a message stating how many projects it contains.",
        },
      },
      {
        title: {
          tr: "Dosya yüklemede imza kontrolü",
          en: "Signature checks on uploads",
        },
        description: {
          tr: "Görseller ve CV için uzantı beyaz listesi, boyut sınırı ve magic bytes kontrolü yapılıyor. Dosyalar Guid ile yeniden adlandırılıyor; CV wwwroot dışında saklanıp yalnızca indirme action'ı üzerinden sunuluyor.",
          en: "Images and the CV go through an extension allowlist, a size limit, and magic-byte checks. Files are renamed with a Guid, and the CV is stored outside wwwroot and served only through a download action.",
        },
      },
      {
        title: {
          tr: "Token tabanlı tasarım sistemi",
          en: "A token-based design system",
        },
        description: {
          tr: "Renk, cam yüzey ve tipografi değerleri tek bir design-system.css dosyasında. Bootstrap'ın --bs-* değişkenleri bu token'lara bağlandığı için modal, form ve offcanvas bileşenleri de aynı koyu, mühendislik temalı dili konuşuyor.",
          en: "Color, glass surface, and typography values live in a single design-system.css file. Bootstrap's --bs-* variables are bound to these tokens, so modals, forms, and offcanvas components share the same dark, engineering-themed language.",
        },
      },
      {
        title: {
          tr: "Hash'li admin girişi",
          en: "Hashed admin sign-in",
        },
        description: {
          tr: "Cookie tabanlı oturum, PBKDF2 (210.000 tur) şifre hash'i, sabit zamanlı karşılaştırma ve IP başına dakikada 5 deneme sınırı. Şifrenin kendisi hiçbir yerde tutulmuyor.",
          en: "Cookie-based sessions, PBKDF2 password hashing with 210,000 iterations, constant-time comparison, and a limit of 5 attempts per IP per minute. The password itself is never stored anywhere.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım dilini koyu zemin, mühendislik ızgarası, cam yüzeyler ve tek bir kırmızı vurgu rengi üzerine kurdum. Bölüm ikonlarını Higgsfield ile üretip ffmpeg ile alfa kanallı WebM'e dönüştürdüm; bir Tag Helper önce şeffaf PNG basıyor, destekleyen tarayıcılarda bunu hareketli videoya yükseltiyor.",
      en: "I built the design language on a dark background, an engineering grid, glass surfaces, and a single red accent color. I generated the section icons with Higgsfield and converted them to alpha-channel WebM with ffmpeg; a Tag Helper first renders a transparent PNG and upgrades it to animated video in supporting browsers.",
    },
    designSteps: {
      tr: [
        "Veri modelini tamamlama: tarihler, Data Annotations ve ilişki kuralları",
        "Tasarım sistemi, cam ikon seti ve admin kabuğu",
        "Admin CRUD modülleri, SweetAlert2 ve TempData bildirimleri",
        "Public arayüzün veritabanına bağlanması ve iletişim formu",
        "Gelen kutusu, CV indirme ve dashboard",
        "Sıfırdan kurulum testi, smoke test ve Docker ile yayın",
      ],
      en: [
        "Complete the data model: dates, Data Annotations, and relation rules",
        "Design system, glass icon set, and admin shell",
        "Admin CRUD modules with SweetAlert2 and TempData notifications",
        "Connect the public UI to the database and build the contact form",
        "Inbox, CV download, and dashboard",
        "Fresh-install test, smoke test, and Docker deployment",
      ],
    },
    challenge: {
      tr: "İlk migration, mevcut 320 karakterlik bir görsel URL'si yüzünden kolonu 300 karaktere daraltmaya çalışırken 'String or binary data would be truncated' hatasıyla düştü. Ayrıca projenin yalnızca kendi makinemde değil, yeni klonlayan birinde de sorunsuz kurulduğundan emin olmam gerekiyordu.",
      en: "The first migration failed with 'String or binary data would be truncated' while narrowing a column to 300 characters because an existing image URL was 320 characters long. I also had to make sure the project set up cleanly not just on my machine but for anyone cloning it fresh.",
    },
    solution: {
      tr: "EF Core'un migration'ı transaction içinde çalıştırması sayesinde veritabanı bozulmadı; uygulanmamış migration'ı kaldırıp limitleri mevcut veriye göre yeniden belirledim. Teslimden önce ortam değişkeniyle boş bir test veritabanına bağlanıp 6 migration'ı, tekrar çalıştırılabilir seed'i ve 17 sayfalık smoke testi sıfırdan doğruladım.",
      en: "Because EF Core runs migrations inside a transaction, the database stayed intact; I removed the unapplied migration and set the limits based on existing data. Before delivery, I pointed the app at an empty test database through an environment variable and verified all 6 migrations, the idempotent seed, and a 17-page smoke test from scratch.",
    },
    results: [
      {
        value: "8",
        label: { tr: "Yönetilebilir bölüm", en: "Manageable sections" },
        description: {
          tr: "Hero'dan iletişime kadar ana sayfanın her bölümü admin panelinden düzenleniyor.",
          en: "Every homepage section, from hero to contact, is edited from the admin panel.",
        },
      },
      {
        value: "12",
        label: { tr: "Belgelenmiş faz", en: "Documented phases" },
        description: {
          tr: "Her fazın ne ve neden yapıldığı, hatalar ve çözümleriyle öğrenme notlarında.",
          en: "What was done in each phase and why, with errors and fixes, recorded in learning notes.",
        },
      },
      {
        value: "17",
        label: { tr: "Sayfalık smoke test", en: "Page smoke test" },
        description: {
          tr: "Boş bir veritabanında sıfırdan kurulumdan sonra bütün sayfalar beklenen yanıtı verdi.",
          en: "After a fresh install on an empty database, every page returned the expected response.",
        },
      },
    ],
    metricsNote: {
      tr: "Bu bir eğitim projesi; trafik veya kullanıcı metriği paylaşmıyorum. Bu bölüm case kapsamını ve doğrulama adımlarını gösteriyor.",
      en: "This is a training project, so I am not publishing traffic or user metrics. This section describes the case scope and verification steps.",
    },
    screenshotAlt: {
      tr: "Portfolyo ve yönetim paneli önizlemesi",
      en: "Portfolio and admin panel preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/my-akademi-portfolio/home-projects.webp",
        width: 1440,
        height: 830,
        alt: {
          tr: "Portfolyo sitesinde kategori filtreli projeler bölümü",
          en: "Projects section with category filter on the portfolio site",
        },
        caption: {
          tr: "Veritabanından gelen projeler; kategori filtresi ve arama ile.",
          en: "Projects from the database, with category filtering and search.",
        },
      },
      {
        src: "/projects/case-studies/my-akademi-portfolio/admin-dashboard.webp",
        width: 1440,
        height: 1000,
        alt: {
          tr: "Yönetim paneli dashboard ekranı",
          en: "Admin panel dashboard screen",
        },
        caption: {
          tr: "İstatistik kartları, son mesajlar, son projeler ve kategori grafiği.",
          en: "Stat cards, recent messages, recent projects, and a category chart.",
        },
      },
      {
        src: "/projects/case-studies/my-akademi-portfolio/admin-inbox.webp",
        width: 1440,
        height: 900,
        alt: {
          tr: "Yönetim paneli gelen kutusu ve mesaj detayı",
          en: "Admin panel inbox and message detail",
        },
        caption: {
          tr: "Okundu takibi, arama ve modal ile mesaj detayı.",
          en: "Read tracking, search, and message detail in a modal.",
        },
      },
      {
        src: "/projects/case-studies/my-akademi-portfolio/admin-project-form.webp",
        width: 1440,
        height: 1000,
        alt: {
          tr: "Yönetim panelinde proje ekleme formu",
          en: "Project form in the admin panel",
        },
        caption: {
          tr: "Veritabanından gelen kategori dropdown'u ve kapak görseli yükleme.",
          en: "A database-backed category dropdown and cover image upload.",
        },
      },
    ],
    sourceNote: {
      tr: "Projenin kaynak kodu, kurulum adımları ve öğrenme notları GitHub'da açık.",
      en: "The project's source code, setup steps, and learning notes are public on GitHub.",
    },
  },
  {
    slug: "bowl-bar",
    projectId: "bowl-bar",
    image: "/projects/bowlbar.png",
    liveUrl: "https://bowlbar.com.tr",
    applicationCategory: "BusinessApplication",
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "GSAP",
      "Lenis",
      "PostgreSQL",
      "Drizzle ORM",
      "Better Auth",
      "Zod",
      "Zustand",
      "Tiptap",
      "Server-Sent Events",
      "Higgsfield",
      "Vitest",
      "Playwright",
      "Docker",
      "Dokploy",
    ],
    title: { tr: "Bowl Bar", en: "Bowl Bar" },
    eyebrow: {
      tr: "Freelance vaka çalışması",
      en: "Freelance case study",
    },
    summary: {
      tr: "Karaman'daki bir bowl restoranı için; scroll ile dolan kase animasyonlu tanıtım sitesini, kendi kaseni oluşturabildiğin online siparişi, canlı sipariş takibini ve işletmenin tüm operasyonunu yöneten admin panelini tek uygulamada birleştiren full-stack proje.",
      en: "A full-stack project for a bowl restaurant in Karaman that combines a website with a scroll-driven bowl-filling animation, online ordering with a build-your-own-bowl flow, live order tracking, and an admin panel that runs the whole operation, all in one app.",
    },
    role: {
      tr: "Freelance full-stack geliştirici, tasarımcı ve görsel varlık üreticisi",
      en: "Freelance full-stack developer, designer, and visual asset producer",
    },
    team: {
      tr: "Müşteriyle doğrudan çalışarak tek başıma",
      en: "Solo, working directly with the client",
    },
    context: {
      tr: "Canlıda çalışan freelance müşteri projesi",
      en: "Freelance client project running in production",
    },
    overview: {
      tr: [
        "Bowl Bar; gel-al ve eve teslim çalışan, ödemenin kapıda nakit ya da kartla alındığı bir bowl restoranı. İşletmenin hem markasını iyi anlatan bir siteye hem de telefon trafiğini azaltacak, personelin kolayca yönetebileceği bir online sipariş sistemine ihtiyacı vardı.",
        "Projeyi keşiften canlıya kadar tek başıma yürüttüm: ürün planı, tasarım sistemi, Higgsfield ile görsel ve video üretimi, site, sipariş akışı, admin paneli, testler, güvenlik denetimi ve Dokploy üzerinde deploy. Site bowlbar.com.tr adresinde canlı ve işletme siparişlerini bu panelden yönetiyor.",
      ],
      en: [
        "Bowl Bar is a bowl restaurant that offers pickup and delivery, with payment collected at the door in cash or by card. The business needed a site that tells its brand story well, plus an online ordering system that reduces phone traffic and is easy for staff to run.",
        "I ran the project alone from discovery to launch: product plan, design system, visual and video production with Higgsfield, the site, the ordering flow, the admin panel, tests, a security audit, and deployment on Dokploy. The site is live at bowlbar.com.tr, and the business manages its orders from this panel.",
      ],
    },
    problem: {
      tr: "Küçük bir restoranın elinde ne online ödeme altyapısı ne de teknik ekip var. Siparişlerin kaçmaması, menü ve fiyatların personel tarafından kolayca güncellenebilmesi, müşterinin siparişinin durumunu telefon etmeden görebilmesi ve sitenin rakiplerden ayrışacak kadar iştah açıcı olması gerekiyordu.",
      en: "A small restaurant has neither an online payment setup nor a technical team. Orders could not be missed, staff had to update the menu and prices easily, customers needed to see their order status without calling, and the site had to be appetizing enough to stand out from competitors.",
    },
    constraints: {
      tr: [
        "Online ödeme yok: kapıda nakit veya kart, işletme ikisini ayrı ayrı açıp kapatabiliyor",
        "Tek Node süreci ve tek sunucu üzerinde düşük işletme maliyeti",
        "Teknik bilgisi olmayan personelin tablet veya telefondan rahatça kullanabileceği bir panel",
        "Ağır scroll animasyonuna rağmen düşük segment telefonlarda hızlı açılış",
        "KVKK uyumu: kişisel verilerin maskelenmesi ve eski siparişlerde anonimleştirme",
      ],
      en: [
        "No online payment: cash or card at the door, each toggled independently by the business",
        "Low running costs on a single Node process and a single server",
        "A panel that non-technical staff can use comfortably from a tablet or phone",
        "Fast loading on low-end phones despite a heavy scroll animation",
        "KVKK compliance: masked personal data and anonymization of old orders",
      ],
    },
    decisions: [
      {
        title: {
          tr: "Higgsfield ile üretilen, scroll'a bağlı kare dizisi",
          en: "A scroll-bound frame sequence generated with Higgsfield",
        },
        description: {
          tr: "Boş ve dolu kase anahtar karelerini GPT Image ile, aradaki dolma videosunu Seedance ile ürettim. Kendi yazdığım pipeline videoyu masaüstünde 96, mobilde 48 WebP kareye çeviriyor; canvas üzerinde GSAP ScrollTrigger ile scroll'a bağlanıyor. 360° dönen kase de aynı setten, crossfade ile kesintisiz döngü olarak üretildi.",
          en: "I generated the empty and full bowl keyframes with GPT Image and the filling video between them with Seedance. A pipeline I wrote turns the video into 96 WebP frames on desktop and 48 on mobile, bound to scroll on a canvas with GSAP ScrollTrigger. The 360° rotating bowl comes from the same set as a seamless crossfaded loop.",
        },
      },
      {
        title: {
          tr: "Menü ve shop için tek ürün modeli",
          en: "One product model for menu and shop",
        },
        description: {
          tr: "Tek bir ürün tablosu ‘menüde göster’, ‘satılabilir’ ve ‘tükendi’ bayraklarıyla ayrışıyor. Menü fiyatsız tanıtım yaparken shop aynı ürünü fiyatıyla satıyor; personel bir ürünü iki yerde ayrı ayrı yönetmek zorunda kalmıyor.",
          en: "A single products table splits into menu and shop through ‘show in menu’, ‘sellable’, and ‘sold out’ flags. The menu presents products without prices while the shop sells the same product with a price, so staff never manage one product in two places.",
        },
      },
      {
        title: {
          tr: "Fiyatın her zaman sunucuda yeniden hesaplanması",
          en: "Always recalculating prices on the server",
        },
        description: {
          tr: "Ortak bir fiyat motoru; seçenek kurallarını, minimum tutarı, teslimat ücretini, stok ve açık/kapalı durumunu sunucuda yeniden doğruluyor. Ürün adı, fiyat ve seçenekler siparişe tek transaction içinde kopyalanıyor; sonradan yapılan menü değişiklikleri eski siparişleri bozmuyor.",
          en: "A shared pricing engine revalidates option rules, the minimum order, the delivery fee, stock, and open/closed state on the server. Product names, prices, and options are copied into the order in a single transaction, so later menu changes never alter past orders.",
        },
      },
      {
        title: {
          tr: "SSE ile canlı sipariş akışı",
          en: "Live order flow over SSE",
        },
        description: {
          tr: "Yeni sipariş, admin panelinde sesli uyarı, bildirim ve sekme sayacıyla anında görünüyor; durum değişiklikleri müşterinin takip sayfasına sayfa yenilemeden yansıyor. Tüm admin sekmeleri tarayıcının bağlantı sınırına takılmamak için tek bir SSE bağlantısını paylaşıyor.",
          en: "New orders appear instantly in the admin panel with a sound alert, a notification, and a tab counter, and status changes reach the customer's tracking page without a refresh. All admin tabs share one SSE connection to stay within the browser's connection limit.",
        },
      },
      {
        title: {
          tr: "Tek uygulama, tek sunucu",
          en: "One app, one server",
        },
        description: {
          tr: "Site, admin ve API tek Next.js 16 uygulamasında; PostgreSQL ve yüklenen dosyalar kalıcı volume'larda, günlük yedekle birlikte Docker Compose ile Dokploy üzerinde çalışıyor. Bu ölçekte mikroservis yerine bilinçli olarak tek süreç tercih edildi.",
          en: "The site, admin, and API live in a single Next.js 16 app; PostgreSQL and uploaded files sit on persistent volumes with daily backups, running via Docker Compose on Dokploy. At this scale a single process was a deliberate choice over microservices.",
        },
      },
    ],
    designProcess: {
      tr: "Tasarım, logodan çıkarılan renk paleti ve Bricolage Grotesque + Geist tipografisiyle bir token sistemine dönüştü. Tüm görseller tek bir art direction belgesine bağlı: aynı kömür siyahı kase, aynı açı, aynı ışık ve beyaz zemin. Beyaz zemin, krem renkli site üzerinde multiply ile kaybolarak kasenin sayfada ‘yüzmesini’ sağlıyor.",
      en: "The design became a token system built on a palette taken from the logo and Bricolage Grotesque + Geist typography. Every visual follows one art direction document: the same charcoal bowl, angle, light, and white background. The white background disappears through multiply on the cream site, so the bowl appears to float on the page.",
    },
    designSteps: {
      tr: [
        "İşletmenin sipariş akışını, durumlarını ve kurallarını müşteriyle birlikte planlama",
        "Logodan türetilen tasarım token'ları ve admin içinde canlı bir stil rehberi kurma",
        "Higgsfield ile kase, video, hizmet illüstrasyonları ve teslimat görsellerini aynı setten üretme",
        "Teknik olmayan personel için sade, sürükle-bırak ve tek tıklı aksiyonlarla çalışan bir panel tasarlama",
      ],
      en: [
        "Plan the business's order flow, statuses, and rules together with the client",
        "Build design tokens derived from the logo and a live style guide inside the admin",
        "Produce the bowl, video, service illustrations, and delivery visuals from one Higgsfield set",
        "Design a simple panel for non-technical staff with drag-and-drop and one-click actions",
      ],
    },
    challenge: {
      tr: "Ağır görsel deneyimi, gerçek bir işletmenin güvenilir sipariş operasyonuyla aynı uygulamada dengelemek gerekiyordu. Kare dizisi ve animasyon kütüphaneleri ilk açılışı yavaşlatabilir; canlı ortamda ise süresi dolmuş oturumlarda sonsuz yönlendirme, sekme başlığı sayacındaki bir döngü yüzünden admin donması ve harita linki üzerinden olası XSS gibi gerçek sorunlar çıktı.",
      en: "A heavy visual experience had to coexist with a reliable order operation for a real business in the same app. Frame sequences and animation libraries can slow the first load, and in production real issues surfaced: an infinite redirect with expired sessions, an admin freeze caused by a loop in the tab-title counter, and a possible XSS through the map link.",
    },
    solution: {
      tr: "Hero kareleri sayfa yüklendikten sonra, 360° video yalnızca görünür olduğunda iniyor; Lenis ve GSAP yalnızca mouse'lu cihazlarda tembel yükleniyor ve kullanılmayan font ekseni çıkarılarak font 129 KB'tan 76 KB'a indi. Canlı sorunları güvenlik denetimiyle bulup düzelttim; sipariş verme → admin'de onaylama → takip sayfasında canlı güncelleme akışını Playwright ile uçtan uca test altına aldım.",
      en: "Hero frames load after the page, and the 360° video loads only when visible; Lenis and GSAP load lazily only on mouse devices, and removing an unused font axis cut the font from 129 KB to 76 KB. I found and fixed the production issues through a security audit, and covered the place order → confirm in admin → live tracking update flow end to end with Playwright.",
    },
    results: [
      {
        value: "100",
        label: {
          tr: "Lighthouse erişilebilirlik ve SEO",
          en: "Lighthouse accessibility & SEO",
        },
        description: {
          tr: "Mobil, yavaş 4G ve 4× yavaş CPU simülasyonunda; performans 85–91.",
          en: "On mobile with simulated slow 4G and 4× CPU slowdown; performance 85–91.",
        },
      },
      {
        value: "96",
        label: { tr: "Scroll karesi", en: "Scroll frames" },
        description: {
          tr: "Higgsfield videosundan üretilen masaüstü hero sekansı; mobilde 48 kare.",
          en: "Desktop hero sequence generated from a Higgsfield video; 48 frames on mobile.",
        },
      },
      {
        value: "57",
        label: { tr: "Unit test", en: "Unit tests" },
        description: {
          tr: "Fiyat motoru, durum geçişleri, telefon maskesi, SEO ve IP yardımcılarını kapsayan testler ile Playwright E2E akışı.",
          en: "Tests covering the pricing engine, status transitions, phone mask, SEO, and IP helpers, plus a Playwright E2E flow.",
        },
      },
    ],
    metricsNote: {
      tr: "Ekran görüntülerindeki fiyat, ciro ve hesap bilgileri işletmenin gizliliği için bulanıklaştırıldı. Sipariş ve gelir rakamlarını paylaşmıyorum; bu bölüm teslim edilen kapsamı ve ölçülmüş teknik değerleri gösteriyor.",
      en: "Prices, revenue, and account details in the screenshots are blurred to protect the business's privacy. I am not publishing order or revenue figures; this section shows the delivered scope and measured technical values.",
    },
    screenshotAlt: {
      tr: "Bowl Bar ürün önizlemesi",
      en: "Bowl Bar product preview",
    },
    screenshots: [
      {
        src: "/projects/case-studies/bowl-bar/scroll-sequence.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Scroll ile dolan kasenin dört aşaması",
          en: "Four stages of the scroll-driven bowl filling",
        },
        caption: {
          tr: "Higgsfield ile üretilen kare dizisi: kullanıcı aşağı kaydırdıkça kase taban, sebze ve protein ile doluyor.",
          en: "The Higgsfield-generated frame sequence: as the user scrolls, the bowl fills with base, vegetables, and protein.",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/hero.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Bowl Bar ana sayfa hero bölümü",
          en: "Bowl Bar homepage hero section",
        },
        caption: {
          tr: "‘Kaseni doldur.’ başlığı ve boş kaseyle başlayan hero.",
          en: "The hero opens with ‘Fill your bowl.’ and an empty bowl.",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/favorites.webp",
        width: 1660,
        height: 1034,
        alt: {
          tr: "Bowl Bar favori ürünler bölümü",
          en: "Bowl Bar favorites section",
        },
        caption: {
          tr: "Admin panelinden yönetilen öne çıkan ürünler.",
          en: "Featured products managed from the admin panel.",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/admin-dashboard.webp",
        width: 1654,
        height: 964,
        alt: {
          tr: "Bowl Bar admin genel bakış ekranı",
          en: "Bowl Bar admin overview screen",
        },
        caption: {
          tr: "Sesli sipariş takibi, büyük aç/kapa anahtarı, günün özeti ve eksik bilgi uyarıları.",
          en: "Sound order alerts, a large open/close switch, today's summary, and missing-information warnings.",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/admin-reports.webp",
        width: 1654,
        height: 964,
        alt: {
          tr: "Bowl Bar raporlar ekranı",
          en: "Bowl Bar reports screen",
        },
        caption: {
          tr: "Tarih aralığına göre ciro, ortalama sepet, iptal oranı, günlük ciro grafiği ve CSV dışa aktarma (tutarlar bulanıklaştırıldı).",
          en: "Revenue, average basket, cancellation rate, a daily revenue chart, and CSV export by date range (amounts blurred).",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/admin-menu.webp",
        width: 1654,
        height: 964,
        alt: {
          tr: "Bowl Bar menü yönetimi ekranı",
          en: "Bowl Bar menu management screen",
        },
        caption: {
          tr: "Sürükle-bırak sıralama, satışta/tükendi anahtarı ve kategori bazlı ürün yönetimi (fiyatlar bulanıklaştırıldı).",
          en: "Drag-and-drop ordering, an on-sale/sold-out switch, and category-based product management (prices blurred).",
        },
      },
      {
        src: "/projects/case-studies/bowl-bar/admin-media.webp",
        width: 1654,
        height: 964,
        alt: {
          tr: "Bowl Bar görsel kütüphanesi",
          en: "Bowl Bar media library",
        },
        caption: {
          tr: "Yüklenen görselleri otomatik küçülten, WebP'ye çeviren ve nerede kullanıldığını gösteren medya kütüphanesi.",
          en: "A media library that automatically resizes uploads, converts them to WebP, and shows where each image is used.",
        },
      },
    ],
    sourceNote: {
      tr: "Bowl Bar bir müşteri projesi olduğu için kaynak kodu kapalıdır.",
      en: "Bowl Bar is a client project, so its source code is private.",
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
