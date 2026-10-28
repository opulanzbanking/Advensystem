import type { ClientLogo, FeedbackItem, Locale, Slide } from "@/types";

export interface AboutColumn {
  paragraphs: string[];
  image: { src: string; alt: string; width: number; height: number };
  imageFirst: boolean;
}

export interface FounderProfile {
  badge: string;
  name: string;
  role: string;
  quote: string;
  office: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  cardImage: string;
  portraitImage: string;
}

export interface AboutContent {
  title: string;
  columns: AboutColumn[];
  founder: FounderProfile;
}

export interface HomeService {
  title: string[];
  icon: string;
}

export interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    text: string;
    tagline: string;
    cta: string;
  };
  slider: { title: string; cta: string; slides: Slide[] };
  about: AboutContent;
  services: {
    title: string;
    intro: string;
    items: HomeService[];
    portageBanner: {
      badge: string;
      title: string;
      text: string;
      cta: string;
      href: string;
    };
  };
  why: {
    title: string;
    intro: string;
    stats: { value?: number; suffix?: string; text: string; highlight?: boolean }[];
    cta: string;
  };
  clients: { title: string; intro: string };
  feedbacks: {
    title: string;
    intro: string;
    badge: string;
    items: FeedbackItem[];
  };
}

export const clientLogos: ClientLogo[] = [
  {
    name: "SNCF",
    src: "/images/2022/02/SNCF_2011_1-300x158.png",
    width: 300,
    height: 158,
  },
  {
    name: "Renault",
    src: "/images/2021/02/client-1.png",
    width: 266,
    height: 101,
  },
  {
    name: "APSIDE",
    src: "/images/2021/02/client-2.png",
    width: 266,
    height: 101,
  },
  {
    name: "La Mutuelle Générale",
    src: "/images/2021/02/client-3.png",
    width: 266,
    height: 101,
  },
  {
    name: "Europ Assistance",
    src: "/images/2021/02/client-4.png",
    width: 266,
    height: 101,
  },
  {
    name: "Valente Carrelages",
    src: "/images/2021/02/client-5.png",
    width: 266,
    height: 101,
  },
  {
    name: "Eurocontrol",
    src: "/images/2021/02/client-6.png",
    width: 266,
    height: 100,
  },
  {
    name: "La Poste",
    src: "/images/2021/02/client-7.png",
    width: 266,
    height: 100,
  },
  {
    name: "European Investment Bank",
    src: "/images/2021/02/client-8.png",
    width: 266,
    height: 100,
  },
  {
    name: "PARVA Consulting",
    src: "/images/2021/02/client-9.png",
    width: 266,
    height: 100,
  },
  {
    name: "L’Oréal",
    src: "/images/2022/02/LOreal-Logo-1962-present-300x169.png",
    width: 300,
    height: 169,
  },
  {
    name: "Takeda",
    src: "/images/2022/02/takeda_logo-300x150.png",
    width: 300,
    height: 150,
  },
  {
    name: "Datapy",
    src: "/images/2022/02/datapy.png",
    width: 287,
    height: 175,
  },
];

const slidesFr: Slide[] = [
  {
    image: "/images/2021/02/slider-1-768x366.png",
    alt: "Équipe réunie autour d’un écran lors d’un atelier projet",
    caption: "Gestion de projet & Méthodologie Agile",
  },
  {
    image: "/images/2021/02/slider-2-768x513.jpg",
    alt: "Réunion de travail entre consultants",
    caption: "Direction de projet avec expertise métier",
  },
  {
    image: "/images/2021/02/slider-5-768x511.jpg",
    alt: "Consultants travaillant sur la transformation digitale",
    caption: "Consulting & Transformation digitale",
  },
  {
    image: "/images/2021/02/slider-3-768x512.jpg",
    alt: "Atelier de stratégie et de recette applicative",
    caption: "Stratégie et pilotage de recette",
  },
  {
    image: "/images/2021/02/slider-6-768x512.jpg",
    alt: "Accompagnement du changement en entreprise",
    caption: "Conduite du changement",
  },
  {
    image: "/images/2021/02/slider-4-768x513.jpg",
    alt: "Experts techniques en analyse de données",
    caption:
      "Expertise technique : Digital marketing, CRM, Blockchain, IA, BI & Analytics",
  },
];

