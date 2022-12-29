import React from 'react';
import { ComponentBaseP } from '../../../../App';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { LightSpeedInLeft, Layout, ZoomInEasyDown } from 'react-native-reanimated';
import clsx from 'clsx';
import { ArticleDTO } from 'fixtures';

export const ArticleCard = (p: { item: ArticleDTO; index: number } & ComponentBaseP) => {
  return (
    <Animated.View entering={ZoomInEasyDown.delay(p.index * 15)}>
      <TouchableOpacity className={clsx('bg-black rounded-lg p-4', p.index === 0 ? undefined : 'mt-4', p.xClassName)}>
        <Text className="text-md font-bold text-white">{p.item.title}</Text>
        <Text className="text-sm font-light text-gray-400">{IntlDate.format(new Date(p.item.createdAt))}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
