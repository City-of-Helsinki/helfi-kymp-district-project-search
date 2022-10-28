type SearchStateItem = {
  value: string[] | string;
};

type SearchState = {
  [key: string]: SearchStateItem;
};

export default SearchState;
