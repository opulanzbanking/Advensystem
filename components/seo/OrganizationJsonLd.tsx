import { company, siteUrl } from "@/lib/site";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/images/theme/logo.svg`,
    email: company.email,
    telephone: company.phone,
    sameAs: [company.facebook],
    founder: {
      "@type": "Person",
      name: company.founder.name,
      jobTitle: company.founder.role,
      email: company.founder.email,
      telephone: company.founder.phone,
      image: `${siteUrl}${company.founder.cardImage}`,
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "49 Duarrefstrooss",
        postalCode: "L-9964",
        addressLocality: "Huldange",
        addressCountry: "LU",
        name: "Head office",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "34 Grand rue",
        postalCode: "L-9710",
        addressLocality: "Clervaux",
        addressCountry: "LU",
        name: "Business center",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "53 Boulevard Royal",
        postalCode: "L-2449",
        addressLocality: "Luxembourg",
        addressCountry: "LU",
        name: "Executive office",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
