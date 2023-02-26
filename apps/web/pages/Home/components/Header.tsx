import { useState } from 'react';
import { Text } from 'design';
import { useRouter } from 'next/router';
import { trpcNext } from '../../../lib/trpc';

interface HeaderProps {
  handleCreateArticle: (url: string) => void;
}

export default function Header({ handleCreateArticle }: HeaderProps) {
  const [showAddUrlInput, setShowAddUrlInput] = useState(false);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const { mutate } = trpcNext.auth.invalidateToken.useMutation();
  const logout = () => {
    mutate(undefined, {
      onSettled: () => {
        router.push('/login');
      },
    });
  };

  return (
    <header className="flex justify-center w-full shadow-md">
      <div className="max-w-6xl w-full flex justify-between items-center px-4 py-2">
        <Text size="xl" xClassName="sm:text-4xl font-bold">
          Sacola 🛍️
        </Text>
        {!showAddUrlInput ? (
          <>
            <div>
              <button
                className="w-8 h-8 bg-black rounded-lg items-center justify-center mr-2"
                onClick={() => setShowAddUrlInput(!showAddUrlInput)}
              >
                <Text xClassName="text-xs font-bold text-white">+</Text>
              </button>
              <button className="w-8 h-8 bg-black rounded-full items-center justify-center" onClick={() => logout()}>
                <Text xClassName="text-xs font-bold text-white">A</Text>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-row gap-2 w-1/2">
            <input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              type="text"
              placeholder="Save a URL https://..."
              id="title"
              className="border rounded-lg border-black px-2 w-full"
            />
            <div className="flex justify-end">
              <button
                className="bg-black rounded-lg px-4 py-2 text-white"
                onClick={() => {
                  handleCreateArticle(url);
                  setShowAddUrlInput(!showAddUrlInput);
                }}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
