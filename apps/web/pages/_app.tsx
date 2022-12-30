import 'raf/polyfill'
// @ts-ignore really annoying reanimated bug
global.setImmediate = requestAnimationFrame
// FIXME need reanimated update, see https://github.com/software-mansion/react-native-reanimated/issues/3355
if (process.browser) {
  // @ts-ignore
  window._frameTimestamp = null;
}
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { trpcClient } from '../utils/trpc';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpcClient.withTRPC(App);
