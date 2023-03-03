import clsx from 'clsx';
import React from 'react';
import { AccessibilityProps, Text as TextRNW } from 'react-native';
import { match } from 'ts-pattern';
import { getSizeClassname, getTextAlignClassname, getWeightClassname } from './utils';

export interface TextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: '4xl' | '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  weight?: 'thin' | 'normal' | 'medium' | 'bold' | 'extrabold';
  textAlign?: 'left' | 'center' | 'right';
  xClassName?: string;
  testID?: string;
}

export const Text = ({
  children,
  as = 'p',
  weight = 'normal',
  size = 'md',
  textAlign = 'left',
  xClassName,
  ...props
}: TextProps): JSX.Element => {
  const weightClassname = getWeightClassname(weight);
  const sizeClassname = getSizeClassname(size);
  const textAlignClassname = getTextAlignClassname(textAlign);
  const matchAccessibilityRole = match<TextProps['as'], AccessibilityProps['accessibilityRole']>(as)
    .with('h1', () => 'header')
    .with('h2', () => 'header')
    .with('h3', () => 'header')
    .with('h4', () => 'header')
    .with('h5', () => 'header')
    .with('h6', () => 'header')
    .with('p', () => 'text')
    .with('span', () => 'text')
    .otherwise(() => 'text');

  return (
    <TextRNW
      accessibilityRole={matchAccessibilityRole}
      className={clsx(weightClassname, sizeClassname, textAlignClassname, xClassName)}
      {...props}
    >
      {children}
    </TextRNW>
  );
};
