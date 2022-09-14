import { StateProvider } from '@appbaseio/reactivesearch';

import SearchComponents from '../../enum/SearchComponents';

export const ResultsHeading = () => {
  const { RESULTS, SUBMIT } = SearchComponents;

  return (
    <StateProvider
      includeKeys={['value', 'hits']}
      render={({ searchState }) => (
        <h3 className="districts-projects-listing__heading">
        {searchState[SUBMIT] && searchState[SUBMIT].value && searchState[RESULTS] && searchState[RESULTS].hits
            ? Drupal.t(
                Drupal.t('Districts and projects based on your choices', {}, { context: 'Districts and projects search' }) +
                  `(${searchState[RESULTS].hits ? searchState[RESULTS].hits.total : 0})`
              )
            : Drupal.t('All districts and projects', {}, { context: 'Districts and projects search heading' })}
        </h3>
      )}
    />
  );
};

export default ResultsHeading;

