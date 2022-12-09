import IndexFields from '../enum/IndexFields';
import SearchComponents from '../enum/SearchComponents';
import type BooleanQuery from '../types/BooleanQuery';
import type SearchState from '../types/SearchState';
import { ComponentMap } from './helpers';

type GetQueryProps = {
  searchState?: SearchState;
  languageFilter: any;
};

const getQuery = ({ searchState, languageFilter }: GetQueryProps) => {
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
      score_mode: "sum",
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

      if (key === SearchComponents.TITLE) {
        const wildcards: object[] = [];
        state.value.forEach((value: any) => {
          wildcards.push({ wildcard: { [`${IndexFields.TITLE}.keyword`]: { value: `*${value.value.toLowerCase()}*`, boost: 50 }}});
          wildcards.push({ wildcard: { [`${IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE}.keyword`]: { value: `*${value.value.toLowerCase()}*`, boost: isProjectFilterSet ? 45 : 22 }}});
          // if project filter is also set, boost projects.
          wildcards.push({ wildcard: { [`${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}.keyword`]: { value: `*${value.value.toLowerCase()}*`, boost: isProjectFilterSet ? 1000 : 22 }}});
          wildcards.push({ wildcard: { [IndexFields.FIELD_DISTRICT_SEARCH_METATAGS]: { value: `*${value.value.toLowerCase()}*`, boost: 22 }}});
          wildcards.push({ wildcard: { [IndexFields.FIELD_PROJECT_SEARCH_METATAGS]: { value: `*${value.value.toLowerCase()}*`, boost: 22 }}});
        });

        query.function_score.query.bool.should.push(...wildcards);
      }
      else if (key === SearchComponents.DISTRICTS) {
        const terms: object[] = [];

        state.value.forEach((value: any) => {
          terms.push({ term: { [`${IndexFields.TITLE}.keyword`]: { value: value.value, boost: 50 }}});
          // if project filter is also set, boost projects.
          terms.push({ term: { [`${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}.keyword`]: { value: value.value, boost: isProjectFilterSet ? 3000 : 30 }}});
          terms.push({ term: { [`${IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE}.keyword`]: { value: value.value, boost: 50 }}});
        });

        query.function_score.query.bool.should.push(...terms);
      }
      else {
        state.value.forEach((value: any) => {          
          query.function_score.query.bool.should.push({
            term: {
              [ComponentMap[key]]: { value: value.value, boost: isProjectFilterSet ? 120 : 70 }
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

export default getQuery;
