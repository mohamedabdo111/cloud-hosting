import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navbar from "@/components/Navbar/navbar";
import { cookies } from "next/headers";
import { verifyUser } from "@/utils/verifyToken";
import { IUserData } from "@/utils/dtos";
import { Toaster } from "react-hot-toast";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const token = cookies().get("authToken")?.value as string;
  const verify = verifyUser(token);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar UserData={verify as IUserData} locale={locale}></Navbar>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
