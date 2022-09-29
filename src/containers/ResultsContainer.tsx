import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import Pagination from '../components/results/Pagination';
import ResultCard from '../components/results/ResultCard';
import ResultsHeading from '../components/results/ResultsHeading';
import useResultListQuery from '../hooks/useResultListQuery';
import useWindowDimensions from '../hooks/useWindowDimensions';


const ResultsContainer = () => {
  const resultListFilter = useResultListQuery();
  const dimensions = useWindowDimensions();
  const pages = dimensions.isMobile ? 3 : 5;

  return (
    <div>
      <ResultsHeading />
      <ReactiveList
        className="districts-projects-search__container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        loader="Loading Results.."
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
            <ul className="districts-projects-search__listing">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ul>
          )

        }}
        renderNoResults={() => (
          <div className="districts-projects-search__listing__no-results">
            {Drupal.t('No results found.', {}, {})}
          </div>
        )}
        renderPagination={(props) => <Pagination {...props} />}
      />
    </div>
  );
};

export default ResultsContainer;
