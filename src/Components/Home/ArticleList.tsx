const arrArticleList = [
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
  return arrArticleList.map((article, index) => {
    return (
      <ArticleItem
        title={article.title}
        urlDomain={article.urlDomain}
        tags={article.tags}
      />
    );
  });
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
        <div className="mt-4 flex items-center">
          <div className="flex mr-2 text-slate-200 text-sm mr-3">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>12</span>
          </div>
          <div className="flex mr-2 text-slate-200 text-sm mr-8">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <span>8</span>
          </div>
          <div className="flex mr-2 text-slate-200 text-sm mr-4">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span>share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleItemTag = ({ tag }) => (
  <span
    key={tag}
    className="inline-block px-2 py-1 mr-2 text-xs font-medium leading-6 text-slate-200 bg-slate-900 rounded-full"
  >
    {tag}
  </span>
);
