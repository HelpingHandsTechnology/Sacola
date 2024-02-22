import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {html as h} from 'react-strict-dom'

export default function App() {
  return (
    <h.main style={styles.container}>
      <h.h2 className="bg-slate-100">Open up App.js to start working on your app!</h.h2>
      <Text className="bg-slate-200">Open up App.js to start working on your app!</Text>
      <sacola className="bg-slate-300" />
    </h.main>
  );
}

const sacola = (p) => {
  console.log(p)
  return (
      <Text {...p} >
        {"\n"}
      Open up App.js to start working on your app!</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
