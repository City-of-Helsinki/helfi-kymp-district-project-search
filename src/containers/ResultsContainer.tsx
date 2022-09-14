import { ReactiveList } from '@appbaseio/reactivesearch';

import SearchComponents from '../enum/SearchComponents';
import Result from '../types/Result';
import ResultCard from '../components/results/ResultCard';
import useLanguageQuery from '../hooks/useLanguageQuery';


const ResultsContainer = () => {
  const languageFilter = useLanguageQuery();

  return (
    <div>
      <ReactiveList
        className="districts-projects-container"
        componentId={SearchComponents.RESULTS}
        dataField={'id'}
        loader="Loading Results.."
        pages={3}
        //pagination={true}
        defaultQuery={() => ({
          query: {
            ...languageFilter,
          },
        })}
        react={{
          and: ["SearchBox", "DistrictSensor", "ThemeSensor", "TypeSensor", "PhaseSensor"]
        }}
        render={({ data }: any) => (
          <ul className="districts-projects-listing districts-projects--teasers">
            {data.map((item: Result) => (
              <ResultCard key={item._id} {...item} />
            ))}
          </ul>
        )}
        showResultStats={false}
        size={10}
      />
    </div>
  );
};

export default ResultsContainer;
