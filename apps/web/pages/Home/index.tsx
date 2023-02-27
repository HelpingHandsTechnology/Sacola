import { Layout } from '@/components/layout';
import { ArticleCard, DropdownMenu } from 'design';

import { trpcNext } from '../../lib/trpc';

export default function Home() {
  const utils = trpcNext.useContext();

  const { data: articles, isLoading, error } = trpcNext.articles.getAll.useQuery();

  const { mutate: deleteMutation } = trpcNext.articles.deleteById.useMutation({
    onSuccess: () => {
      utils.articles.getAll.invalidate();
    },
  });

  const { mutate: updateMutation } = trpcNext.articles.updateById.useMutation({
    onSuccess: () => {
      utils.articles.getAll.invalidate();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleDeleteArticle = (articleId: string) => deleteMutation({ id: articleId });

  const handleFavoriteArticle = (articleId: string, isFavorite: boolean) =>
    updateMutation({ id: articleId, isFavorite: !isFavorite });

  const openArticle = (url: string) => window.open(url, '_blank');

  return (
    <Layout>
      <div className="container space-y-4">
        <h1 className="text-2xl font-medium">Your Findings</h1>
        <section className="grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard
                key={article.article.id}
                article={article}
                onClick={() => openArticle(article.article.urlDomain)}
              >
                <DropdownMenu
                  xClassName="absolute top-2 right-2 z-10"
                  items={[
                    {
                      name: 'View',
                      onClick: () => openArticle(article.article.urlDomain),
                    },
                    { name: 'Remove', onClick: () => handleDeleteArticle(article.article.id) },
                    {
                      name: article.isFavorite ? 'Unfavorite' : 'Favorite',
                      onClick: () => handleFavoriteArticle(article.article.id, article.isFavorite),
                    },
                  ]}
                />
              </ArticleCard>
            ))
          ) : (
            <div className="text-center">No articles found. Try creating one!</div>
          )}
        </section>
      </div>
    </Layout>
  );
}
