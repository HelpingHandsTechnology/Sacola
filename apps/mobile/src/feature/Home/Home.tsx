import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text, View } from 'react-native';

import { dummyArticles } from 'fixtures';
import { AppLayout } from '../../shared/components/AppLayout';
// import { ArticleCard } from './components/ArticleCard';
import { ArticleCard } from 'design';
import { HomeTopCard } from './components/HomeTopCard';

export const Home = () => {
  return (
    <AppLayout xClassName="bg-white flex-1 px-4" insetBottom={0}>
      <HomeTopCard />
      <FlashList
        ListHeaderComponent={() => <Text className="text-xl font-bold mb-4">Your Articles</Text>}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
        data={dummyArticles}
        renderItem={({ item, index }) => (
          <View className={`${index === 0 ? 'mt-4' : 'mt-8'}`}>
            <ArticleCard item={item} />
          </View>
        )}
        ListFooterComponent={() => <View className="h-16" />}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};
