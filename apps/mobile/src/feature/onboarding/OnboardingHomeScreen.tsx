import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MotiText, MotiView } from 'moti';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { MainStackNavigationP } from '../../../App';
import { AppButton } from '../../shared/components/AppButton';
import { AppLayout } from '../../shared/components/AppLayout';

const navigateFactory = (n: NavigationProp<MainStackNavigationP>) => ({
  toSignInScreen: () => n.navigate('AuthStackScreen', { screen: 'SignInScreen' }),
});
export const OnboardingHomeScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigateFactory(navigation);
  return (
    <AppLayout insetTopClassName={'bg-white'} insetBottomClassName="bg-black" xClassName="">
      <View className="bg-black flex-grow">
        <MotiView className="p-8 bg-white text-red-50 flex-grow-[0.3] bg-app-bege rounded-br-[80px]">
          <MotiText
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            from={{
              opacity: 0,
              translateY: 100,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            className="text-4xl font-light text-app-marrom"
          >
            Just works bro, thats too easy
          </MotiText>
        </MotiView>
        <View className="p-8 bg-app-pink flex-grow bg-black relative">
          <AbsoluteSubtractElement />
          <Image source={require('../../assets/🛍️.png')} className="flex-grow" />
          <AppButton onPress={navigator.toSignInScreen}>
            <Text>Sign In</Text>
          </AppButton>
        </View>
      </View>
    </AppLayout>
  );
};

const AbsoluteSubtractElement = () => {
  const radius = 80;
  return (
    <View className="absolute left-0">
      <View style={{ height: radius, width: radius }} className="bg-white relative left-0 overflow-hidden">
        <View
          style={{ height: radius * 2, width: radius * 2 }}
          className="bg-black relative rounded-tl-full left-[0px] top-[0]"
        />
      </View>
    </View>
  );
};
