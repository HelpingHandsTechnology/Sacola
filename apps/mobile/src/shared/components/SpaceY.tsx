import React from 'react';
import { View } from 'react-native';
import { ComponentBaseP } from '../../../App';
import { Null } from './Null';
import { Show } from './Show';

export interface SpaceYProps extends ComponentBaseP {
  y: number;
}

export const filterNull = <T extends React.ReactChild | React.ReactFragment | React.ReactPortal>(
  child: T,
): child is T & { type: (a: any) => any } => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (typeof child?.type === 'function' && child?.type?.name === Null.name && child?.type?.iSNullComponent) {
    return false;
  }
  return true;
};
export const filterShow = <T extends React.ReactChild | React.ReactFragment | React.ReactPortal>(
  child: T,
): child is T & { type: (a: any) => any } => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (typeof child?.type === 'function' && child?.type?.name === Show.name) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if ('when' in child?.props) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return !!child?.props?.when;
    }
    return true;
  }
  return true;
};
export const SpaceY = ({ children, xClassName, ...props }: SpaceYProps) => (
  <View {...props} className={xClassName}>
    {React.Children.toArray(children)
      .filter((v) => filterShow(v))
      .filter((v) => filterNull(v))
      .map((child, index, arr) => {
        const isLast = index === arr.length - 1;
        if (arr.length === 1) {
          return <View key={index}>{child}</View>;
        }
        return (
          <View key={index} style={{ marginBottom: !isLast ? props.y : undefined }}>
            {child}
          </View>
        );
      })}
  </View>
);
