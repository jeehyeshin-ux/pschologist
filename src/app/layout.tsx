import type { Metadata, Viewport } from "next";
import { Black_Han_Sans, DM_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const blackHan = Black_Han_Sans({
  weight: "400",
  variable: "--font-black-han",
  display: "swap",
  preload: false,
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mind.healthandchoice.com"),
  title: "마음 탐색실",
  description:
    "다섯 가지 심리학 이야기로 나를 돌아보는 자기이해 서비스. 임상 진단이나 전문 심리평가를 대체하지 않아요.",
  openGraph: {
    title: "마음 탐색실",
    description: "다섯 가지 심리 이야기로 나를 들여다보고, 8가지 캐릭터 중 나를 닮은 하나를 만나 보세요.",
    siteName: "마음 탐색실",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "마음 탐색실" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "마음 탐색실",
    description: "다섯 가지 심리 이야기로 나를 들여다보고, 8가지 캐릭터 중 나를 닮은 하나를 만나 보세요.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f3f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${blackHan.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
