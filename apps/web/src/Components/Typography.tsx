import React from 'react';
import clxs from 'clsx';
import type { ElementType } from 'react';

export type asType = ElementType;
export type textGradient = boolean;
export type className = string;
import { match } from 'ts-pattern';

export interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'lead'
    | 'paragraph'
    | 'small';
  as?: asType;
  className?: className;
  children: React.ReactNode;
}

const typographyVariant = {
  h1: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-5xl',
    'font-semibold',
    'leading-tight',
  ],
  h2: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-4xl',
    'font-semibold',
    'leading-[1.3]',
  ],
  h3: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-3xl',
    'font-semibold',
    'leading-snug',
  ],
  h4: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-2xl',
    'font-semibold',
    'leading-snug',
  ],
  h5: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-xl',
    'font-semibold',
    'leading-snug',
  ],
  h6: [
    'block',
    'antialiased',
    'tracking-normal',
    'font-sans',
    'text-base',
    'font-semibold',
    'leading-relaxed',
  ],
  lead: [
    'block',
    'antialiased',
    'font-sans',
    'text-xl',
    'font-normal',
    'leading-relaxed',
  ],
  paragraph: [
    'block',
    'antialiased',
    'font-sans',
    'text-base',
    'font-light',
    'leading-relaxed',
  ],
  small: [
    'block',
    'antialiased',
    'font-sans',
    'text-sm',
    'font-light',
    'leading-normal',
  ],
};

export const Typography = React.forwardRef<
  React.ReactHTML['h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'],
  TypographyProps
>(({ variant = 'h1', as, className, children, ...rest }, ref) => {
  const Tag = match<
    TypographyProps['variant'],
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  >(variant)
    .with('h1', (v) => v)
    .with('h2', (v) => v)
    .with('h3', (v) => v)
    .with('h4', (v) => v)
    .with('h5', (v) => v)
    .with('h6', (v) => v)
    .with('small', () => 'p')
    .with('lead', () => 'p')
    .with('paragraph', () => 'p')
    .otherwise(() => 'p');
  // 5. return
  return (
    <Tag
      className={clxs([typographyVariant[variant], className])}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as unknown as any}
    >
      {children}
    </Tag>
  );
});

Typography.displayName = 'Typography';

export default Typography;
