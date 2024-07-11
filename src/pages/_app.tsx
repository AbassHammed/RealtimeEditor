import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import { store } from '@/redux/store';
import { ThemeProvider } from '@/ThemeProvider';
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
          <link rel="icon" href="/Icon.png" />
        </Head>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </RecoilRoot>
  );
}
