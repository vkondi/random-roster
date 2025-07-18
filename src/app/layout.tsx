import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Random Roster",
  description: "Team shuffling and sorting made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <Providers>
          <div className="min-h-full flex flex-col">
            <Navigation />
            <main className="flex-1">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>

        {/* Cloudfare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": ${process.env.CLOUDFARE_WEB_ANALYTICS_TOKEN}}`}
        ></script>
        {/* End Cloudflare Web Analytics  */}
      </body>
    </html>
  );
}
