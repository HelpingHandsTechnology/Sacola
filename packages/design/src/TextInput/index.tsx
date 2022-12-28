import clsx from 'clsx';
import React from 'react';
import { TextInput as InputRNW, TextInputProps } from 'react-native';

export interface TextInputP extends TextInputProps {
  xClassName?: string;
  hasError?: boolean;
}

export const TextInput = React.forwardRef<InputRNW, TextInputP>(
  ({ xClassName, ...props }: TextInputP, ref): JSX.Element => {
    return (
      <InputRNW
        {...props}
        ref={ref}
        className={clsx(
          'px-2 py-4 rounded-md',
          props.hasError ? 'border-red-500 bg-red-100' : 'border border-black',
          xClassName,
        )}
      />
    );
  },
);
