import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
import clsx from 'clsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Content />
        </QueryClientProvider>
      </trpc.Provider>
    </SafeAreaProvider>
  );
}

const Content = () => {
  const num = 40;
  return (
    <AppLayout>
      <View className="p-8 bg-app-pink text-red-50 flex-grow bg-app-rosa ">
        <Text className="text-4xl font-light text-app-marrom">Just works bro, thats too easy</Text>
        <StatusBar style="auto" />
      </View>
    </AppLayout>
  );
};

const AppLayout = ({ children, insetTopClassName = '', insetBottomClassName = '' }: any) => {
  const inset = useSafeAreaInsets();
  return (
    <View className={clsx('flex-grow')}>
      <View style={{ paddingTop: inset.top }} className={clsx(insetTopClassName)} />
      <>{children}</>
      <View style={{ paddingBottom: inset.top }} className={clsx(insetBottomClassName)} />
    </View>
  );
};
