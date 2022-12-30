import 'raf/polyfill';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { trpcClient } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpcClient.withTRPC(App);
