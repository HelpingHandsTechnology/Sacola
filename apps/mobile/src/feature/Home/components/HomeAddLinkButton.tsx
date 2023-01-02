import React from 'react';
import { Text } from 'react-native';
import clsx from 'clsx';
import { AppButton } from '../../../shared/components/AppButton';
import { HomeFirstLetterUserComponentP } from './HomeFirstLetterUserComponent';

export const HomeAddLinkButton = (p: HomeFirstLetterUserComponentP) => {
  const FirstLetterUser = '+';
  return (
    <AppButton xClassName={clsx('w-8 h-8 bg-black rounded-lg items-center justify-center', p.xClassName)}>
      <Text className="text-xs font-bold text-white">{FirstLetterUser}</Text>
    </AppButton>
  );
};
