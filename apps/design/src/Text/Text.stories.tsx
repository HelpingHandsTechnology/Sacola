import React from 'react';
import { Meta, Story } from '@storybook/react';

import Text, { TextProps } from '.';

const config: Meta = {
  title: 'Design System/Text',
  component: Text,
};
export default config;

const Box = ({ children }): JSX.Element => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

export const Sizes: Story<TextProps> = () => {
  return (
    <Box>
      <Text size="xl">Extra Large</Text>
      <Text size="lg">Large</Text>
      <Text size="md">Medium</Text>
      <Text size="sm">Small</Text>
      <Text size="xs">Extra Small</Text>
    </Box>
  );
};

export const Weight: Story<TextProps> = () => {
  return (
    <Box>
      <Text weight="extrabold">Extra Bold</Text>
      <Text weight="bold">Bold</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="normal">Normal</Text>
      <Text weight="thin">Thin</Text>
    </Box>
  );
};

export const TextAlign: Story<TextProps> = () => {
  return (
    <Box>
      <Text textAlign="left">Left</Text>
      <Text textAlign="center">Center</Text>
      <Text textAlign="right">Right</Text>
    </Box>
  );
};
