import StyledComponentsRegistry from "@/libs/antd.registry";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "../../styles/global/index.scss";
import StoreProvider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ᴀᴛᴛᴇɴᴅᴀɴɴᴄᴇ-ꜰᴛ",
  description: "ᴀᴛᴛᴇɴᴅᴀɴɴᴄᴇ-ꜰᴛ",
};

const locales: string[] = ['en', 'de'];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string }
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <StoreProvider>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <body className={`${inter.className}`}>
              {children}
            </body>
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </StoreProvider>
    </html>
  );
}
