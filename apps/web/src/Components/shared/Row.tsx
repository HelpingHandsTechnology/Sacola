import React from 'react';
import { clsx } from 'clsx';

export const Row = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={clsx(['flex flex-row', className])}>{children}</div>;
