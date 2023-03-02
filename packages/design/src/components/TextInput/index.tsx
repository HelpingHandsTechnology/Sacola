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
          'flex h-10 w-full rounded-md border bg-transparent',
          'py-2 px-3 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          'placeholder:text-neutral-400 focus:ring-neutral-400',
          props.hasError ? 'border-red-500 bg-red-100' : 'border border-neutral-300',

          xClassName,
        )}
      />
    );
  },
);
