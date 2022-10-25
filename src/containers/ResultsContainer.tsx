import { useRef } from 'react';
import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import Pagination from '../components/results/Pagination';
import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import useResultListQuery from '../hooks/useResultListQuery';
import useWindowDimensions from '../hooks/useWindowDimensions';


const ResultsContainer = (): JSX.Element => {
  const resultListFilter = useResultListQuery();
  const dimensions = useWindowDimensions();
  const resultsWrapper = useRef<HTMLDivElement | null>(null);
  const pages = dimensions.isMobile ? 3 : 5;

  const onPageChange = () => {
    if (!resultsWrapper.current) {
      return;
    }

    if (Math.abs(resultsWrapper.current.getBoundingClientRect().y) < window.pageYOffset) {
      resultsWrapper.current.scrollIntoView();
    }
  };

  return (
    <div ref={resultsWrapper}>
      <ResultsHeading />
      <ReactiveList
        className="district-project-search__container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        onPageChange={onPageChange}
        pages={pages}
        pagination={true}
        showResultStats={false}
        size={10}
        // sortBy={sort}
        URLParams={true}
        defaultQuery={() => ({
          query: {
            ...resultListFilter,
          },
        })}
        react={{
          and: [SearchComponents.SUBMIT]
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
            <h2>{Drupal.t('Oh no! We did not find anything matching the search terms', {}, { context: 'District and project search' })}</h2>
            <p>{Drupal.t('Our website currently shows only some of the projects and residential areas of Helsinki. You can try again by removing some of the limiting search terms or by starting over.', {}, { context: 'District and project search' })}</p>
          </div>
        )}
        renderPagination={(props) => <Pagination {...props} />}
      />
    </div>
  );
};

export default ResultsContainer;
