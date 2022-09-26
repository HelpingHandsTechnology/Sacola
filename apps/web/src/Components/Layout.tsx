import clsx from 'clsx';
import React from 'react';

type RowP = {
  children?: React.ReactNode;
  className?: string;
};

type AsProp<As extends keyof React.ReactHTML> = {
  as?: As;
} & JSX.IntrinsicElements[As];

export const Row = <As extends keyof React.ReactHTML>({
  children,
  as,
  className,
}: RowP & AsProp<As>) => {
  const Tag = as || 'div';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tag className={clsx(['flex flex-row', className])}>{children}</Tag>;
};

export const Col = <As extends keyof React.ReactHTML>({
  children,
  as,
  className,
}: RowP & AsProp<As>) => {
  const Tag = as || 'div';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tag className={clsx(['flex flex-col', className])}>{children}</Tag>;
};
