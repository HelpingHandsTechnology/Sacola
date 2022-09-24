import { ArticleItem } from '../Components/Home/ArticleList';
import { FixedHomeTabOutlet } from '../Components/Home/FixedHomeTabOutlet';
import { CommonHeaderContainer } from '../Components/shared/CommonHeaderContainer';
import { trpc } from '../utils/trpc';

const Favorites = () => {
  const articles = trpc.useQuery(['articles.getFavorite'], { retry: false });

  if (articles.isLoading) {
    return (
      <>
        <CommonHeaderContainer title={'Meus favoritos'} />
        <div className="space-y-3 ">
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
          <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        </div>
        <FixedHomeTabOutlet />
      </>
    );
  }

  return (
    <>
      <CommonHeaderContainer title={'Meus favoritos'} />
      <main>
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
