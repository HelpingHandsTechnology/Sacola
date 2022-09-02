import Link from "next/link";

export const arrArticleList = [
  {
    // uuid
    id: "4ba21484-6386-4c49-8801-61b25c336c34",
    title: "There ain't no such thing as a free tier",
    urlDomain: "youtube.com",
    tags: ["nextjs", "trpc"],
  },
  {
    id: "e7d8d50a-69ed-4643-908e-41d11fe66816",
    title: "How to build a hacker news clone",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
  },
  {
    id: "99e723e8-498f-4446-bec2-b99d39315535",

    title: "How I Got Good at Coding Interviews",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
  },
  {
    id: "5869aca0-d17f-4a44-b426-f4d11a645007",

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
            <ArticleItem {...article} />
            <Divider />
          </>
        );
      })}
    </>
  );
};

const ArticleItem = ({ title, urlDomain, tags, id }) => {
  return (
    <Link href={`read/${id}`}>
      <a>
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
      </a>
    </Link>
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
