import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Blog App",
  description: "Blog app using Next.js App Router",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="max-w-4xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
