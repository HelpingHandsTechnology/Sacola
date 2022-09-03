import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { homeContext } from "../../contexts/homeContext";
import { trpc } from "../../utils/trpc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Row } from "../shared/Row";
import { Article } from "@prisma/client";

export const arrArticleList = [
  {
    id: "4ba21484-6386-4c49-8801-61b25c336c34",
    title: "There ain't no such thing as a free tier",
    urlDomain: "youtube.com",
    tags: ["nextjs", "trpc"],
    isFavorite: false,
  },
  {
    id: "e7d8d50a-69ed-4643-908e-41d11fe66816",
    title: "How to build a hacker news clone",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
    isFavorite: false,
  },
  {
    id: "99e723e8-498f-4446-bec2-b99d39315535",

    title: "How I Got Good at Coding Interviews",
    urlDomain: "youtube.com",
    tags: ["React", "development"],
    isFavorite: false,
  },
  {
    id: "5869aca0-d17f-4a44-b426-f4d11a645007",
    title:
      "MBAK】Navigation | Hamburger and Navigation Transition Effects | CSS& JavaScript #OnlineTutorials",
    urlDomain: "reddit.com",
    tags: ["product", "development"],
    isFavorite: true,
  },
];
export const ArticleList = () => {
  const articles = trpc.useQuery(["articles.getAll"], { retry: false });

  const homeCtx = useContext(homeContext);

  if (!homeCtx) {
    return <div />;
  }

  const { searchValue } = homeCtx;

  if (articles.isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
        <div className="flex items-start px-4 py-6 bg-slate-400 animate-pulse h-20" />
      </div>
    );
  }
  if (articles.error) {
    return <div>error</div>;
  }

  return (
    <div className="pb-16">
      {searchValue && (
        <div className="flex sticky top-0 items-center justify-center min-w-full align-middle bg-white pt-2 pb-2 text-lg font-semibold text-black">
          <h2 className="m-0">Filtrando por: {searchValue}</h2>
        </div>
      )}

      {articles?.data?.map((article, index) => {
        return (
          <React.Fragment key={index}>
            <ArticleItem {...article} />
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const ArticleItem = ({ title, urlDomain, tags, id, isFavorite }) => {
  return (
    <div className="flex items-start px-4 py-6">
      <Row className="text-slate-200 justify-between flex-1 w-full ">
        <ArticleItemCard {...{ title, urlDomain, tags, id, isFavorite }} />
        <OptionsArticleItem id={id} isFavorite={isFavorite} url={urlDomain} />
      </Row>
    </div>
  );
};

const useMutationDeleteArticleById = () => {
  const utils = trpc.useContext();
  return trpc.useMutation<"articles.deleteById", { snapshot: Article[] }>(
    ["articles.deleteById"],
    {
      onMutate: async (params) => {
        await utils.cancelQuery(["articles.getAll"]);
        await utils.cancelQuery(["articles.getById"]);
        await utils.cancelQuery(["articles.getFavorite"]);
        await utils.cancelQuery(["articles.getReadabilityById"]);
        const snapshot = utils.getQueryData(["articles.getAll"]);
        utils.setQueryData(["articles.getAll"], (old) => {
          if (!old) {
            return [];
          }
          // const newArticles = old.filter((article) => article.id !== params.id);
          return old.filter((article) => article.id !== params.id);
        });
        return {
          snapshot: snapshot || [],
        };
      },
      onError: (err, params, context) => {
        utils.setQueryData(["articles.getAll"], context?.snapshot || []);
      },
      onSettled: (deletedArticle) => {
        utils.invalidateQueries("articles.getAll");
        utils.invalidateQueries("articles.getById");
        utils.invalidateQueries("articles.getFavorite");
        utils.invalidateQueries("articles.getReadabilityById");
        utils.setQueryData(["articles.getAll"], (prev) => {
          if (prev) {
            utils.setQueryData(
              ["articles.getAll"],
              prev.filter(
                (article) => !!deletedArticle && article.id !== deletedArticle.id
              )
            );
            return prev;
          }
          return [];
        });
      },
    }
  );
};
const useUpdateArticleById = () => {
  const utils = trpc.useContext();
  return trpc.useMutation<"articles.updateById", { snapshot: Article[] }>(
    ["articles.updateById"],
    {
      onMutate: async (params) => {
        await utils.cancelQuery(["articles.getAll"]);
        await utils.cancelQuery(["articles.getById"]);
        await utils.cancelQuery(["articles.getFavorite"]);
        await utils.cancelQuery(["articles.getReadabilityById"]);
        const snapshot = utils.getQueryData(["articles.getAll"]);
        utils.setQueryData(["articles.getAll"], (old) => {
          if (!old) {
            return [];
          }
          return old.map((article) => {
            if (article.id === params.id) {
              return { ...article, ...params };
            }
            return article;
          });
        });
        return {
          snapshot: snapshot || [],
        };
      },
    }
  );
};

export const OptionsArticleItem = ({ id, isFavorite, url }) => {
  const deleteMutation = useMutationDeleteArticleById();
  const favoriteMutation = useUpdateArticleById();
  const handleDelete = () => {
    deleteMutation.mutate({ id });
  };
  const handleFavorite = (isFavorite) => {
    favoriteMutation.mutate({ id, isFavorite });
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(id);
  };
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className={` py-2  rounded cursor-default`}>
          <BsThreeDotsVertical size={24} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={`p-1 shadow-xl rounded bg-slate-800`}>
          <DropdownMenu.Item
            className={`py-2 px-8 rounded cursor-default
          focus:outline-none focus:bg-slate-400 focus:text-white br-1`}
            onClick={() => handleFavorite(!isFavorite)}
          >
            {isFavorite ? "Remover favorito" : "Marcar como favorito"}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onClick={handleCopyToClipboard}
            className={`py-2 px-8 rounded cursor-default
          focus:outline-none focus:bg-slate-400 focus:text-white br-1`}
          >
            Copiar link
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={`py-2 px-8 rounded cursor-default
          focus:outline-none focus:bg-red-400 focus:text-white br-1`}
            onClick={handleDelete}
          >
            Apagar
          </DropdownMenu.Item>
          <DropdownMenu.Arrow className="text-white" fill="currentColor" />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
const ArticleItemCard = ({ title, urlDomain, tags, id, isFavorite }) => (
  <Link href={`read/${id}`}>
    <a>
      <div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold  mt-1 mr-8">{title}</h2>
          </div>
        </div>
        <p className="text-slate-200 text-xs opacity-50">{urlDomain}</p>
        <div className="flex flex-row items-center mt-3 ">
          <p className="text-slate-200 text-sm ">
            {tags.map((tag, index) => {
              return <ArticleItemTag key={index} tag={tag} />;
            })}
          </p>
          {!!isFavorite && (
            <div className="bg-yellow-500 p-1 rounded-md">
              <FaStar className="text-white" />
            </div>
          )}
        </div>
      </div>
    </a>
  </Link>
);

export const ArticleItemTag = ({ tag }) => (
  <span
    key={tag}
    className="inline-block px-2  mr-2 text-xs font-medium leading-6 text-slate-900  rounded-md bg-slate-400"
  >
    {tag}
  </span>
);

export const Divider = () => (
  <div className="border-t border-slate-200 dark:border-slate-800" />
);
