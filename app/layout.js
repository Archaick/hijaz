import "./globals.css";

export const metadata = {
  title: "Hijaz",
  description: "A Next.js app we are building step by step.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
