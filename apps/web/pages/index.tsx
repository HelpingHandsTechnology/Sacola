import { useEffect } from 'react';
import { trpcNext } from '../lib/trpc';
import Home from './Home';

export default function HomePage() {
  const { data } = trpcNext.user.getUserInfo.useQuery();

  useEffect(() => {
    console.log('Logged User: ', data);
  }, [data]);

  return (
    <>
      <Home />
    </>
  );
}
