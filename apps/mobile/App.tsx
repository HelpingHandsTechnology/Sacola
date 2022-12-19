import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OnboardingHomeScreen } from './src/feature/onboarding/OnboardingHomeScreen';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type ComponentBaseP = {
  children?: React.ReactNode;
  className?: string;
};
const Stack = createNativeStackNavigator<{ OnboardingHomeScreen: undefined }>();
export default function App() {
  return (
    <SafeAreaProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="OnboardingHomeScreen" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="OnboardingHomeScreen" component={OnboardingHomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </trpc.Provider>
    </SafeAreaProvider>
  );
}
