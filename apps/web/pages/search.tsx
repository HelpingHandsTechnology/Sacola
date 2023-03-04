import { useState } from 'react';
import { Layout } from '@/components/layout';
import { useDebounce } from 'react-use';
import { ArticleCard, DropdownMenu, TextInput } from 'design';
import { Article } from '@prisma/client';
import clsx from 'clsx';

import { trpcNext } from '../lib/trpc';

// TODO: share this type
interface ArticleDTO {
  article: Article;
  user: { name: string; email: string };
  articleTags: { tag: { name: string; id: string }; tagId: string }[];
  userId: string;
  articleId: string;
  isFavorite: boolean;
}

type MaybeArticlesProps = {
  articles: ArticleDTO[] | undefined;
  enabled: boolean;
  isLoading: boolean;
  error: any;
  openArticle: (url: string) => Window | null;
  handleDeleteArticle: (articleId: string) => void;
  handleFavoriteArticle: (articleId: string, isFavorite: boolean) => void;
};

const MaybeArticles = ({
  articles,
  enabled,
  isLoading,
  error,
  openArticle,
  handleDeleteArticle,
  handleFavoriteArticle,
}: MaybeArticlesProps): JSX.Element => {
  if (error) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (articles && articles.length > 0) {
    return (
      <>
        {articles.map((article) => (
          <ArticleCard
            key={article.article.id}
            article={article}
            onClick={() => openArticle(article.article.urlDomain)}
          >
            <DropdownMenu
              xClassName="absolute top-2 right-2 z-10"
              items={[
                {
                  name: 'View',
                  onClick: () => openArticle(article.article.urlDomain),
                },
                { name: 'Remove', onClick: () => handleDeleteArticle(article.article.id) },
                {
                  name: article.isFavorite ? 'Unfavorite' : 'Favorite',
                  onClick: () => handleFavoriteArticle(article.article.id, article.isFavorite),
                },
              ]}
            />
          </ArticleCard>
        ))}
      </>
    );
  }

  if (!enabled) {
    return <div className="text-center">Try to search for a specific article!</div>;
  }

  return <div className="text-center">No articles found. Try creating one!</div>;
};

// TODO: use RHF here
export default function Search() {
  const utils = trpcNext.useContext();

  const [search, setSearch] = useState<string | undefined>(undefined);
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [debounceSearch, setDebounceSearch] = useState<string | undefined>(undefined);

  useDebounce(() => setDebounceSearch(search), 1000, [search]);

  const {
    data: articles,
    isLoading,
    error,
  } = trpcNext.articles.searchArticle.useQuery(
    { search: debounceSearch, isDeepSearch: isDeepSearch, isFavorite: isFavorite, tags: tags },
    { enabled: Boolean(debounceSearch) || tags.length > 0 || isFavorite, refetchOnMount: false, refetchOnWindowFocus: false },
  );

  const { data: dataTags, isLoading: tagsLoading, error: tagsError } = trpcNext.tags.getTags.useQuery();

  const { mutate: deleteMutation } = trpcNext.articles.deleteById.useMutation({
    onSuccess: () => {
      utils.articles.searchArticle.invalidate();
    },
  });

  const { mutate: updateMutation } = trpcNext.articles.updateById.useMutation({
    onSuccess: () => {
      utils.articles.searchArticle.invalidate();
    },
  });

  const handleDeleteArticle = (articleId: string) => deleteMutation({ id: articleId });

  const handleFavoriteArticle = (articleId: string, isFavorite: boolean) =>
    updateMutation({ id: articleId, isFavorite: !isFavorite });

  const openArticle = (url: string) => window.open(url, '_blank');

  return (
    <Layout>
      <div className='flex w-full flex-col max-w-6xl gap-2 px-4 py-2'>
        <div className="flex w-full flex-col gap-2">
          <TextInput
            value={search}
            placeholder="Search your articles..."
            onChange={(e) => setSearch(e.nativeEvent.text)}
          />

          <div className="flex gap-2">
            <input
              type="checkbox"
              id="checkbox-deepsearch"
              name="checkbox-deepsearch"
              className="cursor-pointer"
              onChange={() => setIsDeepSearch(!isDeepSearch)}
            />
            <label htmlFor="checkbox-deepsearch">Deep Search</label>
          </div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              id="checkbox-isfavorite"
              name="checkbox-isfavorite"
              className="cursor-pointer"
              onChange={() => setIsFavorite(!isFavorite)}
            />
            <label htmlFor="checkbox-isfavorite">Only Favorites</label>
          </div>

          {!tagsLoading && !tagsError && dataTags.length > 0 && (
            <div className="flex gap-2">
              {dataTags.map(tag => (
                <div 
                  key={tag.id} 
                  className={
                    clsx(
                      "flex justify-center items-center w-14 h-8 border cursor-pointer", 
                      tags.includes(tag.name) ? 'border-red-600' : 'border-gray-400'
                    )
                  }
                  onClick={() => setTags((oldState) => {
                    if (tags.includes(tag.name)) {
                      const newState = oldState.filter(stateTag => stateTag !== tag.name);

                      return newState;
                    } else {
                      const newState = oldState.concat(tag.name);

                      return newState;
                    }
                  })}
                >
                  <p>{tag.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <MaybeArticles
          articles={articles}
          enabled={Boolean(debounceSearch)}
          isLoading={Boolean(debounceSearch) && isLoading}
          error={error}
          openArticle={openArticle}
          handleDeleteArticle={handleDeleteArticle}
          handleFavoriteArticle={handleFavoriteArticle}
        />
      </div>
    </Layout>
  );
}
