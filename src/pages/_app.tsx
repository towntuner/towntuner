import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Roboto, Merriweather } from "next/font/google";

const roboto_400 = Roboto({ weight: "400", subsets: ["latin"] });
const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-merriweather",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${merriweather.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
