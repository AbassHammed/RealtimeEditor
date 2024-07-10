import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { store } from '@/redux/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from '@/ThemeProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <Head>
          <title>LetsCode</title>
          <meta name="description" content="Online compiler for C, C++ and Python programs." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/Icon.png" />
        </Head>
        <NextUIProvider>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </RecoilRoot>
  );
}
