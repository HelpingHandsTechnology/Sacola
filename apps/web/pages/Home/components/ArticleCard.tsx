import { Text } from 'design';
import { ArticleDTO } from '../../../fixtures/articles';

export default function ArticleCard({ article }: { article: ArticleDTO }) {
  if (!article) return null;
  return (
    <article className="w-full bg-black rounded-lg p-4 h-60" key={article.id}>
      <h3 className="text-2xl text-white font-bold">{article.title}</h3>
      <Text xClassName="text-white text-sm">Created at {IntlDate.format(new Date(article.createdAt))}</Text>
    </article>
  );
}

const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
