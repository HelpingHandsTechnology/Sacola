import React from 'react';
import clsx from 'clsx';
import { Text, TouchableWithoutFeedback, TouchableOpacityProps } from 'react-native';
import { ComponentBaseP } from '../../../App';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { appWithSpring } from '../animations/appWithSpring';

export const AppButton = ({ xClassName = 'w-full bg-white', ...p }: AppButtonP) => {
  const scale = useSharedValue(1);

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  const onPressIn = () => {
    scale.value = appWithSpring(0.95);
  };
  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} {...p}>
      <Animated.View className={clsx('rounded-xl h-16 justify-center items-center', xClassName)} style={[scaleStyle]}>
        {p.children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
type AppButtonP = {} & TouchableOpacityProps & ComponentBaseP;
