import { ArticleItem } from "../Components/Home/ArticleList";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import { trpc } from "../utils/trpc";

const Favorites = () => {
  const articles = trpc.useQuery(["articles.getAll"], { retry: false });
  const filteredArticles = articles?.data?.filter(
    (article) => article.isFavorite === true
  );

  if (!articles.data) {
    return <div />;
  }

  return (
    <>
      <main>
        <h1 className="bg-slate-100">Favorites</h1>
        <ul>
          {filteredArticles?.map((article) => (
            <li key={article.id}>
              {
                <ArticleItem
                  title={article.title}
                  urlDomain={article.urlDomain}
                  tags={article.tags}
                  id={article.id}
                  isFavorite={article.isFavorite}
                />
              }
            </li>
          ))}
        </ul>
      </main>
      <FixedHomeTabOutlet />
    </>
  );
};

export default Favorites;
