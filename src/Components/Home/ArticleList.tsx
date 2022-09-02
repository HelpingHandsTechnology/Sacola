export const arrArticleList = [
  {
    title: "There ain't no such thing as a free tier",
    urlDomain: "youtube.com",
    tags: ["nextjs", "trpc"],
  },
  {
    title: "How to build a hacker news clone",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
  },
  {
    title: "How I Got Good at Coding Interviews",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
  },
  {
    title:
      "MBAK】Navigation | Hamburger and Navigation Transition Effects | CSS& JavaScript #OnlineTutorials",
    urlDomain: "reddit.com",
    tags: ["product", "development"],
  },
];
export const ArticleList = () => {
  return (
    <>
      {arrArticleList.map((article, index) => {
        return (
          <>
            <ArticleItem
              title={article.title}
              urlDomain={article.urlDomain}
              tags={article.tags}
            />
            <Divider />
          </>
        );
      })}
    </>
  );
};

const ArticleItem = ({ title, urlDomain, tags }) => {
  return (
    <div className="flex items-start px-4 py-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-200 -900 -mt-1">{title}</h2>
        </div>
        <p className="text-slate-200 text-xs opacity-50">{urlDomain}</p>
        <p className="mt-3 text-slate-200 text-sm">
          {tags.map((tag, index) => {
            return <ArticleItemTag key={index} tag={tag} />;
          })}
        </p>
      </div>
    </div>
  );
};

const ArticleItemTag = ({ tag }) => (
  <span
    key={tag}
    className="inline-block px-2  mr-2 text-xs font-medium leading-6 text-slate-900  rounded-md bg-slate-400"
  >
    {tag}
  </span>
);

const Divider = () => <div className="border-t border-slate-200 dark:border-slate-800" />;
