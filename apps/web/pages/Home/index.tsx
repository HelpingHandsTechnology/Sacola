import { Footer } from '../../components/Footer';
import { dummyArticles } from '../../fixtures/articles';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';

export default function Home() {
  return (
    <>
      <main className="flex w-full min-h-screen flex-col p-2 items-center">
        <div className="w-full px-4 flex flex-col gap-8 flex-1 max-w-6xl">
          <Header />
          <section className="grid gap-4 grid-cols-fit-16">
            {dummyArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
