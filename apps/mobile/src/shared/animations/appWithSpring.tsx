import { AnimatableValue, AnimationCallback, withSpring, WithSpringConfig } from 'react-native-reanimated';

export const appWithSpring = <T extends AnimatableValue>(
  toValue: T,
  userConfig?: WithSpringConfig,
  callback?: AnimationCallback,
): T => {
  return withSpring(
    toValue,
    {
      damping: 10,
      mass: 0.001,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      velocity: 0,
      ...(userConfig ? userConfig : {}),
    },
    callback,
  );
};
