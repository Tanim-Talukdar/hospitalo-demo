import "./globals.css";

export const metadata = {
  title: "MediCare Hospital | Quality Healthcare & Expert Doctors",
  description:
    "Experience quality healthcare, expert doctors, modern diagnostic facilities and comprehensive health packages at MediCare Hospital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}