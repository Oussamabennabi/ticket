import "~/styles/globals.css";
import { Poppins } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";

const font = Poppins({ subsets: ["latin"],weight:"500" });

export const metadata = {
  title: "Ticket",
  description: "Event Tickets",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className={font.className}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
