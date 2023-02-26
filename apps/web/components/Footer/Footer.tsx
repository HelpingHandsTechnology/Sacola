import { Text } from 'design';
import Link from 'next/link';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-full py-2 text-center">
      <Text xClassName="text-sm text-gray-400">
        Made with <span aria-label="Heart icon">❤️</span> by{' '}
        <Link href="https://github.com/HelpingHandsTechnology">Helping Hands</Link>
      </Text>
    </footer>
  );
};
