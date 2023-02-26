import { Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../../components/Text';
import { Article, ArticleTag, ArticleUser } from '@prisma/client';

interface ArticleDTO {
  article: Article;
  user: { name: string; email: string };
  articleTags: { tag: { name: string; id: string }; tagId: string }[];
  userId: string;
  articleId: string;
  isFavorite: boolean;
}

interface ArticleCardProps {
  article: ArticleDTO;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <TouchableOpacity
      accessibilityRole="summary"
      className="flex flex-col w-full bg-black rounded-lg h-80 cursor-pointer"
    >
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
    </TouchableOpacity>
  );
}

const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
