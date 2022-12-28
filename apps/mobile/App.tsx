import { NavigationContainer, NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthStackParamList, AuthStackScreen } from './src/feature/auth/AuthStack';
import { ConfirmCodeScreen } from './src/feature/auth/ConfirmCodeScreen';
import { SignInScreen } from './src/feature/auth/SignInScreen';
import { Home } from './src/feature/Home/Home';
import { OnboardingHomeScreen } from './src/feature/onboarding/OnboardingHomeScreen';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';

export type ComponentBaseP = {
  children?: React.ReactNode;
  xClassName?: string;
};
export type MainStackNavigationP = {
  Home: undefined;
  OnboardingHomeScreen: undefined;
  AuthStackScreen: NavigatorScreenParams<AuthStackParamList>;
  ConfirmCodeScreen: undefined;
};
const Stack = createNativeStackNavigator<MainStackNavigationP>();

export default function App() {
  return (
    <SafeAreaProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="OnboardingHomeScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
                <Stack.Screen name="OnboardingHomeScreen" component={OnboardingHomeScreen} />
                <Stack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </trpc.Provider>
    </SafeAreaProvider>
  );
}
