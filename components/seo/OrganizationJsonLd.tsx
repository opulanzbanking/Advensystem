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
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "49 Duarrefstrooss",
        postalCode: "L-9964",
        addressLocality: "Huldange",
        addressCountry: "LU",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "53 Boulevard Royal",
        postalCode: "L-2449",
        addressLocality: "Luxembourg",
        addressCountry: "LU",
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
