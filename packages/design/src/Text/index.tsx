import React from 'react';
import clsx from 'clsx';
import { getWeightClassname, getSizeClassname, getTextAlignClassname } from './utils';

export interface TextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  weight?: 'thin' | 'normal' | 'medium' | 'bold' | 'extrabold';
  textAlign?: 'left' | 'center' | 'right';
}

const Text = ({ children, as = 'p', weight = 'normal', size = 'md', textAlign = 'left' }: TextProps): JSX.Element => {
  const weightClassname = getWeightClassname(weight);
  const sizeClassname = getSizeClassname(size);
  const textAlignClassname = getTextAlignClassname(textAlign);
  return React.createElement(as, { className: clsx(weightClassname, sizeClassname, textAlignClassname) }, children);
};

export default Text;
