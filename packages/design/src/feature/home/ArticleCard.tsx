import { ArticleDTO } from 'fixtures';
import { Image, View } from 'react-native';
import { Text } from '../../components/Text';

export function ArticleCard({ item }: { item: ArticleDTO }) {
  return (
    <View accessibilityRole="summary" className="flex flex-col w-full bg-black rounded-lg h-80">
      <View className="flex items-center justify-center overflow-hidden w-full rounded-lg rounded-b-none h-40">
        <Image source={{ uri: item.image }} className="object-fill w-full h-full" />
      </View>
      <View className="flex flex-1 flex-col p-4 h-fit">
        <Text as="h3" xClassName="text-2xl text-white font-bold">
          {item.title}
        </Text>
        <Text as="p" xClassName="text-sm text-white truncate">
          {item.shortDescription}
        </Text>
        <Text xClassName="text-white text-sm mt-auto">Created at {IntlDate.format(new Date(item.createdAt))}</Text>
      </View>
    </View>
  );
}

const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
