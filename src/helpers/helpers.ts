import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import type BooleanQuery from '../types/BooleanQuery';
import type OptionType from '../types/OptionType';
import type SearchState from '../types/SearchState';
import type FiltersType from '../types/FiltersType';


type GetQueryProps = {
  searchState?: SearchState;
  languageFilter: any;
};

export const ComponentMap = {
  [SearchComponents.TITLE]: `${IndexFields.TITLE}`,
  [SearchComponents.DISTRICTS]: `${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}`,
  [SearchComponents.THEME]: `${IndexFields.FIELD_PROJECT_THEME_NAME}`,
  [SearchComponents.PHASE]: `${IndexFields.FIELD_PROJECT_PHASE_NAME}`,
  [SearchComponents.TYPE]: `${IndexFields.FIELD_PROJECT_TYPE_NAME}`
};

export const getQuery = ({ searchState, languageFilter }: GetQueryProps) => {
  const weight: number = 20;

  let query: BooleanQuery = {
    function_score: {
      query: {
        bool: {
          should: [],
          filter: languageFilter.bool.filter,
        },
      },
      functions: [
        {
          filter: { term: { content_type: "district" } },
          weight: weight,
        }
      ],
      boost_mode: "sum",
      min_score: 0,
    },
  }

  const isProjectFilterSet = Object.keys(ComponentMap).filter((item: string) => item !== 'title' && item !== 'districts')
    .find((key: string) => searchState?.[key]?.value?.length);
  const isDistrictFilterSet = searchState?.['districts']?.value?.length;
  const isTitleFilterSet = searchState?.['title']?.value?.length;

  Object.keys(ComponentMap).forEach((key: string) => {
    const state = searchState?.[key] || null;

    if (state && state.value && state.value.length) {
      query.function_score.min_score = (isProjectFilterSet && isDistrictFilterSet) || (isProjectFilterSet && isTitleFilterSet) ?  Number(50) : Number(weight + 1);

      if (typeof state.value === 'string') {
        query.function_score.query.bool.should = [
          { wildcard: { [IndexFields.TITLE]: { value: `*${state.value.toLowerCase()}*`, boost: 50 }}},
          { wildcard: { [IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE]: { value: `*${state.value.toLowerCase()}*`, boost: 22 }}},
          // if project filter is also set, boost projects.
          { wildcard: { [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: { value: `*${state.value.toLowerCase()}*`, boost: isProjectFilterSet ? 50 : 22 }}},
          { wildcard: { [IndexFields.FIELD_DISTRICT_SEARCH_METATAGS]: { value: `*${state.value.toLowerCase()}*`, boost: 22 }}},
          { wildcard: { [IndexFields.FIELD_PROJECT_SEARCH_METATAGS]: { value: `*${state.value.toLowerCase()}*`, boost: 22 }}},
        ];
      }
      else if (key === SearchComponents.DISTRICTS) {
        const terms: object[] = [];

        state.value.forEach((value: string) => {
          terms.push({ term: { [IndexFields.TITLE]: { value: value, boost: 150 }}});
          // if project filter is also set, boost projects.
          terms.push({ term: { [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: { value: value, boost: isProjectFilterSet ? 3000 : 150 }}});
          terms.push({ term: { [IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE]: { value: value, boost: 150 }}});
        });

        query.function_score.query.bool.should.push(...terms);
      }
      else {
        state.value.forEach((value: string) => {          
          query.function_score.query.bool.should.push({
            term: {
              [ComponentMap[key]]: { value: value, boost: 70 }
            }
          })
        });
      }
    }
  });

  return {
    query: query,
    // add Submit component value by default.
    value: Number(searchState?.submit?.value) + 1 || 0
  };
}

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
