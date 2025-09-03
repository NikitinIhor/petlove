import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./globals.css";
import { store } from "./redux/store";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "PetLove — Find and Buy Pets Online",
  description:
    "PetLove is your trusted platform to find and buy your perfect pet with ease and care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Provider store={store}>
          {/* <PersistGate loading={null}> */}
          <NextTopLoader />
          <Toaster />
          {children}
          {/* </PersistGate> */}
        </Provider>
      </body>
    </html>
  );
}
