import type { Locale, PortageCard, Step } from "@/types";

export interface PortageContent {
  meta: { title: string; description: string };
  hero: {
    badge: string;
    titleLines: string[];
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
  understanding: {
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    visualTextLines: string[];
  };
  why: { title: string; intro: string; cards: PortageCard[] };
  approach: {
    title: string;
    intro: string;
    bullets: string[];
    steps: Step[];
  };
  cta: {
    title: string;
    text: string;
    boxText: string;
    button: string;
    note: string;
  };
}

export const portageContent: Record<Locale, PortageContent> = {
  fr: {
    meta: {
      title: "Portage Salarial Luxembourg – AdvenSystem",
      description:
        "Le portage salarial au Luxembourg avec AdvenSystem : autonomie, statut salarié et couverture sociale complète, avec une conformité totale aux réglementations locales.",
    },
    hero: {
      badge: "SOLUTION EXCEPTIONNELLE",
      titleLines: ["Portage Salarial", "au Luxembourg"],
      text: "L’expertise AdvenSystem pour votre succès en tant qu’indépendant. Bénéficiez d’une structure alliant autonomie et sécurité sociale complète.",
      primaryCta: "Nous contacter",
      secondaryCta: "Simuler vos revenus",
    },
    understanding: {
      title: "COMPRENDRE LE PORTAGE SALARIAL AU LUXEMBOURG",
      paragraphs: [
        "Le portage salarial est une forme d’emploi innovante qui permet aux professionnels de mener leurs activités de conseil en toute indépendance, tout en bénéficiant du statut de salarié au Grand-Duché.",
        "Chez AdvenSystem, nous agissons comme votre partenaire stratégique. Nous gérons l’ensemble de la relation contractuelle avec vos clients luxembourgeois, assurant une conformité totale avec les réglementations locales (CNS, CCSS, ITM) tout en optimisant votre structure de revenus.",
      ],
      stats: [
        { value: "100%", label: "Conformité Légale" },
        { value: "24h", label: "Mise en Place" },
        { value: "~26%", label: "Charges Sociales" },
      ],
      visualTextLines: ["Services de conseil", "expert au Luxembourg"],
    },
    why: {
      title: "POURQUOI CHOISIR ADVENSYSTEM ?",
      intro:
        "Concentrez-vous sur votre expertise, nous nous occupons du reste avec la rigueur institutionnelle.",
      cards: [
        {
          icon: "shield",
          title: "Couverture Sociale Complète",
          text: "Assurance maladie, cotisations retraite et protection chômage pour vous et votre famille.",
          tags: ["CNS", "CCSS"],
        },
        {
          icon: "document",
          title: "Support Administratif",
          text: "Facturation, relances, gestion des contrats et déclarations sociales : nous libérons 100 % de votre temps productif.",
        },
        {
          icon: "clock",
          title: "Optimisation Fiscale",
          text: "Optimisez votre revenu net via la gestion des frais professionnels et les avantages fiscaux luxembourgeois.",
        },
        {
          icon: "exchange",
          title: "Flexibilité Totale",
          text: "Changez de mission, ajustez votre temps de travail ou gérez plusieurs clients simultanément sans contraintes administratives.",
        },
      ],
    },
    approach: {
      title: "NOTRE APPROCHE RIGOUREUSE",
      intro:
        "Un processus structuré pour garantir votre sécurité et votre conformité dès le premier jour.",
      bullets: [
        "Audit de conformité initial",
        "Signature tripartite sécurisée",
        "Reporting mensuel transparent",
      ],
      steps: [
        {
          label: "ÉTAPE 01",
          title: "Conformité",
          text: "Veille permanente sur la législation luxembourgeoise pour assurer la pérennité de votre statut.",
          tone: "light",
        },
        {
          label: "ÉTAPE 02",
          title: "Innovation",
          text: "Plateforme digitale pour le suivi de vos factures et de votre compte d’activité en temps réel.",
          tone: "dark",
        },
        {
          label: "ÉTAPE 03",
          title: "Accompagnement",
          text: "Un conseiller dédié pour répondre à vos questions sur la fiscalité, la retraite ou votre mutuelle.",
          tone: "dark",
        },
        {
          label: "ÉTAPE 04",
          title: "Networking",
          text: "Accès à un réseau d’indépendants et d’entreprises partenaires au Luxembourg.",
          tone: "light",
        },
      ],
    },
    cta: {
      title: "Prêt à lancer votre activité au Luxembourg ?",
      text: "Obtenez une simulation personnalisée de vos revenus nets et découvrez comment AdvenSystem peut propulser votre carrière d’indépendant.",
      boxText:
        "Remplissez le formulaire pour recevoir votre simulation de revenus personnalisée.",
      button: "Demander une simulation gratuite",
      note: "Réponse sous 24h • Sans engagement",
    },
  },
  en: {
    meta: {
      title: "Portage Salarial Luxembourg – AdvenSystem",
      description:
        "Payroll services and portage salarial in Luxembourg with AdvenSystem: autonomy, employee status and full social security, fully compliant with local regulations.",
    },
    hero: {
      badge: "EXCEPTIONAL SOLUTION",
      titleLines: ["Payroll Services & EOR", "Solutions in Luxembourg"],
      text: "AdvenSystem expertise for your success as an independent professional. Benefit from a structure combining autonomy and full social security.",
      primaryCta: "Contact us",
      secondaryCta: "Simulate your income",
    },
    understanding: {
      title: "UNDERSTANDING PAYROLL SERVICES IN LUXEMBOURG",
      paragraphs: [
        "Payroll outsourcing is an innovative form of employment that allows professionals to carry out consulting activities with full independence, while benefiting from employee status in the Grand Duchy.",
        "At AdvenSystem, we act as your strategic partner. We manage the entire contractual relationship with your Luxembourg clients, ensuring full compliance with local regulations (CNS, CCSS, ITM) while optimising your income structure.",
      ],
      stats: [
        { value: "100%", label: "Legal Compliance" },
        { value: "24h", label: "Setup Time" },
        { value: "~26%", label: "Social Charges" },
      ],
      visualTextLines: ["Expert advisory", "services in Luxembourg"],
    },
    why: {
      title: "WHY CHOOSE ADVENSYSTEM?",
      intro:
        "Focus on your expertise, we take care of the rest with institutional rigour.",
      cards: [
        {
          icon: "shield",
          title: "Social Security Coverage",
          text: "Health insurance, pension contributions and unemployment protection for you and your family.",
          tags: ["CNS", "CCSS"],
        },
        {
          icon: "document",
          title: "Administrative Support",
          text: "Invoicing, follow-up, contracts and social declarations — we free 100% of your productive time.",
        },
        {
          icon: "clock",
          title: "Tax Optimisation",
          text: "Optimise your net income through professional expenses and Luxembourg tax advantages.",
        },
        {
          icon: "exchange",
          title: "Total Flexibility",
          text: "Change missions, adjust working time or manage several clients simultaneously without administrative constraints.",
        },
      ],
    },
    approach: {
      title: "OUR RIGOROUS APPROACH",
      intro:
        "A structured process to guarantee your security and compliance from day one.",
      bullets: [
        "Initial compliance audit",
        "Secure tripartite signature",
        "Monthly transparent reporting",
      ],
      steps: [
        {
          label: "STEP 01",
          title: "Compliance",
          text: "We stay permanently up to date on Luxembourg legislation to ensure the sustainability of your status.",
          tone: "light",
        },
        {
          label: "STEP 02",
          title: "Innovation",
          text: "Digital platform for tracking your invoices and activity account in real time.",
          tone: "dark",
        },
        {
          label: "STEP 03",
          title: "Support",
          text: "A dedicated advisor to answer your questions on taxation, retirement and your mutual.",
          tone: "dark",
        },
        {
          label: "STEP 04",
          title: "Networking",
          text: "Access to a network of independents and partner companies in Luxembourg.",
          tone: "light",
        },
      ],
    },
    cta: {
      title: "Ready to launch your activity in Luxembourg?",
      text: "Get a personalised simulation of your net income and discover how AdvenSystem can propel your independent career.",
      boxText:
        "Fill in the form to receive your personalised income simulation.",
      button: "Request a free simulation",
      note: "Response within 24h • No commitment",
    },
  },
};
