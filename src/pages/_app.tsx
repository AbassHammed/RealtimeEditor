import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Toaster } from '@/components/Shared/toast';
import { store } from '@/redux/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <Head>
          <title>LetsCode</title>
          <meta name="description" content="Online compiler for C, C++ and Python programs." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Icon.png" sizes="180*180" />
        </Head>
        <Toaster />
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </Provider>
    </RecoilRoot>
  );
}
