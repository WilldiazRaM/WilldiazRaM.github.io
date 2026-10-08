import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { site, hasRealPhone } from "@/data/site";
import { Attribution } from "@/components/Attribution";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.brand,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  icons: {
    icon: "/favicon.svg",
    apple: "/kyrios-tile.jpg", // Para cuando guarden tu web en la pantalla de un iPhone
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: site.url,
    siteName: site.brand,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
  ...(site.gscVerification
    ? { verification: { google: site.gscVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#060b18",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.company,
      alternateName: site.brand,
      url: site.url,
      description: site.description,
      areaServed: { "@type": "Country", name: "Chile" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressCountry: "CL",
      },
      email: site.email,
      ...(hasRealPhone ? { telephone: site.phone } : {}),
      founder: { "@id": `${site.url}/#person` },
      sameAs: [site.github, site.linkedin],
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      worksFor: { "@id": `${site.url}/#business` },
      sameAs: [site.github, site.linkedin],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-CL"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Cabeceras de seguridad compatibles con HTML estático */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.workers.dev https://www.google-analytics.com;"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Attribution />
        {children}
        {site.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
