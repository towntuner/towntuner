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
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <p className="text-center text-xs leading-5 text-gray-500">
            Created at <a href="https://hackhpi.org">HackHPI</a> 2024. Not affiliated with the City of Potsdam.
          </p>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              Made by Luise, Simon, Linus, Florian and Sönke
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
