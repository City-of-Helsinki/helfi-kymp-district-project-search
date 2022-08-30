import { StateProvider } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';

//@todo implement filter check (after filters are implemented)
const filtersApplied = () => {
  return false;
};

export const ResultsHeading = () => {
  const { RESULTS } = SearchComponents;

  return (
    <StateProvider
      render={({ searchState }) => (
        <h2 className="districts-projects-listing__heading">
          {filtersApplied()
            ? Drupal.t(
                Drupal.t('Districts and rojects based on your choices', {}, { context: 'Districts projects' }) +
                  ` (${searchState[RESULTS].hits ? searchState[RESULTS].hits.total : 0})`
              )
            : Drupal.t('All districts-projects items', {}, { context: 'districts-projects heading' })}
        </h2>
      )}
    />
  );
};

export default ResultsHeading;
