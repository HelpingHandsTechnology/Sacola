import { ArticleCard } from 'design';
import { Footer } from '../../components/Footer';
import { trpcNext } from '../../lib/trpc';
import Header from './components/Header';

export default function Home() {
  const utils = trpcNext.useContext();

  const { data: articles, isLoading, error } = trpcNext.articles.getAll.useQuery();

  // TODO: Do optmistic update here
  const { mutate } = trpcNext.articles.create.useMutation({
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

  const handleCreateArticle = (url: string) => {
    mutate(
      { url },
      {
        onSuccess: () => {
          console.log('article created');
        },
      },
    );
  };

  return (
    <div className="flex w-full min-h-screen flex-col items-center gap-8">
      <Header handleCreateArticle={handleCreateArticle} />
      <main className="w-full px-4 py-4 flex flex-col max-w-6xl mb-auto">
        <section className="grid gap-4 grid-cols-fit-16">
          {articles.length > 0 ? (
            articles.map((article) => <ArticleCard article={article} key={article.article.id} />)
          ) : (
            <div className="text-center">No articles found. Try creating one!</div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