const slidesEn: Slide[] = [
  {
    image: "/images/2021/02/slider-1-768x366.png",
    alt: "Team gathered around a screen during a project workshop",
    caption: "Project Management & Agile Methodology",
  },
  {
    image: "/images/2021/02/slider-2-768x513.jpg",
    alt: "Working meeting between consultants",
    caption: "Project Direction with Business Expertise",
  },
  {
    image: "/images/2021/02/slider-5-768x511.jpg",
    alt: "Consultants working on digital transformation",
    caption: "Consulting & Digital Transformation",
  },
  {
    image: "/images/2021/02/slider-3-768x512.jpg",
    alt: "Strategy and application testing workshop",
    caption: "Strategy and Test Management",
  },
  {
    image: "/images/2021/02/slider-6-768x512.jpg",
    alt: "Change management support within a company",
    caption: "Change Management",
  },
  {
    image: "/images/2021/02/slider-4-768x513.jpg",
    alt: "Technical experts working on data analysis",
    caption:
      "Technical Expertise: Digital Marketing, CRM, Blockchain, AI, BI & Analytics",
  },
];

export const homeContent: Record<Locale, HomeContent> = {
  fr: {
    meta: {
      title:
        "AdvenSystem – 19 ans d'expertise IT, conseil et portage salarial au Luxembourg",
      description:
        "Advensystem dispose des meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique.",
    },
    hero: {
      badge: "19 ANS D’ACTIVITÉ • SERVICES IT",
      title: "AdvenSystem",
      subtitle: "NOS EXPERTS RÉPONDENT À VOS BESOINS",
      text: "Nous recrutons les meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique.",
      tagline: "« TALENT + EXPERTISE = INNOVATION »",
      cta: "Contactez-nous",
    },
    slider: {
      title:
        "AdvenSystem couvre l’ensemble des expertises technologiques de l’IT :",
      cta: "Contactez-nous",
      slides: slidesFr,
    },
    about: {
      title: "QUI SOMMES NOUS",
      columns: [
        {
          paragraphs: [
            "AdvenSystem fait partie du Groupe Advensys Luxembourg SA.",
            "Groupe Advensys Luxembourg SA est une société anonyme située au Grand-Duché de Luxembourg, active depuis plus de 19 ans dans les services informatiques.",
            "Groupe Advensys Luxembourg SA détient plusieurs sociétés dans différents domaines d’activité et différents pays.",
            "Made in Luxembourg : nos employés locaux assurent une relation de proximité immédiate et une réactivité maximale auprès de tous nos clients.",
          ],
          image: {
            src: "/images/2021/02/map.svg",
            alt: "Carte des implantations d’AdvenSystem et du groupe Advensys",
            width: 666,
            height: 644,
          },
          imageFirst: false,
        },
        {
          paragraphs: [
            "AdvenSystem SARL compte 19 ans d’activité dans les services IT. Les activités dans le domaine informatique ont commencé en 2007 au sein du Groupe Renault à Paris et se sont étendues vers d’autres clients tels qu’Europ Assistance, La Poste-Coliposte, La Mutuelle Générale, la Banque Européenne d'Investissement et bien d’autres.",
            "AdvenSystem SARL est principalement axé sur le management de projet, la direction de projet avec expertise métier, le consulting, l’assistance à maîtrise d’ouvrage (AMOA), le testing et le déploiement d’applications.",
            "Nos experts ont plus de 19 ans d’expérience dans différents métiers et technologies de pointe du domaine informatique.",
          ],
          image: {
            src: "/images/2023/06/infogr2023_transp-768x509.png",
            alt: "Infographie du Groupe Advensys et de ses sociétés",
            width: 768,
            height: 509,
          },
          imageFirst: true,
        },
      ],
      founder: {
        badge: "LEADERSHIP & DIRECTION",
        name: "Irvin Dulberg",
        role: "Fondateur & Président du conseil d’administration",
        quote:
          "Depuis 19 ans, nous mettons l’excellence technologique, le talent de nos experts et une proximité sans faille au service de la performance et de l’innovation de nos clients au Luxembourg.",
        office: "53 Boulevard Royal L-2449 Luxembourg",
        phone: "+352 28 79 76 26",
        whatsapp: "+352 661 11 22 60",
        email: "irvin@advensystem.lu",
        website: "www.advensystem.lu",
        cardImage: "/images/team/irvin-dulberg-card.jpg",
        portraitImage: "/images/team/irvin-dulberg.jpg",
      },
    },
    services: {
      title: "NOS SERVICES & NOS DOMAINES D’ACTIVITÉ",
      intro:
        "Notre expertise Métier s’adresse à tous les grands comptes et institutions publiques, et notre activité couvre tous les secteurs du marché, parmi :",
      items: [
        { title: ["Banque,", "Finance & Assurance"], icon: "/images/2021/02/icon-1.svg" },
        { title: ["Juridique"], icon: "/images/2021/02/icon-2.svg" },
        { title: ["Industrie", "Automobile"], icon: "/images/2021/02/icon-6.svg" },
        { title: ["Transports", "& Logistique"], icon: "/images/2021/02/icon-7.svg" },
        { title: ["Sécurité informatique"], icon: "/images/2021/02/icon-3.svg" },
        { title: ["Application mobile"], icon: "/images/2021/02/icon-4.svg" },
        {
          title: ["Création de site internet", "(e-commerce)"],
          icon: "/images/2021/02/icon-5.svg",
        },
      ],
      portageBanner: {
        badge: "SERVICE DÉDIÉ AUX ENTREPRISES & CONSULTANTS",
        title: "Service de portage salarial for professional companies",
        text: "AdvenSystem propose une solution clé en main de portage salarial au Luxembourg : autonomie professionnelle, couverture sociale complète et conformité légale totale (CNS, CCSS, ITM).",
        cta: "Découvrir notre offre de portage",
        href: "/portage-salarial-luxembourg/",
      },
    },
    why: {
      title: "POURQUOI NOUS CHOISIR ?",
      intro:
        "Advensystem assure un mode d’engagement modulable et évolutif, qui permet chaque jour de développer de nouvelles solutions performantes et innovantes, tout en ayant une relation de proximité avec nos clients.",
      stats: [
        { value: 19, suffix: "+", text: "ans d’activité dans les services IT" },
        { value: 200, suffix: "+", text: "clients satisfaits" },
        {
          text: "Made in Luxembourg : Employés locaux garantissant écoute, réactivité et présence sur le terrain",
          highlight: true,
        },
        {
          text: "« TALENT + EXPERTISE = INNOVATION » : Conduire vos projets vers le succès, la croissance, le développement et l’excellence technologique",
          highlight: true,
        },
        {
          value: 55,
          suffix: "+",
          text: "projets réalisés dans différents domaines d'activité",
        },
      ],
      cta: "Contactez-nous",
    },
    clients: {
      title: "ILS NOUS FONT CONFIANCE",
      intro:
        "Client : PME, banque, industrie, compagnies d’assurance et grand groupe",
    },
    feedbacks: {
      badge: "AVIS CLIENTS • FEEDBACKS",
      title: "TÉMOIGNAGES DE NOS CLIENTS",
      intro:
        "Découvrez les retours d'expérience de nos clients grands comptes, PME et consultants au Luxembourg.",
      items: [
        {
          author: "Marc D.",
          role: "Directeur de Projet Digital",
          company: "Banque & Assurance Luxembourg",
          sector: "Banque, Finance & Assurance",
          content:
            "AdvenSystem a su mobiliser en un temps record des experts seniors en AMOA et gestion de projet Agile pour notre refonte réglementaire. Une méthodologie exemplaire et une grande proximité.",
          rating: 5,
        },
        {
          author: "Sophie V.",
          role: "Responsable Qualité & Testing",
          company: "Groupe Industriel Automobile",
          sector: "Industrie Automobile",
          content:
            "La maîtrise des stratégies de recette et le pilotage des tests applicatifs ont été déterminants pour sécuriser nos déploiements critiques. L'engagement modulable d'AdvenSystem fait toute la différence.",
          rating: 5,
        },
        {
          author: "Alexandre L.",
          role: "Consultant Senior en Portage Salarial",
          company: "Services IT & Conseil",
          sector: "Portage Salarial",
          content:
            "Le service de portage salarial d'AdvenSystem allie réactivité, transparence et sécurité juridique totale. La gestion administrative, sociale et contractuelle est irréprochable.",
          rating: 5,
        },
        {
          author: "Claire M.",
          role: "Head of Infrastructure & Security",
          company: "Logistique & Supply Chain",
          sector: "Transports & Logistique",
          content:
            "19 ans d'expertise qui se ressentent au quotidien : des experts locaux au Luxembourg, joignables immédiatement, avec un sens aigu de la performance et de l'innovation.",
          rating: 5,
        },
      ],
    },
  },
  en: {
    meta: {
      title:
        "AdvenSystem – 19 years of business, IT services & wage portage in Luxembourg",
      description:
        "Advensystem has the best experts to meet the specific needs of our clients and to serve performance and technological innovation.",
    },
    hero: {
      badge: "19 YEARS OF BUSINESS • IT SERVICES",
      title: "AdvenSystem",
      subtitle: "OUR EXPERTS MEET YOUR NEEDS",
      text: "We recruit the best experts to meet the specific needs of our clients and to serve performance and technological innovation.",
      tagline: "“TALENT + EXPERTISE = INNOVATION”",
      cta: "Contact us",
    },
    slider: {
      title: "Advensystem covers all technological expertise in IT:",
      cta: "Contact us",
      slides: slidesEn,
    },
    about: {
      title: "ABOUT THE COMPANY & BUSINESS",
      columns: [
        {
          paragraphs: [
            "AdvenSystem is part of Groupe Advensys Luxembourg SA.",
            "Groupe Advensys Luxembourg SA is a public limited company located in the Grand Duchy of Luxembourg, with 19 years of business in IT services.",
            "Groupe Advensys Luxembourg SA owns several companies across different industries and countries.",
            "Made in Luxembourg: our local employees provide immediate proximity and responsive support to all our clients and institutions.",
          ],
          image: {
            src: "/images/2021/02/map.svg",
            alt: "Map of AdvenSystem and Advensys group locations",
            width: 666,
            height: 644,
          },
          imageFirst: false,
        },
        {
          paragraphs: [
            "AdvenSystem SARL has 19 years of business in IT services. Activities began in 2007 within Groupe Renault in Paris and expanded to other clients such as Europ Assistance, La Poste-Coliposte, La Mutuelle Générale, the European Investment Bank and many others.",
            "AdvenSystem SARL is mainly focused on project management, project direction with business expertise, consulting, project management assistance (AMOA), testing, and application deployment.",
            "Our experts have more than 19 years of experience in various specialized IT professions and cutting-edge technologies.",
          ],
          image: {
            src: "/images/2023/06/infogr2023_transp-768x509.png",
            alt: "Infographic of Groupe Advensys and its companies",
            width: 768,
            height: 509,
          },
          imageFirst: true,
        },
      ],
      founder: {
        badge: "LEADERSHIP & EXECUTIVE BOARD",
        name: "Irvin Dulberg",
        role: "Founder & Chairman of the Board",
        quote:
          "For 19 years, we have placed technological excellence, the talent of our experts, and close client relationships at the core of our clients’ success in Luxembourg.",
        office: "53 Boulevard Royal L-2449 Luxembourg",
        phone: "+352 28 79 76 26",
        whatsapp: "+352 661 11 22 60",
        email: "irvin@advensystem.lu",
        website: "www.advensystem.lu",
        cardImage: "/images/team/irvin-dulberg-card.jpg",
        portraitImage: "/images/team/irvin-dulberg.jpg",
      },
    },
    services: {
      title: "OUR SERVICES - FOR COMPANIES",
      intro:
        "Our business expertise is aimed at all major accounts and public institutions, and our activity covers all market sectors, including:",
      items: [
        {
          title: ["Banking,", "Finance & Insurance"],
          icon: "/images/2021/02/icon-1.svg",
        },
        { title: ["Legal"], icon: "/images/2021/02/icon-2.svg" },
        { title: ["Automotive", "Industry"], icon: "/images/2021/02/icon-6.svg" },
        { title: ["Transport", "& Logistics"], icon: "/images/2021/02/icon-7.svg" },
        { title: ["IT Security"], icon: "/images/2021/02/icon-3.svg" },
        { title: ["Mobile App"], icon: "/images/2021/02/icon-4.svg" },
        {
          title: ["Website Creation", "(e-commerce)"],
          icon: "/images/2021/02/icon-5.svg",
        },
      ],
      portageBanner: {
        badge: "DEDICATED SERVICE FOR COMPANIES & CONSULTANTS",
        title: "Wage portage service for professional companies",
        text: "AdvenSystem delivers a turnkey wage portage solution in Luxembourg: professional autonomy, comprehensive social security, and 100% compliant contract governance (CNS, CCSS, ITM).",
        cta: "Discover Wage Portage",
        href: "/en/portage-salarial-luxembourg-2/",
      },
    },
    why: {
      title: "WHY CHOOSE US?",
      intro:
        "Advensystem provides a flexible and scalable engagement model, which makes it possible every day to develop new efficient and innovative solutions, while maintaining a close relationship with our clients.",
      stats: [
        { value: 19, suffix: "+", text: "years of business in IT services" },
        { value: 200, suffix: "+", text: "satisfied clients" },
        {
          text: "Made in Luxembourg: Local employees ensuring rapid response, attentiveness and close collaboration on the ground",
          highlight: true,
        },
        {
          text: "“TALENT + EXPERTISE = INNOVATION”: Leading our clients towards success, growth, development and technological excellence",
          highlight: true,
        },
        {
          value: 55,
          suffix: "+",
          text: "completed projects in different sectors",
        },
      ],
      cta: "Contact us",
    },
    clients: {
      title: "OUR CLIENTS",
      intro:
        "Clients: SMEs, banks, industry, insurance companies and large corporate groups",
    },
    feedbacks: {
      badge: "FEEDBACKS • CLIENT REVIEWS",
      title: "CLIENT TESTIMONIALS",
      intro:
        "Read verified feedback from our corporate accounts, SMEs, and consulting partners in Luxembourg.",
      items: [
        {
          author: "Marc D.",
          role: "Digital Project Director",
          company: "Private Banking & Insurance",
          sector: "Banking, Finance & Insurance",
          content:
            "AdvenSystem deployed senior business analysts and Agile project managers in record time for our regulatory overhaul. Exemplary methodology and genuine partnership.",
          rating: 5,
        },
        {
          author: "Sophie V.",
          role: "Quality & Testing Lead",
          company: "Automotive Industry Group",
          sector: "Automotive Industry",
          content:
            "Their mastery of test strategies and QA governance was crucial to securing our mission-critical deployments. Highly experienced and dependable consultants.",
          rating: 5,
        },
        {
          author: "Alexandre L.",
          role: "Senior Consultant in Wage Portage",
          company: "Luxembourg IT Services",
          sector: "Wage Portage",
          content:
            "AdvenSystem's wage portage service combines speed, total transparency, and complete legal compliance. Flawless administrative and social security handling.",
          rating: 5,
        },
        {
          author: "Claire M.",
          role: "Head of Infrastructure & Security",
          company: "Logistics & Supply Chain",
          sector: "Transport & Logistics",
          content:
            "19 years of business that shine through every day: local consultants in Luxembourg who are immediately reachable and genuinely dedicated to our goals.",
          rating: 5,
        },
      ],
    },
  },
};
