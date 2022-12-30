import { NavigationContainer, NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthStackParamList, AuthStackScreen } from './src/feature/auth/AuthStack';
import { Home } from './src/feature/Home/Home';
import { InitialScreen } from './src/feature/InitialScreen';
import { OnboardingHomeScreen } from './src/feature/onboarding/OnboardingHomeScreen';
import { authMMKVKeys, getAuthMMKV } from './src/lib/mmkv';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';

export type ComponentBaseP = {
  children?: React.ReactNode;
  xClassName?: string;
};
export type MainStackNavigationP = {
  InitialScreen: undefined;
  Home: undefined;
  OnboardingHomeScreen: undefined;
  AuthStackScreen: NavigatorScreenParams<AuthStackParamList>;
};
const Stack = createNativeStackNavigator<MainStackNavigationP>();

export default function App() {
  return (
    <SafeAreaProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="InitialScreen" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="InitialScreen" component={InitialScreen} />
                <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} />
                <Stack.Screen name="OnboardingHomeScreen" component={OnboardingHomeScreen} />
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          </QueryClientProvider>
        </GestureHandlerRootView>
      </trpc.Provider>
    </SafeAreaProvider>
  );
}
