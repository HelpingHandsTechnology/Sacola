import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import clsx from 'clsx';
import { ComponentBaseP, MainStackNavigationP } from '../../../App';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Show } from './Show';
import { Null } from './Null';

type AppLayoutP = {
  insetTopClassName?: string;
  insetBottomClassName?: string;
  insetBottom?: number;
  insetTop?: number;
} & ComponentBaseP;
export const AppLayout = ({
  children,
  insetTopClassName = 'bg-transparent',
  insetBottomClassName = 'bg-transparent',
  insetBottom,
  insetTop,
  xClassName = 'bg-white p-4',
}: AppLayoutP) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const canGoBack = navigation.canGoBack();
  console.log({ inset });
  return (
    <View className="flex-1 bg-white">
      <View style={{ paddingTop: insetTop ?? inset.top }} className={clsx(insetTopClassName)} />
      <Show when={canGoBack} renderItem={() => <GoBackAppLayout insetTopClassName={insetTopClassName} />} />
      <View className={clsx('flex-grow', xClassName)}>{children}</View>
      <View style={{ paddingBottom: insetBottom ?? inset.bottom }} className={clsx(insetBottomClassName)} />
    </View>
  );
};
const GoBackAppLayout = (p: AppLayoutP) => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  return (
    <View className={clsx(p.insetTopClassName, 'p-4')}>
      <TouchableOpacity className={clsx('w-12 h-8 items-center content-center -mx-4 pl-4')} onPress={navigation.goBack}>
        <Text className="text-2xl ">←</Text>
      </TouchableOpacity>
    </View>
  );
};
