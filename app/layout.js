import "./globals.css";

export const metadata = {
  title: "Math game",
  description: "A game from that one nerdy guy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
