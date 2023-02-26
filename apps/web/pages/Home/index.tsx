import { ArticleCard, DropdownMenu } from 'design';

import { trpcNext } from '../../lib/trpc';
import Header from './components/Header';

export default function Home() {
  const utils = trpcNext.useContext();

  const { data: articles, isLoading, error } = trpcNext.articles.getAll.useQuery();

  // TODO: Do optmistic update here
  const { mutate: createMutation } = trpcNext.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.getAll.invalidate();
    },
  });

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

  const handleCreateArticle = (url: string) => createMutation({ url });

  const handleDeleteArticle = (articleId: string) => deleteMutation({ id: articleId });

  return (
    <>
      <Header handleCreateArticle={handleCreateArticle} />
      <main className="w-full px-4 py-4 flex flex-col max-w-6xl mb-auto">
        <section className="grid gap-4 grid-cols-fit-16">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard article={article} key={article.article.id}>
                <DropdownMenu
                  xClassName="absolute top-2 right-2 z-10"
                  items={[
                    { name: 'View', onClick: () => {} },
                    { name: 'Remove', onClick: () => handleDeleteArticle(article.article.id) },
                  ]}
                />
              </ArticleCard>
            ))
          ) : (
            <div className="text-center">No articles found. Try creating one!</div>
          )}
        </section>
      </main>
    </>
  );
}
