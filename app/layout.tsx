import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://howlsecuritygroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HOWL SECURITY GROUP | Preemptive Protection. Uncompromising Vigilance.",
    template: "%s | HOWL Security Group",
  },
  description:
    "Special Operations leadership & martial arts mastery applied to executive protection, high-stakes event security (BKFC), commercial static guarding, and global crisis advisory across Florida and worldwide. U.S. Army Ranger Veteran Owned & Operated.",
  keywords: [
    "Howl Security Group",
    "HOWL Security Group LLC",
    "Gerald Hazellief",
    "Executive Protection South Florida",
    "US Army Ranger Security Agency",
    "Florida State Security License B-3800282",
    "Armed Security Detail Class-G Florida",
    "Unarmed Guarding Class-D Florida",
    "BKFC Event Security Detail",
    "Combat Sports Arena Security",
    "Ving Tsun Combatives Training",
    "Fort Pierce Tactical Operations",
    "Palm Beach Executive Bodyguard",
    "Miami Threat Mitigation",
    "Treasure Coast Security Agency",
    "High-Net-Worth Estate Security",
    "Tier-0 Global Advisory",
  ],
  authors: [{ name: "HOWL Security Group Operations Command", url: siteUrl }],
  creator: "HOWL Security Group LLC",
  publisher: "HOWL Security Group LLC",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "HOWL SECURITY GROUP | Preemptive Protection. Uncompromising Vigilance.",
    description:
      "Elite tactical protection, executive close protection, and commercial threat mitigation led by U.S. Army Ranger veterans. 24/7 Dispatch: (772) 940-4114.",
    url: siteUrl,
    siteName: "HOWL Security Group",
    images: [
      {
        url: "/images/founder-command.png",
        width: 1200,
        height: 630,
        alt: "HOWL Security Group - Founder Gerald Hazellief and Tactical Command Shield",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOWL SECURITY GROUP | Special Operations Security",
    description:
      "U.S. Army Ranger veteran-led executive protection, BKFC arena security, and commercial guarding in Florida.",
    images: ["/images/founder-command.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Fort Pierce, Palm Beach, Miami, Florida",
    "geo.position": "27.4467;-80.3256",
    "ICBM": "27.4467, -80.3256",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Global Schema.org JSON-LD graph
const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SecurityService",
      "@id": "https://howlsecuritygroup.com/#organization",
      "name": "HOWL Security Group LLC",
      "alternateName": ["HOWL Security", "Howl Defense Systems"],
      "url": "https://howlsecuritygroup.com",
      "logo": "https://howlsecuritygroup.com/images/founder-command.png",
      "image": "https://howlsecuritygroup.com/images/founder-command.png",
      "description":
        "Elite security agency led by US Army Ranger veterans specializing in executive protection, armed and unarmed static guarding, BKFC arena details, and defensive martial arts combatives.",
      "telephone": "+1-772-940-4114",
      "email": "operations@howlsecurity.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fort Pierce",
        "addressRegion": "FL",
        "postalCode": "34950",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.4467,
        "longitude": -80.3256,
      },
      "areaServed": [
        { "@type": "State", "name": "Florida" },
        { "@type": "AdministrativeArea", "name": "Treasure Coast" },
        { "@type": "AdministrativeArea", "name": "Palm Beach County" },
        { "@type": "AdministrativeArea", "name": "Miami-Dade County" },
        { "@type": "Country", "name": "United States" },
      ],
      "founder": {
        "@type": "Person",
        "name": "Gerald Hazellief",
        "jobTitle": "Founder & Principal Instructor",
        "description": "US Army 75th Ranger Regiment Veteran & Ving Tsun Kung Fu Master",
      },
      "license": "Florida State Agency License # B-3800282",
      "priceRange": "$$$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          "opens": "00:00",
          "closes": "23:59",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://howlsecuritygroup.com/#website",
      "url": "https://howlsecuritygroup.com",
      "name": "HOWL Security Group",
      "description": "Preemptive Protection. Uncompromising Vigilance.",
      "publisher": {
        "@id": "https://howlsecuritygroup.com/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#07090E] text-zinc-100 selection:bg-amber-500 selection:text-black">
      <head>
        <Script
          id="global-schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#07090E] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
