import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const preventCopy = (event: { preventDefault: () => any }) =>
      event.preventDefault();
    document.addEventListener("copy", preventCopy);

    return () => {
      document.removeEventListener("copy", preventCopy);
    };
  }, []);
  return (
    <RecoilRoot>
      <Head>
        <title>LetsCode</title>
        <meta
          name="description"
          content="Online compiler for C, C++ and Python programs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Icon.png" sizes="180*180" />
      </Head>
      <Toaster richColors position="top-center" closeButton />
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </RecoilRoot>
  );
}
