import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import clsx from 'clsx';
import { ComponentBaseP } from '../../../App';

type AppLayoutP = {
  insetTopClassName?: string;
  insetBottomClassName?: string;
} & ComponentBaseP;
export const AppLayout = ({
  children,
  insetTopClassName = 'bg-gray-500',
  insetBottomClassName = 'bg-gray-500',
  xClassName,
}: AppLayoutP) => {
  const inset = useSafeAreaInsets();
  return (
    <>
      <View style={{ paddingTop: inset.top }} className={clsx(insetTopClassName)} />
      <View className={clsx('flex-grow', xClassName)}>{children}</View>
      <View style={{ paddingBottom: inset.top }} className={clsx(insetBottomClassName)} />
    </>
  );
};
