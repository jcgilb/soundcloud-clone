import { createContext, useContext, useState } from "react";

export const SearchResultsContext = createContext();
export const useSearchResults = () => useContext(SearchResultsContext);

export default function SearchResultsProvider(props) {
  const [searchResults, setSearchResults] = useState();

  return (
    <SearchResultsContext.Provider
      value={{
        searchResults,
        setSearchResults,
      }}
    >
      {props.children}
    </SearchResultsContext.Provider>
  );
}
