import "./globals.css";
import { Lato, Poppins, Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ReduxProvider from "../components/reduxProvider";
import { NavProvider } from "../context/nav_context";
import WagmiProviders from "../components/wagmiProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Verxio Protocol",
  description: "Verxio Protocol",
};

export default async function RootLayout({ children }) {
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter`}>
        <NavProvider>
          <ReduxProvider>
            <WagmiProviders>
              <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
            </WagmiProviders>
          </ReduxProvider>
        </NavProvider>
      </body>
    </html>
  );
}
