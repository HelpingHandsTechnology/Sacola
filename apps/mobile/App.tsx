import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
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
  const a = trpc.articles.getAll.useQuery();
  console.log({ isLoading: a.isLoading, error: a.error, data: a.data });
  return (
    <View className="bg-slate-600 flex-1 items-center justify-center">
      <TextRN xClassName="text-white" size="xl">
        Just works bro, thats too easy
      </TextRN>
      <StatusBar style="auto" />
    </View>
  );
};
