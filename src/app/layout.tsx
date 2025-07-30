import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Providers } from "./providers";
import { Box } from "@mui/material";

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
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.default',
            }}
          >
            <Navigation />
            <Box component="main" sx={{ flex: 1 }}>
              <Box sx={{ mx: 'auto', maxWidth: '7xl', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
                {children}
              </Box>
            </Box>
            <Footer />
          </Box>
        </Providers>

        {/* Cloudfare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN}"}`}
        ></script>
        {/* End Cloudflare Web Analytics  */}
      </body>
    </html>
  );
}
