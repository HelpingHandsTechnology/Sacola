import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';

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
  const a = trpc.user.verifyCode.useMutation();
  React.useEffect(() => {
    a.mutate({});
  }, []);
  console.log({ isLoading: a.isLoading, error: a.error, data: a.data });
  return (
    <View className="bg-slate-600 flex-1 items-center justify-center">
      <Text className="bg-slate-100 p-8">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};
