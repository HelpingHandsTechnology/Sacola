import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { queryClient, trpc, trpcClient } from './src/lib/trpc';
import clsx from 'clsx';

type ComponentBaseP = {
  children?: React.ReactNode;
  className?: string;
};
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
  return (
    <AppLayout insetTopClassName={'bg-app-bege'} insetBottomClassName="bg-app-rosa">
      <View className="bg-app-rosa flex-grow">
        <View className="p-8 bg-app-pink text-red-50 flex-grow-[0.3] bg-app-bege rounded-br-[80px]">
          <Text className="text-4xl font-light text-app-marrom">Just works bro, thats too easy</Text>
        </View>
        <View className="p-8 bg-app-pink flex-grow bg-app-rosa relative">
          <AbsoluteSubtractElement />
          <Image source={require('./src/assets/🛍️.png')} />
        </View>
      </View>
    </AppLayout>
  );
};
const AbsoluteSubtractElement = () => {
  const radius = 80;
  return (
    <View className="absolute left-0">
      <View style={{ height: radius, width: radius }} className="bg-app-bege relative left-0 overflow-hidden">
        <View
          style={{ height: radius * 2, width: radius * 2 }}
          className="bg-app-rosa relative rounded-tl-full left-[0px] top-[0]"
        />
      </View>
    </View>
  );
};

type AppLayoutP = {
  insetTopClassName?: string;
  insetBottomClassName?: string;
} & ComponentBaseP;
const AppLayout = ({ children, insetTopClassName = '', insetBottomClassName = '' }: AppLayoutP) => {
  const inset = useSafeAreaInsets();
  return (
    <View className={clsx('flex-grow')}>
      <View style={{ paddingTop: inset.top }} className={clsx(insetTopClassName)} />
      <>{children}</>
      <View style={{ paddingBottom: inset.top }} className={clsx(insetBottomClassName)} />
    </View>
  );
};
