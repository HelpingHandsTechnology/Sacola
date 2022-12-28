import React from 'react';
import { ComponentBaseP } from '../../../../App';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { LightSpeedInLeft, Layout } from 'react-native-reanimated';
import clsx from 'clsx';
import { ArticleDTO } from '../../../fixtures/articles';

export const ArticleCard = (props: { item: ArticleDTO; index: number } & ComponentBaseP) => {
  return (
    <Animated.View entering={LightSpeedInLeft}>
      <TouchableOpacity
        className={clsx('bg-black rounded-lg p-4', props.index === 0 ? undefined : 'mt-4', props.xClassName)}
      >
        <Text className="text-md font-bold text-white">{props.item.title}</Text>
        <Text className="text-sm font-light text-gray-400">{IntlDate.format(new Date(props.item.createdAt))}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
