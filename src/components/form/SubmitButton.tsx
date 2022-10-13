import { Button } from 'hds-react';
import { useCallback, useEffect, useState } from 'react';

import IndexFields from '../../enum/IndexFields';
import SearchComponents from '../../enum/SearchComponents';
import { useLanguageQuery } from '../../hooks/useLanguageQuery';
import type BooleanQuery from '../../types/BooleanQuery';

type SearchStateItem = {
  value: Array<string> | string;
};

type Props = {
  searchState: {
    [key: string]: SearchStateItem;
  };
  setQuery: Function;
};

export const ComponentMap = {
  [SearchComponents.TITLE]: `${IndexFields.TITLE}`,
  [SearchComponents.DISTRICTS]: `${IndexFields.FIELD_PROJECT_DISTRICT_TITLE}`,
  [SearchComponents.THEME]: `${IndexFields.FIELD_PROJECT_THEME_NAME}`,
  [SearchComponents.PHASE]: `${IndexFields.FIELD_PROJECT_PHASE_NAME}`,
  [SearchComponents.TYPE]: `${IndexFields.FIELD_PROJECT_TYPE_NAME}`
};

export const SubmitButton = ({ searchState, setQuery }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const languageFilter = useLanguageQuery();
  const getQuery = useCallback(() => {
    let query: BooleanQuery = {
      bool: {
        must: [],
        should: [],
        filter: languageFilter.bool.filter
      },
    };
  
    Object.keys(ComponentMap).forEach((key: string) => {
      const state = searchState[key] || null;

      if (state && state.value) {
        if (typeof state.value === 'string') {
          query.bool.should = [
            { wildcard: { [IndexFields.TITLE]: { value: `*${state.value.toLowerCase()}*` }}},
            { wildcard: { [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: { value: `*${state.value.toLowerCase()}*` }}},
            { wildcard: { [IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE]: { value: `*${state.value.toLowerCase()}*` }}},
            { wildcard: { [IndexFields.FIELD_DISTRICT_SEARCH_METATAGS]: { value: `*${state.value.toLowerCase()}*` }}},
            { wildcard: { [IndexFields.FIELD_PROJECT_SEARCH_METATAGS]: { value: `*${state.value.toLowerCase()}*` }}},
          ];
        }
        else if (key === SearchComponents.DISTRICTS) {
          const terms: Array<object> = [];
          state.value.forEach((value: string) => {      
            terms.push({ term: { [IndexFields.TITLE]: value }});
            terms.push({ term: { [IndexFields.FIELD_PROJECT_DISTRICT_TITLE]: value }});
            terms.push({ term: { [IndexFields.FIELD_DISTRICT_SUBDISTRICTS_TITLE]: value }});
          });

          query.bool.should.push(...terms);
        }
        else {
          state.value.forEach((value: string) => {          
            query.bool.must.push({
              term: {
                [ComponentMap[key]]: value,
              }
            })
          });
        }
      }
    });

    query.bool.minimum_should_match = Number(query.bool.should.length > 0);

    return {
      query: query,
    };
  }, [languageFilter, searchState]);

  useEffect(() => {
    if (mounted) {
      return;
    }

    setQuery(getQuery());
    setMounted(true);
  }, [getQuery, setQuery, mounted, setMounted]);

  return (
    <Button
      className='district-project-search-form__submit-button'
      type='submit'
      onClick={() => {
        setQuery(getQuery());
      }}
      variant='primary'
      theme='black'
    >
      {Drupal.t('Search')}
    </Button>
  );
};

export default SubmitButton;
