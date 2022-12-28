import { Footer } from '../../components/Footer';
import { dummyArticles } from 'fixtures';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';

export default function Home() {
  return (
    <div className="flex w-full min-h-screen flex-col items-center gap-8">
      <Header />
      <main className="w-full px-4 py-4 flex flex-col max-w-6xl mb-auto">
        <section className="grid gap-4 grid-cols-fit-16">
          {dummyArticles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
