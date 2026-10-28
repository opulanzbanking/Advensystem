import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { homeContent } from "@/lib/content/home";
import { ContactProvider } from "@/components/contact/ContactProvider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AdvenSystem",
    template: "%s – AdvenSystem",
  },
  description: homeContent.fr.meta.description,
  applicationName: "AdvenSystem",
  icons: {
    icon: [
      { url: "/images/2021/02/cropped-favicon-32x32.png", sizes: "32x32" },
      { url: "/images/2021/02/cropped-favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/images/2021/02/cropped-favicon-180x180.png",
  },
  openGraph: {
    type: "website",
    siteName: "AdvenSystem",
    locale: "fr_LU",
    alternateLocale: ["en_GB"],
    url: siteUrl,
    title: "AdvenSystem",
    description: homeContent.fr.meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "AdvenSystem",
    description: homeContent.fr.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003ABD",
};

const localeScript = `(function(){try{var p=window.location.pathname;var en=p==='/en'||p.indexOf('/en/')===0;document.documentElement.lang=en?'en':'fr';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={barlow.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: localeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Aller au contenu / Skip to content
        </a>
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
