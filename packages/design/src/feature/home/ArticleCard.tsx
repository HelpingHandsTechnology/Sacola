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
    <div className="flex flex-col w-full bg-black rounded-lg h-80 cursor-pointer relative" onClick={onClick}>
      <View className="flex items-center justify-center overflow-hidden w-full rounded-lg rounded-b-none h-40">
        <Image source={{ uri: article.article.image }} className="object-fill w-full h-full" />
      </View>
      <View className="flex flex-1 flex-col p-4 h-fit">
        <Text as="h3" xClassName="text-2xl text-white font-bold line-clamp-2">
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
