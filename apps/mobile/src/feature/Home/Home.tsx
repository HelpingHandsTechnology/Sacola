import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ComponentBaseP, MainStackNavigationP } from '../../../App';

import { dummyArticles } from 'fixtures';
import { AppLayout } from '../../shared/components/AppLayout';
// import { ArticleCard } from './components/ArticleCard';
import clsx from 'clsx';
import { ArticleCard, Row } from 'design';
import { AppButton } from '../../shared/components/AppButton';
import { GreetingComponent } from './components/GreetingComponent';
import { trpcApp } from '../../lib/trpc';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { deleteAuthMMKV } from '../../lib/mmkv';

export const Home = () => {
  return (
    <AppLayout xClassName="bg-white flex-1 px-4" insetBottom={0}>
      <HomeTopCard />
      <Modal />
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
  const { data: user } = trpcApp.user.getUserInfo.useQuery();
  const { mutate } = trpcApp.auth.invalidateToken.useMutation();
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();

  const onLongPress = () => {
    deleteAuthMMKV('AuthToken');
    mutate(undefined, {
      onSettled: () => {
        navigation.navigate('OnboardingHomeScreen');
      },
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Pressable className="relative w-8 h-8 bg-black rounded-lg items-center justify-center" onLongPress={onLongPress}>
      <View className="absolute bg-white w-6 h-6 rounded-full z-10 left-3 -translate-x-[8px] top-3 -translate-y-[8px] align-center justify-center text-center">
        <Text className="text-xs text-center font-bold text-black">{user.name[0].toUpperCase()}</Text>
      </View>
    </Pressable>
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

const Modal = () => {
  const inset = useSafeAreaInsets();
  return (
    <>
      <AppButton xClassName="bg-black">
        <Text className="text-white">oi</Text>
      </AppButton>
      <MotiView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
        className="bg-blue-500"
      >
        <Text>oi</Text>
      </MotiView>
    </>
  );
};
