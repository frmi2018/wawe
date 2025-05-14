import "./globals.css";
import { AuthProvider } from "@/components/AuthContext";

export const metadata = {
  title: "My App",
  description: "Application with Supabase Authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
