import React from 'react';
import type { ComponentBaseP } from '../../../App';
import { View, Text } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { AppLayout } from '../../shared/components/AppLayout';
import { dummyArticles } from 'fixtures';
import { ArticleCard } from './components/ArticleCard';
import { GreetingComponent } from './components/GreetingComponent';
import clsx from 'clsx';
import { Row } from 'design';
import { AppButton } from '../../shared/components/AppButton';

export const Home = () => {
  return (
    <AppLayout xClassName="bg-white px-4 pb-4 flex-1">
      <HomeTopCard />
      <FlashList
        ListHeaderComponent={() => <Text className="text-xl font-bold mb-4">Your Articles</Text>}
        estimatedItemSize={100}
        data={dummyArticles}
        renderItem={ArticleCard}
        keyExtractor={(item) => item.id}
      />
    </AppLayout>
  );
};

const HomeTopCard = () => {
  return (
    <View className="py-4 bg-white rounded-lg mb-8 content-between items-center flex-row">
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
    <AppButton xClassName={clsx('w-8 h-8 bg-black rounded-lg items-center justify-center', p.xClassName)}>
      <Text className="text-xs font-bold text-white">{FirstLetterUser}</Text>
    </AppButton>
  );
};

const HomeAddLinkButton = (p: HomeFirstLetterUserComponentP) => {
  const FirstLetterUser = '+';
  return (
    <AppButton xClassName={clsx('w-8 h-8 bg-black rounded-lg items-center justify-center', p.xClassName)}>
      <Text className="text-xs font-bold text-white">{FirstLetterUser}</Text>
    </AppButton>
  );
};
