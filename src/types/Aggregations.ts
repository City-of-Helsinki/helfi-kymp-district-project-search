type AggregationItem = {
  key: string;
  doc_count: number;
};

type Aggregation = {
  buckets: AggregationItem[];
};

export type Aggregations = {
  [key: string]: Aggregation;
};

export default Aggregations;
