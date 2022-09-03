import React, { useState } from "react";
import { clsx } from "clsx";
import { FaSearch, FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { CommonHeaderContainer } from "../shared/CommonHeaderContainer";
import { Row } from "../shared/Row";
import { Modal } from "../shared/Modal";

export type ClassName = {
  className?: string;
};
export type ReactWithChildren = {
  children: React.ReactNode;
};

export const FixedHeaderHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSearch = () => {
    console.log({ inputValue });
    setIsSearchOpen(false);
  };

  return (
    <>
      <CommonHeaderContainer
        title="Minha lista"
        renderLeft={() => (
          <Link href={"/"}>
            <a
              href="#"
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white "
            >
              📕
            </a>
          </Link>
        )}
        rendeRight={() => (
          <Row className="space-x-4 text-gray-200 ">
            <button onClick={() => setIsSearchOpen(true)}>
              <FaSearch stroke="1" />
            </button>
            <button onClick={() => console.log("TODO")}>
              <FaFilter stroke="1" />
            </button>
          </Row>
        )}
      />
      <Modal open={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-white"
          >
            Busca
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border outline-none h-11  pl-2 pr-2 py-0 sm:text-sm"
              placeholder="Pesquise por itens"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={onSearch}
                id="search-button"
                name="search-button"
                className="bg-white overflow-hidden h-11 rounded-md border-transparent bg-transparent py-0 pl-4 pr-4 text-gray-500 sm:text-sm"
              >
                <AiOutlineSearch size={24} />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export const PanelCommonHeader = ({ children, className = "" }) => {
  return <div className={clsx("py-2", className)}>{children}</div>;
};
