import { Text } from 'design';
import { ArticleDTO } from 'fixtures';

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  if (!article) return null;
  return (
    <article className="flex flex-col w-full bg-black rounded-lg h-80" key={article.id}>
      <figure className="flex items-center justify-center overflow-hidden w-full rounded-lg rounded-b-none h-40">
        <img src={article.image} alt={article.title} className="object-fill w-full" />
      </figure>
      <footer className="flex flex-1 flex-col p-4 h-fit">
        <h3 className="text-2xl text-white font-bold">{article.title}</h3>
        <p className="text-sm text-white truncate">{article.shortDescription}</p>
        <Text xClassName="text-white text-sm mt-auto">Created at {IntlDate.format(new Date(article.createdAt))}</Text>
      </footer>
    </article>
  );
}

const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
