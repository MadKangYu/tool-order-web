import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "공구마트 - B2B 공구 도매 전문",
  description: "전문가를 위한 공구 도매 전문 쇼핑몰",
  keywords: "공구, 전동공구, 드릴, 망치, 도매, B2B",
  openGraph: {
    title: "공구마트",
    description: "전문가를 위한 공구 도매 전문 쇼핑몰",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
