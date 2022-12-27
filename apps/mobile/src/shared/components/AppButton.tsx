import React from 'react';
import clsx from 'clsx';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const AppButton = (p: AppButtonP) => {
  return (
    <TouchableOpacity className={clsx('bg-gray-400 w-full rounded-xl h-16 justify-center items-center')} {...p}>
      <Text className="text-2xl text-black">Clica aqui+</Text>
    </TouchableOpacity>
  );
};
type AppButtonP = {} & TouchableOpacityProps;
