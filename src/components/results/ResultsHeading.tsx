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
        aggs: {
          content_type: {
            terms: {
              field: 'content_type'
            },
          },
        },
        query: languageFilter
      })}
      render={() => {
        return (
          <StateProvider
            includeKeys={['value', 'hits', 'aggregations']}
            render={({ searchState }) => {
              const projectCount = searchState?.resultStats?.aggregations?.content_type?.buckets.find((bucket: any) => bucket.key === 'project')
              const districtCount = searchState?.resultStats?.aggregations?.content_type?.buckets.find((bucket: any) => bucket.key === 'district')

              return (
                <div className="district-and-projects-search__results_heading">
                  <div className="district-and-projects-search__count__container">
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-total">{searchState?.results?.hits?.total} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('search results', {}, { context: 'Districts and projects search result count' })} </span>
                    </span>
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-count">({districtCount && districtCount.doc_count} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('districts', {}, { context: 'Districts and projects search' })} </span>
                    </span>
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-count">{Drupal.t('and', {}, { context: 'Districts and projects search' })} {projectCount && projectCount.doc_count} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('projects', {}, { context: 'Districts and projects search' })})</span>
                    </span>
                  </div>
                  <div className="district-and-projects-search__sort__container">
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

