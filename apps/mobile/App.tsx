import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, Safe, Text, View } from 'react-native';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
import clsx from 'clsx';
import TextRN from 'design';

export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Content />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const Content = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#000' }} forceInset={{ top: 'always', bottom: 'always' }}>
      <View className="p-8 bg-app-pink text-red-50 h-full">
        <View className="">
          <Text className="text-4xl font-light text-app-marrom">Just works bro, thats too easy</Text>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const AppLayout = ({ children, className }) => {
  return (
    <SafeAreaView>
      <View className={clsx(['p-6 flex-1', className])}>{children}</View>
    </SafeAreaView>
  );
};
