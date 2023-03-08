import { useState } from 'react';
import { Text, TextInput } from 'design';
import { useRouter } from 'next/router';
import { trpcNext } from '@/lib/trpc';
import Link from 'next/link';

export default function Header() {
  const [showAddUrlInput, setShowAddUrlInput] = useState(false);
  const [url, setUrl] = useState<string>('');
  const router = useRouter();
  const utils = trpcNext.useContext();

  const { mutate: createMutation } = trpcNext.articles.create.useMutation({
    onSuccess: () => {
      utils.articles.getAll.invalidate();
      setUrl('');
    },
  });

  const handleAddArticle = () => {
    //TODO: add validation for url
    if (url) {
      createMutation({ url });
    }
    setShowAddUrlInput(!showAddUrlInput);
  };

  return (
    <header className="mb-4 flex w-full justify-center shadow-md">
      <div className="flex w-full max-w-6xl items-center justify-between px-4 py-2">
        <Link href="/">
          <Text size="xl" xClassName="sm:text-4xl font-bold">
            Sacola 🛍️
          </Text>
        </Link>
        {!showAddUrlInput ? (
          <>
            <div>
              <button
                className="mr-2 h-8 w-8 items-center justify-center rounded-lg bg-black"
                onClick={() => setShowAddUrlInput(!showAddUrlInput)}
              >
                <Text xClassName="text-xs font-bold text-white">+</Text>
              </button>
              <button
                className="h-8 w-8 items-center justify-center rounded-full bg-black"
                onClick={() => router.push('/profile')}
              >
                <Text xClassName="text-xs font-bold text-white">A</Text>
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-1/2 flex-row gap-2">
            <TextInput
              nativeID="title"
              onChange={(e) => setUrl(e.nativeEvent.text)}
              value={url}
              placeholder="Save a URL https://..."
            />
            <div className="flex justify-end">
              <button className="rounded-lg bg-black px-4 py-2 text-white" onClick={handleAddArticle}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
