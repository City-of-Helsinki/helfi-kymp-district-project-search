import { StateProvider, ReactiveComponent } from '@appbaseio/reactivesearch';

import useLanguageQuery from '../../hooks/useLanguageQuery';
import SearchComponents from '../../enum/SearchComponents';
import IndexFields from '../../enum/IndexFields';

function ResultsHeading(): JSX.Element {
  const { RESULT_STATS } = SearchComponents;
  const languageFilter = useLanguageQuery();

  return (
    <ReactiveComponent
      componentId={RESULT_STATS}
      defaultQuery={() => ({
        aggs: {
          [IndexFields.CONTENT_TYPE]: {
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
              const projectCount = searchState?.result_stats?.aggregations?.content_type?.buckets.find((bucket: any) => bucket.key === 'project')
              const districtCount = searchState?.result_stats?.aggregations?.content_type?.buckets.find((bucket: any) => bucket.key === 'district')

              return (
                <div className="district-and-projects-search__results_heading">
                  <div className="district-and-projects-search__count__container">
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-total">{searchState?.results?.hits?.total} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('search results', {}, { context: 'District and project search result heading' })} </span>
                    </span>
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-count">({districtCount && districtCount.doc_count} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('districts', {}, { context: 'District and project search' })} </span>
                    </span>
                    <span className="district-and-projects-search__count">
                      <span className="district-and-projects-search__count-count">{Drupal.t('and', {}, {})} {projectCount && projectCount.doc_count} </span>
                      <span className="district-and-projects-search__count-label">{Drupal.t('projects', {}, { context: 'Project list, amount of projects' })})</span>
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

