import { useRouter } from "next/router";
import React from "react";
import { ArticleItem } from "../../Components/Home/ArticleList";
import { FixedArticleTabOutlet } from "../../Components/Home/FixedArticleTabOutlet";
import { trpc } from "../../utils/trpc";

const Read = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== "string") {
    return <div />;
  }

  const article = trpc.useQuery(["articles.getById", { id }], { retry: false });

  if (article.isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
      </div>
    );
  }
  if (article.error) {
    return <div>error</div>;
  }

  return (
    <div>
      {article?.data && (
        <React.Fragment>
          <ArticleItem {...article.data} />
          <Divider />
        </React.Fragment>
      )}

      <FixedArticleTabOutlet />
    </div>
  );
};

const Divider = () => (
  <div className="border-t border-slate-200 dark:border-slate-800" />
);

export default Read;
