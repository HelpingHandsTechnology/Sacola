import React from 'react';
import clsx from 'clsx';
import { Image, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { AppLayout } from '../../shared/components/AppLayout';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MainStackNavigationP } from '../../../App';

const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignInScreen: () => n.navigate('SignInScreen'),
});
export const OnboardingHomeScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  return (
    <AppLayout insetTopClassName={'bg-gray-400'} insetBottomClassName="bg-gray-500">
      <View className="bg-gray-500 flex-grow">
        <View className="p-8 bg-gray-400 text-red-50 flex-grow-[0.3] bg-app-bege rounded-br-[80px]">
          <Text className="text-4xl font-light text-app-marrom">Just works bro, thats too easy</Text>
        </View>
        <View className="p-8 bg-app-pink flex-grow bg-gray-500 relative">
          <AbsoluteSubtractElement />
          <Image source={require('../../assets/🛍️.png')} className="flex-grow" />
          <Button onPress={navigator.toSignInScreen} />
        </View>
      </View>
    </AppLayout>
  );
};

const AbsoluteSubtractElement = () => {
  const radius = 80;
  return (
    <View className="absolute left-0">
      <View style={{ height: radius, width: radius }} className="bg-gray-400 relative left-0 overflow-hidden">
        <View
          style={{ height: radius * 2, width: radius * 2 }}
          className="bg-gray-500 relative rounded-tl-full left-[0px] top-[0]"
        />
      </View>
    </View>
  );
};
// Write a button with circular radius

const Button = (p: ButtonP) => {
  return (
    <TouchableOpacity className={clsx('bg-gray-400 w-full rounded-full h-16 justify-center items-center')} {...p}>
      <Text className="text-2xl text-black">Clica aqui+</Text>
    </TouchableOpacity>
  );
};

type ButtonP = {} & TouchableOpacityProps;
