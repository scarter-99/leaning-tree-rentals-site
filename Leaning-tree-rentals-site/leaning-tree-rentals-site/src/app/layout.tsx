import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BUSINESS_NAME, BUSINESS_TAGLINE } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS_NAME} | Golf Cart Rentals in Texas`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description: `${BUSINESS_TAGLINE}. Rent 4 or 6 passenger golf carts for events, shows, and more. Affordable prices, reliable service.`,
  keywords: ["golf cart rental", "Texas", "event rental", "golf cart", "cart rental"],
  openGraph: {
    title: BUSINESS_NAME,
    description: BUSINESS_TAGLINE,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
