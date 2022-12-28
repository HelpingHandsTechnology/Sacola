import clsx from 'clsx';
import { View } from 'react-native';

type RowProps = {
  children?: React.ReactNode;
  xClassName?: string;
};
export const Row = (props: RowProps) => {
  return <View className={clsx('flex flex-row', props.xClassName)}>{props.children}</View>;
};
