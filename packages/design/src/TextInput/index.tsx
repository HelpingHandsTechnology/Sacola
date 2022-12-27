import React from 'react';
import clsx from 'clsx';
import { TextInput as InputRNW, TextInputProps } from 'react-native';

export interface TextInputP extends TextInputProps {
  xClassName?: string;
}

export const TextInput = ({
  xClassName,
  ...props
}: TextInputP): JSX.Element => {
  return (
    <InputRNW {...props} className={clsx(xClassName, 'border border-black px-2 py-4 rounded-md')} />
  );
};
