import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, FlatList } from 'react-native';
import { AppLayout } from '../../shared/components/AppLayout';
import clsx from 'clsx';
import { ArticleDTO, dummyArticles } from '../../fixtures/articles';
import { MainStackNavigationP, navigateFactory, ComponentBaseP } from '../../../App';

export const Home = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  return (
    <AppLayout>
      <FlatList
        data={dummyArticles}
        renderItem={({ item, index }) => <ArticleCard article={item} xClassName={index === 0 ? undefined : 'mt-4'} />}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};
const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const ArticleCard = (props: { article: ArticleDTO } & ComponentBaseP) => {
  return (
    <View className={clsx('bg-gray-500 rounded-lg p-4', props.xClassName)}>
      <Text className="text-md font-bold">{props.article.title}</Text>
      <Text className="text-sm font-light text-gray-800">
        add at {IntlDate.format(new Date(props.article.createdAt))}
      </Text>
    </View>
  );
};
