import { Text } from 'design';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-5xl">SACOLA FTW w/ TW</h1>
      <Text>
        This text is coming directrly form the design package, using{' '}
        <Text xClassName="text-blue-700">React native web</Text>
      </Text>
    </div>
  );
}
