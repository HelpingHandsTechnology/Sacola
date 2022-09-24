import { createContext } from 'react';

interface IProps {
  children?: React.ReactNode;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const homeContext = createContext<IProps | null>(null);

export function HomeContextProvider({
  searchValue,
  setSearchValue,
  inputValue,
  setInputValue,
  children,
}: IProps) {
  return (
    <homeContext.Provider
      value={{
        searchValue,
        setSearchValue,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </homeContext.Provider>
  );
}
