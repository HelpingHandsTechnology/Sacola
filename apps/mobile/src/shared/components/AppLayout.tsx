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
} & ComponentBaseP;
export const AppLayout = ({
  children,
  insetTopClassName = 'bg-gray-500',
  insetBottomClassName = 'bg-gray-500',
  xClassName = 'bg-gray-500 p-4',
}: AppLayoutP) => {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const canGoBack = navigation.canGoBack();
  return (
    <>
      <View style={{ paddingTop: inset.top }} className={clsx(insetTopClassName)} />
      <Show when={canGoBack} renderItem={() => <GoBackAppLayout insetTopClassName={insetTopClassName} />} />
      <View className={clsx('flex-grow', xClassName)}>{children}</View>
      <View style={{ paddingBottom: inset.top }} className={clsx(insetBottomClassName)} />
    </>
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
