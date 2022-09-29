import SearchComponents from '../enum/SearchComponents';
import type OptionType from '../types/OptionType';
import FormContainer from './FormContainer';
import ResultsContainer from './ResultsContainer';


const SearchContainer = () => {
  const transformArrayParams = (paramValue: string | null): OptionType[]=> {
    if (!paramValue) {
      return [];
    }

    return JSON.parse(paramValue).map((value: string) => ({ label: value, value: value }));
  };

  const transformStringParams = (paramValue: string | null): string => {
    return !paramValue ? '' : JSON.parse(paramValue);
  };

  const getInitialParams = () => {
    const params = new URLSearchParams(window.location.search);

    return {
      title: transformStringParams(params.get(SearchComponents.TITLE)) ?? '',
      districts: transformArrayParams(params.get(SearchComponents.DISTRICTS)) ?? [],
      themes: transformArrayParams(params.get(SearchComponents.THEME)) ?? [],
      phases: transformArrayParams(params.get(SearchComponents.PHASE)) ?? [],
      types: transformArrayParams(params.get(SearchComponents.TYPE)) ?? []
    };
  };

  return (
    <div>
      <FormContainer initialState={getInitialParams()}/>
      <ResultsContainer />
    </div>
  );
};

export default SearchContainer;
