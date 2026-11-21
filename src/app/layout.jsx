
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MediCare Hospital | Quality Healthcare & Expert Doctors",
  description:
    "Experience quality healthcare, expert doctors, modern diagnostic facilities and comprehensive health packages at MediCare Hospital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
