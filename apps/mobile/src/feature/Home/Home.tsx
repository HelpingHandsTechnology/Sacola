import React from 'react';
import type { MainStackNavigationP } from '../../../App';
import { View, Text, FlatList } from 'react-native';
import { AppLayout } from '../../shared/components/AppLayout';
import { dummyArticles } from '../../fixtures/articles';
import { ArticleCard } from './components/ArticleCard';
import { GreetingComponent } from './components/GreetingComponent';

export const Home = () => {
  const FirstLetterUser = 'A';
  return (
    <AppLayout>
      <View className="p-4 bg-black rounded-lg mb-8 content-between items-center flex-row">
        <GreetingComponent />
        <View className="w-8 h-8 bg-white rounded-lg items-center justify-center">
          <Text className="text-xs font-bold text-black">{FirstLetterUser}</Text>
        </View>
      </View>

      <FlatList
        ListHeaderComponent={() => <Text className="text-xl font-bold mb-4">Your Articles</Text>}
        data={dummyArticles}
        renderItem={({ item, index }) => <ArticleCard article={item} xClassName={index === 0 ? undefined : 'mt-4'} />}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};
