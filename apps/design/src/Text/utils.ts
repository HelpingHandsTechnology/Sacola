import { TextProps } from '.';
import type { TFontWeight, TFontSize, TTextAlign } from 'tailwindcss-classnames';

export const getWeightClassname = (weight: TextProps['weight']): TFontWeight => {
  const options: { [key in TextProps['weight']]: TFontWeight } = {
    thin: 'font-thin',
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };
  return options[weight] || options.normal;
};

export const getSizeClassname = (size: TextProps['size']): TFontSize => {
  const options: { [key in TextProps['size']]: TFontSize } = {
    xl: 'text-xl',
    lg: 'text-lg',
    md: 'text-base',
    sm: 'text-sm',
    xs: 'text-xs',
  };
  return options[size] || options.md;
};

export const getTextAlignClassname = (textAlign: TextProps['textAlign']): TTextAlign => {
  const options: { [key in TextProps['textAlign']]: TTextAlign } = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  return options[textAlign] || options.left;
};
