import type { ClientLogo, Locale, Slide } from "@/types";

export interface AboutColumn {
  paragraphs: string[];
  image: { src: string; alt: string; width: number; height: number };
  imageFirst: boolean;
}

export interface HomeService {
  title: string[];
  icon: string;
}

export interface HomeContent {
  meta: { title: string; description: string };
  hero: { title: string; text: string; cta: string };
  slider: { title: string; cta: string; slides: Slide[] };
  about: { title: string; columns: AboutColumn[] };
  services: { title: string; intro: string; items: HomeService[] };
  why: {
    title: string;
    intro: string;
    stats: { value?: number; suffix?: string; text: string }[];
    cta: string;
  };
  clients: { title: string; intro: string };
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
    image: "/images/2021/02/slider-3-768x512.jpg",
    alt: "Atelier de stratégie et de recette applicative",
    caption: "Stratégie et pilotage de recette",
  },
  {
    image: "/images/2021/02/slider-4-768x513.jpg",
    alt: "Experts techniques en analyse de données",
    caption:
      "Expertise technique : Digital marketing, CRM, Blockchain, IA, BI & Analytics",
  },
  {
    image: "/images/2021/02/slider-5-768x511.jpg",
    alt: "Consultants travaillant sur la transformation digitale",
    caption: "Consulting & Transformation digitale",
  },
  {
    image: "/images/2021/02/slider-6-768x512.jpg",
    alt: "Accompagnement du changement en entreprise",
    caption: "Conduite du changement",
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
    caption: "Project management with business expertise",
  },
  {
    image: "/images/2021/02/slider-3-768x512.jpg",
    alt: "Strategy and application testing workshop",
    caption: "Strategy and test management",
  },
  {
    image: "/images/2021/02/slider-4-768x513.jpg",
    alt: "Technical experts working on data analysis",
    caption:
      "Technical expertise: Digital marketing, CRM, Blockchain, AI, BI & Analytics",
  },
  {
    image: "/images/2021/02/slider-5-768x511.jpg",
    alt: "Consultants working on digital transformation",
    caption: "Consulting & digital transformation",
  },
  {
    image: "/images/2021/02/slider-6-768x512.jpg",
    alt: "Change management support within a company",
    caption: "Change management",
  },
];

