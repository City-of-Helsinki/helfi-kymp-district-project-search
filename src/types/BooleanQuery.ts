type TermQuery = {
  wildcard?: {
    [key: string]: { value: string; };
  };
  term?: {
    [key: string]: string;
  };
};

// TODO: update this.
type BooleanQuery = {
  bool: {
    should: TermQuery[];
    filter?: TermQuery[];
  };
};

export default BooleanQuery;
