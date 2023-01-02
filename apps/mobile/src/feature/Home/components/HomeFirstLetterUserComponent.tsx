import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ComponentBaseP, MainStackNavigationP } from '../../../../App';
import { trpcApp } from '../../../lib/trpc';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { deleteAuthMMKV } from '../../../lib/mmkv';

export type HomeFirstLetterUserComponentP = ComponentBaseP;
export const HomeFirstLetterUserComponent = (p: HomeFirstLetterUserComponentP) => {
  const { data: user } = trpcApp.user.getUserInfo.useQuery();
  const { mutate } = trpcApp.auth.invalidateToken.useMutation();
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();

  const onLongPress = () => {
    deleteAuthMMKV('AuthToken');
    mutate(undefined, {
      onSettled: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingHomeScreen' }],
        });
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
