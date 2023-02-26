import { Layout } from '@/components/layout';
import Header from '@/components/site-header';
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleDeleteArticle = (articleId: string) => deleteMutation({ id: articleId });

  const openArticle = (url: string) => window.open(url, '_blank');

  return (
    <Layout>
      <section className="grid gap-4 grid-cols-fit-16">
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
                ]}
              />
            </ArticleCard>
          ))
        ) : (
          <div className="text-center">No articles found. Try creating one!</div>
        )}
      </section>
    </Layout>
  );
}
