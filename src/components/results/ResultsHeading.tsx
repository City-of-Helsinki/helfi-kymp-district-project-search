import { StateProvider, ReactiveComponent } from '@appbaseio/reactivesearch';

import useLanguageQuery from '../../hooks/useLanguageQuery';
import SearchComponents from '../../enum/SearchComponents';

function ResultsHeading(): JSX.Element {
  const { RESULT_STATS } = SearchComponents;
  const languageFilter = useLanguageQuery();

  return (
    <ReactiveComponent
      componentId={RESULT_STATS}
      defaultQuery={() => ({
        query: languageFilter
      })}
      render={() => {
        return (
          <StateProvider
            render={({ searchState }) => {
              return (
                <div className="district-project-search__results_heading">
                  <div className="district-project-search__count__container">
                    <span className="district-project-search__count">
                      <span className="district-project-search__count-total">{searchState?.results?.hits?.total} </span>
                      <span className="district-project-search__count-label">{Drupal.t('search results', {}, { context: 'District and project search result heading' })} </span>
                    </span>
                  </div>
                  <div className="district-project-search__sort__container">
                  </div>
                </div>
              )
            }}
          />
        );
      }}
    />
  );
};

export default ResultsHeading;

