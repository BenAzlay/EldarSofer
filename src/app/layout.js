import { Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Ubuntu({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
});

export const metadata = {
  title: "Eldar Sofer | Wisdom for Our Age",
  description: "Wisdom stories for the 21st century, by author Eldar Sofer.",
  authors: [{ name: "Eldar Sofer" }],
  openGraph: {
    title: "Eldar Sofer | Wisdom for Our Age",
    description: "Wisdom stories for the 21st century, by author Eldar Sofer.",
    url: "https://eldarsofer.com",
    siteName: "Eldar Sofer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eldar Sofer | Wisdom for Our Age",
    description: "Wisdom stories for the 21st century, by author Eldar Sofer.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
