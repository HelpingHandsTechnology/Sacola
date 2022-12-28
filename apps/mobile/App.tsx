import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingHomeScreen } from './src/feature/onboarding/OnboardingHomeScreen';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from './src/feature/auth/SignInScreen';
import { ConfirmCodeScreen } from './src/feature/auth/ConfirmCodeScreen';
import { Home } from './src/feature/Home/Home';

export type ComponentBaseP = {
  children?: React.ReactNode;
  xClassName?: string;
};
export type MainStackNavigationP = {
  ConfirmCodeScreen: undefined;
  Home: undefined;
  OnboardingHomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
};
const Stack = createNativeStackNavigator<MainStackNavigationP>();

export default function App() {
  return (
    <SafeAreaProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardingHomeScreen" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="OnboardingHomeScreen" component={OnboardingHomeScreen} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} />
              <Stack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </trpc.Provider>
    </SafeAreaProvider>
  );
}
