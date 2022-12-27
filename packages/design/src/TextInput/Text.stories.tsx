import React from 'react';
import { Meta, Story } from '@storybook/react';

import {TextInput, TextInputP } from '.';

const config: Meta = {
  title: 'Design System/Input',
  component: TextInput,
};
export default config;

const Box = ({ children }: any): JSX.Element => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

export const Input: Story<TextInputP> = () => {
  return (
    <Box>
      <TextInput />
    </Box>
  );
};
