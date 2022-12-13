import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="bg-slate-600 flex-1 items-center justify-center">
      <Text className="bg-slate-100 p-8">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
