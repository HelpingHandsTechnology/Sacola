import { TextProps } from '.';
import type { TFontWeight, TFontSize, TTextAlign } from 'tailwindcss-classnames';

export const getWeightClassname = (weight: TextProps['weight']): TFontWeight => {
  const options: { [key in Exclude<TextProps['weight'], undefined>]: TFontWeight } = {
    thin: 'font-thin',
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };
  return options[weight!] || options.normal;
};

export const getSizeClassname = (size: TextProps['size']): TFontSize => {
  const options: { [key in Exclude<TextProps['size'], undefined>]: TFontSize } = {
    '4xl': 'text-4xl',
    '3xl': 'text-3xl',
    '2xl': 'text-2xl',
    xl: 'text-xl',
    lg: 'text-lg',
    md: 'text-base',
    sm: 'text-sm',
    xs: 'text-xs',
  };
  return options[size!] || options.md;
};

export const getTextAlignClassname = (textAlign: TextProps['textAlign']): TTextAlign => {
  const options: { [key in Exclude<TextProps['textAlign'], undefined>]: TTextAlign } = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  return options[textAlign!] || options.left;
};
