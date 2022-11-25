import { useRef, useState } from 'react';
import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import SortOptions from '../enum/SortOptions';
import Result from '../types/Result';
import Pagination from '../components/results/Pagination';
import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import useResultListQuery from '../hooks/useResultListQuery';
import useWindowDimensions from '../hooks/useWindowDimensions';
import IndexFields from '../enum/IndexFields';


const ResultsContainer = (): JSX.Element => {
  const resultListFilter = useResultListQuery();
  const dimensions = useWindowDimensions();
  const resultsWrapper = useRef<HTMLDivElement | null>(null);
  const pages = dimensions.isMobile ? 3 : 5;
  const [sort, setSort] = useState(SortOptions[0]);

  const sorting: any = {
    'most_relevant': {
      _score: { order: "desc" },
      [`${IndexFields.TITLE}.keyword`]: { order: "asc" }
    },
    'a_o': {
      [`${IndexFields.TITLE}.keyword`]: { order: "asc" },
    },
    'o_a': {
      [`${IndexFields.TITLE}.keyword`]: { order: "desc" },
    },
  };
  
  const onPageChange = () => {
    if (!resultsWrapper.current) {
      return;
    }

    if (Math.abs(resultsWrapper.current.getBoundingClientRect().y) < window.pageYOffset) {
      resultsWrapper.current.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <div ref={resultsWrapper}>
      <ResultsHeading setSort={setSort} />
      <ReactiveList
        className="district-project-search__container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        onPageChange={onPageChange}
        pages={pages}
        pagination={true}
        showResultStats={false}
        size={10}
        URLParams={true}
        defaultQuery={() => ({
          query: {
            ...resultListFilter,
          },
          sort: [
            sorting[sort.value]
          ]
        })}
        react={{
          and: [SearchComponents.FILTER_BULLETS, SearchComponents.SUBMIT]
        }}
        render={({ data }: any) => {
          return (
            <ul className="district-project-search__listing">
              {data.map((item: Result) => (
                <ResultCard key={item._id} {...item} />
              ))}
            </ul>
          )
        }}
        renderNoResults={() => (
          <div className="district-project-search__listing__no-results">
            <h2>{Drupal.t('Oh no! We did not find anything matching the search terms.', {}, { context: 'District and project search' })}</h2>
            <p>{Drupal.t('Our website currently shows only some of the projects and residential areas of Helsinki. You can try again by removing some of the limiting search terms or by starting over.', {}, { context: 'District and project search' })}</p>
          </div>
        )}
        renderPagination={(props) => <Pagination {...props} />}
      />
    </div>
  );
};

export default ResultsContainer;
