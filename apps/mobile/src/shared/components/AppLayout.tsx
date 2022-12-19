import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import clsx from 'clsx';
import { ComponentBaseP } from '../../../App';

export const AppLayout = ({ children, insetTopClassName = '', insetBottomClassName = '' }: AppLayoutP) => {
  const inset = useSafeAreaInsets();
  return (
    <View className={clsx('flex-grow')}>
      <View style={{ paddingTop: inset.top }} className={clsx(insetTopClassName)} />
      <>{children}</>
      <View style={{ paddingBottom: inset.top }} className={clsx(insetBottomClassName)} />
    </View>
  );
};
type AppLayoutP = {
  insetTopClassName?: string;
  insetBottomClassName?: string;
} & ComponentBaseP;
