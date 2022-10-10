import Aggregations from '../types/Aggregations';
import OptionType from '../types/OptionType';
import { capitalize } from '../helpers/helpers';

export default function useAggregations(aggregations: Aggregations, indexKey: string, taxonomyKey: string) {
  let options: OptionType[] = [];
  if (aggregations && aggregations[indexKey] && aggregations[indexKey].buckets) {

    options = aggregations[taxonomyKey].buckets.map((bucket) => {
      let label = `${capitalize(bucket.key)}`;
      const match = aggregations[indexKey].buckets.find((item: any) => item.key === bucket.key);
  
      if (match !== undefined) {
        label = `${capitalize(bucket.key)} (${match.doc_count})`;
      }
  
      return {
        label,
        value: bucket.key
      }
    });

    return options;
  }

  return options;
}
