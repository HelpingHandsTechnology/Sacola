import { ArticleCard } from 'design';
import { dummyArticles } from 'fixtures';
import { Footer } from '../../components/Footer';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="flex w-full min-h-screen flex-col items-center gap-8">
      <Header />
      <main className="w-full px-4 py-4 flex flex-col max-w-6xl mb-auto">
        <section className="grid gap-4 grid-cols-fit-16">
          {dummyArticles.map((article) => (
            <ArticleCard item={article} key={article.id} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