export const homeContent: Record<Locale, HomeContent> = {
  fr: {
    meta: {
      title:
        "AdvenSystem – Advensystem dispose des meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique.",
      description:
        "Advensystem dispose des meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique.",
    },
    hero: {
      title: "AdvenSystem",
      text: "Advensystem dispose des meilleurs experts pour répondre aux besoins spécifiques de nos clients et pour servir la performance et l’innovation technologique.",
      cta: "Contactez-nous",
    },
    slider: {
      title:
        "AdvenSystem couvre l’ensemble des expertises technologiques de l’IT",
      cta: "Contactez-nous",
      slides: slidesFr,
    },
    about: {
      title: "QUI SOMMES NOUS",
      columns: [
        {
          paragraphs: [
            "AdvenSystem fait partie de Groupe Advensys Luxembourg SA.",
            "Groupe Advensys Luxembourg SA est une société anonyme située au Grand-Duché de Luxembourg qui est active depuis plus de 14 ans.",
            "Groupe Advensys Luxembourg SA détient plusieurs sociétés dans différents domaines d’activité et différents pays.",
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
            "AdvenSystem SARL est une succursale luxembourgeoise de la société Advensys Conseil LTD située à Londres. Les activités dans le domaine informatique ont commencé en 2007 au sein du Groupe Renault à Paris et se sont étendues vers d’autres clients tels qu’Europ Assistance, La Poste-Coliposte, La Mutuelle Générale et bien d’autres.",
            "AdvenSystem SARL est principalement axé sur le management de projet, l’assistance à maîtrise d’ouvrage, le testing et le déploiement d’applications.",
            "Nos experts ont plus de 15 ans d’expérience dans différents métiers du domaine informatique.",
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
    },
    services: {
      title: "NOS SERVICES & NOS DOMAINES D’ACTIVITÉ",
      intro:
        "Notre expertise Métier s’adresse à tous les grands comptes et institutions publiques, et notre activité couvre tous les secteurs du marché, parmi :",
      items: [
        { title: ["Banque,", "Finance & Assurance"], icon: "/images/2021/02/icon-1.svg" },
        { title: ["Juridique"], icon: "/images/2021/02/icon-2.svg" },
        { title: ["Sécurité informatique"], icon: "/images/2021/02/icon-3.svg" },
        { title: ["Application mobile"], icon: "/images/2021/02/icon-4.svg" },
        {
          title: ["Création de site internet", "(e-commerce)"],
          icon: "/images/2021/02/icon-5.svg",
        },
        { title: ["Industrie", "Automobile"], icon: "/images/2021/02/icon-6.svg" },
        { title: ["Transports", "& Logistique"], icon: "/images/2021/02/icon-7.svg" },
      ],
    },
    why: {
      title: "POURQUOI NOUS CHOISIR ?",
      intro:
        "AdvenSystem assure un mode d’engagement modulable et évolutif, qui permet chaque jour de développer de nouvelles solutions performantes et innovantes, tout en ayant une relation de proximité avec nos clients",
      stats: [
        { value: 14, suffix: "+", text: "ans d’expérience" },
        { value: 200, suffix: "+", text: "clients satisfaits" },
        {
          text: "Nous aimons contribuer au succès de nos clients et nous sommes passionnés par notre travail",
        },
        {
          text: "Nous avons un objectif commun avec nos clients : conduire nos entreprises vers le succès, la croissance, le développement, l’innovation et la contribution",
        },
        {
          value: 55,
          suffix: "+",
          text: "projets réalisés dans différents domaines",
        },
      ],
      cta: "Contactez-nous",
    },
    clients: {
      title: "ILS NOUS FONT CONFIANCE",
      intro:
        "Nos Clients : PME, Banques, Industrie, Compagnies d’assurance et Grands groupes",
    },
  },
  en: {
    meta: {
      title:
        "AdvenSystem – The best experts to meet the specific needs of our customers and to serve performance and technological innovation",
      description:
        "The best experts to meet the specific needs of our customers and to serve performance and technological innovation.",
    },
    hero: {
      title: "AdvenSystem",
      text: "The best experts to meet the specific needs of our customers and to serve performance and technological innovation",
      cta: "Contact us",
    },
    slider: {
      title: "AdvenSystem covers all of IT’s technological expertise",
      cta: "Contact us",
      slides: slidesEn,
    },
    about: {
      title: "ABOUT THE COMPANY & BUSINESSES",
      columns: [
        {
          paragraphs: [
            "AdvenSystem is part of Groupe Advensys Luxembourg SA.",
            "Groupe Advensys Luxembourg SA is a public limited company located in the Grand Duchy of Luxembourg and has been active for more than 14 years.",
            "Groupe Advensys Luxembourg SA owns several companies in different fields of activity and different countries.",
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
            "AdvenSystem SARL is a Luxembourg branch of Advensys Conseil LTD located in London. Activities in the IT field began in 2007 within Groupe Renault in Paris and spread to other clients such as Europ Assistance, La Poste-Coliposte, La Mutuelle Générale and many others.",
            "AdvenSystem SARL is mainly focused on project management, project management assistance, testing and deployment of applications.",
            "Our experts have more than 15 years of experience in various IT professions.",
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
    },
    services: {
      title: "OUR SERVICES FOR COMPANIES",
      intro:
        "Our business expertise is aimed at all major directions and public institutions, and our activity covers all market sectors, including:",
      items: [
        {
          title: ["Banking,", "Finance & Insurance"],
          icon: "/images/2021/02/icon-1.svg",
        },
        { title: ["Law"], icon: "/images/2021/02/icon-2.svg" },
        { title: ["IT security"], icon: "/images/2021/02/icon-3.svg" },
        { title: ["Mobile app"], icon: "/images/2021/02/icon-4.svg" },
        {
          title: ["Website creation", "(e-business)"],
          icon: "/images/2021/02/icon-5.svg",
        },
        { title: ["Automobile", "industry"], icon: "/images/2021/02/icon-6.svg" },
        { title: ["Transport", "& Logistics"], icon: "/images/2021/02/icon-7.svg" },
      ],
    },
    why: {
      title: "WHY CHOOSE US?",
      intro:
        "AdvenSystem ensures a flexible and evolving mode of engagement, which makes it possible every day to develop new efficient and innovative solutions, while having a close relationship with our customers",
      stats: [
        { value: 14, suffix: "+", text: "years experience" },
        { value: 200, suffix: "+", text: "satisfied clients" },
        {
          text: "We love our clients, enjoy contributing to their success and are passionate about our work",
        },
        {
          text: "We have a common goal with our clients: lead our businesses towards success, growth, development, innovation and contribution",
        },
        {
          value: 55,
          suffix: "+",
          text: "realised projects in different fields",
        },
      ],
      cta: "Contact us",
    },
    clients: {
      title: "OUR CLIENTS",
      intro:
        "SMEs, Banks, Industry, Insurance companies and Large groups",
    },
  },
};
