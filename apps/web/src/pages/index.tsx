import type { GetServerSidePropsContext, NextPage } from 'next';
import { createSSGHelpers } from '@trpc/react/ssg';
import superjson from 'superjson';
import Head from 'next/head';

import { ArticleList } from '../Components/Home/ArticleList';
import { FixedHomeTabOutlet } from '../Components/Home/FixedHomeTabOutlet';
import { FixedHeaderHome } from '../Components/Home/FixedHeaderHome';
import { createContext, appRouter } from '@sacola/trpc';
import { useState } from 'react';
import { HomeContextProvider } from '../contexts/homeContext';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext({ req: req as any, res: res as any }),
    transformer: superjson,
  });
  await ssg.prefetchQuery('articles.getAll');
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}
const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  return (
    <HomeContextProvider
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      inputValue={inputValue}
      setInputValue={setInputValue}
    >
      <Head>
        <title>Bolso | Home</title>
        <meta name="description" content="Bolso | Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FixedHeaderHome />

      <ArticleList />

      <FixedHomeTabOutlet />
    </HomeContextProvider>
  );
};

export default Home;
