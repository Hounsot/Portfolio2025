import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
export const metadata = {
  title: "Matvey Vasilyev — Design portfolio",
  description: "Matvey Vasilyev — Design portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`antialiased bg-zinc-950`}
      >
        <Header />
        <div className="2xs:h-50 h-34 w-fill max-w-[1920px] mx-auto"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
