import React from 'react';
import type { MainStackNavigationP, ComponentBaseP } from '../../../App';
import { View, Text, FlatList } from 'react-native';
import { AppLayout } from '../../shared/components/AppLayout';
import clsx from 'clsx';
import { ArticleDTO, dummyArticles } from '../../fixtures/articles';

export const Home = () => {
  const FirstLetterUser = 'A';
  return (
    <AppLayout>
      <View className="p-4 bg-black rounded-lg mb-8 content-between items-center flex-row">
        <Text className="text-xl font-bold text-white flex-1">Welcome back!</Text>
        <View className="w-8 h-8 bg-white rounded-lg items-center justify-center">
          <Text className="text-xs font-bold text-black">{FirstLetterUser}</Text>
        </View>
      </View>
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
    <View className={clsx('bg-black rounded-lg p-4', props.xClassName)}>
      <Text className="text-md font-bold text-white">{props.article.title}</Text>
      <Text className="text-sm font-light text-gray-400">{IntlDate.format(new Date(props.article.createdAt))}</Text>
    </View>
  );
};
