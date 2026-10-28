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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
