import { trpcNext } from '../lib/trpc';
import Home from './Home';

export default function HomePage() {
  const { data } = trpcNext.user.getUserInfo.useQuery();
  return (
    <>
      <Home />
    </>
  );
}
