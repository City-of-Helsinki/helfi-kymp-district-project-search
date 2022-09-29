type TermQuery = {
  wildcard?: {
    [key: string]: { value: string; };
  };
  term?: {
    [key: string]: string;
  };
};

type BooleanQuery = {
  bool: {
    must: TermQuery[];
    should: TermQuery[];
    filter?: TermQuery[];
    minimum_should_match?: number;
  };
};

export default BooleanQuery;
