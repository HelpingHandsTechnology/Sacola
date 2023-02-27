import { Image, View } from 'react-native';
import { Article } from '@prisma/client';

import { Text } from '../../components/Text';

interface ArticleDTO {
  article: Article;
  user: { name: string; email: string };
  articleTags: { tag: { name: string; id: string }; tagId: string }[];
  userId: string;
  articleId: string;
  isFavorite: boolean;
}

interface ArticleCardProps {
  children?: React.ReactNode;
  article: ArticleDTO;
  onClick: () => void;
}

export function ArticleCard({ article, children, onClick }: ArticleCardProps) {
  return (
    <div className="relative flex h-80 w-full cursor-pointer flex-col rounded-lg bg-black sm:h-72" onClick={onClick}>
      <View className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg rounded-b-none">
        <Image source={{ uri: article.article.image }} className="h-full w-full object-fill" />
      </View>
      <View className="flex h-fit flex-1 flex-col p-4">
        <Text as="h3" xClassName="text-xl text-white font-bold line-clamp-2">
          {article.article.title}
        </Text>
        <Text as="p" xClassName="text-sm text-white line-clamp-3">
          {article.article.shortDescription}
        </Text>
      </View>
      {children}
    </div>
  );
}

const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
