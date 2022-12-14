import React from 'react';
import clsx from 'clsx';
import { getWeightClassname, getSizeClassname, getTextAlignClassname } from './utils';
import { Text as TextRNW, AccessibilityProps } from 'react-native';
import { match } from 'ts-pattern';

export interface TextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  weight?: 'thin' | 'normal' | 'medium' | 'bold' | 'extrabold';
  textAlign?: 'left' | 'center' | 'right';
  xClassName?: string;
}

const Text = ({
  children,
  as = 'p',
  weight = 'normal',
  size = 'md',
  textAlign = 'left',
  xClassName,
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

  console.log({ xClassName });
  return (
    <TextRNW
      accessibilityRole={matchAccessibilityRole}
      className={clsx(weightClassname, sizeClassname, textAlignClassname, xClassName)}
    >
      {children}
    </TextRNW>
  );
};

export default Text;
