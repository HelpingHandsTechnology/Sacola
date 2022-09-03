import type { NextPage } from "next";
import Head from "next/head";

import { ArticleList } from "../Components/Home/ArticleList";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import { FixedHeaderHome } from "../Components/Home/FixedHeaderHome";
import { useState } from "react";
import { HomeContextProvider } from "../contexts/homeContext";

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");

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
