import React from 'react';
import { ComponentBaseP } from '../../../../App';
import { View, Text, TouchableOpacity } from 'react-native';
import clsx from 'clsx';
import { ArticleDTO } from '../../../fixtures/articles';

export const ArticleCard = (props: { article: ArticleDTO } & ComponentBaseP) => {
  return (
    <TouchableOpacity className={clsx('bg-black rounded-lg p-4', props.xClassName)}>
      <Text className="text-md font-bold text-white">{props.article.title}</Text>
      <Text className="text-sm font-light text-gray-400">{IntlDate.format(new Date(props.article.createdAt))}</Text>
    </TouchableOpacity>
  );
};
const IntlDate = Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
