import React, { FormEvent, useContext, useState } from "react";
import { clsx } from "clsx";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import { CommonHeaderContainer } from "../shared/CommonHeaderContainer";
import { Row } from "../shared/Row";
import { Modal } from "../shared/Modal";
import { homeContext } from "../../contexts/homeContext";
import { Drawer } from "../shared/Drawer";

export type ClassName = {
  className?: string;
};
export type ReactWithChildren = {
  children: React.ReactNode;
};

export const FixedHeaderHome = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false);
  const [inputValueAddNewItem, setInputValueAddNewItem] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const homeCtx = useContext(homeContext);

  if (!homeCtx) {
    return <div />;
  }

  const { setSearchValue, inputValue, setInputValue } = homeCtx;

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setSearchValue(inputValue);
    setIsSearchOpen(false);
  };
  const onAddNewItem = () => {
    setIsAddNewItemOpen(false);
    setInputValueAddNewItem("");
  };

  return (
    <>
      <CommonHeaderContainer
        title="Minha lista"
        renderLeft={() => (
          <Link href={"/"}>
            <button
              className="space-x-4 text-gray-200 "
              onClick={() => setIsAddNewItemOpen(true)}
            >
              <FaPlus stroke="1" />
            </button>
          </Link>
        )}
        rendeRight={() => (
          <Row className="space-x-4 text-gray-200 ">
            <button onClick={() => setIsSearchOpen(true)}>
              <FaSearch stroke="1" />
            </button>
            <button onClick={() => setIsFilterOpen(true)}>
              <FaFilter stroke="1" />
            </button>
          </Row>
        )}
      />

      <ModalAddNewLink
        {...{
          inputValueAddNewItem,
          isAddNewItemOpen,
          onAddNewItem,
          setInputValueAddNewItem,
          setIsAddNewItemOpen,
        }}
      />

      <ModalSearch
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
      />

      <DrawerFilter
        {...{
          isFilterOpen,
          setIsFilterOpen,
          handleSubmit,
        }}
      />
    </>
  );
};

const ModalSearch = ({
  isSearchOpen,
  setIsSearchOpen,
  handleSubmit,
  setInputValue,
}) => {
  return (
    <Modal open={isSearchOpen} onClose={() => setIsSearchOpen(false)}>
      <form onSubmit={handleSubmit}>
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
              id="search-button"
              name="search-button"
              className="bg-white overflow-hidden h-11 rounded-md border-transparent bg-transparent py-0 pl-4 pr-4 text-gray-500 sm:text-sm"
            >
              <AiOutlineSearch size={24} />
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

const ModalAddNewLink = ({
  isAddNewItemOpen,
  setIsAddNewItemOpen,
  onAddNewItem,
  inputValueAddNewItem,
  setInputValueAddNewItem,
}) => {
  return (
    <Modal open={isAddNewItemOpen} onClose={() => setIsAddNewItemOpen(false)}>
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-white"
        >
          Adicione o link que você deseja salvar na sua lista
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            onChange={(e) => setInputValueAddNewItem(e.target.value)}
            type="text"
            name="search"
            id="search"
            value={inputValueAddNewItem}
            className="block w-full rounded-md border outline-none h-11  pl-2 pr-2 py-0 sm:text-sm"
            placeholder="Adicionar link"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={onAddNewItem}
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
  );
};

const DrawerFilter = ({ isFilterOpen, setIsFilterOpen, handleSubmit }) => {
  return (
    <Drawer
      direction="top"
      open={isFilterOpen}
      onClose={() => setIsFilterOpen(false)}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md text-sm text-white"
      >
        <label className="block text-sm font-normal text-black">Filtros</label>

        <div className="relative mt-1 text-black">
          <span>TAG</span>
        </div>
      </form>
    </Drawer>
  );
};

export const PanelCommonHeader = ({ children, className = "" }) => {
  return <div className={clsx("py-2", className)}>{children}</div>;
};
