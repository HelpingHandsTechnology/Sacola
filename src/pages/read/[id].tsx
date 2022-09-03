import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { FaStar } from "react-icons/fa";
import { ArticleItem, ArticleItemTag } from "../../Components/Home/ArticleList";
import { FixedArticleTabOutlet } from "../../Components/Home/FixedArticleTabOutlet";
import { trpc } from "../../utils/trpc";

const Read = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div />;
  }

  const article = trpc.useQuery(["articles.getById", { id }], { retry: false });
  const articleReadability = trpc.useQuery(
    ["articles.getReadabilityById", { id }],
    { retry: false }
  );

  if (article.isLoading || articleReadability.isLoading) {
    return (
      <>
        <div className="space-y-3">
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        </div>
        <FixedArticleTabOutlet {...{ textHtml: "" }} />
      </>
    );
  }
  if (article.error || articleReadability.error) {
    return <div>error</div>;
  }

  const data = article?.data;
  const readabilityData = articleReadability?.data;

  return (
    <div>
      {data && readabilityData && (
        <React.Fragment>
          <Head>
            <title>Bolso | {data.title}</title>
            <meta name="description" content={`Bolso | ${data.title}`} />
          </Head>

          <div className="px-4 py-2">
            <div className="w-full">
              <h2 className=" text-slate-200 text-lg text-center font-semibold  mt-1 mb-2">
                {data.title}
              </h2>
            </div>
            <a
              href={data.urlDomain}
              target="_blank"
              rel="noreferrer"
              className="text-slate-200 text-xs opacity-50"
            >
              {data.urlDomain}
            </a>
            <div
              className="flex  text-slate-200 flex-row items-center mt-3 w-full [&>*]:overflow-auto"
              dangerouslySetInnerHTML={{ __html: readabilityData.content }}
            />
          </div>
        </React.Fragment>
      )}

      <FixedArticleTabOutlet
        {...{ textHtml: readabilityData?.textContent ?? "" }}
      />
    </div>
  );
};

export default Read;
