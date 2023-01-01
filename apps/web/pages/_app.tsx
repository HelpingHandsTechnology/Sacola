import 'raf/polyfill';
import 'babel-polyfill';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { trpcClient } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpcClient.withTRPC(App);
