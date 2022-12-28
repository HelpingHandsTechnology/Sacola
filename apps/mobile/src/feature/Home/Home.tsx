import React from 'react';
import type { ComponentBaseP } from '../../../App';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { AppLayout } from '../../shared/components/AppLayout';
import { dummyArticles } from '../../fixtures/articles';
import { ArticleCard } from './components/ArticleCard';
import { GreetingComponent } from './components/GreetingComponent';
import clsx from 'clsx';
import { Row } from 'design';

export const Home = () => {
  return (
    <AppLayout xClassName="bg-white px-4 pb-4 flex-1">
      <HomeTopCard />
      <FlatList
        ListHeaderComponent={() => <Text className="text-xl font-bold mb-4">Your Articles</Text>}
        data={dummyArticles.concat(dummyArticles)}
        renderItem={({ item, index }) => <ArticleCard article={item} xClassName={index === 0 ? undefined : 'mt-4'} />}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};

const HomeTopCard = () => {
  return (
    <View className="p-4 bg-black rounded-lg mb-8 content-between items-center flex-row">
      <GreetingComponent />
      <Row>
        <HomeAddLinkButton xClassName="mr-2" />
        <HomeFirstLetterUserComponent />
      </Row>
    </View>
  );
};
type HomeFirstLetterUserComponentP = ComponentBaseP;
const HomeFirstLetterUserComponent = (p: HomeFirstLetterUserComponentP) => {
  const FirstLetterUser = 'A';
  return (
    <View className={clsx('w-8 h-8 bg-white rounded-lg items-center justify-center', p.xClassName)}>
      <Text className="text-xs font-bold text-black">{FirstLetterUser}</Text>
    </View>
  );
};

const HomeAddLinkButton = (p: HomeFirstLetterUserComponentP) => {
  const FirstLetterUser = '+';
  return (
    <TouchableOpacity className={clsx('w-8 h-8 bg-white rounded-lg items-center justify-center', p.xClassName)}>
      <Text className="text-xs font-bold text-black">{FirstLetterUser}</Text>
    </TouchableOpacity>
  );
};
