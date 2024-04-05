import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Roboto } from "next/font/google";

const roboto_400 = Roboto({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto_400.className}`}>
      <Component {...pageProps} />
    </div>
  );
}
