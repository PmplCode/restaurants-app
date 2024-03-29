import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "./Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant App",
  description: "Restaurant app generated with nextjs and mongodb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="max-w-5xl mx-auto p-4">
            <Navbar />
            <div className="mt-4">{children}</div>
          </div>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
