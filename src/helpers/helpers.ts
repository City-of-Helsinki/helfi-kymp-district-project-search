import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import type OptionType from '../types/OptionType';
import type SearchState from '../types/SearchState';
import type FiltersType from '../types/FiltersType';

export const ComponentMap = {
  [SearchComponents.TITLE]: `${IndexFields.TITLE}`,
  [SearchComponents.DISTRICTS]: `${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}`,
  [SearchComponents.THEME]: `${IndexFields.FIELD_PROJECT_THEME_NAME}`,
  [SearchComponents.PHASE]: `${IndexFields.FIELD_PROJECT_PHASE_NAME}`,
  [SearchComponents.TYPE]: `${IndexFields.FIELD_PROJECT_TYPE_NAME}`
};

export const capitalize = (s: string) => {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getUrlParams = () => {
  return new URLSearchParams(window.location.search);
}

export const transformSearchState = (searchState: SearchState, componentIds: string[]): FiltersType => {
  const filtered = Object.keys(searchState)
    .filter(key => componentIds.includes(key) && searchState[key].value != null)
    .reduce((acc: any, curr: any) => {
      acc[curr] = searchState[curr];
      return acc;
  }, []);

  const filters = Object.keys(filtered).reduce((acc: any, current: any) => {
    const options: OptionType[] = filtered[current].value && filtered[current].value.map((value: string) => ({ label: capitalize(value), value: value }));
    acc[current] = options;
    
    return acc;
  }, {});

  return filters
};
