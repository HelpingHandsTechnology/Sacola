import { ArticleItem } from "../Components/Home/ArticleList";
import { FixedHeaderHome } from "../Components/Home/FixedHeaderHome";
import { FixedHomeTabOutlet } from "../Components/Home/FixedHomeTabOutlet";
import { CommonHeaderContainer } from "../Components/shared/CommonHeaderContainer";
import { trpc } from "../utils/trpc";

const Favorites = () => {
  const articles = trpc.useQuery(["articles.getFavorite"], { retry: false });

  if (!articles.data) {
    return <div />;
  }

  return (
    <>
      <main>
        <CommonHeaderContainer title={"Meus favoritos"} />
        <ul>
          {articles.data?.map((article) => (
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
