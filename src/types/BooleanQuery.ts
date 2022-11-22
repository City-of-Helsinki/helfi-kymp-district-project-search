type TermQuery = {
  wildcard?: {
    [key: string]: { 
      value: string;
      boost: number;
    };
  };
  term?: {
    [key: string]: { 
      value: string;
      boost?: number;
    };
  };
};

type BooleanQuery = {
  function_score: {
    query: {
      bool: {
        should: TermQuery[];
        filter?: TermQuery[];
      };
    };
    functions: [
      {
        filter: {
          term: {
            content_type: string;
          }
        };
        weight: number;
      }
    ];
    boost_mode: string;
    min_score: number;
  }
};

export default BooleanQuery;
