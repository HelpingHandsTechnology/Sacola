import { NavigationProp, useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { MainStackNavigationP } from '../../App';
import { trpc } from '../lib/trpc';
import { AppLayout } from '../shared/components/AppLayout';

const navigatorFactory = (n: NavigationProp<MainStackNavigationP>) => {
  return {
    navigateOnboarding: () => n.reset({ index: 0, routes: [{ name: 'OnboardingHomeScreen' }] }),
    navigateHome: () => n.reset({ index: 0, routes: [{ name: 'Home' }] }),
  };
};
export const InitialScreen = () => {
  const navigation = useNavigation<NavigationProp<MainStackNavigationP>>();
  const navigator = navigatorFactory(navigation);
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  trpc.user.getUserInfo.useQuery(undefined, {
    onSuccess: navigator.navigateHome,
    onError: navigator.navigateOnboarding,
  });

  React.useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 3000 }), -1, true);
  }, []);

  return (
    <AppLayout
      xClassName={clsx(['bg-black items-center justify-center'])}
      insetBottomClassName="bg-red-500"
      insetTopClassName="bg-black"
    >
      <Animated.Image
        style={[style]}
        className={clsx(['w-64'])}
        resizeMode="contain"
        source={require('../assets/🛍️.png')}
      />
    </AppLayout>
  );
};
