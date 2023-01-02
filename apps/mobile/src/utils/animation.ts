import { Dimensions } from 'react-native';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const heightDiffPercentage = (absoluteY: number, height: number) => {
  'worklet';
  const diff = (absoluteY / height) * 100;
  return diff;
};
export const vMax = (value: number, max: number) => {
  'worklet';
  return value > max ? max : value;
};
