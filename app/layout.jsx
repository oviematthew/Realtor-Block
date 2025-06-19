import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Realtor Bloc - Your Real Estate App",
  keywords: "real estate, realtor, property, homes, buy, sell, rent",
  description:
    "Realtor Bloc is your go-to platform for all real estate needs, whether you're buying, selling, or renting properties.",
  creator: "Realtor Bloc Team",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en">
        <body className={`${inter.variable}  antialiased`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
